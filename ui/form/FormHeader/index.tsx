import type { ReactNode } from "react";
import { tv } from "tailwind-variants";

import { FormTitle } from "@/ui/form/FormTitle";
import { Stepper } from "@/ui/form/Stepper";
import { Text } from "@/ui/typography/Text";

export interface FormHeaderProps {
  label?: string;
  title?: string;
  steps?: { label: string }[];
  currentStep?: number;
  onStepClick?: (stepIndex: number) => void;
  isStepDisabled?: (stepIndex: number) => boolean;
  onClose?: () => void;
  closeLabel?: string;
  className?: string;
  children?: ReactNode;
}

const styles = tv({
  slots: {
    base: "flex w-full flex-col items-center gap-5 text-pb-blue md:gap-8",
    stepper: "w-full",
    mobileCloseButton:
      "inline-flex size-6 shrink-0 items-center justify-center text-pb-blue transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pb-blue focus-visible:ring-offset-2 md:hidden",
    closeIcon: "size-6",
    desktopCloseButton: "hidden md:inline-flex",
    currentStep: "flex flex-col items-center justify-center gap-2 text-center md:hidden",
    currentStepCount: "text-pb-blue/40",
    currentStepLabel: "text-pb-blue/90",
  },
});

export const FormHeader = ({
  label = "Form Label",
  title = "Form Title",
  steps,
  currentStep,
  onStepClick,
  isStepDisabled,
  className,
  children,
}: FormHeaderProps) => {
  const {
    base,
    stepper,
    currentStep: currentStepSlot,
    currentStepCount,
    currentStepLabel,
  } = styles();
  const stepperProps =
    steps?.length && currentStep !== undefined ? { steps, currentStep } : undefined;
  const currentStepDetails = stepperProps?.steps[stepperProps.currentStep];

  return (
    <div className={base({ className })}>
      <FormTitle label={label} title={title} />
      {children ??
        (stepperProps ? (
          <Stepper
            className={stepper()}
            currentStep={stepperProps.currentStep}
            onStepClick={onStepClick}
            isStepDisabled={isStepDisabled}
            steps={stepperProps.steps}
          />
        ) : null)}
      {currentStepDetails ? (
        <div className={currentStepSlot()}>
          <Text as="p" className={currentStepCount()} styleType="form-step-count">
            Step {stepperProps.currentStep + 1} of {stepperProps.steps.length}
          </Text>
          <Text as="p" className={currentStepLabel()} styleType="form-step-label">
            {currentStepDetails.label}
          </Text>
        </div>
      ) : null}
    </div>
  );
};
