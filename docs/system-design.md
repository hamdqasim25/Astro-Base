# Application Architecture & System Design

Updated **10 October 2026**. This document began as the Stage 2 application plan; it now describes the implemented working tree. The original content-first principle remains. See the [progress report](progress-report.md) for milestones and remaining work.

## V1 Scope

Implemented: landing page, command library, environment/category listings, dynamic command details, global search, difficulty filtering on environment/category listings, syntax colours and legend, examples and output explanations, shared navigation, About and Support.

The library contains six commands across Windows CMD, PowerShell and Linux Bash. Responsive styles exist, but comprehensive device and accessibility testing remains outstanding. Accounts, favourites, quizzes, learning progress and interactive troubleshooting are future features.

## Landing Page & Navigation

The server-rendered root [layout](../src/app/layout.tsx) includes the shared [navbar](../src/components/navbar.tsx) on every route:

- Moon SVG and separate HTML AstroBase wordmark linking home.
- GET search targeting `/commands`, with URL query preservation on results.
- Browse dropdown populated from [filter definitions](../src/data/filters.ts).
- Commands, About and Support links.

The landing page retains its hero, command specimen and environment/topic cards. Search and Browse are not duplicated in page content.

Browse opens on click/tap, not hover. It closes on repeat click, link selection, outside pointer/focus activity or Escape. The button exposes expanded state and controls; arrow keys, Home/End and native Tab navigation support keyboard use. Escape returns focus to the trigger. Desktop controls align horizontally; mobile rows keep controls within the viewport.

The transparent [public moon SVG](../public/astrobase-moon.svg) displays at 36px on mobile and 40px at larger breakpoints. [App Router icon.svg](../src/app/icon.svg) supplies the matching favicon. The wordmark remains HTML.

### Browse by Environment and Category

Environment slugs are `cmd`, `powershell` and `bash`. Category slugs are `networking`, `files`, `system`, `processes`, `users` and `troubleshooting`. Longer landing-card titles are presentation text, not additional routes.

## Command Listing Pages

Library search uses the trimmed, lowercased `q` URL parameter. It compares substrings against names, descriptions, environment slugs/names and category slugs/names. Empty queries show all commands; repeated `q` parameters use the first value. Results include a clear action and no-results state.

There is no keyword/tag field, fuzzy search, external search service or search of full detail text. Difficulty is a separate URL filter on environment/category pages, not a searched field. Listings link to the reusable detail route; unknown route identifiers return `notFound()`.

## Individual Command Pages

The [detail component](../src/components/command-detail.tsx) renders overview, tokenised syntax and legend, optional options, practical examples, optional outputs and explanations, and related links. Examples use native disclosure elements. All six commands have details, although the model and renderer permit missing details.

The shared [breadcrumbs](../src/components/command-breadcrumbs.tsx) present `← Commands / <name>` on detail, environment and category pages. Headers use compact spacing and consistent alignment while preserving the blueprint design.

## Application Architecture

```text
src/data/filters.ts       src/data/commands.ts
       |                         |
       +---- listings/search ----+
                                 |
              lookup by environment + command slug
                                 |
            /commands/[environment]/[command]
                                 |
                    reusable CommandDetail
```

Pages and the navbar are Server Components. Client behaviour is isolated to `NavbarSearch` (URL-aware input), `BrowseMenu` (disclosure) and `SupportForm` (validation/submission). Search uses GET navigation rather than client-side result state, with a Suspense fallback in the navbar.

Command data/types live in [commands.ts](../src/data/commands.ts); taxonomy and derived slug types live in [filters.ts](../src/data/filters.ts). There is no database or ORM. Landing-page teasers and related-link metadata are separately authored presentation data; not every teaser command has a detail entry.

## About and Support

[About](../src/app/about/page.tsx) covers project purpose, features, learning approach, background and future roadmap.

[Support](../src/app/support/page.tsx) passes the public Formspree endpoint to a client form for bugs, feedback, suggestions and documentation corrections. Description and type are required; email and page URL are optional.

[Support helpers](../src/lib/support-form.ts) validate input and send JSON directly from the browser to Formspree. There is no AstroBase API route or ticket backend. The submission includes a `_gotcha` honeypot. A request lock and disabled controls prevent concurrent submissions. Status messages cover success, service errors, rate limits, network failures and a 20-second timeout. Inputs reset only after success.

Fields have labels, inline errors, focus on the first invalid field and status announcements. A privacy notice links to Formspree's policy. Missing/invalid configuration shows an unavailable state. The optional URL is entered manually; contextual issue links and automatic prefilling are not implemented.

See [README setup](../README.md#support-form-configuration) for configuration and test submissions. The owner confirmed a real submission; full browser accessibility verification remains separate.

## Navigation Structure

```text
/
/commands
/commands/environment/[environment]
/commands/category/[category]
/commands/[environment]/[command]
/about
/support
```

Examples: `/commands/environment/powershell`, `/commands/category/networking`, `/commands/cmd/ipconfig`, `/commands/powershell/get-process`, `/commands/bash/chmod`. Earlier planned `/categories/...` and `/commands/cmd` listing routes are not implemented routes.

## Project Structure

The [README tree](../README.md#project-structure) lists current directories. Components use kebab-case filenames. There are no per-environment data directories or standalone `src/types/command.ts`; the [data model](command-data-model.md) documents the schema.

## Core Design Principle

One structured entry supplies library results, environment/category listings and full command pages. Add content through that model rather than individual hard-coded routes. Keep client boundaries small, preserve the blueprint design, and avoid storage or architecture for unrequested future features.

## Development and Verification

Phone testing requires the correct development host in Next.js `allowedDevOrigins`; see [LAN setup](../README.md#testing-on-a-local-network). Blocked development assets previously prevented navbar hydration on a phone. The owner confirmed Browse works on Samsung S25 Chrome after the configuration fix.

This verifies that interaction, not a complete responsive audit. See [verification](progress-report.md#verification) for coverage and outstanding manual work.
