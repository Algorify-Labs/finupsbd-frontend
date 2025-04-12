"use client"


import { CompareProvider } from '@/context/CompareContext'
import UserProvider from '@/context/UserContext'
import React from 'react'

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <CompareProvider>
            <UserProvider>
                {children}
            </UserProvider>
        </CompareProvider>
    )
}

export default Providers