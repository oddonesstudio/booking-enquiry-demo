import type { BookingField } from "@/app/config/booking";
import { DateTime } from "@/ui/form/DateTime";
import { FieldWrapper } from "@/ui/form/FieldWrapper";
import { Input } from "@/ui/primitives/input";

export const BookingInput = ({
  error,
  field,
  onChange,
  onBlur,
  value,
}: {
  error?: string;
  field: BookingField;
  onChange: (name: string, value: string) => void;
  onBlur?: () => void;
  value: string;
}) => {
  const className = "w-full rounded-md border px-3 py-2 text-sm h-12";
  const isTextarea = field.type === "textarea";
  const errorId = error ? `${field.name}-error` : undefined;

  const renderControl = () => {
    switch (field.type) {
      case "date":
        return (
          <DateTime
            date={value}
            dateLabel={field.label}
            dateDescribedBy={errorId}
            dateInvalid={Boolean(error)}
            dateName={field.name}
            id={field.name}
            mode="date"
            onBlur={onBlur}
            onDateChange={(nextValue) => onChange(field.name, nextValue)}
            required={field.required}
            showLabels={false}
            dateClassName="h-12 border-input"
            unavailableDates={field.unavailableDates}
          />
        );
      case "textarea":
        return (
          <textarea
            autoComplete={field.autoComplete}
            aria-describedby={errorId}
            aria-invalid={Boolean(error)}
            className={`${className} min-h-24 resize-y`}
            id={field.name}
            name={field.name}
            onBlur={onBlur}
            placeholder={field.placeholder}
            required={field.required}
            value={value}
            onChange={(event) => onChange(field.name, event.currentTarget.value)}
            maxLength={500}
          />
        );
      default:
        return (
          <Input
            autoComplete={field.autoComplete}
            aria-describedby={errorId}
            aria-invalid={Boolean(error)}
            className={className}
            id={field.name}
            min={field.type === "number" ? 1 : undefined}
            name={field.name}
            onBlur={onBlur}
            placeholder={field.placeholder}
            required={field.required}
            type={field.type}
            value={value}
            onChange={(event) => onChange(field.name, event.currentTarget.value)}
            maxLength={500}
          />
        );
    }
  };

  return (
    <FieldWrapper
      className={isTextarea ? "sm:col-span-2" : undefined}
      hints={error ? [{ children: error, id: errorId, tone: "error" }] : []}
      htmlFor={field.name}
      label={field.label}
      required={field.required}
    >
      {renderControl()}
    </FieldWrapper>
  );
};
