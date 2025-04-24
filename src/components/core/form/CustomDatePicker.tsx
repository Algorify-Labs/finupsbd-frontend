"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";

const FormSchema = z.object({
  datetime: z.date({
    required_error: "Date & time is required!.",
  }),
});

export function CustomDatePicker(props: {
  label?: string;
  name?: string | undefined;
  form?: any;
}) {
  const { label = "Date", form, name } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date | null>(null);

  return (
    <FormField
      control={form.control}
      name={name || "defaultDate"}
      render={({ field }) => (
        <FormItem className="flex w-full flex-col">
          <FormLabel className="mb-2">{label}</FormLabel>
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full font-normal",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value ? (
                    `${format(field.value, "PPP")}`
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                captionLayout="dropdown"
                selected={date || field.value}
                onSelect={(selectedDate) => {
                  setDate(selectedDate!);
                  field.onChange(selectedDate);
                }}
                onDayClick={() => setIsOpen(false)}
                defaultMonth={field.value}
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
