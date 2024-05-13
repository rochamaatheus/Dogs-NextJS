import ContaPhotoPost from '@/components/conta/conta-photo-post';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Postar | Minha Conta',
};

// Ocorre um erro ao tentar fazer a "photoPost"
// uma das soluções é mudar o runtime
export const runtime = 'edge';

export default async function PostarPage() {
  return <ContaPhotoPost />;
}
