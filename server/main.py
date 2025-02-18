from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

# Mock database (later, replace with real DB)
waitlist_db = set()

class WaitlistEntry(BaseModel):
    email: str

@app.post("/waitlist")
async def add_to_waitlist(entry: WaitlistEntry):
    if entry.email in waitlist_db:
        raise HTTPException(status_code=400, detail="Email already registered.")
    
    waitlist_db.add(entry.email)
    return {"message": f"Successfully added {entry.email} to waitlist!"}
