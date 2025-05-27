from fastapi import FastAPI
from src.app.config.response import http_exception_handler
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONRespons
from fastapi.exceptions import HTTPException


app = FastAPI(
    title="ATATEK - онлайн шежіре",
    version="3.0.0",
    description="Жаңа нұсқа жаңа фреймворкта FastAPI",
)

app.add_exception_handler(HTTPException, http_exception_handler)

# Обработка ошибок валидации (например, pydantic)
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    return JSONResponse(
        status_code=422,
        content={
            "status": "error",
            "version": "3.0.0",
            "data": {"detail": exc.errors()}
        }
    )

