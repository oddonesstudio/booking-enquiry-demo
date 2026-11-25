import type { BookingStep } from "@/app/config/booking";

export type BookingValues = Record<string, string>;
export type BookingValidationErrors = Record<string, string>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const positiveIntegerPattern = /^[1-9]\d*$/;

export const getBookingStepValidationErrors = (
  step: BookingStep,
  values: BookingValues,
): BookingValidationErrors => {
  const errors: BookingValidationErrors = {};

  if (step.singleSelectCards?.length && !values.eventType) {
    errors.eventType = "Please choose an event type.";
  }

  if (values.eventType === "other" && !values.eventTypeOther?.trim()) {
    errors.eventTypeOther = "Please tell us about your event.";
  }

  step.fields?.forEach((field) => {
    const value = values[field.name]?.trim() ?? "";

    if (field.required && !value) {
      errors[field.name] = `${field.label} is required.`;
      return;
    }

    if (!value) return;

    if (field.type === "email" && !emailPattern.test(value)) {
      errors[field.name] = "Enter a valid email address.";
    }

    if (
      field.type === "number" &&
      (!positiveIntegerPattern.test(value) || !Number.isSafeInteger(Number(value)))
    ) {
      errors[field.name] = "Enter a whole number greater than zero.";
    }
  });

  return errors;
};
