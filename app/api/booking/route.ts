import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";

import { sendBookingToSheetsWebhook } from "@/lib/booking/sheetsWebhook";

export const runtime = "nodejs";

// Maps booking form fields to the API's expected field names.
const bookingFields = {
  contactEmail: "contactEmail",
  contactName: "contactName",
  contactNumber: "contactNumber",
  eventDate: "eventDate",
  eventLocation: "eventLocation",
  eventType: "eventType",
  eventTypeOther: "eventTypeOther",
  guestCount: "guestCount",
  serviceEnd: "serviceEnd",
  serviceStart: "serviceStart",
} as const;

// Supported event types and their corresponding spreadsheet labels.
const sheetEventTypeLabels = {
  corporate: "Corporate",
  other: "Other",
  party: "Party",
  popup: "Pop Up",
  wedding: "Wedding",
} as const;

type EventType = keyof typeof sheetEventTypeLabels;

export async function POST(request: Request) {
  // 1. Parse and validate the incoming request body.
  let input: unknown;

  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return NextResponse.json({ error: "Invalid booking details." }, { status: 400 });
  }

  const body = input as Record<string, unknown>;
  const fields = Object.values(bookingFields);

  // 2. Validate field types and limit excessive input lengths.
  if (
    fields.some((key) => {
      const value = body[key];

      return value !== undefined && (typeof value !== "string" || value.length > 500);
    })
  ) {
    return NextResponse.json({ error: "Invalid booking details." }, { status: 400 });
  }

  // 3. Extract and normalise the recognised booking fields.
  const details = body as Partial<Record<(typeof fields)[number], string>>;

  const contactEmail = details[bookingFields.contactEmail]?.trim();
  const contactName = details[bookingFields.contactName]?.trim();
  const contactNumber = details[bookingFields.contactNumber]?.trim();
  const eventDate = details[bookingFields.eventDate]?.trim();
  const eventLocation = details[bookingFields.eventLocation]?.trim();
  const eventType = details[bookingFields.eventType]?.trim();
  const eventTypeOther = details[bookingFields.eventTypeOther]?.trim();
  const guestCount = details[bookingFields.guestCount]?.trim();
  const serviceEnd = details[bookingFields.serviceEnd]?.trim();
  const serviceStart = details[bookingFields.serviceStart]?.trim();

  // 4. Ensure all required fields have been provided.
  if (
    !contactName ||
    !contactEmail ||
    !eventType ||
    !eventDate ||
    !eventLocation ||
    !guestCount ||
    !serviceStart
  ) {
    return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
  }

  // 5. Validate individual field values and formats.

  // Email must follow a basic email address format.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  // Event type must match a supported option.
  if (!Object.hasOwn(sheetEventTypeLabels, eventType)) {
    return NextResponse.json({ error: "Invalid event type." }, { status: 400 });
  }

  // Validate both the date format and calendar date.
  const parsedEventDate = new Date(`${eventDate}T00:00:00.000Z`);

  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(eventDate) ||
    Number.isNaN(parsedEventDate.getTime()) ||
    parsedEventDate.toISOString().slice(0, 10) !== eventDate
  ) {
    return NextResponse.json({ error: "Enter a valid event date." }, { status: 400 });
  }

  // Guest count must be a positive whole number.
  if (!/^[1-9]\d*$/.test(guestCount) || !Number.isSafeInteger(Number(guestCount))) {
    return NextResponse.json({ error: "Enter a valid guest count." }, { status: 400 });
  }

  // Service times must use the 24-hour HH:MM format.
  const isValidTime = (value: string) => /^([01]\d|2[0-3]):[0-5]\d$/.test(value);

  if (!isValidTime(serviceStart) || (serviceEnd && !isValidTime(serviceEnd))) {
    return NextResponse.json(
      { error: "Enter service times in 24-hour format (HH:MM)." },
      { status: 400 },
    );
  }

  try {
    // 6. Validate the spreadsheet URL used in the success dialog.
    const configuredSheetUrl = process.env.BOOKING_SHEET_URL?.trim();

    if (!configuredSheetUrl) {
      throw new Error("BOOKING_SHEET_URL is not configured.");
    }

    const sheetUrl = new URL(configuredSheetUrl);

    if (
      sheetUrl.protocol !== "https:" ||
      sheetUrl.hostname !== "docs.google.com" ||
      !sheetUrl.pathname.startsWith("/spreadsheets/d/")
    ) {
      throw new Error("BOOKING_SHEET_URL is invalid.");
    }

    // 7. Generate a server-side reference for the enquiry.
    const enquiryId = `ENQ-${randomBytes(6).toString("hex").toUpperCase()}`;

    // 8. Send the validated booking to the spreadsheet.
    // Optional fields default to empty cells.
    await sendBookingToSheetsWebhook({
      enquiryId,
      contactName,
      contactEmail,
      contactNumber: contactNumber || "",
      eventType: sheetEventTypeLabels[eventType as EventType],
      eventTypeOther: eventTypeOther || "",
      eventDate,
      eventLocation,
      guestCount,
      serviceStart,
      serviceEnd: serviceEnd || "",
    });

    // Only confirm success once the webhook confirms the row was saved.
    return NextResponse.json({
      success: true,
      enquiryId,
      sheetUrl: sheetUrl.toString(),
    });
  } catch (error) {
    console.error("Booking submission failed", {
      reason: error instanceof Error ? error.message : "unknown",
    });

    return NextResponse.json(
      {
        success: false,
        error: "Unable to save your enquiry. Please try again.",
      },
      { status: 502 },
    );
  }
}
