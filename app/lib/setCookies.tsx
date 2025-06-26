'use server';
import { sql } from "@vercel/postgres";
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import bcrypt from 'bcrypt';

type response = {
  message: string,
  success: boolean,
}

const adminToken = process.env.ADMIN_TOKEN as string;
const adminPW = process.env.ADMIN_PW as string;

export const setCookies = async (formData: FormData) => {
  const vorname = (formData.get('vorname') as string).toLowerCase().trim();
  const nachname = (formData.get('nachname') as string).toLowerCase().trim();
  const username =  vorname === "admin" ?  vorname : `${vorname}_${nachname}`
  const password = (formData.get('password') as string).trim();

  if (!username || !password) {
    return {
      message: 'Fülle bitte alle Felder aus!',
      success: false,
    } as response;
  }

  if (username === "admin" && password === adminPW) {
    cookies().set('token', adminToken);
    return { success: true, message: 'Login successful, redirecting...' } as response;
  } 
  const {rows} = await sql`SELECT * FROM users WHERE username = ${String(username)};`;
  if (rows[0]) {
    const isValid = await bcrypt.compare(password, rows[0].password);
    if (isValid) {
      cookies().set('token', rows[0].token);
      return { success: true, message: 'Login successful, redirecting...' } as response;
    }
  }
  return {
      message: 'Falscher Nutzername oder falsches Passwort',
      success: false,
    } as response;
};

export const deleteCookies = async () => {
  cookies().set('token', '', { expires: new Date(0) });
  redirect('/');
};