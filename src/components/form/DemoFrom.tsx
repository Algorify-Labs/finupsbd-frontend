"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Form } from "../ui/form";
import { DatePickerInput, SelectInput, TextInput } from "./FormInputs";
const MAX_FILE_SIZE = 5000000;

function checkFileType(file: File) {
  if (file?.name) {
    const fileType = file.name.split(".").pop();
    if (fileType === "docx" || fileType === "pdf") return true;
  }
  return false;
}
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  age: z
    .number()
    .int({ message: "Monthly income must be an integer." })
    .min(22, { message: "Age not lower than 22" })
    .max(65, {
      message: "Age not more than 65",
    }),
  gender: z.string().min(1, "Gender is required"),

  phone: z
    .string({
      required_error: "Phone Number is required",
      invalid_type_error: "Phone Number is required",
    })
    .max(11, {
      message: "Phone Number must be 11 digits",
    })
    .regex(
      /^(\+880\s?|0)1[3-9]\d{2}-?\d{6}$/,
      "Please enter valid mobile number",
    ),

  email: z
    .string()
    .email({
      message: "Please enter valid email address",
    })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter valid email address"),

  dob: z.date({
    required_error: "Date of Birth is required",
  }),
});

const DemoFrom = () => {
  const [fileKey, setFileKey] = useState(Date.now());
  const fileInputRef = useRef(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      age: 0,
      phone: "",
      email: "",
      gender: "",
      dob: new Date(),
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Card className="w-full p-4 shadow-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <TextInput
            form={form}
            name="username"
            label="Name"
            placeholder="Enter Patient Name"
            required
            icon={<User className="size-4 lg:size-6" />}
          />
          <TextInput
            form={form}
            name="age"
            label="Age"
            type="text"
            placeholder="Enter AGe"
            onChange={(e) => form.setValue("age", Number(e.target.value))}
            required
          />
          <TextInput
            form={form}
            name="phone"
            label="Contact Number"
            type="tel"
            placeholder="Enter Contact Number"
            icon={<User className="size-4 lg:size-6" />}
            required
          />
          <TextInput
            form={form}
            name="email"
            label="Email"
            type="email"
            placeholder="Enter Email"
            required
          />
          <SelectInput
            form={form}
            name="gender"
            label="Gender"
            placeholder="Select Gender"
            options={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
            ]}
            required
          />
          <DatePickerInput
            form={form}
            label="Date of Birth"
            name="dob"
            required
          />

          <Button className="mt-6" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </Card>
  );
};

export default DemoFrom;
