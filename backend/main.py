from fastapi import FastAPI
import os

app = FastAPI()

@app.get("/check-env")
async def check_env():
    # Получаем все переменные окружения
    env_vars = {
        "TEST_VAR": os.getenv("JWT_SECRET_KEY", "Not set"),
        "DB_HOST": os.getenv("DB_HOST", "Not set"),
        "DB_PORT": os.getenv("DB_PORT", "Not set"),
        "DB_NAME": os.getenv("DB_NAME", "Not set"),
        "DB_USER": os.getenv("DB_USER", "Not set"),
    }
    return env_vars
