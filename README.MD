# GhanaFi — Ghana Finance & Weather Dashboard

Real-time Ghana-focused dashboard tracking:
- 🌤️ Local weather (Open-Meteo)
- 💱 GHS exchange rates (ExchangeRate-API)
- 📈 GSE stock market (manual)
- ₿ Crypto prices (CoinGecko)
- ⛽ Fuel prices (NPA Ghana, manual)

---

## Project Structure

```
ghana_finance_weather_site/
├── netlify/
│   └── functions/
│       └── currency.js     ← Serverless API proxy
├── css/
├── js/
│   ├── app.js
│   ├── config.js
│   ├── api/
│   ├── modules/
│   └── utils/
├── assets/
├── index.html
├── netlify.toml
├── .gitignore
└── README.md
```

---

## Local Development

```bash
# Serve locally (required for ES modules)
npx serve .

# Or use VS Code Live Server extension
# Right-click index.html → Open with Live Server
```

---

## Deployment (Netlify)

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/ghana-finance-weather.git
git push -u origin main
```

### 2. Deploy on Netlify
1. Go to netlify.com → Add new site → Import from GitHub
2. Select your repo
3. Leave build command blank, publish directory as `.`
4. Click Deploy

### 3. Add Environment Variable
In Netlify dashboard:
```
Site settings → Environment variables → Add variable
Key:   EXCHANGERATE_KEY
Value: your_exchangerate_api_key
```

### 4. Add Custom Domain (optional)
```
Site settings → Domain management → Add custom domain
```
Then update nameservers on Namecheap to point to Netlify.

---

## API Keys

| API | Key Required | Where to get |
|-----|-------------|--------------|
| ExchangeRate-API | ✅ Yes | exchangerate-api.com |
| Open-Meteo | ❌ No | Free, no signup |
| CoinGecko | ❌ No | Free public endpoint |

---

## Updating Manual Data

**Fuel prices** — Edit `js/api/fuel.js`, update prices and `lastUpdated` date.
**GSE stocks** — Edit `js/api/stocks.js`, update prices and `lastUpdated` date.

Check NPA Ghana (npa.gov.gh) and GSE (gse.com.gh) for latest figures.

---

## License
© 2026 GhanaFi. Built in Ghana 🇬🇭. All rights reserved.