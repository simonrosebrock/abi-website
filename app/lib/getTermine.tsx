'use server'

import { sql } from '@vercel/postgres';

export const getTermine = async () => {
    const rows = await sql`SELECT * FROM termine`;
    return rows.rows;
}
