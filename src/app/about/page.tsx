export const metadata = {
  title: 'About xymyx-analysis',
};

function AboutPage() {
  const metricsPanel = () => <aside aria-label="metrics">metrics</aside>;
  return (
    <main className="p-6 space-y-2">
      <h1 className="text-xl font-semibold">About</h1>
      <p>Lightweight xymyx annotation tool (MVP).</p>
      {metricsPanel()}
    </main>
  );
}

export default AboutPage;
