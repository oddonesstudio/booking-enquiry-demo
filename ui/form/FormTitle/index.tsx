import type { ReactNode } from "react";
import { tv } from "tailwind-variants";

import { Text } from "@/ui/typography/Text";

const styles = tv({
  slots: {
    base: "grid w-full grid-cols-[24px_1fr_24px] items-start gap-4 text-pb-blue md:flex md:items-start md:justify-between md:gap-8",
    titleBlock:
      "col-start-2 flex min-w-0 flex-col items-center justify-center gap-1 pt-4 text-balance uppercase md:items-start md:pt-0 md:text-left",
    label: "text-pb-blue/60",
    title: "wrap-break-word text-pb-blue",
    actionWrapper:
      "col-start-1 row-start-1 flex size-6 shrink-0 items-start justify-start md:order-0 md:size-auto md:justify-end",
    actionSpacer: "col-start-3 row-start-1 size-6 md:hidden",
  },
  variants: {
    hasAction: {
      true: {
        base: "items-start",
      },
      false: {
        base: "items-center",
      },
    },
  },
});

export interface FormTitleProps {
  label?: string;
  title: string;
  action?: ReactNode;
  className?: string;
}

export const FormTitle = ({ label, title, action, className }: FormTitleProps) => {
  const {
    base,
    titleBlock,
    label: labelSlot,
    title: titleSlot,
    actionWrapper,
    actionSpacer,
  } = styles({
    hasAction: !!action,
  });

  return (
    <div className={base({ className })}>
      <div className={titleBlock()}>
        {label ? (
          <Text as="p" className={labelSlot()} styleType="form-label">
            {label}
          </Text>
        ) : null}
        <Text as="h2" className={titleSlot()} styleType="heading-md">
          {title}
        </Text>
      </div>
      {action ? <div className={actionWrapper()}>{action}</div> : null}
      <span aria-hidden="true" className={actionSpacer()} />
    </div>
  );
};
