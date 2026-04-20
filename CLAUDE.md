# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Source for https://ma.tthew.berlin — an [Eleventy](https://11ty.dev) v3 site, ESM (`"type": "module"` in package.json). Node ≥18. Forked from `eleventy-base-blog` — the `name`/`repository` fields in `package.json` still reflect that upstream and are misleading (actual repo is `github.com/tthew/website`).

## Commands

- `npm start` — dev server with live reload (`@11ty/eleventy --serve --quiet`, default port 8080). Pass `--port=XXXX` via `npx` if a different port is needed.
- `npm run build` — production build to `_site/`. Also what Netlify runs (`netlify.toml`).
- `npm run debug` / `npm run debugstart` — verbose Eleventy debug logs.
- `npm run benchmark` — Eleventy benchmark logs.

No test runner.

## Required env (both builds **and** dev server)

`_data/words.js` fetches posts from a CraftCMS GraphQL endpoint at build time and **throws if the request fails or returns GraphQL errors — aborting the whole build**. So these must be set (typically in `.env`, which is loaded via `dotenv`):

```
API_URL=<craftcms graphql endpoint>
API_TOKEN=<bearer token>
```

`_data/links.js` fetches a separate links service but **fails gracefully** (empty array on error), so these are optional for local dev but needed for real link data:

```
LINKS_SERVICE_URL=...
LINKS_SERVICE_TOKEN=...
```

## Architecture

**Eleventy config lives at the root.** `eleventy.config.js` remaps the default dirs: input is `content/`, output is `_site/`, while `_includes/` and `_data/` sit at the repo root (the config uses `../` relative to input to reach them). Template engines: `njk` for both `.md` and `.html` preprocessing. Template formats: `md`, `njk`, `html`, `liquid`, `11ty.js`.

**Posts are sourced externally, not from files.** `_data/words.js` hits a CraftCMS GraphQL API, pulls all `wordsEntries` plus an `assets` collection, then post-processes each post's markdown body to rewrite `{asset:<id>}` placeholders into `![alt](url)` markdown image tags (resolved against the assets collection). Posts are then paginated into pages by `content/blog/_entry.njk`:

```
pagination: { data: words, size: 1, alias: post }
permalink: words/{{ post.slug }}/index.html
layout: layouts/post.njk
```

So **every post URL is `/words/<slug>/`** and the "page" is a pagination shard of the `words` data file — there are no per-post markdown files in the repo. Post bodies are rendered with the custom `markdown` filter (`_config/filters.js`), which is `markdown-it` + Prism syntax highlighting (with `tsx` as the default TS grammar and extra languages loaded for css/html/ts/jsx/tsx).

**`webWords` filter is load-bearing.** `content/words.njk` and feed templates use `webWords` (defined in `_config/filters.js`) to strip `rssOnly`, `Note`, and `TIL` post types from the public blog listing — but those posts still exist in the `words` collection. If you're adding a new post type that shouldn't show on the web, add it there; if something isn't showing up where expected, check this filter first.

**Drafts:** frontmatter `draft: true` + a preprocessor in `eleventy.config.js` that excludes the page *only* when `ELEVENTY_RUN_MODE === "build"`. Drafts render during `--serve` and are validated against `_data/eleventyDataSchema.js` (Zod).

**Per-page CSS/JS bundling.** Templates use the `{% css %}`/`{% js %}` paired shortcodes from Eleventy's built-in bundle plugin. `_includes/layouts/base.njk` inlines `public/css/index.css` plus the per-page CSS bundle into a `<style>` block, and emits the JS bundle via `{% getBundleFileUrl "js" %}`. CSS is organised with `@layer reset, variables, main, page;` — page-specific styles go into the `page` layer inside `{% css %}` blocks. Staatliches font is `<link rel="preload">`-ed from `/font/`.

**Image pipeline.** `@11ty/eleventy-img`'s transform plugin rewrites every `<img>` in the *output HTML* into responsive `<picture>` elements with `avif`, `webp`, and `auto` formats (`loading="lazy"`, `decoding="async"`). Watches `content/**/*.{svg,webp,png,jpeg}` for changes.

**Passthrough copy.** `./public/*` → `_site/*` root (so `public/css/*` becomes `/css/*`, etc.). Pretty feed XSLs are copied explicitly from `content/feed/`.

**ID Attribute plugin** auto-adds `id`s to headings `h1–h6` using Eleventy's slugify; the `<heading-anchors>` custom element from `@zachleat/heading-anchors` then decorates them with anchor links in post pages.

**SW cleanup.** `base.njk` has an inline script that unregisters any existing service workers and reloads — legacy cleanup from the previous Gatsby-era site. Don't add a new SW without understanding this path.

## Deploy

Netlify (`netlify.toml`) publishes `_site/` after `npm run build`. `vercel.json` sets `trailingSlash: true` for the alternate Vercel path. Redirects live in `public/_redirects`.
