'use client';

import { ArbitrageOpportunity } from '@/lib/criptoya';

export default function OpportunityTable({ opportunities }: { opportunities: ArbitrageOpportunity[] }) {
  if (!opportunities.length) {
    return <div className="text-zinc-500 p-8 text-center">No se detectaron spreads > 0.1% en este momento.</div>;
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900/40">
      <table className="w-full text-sm">
        <thead className="bg-zinc-800/80 text-left">
          <tr>
            <th className="p-4">Coin</th>
            <th className="p-4">Comprar en</th>
            <th className="p-4">Precio Compra</th>
            <th className="p-4">Vender en</th>
            <th className="p-4">Precio Venta</th>
            <th className="p-4 text-accent">Spread %</th>
            <th className="p-4">Profit Est. (vol)</th>
          </tr>
        </thead>
        <tbody>
          {opportunities.map((o, i) => (
            <tr key={i} className="border-t border-zinc-800 hover:bg-zinc-800/30">
              <td className="p-4 font-mono font-bold">{o.coin}</td>
              <td className="p-4">{o.buyExchange}</td>
              <td className="p-4 font-mono">{o.buyPrice.toLocaleString()}</td>
              <td className="p-4">{o.sellExchange}</td>
              <td className="p-4 font-mono">{o.sellPrice.toLocaleString()}</td>
              <td className="p-4 font-mono text-accent font-bold">{o.spreadPercent}%</td>
              <td className="p-4 font-mono text-emerald-400">{o.estimatedProfit.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}