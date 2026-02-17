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
- `WeatherWidget.svelte` - Počasie z Open-Meteo API
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

## Poznámky pre vývoj

- Pri pridávaní novej stránky nezabudni na `+page.ts` s `entries()`
- Preklady pridaj do všetkých 3 súborov: `sk.ts`, `en.ts`, `ru.ts`
- Obrázky dávaj do `/static/images/`
- CSS triedy používaj z global.css, nevytváraj nové ak nie je nutné
- **Spacing:** Vždy používaj `var(--space-X)` namiesto px hodnôt
- **Animácie:** Rešpektuj `prefers-reduced-motion` pre accessibility
- **Mobile breakpoint:** 768px (tablet), 480px (mobile)

---

## V2 Classic UI Redesign (branch: v2-classic)

### Deployment

Dva samostatné Vercel projekty:

| Projekt | Branch | URL |
|---------|--------|-----|
| pristav-kormoran | master | https://pristav-kormoran.vercel.app |
| pristav-kormoran-v2 | v2-classic | https://pristav-kormoran-v2.vercel.app |

**Vercel CLI príkazy:**
```bash
# Prepnúť na v2 projekt
vercel link --project pristav-kormoran-v2 --yes

# Deploy na v2 produkciu
vercel --prod

# Prepnúť späť na pôvodný projekt
vercel link --project pristav-kormoran --yes
```

### Design System - Classic Maritime Style

**Farebná paleta:**
- Hero pozadie: `bg-slate-800`
- Hero gradient: `bg-gradient-to-t from-slate-800 via-slate-800/80 to-slate-800/60`
- Content sekcie: `bg-white` a `bg-gray-50` (striedavo)
- Accent: `text-orange-400`, `bg-orange-500`, `border-orange-500/30`
- Text: `text-gray-900` (headings), `text-gray-600` (body)

**Hero Section Pattern:**
```svelte
<section class="relative min-h-[40vh] overflow-hidden bg-slate-800 md:min-h-[50vh]">
  <!-- Background Image -->
  <div class="absolute inset-0">
    <img src="/images/xxx.jpg" alt="" class="h-full w-full object-cover opacity-40" />
    <div class="absolute inset-0 bg-gradient-to-t from-slate-800 via-slate-800/80 to-slate-800/60"></div>
  </div>

  <!-- Content -->
  <div class="relative z-10 flex min-h-[40vh] flex-col items-center justify-center px-5 py-20 text-center sm:px-6 md:min-h-[50vh] lg:px-8">
    <span class="mb-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-orange-400">
      <span class="icon-anchor"></span>
      <span>{translations.nav.xxx}</span>
    </span>
    <h1 class="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
      {translations.xxx.title}
    </h1>
  </div>
</section>
```

**Content Card Pattern:**
```svelte
<div class="rounded-xl border border-gray-200 bg-white p-6 shadow-md md:p-8 lg:p-10">
  <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500 text-white shadow-md">
    <span class="icon-xxx" style="font-size: 22px;"></span>
  </div>
  <h2 class="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">...</h2>
  <p class="text-base leading-relaxed text-gray-600 md:text-lg">...</p>
</div>
```

**Image with Accent Border:**
```svelte
<div class="relative">
  <div class="overflow-hidden rounded-xl shadow-xl lg:rounded-2xl">
    <img src="..." alt="..." class="w-full" loading="lazy" />
  </div>
  <!-- Accent border -->
  <div class="absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-xl border-2 border-orange-500/30 lg:-bottom-4 lg:-right-4 lg:rounded-2xl"></div>
</div>
```

**Contact Box Pattern:**
```svelte
<div class="flex items-center gap-3 rounded-lg border border-orange-200 bg-orange-50 p-4">
  <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500 text-white">
    <span class="icon-phone" style="font-size: 18px;"></span>
  </span>
  <div>
    <span class="text-sm text-gray-500">{label}</span>
    <a href="tel:..." class="block font-semibold text-orange-500 transition-colors hover:text-orange-600">
      +421 xxx xxx xxx
    </a>
  </div>
</div>
```

**CTA Section Pattern:**
```svelte
<section class="bg-white py-12 md:py-16 lg:py-20">
  <div class="mx-auto max-w-4xl px-5 text-center sm:px-6 lg:px-8">
    <h2 class="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl md:mb-5">
      {translations.home.ctaTitle}
    </h2>
    <a href={routes.contact}
       class="inline-flex items-center justify-center gap-2.5 rounded-lg bg-orange-500 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-xl">
      <span>{translations.home.contactUs}</span>
      <span class="icon-mail"></span>
    </a>
  </div>
</section>
```

### FloatingNav Component

Floating navigation s klasickým štýlom:
- Desktop: `rounded-xl border border-gray-200 bg-white shadow-lg`
- Mobile: Hamburger button s fullscreen overlay menu
- Z-index: Nav bar `z-50`, Mobile overlay `z-100`
- Hide on scroll down, show on scroll up
- Bez uppercase textu (normálny case)

**Mobile Menu Overlay:**
- Fullscreen backdrop s `bg-black/60` a `backdrop-blur`
- Menu panel s bounce animáciou
- Escape key zatvorí menu
- Body scroll lock keď je otvorené

### Icon Classes

Používaj icon font triedy namiesto emoji:
- `icon-anchor` - kotva
- `icon-ship` - loď
- `icon-mail` - obálka
- `icon-phone` - telefón
- `icon-sailor` - námorník
- `icon-earth` - zemeguľa
- `icon-beach` - pláž
- `icon-wheel` - kormidlo
- `icon-life-wheel` - záchranný kruh
- `icon-destination` - destinácia
- `icon-calendar` - kalendár

### Responsive Breakpoints

```css
/* Mobile first */
px-5 py-16                    /* Base mobile */
sm:px-6                       /* 640px+ */
md:py-20 md:min-h-[50vh]     /* 768px+ */
lg:px-8 lg:py-24             /* 1024px+ */
```

### Aktualizované stránky (v2-classic)

Všetky stránky prerobené na classic štýl:
- `+page.svelte` (landing)
- `about-us`, `o-nas`
- `ports`, `pristavy`, `porty`
- `contact`, `kontakt`
- `botel-kormoran`
- `news`, `novinky`, `novosti`
- `boat-trips`, `vylety-lodou`, `progulki-na-lodke`
- `region`

### UI Komponenty zachované

- `FloatingNav` - floating navigation bar
- `InfiniteMovingCards` - carousel s portami (zjednodušený dizajn)
- `WaveEffect` - vlnová animácia v hero sekcii
