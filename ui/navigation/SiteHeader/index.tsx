"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { tv } from "tailwind-variants";

import { Container } from "@/ui/layout/Container";

import { LogoTab } from "./LogoTab";

interface SiteHeaderProps {
  className?: string;
  siteTitle?: string;
}

const styles = tv({
  slots: {
    base: "fixed h-(--header-height) w-full z-20",
    container: "flex items-center justify-between h-full",
  },
});

export const SiteHeader = ({ className, siteTitle }: SiteHeaderProps) => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (previous === undefined) return;

    if (latest > previous && latest > 100) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const headerVariants = {
    visible: { y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    hidden: { y: "-100%", transition: { duration: 0.4, ease: "easeIn" } },
  } as const;

  const { base, container } = styles();

  return (
    <motion.header
      className={base({ className })}
      animate={hidden ? "hidden" : "visible"}
      variants={headerVariants}
    >
      <Container className={container()}>
        <LogoTab siteTitle={siteTitle} />
      </Container>
    </motion.header>
  );
};
