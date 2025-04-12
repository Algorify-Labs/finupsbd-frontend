"use client"

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EyeIcon, EyeOffIcon, CheckCircle } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { FormItem, FormLabel, FormControl, FormMessage, Form } from '@/components/ui/form';
import { changePassword } from '@/services/AuthService';
import { toast } from 'sonner';

const PasswordChangeForm = () => {
  // State for password visibility toggles
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsloading] = useState(false)

  // Initialize React Hook Form
  const form = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    mode: 'onChange' // Validate on change for real-time feedback
  });

  // Get the current value of the new password for validation display
  const newPassword = form.watch('newPassword');
  const confirmPassword = form.watch('confirmPassword');


  const hasEightChars = newPassword?.length >= 8;
  const hasNumber = /\d/.test(newPassword || '');
  const hasLowercase = /[a-z]/.test(newPassword || '');
  const hasUppercase = /[A-Z]/.test(newPassword || '');
  const passwordsMatch = newPassword === confirmPassword;

  // Handle form submission
  const onSubmit = async (data: any) => {
    setIsloading(true)
    // In a real application, you would call an API to change the password
    console.log('Form submitted successfully', data);

    // Validation before submission
    if (!hasEightChars || !hasNumber || !hasLowercase || !hasUppercase || !passwordsMatch) {
      // If any validation fails, prevent submission
      return;
    }

    const result = await changePassword(data)
    if(result.success){
      toast.success("password change successfully")
    } else {
      toast.error("Please provide valid password")
       setIsloading(false)
    }
  
  };

  // Custom validation component
  const ValidationItem = ({ isValid, text }: { isValid: any, text: any }) => (
    <div className="flex items-center gap-2 text-sm mb-1">
      <CheckCircle
        size={16}
        className={isValid ? "text-green-500" : "text-gray-400"}
        fill={isValid ? "#22c55e" : "none"}
      />
      <span>{text}</span>
    </div>
  );

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Change Password</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Old Password Field */}
            <div className="space-y-1">
              <Label htmlFor="oldPassword" className="text-sm font-medium">
                Old Password*
              </Label>
              <div className="relative">
                <Input
                  id="oldPassword"
                  type={showOldPassword ? "text" : "password"}
                  {...form.register('oldPassword', {
                    required: "Old password is required"
                  })}
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  aria-label={showOldPassword ? "Hide password" : "Show password"}
                >
                  {showOldPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                </button>
              </div>
              {form.formState.errors.oldPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {form.formState.errors.oldPassword.message}
                </p>
              )}
            </div>

            {/* New Password Field */}
            <div className="space-y-1">
              <Label htmlFor="newPassword" className="text-sm font-medium">
                New Password*
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  {...form.register('newPassword', {
                    required: "New password is required",
                    validate: {
                      hasEightChars: (value) => value.length >= 8 || "Password must have at least 8 characters",
                      hasNumber: (value) => /\d/.test(value) || "Password must include at least 1 number",
                      hasLowercase: (value) => /[a-z]/.test(value) || "Password must include at least 1 lowercase letter",
                      hasUppercase: (value) => /[A-Z]/.test(value) || "Password must include at least 1 uppercase letter"
                    }
                  })}
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  aria-label={showNewPassword ? "Hide password" : "Show password"}
                >
                  {showNewPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                </button>
              </div>

              {/* Password Requirements List */}
              <div className="mt-2 space-y-1">
                <ValidationItem isValid={hasEightChars} text="At least 8 characters" />
                <ValidationItem isValid={hasNumber} text="At least 1 number" />
                <ValidationItem isValid={hasLowercase} text="At least 1 lowercase letter" />
                <ValidationItem isValid={hasUppercase} text="At least 1 uppercase letter" />
              </div>

              {form.formState.errors.newPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {form.formState.errors.newPassword.message}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-1">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password*
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  {...form.register('confirmPassword', {
                    required: "Please confirm your password",
                    validate: (value) => value === newPassword || "Passwords do not match"
                  })}
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                </button>
              </div>
              {form.formState.errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {form.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className={`${isLoading ? "w-full bg-gray-400 hover:bg-green-700 text-white" : "w-full bg-green-600 hover:bg-green-700 text-white" }`}
              disabled={!form.formState.isValid || !passwordsMatch}
            >
              {isLoading ? "Changing Password....." : "Change Password"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PasswordChangeForm;