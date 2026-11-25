"use client";

import Link from "next/link";
import { tv } from "tailwind-variants";

const styles = tv({
  slots: {
    base: "flex h-(--header-height) cursor-pointer bg-foreground items-center justify-center max-md:h-full aspect-6/7",
  },
});

interface LogoTabProps {
  className?: string;
  siteTitle?: string;
  onHover?: () => void;
}

export const LogoTab = ({ className, siteTitle, onHover }: LogoTabProps) => {
  const { base } = styles();

  const handleMouseEnter = () => {
    onHover?.();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Link href="/" className={base({ className })} onMouseEnter={handleMouseEnter}>
      <div className="inline-block bg-white p-1 pb-2">
        <svg
          width="53"
          height="45"
          viewBox="0 0 53 45"
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-auto"
          fill="currentColor"
          aria-label={siteTitle ?? "Odd Ones"}
          role="img"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.6875 44.5938C0.6875 44.8646 0.823264 45 1.0941 45L52.125 45C52.3958 45 52.5313 44.8646 52.5313 44.5938V0.53125C52.5313 0.302083 52.3958 0.166667 52.125 0.125H1.09375C0.864584 0.125 0.729167 0.260417 0.6875 0.53125V44.5938ZM8.59375 13.3125V9.65625H19.375V13.3125H23.0312V34.8438H19.375V38.3125H8.59375V34.8438H5.15625V13.3125H8.59375ZM34.0313 13.3125V9.65625H44.8125V13.3125H48.4688V34.8438H44.8125V38.3125H34.0313V34.8438H30.5938V13.3125H34.0313Z"
          />
          <path d="M44.8125 13.3125H34.0313V34.8438H44.8125V13.3125Z" />
          <path d="M19.375 13.3125H8.59375V34.8438H19.375V13.3125Z" />
        </svg>
      </div>
    </Link>
  );
};
