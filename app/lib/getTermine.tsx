
import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore} from 'next/cache';

export const getTermine = async () => {
    noStore();
    const rows = await sql`SELECT * FROM termine`;
    return rows.rows;
}
