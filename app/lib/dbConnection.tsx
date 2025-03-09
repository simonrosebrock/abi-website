'use server'

import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore} from 'next/cache';
import bcrypt from 'bcrypt';

export const getTermine = async () => {
    noStore();
    const rows = await sql`SELECT * FROM termine WHERE date >= NOW() - INTERVAL '1 day' ORDER BY date`;
    return rows.rows;
}

export const getClosestTermin = async () => {
    noStore();
    const rows = await sql`SELECT * FROM termine WHERE date >= NOW() - INTERVAL '1 day' ORDER BY date LIMIT 1`;
    return rows.rows[0];
}

export const getUsers = async () => {
    const rows = await sql`SELECT username FROM users ORDER BY username`;
    const users = rows.rows.map(row => row.username)
    return users;
}

export const getUsersAdmin = async () => {
    const rows = await sql`SELECT username, token FROM users ORDER BY username`;
    const users = rows.rows.map(row => ({ name: row.username, token: row.token }))
    return users;
}

export const changePassword = async (token: string, password: string) => {
    await sql`UPDATE users SET password = ${password} WHERE token = ${token}`
}

type Personen = {
    [key: string]: string[];
};

export const setHelfer = async (helfer: Personen, termin_id: string) => {
    const helferJSON = JSON.stringify(helfer);
    await sql`UPDATE termine SET helfer = ${helferJSON} WHERE id = ${termin_id}`;
}

type Termin = {
    title: string,
    description: string,
    ort: string,
    date: string,
    start_time: string,
    end_time: string,
    helfer: string
}

export const addTermin = async (termin: Termin) => {
    await sql`INSERT INTO termine (title, description, ort, date, start_time, end_time, helfer) VALUES (${termin.title}, ${termin.description}, ${termin.ort}, to_date(${termin.date}, 'yyyy-mm-dd'), ${termin.start_time}, ${termin.end_time}, ${termin.helfer})`;
}

export const deleteTermin = async (id: string) => {
    await sql`DELETE FROM termine WHERE id = ${id}`;
}

export const updateTermin = async (id: string, termin: Termin) => {
    await sql`UPDATE termine SET title = ${termin.title}, description = ${termin.description}, ort = ${termin.ort}, date = ${termin.date}, start_time = ${termin.start_time}, end_time = ${termin.end_time}, helfer = ${termin.helfer} WHERE id = ${id}`
}

type FinanzenTable = {name: string, money: number}[]
const einnahmenID = '0956deb0-141b-48a6-b7bd-5181fc205f76'

export const getAusgaben = async () => {
    noStore();
    const rows = await sql`SELECT name, money FROM finanzen WHERE NOT id = ${einnahmenID}`
    return rows.rows as FinanzenTable; 
}

export const getEinnahmen = async () => {
    noStore();
    const rows = await sql`SELECT money FROM finanzen WHERE id = ${einnahmenID}`
    return rows.rows[0].money as number;
}

export const updateFinanzen = async (finanzen: FinanzenTable, einnahmen: number) => {
    if (finanzen.length > 1) {
        await sql`DELETE FROM finanzen WHERE NOT id = ${einnahmenID}`
        await sql`UPDATE finanzen SET money = ${einnahmen} WHERE id = ${einnahmenID}`
        for (const row of finanzen) {
            await sql`INSERT INTO finanzen (name, money) VALUES (${row.name}, ${row.money})`
        }
    }
}

type CheckpointsTable = {money: number, cardprice: number}[]
const goalID = '39166ec5-b68d-4fd0-81e0-2b3eebe2488a'

export const getExcessGoal = async () => {
    noStore();
    const rows = await sql`SELECT money FROM checkpoints WHERE id = ${goalID}`
    return rows.rows[0].money as number;
}

export const getCheckpoints = async () => {
    noStore();
    const rows = await sql`SELECT money, cardprice FROM checkpoints WHERE NOT id = ${goalID}`
    return rows.rows as CheckpointsTable;
}

export const updateCheckpoints = async (checkpoints: CheckpointsTable, goal: number) => {
    if (checkpoints.length > 1) {
        await sql`DELETE FROM checkpoints WHERE NOT id = ${goalID}`
        await sql`UPDATE checkpoints SET money = ${goal} WHERE id = ${goalID}`
        for (const row of checkpoints) {
            await sql`INSERT INTO checkpoints (money, cardprice) VALUES (${row.money}, ${row.cardprice})`
        }
    }
}

export const updateAccountName = async (token: string, username: string) => {
    try {
        await sql`UPDATE users SET username = ${username} WHERE token = ${token};`
        return 'success'
    } catch (error) {
        return null
    }
}

export const updateAccountPassword = async (token: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    await sql`UPDATE users SET password = ${hashedPassword} WHERE token = ${token};`
}

export const createAccount = async (username: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        await sql`INSERT INTO users (username, password) VALUES (${username}, ${hashedPassword});`
        return 'success'
    } catch (error) {
        return null
    }
    
}

export const deleteAccount = async (token: string) => {
    await sql`DELETE FROM users WHERE token = ${token}`
}

