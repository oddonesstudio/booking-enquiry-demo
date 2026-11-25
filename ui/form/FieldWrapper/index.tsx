import type { ReactNode } from "react";
import { tv } from "tailwind-variants";

import { FieldHint, type FieldHintProps } from "@/ui/form/FieldHint";
import { Label } from "@/ui/primitives/label";

export interface FieldWrapperProps {
  children: ReactNode;
  className?: string;
  hints?: FieldHintProps[];
  htmlFor?: string;
  label?: string;
  labelClassName?: string;
  required?: boolean;
}

const styles = tv({
  slots: {
    base: "flex flex-col gap-3",
  },
});

const { base } = styles();

export const FieldWrapper = ({
  children,
  className,
  hints = [],
  htmlFor,
  label,
  required = false,
}: FieldWrapperProps) => (
  <div className={base({ className })} id={htmlFor}>
    {label ? (
      <Label className="text-form-label! text-pb-blue" htmlFor={htmlFor}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </Label>
    ) : null}
    {children}
    {hints.length > 0 ? (
      <div className="flex flex-col gap-1">
        {hints.map((hint, index) => (
          <FieldHint key={hint.id ?? index} {...hint} />
        ))}
      </div>
    ) : null}
  </div>
);
