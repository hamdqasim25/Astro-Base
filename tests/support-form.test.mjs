import assert from "node:assert/strict";
import { test } from "node:test";
import { getFormspreeEndpoint, submissionTypes, submitSupportFeedback, validateSupportFields } from "../src/lib/support-form.ts";

const endpoint = "https://formspree.io/f/testform";
const fields = { submissionType: "Report a bug", description: "The command link is broken.", pageUrl: "", email: "" };

test("missing, malformed and non-Formspree endpoints are unavailable", () => {
  for (const value of [undefined, "", "http://formspree.io/f/testform", "https://example.com/f/testform", "https://formspree.io/f/YOUR_FORM_ID"]) {
    assert.equal(getFormspreeEndpoint(value), undefined);
  }
  assert.equal(getFormspreeEndpoint(` ${endpoint} `), endpoint);
});

test("valid submission types and optional fields", () => {
  for (const submissionType of submissionTypes) assert.deepEqual(validateSupportFields({ ...fields, submissionType }), {});
  assert.deepEqual(validateSupportFields({ ...fields, email: "student@example.com", pageUrl: "http://192.168.1.242:3000/commands/cmd/ping" }), {});
});

test("required fields, whitespace and description boundaries", () => {
  assert.ok(validateSupportFields({ ...fields, submissionType: "" }).submissionType);
  for (const description of ["", "          ", "a".repeat(9), "a".repeat(2001)]) {
    assert.ok(validateSupportFields({ ...fields, description }).description);
  }
  for (const description of ["a".repeat(10), "a".repeat(2000)]) assert.deepEqual(validateSupportFields({ ...fields, description }), {});
});

test("invalid emails and unsafe or incomplete page URLs are rejected", () => {
  for (const email of ["hello", "a@", "a b@example.com"]) assert.ok(validateSupportFields({ ...fields, email }).email);
  for (const pageUrl of ["/commands", "not a URL", "javascript:alert(1)", "ftp://example.com", "https://name:password@example.com"]) {
    assert.ok(validateSupportFields({ ...fields, pageUrl }).pageUrl);
  }
});

test("successful mocked POST uses meaningful fields and the honeypot", async (t) => {
  const mock = t.mock.method(globalThis, "fetch", async (url, options) => {
    assert.equal(url, endpoint);
    assert.equal(options.method, "POST");
    assert.equal(options.headers.Accept, "application/json");
    assert.deepEqual(JSON.parse(options.body), { submissionType: fields.submissionType, description: fields.description, pageUrl: "", _gotcha: "" });
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  });
  await submitSupportFeedback(endpoint, fields, "");
  assert.equal(mock.mock.callCount(), 1);
});

test("non-success responses reject and leave input intact", async (t) => {
  const original = { ...fields };
  t.mock.method(globalThis, "fetch", async () => new Response("Rejected", { status: 422 }));
  await assert.rejects(submitSupportFeedback(endpoint, fields, ""), /could not be sent/);
  assert.deepEqual(fields, original);
});

test("rate limits and network failures provide retry messages", async (t) => {
  const mock = t.mock.method(globalThis, "fetch", async () => new Response("Rate limited", { status: 429 }));
  await assert.rejects(submitSupportFeedback(endpoint, fields, ""), /Too many submissions/);
  mock.mock.mockImplementation(async () => { throw new TypeError("Failed to fetch"); });
  await assert.rejects(submitSupportFeedback(endpoint, fields, ""), /Check your connection/);
});

test("invalid configuration or input never sends a request", async (t) => {
  const mock = t.mock.method(globalThis, "fetch", async () => { throw Error("Must not send"); });
  await assert.rejects(submitSupportFeedback("", fields, ""), /unavailable/);
  await assert.rejects(submitSupportFeedback(endpoint, { ...fields, description: "" }, ""), /check the form fields/);
  assert.equal(mock.mock.callCount(), 0);
});
