from pymongo import MongoClient

import os

MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)

db = client["focuspilot_db"]
users_collection = db["users"]
