'use client'

import axios from "axios";

import { useState, FormEvent } from 'react';
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs"
import { CardTitle, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

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
  const initialActiveQuestion = questions.length > 0 ? questions[0].id : null;
  const [activeQuestion, setActiveQuestion] = useState<string | null>(initialActiveQuestion);
  const [questionsCompleted, setQuestionsCompleted] = useState<number>(0);
  const [questionStatus, setQuestionStatus] = useState<{ [key: string]: boolean }>({});

  const isQuestionAnswered = (questionId: string) => {
    return questionStatus[questionId] || false;
  };

  const handleTabChange = (value: string) => {
    setActiveQuestion(value);
  };

  const handleQuestionSubmit = async (question: Question) => {
    // Find the question by id and mark it as answered
    setQuestionStatus(prevStatus => ({ ...prevStatus, [question.id]: true }));

    // Update the state with the modified questions and increment Questions Completed
    setQuestionsCompleted(questionsCompleted + 1);

    const userAnswer = (document.getElementById(`answer${question.id}`) as HTMLTextAreaElement)?.value;

    if (!userAnswer || userAnswer.trim() === "") {
      // Check if the user's answer is empty
      alert("Please provide an answer before submitting.");
      return;
    }

    const requestData = {
      question: question.title,
      userAnswer: userAnswer,
      interviewId: interviewId
    };

    try {
      const response = await axios.post("http://localhost:3003/calculate", requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Handle the response if needed
      if (!response.status === 200) {
        // Handle non-successful responses (e.g., show an error message)
        console.error("Failed to submit answer. Status:", response.status);
        // You can add more error handling here if necessary
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("Error submitting answer:", error.message);
      // You can add more error handling here if necessary
    }
  };

  if (!initialActiveQuestion) {
    // Handle the case where there are no questions
    return <div>No questions available</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="col-span-1 md:col-span-2">
        <Tabs className="w-full" defaultValue="0" onChange={(event: FormEvent<HTMLDivElement>) => handleTabChange((event.target as HTMLDivElement).id)}>
          <TabsList>
            {questions.map(question => (
              <TabsTrigger key={question.id} value={question.id} />
            ))}
          </TabsList>
          {questions.map(question => (
            <TabsContent key={question.id} value={question.id}>
              <Card>
                <CardHeader>
                  <CardTitle>{question.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor={`answer${question.id}`}>Your Answer</Label>
                    <Textarea id={`answer${question.id}`} placeholder="Type your answer here..." />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className={`w-full ${isQuestionAnswered(question.id) ? 'bg-gray-500 cursor-not-allowed' : ''}`}
                onClick={() => {
                  if (!isQuestionAnswered(question.id)) {
                    handleQuestionSubmit(question);
                  }
                }}
                disabled={isQuestionAnswered(question.id)}>Submit</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      <div className="col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="progress">Questions Completed</Label>
              <Progress id="progress" max={100} value={questionsCompleted * (100 / questions.length)} />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{`You have completed ${questionsCompleted} out of ${questions.length} questions.`}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
