import Image from "next/image";
import { tv } from "tailwind-variants";

import FooterLogo from "@/ui/_assets/footer-logo.svg";

const styles = tv({
  slots: {
    viewport: "no-scrollbar sticky bottom-0 flex w-screen overflow-hidden bg-pb-blue",
    track:
      "flex w-max flex-none items-center will-change-transform motion-safe:animate-footer-logo-ticker",
    sequence: "flex flex-none items-center gap-6 pr-6 md:gap-20 md:pr-20",
    logo: "h-(--footer-logo-height) w-auto max-w-none flex-none",
  },
});

export const FooterLogoTicker = ({ className }: { className?: string }) => {
  const { viewport, track, sequence, logo } = styles();
  const logos = Array.from({ length: 4 }, (_, index) => index);

  return (
    <div className={viewport({ className })}>
      <div className={track()}>
        {[0, 1].map((sequenceIndex) => (
          <div
            key={sequenceIndex}
            aria-hidden={sequenceIndex === 1 || undefined}
            className={sequence()}
          >
            {logos.map((item) => (
              <Image
                key={item}
                src={FooterLogo}
                width={1654}
                height={211}
                alt={sequenceIndex === 0 && item === 0 ? "Footer Logo" : ""}
                aria-hidden={sequenceIndex === 0 && item === 0 ? undefined : true}
                className={logo()}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
