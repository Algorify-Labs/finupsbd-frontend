"use client";

import type React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Enums from schema
const UserProfileGender = {
  MALE: "MALE",
  FEMALE: "FEMALE",
  OTHER: "OTHER",
} as const;

const DocumentType = {
  NATIONAL_ID: "NATIONAL_ID",
  PASSPORT: "PASSPORT",
  DRIVING_LICENSE: "DRIVING_LICENSE",
  VOTER_ID: "VOTER_ID",
} as const;

// Form schema
const formSchema = z.object({
  // Personal Information
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters." }),
  fatherName: z.string().optional(),
  motherName: z.string().optional(),
  dateOfBirth: z.string(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"], {
    required_error: "Please select a gender.",
  }),
  nationality: z.string().min(2, { message: "Nationality is required." }),
  occupation: z.string().optional(),

  // Document Information
  documentType: z.enum(
    ["NATIONAL_ID", "PASSPORT", "DRIVING_LICENSE", "VOTER_ID"],
    {
      required_error: "Please select a document type.",
    },
  ),
  documentNumber: z
    .string()
    .min(1, { message: "Document number is required." }),
  documentFrontUrl: z
    .string()
    .min(1, { message: "Front document image is required." }),
  documentBackUrl: z.string().optional(),

  // Address Information
  addressLine1: z.string().min(1, { message: "Address line 1 is required." }),
  addressLine2: z.string().optional(),
  city: z.string().min(1, { message: "City is required." }),
  state: z.string().min(1, { message: "State is required." }),
  postalCode: z.string().min(1, { message: "Postal code is required." }),
  country: z.string().min(1, { message: "Country is required." }),
  addressProofUrl: z
    .string()
    .min(1, { message: "Address proof document is required." }),

  // Selfie
  selfieUrl: z.string().min(1, { message: "Selfie is required." }),
});

export default function KycVerificationPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // File upload previews
  const [documentFrontPreview, setDocumentFrontPreview] = useState("");
  const [documentBackPreview, setDocumentBackPreview] = useState("");
  const [addressProofPreview, setAddressProofPreview] = useState("");
  const [selfiePreview, setSelfiePreview] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "shamim",
      fatherName: "eeeee",
      motherName: "eeeeee",
      nationality: "eeee",
      occupation: "eeeeee",
      documentNumber: "1",
      documentFrontUrl: "",
      documentBackUrl: "",
      addressLine1: "",
      addressLine2: "",
      city: "sss",
      state: "ssss",
      postalCode: "sssss",
      country: "sssss",
      addressProofUrl: "",
      selfieUrl: "",
    },
  });

  const totalSteps = 4;

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: any,
    setPreview: (url: string) => void,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      field.onChange(url);
      setPreview(url);
    }
  };

  const nextStep = async () => {
    const fieldsToValidate = {
      1: ["fullName", "dateOfBirth", "gender", "nationality"],
      2: ["documentType", "documentNumber", "documentFrontUrl"],
      3: [
        "addressLine1",
        "city",
        "state",
        "postalCode",
        "country",
        "addressProofUrl",
      ],
    }[step];

    const isValid = await form.trigger(fieldsToValidate as any);
    if (isValid) setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    try {
      // Here you would normally send the data to your API
      console.log(values);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Show success and redirect
      alert("KYC verification submitted successfully!");
      // router.push("/dashboard")
    } catch (error) {
      console.error("Error submitting KYC verification:", error);
      alert(
        "There was an error submitting your KYC verification. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container max-w-4xl py-10">
      <Card className="border-none shadow-lg">
        <CardHeader className="rounded-t-lg bg-primary text-primary-foreground">
          <CardTitle className="text-2xl font-bold">KYC Verification</CardTitle>
          <CardDescription className="text-primary-foreground/80">
            Complete your identity verification to access all features
          </CardDescription>
        </CardHeader>

        {/* Progress indicator */}
        <div className="px-6 pt-6">
          <div className="mb-2 flex justify-between">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium",
                    step > i + 1
                      ? "bg-primary text-primary-foreground"
                      : step === i + 1
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground",
                  )}
                >
                  {step > i + 1 ? <Check className="h-5 w-5" /> : i + 1}
                </div>
                <span className="mt-1 text-xs text-muted-foreground">
                  {i === 0
                    ? "Personal"
                    : i === 1
                      ? "Document"
                      : i === 2
                        ? "Address"
                        : "Selfie"}
                </span>
              </div>
            ))}
          </div>
          <div className="mb-6 h-2 w-full rounded-full bg-muted">
            <div
              className="h-2 rounded-full bg-primary transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Personal Information</h3>

                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="fatherName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Father's Name (Optional)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter father's name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="motherName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mother's Name (Optional)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter mother's name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date of Birth</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground",
                                  )}
                                >
                                  {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    /> */}
                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date of Birth</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              // Use the string value from field.value directly
                              value={
                                field.value
                                  ? new Date(field.value)
                                      .toISOString()
                                      .split("T")[0]
                                  : ""
                              }
                              // Update field with the string from the <input> event
                              onChange={(e) => field.onChange(e.target.value)}
                              min="1900-01-01"
                              max={new Date().toISOString().split("T")[0]}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value={UserProfileGender.MALE}>
                                Male
                              </SelectItem>
                              <SelectItem value={UserProfileGender.FEMALE}>
                                Female
                              </SelectItem>
                              <SelectItem value={UserProfileGender.OTHER}>
                                Other
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="nationality"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nationality</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your nationality"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="occupation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Occupation (Optional)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your occupation"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Document Information */}
              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Identity Document</h3>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="documentType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Document Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select document type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value={DocumentType.NATIONAL_ID}>
                                National ID
                              </SelectItem>
                              <SelectItem value={DocumentType.PASSPORT}>
                                Passport
                              </SelectItem>
                              <SelectItem value={DocumentType.DRIVING_LICENSE}>
                                Driving License
                              </SelectItem>
                              <SelectItem value={DocumentType.VOTER_ID}>
                                Voter ID
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="documentNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Document Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter document number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="documentFrontUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Document Front Side</FormLabel>
                          <FormControl>
                            <div className="flex flex-col items-center">
                              <label
                                htmlFor="documentFront"
                                className="flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors hover:bg-muted/50"
                              >
                                {documentFrontPreview ? (
                                  <Image
                                    src={
                                      documentFrontPreview || "/placeholder.svg"
                                    }
                                    alt="Document front preview"
                                    className="h-full w-full rounded-lg object-contain"
                                  />
                                ) : (
                                  <>
                                    <Upload className="mb-2 h-10 w-10 text-muted-foreground" />
                                    <p className="text-sm text-muted-foreground">
                                      Click to upload front side
                                    </p>
                                  </>
                                )}
                                <input
                                  id="documentFront"
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) =>
                                    handleFileUpload(
                                      e,
                                      field,
                                      setDocumentFrontPreview,
                                    )
                                  }
                                />
                              </label>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="documentBackUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Document Back Side (Optional)</FormLabel>
                          <FormControl>
                            <div className="flex flex-col items-center">
                              <label
                                htmlFor="documentBack"
                                className="flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors hover:bg-muted/50"
                              >
                                {documentBackPreview ? (
                                  <Image
                                    src={
                                      documentBackPreview || "/placeholder.svg"
                                    }
                                    alt="Document back preview"
                                    className="h-full w-full rounded-lg object-contain"
                                  />
                                ) : (
                                  <>
                                    <Upload className="mb-2 h-10 w-10 text-muted-foreground" />
                                    <p className="text-sm text-muted-foreground">
                                      Click to upload back side
                                    </p>
                                  </>
                                )}
                                <input
                                  id="documentBack"
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) =>
                                    handleFileUpload(
                                      e,
                                      field,
                                      setDocumentBackPreview,
                                    )
                                  }
                                />
                              </label>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Address Information */}
              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Address Information</h3>

                  <FormField
                    control={form.control}
                    name="addressLine1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address Line 1</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your street address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="addressLine2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address Line 2 (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Apartment, suite, unit, etc."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter city" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State/Province</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter state or province"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal Code</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter postal code" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter country" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="addressProofUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address Proof Document</FormLabel>
                        <FormDescription>
                          Upload a utility bill, bank statement, or other proof
                          of address (not older than 3 months)
                        </FormDescription>
                        <FormControl>
                          <div className="flex flex-col items-center">
                            <label
                              htmlFor="addressProof"
                              className="flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors hover:bg-muted/50"
                            >
                              {addressProofPreview ? (
                                <Image
                                  src={
                                    addressProofPreview || "/placeholder.svg"
                                  }
                                  alt="Address proof preview"
                                  className="h-full w-full rounded-lg object-contain"
                                />
                              ) : (
                                <>
                                  <Upload className="mb-2 h-10 w-10 text-muted-foreground" />
                                  <p className="text-sm text-muted-foreground">
                                    Click to upload address proof
                                  </p>
                                </>
                              )}
                              <input
                                id="addressProof"
                                type="file"
                                accept="image/*,.pdf"
                                className="hidden"
                                onChange={(e) =>
                                  handleFileUpload(
                                    e,
                                    field,
                                    setAddressProofPreview,
                                  )
                                }
                              />
                            </label>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 4: Selfie */}
              {step === 4 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Selfie Verification</h3>

                  <FormField
                    control={form.control}
                    name="selfieUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Selfie Photo</FormLabel>
                        <FormDescription>
                          Please upload a clear photo of yourself holding your
                          ID document
                        </FormDescription>
                        <FormControl>
                          <div className="flex flex-col items-center">
                            <label
                              htmlFor="selfie"
                              className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors hover:bg-muted/50"
                            >
                              {selfiePreview ? (
                                <Image
                                  src={selfiePreview || "/placeholder.svg"}
                                  alt="Selfie preview"
                                  className="h-full w-full rounded-lg object-contain"
                                />
                              ) : (
                                <>
                                  <Upload className="mb-2 h-10 w-10 text-muted-foreground" />
                                  <p className="text-sm text-muted-foreground">
                                    Click to upload selfie
                                  </p>
                                  <p className="mt-1 text-xs text-muted-foreground">
                                    Make sure your face is clearly visible
                                  </p>
                                </>
                              )}
                              <input
                                id="selfie"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                  handleFileUpload(e, field, setSelfiePreview)
                                }
                              />
                            </label>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="rounded-lg bg-muted p-4">
                    <p className="text-sm">
                      By submitting this form, you confirm that all information
                      provided is accurate and authentic. Providing false
                      information may result in account termination and possible
                      legal consequences.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>

            <CardFooter className="flex justify-between border-t p-6">
              {step > 1 && (
                <Button type="button" variant="outline" onClick={prevStep}>
                  Previous
                </Button>
              )}

              {step < totalSteps ? (
                <Button type="button" className="ml-auto" onClick={nextStep}>
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="ml-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Verification"}
                </Button>
              )}
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
