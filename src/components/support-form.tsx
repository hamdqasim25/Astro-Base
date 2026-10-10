"use client";

import { useRef, useState, type FormEvent } from "react";
import { getFormspreeEndpoint, submissionTypes, submitSupportFeedback, validateSupportFields, type SupportErrors, type SupportFields } from "@/lib/support-form";

const fieldClass = "mt-2 block min-h-11 w-full min-w-0 border-2 border-[#132238] bg-white px-3 py-2 text-base text-[#132238] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2457d6]";

export default function SupportForm() {
  const endpoint = getFormspreeEndpoint(process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT);
  const [errors, setErrors] = useState<SupportErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const sending = useRef(false);
  const feedbackRef = useRef<HTMLParagraphElement>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current || !endpoint) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const fields: SupportFields = {
      submissionType: String(data.get("submissionType") ?? ""),
      description: String(data.get("description") ?? ""),
      pageUrl: String(data.get("pageUrl") ?? ""),
      email: String(data.get("email") ?? ""),
    };
    const validation = validateSupportFields(fields);
    setErrors(validation);
    setMessage("");
    const firstInvalid = Object.keys(validation)[0];
    if (firstInvalid) {
      setStatus("error");
      setMessage("Please correct the highlighted fields.");
      const control = form.elements.namedItem(firstInvalid);
      if (control instanceof HTMLElement) control.focus();
      return;
    }

    sending.current = true;
    setStatus("sending");
    try {
      await submitSupportFeedback(endpoint, fields, String(data.get("_gotcha") ?? ""));
      form.reset();
      setStatus("success");
      setMessage("Thank you! Your feedback has been sent.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to send feedback. Your input has been kept; please try again.");
    } finally {
      sending.current = false;
      requestAnimationFrame(() => feedbackRef.current?.focus());
    }
  }

  if (!endpoint) {
    return (
      <div role="status">
        <h2 className="text-2xl font-black">Feedback is temporarily unavailable</h2>
        <p className="mt-3 leading-7 text-[#40566f]">The feedback service has not been configured yet. Please check back later to send your report or suggestion.</p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} aria-label="Support and feedback" aria-busy={status === "sending"}>
      <p className="mb-5 text-sm leading-6 text-[#40566f]">Submission type and description are required. Do not include passwords, access tokens or other sensitive information.</p>
      <fieldset disabled={status === "sending"} className="min-w-0 space-y-5 disabled:opacity-70">
        <legend className="sr-only">Your feedback</legend>
        <div>
          <label htmlFor="support-type" className="font-bold">Submission type (required)</label>
          <select id="support-type" name="submissionType" required defaultValue="" className={fieldClass} aria-invalid={Boolean(errors.submissionType)} aria-describedby={errors.submissionType ? "type-error" : undefined}>
            <option value="" disabled>Choose a type</option>
            {submissionTypes.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
          {errors.submissionType && <p id="type-error" className="mt-2 text-sm font-bold text-[#9f1d20]">{errors.submissionType}</p>}
        </div>
        <div>
          <label htmlFor="support-description" className="font-bold">Description (required)</label>
          <p id="description-help" className="mt-1 text-sm leading-6 text-[#40566f]">Use 10–2,000 characters. For a bug, include what you did, what happened and what you expected.</p>
          <textarea id="support-description" name="description" required minLength={10} maxLength={2000} rows={6} className={`${fieldClass} resize-y`} aria-invalid={Boolean(errors.description)} aria-describedby={`description-help${errors.description ? " description-error" : ""}`} />
          {errors.description && <p id="description-error" className="mt-2 text-sm font-bold text-[#9f1d20]">{errors.description}</p>}
        </div>
        <div>
          <label htmlFor="support-url" className="font-bold">Page URL (optional)</label>
          <p id="url-help" className="mt-1 text-sm leading-6 text-[#40566f]">Paste the full address of the affected AstroBase page.</p>
          <input id="support-url" name="pageUrl" type="url" autoComplete="url" className={fieldClass} aria-invalid={Boolean(errors.pageUrl)} aria-describedby={`url-help${errors.pageUrl ? " url-error" : ""}`} />
          {errors.pageUrl && <p id="url-error" className="mt-2 text-sm font-bold text-[#9f1d20]">{errors.pageUrl}</p>}
        </div>
        <div>
          <label htmlFor="support-email" className="font-bold">Email (optional)</label>
          <p id="email-help" className="mt-1 text-sm leading-6 text-[#40566f]">An email address allows us to follow up. You can send feedback without one.</p>
          <input id="support-email" name="email" type="email" autoComplete="email" className={fieldClass} aria-invalid={Boolean(errors.email)} aria-describedby={`email-help${errors.email ? " email-error" : ""}`} />
          {errors.email && <p id="email-error" className="mt-2 text-sm font-bold text-[#9f1d20]">{errors.email}</p>}
        </div>
        <div hidden aria-hidden="true">
          <label htmlFor="support-gotcha">Leave this field empty</label>
          <input id="support-gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <p className="text-sm leading-6 text-[#40566f]">Your submission, including any email address you provide, is sent to and processed by Formspree, our hosted form provider. Read <a href="https://formspree.io/legal/privacy-policy/" className="font-bold text-[#2457d6] underline focus-visible:outline-2 focus-visible:outline-offset-2">Formspree&apos;s privacy policy</a>.</p>
        <button type="submit" className="min-h-11 border-2 border-[#132238] bg-[#2457d6] px-5 py-3 font-black text-white shadow-[3px_3px_0_#132238] hover:bg-[#1744b2] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2457d6] disabled:cursor-wait">
          {status === "sending" ? "Sending…" : "Send feedback"}
        </button>
      </fieldset>
      <p ref={feedbackRef} tabIndex={-1} role="status" aria-live="polite" aria-atomic="true" className={`mt-4 break-words text-sm font-bold focus:outline-none ${status === "error" ? "text-[#9f1d20]" : "text-[#132238]"}`}>
        {status === "sending" ? "Sending your feedback. Please wait." : message}
      </p>
      <noscript><p className="mt-4 font-bold">Please enable JavaScript to validate and send feedback.</p></noscript>
    </form>
  );
}
