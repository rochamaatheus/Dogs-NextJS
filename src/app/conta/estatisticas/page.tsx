import statsGet from '@/actions/stats-get';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

// Lazy Loading
const ContaEstatisticas = dynamic(
  () => import('@/components/conta/conta-estatisticas'),
  {
    // Enquanto carrega
    loading: () => <p>Carregando...</p>,
    // Renderizar somente no client
    ssr: false,
  },
);

export const metadata: Metadata = {
  title: 'Estatísticas | Minha Conta',
};

export default async function EstatisticasPage() {
  const { data } = await statsGet();

  if (!data) return null;
  return (
    <section>
      <h1>Estatisticas</h1>
      <ContaEstatisticas data={data} />
    </section>
  );
}
