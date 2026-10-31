export default function DollarCard({ data }: { data: any }) {
  const blue = data?.blue?.ask;
  const criptoUsdt = data?.cripto?.usdt?.ask;
  const mep = data?.mep?.al30?.['24hs']?.price;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <Card title="Blue" value={blue} />
      <Card title="USDT Cripto" value={criptoUsdt} accent />
      <Card title="MEP AL30" value={mep} />
      <Card title="Oficial" value={data?.oficial?.ask} />
    </div>
  );
}

function Card({ title, value, accent }: { title: string; value?: number; accent?: boolean }) {
  return (
    <div className={`p-4 rounded-xl border ${accent ? 'border-accent/40 bg-accent/5' : 'border-zinc-800 bg-zinc-900/50'}`}>
      <div className="text-xs text-zinc-500 uppercase">{title}</div>
      <div className={`text-2xl font-bold mt-1 ${accent ? 'text-accent' : ''}`}>
        {value ? `$${value.toLocaleString()}` : '—'}
      </div>
    </div>
  );
}