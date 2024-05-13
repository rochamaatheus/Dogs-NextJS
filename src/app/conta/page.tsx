import photosGet from '@/actions/photos-get';
import userGet from '@/actions/user-get';
import Feed from '@/components/feed/feed';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Minha Conta',
};

export default async function ContaPage() {
  const { data: user } = await userGet();
  // Já está filtrando "data" para conter apenas
  // as fotos do "user"
  const { data } = await photosGet({ user: user?.username });
  return (
    <section>
      {data?.length ? (
        <Feed photos={data} user={user?.username} />
      ) : (
        <div>
          <p
            style={{ color: '#444', fontSize: '1.25rem', marginBottom: '2rem' }}
          >
            Oops! Parece que você não tem nenhuma foto.
          </p>
          <Link href={'/conta/postar'} className="button">
            Poste uma agora!
          </Link>
        </div>
      )}
    </section>
  );
}
