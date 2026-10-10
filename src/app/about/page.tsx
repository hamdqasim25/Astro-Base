import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About AstroBase",
  description: "Discover AstroBase, a free IT knowledge base with clear command explanations, practical examples and expected outputs.",
};

export default function AboutPage() {
  return (
    <main className="flex-1 bg-[#dff3ff] text-[#132238]">
      <section className="relative overflow-hidden border-b-2 border-[#132238]">
        <div aria-hidden="true" className="absolute inset-0 opacity-[0.18]" style={{ backgroundImage: "linear-gradient(#315b7d 1px, transparent 1px), linear-gradient(90deg, #315b7d 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative mx-auto max-w-7xl px-6 py-5 sm:py-6">
          <h1 className="text-4xl font-black tracking-[-0.05em] sm:text-6xl">About AstroBase</h1>
          <p className="mt-3 text-base leading-7 text-[#40566f]">Making technical knowledge easier to understand.</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-6 px-6 py-6 sm:py-8">
        <section className="border-2 border-[#132238] bg-white p-5 shadow-[4px_4px_0_#132238] sm:p-6">
          <h2 className="text-2xl font-black">What is AstroBase?</h2>
          <p className="mt-3 max-w-3xl leading-7 text-[#40566f]">AstroBase is a free, public-first IT knowledge base designed to help students, aspiring IT professionals and support technicians understand and use common technical commands.</p>
          <p className="mt-3 max-w-3xl leading-7 text-[#40566f]">It focuses on practical learning through clear explanations, real-world examples and expected command outputs.</p>
        </section>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="border-2 border-[#132238] bg-[#fffdf7] p-5 sm:p-6">
            <h2 className="text-2xl font-black">What you&apos;ll find</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-[#40566f]">
              <li>Command references for Windows CMD, PowerShell and Linux Bash.</li>
              <li>Syntax highlighting with an explanatory colour legend.</li>
              <li>Practical examples and expected outputs.</li>
              <li>Navigation by operating environment, category and difficulty.</li>
            </ul>
          </section>
          <section className="border-2 border-[#132238] bg-[#fff4a8] p-5 sm:p-6">
            <h2 className="text-2xl font-black">Why AstroBase was created</h2>
            <p className="mt-3 leading-7 text-[#40566f]">AstroBase is an independently developed project inspired by the challenges of learning IT support and system administration.</p>
            <p className="mt-3 leading-7 text-[#40566f]">Its purpose is to make technical documentation more approachable for beginners without sacrificing practical detail: understanding when to use a command, how it works and what its output means.</p>
          </section>
        </div>

        <section className="border-2 border-dashed border-[#132238] bg-[#edf8ff] p-5 sm:p-6">
          <h2 className="text-2xl font-black">What&apos;s coming next?</h2>
          <p className="mt-3 leading-7 text-[#40566f]">These are planned additions, not features currently available:</p>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-[#40566f]">
            <li>Expanded command library.</li>
            <li>Interactive troubleshooting guides.</li>
            <li>Quizzes and learning exercises.</li>
            <li>Networking and cybersecurity resources.</li>
            <li>Cloud and DevOps content.</li>
          </ul>
        </section>

        <div className="flex flex-wrap gap-4">
          <Link href="/commands" className="inline-flex min-h-11 items-center border-2 border-[#132238] bg-[#2457d6] px-5 py-3 font-black text-white shadow-[3px_3px_0_#132238] hover:bg-[#1744b2] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2457d6]">Explore Commands</Link>
          <Link href="/support" className="inline-flex min-h-11 items-center border-2 border-[#132238] bg-[#fff4a8] px-5 py-3 font-black shadow-[3px_3px_0_#132238] hover:bg-[#ffcf70] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2457d6]">Share Feedback</Link>
        </div>
      </div>
    </main>
  );
}
