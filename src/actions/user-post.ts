'use server';

import { USER_POST } from '@/functions/api';
import apiError from '@/functions/api-error';
import login from './login';

export default async function userPost(state: {}, formData: FormData) {
  const username = formData.get('username') as string | null;
  const password = formData.get('password') as string | null;
  const email = formData.get('email') as string | null;

  try {
    if (!username || !password || !email) throw new Error('Preencha os dados.');
    const { url } = USER_POST();
    const r = await fetch(url, {
      method: 'POST',
      body: formData,
    });
    if (!r.ok) throw new Error('Email ou Usuário já cadastrados.');
    const { ok } = await login({ ok: true, error: '' }, formData);
    if (!ok) throw new Error('Erro ao logar.');
    return { data: null, ok: true, error: '' };
  } catch (error: unknown) {
    return apiError(error);
  }
}
