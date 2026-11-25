import { Check } from "lucide-react";
import { tv } from "tailwind-variants";
import { CTAButton } from "@/ui/navigation/CTAButton";

export type StepIndicatorStatus = "inactive" | "active" | "complete";

export interface StepIndicatorProps {
  step: number;
  status: StepIndicatorStatus;
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
}

const styles = tv({
  slots: {
    base: "text-form-indicator flex size-8 shrink-0 items-center justify-center rounded-full md:size-12",
  },
  variants: {
    status: {
      active: {
        base: "bg-pb-blue text-white",
      },
      inactive: {
        base: "border border-pb-blue/50 bg-transparent text-pb-blue/50",
      },
      complete: {
        base: "bg-pb-blue text-white",
      },
    },
    clickable: {
      true: {
        base: "cursor-pointer transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pb-blue focus-visible:ring-offset-2",
      },
      false: {},
    },
  },
});

export const StepIndicator = ({
  step,
  status,
  onClick,
  disabled = false,
  ariaLabel,
  className,
}: StepIndicatorProps) => {
  const { base } = styles({ status, clickable: !!onClick && !disabled });
  const label = ariaLabel ?? `Step ${step}${status === "complete" ? " complete" : ""}`;
  const staticAccessibilityProps =
    ariaLabel || status === "complete" ? ({ "aria-label": label, role: "img" } as const) : {};
  const content = status === "complete" ? <Check /> : step;

  if (onClick) {
    return (
      <CTAButton
        aria-label={label}
        className={base({ className })}
        disabled={disabled}
        onClick={onClick}
        type="button"
        counter={step}
        iconOnly={status === "complete" && <Check />}
      />
    );
  }

  return (
    <span className={base({ className })} {...staticAccessibilityProps}>
      {content}
    </span>
  );
};
