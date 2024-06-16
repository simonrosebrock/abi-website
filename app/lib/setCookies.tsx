'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export const setCookies = (formData: FormData) => {
  const username = formData.get('username');
  const password = formData.get('password');

  if (!username || !password) {
    return {
      message: 'Fuelle bitte alle Felder aus!',
      success: false,
    };
  }

  if (username === "abi" && password === "THG-25") {
    cookies().set('token', "1f00b921-3393-4b14-a0e3-971a571c7de7");
    redirect('/dashboard');
  } else if (username === "admin" && password === "blacklisted") {
    cookies().set('token', "blacklisted");
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