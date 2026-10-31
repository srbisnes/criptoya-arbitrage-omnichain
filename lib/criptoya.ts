export interface Quote {
  ask: number;
  totalAsk: number;
  bid: number;
  totalBid: number;
  time: number;
}

export interface ExchangeQuotes {
  [exchange: string]: Quote;
}

export interface ArbitrageOpportunity {
  coin: string;
  fiat: string;
  volume: number;
  buyExchange: string;
  buyPrice: number;
  sellExchange: string;
  sellPrice: number;
  spreadPercent: number;
  estimatedProfit: number;
  timestamp: number;
}

const BASE = 'https://criptoya.com/api';

export async function fetchQuotes(coin: string, fiat: string, volume: number = 1000): Promise<ExchangeQuotes> {
  const res = await fetch(`${BASE}/${coin}/${fiat}/${volume}`, { next: { revalidate: 30 } });
  if (!res.ok) throw new Error(`Failed to fetch ${coin}/${fiat}`);
  return res.json();
}

export async function fetchDollar() {
  const res = await fetch(`${BASE}/dolar`, { next: { revalidate: 60 } });
  return res.json();
}

export function findBestArbitrage(quotes: ExchangeQuotes, coin: string, fiat: string, volume: number): ArbitrageOpportunity | null {
  let bestAsk = Infinity;
  let bestAskEx = '';
  let bestBid = 0;
  let bestBidEx = '';

  for (const [ex, q] of Object.entries(quotes)) {
    if (q.totalAsk > 0 && q.totalAsk < bestAsk) {
      bestAsk = q.totalAsk;
      bestAskEx = ex;
    }
    if (q.totalBid > 0 && q.totalBid > bestBid) {
      bestBid = q.totalBid;
      bestBidEx = ex;
    }
  }

  if (bestAsk === Infinity || bestBid === 0 || bestAskEx === bestBidEx) return null;

  const spread = ((bestBid - bestAsk) / bestAsk) * 100;
  if (spread < 0.1) return null;

  const profit = (bestBid - bestAsk) * volume;

  return {
    coin,
    fiat,
    volume,
    buyExchange: bestAskEx,
    buyPrice: bestAsk,
    sellExchange: bestBidEx,
    sellPrice: bestBid,
    spreadPercent: parseFloat(spread.toFixed(3)),
    estimatedProfit: parseFloat(profit.toFixed(2)),
    timestamp: Date.now(),
  };
}

export async function scanOpportunities(coins: string[] = ['USDT', 'USDC', 'BTC', 'ETH', 'DAI'], fiat = 'ARS', volume = 1000) {
  const results: ArbitrageOpportunity[] = [];
  for (const coin of coins) {
    try {
      const quotes = await fetchQuotes(coin, fiat, volume);
      const opp = findBestArbitrage(quotes, coin, fiat, volume);
      if (opp) results.push(opp);
    } catch (e) {
      console.error(e);
    }
  }
  return results.sort((a, b) => b.spreadPercent - a.spreadPercent);
}