import { tv } from "tailwind-variants";

const styles = tv({
  slots: {
    base: "w-full bg-size-[calc(var(--s)*2)_calc(var(--s)*2)]",
  },

  variants: {
    size: {
      lg: "[--s:var(--divider-size)] h-[calc(var(--s)*3)]",
      md: "[--s:24px] h-[calc(var(--s)*3)]",
    },
    color: {
      blue: "bg-[conic-gradient(at_50%_50%,var(--foreground)_25%,transparent_0_50%,var(--foreground)_0_75%,transparent_0)]",
      cream:
        "bg-[conic-gradient(at_50%_50%,white_25%,transparent_0_50%,white_0_75%,transparent_0)]",
    },
  },
});

interface DividerProps {
  className?: string;
  size?: "lg" | "md";
  color?: "blue" | "cream";
}

export const Divider = ({ className, size = "lg", color = "blue" }: DividerProps) => {
  const { base } = styles({ size, color });
  return <div className={base({ className })} />;
};
