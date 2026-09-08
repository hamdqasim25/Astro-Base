# Stage 2 — Application Planning & System Design

This stage defines the structure, scope, navigation, and initial architecture for AstroBase before development begins.

The goal is to ensure the application has a clear V1 direction and that each core feature is planned before implementation.

---

## V1 Scope

The following features are confirmed as required for the first version of AstroBase:

- Public landing page
- Windows CMD command library
- PowerShell command library
- Linux Bash command library
- Individual command pages
- Global command search
- Category filtering
- Syntax colour coding
- Syntax colour legend
- Command descriptions
- Syntax examples
- Parameter, flag, and option explanations
- Practical IT examples
- Realistic expected output
- Explanation of important output fields
- Related commands
- Responsive desktop and mobile design

Features such as user accounts, favourites, quizzes, progress tracking, troubleshooting flows, and wider Cloud, DevOps, and Security content are planned for future versions.

---

## Landing Page & Navigation

The landing page will act as the main entry point into AstroBase.

Users will be able to browse the command library in three main ways:

- Search directly for a command
- Browse by shell
- Browse by category

### Browse by Shell

The three initial shell libraries are:

- Windows CMD
- PowerShell
- Linux Bash

### Browse by Category

Commands will also be grouped into categories such as:

- Networking
- Files & Directories
- System Information
- Processes
- Services
- Users & Permissions
- Disk & Storage
- Security & Permissions
- Package Management
- Text Processing
- System Management

This allows users to find commands even if they do not already know which shell contains them.

---

## Command Listing Pages

Selecting either a shell or category will open a command listing page.

Each command will initially be shown in a brief format containing:

- Command name
- Shell
- Category
- Short description

Example:

```text
ipconfig

CMD | Networking

Displays and manages TCP/IP network configuration information.
```

Clicking a command opens its full command reference page.

Category pages can contain commands from multiple shells.

For example, the **Networking** category could include:

```text
ipconfig
CMD | Networking

ping
CMD | Networking

Test-Connection
PowerShell | Networking

Get-NetIPAddress
PowerShell | Networking

ip
Bash | Networking

ss
Bash | Networking
```

---

## Individual Command Pages

Each command will use a consistent page structure.

A full command page will contain:

```text
Command Name
Shell • Category

Description

Syntax

Syntax Colour Legend

Parameters / Flags / Options

Practical Examples

Expected Output

Output Explanation

Related Commands
```

This page structure will be reusable across CMD, PowerShell, and Bash commands.

---

## Application Architecture

AstroBase V1 will use a simple content-driven architecture.

```text
                  User
                    │
                    ▼
            AstroBase Landing Page
                    │
         ┌──────────┼──────────┐
         │          │          │
       Search     Shell     Category
         │          │          │
         └──────────┼──────────┘
                    │
                    ▼
             Command Listings
                    │
                    ▼
            Individual Command
                    │
                    ▼
             Command Data Layer
                    │
                    ▼
           TypeScript Data Files
```

For V1, command content will be stored using structured TypeScript data rather than a database.

This keeps the initial architecture simple while still allowing PostgreSQL and Prisma to be introduced later when database-backed features become necessary.

---

## Navigation Structure

The planned application routes are:

```text
/
├── commands/
│   ├── cmd/
│   ├── powershell/
│   └── bash/
│
├── categories/
│   └── [category]/
│
├── commands/[shell]/[command]/
│
└── about/
```

Example routes:

```text
/commands/cmd
/commands/powershell
/commands/bash

/categories/networking
/categories/system-information

/commands/cmd/ipconfig
/commands/powershell/get-process
/commands/bash/grep
```

---

## Initial Project Structure

The initial AstroBase source structure is planned as:

```text
src/
│
├── app/
│   ├── page.tsx
│   │
│   ├── commands/
│   │   ├── page.tsx
│   │   └── [shell]/
│   │       ├── page.tsx
│   │       └── [command]/
│   │           └── page.tsx
│   │
│   ├── categories/
│   │   ├── page.tsx
│   │   └── [category]/
│   │       └── page.tsx
│   │
│   └── about/
│       └── page.tsx
│
├── components/
│   ├── CommandCard.tsx
│   ├── CommandList.tsx
│   ├── CommandSearch.tsx
│   ├── ShellCard.tsx
│   ├── CategoryCard.tsx
│   ├── SyntaxBlock.tsx
│   ├── OutputBlock.tsx
│   └── SyntaxLegend.tsx
│
├── data/
│   ├── cmd/
│   ├── powershell/
│   └── bash/
│
├── types/
│   └── command.ts
│
├── lib/
│
└── utils/
```

This structure may change slightly during development as the project grows.

---

## Core Design Principle

AstroBase is designed around one central command library that can be filtered in different ways.

```text
               Commands
                  │
        ┌─────────┴─────────┐
        │                   │
      Shell              Category
        │                   │
 CMD / PS / Bash   Networking / Files / etc.
```

A command should only be defined once.

The same command data can then appear in:

- Shell libraries
- Category pages
- Search results
- Related command sections
- Full command pages

This avoids duplicated content and creates a cleaner, more maintainable architecture.

---

## Stage 2 Outcome

Stage 2 establishes:

- The confirmed V1 feature scope
- Landing page navigation
- Shell and category browsing
- Command listing behaviour
- Individual command page structure
- V1 application architecture
- Planned route structure
- Initial project folder structure
- A reusable content-first design approach

The next stage focuses on defining the **Command Data Model**, which determines exactly how each AstroBase command is structured, stored, searched, filtered, and displayed.
