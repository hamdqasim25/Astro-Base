export const submissionTypes = [
  "Report a bug",
  "General feedback",
  "Suggest a feature or command",
  "Report incorrect documentation",
] as const;

export type SupportFields = {
  submissionType: string;
  description: string;
  pageUrl: string;
  email: string;
};

export type SupportErrors = Partial<Record<keyof SupportFields, string>>;

export function getFormspreeEndpoint(value: string | undefined): string | undefined {
  const endpoint = value?.trim();
  return endpoint && /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(endpoint)
    ? endpoint
    : undefined;
}

export function validateSupportFields(fields: SupportFields): SupportErrors {
  const errors: SupportErrors = {};
  if (!submissionTypes.some((type) => type === fields.submissionType)) {
    errors.submissionType = "Choose a submission type.";
  }
  if (fields.description.trim().length < 10) {
    errors.description = "Enter at least 10 characters describing your feedback or issue.";
  } else if (fields.description.length > 2000) {
    errors.description = "Keep your description to 2,000 characters or fewer.";
  }
  if (fields.pageUrl.trim()) {
    try {
      const url = new URL(fields.pageUrl.trim());
      if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) {
        errors.pageUrl = "Enter a full http:// or https:// page URL without login details.";
      }
    } catch {
      errors.pageUrl = "Enter a full page URL, including http:// or https://.";
    }
  }
  if (fields.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
    errors.email = "Enter a valid email address, or leave this field blank.";
  }
  return errors;
}

export async function submitSupportFeedback(endpoint: string, fields: SupportFields, honeypot: string): Promise<void> {
  if (!getFormspreeEndpoint(endpoint)) throw new Error("Feedback is currently unavailable. Please try again later.");
  if (Object.keys(validateSupportFields(fields)).length) throw new Error("Please check the form fields before sending.");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({
        submissionType: fields.submissionType,
        description: fields.description.trim(),
        pageUrl: fields.pageUrl.trim(),
        ...(fields.email.trim() ? { email: fields.email.trim() } : {}),
        _gotcha: honeypot,
      }),
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error(response.status === 429
        ? "Too many submissions. Please wait a little before trying again. Your input has been kept."
        : "Your feedback could not be sent. Please try again later. Your input has been kept.");
    }
  } catch (error) {
    if (controller.signal.aborted) throw new Error("The request timed out. Your input has been kept; please try again.");
    if (error instanceof TypeError) throw new Error("Unable to reach the feedback service. Check your connection and try again. Your input has been kept.");
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
