import { tv } from "tailwind-variants";

import { StepperItem } from "@/ui/form/StepperItem";

export interface StepperProps {
  steps: { label: string }[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  isStepDisabled?: (stepIndex: number) => boolean;
  className?: string;
}

const styles = tv({
  slots: {
    nav: "w-full",
    list: "flex w-full items-start justify-center gap-10 md:gap-0",
    item: "relative flex flex-none justify-center md:flex-1",
    connector:
      "absolute left-[calc(100%+0.625rem)] top-4 h-px w-5 bg-pb-blue/15 md:left-[calc(50%+2rem)] md:right-[calc(-50%+2rem)] md:top-6 md:w-auto",
    stepperItem: "relative z-10",
  },
});

export const Stepper = ({
  steps,
  currentStep,
  onStepClick,
  isStepDisabled,
  className,
}: StepperProps) => {
  const { nav, list, item, connector, stepperItem } = styles();

  return (
    <nav aria-label="Form progress" className={nav({ className })}>
      <ol className={list()}>
        {steps.map((step, index) => {
          const status =
            index < currentStep ? "complete" : index === currentStep ? "active" : "inactive";
          const isClickable = !!onStepClick;
          const isDisabled = isStepDisabled?.(index) ?? false;

          return (
            <li
              aria-current={index === currentStep ? "step" : undefined}
              className={item()}
              key={step.label}
            >
              {index < steps.length - 1 ? (
                <span aria-hidden="true" className={connector()} />
              ) : null}
              <StepperItem
                className={stepperItem()}
                label={step.label}
                onClick={isClickable ? () => onStepClick(index) : undefined}
                disabled={isDisabled}
                status={status}
                step={index + 1}
              />
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
