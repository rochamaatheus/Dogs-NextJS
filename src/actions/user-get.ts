'use server';

import { USER_GET } from '@/functions/api';
import apiError from '@/functions/api-error';
import { cookies } from 'next/headers';

export type User = {
  id: number;
  email: string;
  username: string;
  nome: string;
};

// Em caso de cálculos muito complexos na função
// podemos colocá-la em cache
// import { cache } from 'react';
// const functionCache = cache(function);
// export default functionCache;

export default async function userGet() {
  try {
    const token = cookies().get('token')?.value;
    if (!token) throw new Error('Token não encontrado.');
    const { url } = USER_GET();
    const r = await fetch(url, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
      next: {
        revalidate: 60,
      },
    });
    if (!r.ok) throw new Error('Erro ao tentar logar o usuário.');
    const data = (await r.json()) as User;
    return { data, ok: true, error: '' };
  } catch (error: unknown) {
    return apiError(error);
  }
}
