from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import uvicorn
import os 

app = FastAPI()

# Make CORS more permissive for testing
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for testing
    allow_credentials=False,  # Set to False when using allow_origins=["*"]
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
    expose_headers=["*"],
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

# Add a test endpoint to verify the API is working
@app.get("/")
async def root():
    return {"message": "API is working"}

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)