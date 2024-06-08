import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { useEffect, useState } from "react";

type SkillEvaluation = [string, number];

interface ReportData {
  skills: string[];
}

interface ReportProps {
  data: SkillEvaluation[];
}

export function Report({ data }: ReportProps) {
  const [recommendations, setRecommendations] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const lowScoreSkills = data.filter(([_, score]) => score <= 3).map(([skill, _]) => skill);

    if (lowScoreSkills.length > 0) {
      fetch('http://localhost:3003/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ skills: lowScoreSkills }),
      })
        .then(response => response.json())
        .then(data => setRecommendations(data))
        .catch(error => console.error('Error fetching recommendations:', error));
    }
  }, [data]);

  return (
    <Card className="w-full max-w-3xl">
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
          <h3 className="font-semibold">Strengths</h3>
          <p className="text-sm leading-loose italic">
            The interviewee excelled in communication, problem solving, and teamwork, demonstrating strong collaborative
            skills and the ability to articulate ideas effectively.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold">Weaknesses</h3>
          <p className="text-sm leading-loose italic">
            While the interviewee's performance was generally positive, there are areas that require further
            development. Notably, the interviewee's leadership skills were assessed as average, indicating room for
            growth in this area.
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
  );
}

