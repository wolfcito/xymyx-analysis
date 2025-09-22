import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'XYMYX Analyzer - XYMYX Analysis with Streaming Overlay',
  description:
    'Analizador avanzado de ajedrez con interfaz de streaming overlay moderna. Configura posiciones, anota movimientos, analiza partidas y exporta estudios con diseño futurista.',
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    title: 'XYMYX Analyzer - XYMYX Analysis with Streaming Overlay',
    description:
      'Analiza posiciones de ajedrez con interfaz de streaming overlay moderna y efectos neón.',
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
