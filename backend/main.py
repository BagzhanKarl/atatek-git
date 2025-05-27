import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title="ATATEK - онлайн шежіре",
    version="3.0.0",
    description="Жаңа нұсқа жаңа фреймворкта FastAPI",
)

from fastapi.exceptions import HTTPException
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

