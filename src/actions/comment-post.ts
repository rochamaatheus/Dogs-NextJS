'use server';

import { COMMENT_POST } from '@/functions/api';
import apiError from '@/functions/api-error';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function commentPost(state: {}, formData: FormData) {
  const token = cookies().get('token')?.value;
  const comment = formData.get('comment') as string | null;
  const id = formData.get('id') as string | null;

  try {
    if (!token || !comment || !id) throw new Error('Preencha os dados.');
    const { url } = COMMENT_POST(id);
    const r = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    });
    if (!r.ok) throw new Error('Erro ao tentar postar a imagem.');
    const data = (await r.json()) as Comment;
    revalidateTag('/comment');
    return { data, ok: true, error: '' };
  } catch (error: unknown) {
    return apiError(error);
  }
}
