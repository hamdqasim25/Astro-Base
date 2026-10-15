import type { Command } from "@/data/commands";

export type SupportSearchParams = Record<string, string | string[] | undefined>;

export type CommandIssueContext = {
  commandName: string;
  environment: string;
  path: string;
  description: string;
};

export function commandIssueHref(command: Command): string {
  const query = new URLSearchParams({
    report: "command-issue",
    command: command.name,
    environment: command.environment,
    page: `/commands/${command.environment}/${command.slug}`,
  });
  return `/support?${query.toString()}`;
}

export function resolveCommandIssue(
  params: SupportSearchParams,
  commands: readonly Command[],
  environments: readonly { slug: string; name: string }[],
): CommandIssueContext | undefined {
  const { report, command, environment, page } = params;
  // Reject duplicates and oversized input before comparing with trusted data.
  if (
    report !== "command-issue" ||
    typeof command !== "string" || !command || command.length > 120 ||
    typeof environment !== "string" || !environment || environment.length > 32 ||
    typeof page !== "string" || page.length > 256 ||
    !/^\/commands\/[a-z0-9-]+\/[a-z0-9-]+$/.test(page)
  ) return undefined;

  const selected = commands.find((entry) =>
    entry.name === command && entry.environment === environment &&
    page === `/commands/${entry.environment}/${entry.slug}`,
  );
  const selectedEnvironment = environments.find((entry) => entry.slug === selected?.environment);
  if (!selected || !selectedEnvironment) return undefined;

  // Return only canonical dataset values, never raw query text.
  const path = `/commands/${selected.environment}/${selected.slug}`;
  return {
    commandName: selected.name,
    environment: selectedEnvironment.name,
    path,
    description: `Command: ${selected.name}\nEnvironment: ${selectedEnvironment.name}\nPage: ${path}\n\nWhat is incorrect or not working?\n\nWhat did you expect to see?`,
  };
}
