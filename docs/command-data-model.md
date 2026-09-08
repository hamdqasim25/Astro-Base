## Command Data Model

AstroBase uses a structured command data model so each CMD, PowerShell, and Bash command is defined once and reused throughout the application.

For V1, command data will be stored as **TypeScript objects** within the project.

### Command Structure

Each command will contain:

- **Name** — Command name
- **Slug** — URL-friendly identifier
- **Shell** — CMD, PowerShell, or Bash
- **Category** — Such as Networking or System Information
- **Description** — Short explanation of the command
- **Syntax** — General command syntax
- **Parameters** — Flags, options, and arguments
- **Examples** — Practical real-world usage
- **Expected Output** — Realistic terminal output
- **Output Explanation** — Explanation of important output fields
- **Related Commands** — Links to relevant commands
- **Tags** — Keywords used to improve search

### Example Structure

```ts
interface Command {
  name: string;
  slug: string;
  shell: "cmd" | "powershell" | "bash";
  category: string;
  description: string;
  syntax: string;
  parameters: Parameter[];
  examples: CommandExample[];
  relatedCommands: string[];
  tags: string[];
}
```

### How Command Data Is Used

Each command object acts as a **single source of truth** and can be reused across:

- Search results
- Shell command libraries
- Category pages
- Command cards
- Full command pages
- Related command sections
- Syntax highlighting

Command listing pages will initially display only:

- Command
- Shell
- Category
- Description

When a user selects a command, the full command object will be used to display its syntax, parameters, practical examples, expected output, output explanations, and related commands.

### Storage Structure

```text
src/
├── data/
│   ├── cmd/
│   ├── powershell/
│   └── bash/
│
└── types/
    └── command.ts
```

This keeps command content organised, strongly typed, version-controlled, and easy to expand without duplicating information.

PostgreSQL and Prisma may be introduced later if AstroBase requires database-driven content management, user accounts, favourites, quizzes, or learning progress.
