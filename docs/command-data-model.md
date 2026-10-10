# Command Data Model

Updated **10 October 2026**. [commands.ts](../src/data/commands.ts) contains the TypeScript types and command dataset. [filters.ts](../src/data/filters.ts) supplies environment, category and difficulty definitions and derives their slug types.

## Command Structure

The implemented shape is:

```ts
type Command = {
  name: string;
  slug: string;
  description: string;
  environment: EnvironmentSlug;
  categories: CategorySlug[];
  difficulty: DifficultySlug;
  details?: CommandDetails;
};

type CommandDetails = {
  overview: string;
  syntax: SyntaxToken[];
  options?: CommandOption[];
  examples: CommandExample[];
  relatedCommands?: RelatedCommand[];
};

type CommandOption = {
  option: string;
  description: string;
  example?: string;
};

type CommandExample = {
  title: string;
  description: string;
  command: SyntaxToken[];
  output?: string;
  outputExplanation?: OutputExplanation[];
};

type OutputExplanation = {
  label: string;
  description: string;
};

type RelatedCommand = {
  name: string;
  environment: EnvironmentSlug;
  slug: string;
  description: string;
};
```

Environment is `cmd`, `powershell` or `bash`. Categories are `networking`, `files`, `system`, `processes`, `users` and `troubleshooting`. Difficulty is `beginner`, `intermediate` or `advanced`. These unions derive from filter arrays rather than an independent taxonomy.

Commands can belong to multiple categories. There is no `shell`, singular `category`, `tags`, `keywords` or separate `useCases` field. Use cases and argument explanations appear in overview, option and example content.

## Syntax Colour Coding

```ts
type SyntaxTokenType =
  | "command"
  | "option"
  | "argument"
  | "path"
  | "operator"
  | "variable"
  | "comment"
  | "plain";

type SyntaxToken = {
  text: string;
  type: SyntaxTokenType;
};
```

Syntax and example commands are manually authored token arrays, not automatically parsed strings. Preserve spaces in token text. The shared [renderer](../src/components/command-detail.tsx) maps types to styles and displays a legend; content does not embed per-command CSS.

## How Command Data Is Used

`getCommand(environment, slug)` finds an exact environment/slug pair. Routes use `/commands/[environment]/[command]`, so a slug identifies a command within its environment. Display names can retain casing, for example `Get-Process` with slug `get-process`.

The same array supplies library search, environment/category listings and details. Search compares lowercase substrings in name, description, environment slug/name and category slug/name. It does not search detail text or difficulty. Environment/category pages offer a separate difficulty filter.

`details` is optional and the renderer supports missing details, but all six entries include it. Outputs are optional because commands such as `chmod` can succeed silently. Include explanations where they help interpret output.

Related commands contain explicitly authored link metadata, including environment and slug. Keep destinations valid; they are not resolved automatically from names. Landing-page teasers are separately authored and are not a command inventory.

## Current Dataset

| Command | Environment | Categories | Difficulty |
| --- | --- | --- | --- |
| `ping` | `cmd` | networking, troubleshooting | beginner |
| `ipconfig` | `cmd` | networking, troubleshooting | beginner |
| `tracert` | `cmd` | networking, troubleshooting | intermediate |
| `Get-Process` | `powershell` | processes | beginner |
| `ls` | `bash` | files | beginner |
| `chmod` | `bash` | files, users | intermediate |

There are **six entries with details**, 25 practical examples and 21 output blocks. The System category and Advanced difficulty have no entries.

## Adding a Command

1. Add a typed entry to `commands.ts` using existing filter slugs.
2. Choose a stable lowercase URL slug and unique environment/slug pair.
3. Provide accurate overview, syntax tokens, options where applicable and realistic examples. Include outputs/explanations when useful.
4. Check related destinations and keep descriptions beginner-friendly.
5. Verify library, environment/category listings, search and the detail route. Run the [README checks](../README.md#testing-and-verification).

No individual command page, database or new data directory is needed. Extend the schema only when requested functionality requires it. See the [progress report](progress-report.md) for expansion priorities.
