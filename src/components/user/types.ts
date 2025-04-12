export interface UserData {
    id: string
    userId: string
    name: string
    email: string
    phone: string
    password: string
    pin: string
    pinExpiry: string
    verificationToken: string | null
    resetPasswordToken: string | null
    resetPasswordExpiry: string | null
    role: string
    emailVerified: boolean
    isActive: boolean
    createdAt: string
    updatedAt: string
    lastLogin: string
    profile: any | null
  }
  
  