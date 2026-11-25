import { tv } from "tailwind-variants";

import { StepIndicator, type StepIndicatorStatus } from "@/ui/form/StepIndicator";

export interface StepperItemProps {
  step: number;
  label: string;
  status: StepIndicatorStatus;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const styles = tv({
  slots: {
    base: "flex flex-col items-center gap-4 text-center",
    label: "hidden md:block text-form-step-label",
  },
  variants: {
    status: {
      active: {
        label: "text-pb-blue",
      },
      inactive: {
        label: "text-pb-blue/50",
      },
      complete: {
        label: "text-pb-blue/50",
      },
    },
  },
});

export const StepperItem = ({
  step,
  label,
  status,
  onClick,
  disabled,
  className,
}: StepperItemProps) => {
  const { base, label: labelSlot } = styles({ status });

  return (
    <div className={base({ className })}>
      <StepIndicator
        ariaLabel={onClick ? `Go to ${label}` : `${label}, step ${step}`}
        disabled={disabled}
        onClick={onClick}
        status={status}
        step={step}
      />
      <span className={labelSlot()}>{label}</span>
    </div>
  );
};
