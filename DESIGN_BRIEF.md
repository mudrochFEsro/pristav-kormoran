# Design Brief - Prístav Kormorán Landing Page

## Zadanie

Landing page pre prístav na Dunaji - spojiť moderné a tradičné.

## Inšpirácia

Použiť komponenty z: https://aceternity.sveltekit.io/components

## Koncept

- **Moderné:** Animované UI komponenty (Aceternity), smooth transitions, interaktívne efekty
- **Tradičné:** Dunajská tematika, námorné prvky, prírodné farby, história prístavu

## Implementované komponenty

- [x] BackgroundBeams - CTA sekcia
- [x] BentoGrid - Vybavenie sekcia
- [x] CardSpotlight - Služby karty
- [x] FloatingNav - Hlavná navigácia (desktop + mobile hamburger)
- [x] GlowingText - CTA nadpis
- [x] GradientAnimation - K dispozícii
- [x] GridBackground - K dispozícii
- [x] HoverCard - K dispozícii
- [x] InfiniteMovingCards - Prístavy carousel
- [x] LampEffect - K dispozícii
- [x] Meteors - K dispozícii
- [x] MovingBorder - CTA tlačidlo
- [x] Sparkles - Hero sekcia
- [x] Spotlight - K dispozícii
- [x] TextGenerateEffect - Hero popis
- [x] TypewriterEffect - Hero subtitle
- [x] WaveEffect - Hero a Location sekcie

## Mobile & Tablet Optimalizácia

- Responsive breakpointy: sm (640px), md (768px), lg (1024px)
- FloatingNav: Desktop plná nav, Mobile hamburger menu s language selector
- BentoGrid: Single column na mobile, 3 columns na desktop
- CardSpotlight: Menšie padding na mobile
- InfiniteMovingCards: Menšie karty na mobile (260px vs 350px)
- Hero: Skryté Sparkles na mobile pre výkon
- CTA: Skryté BackgroundBeams na mobile pre výkon
- Tlačidlá: Stacked na mobile, inline na desktop
- Typography: Responsive veľkosti (text-2xl sm:text-3xl md:text-5xl)

## Poznámky

- Rešpektovať existujúci i18n systém (SK, EN, RU)
- Použiť Svelte 5 runes syntax
- Zachovať accessibility (prefers-reduced-motion)
- A11y: ARIA roles pre interaktívne elementy
