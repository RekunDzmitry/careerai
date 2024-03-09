'use client'

import axios from "axios";
import { useEffect, useState } from 'react';
import { Interview } from "@/components/interview";


export default function Page({ params }: { params: { interviewId: string } }) {
  console.log("params", params)

  const fetchInterviewData = async (interviewId: string) => {
    try {
      const response = await axios.get(`http://localhost:3003/interview`, {
        params: {
          interviewId: interviewId,
        },
      });
    
      return response.data;

    } catch (error) {
      console.error('Axios request failed:', error.message);
    }
  }

  const [questions, setQuestions] = useState<Array<any>>([]);

  useEffect(() => {
    (async () => {
      try {
        const fetchedQuestions = await fetchInterviewData(params.interviewId);
        setQuestions(fetchedQuestions);
      } catch (error) {
        console.error('Error fetching interview data:', error.message);
      }
    })();
  }, [params.interviewId]);

  return <div>
    <Interview interviewId={params.interviewId} questions={questions} />
  </div>
}