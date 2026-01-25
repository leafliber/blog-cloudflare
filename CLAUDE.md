# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static blog template built with Astro, deployed to Cloudflare Pages. The blog supports multi-language content with Chinese as the primary language.

## Development Commands

| Command | Description |
|---------|-------------|
| `pnpm install` | Install dependencies (pnpm is required) |
| `pnpm dev` | Start development server at `localhost:4321` |
| `pnpm build` | Build production site to `./dist/` (includes Pagefind search index) |
| `pnpm preview` | Preview production build locally |
| `pnpm check` | Run Astro type checking |
| `pnpm format` | Format code with Biome |
| `pnpm lint` | Check code with Biome (and auto-fix) |
| `pnpm type-check` | Run TypeScript type checking |
| `pnpm new-post <filename>` | Create a new post in `src/content/posts/` |
| `pnpm clean` | Clean build artifacts |
| `pnpm clean:all` | Clean all artifacts including node_modules |

## Architecture Highlights

### Content Management
- Blog posts are managed using **Astro Content Collections** (`src/content/`)
- Post schema is defined in `src/content/config.ts`
- Frontmatter fields: `title`, `published`, `updated`, `draft`, `description`, `image`, `tags`, `category`, `lang`
- The `draft` field controls whether posts appear in the build

### Markdown Pipeline
The build process uses a custom Markdown processing pipeline defined in `astro.config.mjs`:

**Remark plugins (markdown-to-ast)**:
- `remarkMath` + `rehypeKatex` - LaTeX math support
- `remarkReadingTime` - Calculate reading time
- `remarkExcerpt` - Generate excerpts
- `remarkGithubAdmonitionsToDirectives` - Convert GitHub-style admonitions
- `remarkDirective` + `parseDirectiveNode` - Handle custom directives

**Rehype plugins (ast-to-html)**:
- `rehypeComponents` - Render custom components (admonitions, GitHub cards)
- `rehypeAutolinkHeadings` - Add anchor links to headings
- `rehypeSlug` - Generate heading slugs for TOC

Custom plugins are located in `src/plugins/`:
- `expressive-code/` - Code block styling (collapsible sections, line numbers, language badges)
- `rehype-component-*.mjs` - Custom component rendering
- `remark-*.js` - Custom remark transformations

### Site Configuration
All site-wide configuration is in `src/config.ts`:
- `siteConfig` - Title, subtitle, language, theme settings, banner
- `navBarConfig` - Navigation links (uses `LinkPreset` helpers for common links)
- `profileConfig` - Author avatar, name, bio, social links
- `licenseConfig` - Post license
- `expressiveCodeConfig` - Code block theme

### Page Transitions
- Uses **@swup/astro** for smooth page transitions
- Swup is configured to animate `<main>` and `#toc` containers
- Transition classes: `transition-swup-enter` and `transition-swup-leave`
- Layout.astro contains Swup hook integrations for theme loading, scrollbar styling, and banner animations

### Component Structure
Key components in `src/components/`:
- `Navbar.astro` - Navigation with hamburger menu
- `PostCard.astro` - Post preview cards
- `PostPage.astro` - Single post layout
- `LightDarkSwitch.svelte` - Theme toggler (Svelte component)
- `Search.svelte` - Pagefind-based search
- `ArchivePanel.svelte` - Post archive by date/category
- `Footer.astro` - Site footer

### Styling System
- **Tailwind CSS** with nesting enabled
- Custom CSS variables for theme colors:
  - `--hue` - Primary color hue (0-360)
  - `--page-bg`, `--card-bg`, `--primary` - Theme colors
  - Banner heights and transitions
- Styles are split between:
  - `src/styles/` - Global styles and component-specific CSS
  - Component `<style>` blocks in Astro/Svelte files
- Themes switch via `dark` class on `<html>`, stored in localStorage

### Layout Hierarchy
```
Layout.astro (base layout with head, body, font loading, Swup init)
  └─ MainGridLayout.astro (sidebar + main content grid)
      ├─ <slot name="banner"> (optional banner)
      ├─ <slot name="main"> (page content)
      └─ <slot name="sidebar-right"> (TOC, profile card)
```

### Deployment
- Primary target: **Cloudflare Pages** (configured via `wrangler.jsonc`)
- Assets directory: `./dist` (output from `pnpm build`)
- Alternate deployment supported: Vercel, Netlify, GitHub Pages

## Code Style

- **Formatting**: Biome (tab indentation, double quotes)
- **Linting**: Biome with rule overrides for `.astro`, `.svelte`, `.vue` (relaxed unused variable rules)
- Auto-import organization is enabled in Biome config

## Important Notes

- The site language is Chinese (`zh_CN`), so when editing content or configs, preserve Chinese text unless specifically asked to translate
- When creating posts, dates are in `YYYY-MM-DD` format
- Images in posts can be relative to the post file (e.g., `./cover.jpg`) or absolute paths from `/public/`
- Pagefind search index is built during `pnpm build` with `pagefind --site dist`
- Custom admonitions use directive syntax: `:::note`, `:::tip`, `:::warning`, `:::important`, `:::caution`