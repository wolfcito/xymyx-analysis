import Link from 'next/link';

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? 'xymyx-analysis';

export default function HomePage() {
  const navLink = (href: string, label: string) => (
    <Link className="underline text-blue-600 hover:text-blue-500" href={href}>
      {label}
    </Link>
  );

  return (
    <main id="main" className="p-6 space-y-4" role="main">
      <h1 className="text-2xl font-semibold">{APP_NAME}</h1>
      <p className="text-sm text-gray-600">Herramienta ligera para anotar ideas en ajedrez.</p>
      <div className="space-x-4">
        {navLink('/chess-annotator', 'Abrir Chess Annotator')}
        {navLink('/about', 'Acerca de')}
      </div>
    </main>
  );
}
