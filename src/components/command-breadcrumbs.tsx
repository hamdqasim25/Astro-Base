import Link from "next/link";

type CommandBreadcrumbsProps = {
  name: string;
  href?: string;
};

export default function CommandBreadcrumbs({ name, href }: CommandBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-sm font-black">
        <li>
          <Link href="/commands" className="inline-block text-[#2457d6] transition hover:-translate-x-1">
            ← Commands
          </Link>
        </li>
        <li className="flex min-w-0 items-center gap-2">
          <span aria-hidden="true" className="text-[#7890a5]">/</span>
          {href ? (
            <Link href={href} className="text-[#59728c] hover:text-[#2457d6]">
              {name}
            </Link>
          ) : (
            <span aria-current="page" className="text-[#59728c]">{name}</span>
          )}
        </li>
      </ol>
    </nav>
  );
}
