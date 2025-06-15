from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel
from sqlalchemy.orm import Session
from ..database.db import (
    get_challenge_quota,
    create_challenge_quota,
    reset_quota_if_needed,
    create_challenge,
    get_user_challenges
)

from ..utils import authenticate_and_get_user_details
from ..database.models import get_db
from ..ai_generator import generate_challenge_with_ai
import json
from datetime import datetime

router = APIRouter()

class ChallengeRequest(BaseModel):
    difficulty: str
    
    class Config:
        json_schema_extra = {
            "example": {
                "difficulty": "easy"
            }
        }

@router.post("/myhistory")
async def myhistory(
    request: Request,
    db: Session = Depends(get_db)
):
    user_details = authenticate_and_get_user_details(request)
    user_id = user_details.get("user_id")
    challenges = get_user_challenges(db, user_id)
    return {"challenges": [json.loads(challenge.options) for challenge in challenges]}

@router.post("/quota")
async def quota(
    request: Request,
    db: Session = Depends(get_db)
):
    user_details = authenticate_and_get_user_details(request)
    user_id = user_details.get("user_id")
    
    quota = get_challenge_quota(db, user_id)
    
    if not quota:
        return {
            "user_id": user_id,
            "quota_remaining": 50,
            "last_reset_date": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
    
    quota = reset_quota_if_needed(db, user_id)
    
    return quota

@router.post("/generatechallenge")
def generate_challenge(
    request: ChallengeRequest,
    db: Session = Depends(get_db)
):
    try:
        user_details = authenticate_and_get_user_details(request)
        user_id = user_details.get("user_id")
        
        quota = get_challenge_quota(db, user_id)
        if not quota:
            quota = create_challenge_quota(db, user_id)
            
        quota = reset_quota_if_needed(db, user_id)
        if quota.quota_remaining <= 0:
            raise HTTPException(status_code=429, detail="Quota exceeded. Please try again later.")
        challenge_data = None
        
        challenge_data = generate_challenge_with_ai(request.difficulty)
        
        if not challenge_data:
            raise HTTPException(status_code=500, detail="Failed to generate challenge. Please try again later.")
        
        new_challenge = create_challenge(
            db = db,
            difficulty=request.difficulty,
            created_by=user_id,
            **challenge_data
        )
        
        quota.quota_remaining -= 1
        db.commit()
        db.refresh(quota)
        
        return {
            "id": new_challenge.id,
            "title": new_challenge.title,
            "options": json.loads(new_challenge.options),
            "correct_answer_id": new_challenge.correct_answer_id,
            "explanation": new_challenge.explanation,
            "date_created": new_challenge.date_created.strftime("%Y-%m-%d %H:%M:%S"),
        }
        
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid Token: " + str(e))