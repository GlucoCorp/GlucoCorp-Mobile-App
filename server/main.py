from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, EmailStr
import uvicorn
import os
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Add CORS middleware with detailed logging
origins = [
    "https://glucorp.org",
    "http://glucorp.org",
    "https://www.glucorp.org",
    "http://www.glucorp.org"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock database
waitlist_db = set()

class WaitlistEntry(BaseModel):
    email: EmailStr

@app.get("/")
async def root():
    logger.info("Root endpoint accessed")
    return {"status": "alive", "message": "API is working"}

@app.post("/waitlist")
async def add_to_waitlist(entry: WaitlistEntry):
    logger.info(f"Received waitlist request for email: {entry.email}")
    
    if entry.email in waitlist_db:
        logger.warning(f"Duplicate email attempt: {entry.email}")
        return JSONResponse(
            status_code=400,
            content={"detail": "Email already registered."}
        )
    
    waitlist_db.add(entry.email)
    logger.info(f"Successfully added {entry.email} to waitlist")
    return JSONResponse(
        status_code=200,
        content={"message": f"Successfully added {entry.email} to waitlist!"}
    )

@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    logger.error(f"Global error: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error occurred."}
    )

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    logger.info(f"Starting server on port {port}")
    uvicorn.run(app, host="0.0.0.0", port=port)