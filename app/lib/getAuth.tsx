'use server';

import { sql } from '@vercel/postgres';
import { cookies } from 'next/headers';

export const getAuth = async () => {
    const token = cookies().get('token');
    if (token) {
        if (token.value === "blacklisted") {
            return [token, "admin", "admin"]
        }

        const {rows} = await sql`SELECT * FROM users WHERE token = ${String(token.value)};`;
        if (!rows[0])
            return [token];

        if (rows[0].token === token.value) {
            return [token, "abi", rows[0].username];
        } 
    }
    
    return [token];
}
