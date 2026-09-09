export const environments = [
  {
    slug: "cmd",
    name: "Windows CMD",
    description: "Commands used in the Windows Command Prompt.",
  },
  {
    slug: "powershell",
    name: "PowerShell",
    description: "PowerShell commands and cmdlets for Windows administration.",
  },
  {
    slug: "bash",
    name: "Linux Bash",
    description: "Commands commonly used in Linux Bash terminals.",
  },
] as const;

export const categories = [
  {
    slug: "networking",
    name: "Networking",
    description: "Network configuration, connectivity, DNS, IP addressing, and diagnostics.",
  },
  {
    slug: "files",
    name: "Files",
    description: "Files, directories, paths, copying, moving, and file management.",
  },
  {
    slug: "system",
    name: "System",
    description: "Operating system information, configuration, and administration.",
  },
  {
    slug: "processes",
    name: "Processes",
    description: "Running processes, applications, services, and resource management.",
  },
  {
    slug: "users",
    name: "Users",
    description: "User accounts, groups, permissions, and access management.",
  },
  {
    slug: "troubleshooting",
    name: "Troubleshooting",
    description: "Commands used to investigate, diagnose, and resolve technical problems.",
  },
] as const;

export const difficultyLevels = [
  {
    slug: "beginner",
    name: "Beginner",
  },
  {
    slug: "intermediate",
    name: "Intermediate",
  },
  {
    slug: "advanced",
    name: "Advanced",
  },
] as const;

export type EnvironmentSlug = (typeof environments)[number]["slug"];
export type CategorySlug = (typeof categories)[number]["slug"];
export type DifficultySlug = (typeof difficultyLevels)[number]["slug"];
