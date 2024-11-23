"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

export default function Component() {
  const [showImage, setShowImage] = useState(false);
  const [showText, setShowText] = useState(false);

  const router = useRouter();
  const [jobDescription, setJobDescription] = useState("");
  const { userId } = useAuth();
  console.log ("User ID: ",userId)


  const handleStart = () => {
    const jobDescriptionValue = document.getElementById(
      "jobDescription"
    ) as HTMLTextAreaElement;

    if (jobDescriptionValue && userId) {
      const description = jobDescriptionValue.value;
      setJobDescription(description);

      axios
        .post(
          `http://localhost:3003/interview`,
          { jobDescription: description, userId: userId },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("Skills output:", response.data);
          const interviewId = response.data;
          console.log("interviewId:", interviewId);
          router.push(`/interview/${interviewId}`);
        })
        .catch((error) => {
          console.error("There was a problem with the Axios request:", error);
          router.push("/error");
        });
    }
  };

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
      <div className="flex-1 flex flex-col items-center justify-center py-6" style={{ backgroundImage: `url('/interview.jpg')`, backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', position: 'relative', minHeight: '50vh' }}>
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
      
      
<div className="container mx-auto my-10 px-4">
    <h2 className="text-2xl font-bold text-center mb-8">
      Frequently Asked Questions
    </h2>
    <div className="faq max-w-3xl mx-auto">
      <details>
        <summary>What is this platform about?</summary>
        <p>
          Our platform provides AI-powered interview preparation to help you ace
          your job interviews.
        </p>
      </details>

      <details>
        <summary>How can I sign up?</summary>
        <p>
          You can sign up by clicking the 'Sign Up' button at the top of the
          page and following the registration steps.
        </p>
      </details>

      <details>
        <summary>Can I use it for free?</summary>
        <p>
          Yes, you can use it for free for 3 times a day.
        </p>
      </details>
    </div>
  </div>

  {/* Стили для FAQ */}
  <style jsx>{`
    .faq {
      margin-bottom: 40px;
    }
    details {
      background-color: #f7f7f7;
      padding: 15px;
      border: 1px solid #ddd;
      border-radius: 5px;
      margin-bottom: 10px;
      cursor: pointer;
    }
    summary {
      font-weight: bold;
      outline: none;
    }
    details p {
      padding-top: 10px;
      margin: 0;
      color: #333;
    }
  `}</style>

      <footer className="p-4 border-t border-gray-200 dark:border-gray-800">
  <div className="container mx-auto flex justify-center">
    <div className="flex space-x-8">
      <div className="flex flex-col items-center space-y-2">
        <a
          className="font-bold text-gray-900 dark:text-gray-50"
          href="/Terms and Conditions.txt"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms and Conditions
        </a>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          Read our terms and conditions
        </p>
      </div>
      
      <div className="flex flex-col items-center space-y-2">
        <a
          className="font-bold text-gray-900 dark:text-gray-50"
          href="/Privacy Policy.txt"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          Review our privacy policy
        </p>
      </div>
    </div>
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
