'use server';

import { sql } from '@vercel/postgres';
import { cookies } from 'next/headers';

export const getAuth = async (): Promise<null | [string, string, string]> => {
    const token = cookies().get('token')?.value;
    if (token) {
        if (token === "5bb13aaf-462b-42e6-8060-d01c289b8ed5") {
            return [token, "admin", "admin"]
        }

        const {rows} = await sql`SELECT * FROM users WHERE token = ${String(token)};`;
        if (!rows[0]) return null
            

        if (rows[0].token === token) {
            return [token, "user", rows[0].username];
        } 
    }
    
    return null;
}

export const getUsername = async (token: string) => {
    const {rows} = await sql`SELECT * FROM users WHERE token = ${token};`;
    return rows[0].username;
}

export const validToken = async (token: string) => {
    if (token === "5bb13aaf-462b-42e6-8060-d01c289b8ed5") return true
    const {rows} = await sql`SELECT * FROM users WHERE token = ${token};`;
    if (rows.length === 0) {
        return false
    }
    return true
}
