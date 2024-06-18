'use server'

import { sql } from '@vercel/postgres';

export const getTermine = async () => {
    const rows = await sql`SELECT * FROM termine WHERE date >= CURRENT_DATE - INTERVAL '1 day';`;
    return rows.rows;
}
