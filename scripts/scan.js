// scripts/scan.js - Node scanner example
const BASE = 'https://criptoya.com/api';

async function scan() {
  const coins = ['USDT', 'USDC', 'BTC', 'ETH'];
  for (const coin of coins) {
    const res = await fetch(`${BASE}/${coin}/ARS/1000`);
    const data = await res.json();
    console.log(`\n=== ${coin}/ARS ===`);
    let bestAsk = Infinity, bestAskEx = '';
    let bestBid = 0, bestBidEx = '';
    for (const [ex, q] of Object.entries(data)) {
      if (q.totalAsk > 0 && q.totalAsk < bestAsk) { bestAsk = q.totalAsk; bestAskEx = ex; }
      if (q.totalBid > 0 && q.totalBid > bestBid) { bestBid = q.totalBid; bestBidEx = ex; }
    }
    const spread = ((bestBid - bestAsk) / bestAsk * 100).toFixed(3);
    console.log(`Buy ${bestAskEx} @ ${bestAsk} | Sell ${bestBidEx} @ ${bestBid} | Spread: ${spread}%`);
  }
}

scan().catch(console.error);