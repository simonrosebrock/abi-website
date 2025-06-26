'use server';

import { sql } from '@vercel/postgres';
import { cookies } from 'next/headers';

const adminToken = process.env.ADMIN_TOKEN as string;

export const getAuth = async (): Promise<null | [string, string, string]> => {
    const cookie = await cookies();
    const token = cookie.get('token')?.value;
    if (token) {
        if (token === adminToken) {
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
    if (token === adminToken) return true
    const {rows} = await sql`SELECT * FROM users WHERE token = ${token};`;
    if (rows.length === 0) {
        return false
    }
    return true
}

export const isAdmin = async (token: string) => {
    if (token === adminToken) return true
    return false
}
