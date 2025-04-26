"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { forwardRef, ReactNode, useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Textarea } from "../ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";

// Common Text Input Component
interface TextInputProps<T extends FieldValues> {
  form: UseFormReturn<any>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: "text" | "number" | "tel" | "email";
  icon?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  maxLength?: number;
  minLength?: number;
}
export const TextInput = <T extends FieldValues>({
  form,
  name,
  label,
  placeholder = "Enter your text",
  type = "text",
  icon,
  required = false,
  disabled = false,
  onChange,
  maxLength,
  minLength,
}: TextInputProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="form-inoput-item">
          <FormLabel>
            {label} {required && <span className="text-destructive">*</span>}
          </FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                className={cn(
                  "h-10 border-[#D0D5DD] bg-white max-sm:h-11",
                  icon && "pr-12",
                )}
                type={type}
                placeholder={`${placeholder}`}
                disabled={disabled}
                {...field}
                onChange={(e) => {
                  field.onChange(e); // react-hook-form binding
                  onChange?.(e); // your custom logic if provided
                }}
                maxLength={maxLength}
                minLength={minLength}
              />
              {icon && (
                <div className="absolute right-3 top-0 flex h-full items-center justify-center text-tertiary-primary">
                  {icon}
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// Common Textarea Component
interface TextAreaInputProps {
  form: UseFormReturn;
  name: string;
  label: string;
  placeholder?: string;
  icon?: ReactNode;
  required?: boolean;
}

export const TextAreaInput = ({
  form,
  name,
  label,
  placeholder = "Enter your text",
  icon,
  required = false,
}: TextAreaInputProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label} {required && <span className="text-destructive">*</span>}
          </FormLabel>
          <FormControl>
            <div className="relative">
              <Textarea
                className={cn(
                  "placeholder:text-primary-gray h-20 rounded-none bg-white lg:h-28",
                  icon && "pr-12",
                )}
                placeholder={placeholder}
                {...field}
              />
              {icon && (
                <div className="text-primary-gray absolute right-3 top-0 flex h-full items-center justify-center">
                  {icon}
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// Common Seelct Component
interface SelectOption {
  label: string;
  value: string | number;
}

interface SelectInputProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder?: string;
  options: SelectOption[];
  required?: boolean;
  disabled?: boolean;
}

export const SelectInput = ({
  form,
  name,
  label,
  placeholder = "Please",
  options,
  required = false,
  disabled = false,
}: SelectInputProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="form-inoput-item select-input">
          <FormLabel>
            {label} {required && <span className="text-destructive">*</span>}
          </FormLabel>
          <Select
            // onValueChange={field.onChange}
            value={field.value !== undefined ? String(field.value) : ""}
            onValueChange={(selectedValue) => {
              // Find the original option
              const matchedOption = options.find(
                (opt) => String(opt.value) === selectedValue,
              );
              if (matchedOption) {
                form.setValue(name, matchedOption.value, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }
            }}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger className="relative h-10 border-[#D0D5DD] bg-white transition-all duration-300 max-sm:h-11 [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-tertiary-primary/60 [&>svg]:opacity-100 [&[data-state=close]>svg]:-rotate-180 [&[data-state=close]>svg]:bg-primary [&[data-state=close]>svg]:duration-300 [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg]:duration-300">
                <SelectValue
                  className="placeholder:!text-primary-gray"
                  placeholder={placeholder}
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="border-[#D0D5DD]">
              {options.map((option) => (
                <SelectItem
                  key={String(option.value)}
                  value={String(option.value)}
                  className="cursor-pointer"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// Common File Upload Component
interface FileInputProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder?: string;
  icon?: React.ReactNode;
  required?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  errorMessage?: string;
}

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      form,
      name,
      label,
      placeholder = "Enter your text",
      icon,
      required = false,
      onChange,
      errorMessage,
    },
    _ref, // not used, to avoid ref conflict
  ) => {
    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {label} {required && <span className="text-destructive">*</span>}
            </FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  ref={field.ref} // use react-hook-form's ref
                  className={cn(
                    "flex h-10 bg-white max-sm:h-11",
                    icon && "pr-12",
                  )}
                  type="file"
                  placeholder={placeholder}
                  onChange={(e) => {
                    field.onChange(e); // notify RHF
                    onChange?.(e); // optional custom handler
                  }}
                />

                {icon && (
                  <div className="text-primary-gray absolute right-3 top-0 flex h-full items-center justify-center">
                    {icon}
                  </div>
                )}
              </div>
            </FormControl>
            {errorMessage && (
              <p className="text-[0.8rem] font-medium text-destructive">
                {errorMessage}
              </p>
            )}
          </FormItem>
        )}
      />
    );
  },
);
FileInput.displayName = "FileInput";

// Common DatePicker Component
interface DatePickerProps {
  form: UseFormReturn<any>;
  label?: string;
  name?: string;
  required?: boolean;
}

export const DatePickerInput = ({
  form,
  label = "Date",
  name = "defaultDate",
  required = false,
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date | null>(null);
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="form-inoput-item datepicker-input">
          <FormLabel>
            {label} {required && <span className="text-destructive">*</span>}
          </FormLabel>
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={cn(
                    "!mt-0 h-10 w-full border-[#D0D5DD] bg-white pr-2 [&_svg]:size-6",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto text-tertiary-primary/60" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                captionLayout="dropdown"
                selected={field.value}
                onSelect={async (selectedDate) => {
                  field.onChange(selectedDate);
                  await form.trigger(name);
                  setDate(selectedDate!);
                  setIsOpen(false);
                }}
                defaultMonth={field.value}
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
