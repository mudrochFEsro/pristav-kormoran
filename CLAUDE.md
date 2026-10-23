# CLAUDE.md

Tento súbor poskytuje kontext pre Claude Code pri práci s týmto projektom.

## Prehľad projektu

SvelteKit 5 webstránka pre Prístav Kormorán - slovenská firma prevádzkujúca prístavy na Dunaji. Migrované zo statického HTML do moderného SvelteKit s SSG.

## Príkazy

```bash
pnpm dev          # Development server (http://localhost:5173)
pnpm build        # Production build (output: /build)
pnpm preview      # Preview production build
pnpm test         # Unit testy (node --test, src/**/*.test.ts)
npx svelte-check  # TypeScript a Svelte kontrola
```

## Tech Stack

- **SvelteKit 2.52+** s **Svelte 5** (runes API)
- **TypeScript** pre type safety
- **Static Adapter** pre SSG
- **pnpm** package manager

## Architektúra

### Kľúčové priečinky

```
src/lib/components/     # Svelte komponenty
src/lib/i18n/          # Internationalization systém
src/lib/styles/        # Globálne CSS
src/routes/            # SvelteKit routes
src/params/            # Route matchers
static/                # Statické assets (obrázky, fonty)
```

### i18n Systém

**Jazyky:** SK (default), EN, RU

```typescript
// Použitie v komponente
import { t, getNavRoutes } from '$lib/i18n';

const translations = $derived(t(lang));  // Preklady
const routes = $derived(getNavRoutes(lang));  // URL adresy
```

**URL štruktúra:**
- SK: `/`, `/o-nas/`, `/pristavy/`
- EN: `/en/`, `/en/about-us/`, `/en/ports/`
- RU: `/ru/`, `/ru/o-nas/`, `/ru/porty/`

### Svelte 5 Runes

Projekt používa Svelte 5 runes syntax:

```svelte
<script lang="ts">
  // Props
  interface Props { title: string; }
  let { title }: Props = $props();

  // State
  let count = $state(0);

  // Derived/computed
  const doubled = $derived(count * 2);

  // Side effects (nahrádza onMount)
  $effect(() => {
    console.log('mounted');
    return () => console.log('cleanup');
  });
</script>
```

### Komponenty

**Layout:**
- `Header.svelte` - Social links, language selector (oranžový top bar)
- `MainNav.svelte` - Hlavná navigácia s logom, desktop menu, hamburger button
- `MobileMenu.svelte` - Mobilné menu (fullscreen overlay s animáciou)
- `Footer.svelte` - Footer s nav, info, social links

**UI:**
- `Divider.svelte` - Oddeľovač s ikonou
- `PageTitle.svelte` - Nadpis stránky (orange/white variant)
- `CategoryCard.svelte` - Karta kategórie
- `Image.svelte` - Lazy-loaded obrázok

**Header:**
- `WeatherWidget.svelte` - Počasie z Open-Meteo API + hladina a teplota Dunaja z `/api/danube`

**Dunaj (`src/lib/server/danube.ts`, route `src/routes/api/danube/+server.ts`):**
- Hladina + trend (3 h, ±2 cm) zo SHMÚ: Bratislava, Hamuliakovo (Šamorín), Dobrohošť (Čilistov)
- Teplota vody BA z Danube HIS (CC BY-NC-SA), fallback Wildungsmauer (Land NÖ); zdroj je v tooltipe
- Zdroje nemajú API ani CORS - parsuje sa HTML/JSON na serveri, Vercel ISR obnovuje každých 15 min
- Zlyhaný alebo starý (> 3 h) zdroj len skryje hodnotu; testy s reálnymi fixtures v `src/lib/server/fixtures/`
- `LanguageSelector.svelte` - Prepínač jazykov
- `SocialLinks.svelte` - Facebook, Instagram

### CSS

Všetky štýly v `src/lib/styles/global.css`:
- CSS custom properties (--color-primary, --font-primary, atď.)
- Font-face deklarácie (Raleway, icomoon)
- Pôvodné triedy z HTML verzie

#### Spacing System (8px grid)

Používaj CSS custom properties pre spacing, NIE hardcoded pixel hodnoty:

```css
--space-1: 4px;    /* 0.5x */
--space-2: 8px;    /* 1x */
--space-3: 12px;   /* 1.5x */
--space-4: 16px;   /* 2x */
--space-5: 20px;   /* 2.5x */
--space-6: 24px;   /* 3x */
--space-7: 32px;   /* 4x */
--space-8: 40px;   /* 5x */
--space-9: 48px;   /* 6x */
--space-10: 64px;  /* 8x */
```

Príklad použitia:
```css
padding: var(--space-4) var(--space-6);  /* 16px 24px */
gap: var(--space-3);                      /* 12px */
```

### Static Generation

Každá stránka má `+page.ts` s `entries()`:

```typescript
export const entries = () => [
  {},              // SK (default)
  { lang: 'en' },  // EN
  { lang: 'ru' }   // RU
];
```

## Dôležité súbory

| Súbor | Popis |
|-------|-------|
| `svelte.config.js` | SvelteKit config so static adapter |
| `src/app.html` | HTML template s preloads |
| `src/hooks.server.ts` | Nastavuje HTML lang attribute |
| `src/lib/i18n/index.ts` | Hlavný i18n export |
| `src/lib/styles/global.css` | Všetky CSS štýly |

## Animácie

### Svelte Transitions

Používame Svelte transitions pre plynulé animácie:

```svelte
<script>
  import { fade } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';

  // Custom bounce easing
  function bounceOut(t: number): number {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  }

  // Custom transition
  function scaleBounce(node: Element, { duration = 300 }) {
    return {
      duration,
      easing: bounceOut,
      css: (t: number) => `opacity: ${t}; transform: scale(${0.9 + t * 0.1});`
    };
  }
</script>

<!-- Použitie -->
<div in:scaleBounce={{ duration: 400 }} out:fade={{ duration: 200 }}>
```

### Mobile Menu Animácia

`MobileMenu.svelte` používa Scale + Fade + Bounce:
- **Otvorenie (400ms):** scale 90%→100% s bounce overshoot, fade in
- **Zatvorenie (200ms):** scale 100%→90%, fade out (cubicOut)
- **Backdrop:** fade 250ms s blur efektom

### Easing Variables

```css
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
```

## Best Practices použité

1. **$effect()** namiesto onMount() pre async operácie
2. **$derived()** pre computed values
3. **Keyed each blocks** `{#each items as item (item.id)}`
4. **AbortController** pre cleanup fetch requestov
5. **aria-** atribúty pre accessibility
6. **Preload** kritických fontov v app.html
7. **Preconnect** pre externé API
8. **prefers-reduced-motion** - zjednodušené animácie pre accessibility
9. **Focus trap** v modáloch (MobileMenu)
10. **Escape key** zatvorí modály

## MCP Integration

Svelte MCP server nakonfigurovaný v `.claude/settings.local.json`:

```bash
npx @sveltejs/mcp list-sections
npx @sveltejs/mcp get-documentation "svelte/runtime-reactivity-fundamentals"
```

## Navigácia a Layout

### Štruktúra hlavičky

```
+layout.svelte
├── Header.svelte (oranžový bar)
│   ├── SocialLinks.svelte
│   └── LanguageSelector.svelte
├── MainNav.svelte (biely bar s logom)
│   ├── Logo (link na home)
│   ├── Desktop nav links (skryté na mobile)
│   └── Hamburger button (viditeľný na mobile)
└── MobileMenu.svelte (fullscreen overlay, podmienečne renderované)
```

### Mobile Menu State

State pre mobile menu je v `+layout.svelte`:

```svelte
let isMobileMenuOpen = $state(false);

function toggleMobileMenu() {
  isMobileMenuOpen = !isMobileMenuOpen;
}

<MainNav {lang} {isMobileMenuOpen} onToggleMobileMenu={toggleMobileMenu} />
<MobileMenu {lang} bind:isOpen={isMobileMenuOpen} onClose={() => isMobileMenuOpen = false} />
```

### Desktop Nav Equal Widths

MainNav používa `flex: 1 1 0` pre rovnomernú šírku položiek:

```css
.nav__link {
  flex: 1 1 0;
  min-width: 80px;
  max-width: 130px;
}
```

## Kontaktné údaje

**Port manager:** Robert Seidner
- Telefón: +421 902 199 480
- Email: robertj@seidner.sk

**Prevádzkovateľ:** BROSS for PARTNERS, a.s.
- Adresa: Hollého 1, 81108, Bratislava
- IČO: 35 853 603
- DIČ: 2021727004
- IČDPH: SK2021727004

## SEO / GEO / AEO

### Štruktúrované dáta (JSON-LD)

Všetky schémy sú v `src/lib/seo/SEO.svelte`:
- **Organization** - firemné údaje, sídlo (Hollého 1, Bratislava)
- **LocalBusiness + TouristAttraction** - sieť prístavov (marina cez Wikidata `additionalType`, schema.org nemá typ Marina)
- **LocalBusiness + BoatTerminal** - 6 prístavov ako samostatné miesta (home + Prístavy)
- **BarOrPub** - zimný bar SUNSET s otváracími hodinami (home + Novinky)
- **WebSite**, **WebPage** (+ Speakable), **BreadcrumbList**
- **FAQPage** - 10 otázok v každom jazyku, **zobrazené aj na home** (`Faq.svelte`) - musia sa zhodovať
- **HowTo** - návod na rezerváciu (stránky výletov loďou)
- **TouristDestination** - región Žitný ostrov (GEO)

Canonical, hreflang, `sitemap.xml` a `llms.txt` sa generujú zo spoločnej mapy stránok (`getNavRoutes` v `$lib/i18n`).
Do FAQ ani dát nepridávaj neoverené fakty (hodiny, ceny, GPS) - zobrazujú sa v Google a AI odpovediach.

### Konfigurácia

Všetky SEO dáta sú centralizované v `src/lib/seo/config.ts`:
- `siteConfig` - základné info, kontakty, sídlo, social
- `locations` - 6 prístavov (presné GPS len Čilistov)
- `venues` - sezónne prevádzky s hodinami (SUNSET) - drž v súlade s Novinkami
- `hiddenPages` - dočasne skryté stránky (mimo sitemap a llms.txt)
- `services`, `faq`, `howToBookBoatTrip`, `keywords`

### Obrázky

Masters sú v `static/images/` (WebP, kvalita 80-85). Na stránkach používaj `responsive()`:
`<img {...responsive('/images/x.webp')} sizes="…" alt="" />`. Responzívne varianty (`static/images/webp/*-{w}.webp`)
a manifest vygeneruje `pnpm images` (potrebuje `cwebp`).

## Poznámky pre vývoj

- Pri pridávaní novej stránky nezabudni na `+page.ts` s `entries()`
- Preklady pridaj do všetkých 3 súborov: `sk.ts`, `en.ts`, `ru.ts`
- Obrázky dávaj do `/static/images/` vo formáte **WebP** a spusti `pnpm images`
- CSS triedy používaj z global.css, nevytváraj nové ak nie je nutné
- **Spacing:** Vždy používaj `var(--space-X)` namiesto px hodnôt
- **Animácie:** Rešpektuj `prefers-reduced-motion` pre accessibility
- **Mobile breakpoint:** 768px (tablet), 480px (mobile)
- **SEO:** Pri zmene kontaktov aktualizuj `src/lib/seo/config.ts` a všetky stránky
