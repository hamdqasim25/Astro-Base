# AstroBase

AstroBase is a public-first IT knowledge base for students, aspiring IT professionals and support technicians. It explains what commands do, when to use them, how their syntax works and how to interpret their output.

## Current Features

As of **10 October 2026**, the library contains **six documented commands**:

| Environment | Commands |
| --- | --- |
| Windows CMD | `ping`, `ipconfig`, `tracert` |
| PowerShell | `Get-Process` |
| Linux Bash | `ls`, `chmod` |

- Typed command data and reusable dynamic detail pages.
- Syntax colours and legend, option explanations, practical examples, optional output and output explanations.
- Case-insensitive partial search by name, description, environment and category.
- Environment/category browsing and difficulty filters on their listing pages.
- Shared responsive navbar with search, Browse, Commands, About and Support.
- Blueprint styling, moon SVG logo, separate HTML wordmark and matching favicon.
- About page and Formspree support form for bugs, feedback, suggestions and documentation corrections.
- Contextual “Report an issue” links on command pages prefill an editable support description using validated command data.

## Technology Stack

Next.js 16.3.4 (App Router), React 19.2.8, TypeScript 5, Tailwind CSS 4 and ESLint 9. Content is stored in TypeScript; there is no database, ORM, authentication system or AstroBase ticket backend.

## Local Development

Use Node.js 24.x and npm to match the verified development environment. No Node version is enforced in `package.json`.

```sh
npm ci
npm run dev
```

Open `http://localhost:3000`. On Windows, use `npm.cmd` if PowerShell execution policy blocks `npm.ps1`.

### Support Form Configuration

1. Create a form in Formspree and complete its recipient/account verification.
2. Copy its endpoint into a new `.env.local` at the repository root. There is currently no `.env.example` template.

```dotenv
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
```

Replace `YOUR_FORM_ID` with your own form ID. Only HTTPS endpoints in this Formspree format are accepted. Missing or invalid configuration displays an unavailable message instead of the form.

3. Restart `npm run dev` after changing the variable. For production, configure it in the hosting environment before building; rebuild/redeploy after changes.
4. Open `/support`, send a clearly labelled test message and confirm both the success state and receipt in your Formspree dashboard. Use non-sensitive test content.

The `NEXT_PUBLIC_` endpoint is visible in browser code and is not a secret API key. Keep `.env.local` uncommitted: it holds local configuration and may contain private values. It is ignored by Git. Never put passwords, tokens or private credentials into public environment variables or support submissions.

### Testing on a Local Network

Use `ipconfig` on Windows to find the development computer's active LAN IPv4 address. In [next.config.ts](next.config.ts), set `allowedDevOrigins` to that computer's hostname/IP, without scheme or port. Replace machine-specific entries for your setup and avoid a broad wildcard. Restart Next.js after changes.

```sh
npm run dev -- --hostname 0.0.0.0
```

Connect the phone to the same network and open `http://<your-LAN-IP>:3000`. Allow the dev server through the firewall on the appropriate private network if needed. If interactive controls fail, inspect client script requests: a blocked development origin can prevent hydration even when server-rendered content loads. This setting is for development, not production access control.

## Project Structure

```text
src/
  app/                 # Routes, root layout, global styles and icon.svg
    about/             # Project introduction and roadmap
    support/           # Feedback page
    commands/          # Library, environment/category lists and details
  components/          # Navbar, Browse, search, breadcrumbs, details, support form
  data/
    commands.ts        # Command types, six entries and lookup
    filters.ts         # Environment, category and difficulty definitions
  lib/
    support-form.ts    # Validation and Formspree submission
public/
  astrobase-moon.svg    # Reusable transparent moon logo
tests/
  support-form.test.mjs # Node tests for validation and submission helpers
docs/                  # Design, data model and progress report
```

## Available Routes

| Route | Purpose |
| --- | --- |
| `/` | Landing page |
| `/commands` | Full library; search with `?q=ping` |
| `/commands/environment/[environment]` | `cmd`, `powershell`, `bash` |
| `/commands/category/[category]` | `networking`, `files`, `system`, `processes`, `users`, `troubleshooting` |
| `/commands/[environment]/[command]` | Details, e.g. `/commands/cmd/ping` |
| `/about` | Project purpose, background and future direction |
| `/support` | Feedback form |

Environment/category lists accept `?difficulty=beginner`, `intermediate` or `advanced`. Unknown environment/category/command routes return a not-found page. The System category and Advanced difficulty currently have no commands.

Navbar search submits a GET request to `/commands?q=...`. Results retain the query, support clearing and show an empty state. Search is server-rendered on submission; it is not autocomplete or fuzzy search.

## Testing and Verification

```sh
npm run lint
node --test tests/*.test.mjs
npm run build
git diff --check
```

The production build includes TypeScript checking. After building, `npm run start` starts the production server. There is no `npm test` script. Tests cover support helpers and command-issue context, directly importing TypeScript using Node's built-in support; the current configuration emits a module-type warning. Builds need network access for the configured Google fonts.

See the [progress report](docs/progress-report.md) for verification evidence and remaining manual checks. Helper tests do not replace mobile, keyboard or screen-reader testing.

## Development Status and Roadmap

The initial command system, navigation, branding, About and Support pages are implemented. The owner has confirmed a real Formspree submission. This describes the current working tree, including pending changes; a first public deployment remains planned.

Next priorities:

1. Complete manual mobile and responsive testing.
2. Manually verify contextual command reports across desktop and mobile.
3. Expand the library towards approximately 25–30 commands.
4. Improve test coverage and accessibility where necessary.
5. Prepare the first public deployment.

Future work includes interactive troubleshooting flows, quizzes and learning exercises, optional accounts and favourites, and broader networking, cybersecurity, cloud and DevOps resources. These are not implemented.

## Project Documentation

- [System design](docs/system-design.md)
- [Command data model](docs/command-data-model.md)
- [Progress report and verification](docs/progress-report.md)
- [Development instructions](agents.md)

AstroBase aims to teach practical understanding rather than simply reproduce traditional command documentation.
