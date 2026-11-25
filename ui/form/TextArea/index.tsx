import { HomeIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";

import { Textarea } from "@/ui/primitives/textarea";

type TextAreaProps = ComponentProps<typeof Textarea> & {
  leadingIcon?: "address";
};

export const TextArea = ({ className, leadingIcon, ...textareaProps }: TextAreaProps) => {
  const hasLeadingIcon = leadingIcon === "address";

  return (
    <div className="relative w-full h-full">
      {hasLeadingIcon && (
        <div
          aria-hidden="true"
          className="text-muted-foreground pointer-events-none absolute top-2.5 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50"
        >
          <HomeIcon className="size-4" />
        </div>
      )}
      <Textarea {...textareaProps} className={cn(className, hasLeadingIcon && "peer pl-9")} />
    </div>
  );
};
