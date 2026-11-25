"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, LoaderCircle, RotateCcw, Send, X } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { bookingDialog } from "@/app/config/booking";
import { getBookingStepValidationErrors } from "@/lib/booking/validation";

import { FormFooter } from "@/ui/form/FormFooter";
import { FormHeader } from "@/ui/form/FormHeader";
import { OPEN_BOOKING_ENQUIRY_EVENT } from "@/ui/navigation/CTAButton";

import { Button } from "@/ui/primitives/button";

import {
  Dialog,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/ui/primitives/dialog";
import { BookingFormStep } from "./BookingFormStep";
import { BookingSuccess } from "./BookingSuccess";

const overlayVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const panelVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 24 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

type BookingSubmission = {
  success: true;
  enquiryId: string;
  sheetUrl: string;
};

export const BookingDialog = () => {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [furthestStep, setFurthestStep] = useState(0);
  const [submission, setSubmission] = useState<BookingSubmission | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const isSubmitted = submission !== null;
  const enquiryId = submission?.enquiryId;

  const [hasCopiedEnquiryId, setHasCopiedEnquiryId] = useState(false);
  const [values, setValues] = useState<Record<string, string>>(() => ({
    ...bookingDialog.initialValues,
  }));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const previousStepRef = useRef(currentStep);

  const steps = bookingDialog.steps;
  const isReviewStep = currentStep === steps.length - 1;
  const step = steps[currentStep];
  const eventTypeCards = steps.flatMap((bookingStep) => bookingStep.singleSelectCards ?? []);
  const selectedEventType = eventTypeCards.find((card) => card.name === values.eventType);

  useEffect(() => {
    const openBookingDialog = () => setOpen(true);

    window.addEventListener(OPEN_BOOKING_ENQUIRY_EVENT, openBookingDialog);

    return () => {
      window.removeEventListener(OPEN_BOOKING_ENQUIRY_EVENT, openBookingDialog);
    };
  }, []);

  useEffect(() => {
    if (!hasCopiedEnquiryId) return;

    const timeoutId = window.setTimeout(() => setHasCopiedEnquiryId(false), 2_500);

    return () => window.clearTimeout(timeoutId);
  }, [hasCopiedEnquiryId]);

  useLayoutEffect(() => {
    if (previousStepRef.current === currentStep) return;

    previousStepRef.current = currentStep;
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  const updateValue = (name: string, value: string) => {
    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
      ...(name === "eventType" && value !== "other" ? { eventTypeOther: "" } : {}),
    }));

    setErrors((currentErrors) => {
      const nextErrors = { ...currentErrors };
      delete nextErrors[name];

      if (name === "eventType" && value !== "other") {
        delete nextErrors.eventTypeOther;
      }

      return nextErrors;
    });
  };

  const closeDialog = () => {
    if (isSubmitting) return;

    setOpen(false);
    resetForm();
  };

  const validateCurrentStep = () => {
    const nextErrors = getBookingStepValidationErrors(step, values);

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return false;
    }

    return formRef.current?.reportValidity() ?? true;
  };

  const advanceToNextStep = () => {
    if (!validateCurrentStep()) return;

    setCurrentStep(currentStep + 1);
    setFurthestStep((stepIndex) => Math.max(stepIndex, currentStep + 1));
  };

  const goToStep = (stepIndex: number) => {
    if (isSubmitted || isSubmitting) return true;

    if (stepIndex <= furthestStep) {
      setCurrentStep(stepIndex);
      setErrors({});
      return;
    }

    if (stepIndex === currentStep + 1) {
      advanceToNextStep();
    }
  };

  const hasCurrentStepValidationError = () => {
    if (isReviewStep) return false;

    return Object.keys(getBookingStepValidationErrors(step, values)).length > 0;
  };

  const isStepDisabled = (stepIndex: number) => {
    if (isSubmitted || isSubmitting) return true;
    if (stepIndex <= currentStep) return false;
    if (hasCurrentStepValidationError()) return true;

    return stepIndex > Math.max(furthestStep, currentStep + 1);
  };

  const submitEnquiry = async () => {
    if (isSubmitting || isSubmitted) return;

    setIsSubmitting(true);
    setSubmissionError(null);
    setHasCopiedEnquiryId(false);

    try {
      // Submit the booking through the server-side integration.
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      // Handle unsuccessful submissions without losing form values.
      if (!response.ok || result?.success !== true) {
        throw new Error(
          typeof result?.error === "string"
            ? result.error
            : "Unable to submit your enquiry. Please try again.",
        );
      }

      // Ensure the response contains the required confirmation details.
      if (
        typeof result.enquiryId !== "string" ||
        !result.enquiryId ||
        typeof result.sheetUrl !== "string" ||
        !result.sheetUrl
      ) {
        throw new Error("Unable to confirm your submission.");
      }

      // Store the confirmed submission and display the success screen.
      setSubmission({
        success: true,
        enquiryId: result.enquiryId,
        sheetUrl: result.sheetUrl,
      });
    } catch (error) {
      setSubmissionError(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setValues({ ...bookingDialog.initialValues });
    setErrors({});
    setCurrentStep(0);
    setFurthestStep(0);
    setSubmission(null);
    setSubmissionError(null);
    setHasCopiedEnquiryId(false);
  };

  const copyEnquiryId = async () => {
    if (!enquiryId) return;

    try {
      await navigator.clipboard.writeText(enquiryId);
      setHasCopiedEnquiryId(true);
    } catch {
      setHasCopiedEnquiryId(false);
    }
  };

  const isPenultimateStep = currentStep === steps.length - 2;

  const primaryAction = !isSubmitted ? {
    disabled: isSubmitting || (!isReviewStep && hasCurrentStepValidationError()),
    label: isSubmitting
      ? "Submitting..."
      : isReviewStep
        ? "Submit"
        : isPenultimateStep
          ? "Review"
          : "Continue",
    iconRight: isSubmitting ? (
      <LoaderCircle className="animate-spin" />
    ) : isReviewStep ? (
      <Send />
    ) : (
      <ArrowRight />
    ),
    onClick: isReviewStep ? submitEnquiry : advanceToNextStep,
  } : undefined;

  const secondaryAction =
    !isSubmitted && currentStep > 0
      ? {
          disabled: isSubmitting,
          label: "Back",
          iconLeft: <ArrowLeft />,
          onClick: () => setCurrentStep(currentStep - 1),
        }
      : isSubmitted
        ? {
          label: "Start new enquiry",
          iconLeft: <RotateCcw />,
          onClick: resetForm,
        }
        : undefined;

  const stepperCurrentStep = isSubmitted ? steps.length : currentStep;

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => (nextOpen ? setOpen(true) : closeDialog())}>
      <AnimatePresence>
        {open ? (
          <DialogPortal forceMount>
            <DialogOverlay asChild forceMount>
              <motion.div
                animate="visible"
                className="fixed inset-0 z-40 bg-pb-blue/55 backdrop-blur-[6px]"
                exit="hidden"
                initial="hidden"
                transition={{ duration: 0.2, ease: "easeOut" }}
                variants={overlayVariants}
              />
            </DialogOverlay>
            <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6">
              <DialogPrimitive.Content asChild forceMount>
                <motion.div
                  animate="visible"
                  className="pointer-events-auto relative m-4 flex h-[calc(100%-32px)] w-full flex-col overflow-hidden rounded-xl bg-white text-pb-blue shadow-[0_24px_80px_rgba(0,33,71,0.22)] md:h-[80vh] md:max-w-272.5 md:rounded-3xl"
                  exit="hidden"
                  initial="hidden"
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  variants={panelVariants}
                >
                  <DialogHeader className="relative p-4 pt-14 md:p-10 [&_.dialog-close]:absolute [&_.dialog-close]:right-4 [&_.dialog-close]:top-4 md:[&_.dialog-close]:right-10 md:[&_.dialog-close]:top-10">
                    <FormHeader
                      label={bookingDialog.label}
                      title={bookingDialog.title}
                      steps={steps}
                      currentStep={stepperCurrentStep}
                      isStepDisabled={isStepDisabled}
                      onStepClick={goToStep}
                    />
                    <DialogTitle className="sr-only">{bookingDialog.title}</DialogTitle>
                    <DialogClose asChild>
                      <Button
                        aria-label="Close modal"
                        className="dialog-close"
                        disabled={isSubmitting}
                        size="icon-lg"
                        type="button"
                        variant="ghost"
                      >
                        <X className="size-8" />
                      </Button>
                    </DialogClose>
                  </DialogHeader>
                  <div
                    ref={scrollRef}
                    className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden p-8 pt-4"
                  >
                    {submission ? (
                      <BookingSuccess
                        enquiryId={submission.enquiryId}
                        hasCopiedEnquiryId={hasCopiedEnquiryId}
                        onCopyEnquiryId={copyEnquiryId}
                        sheetUrl={submission.sheetUrl}
                      />
                    ) : (
                      <BookingFormStep
                        errors={errors}
                        formRef={formRef}
                        isReviewStep={isReviewStep}
                        onValueChange={updateValue}
                        scrollRef={scrollRef}
                        selectedEventType={selectedEventType}
                        step={step}
                        steps={steps}
                        values={values}
                      />
                    )}
                  </div>
                  <DialogFooter className="shrink-0 border-t border-black/10 p-8 pt-4">
                    <div className="w-full space-y-4">
                      {submissionError && (
                        <p
                          role="alert"
                          className="rounded-md bg-destructive/10 p-3 text-sm text-destructive"
                        >
                          {submissionError}
                        </p>
                      )}

                      <FormFooter
                        primaryAction={primaryAction}
                        secondaryAction={secondaryAction}
                        className={isSubmitted ? "w-fit mx-auto" : ""}
                      />
                    </div>
                  </DialogFooter>
                </motion.div>
              </DialogPrimitive.Content>
            </div>
          </DialogPortal>
        ) : null}
      </AnimatePresence>
    </Dialog>
  );
};
