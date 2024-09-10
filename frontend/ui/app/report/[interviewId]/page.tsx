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
    <div>
      <Report data={report} />
    </div>
  );
}
