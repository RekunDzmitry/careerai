'use client'

import axios from "axios";
import { useEffect, useState } from 'react';
import { Report } from "@/components/report";
import FadeLoader from "react-spinners/FadeLoader";

interface ReportProps {
  params: {
    interviewId: string;
  };
}

export default function Page({ params }: ReportProps ) {
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
    }
  }

  const [report, setReport] = useState<ReportData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const fetchedReport = await fetchReport(params.interviewId);
        setReport(fetchedReport);
      } catch (error) {
        console.error('Error fetching interview data:', error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [params.interviewId]);

  return (
    <div>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <FadeLoader color="#123abc" loading={loading} />
        </div>
      ) : (
        <Report data={report} />
      )}
    </div>
  );
}
