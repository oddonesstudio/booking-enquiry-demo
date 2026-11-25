export type BookingField = {
  autoComplete?: string;
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  type: "date" | "email" | "number" | "tel" | "text" | "textarea" | "time";
  unavailableDates?: string[];
};

export type BookingSingleSelectCard = {
  description: string;
  label: string;
  name: string;
  iconName: "corporate" | "other" | "party" | "popup" | "wedding";
};

export type BookingStep = {
  description: string;
  fields?: BookingField[];
  heading: string;
  label: string;
  singleSelectCards?: BookingSingleSelectCard[];
};

type BookingDialogConfig = {
  description: string;
  initialValues: Record<string, string>;
  label: string;
  steps: BookingStep[];
  title: string;
};

export const bookingDialog: BookingDialogConfig = {
  description:
    "This form is prefilled with test data so you can try the integration straight away. Feel free to experiment with your own fictional details. All submissions are publicly visible in a Google Sheet, so please don't enter any real personal information.",
  initialValues: {
    contactEmail: "janedough@example.com",
    contactName: "Jane Dough",
    contactNumber: "07123 456789",
    eventDate: "2027-06-12",
    eventLocation: "Shoreditch Town Hall, 380 Old Street, London EC1V 9LT",
    eventType: "wedding",
    guestCount: "50",
    serviceEnd: "20:00",
    serviceStart: "17:00",
  },
  label: "The Pizza Blues",
  steps: [
    {
      label: "Event type",
      heading: "What are you planning?",
      description: "This helps us understand your event and give you the best experience.",
      singleSelectCards: [
        {
          iconName: "wedding",
          name: "wedding",
          label: "Wedding",
          description: "A relaxed, memorable feast for your big day.",
        },
        {
          iconName: "party",
          name: "party",
          label: "Party",
          description: "Birthdays, celebrations, and get-togethers.",
        },
        {
          iconName: "popup",
          name: "popup",
          label: "Pop up",
          description: "Markets, festivals, and public events.",
        },
        {
          iconName: "corporate",
          name: "corporate",
          label: "Corporate",
          description: "Team lunches, launches, and office celebrations.",
        },
        {
          iconName: "other",
          name: "other",
          label: "Other",
          description: "Something else? Tell us more...",
        },
      ],
    },
    {
      label: "Event details",
      heading: "About your event",
      description: "Help us plan the perfect pizza experience for you.",
      fields: [
        { name: "eventDate", label: "Event date", type: "date", required: true },
        { name: "serviceStart", label: "Service start", type: "time", required: true },
        { name: "serviceEnd", label: "Service end", type: "time" },
        {
          name: "guestCount",
          label: "Number of guests",
          type: "number",
          placeholder: "e.g. 50",
          required: true,
        },
        {
          name: "eventLocation",
          label: "Event Location",
          type: "textarea",
          placeholder: "Town, venue, or postcode",
          required: true,
        },
      ],
    },
    {
      label: "Your details",
      heading: "Your Details",
      description: "Let us know how to reach you with a quote.",
      fields: [
        {
          name: "contactName",
          label: "Your name",
          type: "text",
          autoComplete: "name",
          required: true,
        },
        {
          name: "contactEmail",
          label: "Email address",
          type: "email",
          required: true,
        },
        {
          name: "contactNumber",
          label: "Phone number",
          type: "tel",
          required: true,
        },
      ],
    },
    {
      label: "Review",
      heading: "Review your enquiry",
      description: "Check your details before submitting.",
    },
  ],
  title: "Booking Enquiry Demo",
};
