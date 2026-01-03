from db import users_collection
from jwt_utils import create_access_token
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from schemas import UserRegister, UserLogin
from auth import hash_password, verify_password
from dependencies import get_current_user
from fastapi import Depends


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Backend is running"}


@app.post("/register")
def register(user: UserRegister):
    existing_user = users_collection.find_one({"email": user.email})

    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    hashed_password = hash_password(user.password)

    users_collection.insert_one({
        "email": user.email,
        "password": hashed_password
    })

    return {
        "message": "User registered successfully",
        "email": user.email
    }
@app.post("/login")
def login(user: UserLogin):
    db_user = users_collection.find_one({"email": user.email})

    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    access_token = create_access_token(
    data={"sub": db_user["email"]}
)
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }
@app.get("/protected")
def protected_route(current_user: str = Depends(get_current_user)):
    return {
        "message": "You are authenticated",
        "email": current_user
    }

