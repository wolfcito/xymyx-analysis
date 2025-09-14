import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'xymyx-analysis',
  description:
    'Editor ligero para configurar posiciones, anotar flechas y casillas, y exportar estudios.',
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    title: 'xymyx-analysis',
    description: 'Anota ideas en el tablero y comparte.',
    type: 'website',
    url: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-black text-white px-3 py-1 rounded"
        >
          Saltar al contenido
        </a>
        {children}
      </body>
    </html>
  );
}
