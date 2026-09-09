import Link from "next/link";
import { notFound } from "next/navigation";

import { commands } from "@/data/commands";
import {
  categories,
  difficultyLevels,
  environments,
} from "@/data/filters";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;

  searchParams: Promise<{
    difficulty?: string | string[];
  }>;
};

function getEnvironmentName(slug: string) {
  return (
    environments.find((environment) => environment.slug === slug)?.name ?? slug
  );
}

function getDifficultyName(slug: string) {
  return (
    difficultyLevels.find((difficulty) => difficulty.slug === slug)?.name ?? slug
  );
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const resolvedSearchParams = await searchParams;

  const category = categories.find(
    (item) => item.slug === categorySlug,
  );

  if (!category) {
    notFound();
  }

  const requestedDifficulty = Array.isArray(
    resolvedSearchParams.difficulty,
  )
    ? resolvedSearchParams.difficulty[0]
    : resolvedSearchParams.difficulty;

  const selectedDifficulty = difficultyLevels.some(
    (level) => level.slug === requestedDifficulty,
  )
    ? requestedDifficulty
    : undefined;

  const categoryCommands = commands.filter((command) =>
    command.categories.includes(category.slug),
  );

  const filteredCommands = selectedDifficulty
    ? categoryCommands.filter(
        (command) => command.difficulty === selectedDifficulty,
      )
    : categoryCommands;

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

      {/* Page header */}
      <section className="relative overflow-hidden border-b-2 border-[#132238]">
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(#315b7d 1px, transparent 1px), linear-gradient(90deg, #315b7d 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 py-14 sm:py-16">
          <Link
            href="/commands"
            className="inline-flex items-center gap-2 text-sm font-black text-[#2457d6] transition hover:-translate-x-1"
          >
            ← Command Library
          </Link>

          <div className="mt-6 inline-flex border-2 border-[#132238] bg-[#ffcf70] px-3 py-1 text-xs font-black uppercase tracking-[0.18em]">
            Category
          </div>

          <h1 className="mt-5 text-5xl font-black tracking-[-0.05em] sm:text-6xl">
            {category.name}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-[#40566f]">
            {category.description}
          </p>

          <p className="mt-5 font-mono text-sm font-bold text-[#59728c]">
            {categoryCommands.length}{" "}
            {categoryCommands.length === 1 ? "command" : "commands"} in this
            category
          </p>
        </div>
      </section>

      {/* Difficulty filter */}
      <section className="border-b-2 border-[#132238] bg-[#f5fbff]">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#59728c]">
            Filter by difficulty
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/commands/category/${category.slug}`}
              className={`border-2 border-[#132238] px-4 py-2 text-sm font-black transition ${
                !selectedDifficulty
                  ? "bg-[#2457d6] text-white shadow-[3px_3px_0_#132238]"
                  : "bg-white shadow-[2px_2px_0_#132238] hover:-translate-y-0.5 hover:bg-[#fff4a8]"
              }`}
            >
              All
            </Link>

            {difficultyLevels.map((difficulty) => {
              const isActive = selectedDifficulty === difficulty.slug;

              return (
                <Link
                  key={difficulty.slug}
                  href={`/commands/category/${category.slug}?difficulty=${difficulty.slug}`}
                  className={`border-2 border-[#132238] px-4 py-2 text-sm font-black transition ${
                    isActive
                      ? "bg-[#2457d6] text-white shadow-[3px_3px_0_#132238]"
                      : "bg-white shadow-[2px_2px_0_#132238] hover:-translate-y-0.5 hover:bg-[#fff4a8]"
                  }`}
                >
                  {difficulty.name}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Command results */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#2457d6]">
              Results
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight">
              {selectedDifficulty
                ? `${getDifficultyName(selectedDifficulty)} ${category.name} commands`
                : `All ${category.name} commands`}
            </h2>
          </div>

          <p className="text-sm font-bold text-[#59728c]">
            {filteredCommands.length}{" "}
            {filteredCommands.length === 1 ? "result" : "results"}
          </p>
        </div>

        {filteredCommands.length > 0 ? (
          <div className="grid gap-4">
            {filteredCommands.map((command, index) => (
              <Link
                key={`${command.environment}-${command.slug}`}
                href={`/commands/${command.environment}/${command.slug}`}
                className="group border-2 border-[#132238] bg-white transition hover:-translate-y-1 hover:shadow-[6px_6px_0_#132238]"
              >
                <div className="grid gap-5 p-5 sm:grid-cols-[55px_1fr_auto] sm:items-center sm:p-6">
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

                    <div className="mt-4 flex flex-wrap gap-2">
                      {command.categories.map((commandCategory) => {
                        const commandCategoryName =
                          categories.find(
                            (item) => item.slug === commandCategory,
                          )?.name ?? commandCategory;

                        return (
                          <span
                            key={commandCategory}
                            className="bg-[#fff4a8] px-2.5 py-1 text-xs font-bold"
                          >
                            {commandCategoryName}
                          </span>
                        );
                      })}

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
        ) : (
          <div className="border-2 border-dashed border-[#132238] bg-[#fff4a8] p-8 text-center">
            <h3 className="text-xl font-black">
              No commands found.
            </h3>

            <p className="mt-2 text-sm text-[#59728c]">
              AstroBase does not currently have any {category.name} commands at
              this difficulty level.
            </p>

            <Link
              href={`/commands/category/${category.slug}`}
              className="mt-5 inline-block font-black text-[#2457d6]"
            >
              View all {category.name} commands →
            </Link>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-[#132238]">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-6 py-10 text-sm font-semibold sm:flex-row">
          <span>AstroBase</span>

          <span className="text-[#59728c]">
            Understand the command. Not just the syntax.
          </span>
        </div>
      </footer>
    </main>
  );
}