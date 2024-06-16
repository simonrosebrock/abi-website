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