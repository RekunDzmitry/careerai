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
          <Link
            href="/pricing"
            className="text-gray-500 hover:underline dark:text-gray-400 dark:hover:underline"
          >
            Pricing
          </Link>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center py-6">
        <div className="container flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2"
               style={{ zIndex: -1 }}>
            {showImage && (
              <Image
                src="/interview.jpg"
                alt="Interview image"
                className={`absolute top-0 left-0 w-full h-full object-cover ${
                  showImage ? "animate-slide-in" : ""
                }`}
                width={1920}
                height={1080}
                priority
              />
            )}
            {showText && (
              <div
                className={`absolute top-1/3 left-2/3 transform translate-x-1/2 text-4xl font-bold tracking-tighter ${
                  showText ? "animate-slide-in-right" : ""
                }`}
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
