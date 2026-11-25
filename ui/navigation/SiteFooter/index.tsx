import { tv } from "tailwind-variants";

import { Divider } from "@/ui/layout/Divider";
import { FooterLogoTicker } from "@/ui/layout/FooterLogoTicker";
import { Text } from "@/ui/typography/Text";
import { CTAButton } from "../CTAButton";

const styles = tv({
  slots: {
    base: "flex flex-col text-white",
    top: "relative z-10 bg-pb-blue gap-10 lg:gap-20 py-10 px-left-right flex flex-col justify-between max-md:items-center",
    buttons: "flex flex-col gap-3 lg:flex-row lg:gap-10 w-full",
  },
});

export const SiteFooter = () => {
  const { base, top, buttons } = styles();

  return (
    <footer className={base()}>
      <Divider className="-mb-px bg-background" />
      <div className="relative">
        <div className={top()}>
          <div className={buttons()}>
            <CTAButton
              label="Booking demo"
              action="openBookingEnquiry"
              size="lg"
              variant="primary-inverse"
              className="w-full lg:flex-1"
            />
            <CTAButton
              label="Case study"
              href="https://test.com"
              size="lg"
              variant="secondary"
              className="w-full lg:flex-1 outline-white"
            />
          </div>
          <div className="flex justify-between items-center">
            <Text as="span" styleType="body-sm">
              &copy; {new Date().getFullYear()} Odd Ones Studio. All rights reserved.
            </Text>
          </div>
        </div>
        <FooterLogoTicker />
      </div>
    </footer>
  );
};
