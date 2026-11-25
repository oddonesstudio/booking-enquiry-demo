import type { JSX } from "react";
import { tv } from "tailwind-variants";

const styles = tv({
  slots: {
    base: "",
  },
  variants: {
    type: {
      "heading-xl": "text-heading-xl",
      "heading-lg": "text-heading-lg",
      "heading-md": "text-heading-md",
      "heading-sm": "text-heading-sm",
      "body-lg": "text-body-lg",
      "body-md": "text-body-md",
      "body-sm": "text-body-sm",
      "label-md": "text-label-md",
      "label-lg": "text-label-lg",
      "footer-nav": "text-footer-nav",
      "header-nav": "text-header-nav",
      "menu-heading": "text-menu-heading",
      "menu-description": "text-menu-description",
      "menu-comment": "text-menu-comment",
      "button-lg": "text-button-lg",
      "button-md": "text-button-md",
      "form-label": "text-form-label",
      "form-control": "text-form-control",
      "form-title": "text-form-title",
      "form-indicator": "text-form-indicator",
      "form-step-count": "text-form-step-count",
      "form-step-label": "text-form-step-label",
    },
  },
});

interface TextProps {
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  className?: string;
  id?: string;
  styleType: (typeof styleTypes)[number];
}

export const Text = (props: TextProps) => {
  const { as: Component = "div", children, id, styleType, className } = props;
  const { base } = styles({ type: styleType });

  return (
    <Component className={[base(), className].filter(Boolean).join(" ")} id={id}>
      {children}
    </Component>
  );
};

const styleTypes = [
  "heading-xl",
  "heading-lg",
  "heading-md",
  "heading-sm",
  "body-lg",
  "body-md",
  "body-sm",
  "label-md",
  "label-lg",
  "footer-nav",
  "header-nav",
  "menu-heading",
  "menu-description",
  "menu-comment",
  "button-lg",
  "button-md",
  "form-label",
  "form-control",
  "form-title",
  "form-indicator",
  "form-step-count",
  "form-step-label",
] as const;
