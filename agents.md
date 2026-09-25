# AGENTS.md — AstroBase

## 1. Project Overview

AstroBase is a public-first IT knowledge base designed to help students, aspiring IT professionals, and support technicians understand and use common IT and system administration commands.

The project prioritises practical learning rather than simply reproducing traditional technical documentation.

Each command should help the user understand:

- What the command does
- When the command would be used
- How its syntax works
- What its parameters, flags, and arguments mean
- A realistic example
- What the expected output looks like
- What important parts of the output mean

AstroBase initially focuses on:

- Windows Command Prompt (CMD)
- Windows PowerShell
- Linux Bash

The long-term vision is to expand AstroBase into a broader IT learning and troubleshooting platform covering areas such as:

- IT Support
- System Administration
- Networking
- Cloud
- DevOps
- Cybersecurity
- Troubleshooting workflows
- Interactive learning and quizzes

AstroBase should remain approachable for beginners while still being practically useful to people working in IT.

---

## 2. Technology Stack

AstroBase currently uses:

- Next.js
- Next.js App Router
- TypeScript
- React
- Tailwind CSS
- Node.js

The project should continue using the existing stack unless a change has been explicitly approved.

Do not introduce new frameworks, major dependencies, databases, authentication systems, state-management libraries, or architectural patterns without approval.

---

## 3. Current Project Architecture

AstroBase uses the Next.js App Router.

The application currently contains:

- Landing page
- Command library
- Environment/category navigation
- Command filtering
- Dynamic command detail routes
- Initial command detail implementation
- AstroBase blueprint-inspired visual design

Command pages are intended to become data-driven.

The long-term pattern should be approximately:

```text
Structured command data
        ↓
Command lookup by slug
        ↓
Dynamic Next.js route
        ↓
Reusable command detail UI
```

Do not create an individual hard-coded page for every command.

Commands should eventually be added primarily by adding structured command data.

---

## 4. Current Development Priority

The immediate development priority is converting the command system into a reusable, data-driven architecture.

The expected direction is:

1. Define a structured TypeScript command data model.
2. Store command information centrally.
3. Retrieve commands using their slug.
4. Render them through reusable command-detail components.
5. Allow new commands to be added without creating new pages.
6. Expand the command library across CMD, PowerShell, and Bash.
7. Implement syntax colour coding.
8. Implement the syntax colour legend/key.
9. Improve searching and filtering.
10. Continue UI/UX refinement.

When working on a task, avoid unnecessarily implementing later roadmap features unless specifically requested.

---

# 5. Core Development Rules

## 5.1 Inspect Before Editing

Before modifying code:

1. Inspect the relevant files.
2. Understand the existing implementation.
3. Identify related components, types, data structures, and routes.
4. Check whether reusable functionality already exists.
5. Determine the smallest sensible change required.

Do not immediately rewrite files based only on assumptions about the project.

The existing repository is the source of truth.

---

## 5.2 Preserve Existing Working Behaviour

Do not break functionality unrelated to the requested task.

Existing working behaviour should be preserved unless the task explicitly requires changing it.

Avoid unnecessary:

- Refactoring
- Renaming
- File movement
- Dependency changes
- Styling changes
- Architectural changes

A feature request should not become an unrelated project-wide rewrite.

---

## 5.3 Keep Changes Scoped

Only modify files necessary to complete the requested task.

If another improvement is discovered but is outside the requested scope, mention it rather than automatically implementing it.

Small, focused changes are preferred over large speculative changes.

---

## 5.4 Do Not Invent Project Requirements

If requirements are unclear, inspect:

- Existing code
- Existing types
- Existing components
- README/documentation
- AGENTS.md
- Related tests

Do not silently invent major product behaviour.

If an important decision cannot be determined from the repository or task, explain the ambiguity before making a major architectural decision.

---

# 6. File Modification Rules

## Existing Files

When editing an existing file:

- Preserve functionality that is unrelated to the requested change.
- Preserve existing naming conventions where sensible.
- Preserve the established project structure.
- Avoid rewriting an entire file when a targeted change is sufficient.
- Remove code only when it is obsolete because of the requested implementation.
- Do not delete comments or documentation unless they are incorrect or no longer relevant.

---

## New Files

Create a new file only when it has a clear responsibility.

Examples include:

- Reusable components
- Structured command data
- Shared TypeScript types
- Utility functions
- Tests

Do not fragment simple functionality across unnecessary files.

Before creating a file, check whether the functionality belongs naturally in an existing module.

---

## File and Directory Naming

Follow the naming conventions already present in the repository.

Prefer descriptive names.

Examples:

```text
commands.ts
command-card.tsx
command-detail.tsx
command-types.ts
```

Avoid vague names such as:

```text
utils2.ts
helpers-new.ts
stuff.ts
temp.ts
component-final.tsx
```

Do not create duplicate or versioned files as a substitute for modifying the correct implementation.

---

# 7. Code Generation Rules

Generated code must be:

- Readable
- Maintainable
- Strongly typed
- Consistent with the existing project
- Appropriate for production development
- Easy for another developer to understand

Prefer straightforward implementations over unnecessarily clever abstractions.

---

## TypeScript

Use TypeScript properly.

Avoid:

```ts
any
```

unless there is a genuine reason it cannot reasonably be avoided.

Prefer explicit domain types and interfaces for structured AstroBase data.

For example, command data should eventually follow a well-defined model rather than loosely structured objects.

Type definitions should help prevent invalid command content from entering the application.

---

## React / Next.js

Follow existing Next.js App Router conventions.

Prefer Server Components where client-side behaviour is unnecessary.

Only use:

```ts
"use client";
```

when the component genuinely requires browser-side functionality such as:

- State
- Event handlers
- Browser APIs
- Interactive controls

Do not convert large component trees into Client Components unnecessarily.

---

## Reusability

Repeated UI or logic should be extracted when doing so clearly improves maintainability.

However, do not create abstractions purely for the sake of abstraction.

A component used once does not automatically need to become a generic component.

---

# 8. AstroBase Command Data Principles

Command information is a core part of AstroBase.

The command model should be capable of representing information such as:

```text
Command
Environment
Category
Difficulty
Description
Use cases
Syntax
Parameters / flags / options
Arguments / values
Examples
Expected output
Output explanation
```

The exact TypeScript model should be based on the requirements of the UI and existing code.

Avoid designing an excessively complex schema before it is required.

---

## Command Slugs

Commands should have stable URL-safe slugs.

Example:

```text
ping
ipconfig
get-process
ls
```

Routes should use the slug to locate the appropriate command data.

Command display names do not have to be identical to their URL slug.

Example:

```text
Display name: Get-Process
Slug: get-process
```

---

# 9. Command Content Quality

AstroBase is an educational knowledge base.

Command content must therefore be technically accurate and useful.

Do not generate filler documentation simply to populate the UI.

Examples should resemble realistic IT usage.

Expected output should resemble realistic command output while avoiding unnecessary personal or machine-specific information.

Descriptions should explain concepts in beginner-friendly language without sacrificing technical correctness.

---

# 10. Syntax Colour Coding

Syntax colour coding is a core planned AstroBase feature.

Command syntax/examples should eventually visually distinguish concepts such as:

- Command / cmdlet
- Flags
- Options
- Parameters
- Arguments
- Values
- File paths
- Pipes
- Operators
- Variables
- Comments

A visible legend/key should explain what the colours mean.

When implementing this feature, avoid hard-coding styling separately into every command.

The syntax system should be reusable and consistent across supported environments.

Do not implement syntax highlighting prematurely during unrelated tasks.

---

# 11. Expected Output

Command documentation should include realistic expected output where appropriate.

The goal is not merely to show what command users type.

Users should also learn what they should expect after executing it.

Where useful, command pages should explain important fields or lines within the output.

For example:

```text
Command
↓
Example usage
↓
Expected output
↓
Explanation of important output
```

Not every command produces output, so the data model and UI should allow output to be optional.

---

# 12. UI / UX Principles

AstroBase has a distinctive blueprint-inspired visual identity.

The current design direction includes:

- Light blue / blueprint influence
- Technical documentation aesthetic
- Post-it/note-inspired content elements
- Clear information hierarchy
- Beginner-friendly layouts
- Strong readability

New UI should fit the existing visual language.

Do not replace the established AstroBase design with generic dashboard styling.

Functionality and readability take priority over decorative complexity.

---

## Responsive Design

Changes should remain usable across:

- Desktop
- Tablet
- Mobile

Avoid layouts that only work at a single screen size.

---

## Accessibility

Where applicable:

- Use semantic HTML.
- Use accessible buttons and links.
- Associate labels with inputs.
- Maintain keyboard accessibility.
- Avoid relying entirely on colour to communicate meaning.
- Use sensible heading hierarchy.
- Provide appropriate ARIA attributes when native HTML is insufficient.

The syntax colour system must therefore use both visual styling and understandable context.

---

# 13. Search and Filtering

Search and filtering are important parts of the command library.

Future implementations should allow commands to be discovered through information such as:

- Command name
- Environment
- Category
- Difficulty
- Relevant keywords

Filtering logic should use structured command data rather than duplicating command metadata inside UI components.

---

# 14. Dependencies

Do not install a dependency unless it provides meaningful value that cannot reasonably be achieved using the existing stack.

Before adding a package:

1. Check whether the project already has equivalent functionality.
2. Determine whether native React/Next.js/TypeScript functionality is sufficient.
3. Consider the maintenance cost.
4. Explain why the dependency is required.

Do not install packages simply to avoid implementing small pieces of straightforward functionality.

---

# 15. Testing and Verification

After making code changes, run the appropriate project checks.

At minimum, where available:

```powershell
npm run lint
```

and:

```powershell
npm run build
```

If the repository has relevant automated tests, run them as well.

Do not claim that checks passed unless they were actually executed successfully.

If a check cannot be run, state this clearly.

---

## Verification

After implementation, verify the actual behaviour affected by the task.

For command-page work, this may include:

```text
Library
   ↓
Select command
   ↓
Dynamic route
   ↓
Correct command loaded
   ↓
Correct information rendered
```

Test invalid or unknown command slugs where relevant.

---

# 16. Error Handling

Do not hide errors merely to make TypeScript, ESLint, tests, or builds pass.

Avoid:

- Disabling ESLint rules without justification
- Using `any` to bypass type errors
- Ignoring rejected promises
- Suppressing TypeScript errors
- Removing tests because they fail

Fix the underlying problem whenever reasonably possible.

---

# 17. Security

Although AstroBase is currently primarily a public knowledge base, normal secure-development practices still apply.

Never commit:

- API keys
- Passwords
- Access tokens
- Private credentials
- Environment secrets

Secrets belong in environment variables where required.

Do not expose server-only information to client components.

---

# 18. Documentation

Update documentation when a change materially affects:

- Project setup
- Architecture
- Development workflow
- Command data structure
- Major features

Do not update documentation unnecessarily for trivial implementation details.

Documentation should describe the actual current project, not planned functionality as though it already exists.

---

# 19. Git Rules

Codex may inspect Git history and repository status when useful.

Before completing substantial work, review:

```powershell
git status
```

Do not automatically:

- Commit
- Push
- Force push
- Reset branches
- Delete branches
- Rewrite Git history

unless explicitly instructed.

Never use destructive Git commands simply to resolve an implementation problem.

The developer should remain in control of repository history.

---

# 20. Working With Uncommitted Changes

Existing uncommitted changes may belong to the developer.

Do not overwrite or discard them.

Before modifying files, inspect the working tree when appropriate.

If existing changes overlap with the requested work, preserve them and integrate carefully.

Never use destructive commands such as:

```powershell
git reset --hard
git checkout -- .
git clean -fd
```

unless explicitly instructed by the developer.

---

# 21. Codex Task Workflow

For each development task, follow this general process.

### Step 1 — Understand

Read the request and identify:

- Requested behaviour
- Scope
- Constraints
- Expected result

### Step 2 — Inspect

Inspect relevant:

- Routes
- Components
- Types
- Data
- Utilities
- Tests
- Documentation

### Step 3 — Plan

Determine the smallest maintainable implementation.

For larger tasks, briefly explain which files are expected to change and why.

### Step 4 — Implement

Make focused changes following the existing project architecture and conventions.

### Step 5 — Verify

Run relevant:

```text
TypeScript checks
ESLint
Tests
Production build
```

where available and appropriate.

### Step 6 — Review

Check:

```powershell
git diff
git status
```

Ensure no unrelated files were accidentally changed.

### Step 7 — Report

Return a concise summary containing:

- What was implemented
- Files created
- Files modified
- Important technical decisions
- Verification performed
- Any remaining issues or recommended next step

---

# 22. What Codex Must Not Do

Unless explicitly requested, do not:

- Rewrite the entire application.
- Replace the existing design system.
- Change the technology stack.
- Introduce a database.
- Introduce authentication.
- Install large dependencies.
- Rename large portions of the project.
- Move directories unnecessarily.
- Delete working features.
- Commit changes.
- Push changes.
- Modify Git history.
- Implement unrelated roadmap features.
- Generate fake command information purely to fill pages.
- Silence TypeScript or ESLint errors instead of fixing them.
- Assume a feature works without verifying it.

---

# 23. Decision Priority

When deciding how to implement something, use this priority:

```text
Explicit developer request
        ↓
Existing repository behaviour
        ↓
AGENTS.md
        ↓
Existing project conventions
        ↓
Simplest maintainable solution
```

If the developer explicitly requests something that differs from this document, the developer's current request takes priority.

---

# 24. Definition of Done

A development task is complete when:

- The requested behaviour is implemented.
- Existing unrelated behaviour remains intact.
- TypeScript is valid.
- Relevant linting passes.
- Relevant tests pass.
- Production build passes when appropriate.
- No unnecessary files were changed.
- No debugging code remains.
- No secrets were introduced.
- The implementation follows the existing AstroBase architecture.
- The completed work and verification results are clearly reported.

---

## AstroBase Development Principle

AstroBase should grow incrementally.

Prefer:

> Understand → Inspect → Implement → Verify → Document

over:

> Assume → Rewrite → Hope

Every change should make the project easier to maintain and make AstroBase more useful as a practical IT learning resource.