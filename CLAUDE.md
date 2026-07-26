# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static blog built on the [Fuwari](https://github.com/saicaca/fuwari) template using Astro 5, Svelte, and Tailwind CSS. The blog is deployed to Cloudflare Pages.

## Tech Stack

- **Framework**: Astro 5 with SSG (static site generation)
- **UI Components**: Svelte 5 (interactive) + Astro (static)
- **Styling**: Tailwind CSS with `@tailwindcss/typography`
- **Package Manager**: pnpm (enforced via `preinstall` hook)
- **Search**: Pagefind (runs post-build)

## Common Commands

```bash
pnpm dev          # Start dev server at localhost:4321
pnpm build        # Build to ./dist (runs astro build + pagefind)
pnpm preview      # Preview production build
pnpm check        # Run Astro type checks
pnpm format       # Format code with Biome
pnpm lint         # Lint code with Biome (writes changes)
pnpm new-post     # Create new post via scripts/new-post.js
pnpm astro ...    # Run Astro CLI (e.g., pnpm astro add)
```

## Content Structure

- **Posts**: `src/content/posts/` — Markdown files with YAML frontmatter
- **Spec pages**: `src/content/spec/` — Additional content collections
- **Frontmatter fields**: `title`, `published`, `updated`, `draft`, `description`, `image`, `tags`, `category`, `lang`

## Architecture

### Plugins (Remark/Rehype Pipeline)

Custom plugins extend Markdown processing in `src/plugins/`:

- `remark-reading-time` — Adds reading time calculation
- `remark-excerpt` — Extracts post excerpt
- `remark-directive-rehype` — Handles custom directives
- `rehype-component-admonition` — Renders admonitions (note, tip, warning, etc.)
- `rehype-component-github-card` — Renders GitHub repository cards
- `expressive-code/` — Custom Expressive Code plugins for code blocks (language badge, copy button)

### Page Routing

- `/` → `src/pages/[...page].astro`
- `/posts/[slug]` → `src/pages/posts/[...slug].astro`
- `/archive`, `/about`, `/donate` → Static pages
- `/rss.xml` → RSS feed
- `/robots.txt` → Robots.txt

### Layouts

- `src/layouts/Layout.astro` — Base HTML layout
- `src/layouts/MainGridLayout.astro` — Main content grid with sidebar

### Configuration

- `src/config.ts` — Site configuration (title, theme, navbar, profile, license)
- `astro.config.mjs` — Astro config (integrations, markdown plugins, build options)
- `biome.json` — Code formatting/linting rules

### Components

- `src/components/` — Astro and Svelte components
- `src/components/widget/` — Sidebar widgets (Profile, Categories, Tags, TOC, etc.)
- `src/components/control/` — UI controls (BackToTop, ButtonLink, Pagination)
- `src/components/misc/` — Miscellaneous (Markdown wrapper, ImageWrapper, License)

## Development Notes

- Theme color is configured via hue (0-360) in `src/config.ts`
- The site uses Swup for page transitions — containers `main` and `#toc` are excluded from animation
- Pagefind search index is generated post-build; search only works on production builds
- Draft posts (`draft: true`) are not included in production builds
