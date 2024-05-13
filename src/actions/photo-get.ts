'use server';

import { PHOTO_GET } from '@/functions/api';
import apiError from '@/functions/api-error';
import { Photo } from './photos-get';

export type Comment = {
  comment_ID: string;
  comment_post_ID: string;
  comment_author: string;
  comment_content: string;
};

export type PhotoData = {
  photo: Photo;
  comments: Comment[];
};

export default async function photoGet(id: string) {
  try {
    const { url } = PHOTO_GET(id);
    const r = await fetch(url, {
      next: {
        revalidate: 60,
        tags: ['photos', 'comment'],
      },
    });
    if (!r.ok) throw new Error('Erro ao carregar a foto');
    const data = (await r.json()) as PhotoData;
    return { data, ok: true, error: false };
  } catch (error) {
    return apiError(error);
  }
}
