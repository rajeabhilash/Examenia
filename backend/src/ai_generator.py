import os
import json
from openai import OpenAI
from typing import Dict, Any
from dotenv import load_dotenv
import os

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
)
def generate_challenge_with_ai(difficulty: str) -> Dict[str, Any]:
    system_prompt = """
    You are an expert coding challenge creator. 
    Your task is to generate a coding question with multiple choice answers.
    The question should be appropriate for the specified difficulty level.

    For easy questions: Focus on basic syntax, simple operations, or common programming concepts.
    For medium questions: Cover intermediate concepts like data structures, algorithms, or language features.
    For hard questions: Include advanced topics, design patterns, optimization techniques, or complex algorithms.

    Return the challenge in the following JSON structure:
    {
        "title": "The question title",
        "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
        "correct_answer_id": 0, // Index of the correct answer (0-3)
        "explanation": "Detailed explanation of why the correct answer is right"
    }
    Make sure the options are plausible but with only one clearly correct answer.
    """
    try:
        response = client.chat.completions.create(
            model="gpt-4.1-2025-04-14",
            messages=[
                {
                    "role": "system",
                    "content": system_prompt
                },
                {
                    "role": "user",
                    "content": f"Generate a {difficulty} coding challenge."
                }
            ],
            max_tokens=500,
            response_format={"type": "json_object"},
            temperature=0.7
        )
        content = response.choices[0].message.content
        challenge_data = json.loads(content)
        
        required_fields = ["title", "options", "correct_answer_id", "explanation"]
        for field in required_fields:
            if field not in challenge_data:
                raise ValueError(f"Missing required field: {field}")
            
        return challenge_data
    except Exception as e:
        print(f"Error generating challenge: {e}")
        return {
            "title": "Error generating challenge",
            "options": ["Please try again later", "Contact support", "Check your API key", "None of the above"],
            "correct_answer_id": 0,
            "explanation": "An error occurred while generating the challenge. Please try again later."
        }