'use client'

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Form, FormField, FormItem, FormControl } from '@/components/ui/form';
import { useUserInfo } from '@/hooks/useUserInfo';
import { userInfo } from '@/services/UserData';

const ContactUpdateForm = () => {
  // States to track verification status
  const [emailVerified, setEmailVerified] = useState(true);
  const [phoneVerified, setPhoneVerified] = useState(false);
const [user, setUser] = useState<any>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

  console.log(user)
  // Initialize React Hook Form
  const form = useForm();


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const { data } = await userInfo();
        setUser(data);
      } catch (err) {
        setError("Failed to load user profile");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);









  // Form submission handler
  const onSubmit = (data: any) => {
    // In a real application, this would send the data to your backend
    if (emailVerified && phoneVerified) {
      console.log('Contact information updated:', data);
      alert('Contact information updated successfully!');
    } else {
      alert('Please verify both email and phone number before saving.');
    }
  };


  // Handle email verification
  const verifyEmail = () => {
    const email = form.getValues('email');
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailRegex.test(email)) {
      // This would typically trigger an API call to send a verification code
      console.log('Verifying email:', email);
      setEmailVerified(true);
      alert('Verification code sent to your email!');
    } else {
      alert('Please enter a valid email address');
    }
  };



  // Handle phone verification
  const verifyPhone = () => {
    const phone = form.getValues('mobileNumber');
    // Basic phone validation (should be enhanced for production)
    if (phone && phone.length > 8) {
      // This would typically trigger an API call to send a verification code
      console.log('Verifying phone:', phone);
      setPhoneVerified(true);
      alert('Verification code sent to your phone!');
    } else {
      alert('Please enter a valid phone number');
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-sm bg-white">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-6">Update Email/ Mobile number</h2>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div className="flex flex-col md:flex-row md:items-end gap-4">
              <div className="flex-grow space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email*
                </Label>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          {...field} 
                          id="email" 
                          type="email" 
                          defaultValue={user?.email}
                          className={`${emailVerified ? 'border-green-500' : ''}`}
                          disabled={emailVerified}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <Button 
                type="button" 
                onClick={verifyEmail}
                className={`h-10 px-4 ${emailVerified ? 'bg-green-600' : 'bg-green-500'} hover:bg-green-600 text-white`}
                disabled={emailVerified}
              >
                {emailVerified ? 'Verified' : 'Verify'}
              </Button>
            </div>

            {/* Mobile Number Field */}
            <div className="flex flex-col md:flex-row md:items-end gap-4">
              <div className="flex-grow space-y-2">
                <Label htmlFor="mobileNumber" className="text-sm font-medium">
                  Mobile Number*
                </Label>
                <FormField
                  control={form.control}
                  name="mobileNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          {...field} 
                          id="mobileNumber" 
                          type="tel" 
                          defaultValue={user?.phone}
                          className={`${phoneVerified ? 'border-green-500' : ''}`}
                          disabled={phoneVerified}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <Button 
                type="button" 
                onClick={verifyPhone}
                className={`h-10 px-4 ${phoneVerified ? 'bg-green-600' : 'bg-green-500'} hover:bg-green-600 text-white`}
                disabled={phoneVerified}
              >
                {phoneVerified ? 'Verified' : 'Verify'}
              </Button>
            </div>

            {/* Save Button */}
            <Button 
              type="submit" 
              className="h-10 px-8 bg-green-500 hover:bg-green-600 text-white"
              disabled={!emailVerified || !phoneVerified}
            >
              Save update
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ContactUpdateForm;