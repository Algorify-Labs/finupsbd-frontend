import React, { Suspense } from 'react';
import LoginFrom from '@/components/auth/login/LoginFrom';
import { Loader2 } from 'lucide-react';

const LoginPage = () => {
  return (
    <div>
      <Suspense fallback={<Loader2 className="mr-2 h-4 w-4 animate-spin" />}>
        <LoginFrom />
      </Suspense>
    </div>
  )
}

export default LoginPage