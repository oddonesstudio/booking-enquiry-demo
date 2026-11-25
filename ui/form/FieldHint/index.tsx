import { tv } from "tailwind-variants";
import { Text } from "@/ui/typography/Text";

export interface FieldHintProps {
  children: React.ReactNode;
  id?: string;
  tone?: "info" | "error";
  className?: string;
}

const styles = tv({
  slots: {
    base: "",
  },
  variants: {
    tone: {
      info: "text-muted-foreground",
      error: "text-destructive",
    },
  },
  defaultVariants: {
    tone: "info",
  },
});

export const FieldHint = ({ children, id, tone = "info", className }: FieldHintProps) => {
  const { base } = styles({ tone });

  return (
    <Text as="p" id={id} styleType="body-sm" className={base({ className })}>
      {children}
    </Text>
  );
};
