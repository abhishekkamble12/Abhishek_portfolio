from pydantic import BaseModel, EmailStr, Field


class ContactRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    subject: str = Field(..., min_length=1, max_length=200)
    message: str = Field(..., min_length=1, max_length=2000)


class ContactResponse(BaseModel):
    success: bool
    message: str


# Phase 6 — AI Assistant schemas
class AskRequest(BaseModel):
    question: str = Field(..., min_length=1, max_length=500)


class SourceReference(BaseModel):
    type: str  # "project", "experience", "skill", "certification"
    id: str
    title: str


class AskResponse(BaseModel):
    answer: str
    sources: list[SourceReference]
