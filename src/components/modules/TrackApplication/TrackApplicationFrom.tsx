
'use client';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";

const FormSchema = z.object({
  trackingNumber: z.string().min(6, "Tracking number must be at least 6 characters"),
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^\+8801[3-9]\d{8}$/, "Invalid Bangladeshi phone number"),
});

export default function TrackApplicationForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      trackingNumber: "",
      fullName: "",
      phone: "+880",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    // Handle form submission
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
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
                <Label htmlFor="trackingNumber">Tracking Number</Label>
                <Input
                  id="trackingNumber"
                  placeholder="Enter your tracking number"
                  {...form.register("trackingNumber")}
                />
                {form.formState.errors.trackingNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.trackingNumber.message}
                  </p>
                )}
              </div>

              {/* Full Name */}
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  {...form.register("fullName")}
                />
                {form.formState.errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="+880XXXXXXXXXX" 
                  {...form.register("phone")}
                />
                {form.formState.errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full">
              Track Application
            </Button>

            <div className="text-center text-sm">
              <Link href="/application/forgot-application-id" className="text-blue-600 hover:underline">
                Forgot Application ID?
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
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

