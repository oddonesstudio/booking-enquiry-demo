import { Send } from "lucide-react";
import type { ReactNode } from "react";
import { tv } from "tailwind-variants";

import { CTAButton, type CTAButtonProps } from "@/ui/navigation/CTAButton";
import { Text } from "@/ui/typography/Text";

export interface StepInfoProps {
  title: string;
  description: string;
  action?: CTAButtonProps;
  className?: string;
  children?: ReactNode;
}

const styles = tv({
  slots: {
    base: "flex w-full flex-col gap-5 text-pb-blue md:flex-row md:items-end md:justify-between",
    copy: "flex max-w-3xl flex-col gap-1",
    title: "text-[2rem] leading-none md:text-[2.5rem]",
    description: "text-[1rem] font-normal leading-[1.4] tracking-normal text-pb-blue/75",
    actionWrapper: "shrink-0",
  },
});

export const StepInfo = ({ title, description, action, className, children }: StepInfoProps) => {
  const { base, copy, title: titleSlot, description: descriptionSlot, actionWrapper } = styles();

  return (
    <div className={base({ className })}>
      <div className={copy()}>
        <Text as="h2" className={titleSlot()} styleType="heading-sm">
          {title}
        </Text>
        <p className={descriptionSlot()}>{description}</p>
        {children}
      </div>
      {action ? (
        <div className={actionWrapper()}>
          <CTAButton
            {...action}
            iconLeft={action.iconLeft ?? <Send />}
            size={action.size ?? "md"}
            variant={action.variant ?? "secondary"}
          />
        </div>
      ) : null}
    </div>
  );
};
