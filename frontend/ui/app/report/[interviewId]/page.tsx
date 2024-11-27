'use client'

import axios from "axios";
import { useEffect, useState } from 'react';
import { Report } from "@/components/report";
import { useRouter } from "next/navigation";

interface ReportProps {
  params: {
    interviewId: string;
  };
}

export default function Page({ params }: ReportProps ) {
  
  const router = useRouter();
  
  const fetchReport = async (interviewId: string) => {
    try {
      const response = await axios.get(`http://localhost:3003/report`, {
        params: {
          interviewId: interviewId,
        },
      });
      console.log('Axios request successful:', response.data);
    
      return response.data;

    } catch (error) {
      console.error('Axios request failed:', error.message);
      router.push("/error");
    }
  }

  const [report, setReport] = useState<ReportData[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const fetchedReport = await fetchReport(params.interviewId);
        setReport(fetchedReport);
      } catch (error) {
        console.error('Error fetching interview data:', error.message);
        router.push("/error");
      }
    })();
  }, [params.interviewId]);

  return (
    <div className="relative min-h-screen">
    {/* Навигационные кнопки */}
    <div className="absolute top-4 right-4 flex space-x-4">
      <button 
        onClick={() => router.push('/')}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Main Page
      </button>
      <button 
        onClick={() => router.push('/interview')}
        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
      >
        Start Interview
      </button>
    </div>

    <Report data={report} />
  </div>
);
}
