# Prístav Kormorán - SvelteKit 5

Moderná webová stránka pre Prístavy Kormorán, migrovaná zo statického HTML do SvelteKit 5 s SSG (Static Site Generation).

## Quick Start

```bash
# Inštalácia závislostí
pnpm install

# Development server
pnpm dev

# Production build
pnpm build

# Preview production
pnpm preview

# Type checking
npx svelte-check
```

## Tech Stack

| Technológia | Verzia | Účel |
|------------|--------|------|
| SvelteKit | 2.52+ | Framework |
| Svelte | 5.51+ | UI s runes ($state, $props, $derived, $effect) |
| TypeScript | 5.9+ | Type safety |
| Vite | 7.3+ | Build tool |
| Static Adapter | 3.x | SSG pre Vercel |
| pnpm | latest | Package manager |

## Štruktúra projektu

```
src/
├── lib/
│   ├── components/
│   │   ├── layout/           # Header, MainNav, Footer
│   │   ├── header/           # SocialLinks, LanguageSelector, WeatherWidget
│   │   ├── ui/               # Divider, PageTitle, CategoryCard, Image
│   │   └── content/          # Page-specific komponenty
│   ├── i18n/
│   │   ├── config.ts         # Jazyková konfigurácia
│   │   ├── types.ts          # TypeScript typy pre preklady
│   │   ├── index.ts          # t() funkcia a helpery
│   │   └── translations/     # sk.ts, en.ts, ru.ts
│   └── styles/
│       └── global.css        # Globálne štýly, CSS variables, font-faces
├── routes/
│   ├── +layout.svelte        # Root layout (importuje global.css)
│   ├── +layout.ts            # Prerender config
│   ├── +error.svelte         # Error page
│   └── [[lang=lang]]/        # Language-aware routes
│       ├── +layout.svelte    # Header, MainNav, Footer wrapper
│       ├── +layout.ts        # Language detection
│       ├── +page.svelte      # Homepage
│       ├── o-nas/            # SK: O nás
│       ├── about-us/         # EN: About us
│       ├── novinky/          # SK: Novinky
│       ├── news/             # EN: News
│       ├── novosti/          # RU: Новости
│       ├── region/           # Všetky jazyky
│       ├── pristavy/         # SK: Prístavy
│       ├── ports/            # EN: Ports
│       ├── porty/            # RU: Порты
│       ├── botel-kormoran/   # Všetky jazyky
│       ├── vylety-lodou/     # SK: Výlety loďou
│       ├── boat-trips/       # EN: Boat trips
│       ├── progulki-na-lodke/# RU: Прогулки на лодке
│       ├── kontakt/          # SK, RU: Kontakt
│       └── contact/          # EN: Contact
├── params/
│   └── lang.ts               # Route matcher pre en/ru
├── hooks.server.ts           # Sets HTML lang attribute
└── app.html                  # HTML template s preloads
```

## i18n Systém

### Konfigurácia jazykov

```typescript
// src/lib/i18n/config.ts
export const LANGUAGES = [
  { code: 'sk', label: 'slovenský', htmlLang: 'sk' },
  { code: 'en', label: 'english', htmlLang: 'en' },
  { code: 'ru', label: 'русский', htmlLang: 'ru' }
];

export const DEFAULT_LANGUAGE = 'sk';
```

### Použitie v komponentoch

```svelte
<script lang="ts">
  import { t, getNavRoutes, type LanguageCode } from '$lib/i18n';

  interface Props {
    lang: LanguageCode;
  }

  let { lang }: Props = $props();

  const translations = $derived(t(lang));
  const routes = $derived(getNavRoutes(lang));
</script>

<h1>{translations.nav.about}</h1>
<a href={routes.about}>Link</a>
```

### URL štruktúra

| Jazyk | Prefix | Príklad |
|-------|--------|---------|
| SK (default) | žiadny | `/`, `/o-nas/`, `/pristavy/` |
| EN | `/en/` | `/en/`, `/en/about-us/`, `/en/ports/` |
| RU | `/ru/` | `/ru/`, `/ru/o-nas/`, `/ru/porty/` |

## Svelte 5 Patterns

### $props() - Typované props

```svelte
<script lang="ts">
  interface Props {
    title: string;
    variant?: 'orange' | 'white';
  }

  let { title, variant = 'white' }: Props = $props();
</script>
```

### $state() - Reaktívny stav

```svelte
<script lang="ts">
  let count = $state(0);
  let items = $state<string[]>([]);
</script>
```

### $derived() - Computed values

```svelte
<script lang="ts">
  let { lang }: Props = $props();

  const translations = $derived(t(lang));
  const isActive = $derived(currentPath === route);
</script>
```

### $effect() - Side effects (nahrádza onMount)

```svelte
<script lang="ts">
  $effect(() => {
    const controller = new AbortController();

    fetchData(controller.signal);

    return () => {
      controller.abort(); // Cleanup
    };
  });
</script>
```

## Komponenty

### Layout komponenty

| Komponent | Popis |
|-----------|-------|
| `Header.svelte` | Social links, language selector, weather widget |
| `MainNav.svelte` | Hlavná navigácia s logom |
| `Footer.svelte` | Footer s navigáciou a kontaktom |

### UI komponenty

| Komponent | Props | Popis |
|-----------|-------|-------|
| `Divider.svelte` | `icon?: string` | Dekoratívny oddeľovač |
| `PageTitle.svelte` | `title, variant?, hasImage?` | Nadpis stránky |
| `CategoryCard.svelte` | `image, imageAlt, icon, title` | Kategória na homepage |
| `Image.svelte` | `src, alt, loading?, decoding?` | Optimalizovaný obrázok |

### Header komponenty

| Komponent | Props | Popis |
|-----------|-------|-------|
| `SocialLinks.svelte` | - | Facebook, Instagram linky |
| `LanguageSelector.svelte` | `currentLang` | Prepínač jazykov |
| `WeatherWidget.svelte` | `lang` | Počasie pre 3 lokality |

## Weather Widget

Používa Open-Meteo API (free, bez API kľúča).

### Lokality

| Mesto | Súradnice |
|-------|-----------|
| Bratislava | 48.1486, 17.1077 |
| Šamorín | 48.0258, 17.3119 |
| Čilistov | 48.0583, 17.2750 |

### Ikony počasia

| WMO Code | Ikona |
|----------|-------|
| 0 | icon-clear-sky |
| 1-2 | icon-few-clouds |
| 3 | icon-scattered-clouds |
| 45-48 | icon-mist |
| 51-57 | icon-shower-rain |
| 61-67 | icon-rain |
| 71-77, 85-86 | icon-snow |
| 95-99 | icon-thunderstorm |

## CSS Architektúra

### CSS Custom Properties

```css
:root {
  /* Colors */
  --color-primary: #f60;
  --color-primary-dark: #ee5800;
  --color-text-dark: #000;
  --color-text-primary: #646464;
  --color-border-light: #f1f2f2;

  /* Typography */
  --font-primary: 'ralewayregular', sans-serif;
  --font-light: 'ralewaylight', sans-serif;

  /* Layout */
  --layout-max-width: 820px;
  --layout-nav-height: 75px;
  --layout-footer-height: 199px;
}
```

### Font-faces

- **Raleway**: regular, light, medium, bold
- **icomoon**: ikony (wheel, anchor, ship, mail, atď.)

## Static Generation

Každá stránka má `+page.ts` s `entries()` funkciou:

```typescript
// Pre SK-only stránky
export const entries = () => [
  {},           // SK (default)
  { lang: 'ru' } // RU uses same slug
];

// Pre EN-only stránky
export const entries = () => [
  { lang: 'en' }
];

// Pre všetky jazyky
export const entries = () => [
  {},
  { lang: 'en' },
  { lang: 'ru' }
];
```

## MCP Integration

Svelte MCP server pre prístup k dokumentácii:

```bash
# Zoznam sekcií dokumentácie
npx @sveltejs/mcp list-sections

# Získanie dokumentácie
npx @sveltejs/mcp get-documentation "svelte/basic-markup,kit/routing"

# Autofixer
npx @sveltejs/mcp svelte-autofixer "code here"
```

Konfigurácia v `.claude/settings.local.json`.

## Build & Deploy

```bash
# Production build
pnpm build

# Output v /build priečinku
# Pripravené pre Vercel, Netlify, alebo akýkoľvek static hosting
```

### Vercel Deploy

1. Push do GitHub
2. Import projekt do Vercel
3. Framework: SvelteKit (auto-detected)
4. Build command: `pnpm build`
5. Output directory: `build`

## Migrácia z pôvodného HTML

| Pôvodné | Nové SvelteKit |
|---------|----------------|
| `/sk/index.html` | `/` |
| `/sk/o-nas.html` | `/o-nas/` |
| `/en/about-us.html` | `/en/about-us/` |
| `/ru/o-nas.html` | `/ru/o-nas/` |
| Inline JS | Svelte komponenty |
| Minifikovaný CSS | CSS variables + global.css |

## Assets

| Priečinok | Obsah |
|-----------|-------|
| `/static/images/` | Všetky obrázky |
| `/static/fonts/raleway/` | Raleway font variants |
| `/static/fonts/icons/` | icomoon icon font |

## TODO / Ďalšie vylepšenia

- [ ] Pridať Service Worker pre offline support
- [ ] Implementovať sitemap.xml
- [ ] Pridať Open Graph meta tagy
- [ ] Optimalizovať obrázky (WebP, AVIF)
- [ ] Pridať kontaktný formulár
- [ ] Implementovať CMS integráciu pre novinky
