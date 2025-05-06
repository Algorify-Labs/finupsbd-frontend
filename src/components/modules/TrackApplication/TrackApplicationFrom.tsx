
'use client';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { applicationTracking } from "@/services/public";
import { useState } from "react";
import { toast } from "sonner";
import TrackApplicationStatus from "./TrackApplicationStatus";
import { ApplicationStatusData } from "./TrackingApplicationTypes";

const FormSchema = z.object({
  applicationId: z.string().min(12, "Application ID must be at least 12 characters"),
  phone: z.string().min(11, "Phone number must be at least 11 characters").max(11, "Phone number must be at most 11 characters"),
});

export default function TrackApplicationForm() {

  const [isLoading, setIsLoading] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState(false);
  const [applicationStatusData, setApplicationStatusData] = useState<ApplicationStatusData | null | undefined>();

  console.log(applicationStatusData)


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      applicationId: "325050700002",
      phone: "01910479167",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    setIsLoading(true);
    const res = await applicationTracking(data);
    setIsLoading(false);
    if (res.success) {
      console.log(res.data);
      toast.success("Application status fetched successfully!");
      setApplicationStatusData(res.data);
      setApplicationStatus(true);
    }
    else {
      console.log(res.error);
      toast.error(res.error.message || "Please provide a valid application ID and phone number");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {applicationStatus && applicationStatusData ? <TrackApplicationStatus applicationStatusData={applicationStatusData} /> : <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Track your Application</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600 mb-6">
            Enter your tracking number to see your application status
          </p>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              {/* Tracking Number */}
              <div>
                <Label htmlFor="applicationId">Application ID</Label>
                <Input
                  id="applicationId"
                  placeholder="Enter your Application ID"
                  {...form.register("applicationId")}
                />
                {form.formState.errors.applicationId && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.applicationId.message}
                  </p>
                )}
              </div>
              {/* Phone Number */}
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="01XXXXXXXXXX"
                  {...form.register("phone")}
                />
                {form.formState.errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Loading... " : "Track Application"}
            </Button>

            <div className="text-center text-sm">
              <Link href="/application/forgot-application-id" className="text-blue-600 hover:underline">
                Forgot Application ID?
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>}
    </div>
  );
}







// 'use client';
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { CheckCircle2, Clock, Home } from "lucide-react";
// import Link from "next/link";

// export default function TrackApplication() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
//       <Card className="w-full max-w-2xl p-6">
//         {/* Breadcrumb */}
//         <div className="flex items-center text-sm text-gray-600 mb-6">
//           <Link href="/" className="flex items-center hover:text-blue-600">
//             <Home className="h-4 w-4 mr-1" />
//             Home
//           </Link>
//           <span className="mx-2">/</span>
//           <span className="text-gray-900">Track Application</span>
//         </div>

//         {/* Title */}
//         <h1 className="text-2xl font-bold text-gray-900 mb-2">Track Application</h1>
//         <p className="text-gray-600 mb-8">Your Loan Application is under review</p>

//         {/* Status Timeline */}
//         <div className="relative pl-6">
//           {/* Timeline line */}
//           <div className="absolute left-7 top-4 w-0.5 h-[calc(100%-50px)] bg-gray-200"></div>

//           {/* Submitted Step */}
//           <div className="relative flex items-center gap-4 mb-8">
//             <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
//               <CheckCircle2 className="w-5 h-5 text-green-600" />
//             </div>
//             <div>
//               <h3 className="font-semibold text-gray-900">Submitted</h3>
//               <p className="text-sm text-gray-500">Application received</p>
//               <p className="text-xs text-gray-400 mt-1">2023-08-15 14:30</p>
//             </div>
//           </div>

//           {/* Approval Step */}
//           <div className="relative flex items-center gap-4">
//             <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
//               <Clock className="w-5 h-5 text-blue-600" />
//             </div>
//             <div>
//               <h3 className="font-semibold text-gray-900">Approval/Rejection</h3>
//               <p className="text-sm text-gray-500">Under review</p>
//               <p className="text-xs text-gray-400 mt-1">Estimated completion: 2023-08-20</p>
//             </div>
//           </div>
//         </div>

//         <div className="mt-8">
//           <Button asChild>
//             <Link href="/" className="gap-2">
//               Back to Home
//             </Link>
//           </Button>
//         </div>
//       </Card>
//     </div>
//   );
// }

