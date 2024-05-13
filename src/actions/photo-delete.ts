'use server';

import { PHOTO_DELETE } from '@/functions/api';
import apiError from '@/functions/api-error';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function photoDelete(id: string) {
  const token = cookies().get('token')?.value;

  try {
    if (!token) throw new Error('Você não tem permissão para isso.');
    const { url } = PHOTO_DELETE(id);
    const r = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (!r.ok) throw new Error('Erro ao tentar deletar a imagem.');
  } catch (error: unknown) {
    return apiError(error);
  }
  revalidateTag('photos');
  redirect('/conta');
}
