"use client";

import type React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { HelpCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { applicationFormSchema } from "../schemas/applicationSchemas";
import StepNavigator from "./StepNavigator";
import AddressStep from "./steps/AddressStep";
import ConsentStep from "./steps/ConsentStep";
import DocumentUploadsStep from "./steps/DocumentUploadsStep";
import EmploymentStep from "./steps/EmploymentStep";
import FinancialObligationsStep from "./steps/FinancialObligationsStep";
import LoanSpecificationsStep from "./steps/LoanSpecificationsStep";
import PersonalInfoStep from "./steps/PersonalInfoStep";

// Infer the form values type from the schema
type ApplicationFormValues = z.infer<typeof applicationFormSchema>;

const AUTOSAVE_INTERVAL = 30000; // 30 seconds

export default function MultiStepForm() {
  const [step, setStep] = useState(0);
  const [isPreview, setIsPreview] = useState(false);
  const [previews, setPreviews] = useState<{ [docType: string]: string }>({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
    setValue,
    watch,
    getValues,
    reset,
  } = useForm<ApplicationFormValues>();

  // Calculate form progress
  useEffect(() => {
    const values = getValues();
    const totalFields = Object.keys(applicationFormSchema.shape).length;
    const filledFields = Object.keys(values).filter((key) => {
      const value = values[key as keyof ApplicationFormValues];
      return value !== undefined && value !== "" && value !== null;
    }).length;
    setProgress((filledFields / totalFields) * 100);
  }, [getValues, watch()]);

  // Autosave functionality
  useEffect(() => {
    if (!isDirty) return;

    const autosaveTimer = setInterval(() => {
      const formData = getValues();
      localStorage.setItem("loanApplicationDraft", JSON.stringify(formData));
      console.log("Form autosaved");
    }, AUTOSAVE_INTERVAL);

    return () => clearInterval(autosaveTimer);
  }, [isDirty, getValues]);

  // Load saved draft
  useEffect(() => {
    const savedDraft = localStorage.getItem("loanApplicationDraft");
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        reset(parsedDraft);
      } catch (error) {
        console.error("Error loading saved draft:", error);
      }
    }
  }, [reset]);

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    docType: string,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // File size validation (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
          alert("File size exceeds 5MB limit");
          return;
        }

        const documentUrl = URL.createObjectURL(file);
        setPreviews((prev) => ({ ...prev, [docType]: documentUrl }));

        const fileSizeMB = file.size / (1024 * 1024);
        const currentDocs = watch("uploadedDocuments") || [];

        setValue("uploadedDocuments", [
          ...currentDocs,
          {
            type: docType,
            filePath: documentUrl,
            fileSizeMB,
            fileType: file.type || "unknown",
          },
        ]);
      } catch (error) {
        console.error("File upload error:", error);
      }
    }
  };

  const onSubmit = async (data: ApplicationFormValues) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Form submitted:", data);
      setIsPreview(true);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      const data = getValues();
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Final Submission Data:", data);

      // Clear form data and local storage
      localStorage.removeItem("loanApplicationDraft");
      reset();
      setIsPreview(false);
      setStep(0);

      // Show success message or redirect
      alert("Application submitted successfully!");
    } catch (error) {
      console.error("Final submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 7));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <PersonalInfoStep
            register={register}
            control={control}
            errors={errors}
          />
        );
      case 1:
        return (
          <AddressStep register={register} control={control} errors={errors} />
        );
      case 2:
        return (
          <EmploymentStep
            register={register}
            control={control}
            errors={errors}
          />
        );
      case 3:
        return (
          <LoanSpecificationsStep
            register={register}
            control={control}
            errors={errors}
          />
        );
      case 4:
        return <FinancialObligationsStep register={register} errors={errors} />;
      case 5:
        return (
          <DocumentUploadsStep
            register={register}
            handleFileChange={handleFileChange}
            previews={previews}
            watch={watch}
          />
        );
      case 6:
        return <ConsentStep register={register} errors={errors} />;
      default:
        return null;
    }
  };

  const renderPreview = () => {
    const data = getValues();

    return (
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Preview Your Application
        </h2>

        {/* Personal Information Preview */}
        <div className="rounded-lg border p-4 shadow-sm">
          <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
            <h3 className="text-xl font-semibold">Personal Information</h3>
            <Button
              onClick={() => {
                setStep(0);
                setIsPreview(false);
              }}
              variant="link"
              className="mt-2 text-primary hover:underline sm:mt-0"
            >
              Edit
            </Button>
          </div>
          <div className="mt-2 space-y-1">
            <p>
              <strong>Full Name:</strong> {data.userInfo?.fullName}
            </p>
            <p>
              <strong>Father's Name:</strong> {data.userInfo?.fatherName}
            </p>
            <p>
              <strong>Mother's Name:</strong> {data.userInfo?.motherName}
            </p>
            <p>
              <strong>Spouse's Name:</strong> {data.userInfo?.spouseName}
            </p>
            <p>
              <strong>Date of Birth:</strong> {data.userInfo?.dateOfBirth}
            </p>
            <p>
              <strong>Gender:</strong> {data.userInfo?.gender}
            </p>
            <p>
              <strong>Marital Status:</strong> {data.userInfo?.maritalStatus}
            </p>
            <p>
              <strong>NID:</strong> {data.userInfo?.nid}
            </p>
            <p>
              <strong>Mobile Number:</strong> {data.userInfo?.mobileNumber}
            </p>
            <p>
              <strong>Email Address:</strong> {data.userInfo?.emailAddress}
            </p>
          </div>
        </div>

        {/* Address Information Preview */}
        <div className="rounded-lg border p-4 shadow-sm">
          <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
            <h3 className="text-xl font-semibold">Residential Information</h3>
            <Button
              onClick={() => {
                setStep(1);
                setIsPreview(false);
              }}
              variant="link"
              className="mt-2 text-primary hover:underline sm:mt-0"
            >
              Edit
            </Button>
          </div>
          <div className="mt-2 space-y-1">
            <p>
              <strong>Address:</strong> {data.address?.houseFlatNo},{" "}
              {data.address?.streetRoad}, {data.address?.areaLocality}
            </p>
            <p>
              <strong>City:</strong> {data.address?.city}
            </p>
            <p>
              <strong>District:</strong> {data.address?.district}
            </p>
            <p>
              <strong>Postal Code:</strong> {data.address?.postalCode}
            </p>
            <p>
              <strong>Length of Stay:</strong> {data.address?.lengthOfStayYears}{" "}
              years
            </p>
            <p>
              <strong>Ownership Status:</strong> {data.address?.ownershipStatus}
            </p>
          </div>
        </div>

        {/* Employment Information Preview */}
        <div className="rounded-lg border p-4 shadow-sm">
          <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
            <h3 className="text-xl font-semibold">
              Employment & Financial Info
            </h3>
            <Button
              onClick={() => {
                setStep(2);
                setIsPreview(false);
              }}
              variant="link"
              className="mt-2 text-primary hover:underline sm:mt-0"
            >
              Edit
            </Button>
          </div>
          <div className="mt-2 space-y-1">
            <p>
              <strong>Employment Status:</strong>{" "}
              {data.employmentFinancialInfo?.employmentStatus}
            </p>
            <p>
              <strong>Job Title:</strong>{" "}
              {data.employmentFinancialInfo?.jobTitle}
            </p>
            <p>
              <strong>Employer Name:</strong>{" "}
              {data.employmentFinancialInfo?.employerName}
            </p>
            <p>
              <strong>Monthly Income:</strong>{" "}
              {data.employmentFinancialInfo?.monthlyGrossIncome}
            </p>
            <p>
              <strong>Monthly Expenses:</strong>{" "}
              {data.employmentFinancialInfo?.totalMonthlyExpenses}
            </p>
          </div>
        </div>

        {/* Loan Specifications Preview */}
        <div className="rounded-lg border p-4 shadow-sm">
          <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
            <h3 className="text-xl font-semibold">Loan Specifications</h3>
            <Button
              onClick={() => {
                setStep(3);
                setIsPreview(false);
              }}
              variant="link"
              className="mt-2 text-primary hover:underline sm:mt-0"
            >
              Edit
            </Button>
          </div>
          <div className="mt-2 space-y-1">
            <p>
              <strong>Loan Type:</strong> {data.loanSpecifications?.loanType}
            </p>
            <p>
              <strong>Loan Amount:</strong>{" "}
              {data.loanSpecifications?.loanAmountRequested}
            </p>
            <p>
              <strong>Purpose:</strong> {data.loanSpecifications?.purposeOfLoan}
            </p>
            <p>
              <strong>Tenure:</strong>{" "}
              {data.loanSpecifications?.preferredLoanTenure} months
            </p>
            <p>
              <strong>EMI Start Date:</strong>{" "}
              {data.loanSpecifications?.proposedEMIStartDate}
            </p>
          </div>
        </div>

        {/* Documents Preview */}
        <div className="rounded-lg border p-4 shadow-sm">
          <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
            <h3 className="text-xl font-semibold">Uploaded Documents</h3>
            <Button
              onClick={() => {
                setStep(5);
                setIsPreview(false);
              }}
              variant="link"
              className="mt-2 text-primary hover:underline sm:mt-0"
            >
              Edit
            </Button>
          </div>
          <div className="mt-2 space-y-1">
            {data.uploadedDocuments && data.uploadedDocuments.length > 0 ? (
              data.uploadedDocuments.map((doc, index) => (
                <p key={index}>
                  <strong>{doc.type}:</strong> {doc.fileType} (
                  {doc.fileSizeMB.toFixed(2)} MB)
                </p>
              ))
            ) : (
              <p>No documents uploaded</p>
            )}
          </div>
        </div>

        <div className="mt-8 flex flex-col justify-end space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Button
            onClick={() => setIsPreview(false)}
            variant="outline"
            className="px-6 py-3"
          >
            Back to Edit
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="px-6 py-3">Submit Application</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Submit Application?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to submit your loan application? This
                  action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleFinalSubmit}>
                  Submit
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    );
  };

  const stepTitles = [
    "Personal Information",
    "Residential Information",
    "Employment Info",
    "Loan Request",
    "Financial Obligations",
    "Document Uploads",
    "Consent and Declaration",
  ];

  return (
    <div className="pb-14">
      <div className="py-12">
        <h2 className="mb-3 text-3xl font-semibold">Loan Application Form</h2>
        <p className="text-muted-foreground">
          Please fill out the following details carefully. Required documents
          can be uploaded in the relevant sections. All information provided
          will be kept strictly confidential and used solely for the purpose of
          processing your loan application
        </p>
        <hr className="mt-8 border-gray-200" />
      </div>
      <div className="flex flex-col gap-8 md:flex-row">
        {/* Sidebar */}
        <div
          className={cn(
            "w-72 rounded-xl border border-[#E9EFF6] bg-white px-6 py-4 pb-6 pt-0 shadow-[0_1px_12px_rgba(0,0,0,0.1)] lg:sticky lg:top-24 lg:w-3/12 lg:self-start",
          )}
        >
          {/* <div className="px-4 py-2">
          <Progress value={progress} className="w-full" />
          <p className="mt-1 text-sm">{Math.round(progress)}% Complete</p>
        </div> */}
          <StepNavigator
            currentStep={step}
            stepTitles={stepTitles}
            onStepChange={(newStep) => {
              if (isDirty) {
                if (
                  window.confirm(
                    "You have unsaved changes. Do you want to continue?",
                  )
                ) {
                  setStep(newStep);
                  setIsPreview(false);
                }
              } else {
                setStep(newStep);
                setIsPreview(false);
              }
            }}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-background">
          <Card className="mx-auto max-w-6xl">
            <CardContent className="p-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-6">
                  {!isPreview && (
                    <p className="font-semibold">
                      Step {step + 1} of {stepTitles.length}
                    </p>
                  )}
                </div>
                <div>
                  <div className="px-4 py-2 text-right">
                    <Progress value={progress} className="w-full" />
                    <p className="mt-2 text-sm font-semibold">
                      {Math.round(progress)}% Complete
                    </p>
                  </div>
                </div>
              </div>
              <hr className="mb-4 mt-3 border-gray-200" />
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {isPreview ? renderPreview() : renderStepContent()}
                {!isPreview && (
                  <div className="mt-8 flex justify-between">
                    {step > 0 && (
                      <Button
                        type="button"
                        onClick={prevStep}
                        variant="outline"
                      >
                        Previous
                      </Button>
                    )}
                    {step < 7 ? (
                      <Button type="button" onClick={nextStep}>
                        Next
                      </Button>
                    ) : (
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Review Application"}
                      </Button>
                    )}
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Help Tooltip */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="fixed bottom-4 right-4 rounded-full"
              >
                <HelpCircle className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Need help? Contact support</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
