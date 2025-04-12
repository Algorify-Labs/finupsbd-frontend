// "use client"

// import React, { useState, useEffect, useRef } from "react"
// import {
//     Dialog,
//     DialogTrigger,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
//     DialogDescription,
//     DialogFooter,
//     DialogClose,
// } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Loader } from "lucide-react"
// import Image from "next/image"
// import { OtpVerification } from "@/services/AuthService"

// export function OtpVerificationModal({ open, onOpenChange, email }: { open: boolean, onOpenChange: (state: boolean) => void, email: string | null }) {
//     const [otp, setOtp] = useState(Array(6).fill(""))
//     const [timer, setTimer] = useState(60)
//     const [isResendDisabled, setIsResendDisabled] = useState(true)
//     const [loading, setLoading] = useState(false)
//     const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null))

//     useEffect(() => {
//         if (timer > 0) {
//             const interval = setInterval(() => setTimer((prev) => prev - 1), 1000)
//             return () => clearInterval(interval)
//         } else {
//             setIsResendDisabled(false)
//         }
//     }, [timer])

//     function handleChange(index: number, value: string) {
//         if (!/^[0-9]?$/.test(value)) return

//         const newOtp = [...otp]
//         newOtp[index] = value
//         setOtp(newOtp)

//         // Move focus to next input
//         if (value && index < otp.length - 1) {
//             inputRefs.current[index + 1]?.focus()
//         }

//         // Auto-submit when all fields are filled
//         if (newOtp.every((digit) => digit !== "")) {
//             handleContinue(newOtp.join(""))
//         }
//     }

//     function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
//         if (e.key === "Backspace" && !otp[index] && index > 0) {
//             inputRefs.current[index - 1]?.focus()
//         }
//         if (e.key === "Enter" && otp.every((digit) => digit !== "")) {
//             handleContinue(otp.join(""))
//         }
//     }

//     function handleResend() {
//         console.log("Resend code triggered.")
//         setTimer(30)
//         setIsResendDisabled(true)
//         setOtp(Array(6).fill(""))
//         inputRefs.current[0]?.focus()
//     }

//    async function handleContinue(code: string) {
//         setLoading(true)
//         console.log("Submitting OTP:", code)
//         console.log(email)
//         // Simulating an API call
//         const result = await OtpVerification(email, code)
//         console.log(result)
//         setTimeout(() => {
//             setLoading(false)
//             console.log("OTP Verified Successfully")
//             onOpenChange(false) // Close modal on successful verification
//         }, 2000)
//     }

//     return (
//         <Dialog open={open} onOpenChange={onOpenChange}>
//             <DialogContent className="sm:max-w-sm">
//                 <DialogHeader>
//                     <DialogTitle className="flex items-center justify-center space-x-2">
//                         OTP Verification
//                     </DialogTitle>
//                     <DialogDescription>
//                         A verification code has been sent to your Email address. Please enter the code to verify your account.
//                     </DialogDescription>
//                 </DialogHeader>

//                 <div className="mt-4 flex justify-center gap-2">
//                     {otp.map((digit, index) => (
//                         <Input
//                             key={index}
//                             ref={(el) => (inputRefs.current[index] = el)}
//                             id={`otp-${index}`}
//                             type="text"
//                             value={digit}
//                             onChange={(e) => handleChange(index, e.target.value)}
//                             onKeyDown={(e) => handleKeyDown(index, e)}
//                             maxLength={1}
//                             className="w-12 text-center text-xl border border-gray-300 rounded-lg focus:ring focus:ring-blue-400"
//                             aria-label={`OTP digit ${index + 1}`}
//                         />
//                     ))}
//                 </div>

//                 <div className="mt-3 text-center text-sm">
//                     {timer > 0 ? (
//                         <span>
//                             Didn’t receive a code? Resend in (<span className="text-red-600">{timer}s</span>)
//                         </span>
//                     ) : (
//                         <button onClick={handleResend} disabled={isResendDisabled} className="text-red-600 underline hover:text-red-700">
//                             Resend Code
//                         </button>
//                     )}
//                 </div>

//                 <DialogFooter className="mt-4">
//                     <Button onClick={() => handleContinue(otp.join(""))} disabled={loading || otp.some((digit) => digit === "")} className="w-full">
//                         {loading ? <Loader className="animate-spin mr-2" /> : "Verify OTP"}
//                     </Button>
//                 </DialogFooter>
//             </DialogContent>
//         </Dialog>
//     )
// }
