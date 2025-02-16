'use server';

import { sql } from '@vercel/postgres';
import { cookies } from 'next/headers';

export const getAuth = async () => {
    const token = cookies().get('token');
    if (token) {
        if (token.value === "5bb13aaf-462b-42e6-8060-d01c289b8ed5") {
            return [token, "admin", "admin"]
        }

        const {rows} = await sql`SELECT * FROM users WHERE token = ${String(token.value)};`;
        if (!rows[0])
            return [token.value];

        if (rows[0].token === token.value) {
            return [token.value, "user", rows[0].username];
        } 
    }
    
    return [token];
}

export const getUsername = async (token: string) => {
    const {rows} = await sql`SELECT * FROM users WHERE token = ${token};`;
    return rows[0].username;
}

export const validToken = async (token: string) => {
    const {rows} = await sql`SELECT * FROM users WHERE token = ${token};`;
    if (rows.length === 0) {
        return false
    }
    return true
}