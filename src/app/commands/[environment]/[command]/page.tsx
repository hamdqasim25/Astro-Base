import { notFound } from "next/navigation";
import CommandDetail from "@/components/command-detail";
import { getCommand } from "@/data/commands";

type CommandPageProps = {
  params: Promise<{
    environment: string;
    command: string;
  }>;
};

export default async function CommandPage({ params }: CommandPageProps) {
  const { environment, command: commandSlug } = await params;
  const selectedCommand = getCommand(environment, commandSlug);

  if (!selectedCommand) {
    notFound();
  }

  return <CommandDetail selectedCommand={selectedCommand} />;
}
