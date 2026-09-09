import Link from "next/link";
import { notFound } from "next/navigation";

import { commands, type SyntaxTokenType } from "@/data/commands";
import {
  categories,
  difficultyLevels,
  environments,
} from "@/data/filters";

type CommandPageProps = {
  params: Promise<{
    environment: string;
    command: string;
  }>;
};

const syntaxTokenStyles: Record<SyntaxTokenType, string> = {
  command: "text-[#ffcf70]",
  option: "text-[#7dd3fc]",
  argument: "text-[#86efac]",
  path: "text-[#f9a8d4]",
  operator: "text-[#c4b5fd]",
  variable: "text-[#fdba74]",
  comment: "text-[#94a3b8]",
  plain: "text-white",
};

const syntaxLegend = [
  { type: "command" as const, label: "Command" },
  { type: "option" as const, label: "Option" },
  { type: "argument" as const, label: "Value" },
  { type: "path" as const, label: "Path" },
  { type: "operator" as const, label: "Operator" },
  { type: "variable" as const, label: "Variable" },
  { type: "comment" as const, label: "Comment" },
];

function getEnvironmentName(slug: string) {
  return (
    environments.find((environment) => environment.slug === slug)?.name ?? slug
  );
}

function getCategoryName(slug: string) {
  return categories.find((category) => category.slug === slug)?.name ?? slug;
}

function getDifficultyName(slug: string) {
  return (
    difficultyLevels.find((difficulty) => difficulty.slug === slug)?.name ?? slug
  );
}

export default async function CommandPage({ params }: CommandPageProps) {
  const { environment, command: commandSlug } = await params;

  const selectedCommand = commands.find(
    (command) =>
      command.environment === environment && command.slug === commandSlug,
  );

  if (!selectedCommand) {
    notFound();
  }

  const commandDetails = selectedCommand.details;

  return (
    <main className="min-h-screen bg-[#dff3ff] text-[#132238]">
      {/* Navigation */}
      <header className="border-b-2 border-[#132238] bg-[#dff3ff]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#132238] bg-[#ffcf70] font-black">
              A
            </div>

            <span className="text-xl font-black tracking-tight">
              AstroBase
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-semibold md:flex">
            <Link
              href="/commands"
              className="transition hover:text-[#2457d6]"
            >
              Commands
            </Link>

            <Link
              href="/about"
              className="transition hover:text-[#2457d6]"
            >
              About
            </Link>
          </nav>
        </div>
      </header>

      {/* Compact command header */}
      <section className="relative overflow-hidden border-b-2 border-[#132238]">
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(#315b7d 1px, transparent 1px), linear-gradient(90deg, #315b7d 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 py-8 sm:py-10">
          <div className="flex flex-wrap items-center gap-2 text-sm font-black">
            <Link
              href="/commands"
              className="text-[#2457d6] transition hover:-translate-x-1"
            >
              ← Commands
            </Link>

            <span className="text-[#7890a5]">/</span>

            <Link
              href={`/commands/environment/${selectedCommand.environment}`}
              className="text-[#59728c] hover:text-[#2457d6]"
            >
              {getEnvironmentName(selectedCommand.environment)}
            </Link>
          </div>

          <div className="mt-5 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <h1 className="font-mono text-5xl font-black tracking-[-0.05em] text-[#2457d6] sm:text-6xl">
                {selectedCommand.name}
              </h1>

              <p className="mt-3 max-w-3xl text-base leading-7 text-[#40566f]">
                {selectedCommand.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="border-2 border-[#132238] bg-[#ffcf70] px-3 py-1.5 text-xs font-black">
                {getEnvironmentName(selectedCommand.environment)}
              </span>

              <span className="border-2 border-[#132238] bg-[#bfe6ff] px-3 py-1.5 text-xs font-black">
                {getDifficultyName(selectedCommand.difficulty)}
              </span>
            </div>
          </div>
        </div>
      </section>

      {commandDetails ? (
        <div className="mx-auto grid max-w-7xl gap-7 px-6 py-8 lg:grid-cols-[minmax(0,1fr)_300px]">
          {/* Main content */}
          <div className="space-y-7">
            {/* Overview + Syntax */}
            <section className="border-2 border-[#132238] bg-white shadow-[5px_5px_0_#132238]">
              <div className="grid gap-6 p-5 lg:grid-cols-[0.8fr_1.2fr] lg:p-6">
                {/* Overview */}
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#2457d6]">
                    Overview
                  </p>

                  <h2 className="mt-2 text-2xl font-black">
                    What does it do?
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-[#40566f]">
                    {commandDetails.overview}
                  </p>
                </div>

                {/* Syntax */}
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#2457d6]">
                    Syntax
                  </p>

                  <div className="mt-3 overflow-x-auto border-2 border-[#132238] bg-[#132238] p-4">
                    <code className="whitespace-pre font-mono text-base font-bold">
                      {commandDetails.syntax.map((token, index) => (
                        <span
                          key={`${token.text}-${index}`}
                          className={syntaxTokenStyles[token.type]}
                        >
                          {token.text}
                        </span>
                      ))}
                    </code>
                  </div>

                  {/* Compact colour key */}
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                    {syntaxLegend.map((item) => (
                      <div
                        key={item.type}
                        className="flex items-center gap-1.5 text-[11px] font-bold text-[#59728c]"
                      >
                        <span
                          className={`rounded bg-[#132238] px-1.5 py-0.5 font-mono ${syntaxTokenStyles[item.type]}`}
                        >
                          Aa
                        </span>

                        {item.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Options */}
            {commandDetails.options && commandDetails.options.length > 0 && (
              <section>
                <div className="mb-4 flex items-end justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#2457d6]">
                      Options
                    </p>

                    <h2 className="mt-1 text-2xl font-black">
                      Useful flags.
                    </h2>
                  </div>

                  <span className="text-xs font-bold text-[#59728c]">
                    {commandDetails.options.length} options
                  </span>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  {commandDetails.options.map((option) => (
                    <div
                      key={option.option}
                      className="border-2 border-[#132238] bg-white p-4 transition hover:shadow-[4px_4px_0_#132238]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <code className="font-mono text-base font-black text-[#2457d6]">
                          {option.option}
                        </code>
                      </div>

                      <p className="mt-2 text-sm leading-6 text-[#40566f]">
                        {option.description}
                      </p>

                      {option.example && (
                        <code className="mt-3 block overflow-x-auto bg-[#132238] px-3 py-2 font-mono text-xs text-[#ffcf70]">
                          {option.example}
                        </code>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Examples */}
            <section>
              <div className="mb-4 flex items-end justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#2457d6]">
                    Examples
                  </p>

                  <h2 className="mt-1 text-2xl font-black">
                    See it in action.
                  </h2>
                </div>

                <span className="text-xs font-bold text-[#59728c]">
                  Click to expand
                </span>
              </div>

              <div className="grid gap-3">
                {commandDetails.examples.map((example, exampleIndex) => (
                  <details
                    key={example.title}
                    open={exampleIndex === 0}
                    className="group border-2 border-[#132238] bg-[#fffdf7] shadow-[3px_3px_0_#132238]"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 sm:p-5">
                      <div className="flex items-start gap-4">
                        <span className="mt-1 font-mono text-xs font-black text-[#7890a5]">
                          {String(exampleIndex + 1).padStart(2, "0")}
                        </span>

                        <div>
                          <h3 className="font-black">
                            {example.title}
                          </h3>

                          <p className="mt-1 text-sm leading-6 text-[#59728c]">
                            {example.description}
                          </p>
                        </div>
                      </div>

                      <span className="shrink-0 text-xl font-black transition group-open:rotate-45">
                        +
                      </span>
                    </summary>

                    <div className="border-t-2 border-[#132238] p-4 sm:p-5">
                      {/* Command */}
                      <p className="mb-2 text-[10px] font-black uppercase tracking-[0.16em] text-[#59728c]">
                        Command
                      </p>

                      <div className="overflow-x-auto border-2 border-[#132238] bg-[#132238] p-3">
                        <code className="whitespace-pre font-mono text-sm font-bold">
                          <span className="mr-2 text-[#ffcf70]">&gt;</span>

                          {example.command.map((token, index) => (
                            <span
                              key={`${token.text}-${index}`}
                              className={syntaxTokenStyles[token.type]}
                            >
                              {token.text}
                            </span>
                          ))}
                        </code>
                      </div>

                      {/* Output */}
                      <details className="mt-4 border-2 border-[#132238] bg-[#edf8ff]">
                        <summary className="cursor-pointer list-none px-4 py-3 text-xs font-black uppercase tracking-[0.14em]">
                          View expected output +
                        </summary>

                        <div className="border-t-2 border-[#132238] p-4">
                          <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-xs leading-6 text-[#132238]">
                            {example.output}
                          </pre>
                        </div>
                      </details>

                      {/* Output explanation */}
                      {example.outputExplanation &&
                        example.outputExplanation.length > 0 && (
                          <details className="mt-3 border-2 border-[#132238] bg-[#fff4a8]">
                            <summary className="cursor-pointer list-none px-4 py-3 text-xs font-black uppercase tracking-[0.14em]">
                              Understand the output +
                            </summary>

                            <div className="grid gap-3 border-t-2 border-[#132238] p-4 sm:grid-cols-2">
                              {example.outputExplanation.map((item) => (
                                <div key={item.label}>
                                  <code className="font-mono text-xs font-black text-[#2457d6]">
                                    {item.label}
                                  </code>

                                  <p className="mt-1 text-xs leading-5 text-[#40566f]">
                                    {item.description}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </details>
                        )}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          </div>

          {/* Sticky sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-6 lg:self-start">
            {/* Quick reference */}
            <div className="border-2 border-[#132238] bg-[#fff4a8] p-5 shadow-[4px_4px_0_#132238]">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#59728c]">
                Quick reference
              </p>

              <div className="mt-4 space-y-4 text-sm">
                <div>
                  <span className="block text-[10px] font-black uppercase tracking-wider text-[#7890a5]">
                    Environment
                  </span>

                  <Link
                    href={`/commands/environment/${selectedCommand.environment}`}
                    className="mt-1 block font-black text-[#2457d6]"
                  >
                    {getEnvironmentName(selectedCommand.environment)}
                  </Link>
                </div>

                <div>
                  <span className="block text-[10px] font-black uppercase tracking-wider text-[#7890a5]">
                    Difficulty
                  </span>

                  <span className="mt-1 block font-black">
                    {getDifficultyName(selectedCommand.difficulty)}
                  </span>
                </div>

                <div>
                  <span className="block text-[10px] font-black uppercase tracking-wider text-[#7890a5]">
                    Categories
                  </span>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedCommand.categories.map((category) => (
                      <Link
                        key={category}
                        href={`/commands/category/${category}`}
                        className="border border-[#132238] bg-white px-2 py-1 text-xs font-bold hover:bg-[#dff3ff]"
                      >
                        {getCategoryName(category)}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Related commands */}
            {commandDetails.relatedCommands &&
              commandDetails.relatedCommands.length > 0 && (
                <div className="border-2 border-[#132238] bg-white p-5">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[#2457d6]">
                    Related commands
                  </p>

                  <div className="mt-4 divide-y-2 divide-[#132238]">
                    {commandDetails.relatedCommands.map((relatedCommand) => (
                      <Link
                        key={`${relatedCommand.environment}-${relatedCommand.slug}`}
                        href={`/commands/${relatedCommand.environment}/${relatedCommand.slug}`}
                        className="group flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                      >
                        <div>
                          <code className="font-mono text-sm font-black text-[#2457d6]">
                            {relatedCommand.name}
                          </code>

                          <p className="mt-1 text-xs leading-5 text-[#59728c]">
                            {relatedCommand.description}
                          </p>
                        </div>

                        <span className="font-black transition group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            {/* Back to library */}
            <Link
              href="/commands"
              className="block border-2 border-[#132238] bg-[#2457d6] px-4 py-3 text-center text-sm font-black text-white shadow-[3px_3px_0_#132238] transition hover:-translate-y-0.5 hover:bg-[#1744b2]"
            >
              Browse all commands
            </Link>
          </aside>
        </div>
      ) : (
        /* Command exists but full details have not been written yet */
        <section className="mx-auto max-w-4xl px-6 py-14">
          <div className="border-2 border-dashed border-[#132238] bg-[#fff4a8] p-8 text-center">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#59728c]">
              Content in progress
            </p>

            <h2 className="mt-3 text-2xl font-black">
              Full command guide coming soon.
            </h2>

            <p className="mx-auto mt-3 max-w-xl leading-7 text-[#59728c]">
              This command is already part of the AstroBase library, but its
              detailed syntax, examples and expected output have not been added
              yet.
            </p>

            <Link
              href="/commands"
              className="mt-6 inline-block border-2 border-[#132238] bg-[#2457d6] px-5 py-3 font-black text-white shadow-[4px_4px_0_#132238]"
            >
              Back to Command Library
            </Link>
          </div>
        </section>
      )}

      {/* Compact footer */}
      <footer className="border-t-2 border-[#132238]">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-6 py-6 text-sm font-semibold sm:flex-row">
          <span>AstroBase</span>

          <span className="text-[#59728c]">
            Understand the command. Not just the syntax.
          </span>
        </div>
      </footer>
    </main>
  );
}