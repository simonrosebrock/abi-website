'use server'

import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore} from 'next/cache';

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
    console.log(id)
    await sql`UPDATE termine SET title = ${termin.title}, description = ${termin.description}, ort = ${termin.ort}, date = ${termin.date}, start_time = ${termin.start_time}, end_time = ${termin.end_time}, helfer = ${termin.helfer} WHERE id = ${id}`
}

type FinanzenTable = {name: string, money: number}[]
const einnahmenToken = '0956deb0-141b-48a6-b7bd-5181fc205f76'

export const getAusgaben = async () => {
    noStore();
    const rows = await sql`SELECT name, money FROM finanzen WHERE NOT token = ${einnahmenToken}`
    return rows.rows as FinanzenTable; 
}

export const getEinnahmen = async () => {
    noStore();
    const rows = await sql`SELECT money FROM finanzen WHERE token = ${einnahmenToken}`
    return rows.rows[0].money as number;
}

export const updateFinanzen = async (finanzen: FinanzenTable, einnahmen: number) => {
    if (finanzen.length > 1) {
        await sql`DELETE FROM finanzen WHERE NOT token = ${einnahmenToken}`
        await sql`UPDATE finanzen SET money = ${einnahmen} WHERE token = ${einnahmenToken}`
        for (const row of finanzen) {
            await sql`INSERT INTO finanzen (name, money) VALUES (${row.name}, ${row.money})`
        }
    }
}