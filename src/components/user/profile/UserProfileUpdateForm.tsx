"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { updateUserProfile, userInfo } from "@/services/UserData"
import { Award } from "lucide-react"
import { useUserInfo } from "@/hooks/useUserInfo"
import { userProfileSchema } from "./userProfileValidation"
import { useRouter } from "next/navigation"


type UserProfileFormValues = z.infer<typeof userProfileSchema>

export default function UserProfileUpdateForm() {
  const { user } = useUserInfo()
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [image, setImage] = useState<FileList | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()



  // Initialize the form with proper default values
  const form = useForm<UserProfileFormValues>({
    resolver: zodResolver(userProfileSchema),
    // defaultValues: {
    //     nameAsNid: user?.name || "",
    //     nationalIdNumber: "",
    //     gender: undefined,
    //     dateOfBirth: undefined,
    //     address: "",
    //     city: "",
    //   },
  })

  async function onSubmit(data: UserProfileFormValues) {
    try {
      setIsLoading(true)
      console.log("Form data submitted:", data)

      const formData = new FormData();
      formData.append("data", JSON.stringify(data));

      if (image && image.length > 0) {
        formData.append("file", image[0]);
      }

      const response = await updateUserProfile(formData)

      console.log(response, "response")



      if (!response.success) {
        throw new Error("Failed to update profile")
      }

      toast.success("Profile updated successfully")
      router.push('/user/profile')
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files)
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }


  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
              {profileImage ? (
                <Image
                  src={profileImage}
                  alt="Profile"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src="/placeholder.svg"
                  alt="Profile"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <label htmlFor="profile-upload" className="cursor-pointer">
              <div className="mt-1">
                <p className="text-sm text-muted-foreground text-red-500">Upload Profile Photo</p>
                <p className="text-xs text-muted-foreground">Min 600×600, PNG or JPEG</p>
              </div>
              <input
                id="profile-upload"
                type="file"
                accept="image/png, image/jpeg"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
          {/* <Button size="sm" variant="outline" className="mt-2 md:mt-0">
            Update
          </Button> */}
        </div>
        <div className="inline-flex gap-3">
          <Link href="/user/setting/update-email-mobile">
            <Button variant="outline" className="mt-4 md:mt-0">
              Update Email / Phone Number
            </Button>
          </Link>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              defaultValue={user?.profile?.nameAsNid}
              name="nameAsNid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Full Name <span className="text-red-500">*</span>
                    <span className="text-muted-foreground text-xs ml-1">(as per National ID)</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nationalIdNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    National ID Number (NID) <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your NID number" {...field} />
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
                  <FormLabel>
                    Gender <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="MALE">Male</SelectItem>
                      <SelectItem value="FEMALE">Female</SelectItem>
                      <SelectItem value="OTHER">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Date of Birth <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      value={field.value ? format(field.value, 'yyyy-MM-dd') : ''}
                      onChange={(e) => {
                        const date = e.target.value ? new Date(e.target.value) : undefined;
                        field.onChange(date);
                      }}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter your address"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="max-w-xs">
                <FormLabel>
                  City <span className="text-red-500">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="dhaka">Dhaka</SelectItem>
                    <SelectItem value="gazipur">Gazipur</SelectItem>
                    <SelectItem value="chittagong">Chittagong</SelectItem>
                    <SelectItem value="khulna">Khulna</SelectItem>
                    <SelectItem value="rajshahi">Rajshahi</SelectItem>
                    <SelectItem value="sylhet">Sylhet</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}