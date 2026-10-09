import Link from "next/link";
import { commands } from "@/data/commands";
import {
  categories,
  difficultyLevels,
  environments,
} from "@/data/filters";

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

type CommandsPageProps = {
  searchParams: Promise<{
    q?: string | string[];
  }>;
};

export default async function CommandsPage({ searchParams }: CommandsPageProps) {
  const { q } = await searchParams;
  const query = (Array.isArray(q) ? q[0] : q) ?? "";
  const searchTerm = query.trim().toLowerCase();
  const filteredCommands = commands.filter((command) =>
    [
      command.name,
      command.description,
      command.environment,
      getEnvironmentName(command.environment),
      ...command.categories,
      ...command.categories.map(getCategoryName),
    ].some((value) => value.toLowerCase().includes(searchTerm)),
  );

  return (
    <main className="flex-1 bg-[#dff3ff] text-[#132238]">
      {/* Library header */}
      <section className="relative overflow-hidden border-b-2 border-[#132238]">
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(#315b7d 1px, transparent 1px), linear-gradient(90deg, #315b7d 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 py-5 sm:py-6">
          <div className="inline-flex border-2 border-[#132238] bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.18em]">
            Command Library
          </div>

          <div className="mt-4 grid gap-5 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <div>
              <h1 className="text-5xl font-black leading-[0.95] tracking-[-0.05em] sm:text-6xl">
                Every command.
                <span className="block text-[#2457d6]">
                  One place.
                </span>
              </h1>

              <p className="mt-3 max-w-2xl text-base leading-7 text-[#40566f]">
                Search the complete AstroBase library or narrow it down by
                environment and topic.
              </p>
            </div>

            <div className="border-2 border-[#132238] bg-[#fff4a8] p-5 shadow-[5px_5px_0_#132238]">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#59728c]">
                Library status
              </p>

              <div className="mt-3 flex items-end gap-2">
                <span className="text-4xl font-black">
                  {commands.length}
                </span>

                <span className="pb-1 text-sm font-bold text-[#59728c]">
                  commands currently available
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All commands */}
      <section className="mx-auto max-w-7xl px-6 py-6 sm:py-8">
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#2457d6]">
              {searchTerm ? "Search results" : "All commands"}
            </p>

            <h2 className="mt-2 break-words text-4xl font-black tracking-tight">
              {searchTerm ? `Results for “${query.trim()}”` : "Explore the library."}
            </h2>
          </div>

          <p className="text-sm font-semibold text-[#59728c]">
            {filteredCommands.length} {filteredCommands.length === 1 ? "command" : "commands"}
          </p>
        </div>

        {query && (
          <Link href="/commands" className="mb-6 inline-block text-sm font-black text-[#2457d6] underline">
            Clear search
          </Link>
        )}

        <div className="grid gap-4">
          {filteredCommands.length === 0 && (
            <div className="border-2 border-dashed border-[#132238] bg-[#fff4a8] p-8 text-center">
              <h3 className="text-xl font-black">No commands found.</h3>
              <p className="mt-2 text-sm text-[#59728c]">
                Try another command name, description, environment or category, or clear your search to browse all commands.
              </p>
            </div>
          )}
          {filteredCommands.map((command, index) => (
            <Link
              key={`${command.environment}-${command.slug}`}
              href={`/commands/${command.environment}/${command.slug}`}
              className="group border-2 border-[#132238] bg-white transition hover:-translate-y-1 hover:shadow-[6px_6px_0_#132238]"
            >
              <div className="grid gap-4 p-4 sm:grid-cols-[55px_1fr_auto] sm:items-center sm:p-5">
                {/* Command number */}
                <span className="hidden font-mono text-xs font-black text-[#7890a5] sm:block">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Command information */}
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-mono text-xl font-black text-[#2457d6] sm:text-2xl">
                      {command.name}
                    </h3>

                    <span className="border border-[#132238] bg-[#edf8ff] px-2 py-1 text-[10px] font-black uppercase tracking-wider">
                      {getEnvironmentName(command.environment)}
                    </span>
                  </div>

                  <p className="mt-2 max-w-3xl text-sm leading-6 text-[#59728c] sm:text-base">
                    {command.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {command.categories.map((category) => (
                      <span
                        key={category}
                        className="bg-[#fff4a8] px-2.5 py-1 text-xs font-bold"
                      >
                        {getCategoryName(category)}
                      </span>
                    ))}

                    <span className="bg-[#dff3ff] px-2.5 py-1 text-xs font-bold">
                      {getDifficultyName(command.difficulty)}
                    </span>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex items-center justify-between sm:block">
                  <span className="text-xs font-black uppercase tracking-wider text-[#59728c] sm:hidden">
                    View command
                  </span>

                  <span className="inline-block text-2xl font-black transition group-hover:translate-x-2">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Growth message */}
        <div className="mt-6 border-2 border-dashed border-[#132238] bg-[#bfe6ff] p-5 text-center">
          <p className="font-semibold">
            The AstroBase command library will continue growing with new
            commands, examples and learning resources.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-[#132238]">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-6 py-6 text-sm font-semibold sm:flex-row">
          <span>AstroBase</span>

          <span className="text-[#59728c]">
            Understand the command. Not just the syntax.
          </span>
        </div>
      </footer>
    </main>
  );
}
