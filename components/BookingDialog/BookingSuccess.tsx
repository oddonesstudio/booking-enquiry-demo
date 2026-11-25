import { Check, Copy } from "lucide-react";

import { Icon } from "@/ui/icons/Icon";
import { CTAButton } from "@/ui/navigation/CTAButton";
import { Button } from "@/ui/primitives/button";
import { Confetti } from "@/ui/primitives/confetti";
import { Separator } from "@/ui/primitives/separator";
import { Text } from "@/ui/typography/Text";

type BookingSuccessProps = {
  enquiryId: string;
  hasCopiedEnquiryId: boolean;
  onCopyEnquiryId: () => void;
  sheetUrl: string;
};

export const BookingSuccess = ({
  enquiryId,
  hasCopiedEnquiryId,
  onCopyEnquiryId,
  sheetUrl,
}: BookingSuccessProps) => (
  <div className="flex flex-col gap-4 items-center text-balance" role="status">
    <Confetti
      className="pointer-events-none absolute inset-0 z-10 h-full w-full"
      options={{
        particleCount: 100,
        spread: 70,
        origin: { x: 0.5, y: 0.55 },
      }}
    />
    <div className="flex flex-col gap-4 items-center">
      <Icon name="party" size={56} />
      <Text as="h2" styleType="heading-lg" className="text-center">
        Enquiry Submitted!
      </Text>
      <Text as="p" styleType="body-sm" className="text-center max-w-xl">
        Your enquiry has been added to a Google Sheet. Look for the identifier below in the{" "}
        <b>Enquiry ID</b> column.
      </Text>
    </div>
    <div className="bg-muted flex h-12 items-center rounded-full px-8 py-4">
      <Text as="span" styleType="label-md" className="max-md:hidden">
        Your enquiry id:
      </Text>
      <Separator orientation="vertical" className="max-md:hidden ml-3" />
      <Button
        aria-label={`Copy enquiry ID ${enquiryId}`}
        className="h-auto gap-2 px-0 text-pb-blue hover:bg-transparent"
        onClick={onCopyEnquiryId}
        title={hasCopiedEnquiryId ? "Copied" : "Copy enquiry ID"}
        type="button"
        variant="ghost"
      >
        <Text as="span" styleType="label-md">
          {enquiryId}
        </Text>
        {hasCopiedEnquiryId ? <Check size={16} /> : <Copy size={16} />}
      </Button>
      <span aria-live="polite" className="sr-only">
        {hasCopiedEnquiryId ? "Enquiry ID copied to clipboard." : ""}
      </span>
    </div>
    <CTAButton label="View in Google Sheets" href={sheetUrl} />
  </div>
);
