import { tv } from "tailwind-variants";

import { CTAButton } from "@/ui/navigation/CTAButton";
import { Text } from "@/ui/typography/Text";

const styles = tv({
  slots: {
    base: "flex flex-col items-center gap-10",
    ctas: "flex max-lg:flex-col gap-4",
    text: "flex flex-col gap-4 items-center md:text-balance",
  },
});

export interface SectionHeaderProps {
  label?: string;
  title: string;
  summaryText?: string;
}

export const SectionHeader = ({ label, title, summaryText }: SectionHeaderProps) => {
  if (!title) return;

  const { base, ctas, text } = styles();

  return (
    <div className={base()}>
      <div className={text()}>
        {label && (
          <Text as="span" styleType="label-md" className="text-foreground/70">
            {label}
          </Text>
        )}
        <Text as="h2" styleType="heading-xl" className="text-center">
          {title}
        </Text>
        {summaryText && (
          <Text as="p" styleType="body-md" className="max-md:max-w-xs max-w-xl text-center">
            {summaryText}
          </Text>
        )}
      </div>
      <div className={ctas()}>
        <CTAButton label="Booking demo" action="openBookingEnquiry" />
        <CTAButton label="Case study" href="https://test.com" variant="secondary" />
      </div>
    </div>
  );
};
