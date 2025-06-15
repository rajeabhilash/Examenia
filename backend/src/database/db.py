from sqlalchemy.orm import Session
from datetime import datetime, timedelta

from . import models

def get_challenge_quota(db: Session, user_id: str):
    return db.query(models.ChallengeQuota).filter(models.ChallengeQuota.user_id == user_id).first()

def create_challenge_quota(db: Session, user_id: str):
    new_quota = models.ChallengeQuota(user_id=user_id, quota_remaining=50, last_reset_date=datetime.now())
    db.add(new_quota)
    db.commit()
    db.refresh(new_quota)
    return new_quota

def reset_quota_if_needed(db: Session, user_id: str):
    now = datetime.now()
    if now - quota.last_reset_date > timedelta(hours=24):
        quota.quota_remaining = 10
        quota.last_reset_date = now
        db.commit()
        db.refresh(quota)
    return quota

def create_challenge(
        db: Session, 
        difficulty: str,
        created_by: str,
        title: str,
        options: str,
        correct_answer_id: int,
        explanation: str,
    ):
    challenge = models.Challenge(
        difficulty=difficulty,
        created_by=created_by,
        title=title,
        options=options,
        correct_answer_id=correct_answer_id,
        explanation=explanation
    )
    db.add(challenge)
    db.commit()
    db.refresh(challenge)
    return challenge

def get_user_challenges(db: Session, user_id: str):
    return db.query(models.Challenge).filter(models.Challenge.created_by == user_id).all()