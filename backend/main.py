from fastapi import FastAPI
from src.app.config.response import http_exception_handler
from fastapi.exceptions import RequestValidationError, HTTPException
from fastapi.responses import JSONResponse

app = FastAPI(
    title="Jaai.kz Auth Service",
    description="Сервис аутентификации для проекта Jaai.kz, предназначенный для безопасной работы с пользователями и управлением доступом.",
    version="1.0.0",
)

# Обработка HTTP ошибок
app.add_exception_handler(HTTPException, http_exception_handler)

# Обработка ошибок валидации (например, pydantic)
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    return JSONResponse(
        status_code=422,
        content={
            "status": "error",
            "version": "1.0.0",
            "data": {"detail": exc.errors()}
        }
    )
