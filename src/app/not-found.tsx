import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="container">
      <h1 className="title">Página não encontrada.</h1>
      <Link
        className="button"
        style={{ display: 'inline-block', marginTop: '1rem' }}
        href={'/'}
      >
        Voltar para a página inicial
      </Link>
    </section>
  );
}
