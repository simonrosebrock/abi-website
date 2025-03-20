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

type FinanzenTable = {name: string, value: number}[]

export const getFixCost = async () => {
    noStore();
    const rows = await sql`SELECT name, value FROM finanzen WHERE type = 'fixkosten' ORDER BY value ASC`
    return rows.rows as FinanzenTable; 
}

export const getVarCost = async () => {
    noStore();
    const rows = await sql`SELECT name, value FROM finanzen WHERE type = 'varkosten' ORDER BY value ASC`
    return rows.rows as FinanzenTable;
}

export const getGeneralFinanzen = async () => {
    noStore();
    const rows = await sql`SELECT name, value FROM finanzen WHERE type = 'general'`
    
    return rows.rows as {name: string, value: number}[];
}

export const setFixCost = async (fixCost: FinanzenTable) => {
    await sql`DELETE FROM finanzen WHERE type = 'fixkosten'`
    for (const row of fixCost) {
        await sql`INSERT INTO finanzen (name, value, type) VALUES (${row.name}, ${row.value}, 'fixkosten')`
    }
}

export const setVarCost = async (varCost: FinanzenTable) => {
    await sql`DELETE FROM finanzen WHERE type = 'varkosten'`
    for (const row of varCost) {
        await sql`INSERT INTO finanzen (name, value, type) VALUES (${row.name}, ${row.value}, 'varkosten')`
    }
}

export const setGeneralFinanzen = async (einnahmen: number, guestCount: number, customZiel: number, customCardPrice: number) => {
    noStore();
    await sql`UPDATE finanzen SET value = ${einnahmen} WHERE name = 'einnahmen'`
    await sql`UPDATE finanzen SET value = ${guestCount} WHERE name = 'guestcount'`
    await sql`UPDATE finanzen SET value = ${customZiel} WHERE name = 'customziel'`
    await sql`UPDATE finanzen SET value = ${customCardPrice} WHERE name = 'customcardprice'`
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

export const getAbimotto = async () => {
    noStore();
    const rows = await sql`SELECT * FROM mottos WHERE type = 'abimotto'`
    return rows.rows[0] as {title: string, addition: string};
}

export const setAbimotto = async (title: string, addition: string, date: string) => {
    await sql`UPDATE mottos SET title = ${title}, addition = ${addition}, date = ${date} WHERE type = 'abimotto'`
}

export const getMottowoche = async () => {
    noStore();
    const rows = await sql`SELECT * FROM mottos 
    WHERE type IN ('montag', 'dienstag', 'mittwoch', 'donnerstag', 'freitag')
    ORDER BY CASE 
    WHEN type = 'montag' THEN 1 
    WHEN type = 'dienstag' THEN 2
    WHEN type = 'mittwoch' THEN 3
    WHEN type = 'donnerstag' THEN 4
    WHEN type = 'freitag' THEN 5
    END;`
    return rows.rows as {type: string, title: string, addition: string, date: string}[];
}

export const updateMottowoche = async (mottowoche: {type: string, title: string, addition: string, date: string}[]) => {
    mottowoche.forEach(async (motto) => {
        await sql`UPDATE mottos SET title = ${motto.title}, addition = ${motto.addition}, date = ${motto.date} WHERE type = ${motto.type}`;
    })
}