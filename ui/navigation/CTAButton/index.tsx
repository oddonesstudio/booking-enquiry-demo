"use client";

import { ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn, tv } from "tailwind-variants";

import { Button } from "@/ui/primitives/button";
import { Text } from "@/ui/typography/Text";

export const OPEN_BOOKING_ENQUIRY_EVENT = "open-booking-enquiry";

export type ButtonBaseProps = {
  className?: string;
  variant?: "primary" | "primary-inverse" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  label?: string | null;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  iconOnly?: ReactNode;
  counter?: number;
  action?: "link" | "openBookingEnquiry";
};

export type CTAButtonProps = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: string | null;
  };

const styles = tv({
  slots: {
    base: "group enabled:cursor-pointer inline-flex items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 gap-2.5 whitespace-nowrap not-disabled:hover:scale-[1.02] transition-transform",
    text: "line-clamp-1",
  },
  variants: {
    variant: {
      primary: "bg-foreground text-background",
      "primary-inverse": "bg-background text-foreground",
      secondary: "text-inherit outline-inherit outline-solid outline-2",
      ghost: "bg-transparent p-0!",
    },
    size: {
      lg: "px-10 py-4",
      md: "h-12 px-8",
      sm: "px-6 py-3",
    },
    iconOnly: {
      true: "p-2 size-8 md:size-12 rounded-full",
      false: {},
    },
    counter: {
      true: "p-0 size-8 md:size-12 rounded-full",
      false: {},
    },
  },
});

export const CTAButton = (props: CTAButtonProps) => {
  const {
    label,
    iconLeft,
    iconRight,
    iconOnly,
    counter,
    variant,
    size,
    className,
    action = "link",
    href,
    ...rest
  } = props;
  const resolvedVariant = variant ?? "primary";
  const resolvedSize = size ?? "md";

  const { base, text } = styles({
    variant: resolvedVariant,
    size: resolvedSize,
    iconOnly: !!iconOnly,
    counter: !!counter,
  });

  const content = (
    <>
      {iconOnly}
      {counter && !iconOnly && <span>{counter}</span>}
      {iconLeft}
      {label && !iconOnly && !counter ? (
        <Text
          as="span"
          styleType={resolvedSize === "lg" ? "button-lg" : "button-md"}
          className={text()}
        >
          {label}
        </Text>
      ) : null}
      {iconRight}
    </>
  );

  const buttonClassName = base({ className });

  if (action === "openBookingEnquiry") {
    const { onClick, type, ...buttonProps } = rest;

    return (
      <Button
        type={type ?? "button"}
        variant={null}
        size={null}
        className={buttonClassName}
        aria-haspopup="dialog"
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) {
            window.dispatchEvent(new Event(OPEN_BOOKING_ENQUIRY_EVENT));
          }
        }}
        {...buttonProps}
      >
        {content}
        {!iconRight && (
          <ArrowUpRight className={cn(size === "lg" ? "size-10" : "size-6", "text-inherit")} />
        )}
      </Button>
    );
  }

  if (typeof href === "string") {
    const linkProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    const isExternal = /^(?:https?:)?\/\//i.test(href);
    const isHashLink = href.startsWith("#");
    const isProtocolLink = /^[a-z][a-z\d+.-]*:/i.test(href);

    if (isExternal) {
      return (
        <Button asChild variant={null} size={null} className={buttonClassName}>
          <a
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            {...linkProps}
          >
            {content}
            {!iconRight && (
              <ExternalLink
                className={cn(size === "lg" ? "size-10 px-1" : "size-5", "text-inherit")}
              />
            )}
          </a>
        </Button>
      );
    }

    if (isHashLink || isProtocolLink) {
      return (
        <Button asChild variant={null} size={null} className={buttonClassName}>
          <a
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            {...linkProps}
          >
            {content}
          </a>
        </Button>
      );
    }

    return (
      <Button asChild variant={null} size={null} className={buttonClassName}>
        <Link href={href} {...linkProps}>
          {content}
          {!iconRight && size !== "lg" && <ArrowRight className="size-6" />}
        </Link>
      </Button>
    );
  }

  const { type, ...buttonProps } = rest;

  return (
    <Button
      type={type ?? "button"}
      variant={null}
      size={null}
      className={buttonClassName}
      {...buttonProps}
    >
      {content}
    </Button>
  );
};
