import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { useEffect, useState } from "react";
import FadeLoader from "react-spinners/FadeLoader";

type SkillEvaluation = [string, number];

interface ReportData {
  skills: string[];
}

interface ReportProps {
  data: SkillEvaluation[];
}

export function Report({ data }: ReportProps) {
  const [recommendations, setRecommendations] = useState<{ [key: string]: { title: string, description: string }[] }>({});
  const [loading, setLoading] = useState(true);
  const averageMark = data.reduce((sum, item) => sum + item[1], 0) / data.length;

  useEffect(() => {
    const lowScoreSkills = data.filter(([_, score]) => score <= 3).map(([skill, _]) => skill);

    if (lowScoreSkills.length > 0) {
      console.log('Fetching recommendations for:', lowScoreSkills);
      fetch('http://localhost:3003/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ skills: lowScoreSkills }),
      })
        .then(response => response.json())
        .then(data => {
          setRecommendations(data);
          setLoading(false);
        })
        .catch(error => console.error('Error fetching recommendations:', error));
    } else {
    }
  }, [data]);

  return (
    <div className="h-screen flex justify-center items-center">
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <FadeLoader color="#123abc" loading={loading} />
        </div>
      ) : (
        <Card className="w-full max-w-3xl max-h-full overflow-y-auto">
          <CardHeader className="pb-0">
            <CardTitle>Skills Evaluation</CardTitle>
            <CardDescription>A report on the interviewee's skills evaluation.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left py-3 px-4 font-medium first:rounded-tl-lg last:rounded-tr-lg">Skill</th>
                    <th className="text-left py-3 px-4 font-medium first:rounded-tl-lg last:rounded-tr-lg">Evaluation</th>
                  </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index} className={`border-t ${index === data.length - 1 ? 'last:border-b' : ''}`}>
                      <td className="py-3 px-4">{item[0]}</td>
                      <td className="py-3 px-4">{item[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Average mark</h3>
              <p className="text-sm leading-loose">
                Your average mark is {averageMark.toFixed(1)} from 10.
              </p> 
            </div>
           
            <div className="space-y-2">
              <h3 className="font-semibold">Roadmap for Growth</h3>
              <p className="text-sm leading-loose">
                To support the interviewee's professional development, the following roadmap for growth is recommended:
              </p>
              {Object.entries(recommendations).map(([skill, recs], index) => (
                <div key={index} className="space-y-2">
                  <h3 className="font-semibold">{skill}</h3>
                  <ul className="list-disc list-inside text-sm grid gap-2">
                    {recs.map((rec, i) => (
                      <li key={i}>
                        <strong>{rec.title}</strong>: {rec.description}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

