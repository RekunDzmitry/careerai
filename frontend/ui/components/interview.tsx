"use client";

import axios from "axios";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface Question {
  id: string;
  title: string;
  answered: boolean;
  interviewId: string;
}

interface InterviewProps {
  interviewId: string;
  questions: Question[];
}

export function Interview({ interviewId, questions }: InterviewProps) {
  const router = useRouter();

  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const [questionsCompleted, setQuestionsCompleted] = useState<number>(0);
  const [questionStatus, setQuestionStatus] = useState<{
    [key: string]: boolean;
  }>({});

  const unansweredQuestions = questions.filter(
    (question) => !questionStatus[question.id]
  );

  const currentQuestion = unansweredQuestions[activeQuestionIndex];

  const isQuestionAnswered = (questionId: string) => {
    return questionStatus[questionId] || false;
  };

  const handleQuestionSubmit = async (question: Question) => {
    setQuestionStatus((prevStatus) => ({ ...prevStatus, [question.id]: true }));
    setQuestionsCompleted(questionsCompleted + 1);

    const userAnswer = (
      document.getElementById(`answer${question.id}`) as HTMLTextAreaElement
    )?.value;

    if (!userAnswer || userAnswer.trim() === "") {
      alert("Please provide an answer before submitting.");
      return;
    }

    const requestData = {
      question: question.title,
      userAnswer: userAnswer,
      interviewId: interviewId,
    };

    try {
      const response = await axios.post(
        "http://localhost:3003/calculate",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        console.error("Failed to submit answer. Status:", response.status);
      }
    } catch (error) {
      console.error("Error submitting answer:", error.message);
    }
  };

  useEffect(() => {
    if (unansweredQuestions.length === 0 && questions.length > 0) {
      router.push(`/report/${interviewId}`);
    }
  }, [unansweredQuestions, questions, router, interviewId]);

  if (questions.length === 0) {
    // Handle the case where there are no unanswered questions
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen flex justify-center items-center">
    <div className="w-full max-w-3xl grid grid-cols-1 gap-6">
      <div className="col-span-1 md:col-span-2 flex flex-col">
        <div className="mb-4">
          <Card>
            <CardHeader>
              <CardTitle>Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="progress">Questions Completed</Label>
                <Progress
                  id="progress"
                  max={100}
                  value={questionsCompleted * (100 / questions.length)}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{`You have completed ${questionsCompleted} out of ${questions.length} questions.`}</p>
            </CardContent>
          </Card>
        </div>
        {currentQuestion ? (
          <Card key={currentQuestion.id} className="mb-4">
            <CardHeader>
              <CardTitle>{currentQuestion.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor={`answer${currentQuestion.id}`}>
                  Your Answer
                </Label>
                <Textarea
                  id={`answer${currentQuestion.id}`}
                  placeholder="Type your answer here..."
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className={`w-full ${
                  isQuestionAnswered(currentQuestion.id)
                    ? "bg-gray-500 cursor-not-allowed"
                    : ""
                }`}
                onClick={() => {
                  if (!isQuestionAnswered(currentQuestion.id)) {
                    handleQuestionSubmit(currentQuestion);
                  }
                }}
                disabled={isQuestionAnswered(currentQuestion.id)}
              >
                Submit
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <div>No more questions to answer. Redirecting...</div>
        )}
      </div>
    </div>
    </div>
  );
}
