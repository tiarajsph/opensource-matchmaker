from fastapi import FastAPI
from matcher import run_matching_pipeline

app = FastAPI()

@app.get("/")
def home():
    return {"message": "OpenSource Matchmaker API is running"}

@app.get("/recommend/{username}")
def recommend(username: str):
    matches = run_matching_pipeline(username)
    return {"recommendations": matches}