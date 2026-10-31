import { scanOpportunities, fetchDollar } from '@/lib/criptoya';
import OpportunityTable from '@/components/OpportunityTable';
import DollarCard from '@/components/DollarCard';

export const revalidate = 30;

export default async function Home() {
  const [opps, dolar] = await Promise.all([
    scanOpportunities(),
    fetchDollar().catch(() => null),
  ]);

  return (
    <main className="min-h-screen p-6 md:p-12 bg-gradient-to-br from-dark via-zinc-950 to-black">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-accent to-emerald-400 bg-clip-text text-transparent">
              CriptoYa Arbitrage Omnichaín
            </h1>
            <p className="text-zinc-400 mt-2">Expert scanner alimentado por la API de CriptoYa · Spreads CEX/P2P en tiempo real</p>
          </div>
          <div className="text-sm text-zinc-500">
            Actualizado cada 30s · Límite API 120 req/min
          </div>
        </header>

        {dolar && <DollarCard data={dolar} />}

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-accent">Oportunidades de Arbitraje (ARS)</h2>
          <OpportunityTable opportunities={opps} />
        </section>

        <section className="mt-12 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
          <h3 className="text-xl font-semibold mb-3">Arquitectura Omnichaín (L0-L3)</h3>
          <ul className="space-y-2 text-zinc-300 text-sm">
            <li>• <strong>L0 Messaging:</strong> LayerZero / Axelar / Hyperlane para settlement cross-chain post-detección</li>
            <li>• <strong>Oráculos:</strong> Chainlink + Pyth + CriptoYa como fuente primaria LATAM</li>
            <li>• <strong>Ejecución:</strong> Smart contract con flash loans + intent-based (Anoma / UniswapX style) + MEV protection</li>
            <li>• <strong>AI Layer:</strong> Scoring de oportunidades por liquidez, latencia, riesgo de slippage y funding</li>
            <li>• <strong>Fintech:</strong> Integración conceptual con bancos vía ramps + compliance hooks</li>
          </ul>
        </section>

        <footer className="mt-16 text-center text-zinc-600 text-xs">
          Desarrollado por Elcryptoboy · Datos informativos, no es recomendación financiera · Powered by CriptoYa API
        </footer>
      </div>
    </main>
  );
}