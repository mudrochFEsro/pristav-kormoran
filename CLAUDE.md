# CLAUDE.md

Tento súbor poskytuje kontext pre Claude Code pri práci s týmto projektom.

## Prehľad projektu

SvelteKit 5 webstránka pre Prístav Kormorán - slovenská firma prevádzkujúca prístavy na Dunaji. Migrované zo statického HTML do moderného SvelteKit s SSG.

## Príkazy

```bash
pnpm dev          # Development server (http://localhost:5173)
pnpm build        # Production build (output: /build)
pnpm preview      # Preview production build
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
- `Header.svelte` - Social links, language selector, weather
- `MainNav.svelte` - Navigácia s logom
- `Footer.svelte` - Footer

**UI:**
- `Divider.svelte` - Oddeľovač s ikonou
- `PageTitle.svelte` - Nadpis stránky (orange/white variant)
- `CategoryCard.svelte` - Karta kategórie
- `Image.svelte` - Lazy-loaded obrázok

**Header:**
- `WeatherWidget.svelte` - Počasie z Open-Meteo API
- `LanguageSelector.svelte` - Prepínač jazykov
- `SocialLinks.svelte` - Facebook, Instagram

### CSS

Všetky štýly v `src/lib/styles/global.css`:
- CSS custom properties (--color-primary, --font-primary, atď.)
- Font-face deklarácie (Raleway, icomoon)
- Pôvodné triedy z HTML verzie

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

## Best Practices použité

1. **$effect()** namiesto onMount() pre async operácie
2. **$derived()** pre computed values
3. **Keyed each blocks** `{#each items as item (item.id)}`
4. **AbortController** pre cleanup fetch requestov
5. **aria-** atribúty pre accessibility
6. **Preload** kritických fontov v app.html
7. **Preconnect** pre externé API

## MCP Integration

Svelte MCP server nakonfigurovaný v `.claude/settings.local.json`:

```bash
npx @sveltejs/mcp list-sections
npx @sveltejs/mcp get-documentation "svelte/runtime-reactivity-fundamentals"
```

## Poznámky pre vývoj

- Pri pridávaní novej stránky nezabudni na `+page.ts` s `entries()`
- Preklady pridaj do všetkých 3 súborov: `sk.ts`, `en.ts`, `ru.ts`
- Obrázky dávaj do `/static/images/`
- CSS triedy používaj z global.css, nevytváraj nové ak nie je nutné
