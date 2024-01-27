from fastapi                    import FastAPI, Body, Query
from fastapi.middleware.cors    import CORSMiddleware

import interview_ai             as ai


app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3001",  # Update with your frontend URL/port
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def read_root():
    return {"message": "Hello World"}

@app.post("/interview")
async def start_interview(jobDescription: str = Body(..., embed=True)):
    interview_helper = ai.InterviewAI()
    output = interview_helper.run(jobDescription)
    return output

@app.get("/interview")
async def get_interview(interviewId: str = Query(..., description="The interview ID")):
    interview_helper = ai.InterviewAI()
    output = interview_helper.check_interview_id(interviewId)
    print("output", output)
    return output

@app.post("/calculate")
async def calculate_score(data: dict = Body(...)):
    # Assuming the data has keys "question" and "user_answer"
    print("data", data)
    question = data.get("question")
    user_answer = data.get("user_answer")
    interview_helper = ai.InterviewAI()
    output = interview_helper.mark(question, user_answer)
    print("output", output)
    return output