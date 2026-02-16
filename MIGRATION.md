# Migrácia z HTML do SvelteKit 5

Tento dokument popisuje migráciu webu Prístav Kormorán zo statického HTML do SvelteKit 5.

## Pôvodný projekt

**Lokácia:** `C:\Users\Juraj\Desktop\pristav_kormoran_html`

### Štruktúra pôvodného HTML

```
pristav_kormoran_html/
├── index.html          # Redirect na /sk/
├── sk/                 # Slovenské stránky
│   ├── index.html
│   ├── o-nas.html
│   ├── novinky.html
│   ├── region.html
│   ├── pristavy.html
│   ├── botel-kormoran.html
│   ├── vylety-lodou.html
│   └── kontakt.html
├── en/                 # Anglické stránky
├── ru/                 # Ruské stránky
├── styles/
│   ├── screen.css      # Minifikovaný CSS
│   ├── fonts/raleway/  # Fonty
│   └── icons/          # icomoon ikony
├── scripts/
│   └── weather.js      # Weather widget
└── images/             # Obrázky
```

## Nový SvelteKit projekt

**Lokácia:** `C:\Users\Juraj\Desktop\pristav-kormoran-sveltekit`

### Mapovanie URL

| Pôvodná URL | Nová SvelteKit URL |
|-------------|-------------------|
| `/sk/` | `/` |
| `/sk/index.html` | `/` |
| `/sk/o-nas.html` | `/o-nas/` |
| `/sk/novinky.html` | `/novinky/` |
| `/sk/region.html` | `/region/` |
| `/sk/pristavy.html` | `/pristavy/` |
| `/sk/botel-kormoran.html` | `/botel-kormoran/` |
| `/sk/vylety-lodou.html` | `/vylety-lodou/` |
| `/sk/kontakt.html` | `/kontakt/` |
| `/en/` | `/en/` |
| `/en/about-us.html` | `/en/about-us/` |
| `/en/news.html` | `/en/news/` |
| `/en/ports.html` | `/en/ports/` |
| `/en/boat-trips.html` | `/en/boat-trips/` |
| `/en/contact.html` | `/en/contact/` |
| `/ru/` | `/ru/` |
| `/ru/o-nas.html` | `/ru/o-nas/` |
| `/ru/novosti.html` | `/ru/novosti/` |
| `/ru/porty.html` | `/ru/porty/` |
| `/ru/progulki-na-lodke.html` | `/ru/progulki-na-lodke/` |
| `/ru/kontakt.html` | `/ru/kontakt/` |

## Čo bolo migrované

### 1. Layout komponenty

| Pôvodné | Nové |
|---------|------|
| `<div id="header">` v každom HTML | `Header.svelte` |
| `<div class="main-nav">` v každom HTML | `MainNav.svelte` |
| `<div id="footer">` v každom HTML | `Footer.svelte` |

### 2. Weather Widget

| Pôvodné | Nové |
|---------|------|
| `scripts/weather.js` | `WeatherWidget.svelte` |
| Vanilla JS | Svelte 5 s $effect() |
| setInterval | $effect() s cleanup |

### 3. Language Selector

| Pôvodné | Nové |
|---------|------|
| Inline `<script>` v HTML | `LanguageSelector.svelte` |
| `document.location = ...` | SvelteKit `goto()` |

### 4. CSS

| Pôvodné | Nové |
|---------|------|
| `styles/screen.css` (minified) | `src/lib/styles/global.css` |
| Hardcoded values | CSS custom properties |

### 5. Fonty

| Pôvodné | Nové |
|---------|------|
| `styles/fonts/raleway/` | `static/fonts/raleway/` |
| `styles/icons/` | `static/fonts/icons/` |
| Relatívne cesty v CSS | Absolútne cesty `/fonts/...` |

### 6. Obrázky

| Pôvodné | Nové |
|---------|------|
| `/images/` | `/static/images/` |
| Rovnaké súbory, bez zmien |

## Zmeny v architektúre

### Routing

**Pôvodné:**
- Samostatné HTML súbory pre každý jazyk
- Duplicita obsahu naprieč jazykmi

**Nové:**
- `[[lang=lang]]` optional parameter
- Zdieľané komponenty s prekladmi
- `entries()` funkcia pre static generation

### Preklady

**Pôvodné:**
- Hardcoded text v každom HTML súbore
- 3x duplicita pre 3 jazyky

**Nové:**
- Centralizované preklady v `src/lib/i18n/translations/`
- `t(lang)` funkcia vracia preklady
- TypeScript typy pre bezpečnosť

### State Management

**Pôvodné:**
- Globálne `window` premenné
- DOM manipulácia

**Nové:**
- Svelte 5 runes ($state, $derived, $effect)
- Reaktivita bez manuálnej DOM manipulácie

## Vylepšenia oproti pôvodnému

1. **Type Safety** - TypeScript namiesto plain JS
2. **Komponenty** - Reusable Svelte komponenty
3. **Reaktivita** - Automatická s Svelte 5 runes
4. **SEO** - Dynamické `<title>` a meta tagy
5. **Performance** - Preload fontov, preconnect API
6. **Accessibility** - aria-* atribúty
7. **DX** - Hot reload, error overlay
8. **Build** - Optimalizovaný bundle

## Čo zostáva rovnaké

- **Vizuálny dizajn** - 1:1 identický
- **Fonty** - Raleway, icomoon
- **Farby** - #f60 primárna, atď.
- **Layout** - Sticky footer, max-width 820px
- **Obrázky** - Všetky pôvodné

## Redirecty pre spätná kompatibilitu

Ak potrebuješ zachovať staré URL, pridaj do `vercel.json`:

```json
{
  "redirects": [
    { "source": "/sk/", "destination": "/", "permanent": true },
    { "source": "/sk/o-nas.html", "destination": "/o-nas/", "permanent": true },
    { "source": "/sk/novinky.html", "destination": "/novinky/", "permanent": true },
    { "source": "/sk/region.html", "destination": "/region/", "permanent": true },
    { "source": "/sk/pristavy.html", "destination": "/pristavy/", "permanent": true },
    { "source": "/sk/botel-kormoran.html", "destination": "/botel-kormoran/", "permanent": true },
    { "source": "/sk/vylety-lodou.html", "destination": "/vylety-lodou/", "permanent": true },
    { "source": "/sk/kontakt.html", "destination": "/kontakt/", "permanent": true },
    { "source": "/en/about-us.html", "destination": "/en/about-us/", "permanent": true },
    { "source": "/en/news.html", "destination": "/en/news/", "permanent": true },
    { "source": "/en/region.html", "destination": "/en/region/", "permanent": true },
    { "source": "/en/ports.html", "destination": "/en/ports/", "permanent": true },
    { "source": "/en/botel-kormoran.html", "destination": "/en/botel-kormoran/", "permanent": true },
    { "source": "/en/boat-trips.html", "destination": "/en/boat-trips/", "permanent": true },
    { "source": "/en/contact.html", "destination": "/en/contact/", "permanent": true }
  ]
}
```
