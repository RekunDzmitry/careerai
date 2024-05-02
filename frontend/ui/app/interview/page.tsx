"use client";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [jobDescription, setJobDescription] = useState("");
  
  const handleStart = () => {
    const jobDescriptionValue = document.getElementById(
      "jobDescription"
    ) as HTMLTextAreaElement;

    if (jobDescriptionValue) {
      const description = jobDescriptionValue.value;
      setJobDescription(description);

      axios
        .post(
          `http://localhost:3003/interview`,
          { jobDescription: description },
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
        });
    }
  };

  return (
    <main className="flex items-center justify-center h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="w-full max-w-2xl mx-auto">
          <h1 className="text-2xl font-semibold mb-6">
            PASTE YOUR JOB DESCRIPTION
          </h1>
          <p className="mb-4">
            To start, copy and paste the job description you want to compare
            your resume to.
            <br />
            Don't have a job in mind yet? Instantly get a free resume review
            with Score My Resume.
          </p>
          <div className="border-2 border-dashed rounded p-4 mb-4">
            <textarea
              id="jobDescription"
              className="w-full h-40 border-gray-300 rounded mt-2 p-2"
              placeholder="Paste the job description here"
            ></textarea>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8"
              onClick={handleStart}
            >
              Start interview
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
