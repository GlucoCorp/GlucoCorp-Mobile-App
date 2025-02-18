from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import uvicorn
import os 

app = FastAPI()

# Add CORS middleware with specific origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://glucorp.org", "http://glucorp.org"],  # Your actual domain
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type"],
)

# Mock database (later, replace with real DB)
waitlist_db = set()

class WaitlistEntry(BaseModel):
    email: EmailStr

@app.post("/waitlist")
async def add_to_waitlist(entry: WaitlistEntry):
    if entry.email in waitlist_db:
        raise HTTPException(status_code=400, detail="Email already registered.")
    
    waitlist_db.add(entry.email)
    return {"message": f"Successfully added {entry.email} to waitlist!"}

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)