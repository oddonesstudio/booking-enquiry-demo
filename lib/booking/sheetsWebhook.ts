import "server-only";

// Data contract shared with the Google Apps Script webhook.
// Field names must match the script's FIELD_MAP.
export type BookingWebhookData = {
  enquiryId: string;
  contactName: string;
  contactEmail: string;
  contactNumber: string;
  eventType: string;
  eventTypeOther: string;
  eventDate: string;
  eventLocation: string;
  guestCount: string;
  serviceStart: string;
  serviceEnd: string;
};

export async function sendBookingToSheetsWebhook(data: BookingWebhookData): Promise<void> {
  // 1. Read and validate the private integration configuration.
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim();
  const secret = process.env.INTEGRATION_SECRET;

  if (!webhookUrl) {
    throw new Error("GOOGLE_SHEETS_WEBHOOK_URL is not configured.");
  }

  if (!secret || secret.length < 32) {
    throw new Error("INTEGRATION_SECRET must be configured with at least 32 characters.");
  }

  // 2. Ensure the webhook uses a secure Google Apps Script URL.
  let parsedUrl: URL;

  try {
    parsedUrl = new URL(webhookUrl);
  } catch {
    throw new Error("GOOGLE_SHEETS_WEBHOOK_URL is invalid.");
  }

  if (
    parsedUrl.protocol !== "https:" ||
    parsedUrl.hostname !== "script.google.com" ||
    !parsedUrl.pathname.endsWith("/exec")
  ) {
    throw new Error("GOOGLE_SHEETS_WEBHOOK_URL must be a deployed Google Apps Script web app URL.");
  }

  // 3. Send the booking and shared secret to the webhook.
  // Apply a timeout to avoid waiting indefinitely for a response.
  const response = await fetch(parsedUrl.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ secret, data }),
    signal: AbortSignal.timeout(10_000),
  });

  // 4. Check for HTTP-level failures.
  if (!response.ok) {
    throw new Error(`Sheets webhook responded with status ${response.status}.`);
  }

  // 5. Parse and validate the webhook's JSON response.
  let result: unknown;

  try {
    result = await response.json();
  } catch {
    throw new Error("Sheets webhook returned an unrecognised response.");
  }

  if (!result || typeof result !== "object" || Array.isArray(result)) {
    throw new Error("Sheets webhook returned an invalid response.");
  }

  const { success, error } = result as {
    success?: unknown;
    error?: unknown;
  };

  // 6. Confirm that Apps Script successfully saved the booking.
  // Apps Script may return HTTP 200 even when processing fails.
  if (success !== true) {
    const reason = typeof error === "string" ? `: ${error.slice(0, 200)}` : "";

    throw new Error(`Sheets webhook did not confirm the booking was saved${reason}.`);
  }
}
