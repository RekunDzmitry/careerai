"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useRouter } from 'next/navigation';
import { SignIn } from '@clerk/nextjs';

const SignInPage = () => {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Перенаправление только после монтирования компонента
    if (isSignedIn) {
      router.push('/interview');
    }
  }, [isSignedIn, router]);

  // Пока выполняется перенаправление, ничего не рендерим
  if (isSignedIn) {
    return null;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn />
    </div>
  );
};

export default SignInPage;