import Link from "next/link";

const platforms = [
  {
    title: "Windows CMD",
    code: "CMD",
    description:
      "Classic Windows commands for networking, files, processes and troubleshooting.",
    href: "/commands/environment/cmd",
    example: "ipconfig /all",
  },
  {
    title: "PowerShell",
    code: "PS",
    description:
      "Modern Windows administration, automation and system management.",
    href: "/commands/environment/powershell",
    example: "Get-Process",
  },
  {
    title: "Linux Bash",
    code: "BASH",
    description:
      "Linux terminal commands for files, permissions, networking and system tasks.",
    href: "/commands/environment/bash",
    example: "ls -la",
  },
];

const categories = [
  {
    title: "Networking",
    description: "Connectivity, DNS, IP addressing and network troubleshooting.",
    example: "ping · ipconfig · nslookup",
    href: "/commands/category/networking",
    number: "01",
    rotate: "-rotate-1",
  },
  {
    title: "Files & Directories",
    description: "Navigate, create, copy, move and manage files and folders.",
    example: "dir · cd · ls · mkdir",
    href: "/commands/category/files",
    number: "02",
    rotate: "rotate-1",
  },
  {
    title: "System Information",
    description: "Inspect hardware, operating systems and system configuration.",
    example: "systeminfo · uname · hostname",
    href: "/commands/category/system",
    number: "03",
    rotate: "-rotate-[0.5deg]",
  },
  {
    title: "Processes & Services",
    description: "View, manage and troubleshoot running processes and services.",
    example: "tasklist · Get-Process · ps",
    href: "/commands/category/processes",
    number: "04",
    rotate: "rotate-[0.5deg]",
  },
  {
    title: "Users & Permissions",
    description: "Work with user accounts, groups, privileges and permissions.",
    example: "whoami · chmod · net user",
    href: "/commands/category/users",
    number: "05",
    rotate: "-rotate-1",
  },
  {
    title: "Troubleshooting",
    description: "Diagnose common system, network and configuration problems.",
    example: "tracert · sfc · Test-NetConnection",
    href: "/commands/category/troubleshooting",
    number: "06",
    rotate: "rotate-1",
  },
];

const popularCommands = [
  "ping",
  "ipconfig",
  "tracert",
  "nslookup",
  "Get-Process",
  "ls",
];

export default function Home() {
  return (
    <main className="flex-1 bg-[#dff3ff] text-[#132238]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b-2 border-[#132238]">
        {/* Blueprint grid */}
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(#315b7d 1px, transparent 1px), linear-gradient(90deg, #315b7d 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative mx-auto grid max-w-7xl items-start gap-6 px-6 py-6 sm:py-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          {/* Left side */}
          <div>
            <div className="mb-4 inline-flex border-2 border-[#132238] bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.18em]">
              IT Command Knowledge Base
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-[0.94] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              Commands make
              <span className="block text-[#2457d6]">
                more sense here.
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-[#40566f] lg:text-lg">
              AstroBase breaks down Windows CMD, PowerShell and Linux commands
              with syntax, real examples, expected output and practical
              explanations.
            </p>
          </div>

          {/* Featured Command */}
          <div className="hidden items-center justify-end lg:flex">
            <div className="w-full max-w-sm rotate-[1.5deg] border-2 border-[#132238] bg-[#fffdf7] shadow-[9px_9px_0_#132238]">
              <div className="flex items-center justify-between border-b-2 border-[#132238] px-4 py-3">
                <span className="text-[10px] font-black uppercase tracking-[0.16em]">
                  Command specimen
                </span>

                <span className="rounded-full bg-[#ffcf70] px-3 py-1 text-xs font-bold">
                  Networking
                </span>
              </div>

              <div className="p-5">
                <p className="text-xs font-bold text-[#59728c]">
                  WINDOWS / LINUX
                </p>

                <h2 className="mt-1 font-mono text-3xl font-black">
                  ping
                </h2>

                <p className="mt-3 text-sm leading-6 text-[#40566f]">
                  Test whether another device or server can be reached across a
                  network.
                </p>

                <div className="mt-5 border-2 border-[#132238] bg-[#132238] p-3 font-mono text-sm text-[#dff3ff]">
                  <span className="text-[#ffcf70]">$</span> ping google.com
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="border-2 border-[#132238] bg-[#edf8ff] p-3">
                    <span className="block text-[10px] font-bold uppercase text-[#59728c]">
                      Difficulty
                    </span>

                    <span className="mt-1 block font-bold">
                      Beginner
                    </span>
                  </div>

                  <div className="border-2 border-[#132238] bg-[#edf8ff] p-3">
                    <span className="block text-[10px] font-bold uppercase text-[#59728c]">
                      Use case
                    </span>

                    <span className="mt-1 block font-bold">
                      Connectivity
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Environments */}
      <section
        id="environments"
        className="mx-auto max-w-7xl scroll-mt-6 px-6 py-10 sm:py-12"
      >
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#2457d6]">
              01 / Explore
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight">
              Pick your environment.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-[#59728c]">
            Browse commands based on the operating environment or shell you are
            working with.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {platforms.map((platform, index) => (
            <Link
              key={platform.title}
              href={platform.href}
              className="group relative border-2 border-[#132238] bg-white p-7 transition hover:-translate-y-1 hover:shadow-[7px_7px_0_#132238]"
            >
              <div className="flex items-start justify-between">
                <span className="text-xs font-black text-[#6a8095]">
                  0{index + 1}
                </span>

                <span className="border-2 border-[#132238] bg-[#ffcf70] px-2 py-1 font-mono text-xs font-black">
                  {platform.code}
                </span>
              </div>

              <h3 className="mt-6 text-2xl font-black">
                {platform.title}
              </h3>

              <p className="mt-3 leading-7 text-[#59728c]">
                {platform.description}
              </p>

              <div className="mt-5 border-t-2 border-[#132238] pt-5">
                <p className="font-mono text-sm font-bold text-[#2457d6]">
                  {platform.example}
                </p>

                <p className="mt-3 text-sm font-black">
                  Browse commands
                  <span className="ml-2 inline-block transition group-hover:translate-x-2">
                    →
                  </span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section
        id="topics"
        className="scroll-mt-6 border-y-2 border-[#132238] bg-[#f5fbff]"
      >
        <div className="mx-auto max-w-7xl px-6 py-10 sm:py-12">
          <div className="mb-6 grid gap-6 lg:grid-cols-2">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#2457d6]">
                02 / Learn by topic
              </p>

              <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                What are you
                <br />
                trying to learn?
              </h2>
            </div>

            <div className="flex items-end">
              <p className="max-w-lg text-base leading-7 text-[#59728c]">
                You don&apos;t always know the command you need. Start with the
                problem or skill you want to understand and explore from there.
              </p>
            </div>
          </div>

          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.title}
                href={category.href}
                className={`group relative border-2 border-[#132238] bg-[#fff4a8] p-6 shadow-[5px_5px_0_#132238] transition hover:z-10 hover:-translate-y-2 hover:rotate-0 hover:shadow-[9px_9px_0_#132238] ${category.rotate}`}
              >
                {/* Fake tape */}
                <div className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-1 bg-[#d8e9ef]/80" />

                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs font-black">
                    {category.number}
                  </span>

                  <span className="text-xl transition group-hover:translate-x-1">
                    ↗
                  </span>
                </div>

                <h3 className="mt-5 text-2xl font-black tracking-tight">
                  {category.title}
                </h3>

                <p className="mt-3 leading-7 text-[#40566f]">
                  {category.description}
                </p>

                <div className="mt-6 border-t-2 border-dashed border-[#132238]/40 pt-4">
                  <p className="font-mono text-xs font-bold text-[#37536c]">
                    {category.example}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 border-2 border-dashed border-[#132238] bg-[#dff3ff] p-5 text-center">
            <p className="font-semibold">
              More categories will be added as AstroBase grows.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Commands */}
      <section className="border-b-2 border-[#132238] bg-[#bfe6ff]">
        <div className="mx-auto max-w-7xl px-6 py-10 sm:py-12">
          <div className="grid gap-6 lg:grid-cols-[0.65fr_1.35fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#2457d6]">
                03 / Quick Access
              </p>

              <h2 className="mt-3 text-4xl font-black">
                Popular
                <br />
                commands.
              </h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {popularCommands.map((command, index) => (
                <div
                  key={command}
                  className="flex items-center justify-between border-2 border-[#132238] bg-[#fffdf7] px-5 py-4 transition hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#132238]"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-black text-[#7890a5]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="font-mono font-bold">
                      {command}
                    </span>
                  </div>

                  <span className="font-black">↗</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-6 py-6 text-sm font-semibold sm:flex-row">
        <span>AstroBase</span>

        <span className="text-[#59728c]">
          Understand the command. Not just the syntax.
        </span>
      </footer>
    </main>
  );
}
