import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/custom-calendar";
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
import { cn } from "@/utils";
import { format } from "date-fns-tz";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

const DatepickerInput = ({
  form,
  name,
  label,
  placeholder = "Pick a date",
  fromYear = new Date().getFullYear() - 100,
  toYear = new Date().getFullYear() + 10,
  disabled = false,
  dateDisabled,
  defaultValue,
  noEndDate,
  required = false,
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-dark-gray text-sm lg:text-base">
            {label} {required && <span className="text-destructive">*</span>}
          </FormLabel>
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger
              asChild
              className={cn(
                disabled
                  ? "pointer-events-none !cursor-not-allowed opacity-50"
                  : "",
                "bg-white",
              )}
            >
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "h-12 w-full py-2 pl-3 text-left font-normal text-primary max-sm:h-11",
                    !field.value && !defaultValue && "text-muted-foreground",
                  )}
                >
                  {defaultValue && !field.value ? (
                    format(new Date(defaultValue), "PPP")
                  ) : field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span className="text-primary-gray">{placeholder}</span>
                  )}

                  <CalendarIcon className="text-primary-gray !ml-auto inline-block" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Calendar
                mode="single"
                captionLayout="dropdown-buttons"
                selected={
                  field.value
                    ? new Date(field.value)
                    : defaultValue
                      ? new Date(defaultValue)
                      : undefined
                }
                onSelect={(e) => {
                  field.onChange(e);
                  setIsCalendarOpen(false);
                }}
                fromYear={fromYear}
                toYear={toYear}
                disabled={(date) => dateDisabled && dateDisabled(date)}
                defaultMonth={field.value ? field.value : new Date()}
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DatepickerInput;
