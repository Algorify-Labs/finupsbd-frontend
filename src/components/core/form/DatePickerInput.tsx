import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/custom-calendar";
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
import { format } from "date-fns-tz";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Control, FieldValues, Path } from "react-hook-form";

interface DatePickerInputProps<T extends FieldValues> {
  form: {
    control: Control<T>;
  };
  name: Path<T>;
  label: string;
  placeholder?: string;
  fromYear?: number;
  toYear?: number;
  disabled?: boolean;
  dateDisabled?: (date: Date) => boolean;
  defaultValue?: string | Date;
  noEndDate?: boolean;
  required?: boolean;
}

const DatePickerInput = <T extends FieldValues>({
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
}: DatePickerInputProps<T>) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
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
                    "w-full py-2 pl-3 text-left font-normal max-sm:h-11",
                    !field.value && !defaultValue && "text-muted-foreground",
                  )}
                >
                  {defaultValue && !field.value ? (
                    format(new Date(defaultValue), "dd-MM-yyyy")
                  ) : field.value ? (
                    format(new Date(field.value), "dd-MM-yyyy")
                  ) : (
                    <span className="text-primary-gray">{placeholder}</span>
                  )}
                  <CalendarIcon className="text-primary-gray !ml-auto inline-block" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              {/* <Calendar
                mode="single"
                captionLayout="dropdown-buttons"
                selected={
                  field.value
                    ? new Date(field.value)
                    : defaultValue
                      ? new Date(defaultValue)
                      : undefined
                }
                onSelect={(e: Date | undefined) => {
                  field.onChange(e);
                  setIsCalendarOpen(false);
                }}
                fromYear={fromYear}
                toYear={toYear}
                disabled={(date: Date) =>
                  dateDisabled ? dateDisabled(date) : false
                }
                defaultMonth={field.value ? new Date(field.value) : new Date()}
              /> */}
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DatePickerInput;
