import type { Metadata } from "next";
import SupportForm from "@/components/support-form";
import { commands } from "@/data/commands";
import { environments } from "@/data/filters";
import { resolveCommandIssue, type SupportSearchParams } from "@/lib/command-issue";

export const metadata: Metadata = {
  title: "Support & Feedback | AstroBase",
  description: "Report bugs, suggest commands and features, or share feedback about AstroBase.",
};

export default async function SupportPage({ searchParams }: { searchParams: Promise<SupportSearchParams> }) {
  const context = resolveCommandIssue(await searchParams, commands, environments);
  return (
    <main className="flex-1 bg-[#dff3ff] text-[#132238]">
      <section className="relative overflow-hidden border-b-2 border-[#132238]">
        <div aria-hidden="true" className="absolute inset-0 opacity-[0.18]" style={{ backgroundImage: "linear-gradient(#315b7d 1px, transparent 1px), linear-gradient(90deg, #315b7d 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative mx-auto max-w-7xl px-6 py-5 sm:py-6">
          <h1 className="text-4xl font-black tracking-[-0.05em] sm:text-6xl">Support &amp; Feedback</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[#40566f]">Found an issue, spotted an error or have an idea for AstroBase? Let us know.</p>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-6 py-6 sm:py-8">
        <div className="max-w-2xl border-2 border-[#132238] bg-[#fffdf7] p-5 shadow-[4px_4px_0_#132238] sm:p-6">
          {context && (
            <p className="mb-5 break-words text-sm leading-6 text-[#40566f]">
              Reporting an issue with <strong>{context.commandName}</strong> ({context.environment}).
            </p>
          )}
          <SupportForm key={context?.path ?? "general"} context={context} />
        </div>
      </div>
    </main>
  );
}
