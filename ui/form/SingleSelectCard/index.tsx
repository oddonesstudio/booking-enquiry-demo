"use client";

import { type ComponentProps, useId } from "react";
import { tv } from "tailwind-variants";

import { Icon } from "@/ui/icons/Icon";
import { Label } from "@/ui/primitives/label";
import { RadioGroupItem } from "@/ui/primitives/radio-group";
import { Text } from "@/ui/typography/Text";

type SingleSelectCardBaseProps = {
  name: string;
  label: string;
  description: string;
  iconName: "corporate" | "other" | "party" | "popup" | "wedding";
  className?: string;
};

export type SingleSelectCardProps = SingleSelectCardBaseProps &
  Omit<ComponentProps<typeof RadioGroupItem>, "value">;

export const styles = tv({
  slots: {
    base: "border-input has-data-[state=checked]:border-primary/50 relative flex w-full flex-col items-center gap-3 rounded-md border p-10 shadow-xs outline-none",
    description: "max-w-45 text-pb-blue/75 text-center",
  },
});

export const SingleSelectCard = ({
  name,
  label,
  description,
  iconName,
  className,
  ...radioProps
}: SingleSelectCardProps) => {
  const { base, description: descriptionSlot } = styles();
  const id = useId();

  return (
    <div className={base()}>
      <RadioGroupItem
        {...radioProps}
        value={name}
        id={id}
        className="absolute right-4 top-4 z-10 size-5"
        aria-label={`${label}. ${description}`}
        aria-describedby={`${id}-description`}
      />
      <div className="grid grow justify-items-center gap-4">
        <Icon name={iconName} size={48} />
        <div className="flex flex-col gap-2 text-balance">
          <Label
            htmlFor={id}
            className="justify-center after:absolute after:inset-0 cursor-pointer"
          >
            <Text styleType="form-label" className="capitalize">
              {label}
            </Text>
          </Label>
          <Text id={`${id}-description`} className={descriptionSlot()} styleType="body-sm">
            {description}
          </Text>
        </div>
      </div>
    </div>
  );
};
