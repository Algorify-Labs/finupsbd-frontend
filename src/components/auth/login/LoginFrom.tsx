"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/services/AuthService";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { loginValidationSchema } from "./loginValidation";
import logo from "/public/logo.png";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirectPath") || "/";
  const router = useRouter();

  const form = useForm<z.infer<typeof loginValidationSchema>>({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  console.log(rememberMe);

  async function onSubmit(data: z.infer<typeof loginValidationSchema>) {
    setIsLoading(true);
    setServerError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const result = await loginUser({ ...data, rememberMe });
      if (result.success) {
        toast.success("Login successfuly");
        router.push(redirectPath);
      } else {
        toast.error(result?.message);
      }
    } catch (error: any) {
      setServerError("Login failed. Please try again later.");
      toast.error("Login failed. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleSocialLogin = (provider: "google" | "apple") => {
    console.log(`Logging in with ${provider}`);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="mb-8">
        <Image src={logo} alt="Logo" className="mx-auto mb-4 w-full" />
      </div>
      <Card className="w-full max-w-lg rounded-md border-[#D0D5DD] text-secondary shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-green-950">
            Login
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
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
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
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            {...field}
                            disabled={isLoading}
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="accent-primary"
                  />
                  <span>Remember me</span>
                </label>
                <Link
                  href="/forgot-password"
                  className="underline hover:text-primary"
                >
                  Forgot password?
                </Link>
              </div>
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link href="/register" className="underline hover:text-primary">
              Register
            </Link>
          </div>
          {/* <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div> */}
          {/* <div className="flex gap-4">
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
