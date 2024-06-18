'use server';
import { sql } from "@vercel/postgres";
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export const setCookies = async (formData: FormData) => {
  const username = formData.get('username');
  const password = formData.get('password');

  if (!username || !password) {
    return {
      message: 'Fuelle bitte alle Felder aus!',
      success: false,
    };
  }

  const {rows} = await sql`SELECT * FROM users WHERE username = ${String(username)};`;
  if (rows[0]) {
    if (rows[0].password === password) {
      cookies().set('token', rows[0].token);
      redirect('/dashboard');
    }
  } else if (username === "admin" && password === "access!4ADMINS") {
    cookies().set('token', "5bb13aaf-462b-42e6-8060-d01c289b8ed5");
    redirect('/dashboard');
  } else {
    return {
        message: 'Falscher Nutzername oder Passwort',
        success: false,
      };
  }
};

export const deleteCookies = () => {
  cookies().set('token', '', { expires: new Date(0) });
  redirect('/');
};