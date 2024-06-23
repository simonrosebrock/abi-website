'use server';
import { sql } from "@vercel/postgres";
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

type response = {
  message: string,
  success: boolean,
}

export const setCookies = async (formData: FormData) => {
  const username = formData.get('username');
  const password = formData.get('password');

  if (!username || !password) {
    return {
      message: 'Fülle bitte alle Felder aus!',
      success: false,
    } as response;
  }

  if (username === "admin" && password === "access!4ADMINS") {
    cookies().set('token', "5bb13aaf-462b-42e6-8060-d01c289b8ed5");
    return { success: true, message: 'Login successful, redirecting...' } as response;
  } 
  const {rows} = await sql`SELECT * FROM users WHERE username = ${String(username)};`;
  if (rows[0]) {
    if (rows[0].password === password) {
      cookies().set('token', rows[0].token);
      return { success: true, message: 'Login successful, redirecting...' } as response;
    }
  }
  return {
      message: 'Falscher Nutzername oder falsches Passwort',
      success: false,
    } as response;
};

export const deleteCookies = () => {
  cookies().set('token', '', { expires: new Date(0) });
  redirect('/');
};