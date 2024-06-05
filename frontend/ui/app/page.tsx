"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Component() {
  const [showImage, setShowImage] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowImage(true);
    }, 500);
    setTimeout(() => {
      setShowText(true);
    }, 1000);
  }, []);

  return (
    <div key="1" className="flex flex-col min-h-screen relative">
      <header className="flex items-center justify-between p-4 border-b border-gray-200 sm:p-6 dark:border-gray-800">
        <div className="flex items-center space-x-4">
          <nav className="hidden space-x-4 text-sm font-medium lg:flex">
            <Link
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="/"
            >
              Home
            </Link>
            <Link
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="/pricing"
            >
              Pricing
            </Link>
          </nav>
        </div>
        <div className="space-x-4 text-sm lg:flex">
          <Link
            href="/sign-in"
            className="text-gray-500 hover:underline dark:text-gray-400 dark:hover:underline"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="text-gray-500 hover:underline dark:text-gray-400 dark:hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </header>
      <div className="flex-1 flex flex-col items-center justify-center py-6" style={{ backgroundImage: `url('/interview.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', position: 'relative', height: '100vh' }}>
      <div className="absolute inset-0 bg-black opacity-60"></div>
    <div className="container flex flex-col items-center justify-center space-y-4 text-center" style={{ position: 'relative', width: '100%', height: '100%' }}>
        {showText && (
            <div
                className={`flex flex-col items-center justify-center absolute inset-0 ${
                    showText ? "animate-slide-in-right" : ""
                }`}
                style={{ fontSize: 'clamp(1rem, 2vw, 2rem)', color: 'white' }}
            >
                <h1>Interview like a pro.</h1>
                <p className="max-w-[600px] text-black-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-black-400">
                    Unlock your career potential with our AI-powered interview
                    prep startup.
                </p>
            </div>
        )}
    </div>
</div>
      
      <main>
        <div>
        <p className="max-w-[600px] text-black-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-black-400">
                  lorem ipsum
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>

                </p>
        </div>
      </main>

      <footer className="grid gap-4 p-4 border-t border-gray-200 items-center justify-center sm:p-6 md:grid-cols-2 lg:grid-cols-4 dark:border-gray-800">
        <div className="space-y-2">
          <Link className="font-bold text-gray-900 dark:text-gray-50" href="#">
            Terms and Conditions
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Read our terms and conditions
          </p>
        </div>
        <div className="space-y-2">
          <Link className="font-bold text-gray-900 dark:text-gray-50" href="#">
            FAQ
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Have any questions? Find answers here
          </p>
        </div>
        <div className="space-y-2">
          <Link className="font-bold text-gray-900 dark:text-gray-50" href="#">
            Privacy Policy
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Review our privacy policy
          </p>
        </div>
      </footer>
    </div>
  );
}

function ChevronDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
