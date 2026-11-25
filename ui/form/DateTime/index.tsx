"use client";

import { ChevronDownIcon } from "lucide-react";
import { type ChangeEvent, useId, useState } from "react";
import { cn } from "tailwind-variants";

import { Button } from "@/ui/primitives/button";
import { Calendar } from "@/ui/primitives/calendar";
import { Input } from "@/ui/primitives/input";
import { Label } from "@/ui/primitives/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/primitives/popover";

type DateTimeMode = "date" | "time" | "datetime";

export interface DateTimeProps {
  mode?: DateTimeMode;
  date?: string;
  onDateChange?: (value: string) => void;
  time?: string;
  onTimeChange?: (value: string) => void;
  timeFrom?: string;
  onTimeFromChange?: (value: string) => void;
  timeTo?: string;
  onTimeToChange?: (value: string) => void;
  dateName?: string;
  timeFromName?: string;
  timeToName?: string;
  showTimeTo?: boolean;
  defaultTime?: string;
  defaultTimeFrom?: string;
  defaultTimeTo?: string;
  dateLabel?: string;
  timeLabel?: string;
  fromLabel?: string;
  toLabel?: string;
  id?: string;
  dateId?: string;
  timeId?: string;
  fromId?: string;
  toId?: string;
  name?: string;
  showLabels?: boolean;
  required?: boolean;
  dateRequired?: boolean;
  timeRequired?: boolean;
  timeFromRequired?: boolean;
  timeToRequired?: boolean;
  invalid?: boolean;
  dateInvalid?: boolean;
  timeFromInvalid?: boolean;
  timeToInvalid?: boolean;
  describedBy?: string;
  dateDescribedBy?: string;
  timeFromDescribedBy?: string;
  timeToDescribedBy?: string;
  labelClassName?: string;
  step?: string;
  className?: string;
  dateClassName?: string;
  timeClassName?: string;
  onBlur?: () => void;
  onDateBlur?: () => void;
  onTimeFromBlur?: () => void;
  onTimeToBlur?: () => void;
  unavailableDates?: string[];
}

const parseDate = (value?: string) => {
  if (!value) return undefined;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return undefined;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return date.getFullYear() === Number(match[1]) &&
    date.getMonth() === Number(match[2]) - 1 &&
    date.getDate() === Number(match[3])
    ? date
    : undefined;
};

const formatDate = (date?: Date) => {
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const DateTime = ({
  mode = "datetime",
  date,
  onDateChange,
  time,
  onTimeChange,
  timeFrom,
  onTimeFromChange,
  timeTo,
  onTimeToChange,
  dateName,
  timeFromName = "time-from",
  timeToName = "time-to",
  showTimeTo = true,
  defaultTime = "01:30:00",
  defaultTimeFrom = "01:30:00",
  defaultTimeTo = "02:30:00",
  dateLabel = "Date",
  timeLabel = "Time",
  fromLabel = "From",
  toLabel = "To",
  id,
  dateId,
  timeId,
  fromId,
  toId,
  name,
  showLabels = true,
  required = false,
  dateRequired = required,
  timeRequired = required,
  timeFromRequired = timeRequired,
  timeToRequired = timeRequired,
  invalid = false,
  dateInvalid = invalid,
  timeFromInvalid = invalid,
  timeToInvalid = invalid,
  describedBy,
  dateDescribedBy = describedBy,
  timeFromDescribedBy = describedBy,
  timeToDescribedBy = describedBy,
  labelClassName,
  step = "1",
  className,
  dateClassName,
  timeClassName,
  onBlur,
  onDateBlur,
  onTimeFromBlur,
  onTimeToBlur,
  unavailableDates,
}: DateTimeProps) => {
  const generatedId = useId();
  const [open, setOpen] = useState(false);
  const [localDate, setLocalDate] = useState<Date>();
  const selectedDate = date === undefined ? localDate : parseDate(date);
  const dateControlId = dateId ?? id ?? `${generatedId}-date`;
  const timeControlId = timeId ?? id ?? `${generatedId}-time`;
  const fromControlId = fromId ?? `${generatedId}-from`;
  const toControlId = toId ?? `${generatedId}-to`;
  const showDate = mode === "date" || mode === "datetime";
  const showSingleTime = mode === "time";
  const showTimeRange = mode === "datetime";
  const unavailableDateSet = new Set(unavailableDates);
  const today = formatDate(new Date());
  const handleDateSelect = (nextDate?: Date) => {
    if (date === undefined) setLocalDate(nextDate);
    onDateChange?.(formatDate(nextDate));
    setOpen(false);
  };

  const renderLabel = (label: string, controlId: string, isRequired: boolean) =>
    showLabels ? (
      <Label htmlFor={controlId} className={labelClassName ?? "px-1"}>
        {label}
        {isRequired ? (
          <span aria-hidden="true" className="text-destructive">
            {" "}
            *
          </span>
        ) : null}
      </Label>
    ) : null;

  return (
    <div className={className ?? "flex flex-col gap-6"}>
      {showDate ? (
        <div className="flex w-full flex-col gap-2">
          {renderLabel(dateLabel, dateControlId, dateRequired)}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                aria-describedby={dateDescribedBy}
                aria-invalid={dateInvalid || undefined}
                aria-required={dateRequired || undefined}
                className={cn(
                  dateClassName,
                  "w-full justify-between font-normal bg-white hover:bg-white cursor-pointer",
                )}
                id={dateControlId}
                name={dateName}
                onBlur={onDateBlur ?? onBlur}
                type="button"
                variant="outline"
              >
                {selectedDate ? selectedDate.toLocaleDateString() : "Pick a date"}
                <ChevronDownIcon aria-hidden="true" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
              <Calendar
                mode="single"
                onSelect={handleDateSelect}
                selected={selectedDate}
                disabled={(day) => {
                  const formattedDay = formatDate(day);
                  return formattedDay <= today || unavailableDateSet.has(formattedDay);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      ) : null}
      {showSingleTime ? (
        <div className="flex flex-col gap-2">
          {renderLabel(timeLabel, timeControlId, timeRequired)}
          <Input
            aria-describedby={describedBy}
            aria-invalid={invalid || undefined}
            aria-required={required || undefined}
            className={
              timeClassName ??
              "appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none cursor-text"
            }
            defaultValue={time === undefined ? defaultTime : undefined}
            id={timeControlId}
            name={name}
            onBlur={onBlur}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              onTimeChange?.(event.currentTarget.value)
            }
            step={step}
            type="time"
            required={timeRequired}
            value={time}
          />
        </div>
      ) : null}
      {showTimeRange ? (
        <div className="flex gap-4">
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            {renderLabel(fromLabel, fromControlId, timeFromRequired)}
            <Input
              className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none cursor-text"
              aria-describedby={timeFromDescribedBy}
              aria-invalid={timeFromInvalid || undefined}
              aria-required={timeFromRequired || undefined}
              defaultValue={timeFrom === undefined ? defaultTimeFrom : undefined}
              id={fromControlId}
              name={timeFromName}
              onBlur={onTimeFromBlur ?? onBlur}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                onTimeFromChange?.(event.currentTarget.value)
              }
              step={step}
              type="time"
              required={timeFromRequired}
              value={timeFrom}
            />
          </div>
          {showTimeTo ? (
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              {renderLabel(toLabel, toControlId, timeToRequired)}
              <Input
                aria-describedby={timeToDescribedBy}
                aria-invalid={timeToInvalid || undefined}
                aria-required={timeToRequired || undefined}
                className={cn(
                  timeClassName,
                  "bg-white appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none cursor-text",
                )}
                defaultValue={timeTo === undefined ? defaultTimeTo : undefined}
                id={toControlId}
                name={timeToName}
                onBlur={onTimeToBlur ?? onBlur}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  onTimeToChange?.(event.currentTarget.value)
                }
                step={step}
                type="time"
                required={timeToRequired}
                value={timeTo}
              />
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};
