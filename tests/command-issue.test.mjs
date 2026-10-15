import assert from "node:assert/strict";
import { test } from "node:test";
import { commands } from "../src/data/commands.ts";
import { environments } from "../src/data/filters.ts";
import { commandIssueHref, resolveCommandIssue } from "../src/lib/command-issue.ts";
import { submitSupportFeedback, validateSupportFields } from "../src/lib/support-form.ts";

const resolve = (params) => resolveCommandIssue(params, commands, environments);
const queryFor = (command) => Object.fromEntries(new URL(commandIssueHref(command), "https://example.test").searchParams);
const valid = queryFor(commands[0]);

test("every command report link round-trips to canonical context across all environments", () => {
  for (const command of commands) {
    const context = resolve(queryFor(command));
    const environment = environments.find((entry) => entry.slug === command.environment).name;
    assert.equal(context.commandName, command.name);
    assert.equal(context.environment, environment);
    assert.equal(context.path, `/commands/${command.environment}/${command.slug}`);
    assert.equal(context.description, `Command: ${command.name}\nEnvironment: ${environment}\nPage: ${context.path}\n\nWhat is incorrect or not working?\n\nWhat did you expect to see?`);
  }
});

test("missing, repeated, empty and oversized context falls back to ordinary support", () => {
  assert.equal(resolve({}), undefined);
  for (const key of Object.keys(valid)) {
    for (const value of [undefined, "", [valid[key]], [valid[key], valid[key]], "x".repeat(300)]) {
      assert.equal(resolve({ ...valid, [key]: value }), undefined);
    }
  }
});

test("unknown commands, mismatched environments and injected names are rejected", () => {
  for (const command of ["unknown", "<script>alert(1)</script>", "ping\nInjected", "PING"]) {
    assert.equal(resolve({ ...valid, command }), undefined);
  }
  assert.equal(resolve({ ...valid, environment: "bash" }), undefined);
  assert.equal(resolve({ ...valid, report: "bug" }), undefined);
});

test("only the exact internal route for the selected command is accepted", () => {
  for (const page of [
    "https://evil.example/commands/cmd/ping", "//evil.example/commands/cmd/ping",
    "/commands/cmd/../ping", "/commands/cmd/%70ing", "/commands/cmd/ping?x=1",
    "/commands/cmd/ping#syntax", "/commands/cmd/ping/", "/commands/cmd/ipconfig",
    "/commands/cmd/ping\n", "/commands\\cmd\\ping", "/support", "javascript:alert(1)",
  ]) assert.equal(resolve({ ...valid, page }), undefined, page);
});

test("report links encode reserved characters rather than injecting query parameters", () => {
  const command = { ...commands[0], name: "name & report=other + # ?" };
  const params = queryFor(command);
  assert.equal(params.command, command.name);
  assert.equal(params.report, "command-issue");
  assert.equal(Object.keys(params).length, 4);
});

test("edited contextual description is validated and sent unchanged through the existing mocked submission", async (t) => {
  const context = resolve(valid);
  const description = `${context.description}\nThe example output differs on my computer.`;
  const fields = { submissionType: "Report incorrect documentation", description, pageUrl: "", email: "" };
  assert.deepEqual(validateSupportFields(fields), {});
  const mock = t.mock.method(globalThis, "fetch", async (_url, options) => {
    assert.equal(JSON.parse(options.body).description, description);
    assert.equal(JSON.parse(options.body)._gotcha, "");
    return new Response("{}", { status: 200 });
  });
  await submitSupportFeedback("https://formspree.io/f/testform", fields, "");
  assert.equal(mock.mock.callCount(), 1);
  assert.equal(fields.description, description);
});
