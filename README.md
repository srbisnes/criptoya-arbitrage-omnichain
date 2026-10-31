# CriptoYa Arbitrage Omnichaín

Scanner profesional de arbitraje alimentado en tiempo real por la API pública de [CriptoYa](https://criptoya.com/api).

## Features

- Detección automática de spreads entre exchanges / P2P (mejor ask vs mejor bid)
- Soporte multi-coin: USDT, USDC, BTC, ETH, DAI vs ARS
- Cotizaciones de dólar (Blue, MEP, Cripto, Oficial)
- UI dark-mode moderna con refresh cada 30s
- Arquitectura lista para extensión omnichaín (LayerZero, Axelar, Chainlink, smart contracts de ejecución)

## Arquitectura

```
[CriptoYa API] → [Next.js Server Components] → [Arbitrage Engine] → [Dashboard]
                     ↓
              [Future: LayerZero messaging + on-chain settlement]
```

## Setup

```bash
pnpm install
pnpm dev
```

## Deploy

Listo para Vercel. Sin secrets necesarios (API pública).

## Disclaimer

Datos informativos. No constituye recomendación financiera. Verificar siempre liquidez, fees de retiro y slippage reales antes de operar.

---

**Elcryptoboy** — Web3 Omnichaín Architect
