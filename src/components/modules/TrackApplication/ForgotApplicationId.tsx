// 'use client';
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import Link from "next/link";
// import { Loader2 } from "lucide-react";
// import { useState } from "react";

// const FormSchema = z.object({
//   phone: z.string()
//   .min(14, "Invalid phone number")
//   .regex(/^\+8801[0-9]{8}$/, {
//     message: "Phone number must be like +8801712345678",
//   })
// });

// export default function ForgotApplicationId() {
//   const { register, handleSubmit, formState } = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
//     defaultValues: {
//       phone: "+880",
//     },
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);

//   async function onSubmit(data: z.infer<typeof FormSchema>) {
//     setIsSubmitting(true);
//     try {
//       // Add your submission logic here
//       console.log(data);
//       await new Promise(resolve => setTimeout(resolve, 1000));
//     } finally {
//       setIsSubmitting(false);
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <Card className="w-full max-w-md">
//         <CardHeader>
//           <CardTitle className="text-2xl text-center">Forgot Application ID</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p className="text-center text-gray-600 mb-6">
//             Enter your mobile number to reset your tracking id
//           </p>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             <div className="space-y-4">
//               {/* Phone Number */}
//               <div>
//                 <label htmlFor="phone" className="block text-sm font-medium mb-2">
//                   Phone Number
//                 </label>
//                 <Input
//                   id="phone"
//                   placeholder="+860XXXXXXXXX"
//                   {...register("phone")}
//                   disabled={isSubmitting}
//                 />
//                 {formState.errors.phone && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {formState.errors.phone.message}
//                   </p>
//                 )}
//               </div>
//             </div>

//             <Button type="submit" className="w-full" disabled={isSubmitting}>
//               {isSubmitting ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Submitting...
//                 </>
//               ) : (
//                 "Submit"
//               )}
//             </Button>

//             <div className="text-center text-sm">
//               <Link 
//                 href="/application/track-application" 
//                 className="text-blue-600 hover:underline flex items-center justify-center gap-1"
//               >
//                 &lt; Back to Track Application
//               </Link>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }