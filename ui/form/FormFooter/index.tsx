import { cn, tv } from "tailwind-variants";

import { CTAButton, type CTAButtonProps } from "@/ui/navigation/CTAButton";
import { Text } from "@/ui/typography/Text";

export interface FormFooterProps {
  primaryAction?: CTAButtonProps;
  secondaryAction?: CTAButtonProps;
  className?: string;
  status?: string;
}

const styles = tv({
  slots: {
    base: "flex flex-col gap-4 bg-inherit w-full",
    actions: "flex w-full gap-3",
    actionWrapper: "flex flex-col gap-1 max-md:w-full",
  },
});

export const FormFooter = ({
  primaryAction,
  secondaryAction,
  className,
  status,
}: FormFooterProps) => {
  const { base, actions, actionWrapper } = styles();

  return (
    <footer className={base({ className })}>
      <div className={cn(actions(), secondaryAction ? "justify-between" : "justify-end")}>
        {secondaryAction ? (
          <div className={actionWrapper()}>
            <CTAButton
              size="md"
              variant="secondary"
              {...secondaryAction}
              type={secondaryAction.type ?? "button"}
            />
          </div>
        ) : null}
        {primaryAction ? (
          <div className={actionWrapper()}>
            <CTAButton
              size="md"
              variant="primary"
              {...primaryAction}
              type={primaryAction.type ?? "button"}
              className="text-white"
            />
          </div>
        ) : null}
      </div>
      {status && (
        <Text
          as="p"
          styleType="body-sm"
          aria-live="polite"
          className="text-sm text-pb-blue/75 text-right"
        >
          {status}
        </Text>
      )}
    </footer>
  );
};
