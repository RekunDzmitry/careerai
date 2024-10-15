CREATE TABLE InterviewQuestions (
    interview_id TEXT,
    skill TEXT,
    question TEXT,
    user_answer TEXT,
    correct_answer TEXT,
    score INTEGER
);

CREATE TABLE interview_attempts (
    user_id VARCHAR(255) NOT NULL,
    start_dt TIMESTAMP NOT NULL,
    interview_id VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id, interview_id)
);
