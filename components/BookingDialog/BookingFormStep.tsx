import type { RefObject } from "react";

import type { BookingSingleSelectCard, BookingStep } from "@/app/config/booking";
import { FieldWrapper } from "@/ui/form/FieldWrapper";
import { SingleSelectCard } from "@/ui/form/SingleSelectCard";
import { StepInfo } from "@/ui/form/StepInfo";
import { RadioGroup } from "@/ui/primitives/radio-group";

import { BookingInput } from "./BookingInput";

type BookingFormStepProps = {
  errors: Record<string, string>;
  formRef: RefObject<HTMLFormElement | null>;
  isReviewStep: boolean;
  onValueChange: (name: string, value: string) => void;
  scrollRef: RefObject<HTMLDivElement | null>;
  selectedEventType?: BookingSingleSelectCard;
  step: BookingStep;
  steps: BookingStep[];
  values: Record<string, string>;
};

export const BookingFormStep = ({
  errors,
  formRef,
  isReviewStep,
  onValueChange,
  scrollRef,
  selectedEventType,
  step,
  steps,
  values,
}: BookingFormStepProps) => {
  if (isReviewStep) {
    const eventTypeCards = steps.flatMap((bookingStep) => bookingStep.singleSelectCards ?? []);

    return (
      <div className="space-y-6">
        <StepInfo title={step.heading} description={step.description} />
        <dl className="grid gap-4 rounded-md bg-muted p-6 text-sm sm:grid-cols-2">
          {eventTypeCards.length > 0 && (
            <div>
              <dt className="font-bold uppercase">Event type</dt>
              <dd className="text-muted-foreground">
                {selectedEventType?.label || "Not provided"}
              </dd>
            </div>
          )}
          {values.eventTypeOther && (
            <div>
              <dt className="font-bold uppercase">Event type notes</dt>
              <dd className="text-muted-foreground">{values.eventTypeOther}</dd>
            </div>
          )}
          {steps
            .flatMap((bookingStep) => bookingStep.fields ?? [])
            .map((field) => (
              <div key={field.name}>
                <dt className="font-bold uppercase">{field.label}</dt>
                <dd className="text-muted-foreground">{values[field.name] || "Not provided"}</dd>
              </div>
            ))}
        </dl>
      </div>
    );
  }

  return (
    <form ref={formRef} className="space-y-5" onSubmit={(event) => event.preventDefault()}>
      <StepInfo description={step.description} title={step.heading} />

      {step.singleSelectCards?.length ? (
        <div>
          <FieldWrapper
            hints={
              errors.eventType
                ? [{ children: errors.eventType, id: "event-type-error", tone: "error" }]
                : []
            }
          >
            <RadioGroup
              aria-describedby={errors.eventType ? "event-type-error" : undefined}
              aria-invalid={Boolean(errors.eventType)}
              aria-label="Event type"
              className="grid gap-4 md:grid-cols-3"
              onValueChange={(value) => {
                onValueChange("eventType", value);

                if (value === "other") {
                  requestAnimationFrame(() => {
                    scrollRef.current?.scrollTo({
                      top: scrollRef.current.scrollHeight,
                      behavior: "smooth",
                    });
                  });
                }
              }}
              value={values.eventType ?? ""}
            >
              {step.singleSelectCards.map((card) => (
                <SingleSelectCard key={card.name} {...card} />
              ))}
            </RadioGroup>
          </FieldWrapper>
          {values.eventType === "other" && (
            <FieldWrapper
              className="mt-10"
              htmlFor="eventTypeOther"
              label="Tell us more"
              required
              hints={
                errors.eventTypeOther
                  ? [
                      {
                        children: errors.eventTypeOther,
                        id: "event-type-notes-error",
                        tone: "error",
                      },
                    ]
                  : []
              }
            >
              <textarea
                aria-describedby={errors.eventTypeOther ? "event-type-notes-error" : undefined}
                aria-invalid={Boolean(errors.eventTypeOther)}
                className="min-h-28 w-full resize-y rounded-md border px-3 py-2 font-light"
                id="eventTypeOther"
                maxLength={500}
                name="eventTypeOther"
                onChange={(event) => onValueChange("eventTypeOther", event.currentTarget.value)}
                placeholder="What kind of event are you planning?"
                required
                value={values.eventTypeOther ?? ""}
              />
            </FieldWrapper>
          )}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {step.fields?.map((field) => (
            <BookingInput
              key={field.name}
              field={field}
              onChange={onValueChange}
              value={values[field.name] ?? ""}
            />
          ))}
        </div>
      )}
    </form>
  );
};
