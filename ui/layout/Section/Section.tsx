import type { PropsWithChildren } from "react";
import { tv } from "tailwind-variants";
import { Container } from "../Container";

interface SectionProps extends PropsWithChildren {
  anchorId?: string;
  className?: string;
  header?: React.ReactNode;
}

const styles = tv({
  slots: {
    base: "w-full scroll-mt-(--header-height) py-top-bottom",
  },
});

export const Section = ({ anchorId, children, className, header }: SectionProps) => {
  const { base } = styles();
  return (
    <section id={anchorId} className={base({ className })}>
      <Container className="flex flex-col gap-10">
        {header}
        {children}
      </Container>
    </section>
  );
};
