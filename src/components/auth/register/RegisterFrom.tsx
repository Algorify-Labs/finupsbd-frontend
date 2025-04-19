"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import logo from "/public/logo.png";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { registerUser } from "@/services/AuthService";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { registerValidationSchema } from "./registerValidation";

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState<string | null>("");
  const [openOtpVerificition, setOpenOtpVerificition] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof registerValidationSchema>>({
    resolver: zodResolver(registerValidationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof registerValidationSchema>) {
    setIsLoading(true);
    setServerError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
      // Handle successful registration
      const result = await registerUser(data);
      console.log(result);

      if (!result.success) {
        toast.error("Registration failed. Please try again");
      }
      toast.success(result.message);

      if (result.success) {
        router.push("/login");
      }
      setEmail(data.email);
      setOpenOtpVerificition(true);
    } catch (error: any) {
      setServerError("Registration failed. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  // const handleSocialLogin = (provider: "google" | "apple") => {
  //   // Implement social login logic
  //   console.log(`Logging in with ${provider}`);
  // };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="mb-8">
        <Image src={logo} alt="Logo" className="mx-auto mb-4 w-full" />
      </div>
      <Card className="w-full max-w-lg rounded-md border-[#D0D5DD] text-secondary shadow-gray-200">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-green-950">
            Create New Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {serverError && (
                <div className="text-center text-sm text-red-500">
                  {serverError}
                </div>
              )}

              <div className="space-y-4">
                {/* Name Field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your full name"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone Field */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+880XXXXXXXXX"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          {...field}
                          disabled={isLoading}
                          placeholder="Enter your password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Confirm Password */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          {...field}
                          disabled={isLoading}
                          placeholder="Type your password again"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </Form>

          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline hover:text-primary">
              Login
            </Link>
          </div>

          {/* <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="w-full"
              type="button"
              onClick={() => handleSocialLogin("google")}
              disabled={isLoading}
            >
              <Google className="mr-2 h-4 w-4" /> Google
            </Button>
            <Button
              variant="outline"
              className="w-full"
              type="button"
              onClick={() => handleSocialLogin("apple")}
              disabled={isLoading}
            >
              <Apple className="mr-2 h-4 w-4" /> Apple
            </Button>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
}
