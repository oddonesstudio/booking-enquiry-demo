import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { CTAButton, OPEN_BOOKING_ENQUIRY_EVENT } from ".";

describe("CTAButton", () => {
  it("renders an internal Sanity CTA as a Next link", () => {
    render(<CTAButton label="View menu" href="/menu" />);

    expect(screen.getByRole("link", { name: "View menu" })).toHaveAttribute("href", "/menu");
  });

  it("renders a section CTA as an in-page anchor", () => {
    render(<CTAButton label="See offers" href="#offers" />);

    const link = screen.getByRole("link", { name: "See offers" });
    expect(link).toHaveAttribute("href", "#offers");
    expect(link).not.toHaveAttribute("target");
  });

  it("opens external CTAs safely in a new tab", () => {
    render(<CTAButton label="Visit partner" href="https://example.com" />);

    const link = screen.getByRole("link", { name: "Visit partner" });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("dispatches the booking event for modal CTAs", () => {
    const openModal = vi.fn();
    window.addEventListener(OPEN_BOOKING_ENQUIRY_EVENT, openModal);

    render(<CTAButton action="openBookingEnquiry" label="Start booking" />);
    screen.getByRole("button", { name: "Start booking" }).click();

    expect(openModal).toHaveBeenCalledOnce();
    window.removeEventListener(OPEN_BOOKING_ENQUIRY_EVENT, openModal);
  });
});
