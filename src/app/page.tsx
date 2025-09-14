import Link from 'next/link';

export default function HomePage() {
  const navLink = (href: string, label: string) => (
    <Link className="underline text-blue-600 hover:text-blue-500" href={href}>
      {label}
    </Link>
  );

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">xymyx-analysis</h1>
      <p className="text-sm text-gray-600">Herramienta ligera para anotar ideas en ajedrez.</p>
      <div className="space-x-4">
        {navLink('/chess-annotator', 'Abrir Chess Annotator')}
        {navLink('/about', 'Acerca de')}
      </div>
    </main>
  );
}
