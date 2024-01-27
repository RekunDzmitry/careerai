from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def read_root():
    return {"message": "Hello World"}

@app.get("/skills")
async def read_skills():
    return {"skills": ["Python", "JavaScript", "SQL", "Docker"]}
