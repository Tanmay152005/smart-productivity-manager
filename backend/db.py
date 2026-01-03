from pymongo import MongoClient

MONGO_URI = "mongodb+srv://tanmay152005_db_user:kaavfkcmD3v4ZJhA@focuspilot-cluster.r1ntda3.mongodb.net/?appName=focuspilot-cluster"

client = MongoClient(MONGO_URI)

db = client["focuspilot_db"]
users_collection = db["users"]
