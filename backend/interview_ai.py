import json
import hashlib
import uuid
import psycopg2

from langchain.prompts.chat import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    SystemMessagePromptTemplate,
)

from dotenv                         import load_dotenv

from langchain.prompts              import PromptTemplate
from langchain.chat_models          import ChatOpenAI
from langchain.output_parsers       import StructuredOutputParser, ResponseSchema

load_dotenv()

class InterviewAI:
    def __init__(self):
        self.model = ChatOpenAI(temperature=0, model_name="gpt-3.5-turbo")

        self.conn = psycopg2.connect(
            host="postgres",
            password="admin",
            user="admin",
            database="interview"
        )
    
    def hash_request(self, request):
        hash_object = hashlib.md5(request.encode())
        return hash_object.hexdigest()

    def _parse_json(self, output, key="skills"):
        parsed_output = output.replace ("`",'').replace ("\n",'').replace ("\t",'')

        json_start = parsed_output.find('{')
        json_data = parsed_output[json_start:]

        try:
            data_dict = json.loads(json_data)
            result_list = data_dict.get(key, [])
            return result_list
        except json.JSONDecodeError as e:
            print("JSONDecodeError", e)
            return []

    def parse_skills(self, question):
        response_schemas = [
            ResponseSchema(
                name="skills",
                description="""
                    python list with the skills needed for this job
                """
            )
        ]
        output_parser = StructuredOutputParser.from_response_schemas(response_schemas)

        format_instructions = output_parser.get_format_instructions()
        system_prompt = SystemMessagePromptTemplate.from_template(
            (
                """
                You are AI recruitment IT assistant that parse IT job description
                and return list of skills required for this job.
                Skills must be short and very concrete.
                You answer ONLY about IT professions 
                - if profession is not about IT - return nothing
                {format_instructions}
                """
            )
        )
        
        human_prompt = HumanMessagePromptTemplate.from_template(
            ("""
                QUESTION: ```{question}```
            """)
        )

        chat_prompt = ChatPromptTemplate.from_messages(
            [system_prompt, human_prompt]
        )

        output = self.model(
            chat_prompt.format_prompt(
                question=question, format_instructions=format_instructions
            ).to_messages()
        )

        parsed_output = self._parse_json(output, "skills")
        return parsed_output

    def generate_questions(self, skill):
        response_schemas = [
            ResponseSchema(
                name="questions", description="Python list with the questions for job interviews"
            )
        ]
        output_parser = StructuredOutputParser.from_response_schemas(response_schemas)

        format_instructions = output_parser.get_format_instructions()
        system_prompt = SystemMessagePromptTemplate.from_template(
            (
                """
                    You are AI recruitment IT assistant that ask questions
                    about current skill.
                    If skill is about coding, for example library name or programming language name,
                    you must ask also questions with code examples.
                    Please, ask at least one question, and not more than 5 questions.
                    Provide questions in python list format.
                    {format_instructions}
                """
            )
        )

        human_prompt = HumanMessagePromptTemplate.from_template(
            ("""
                skill: ```{skill}```
            """)
        )

        chat_prompt = ChatPromptTemplate.from_messages(
            [system_prompt, human_prompt]
        )

        output = self.model(
            chat_prompt.format_prompt(
                skill=skill, format_instructions=format_instructions
            ).to_messages()
        )
        print("output",output)
        parsed_output = self._parse_json(output.content, "questions")
        return parsed_output

    def save_questions_to_db(self, interview_id, questions):
        cur = self.conn.cursor()
        for question in questions:
            cur.execute("""
                INSERT INTO public."InterviewQuestions" (interview_id, question) 
                VALUES (%s, %s)""", (interview_id, question)
            )
            print("question",question)
        self.conn.commit()
        cur.close()
    
    def check_interview_id(self, interview_id):
        cur = self.conn.cursor()
        cur.execute("""
            SELECT interview_id, question FROM public."InterviewQuestions"
            WHERE interview_id = %s
            LIMIT 10
        """, (interview_id,))
        result = cur.fetchall()
        cur.close()
        if not result:
            return result
        return [{"id": str(q_id), "title": result[1]} for q_id, result in enumerate(result)]

    def mark(self, question, user_answer):
        response_schemas = [
            ResponseSchema(name="answer_mark", description="python list with 2 elements - right answer for the question and mark (from 1 to 10) for user answer")
        ]
        output_parser = StructuredOutputParser.from_response_schemas(response_schemas)

        format_instructions = output_parser.get_format_instructions()
        system_prompt = SystemMessagePromptTemplate.from_template(
            ("""
                You are AI reviewer of user's answers on interview questions. 
                You get a question and user's answer to it.
                You must return right answer and return mark for this answer from 1 to 10.
                {format_instructions}
            """)
        )

        human_prompt = HumanMessagePromptTemplate.from_template(
            ("""
                QUESTION: ```{question}```
                USER ANSWER: ```{user_answer}```
            """)
        )

        chat_prompt = ChatPromptTemplate.from_messages(
            [system_prompt, human_prompt]
        )

        output = self.model(
            chat_prompt.format_prompt(
                question=question, user_answer=user_answer, format_instructions=format_instructions
            ).to_messages()
        )
        parsed_output = self._parse_json(output.content, "answer_mark")
        return parsed_output

    def run(self, input_str):
        final_questions = []
        interview_id = self.hash_request(input_str)
        cached_data = self.check_interview_id(interview_id)
        if cached_data:
            print("cached_data",cached_data)
            return interview_id
        skills = self.parse_skills(input_str)
        print("skills",skills)
        for skill in skills:
            if not skill:
                return None
            questions = self.generate_questions(skill)
            print("generated questions",questions)
            final_questions.extend(questions)
        print("final_questions",questions)
        self.save_questions_to_db(interview_id, final_questions)
        return interview_id


if __name__ == "__main__":
    interview_helper = InterviewAI()
    output = interview_helper.mark(
        "What is ETL and how does it work?",
        "I don't know"
    )
    print("output",output)
