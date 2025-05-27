from fastapi import APIRouter, Response
from fastapi.params import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status
from sqlalchemy import text

from src.app.config.response import *
from src.app.db.core import get_db
from src.app.auth.schemas import *
from src.app.auth.service import UsersService
from src.app.config.auth import auth

router = APIRouter()

@router.get("/health-base", response_model=StandardResponse[dict])
@autowrap
async def health_check(db: AsyncSession = Depends(get_db)):
    try:
        # Пробуем выполнить простой запрос к базе
        await db.execute(text("SELECT 1"))
        return {"status": "healthy", "message": "Database connection is working"}
    except Exception as e:
        return {"status": "unhealthy", "message": f"Database connection failed: {str(e)}"}

@router.post("/login", response_model=StandardResponse[UserResponse])
@autowrap
async def login(user_data: LoginUser, response: Response, db: AsyncSession = Depends(get_db)):
    service = UsersService(db)
    new_user = await service.login_user(user_data)
    access_token, refresh_token, csrf_token = auth.create_tokens(
        new_user['id'],
        additional_data={
            "role": new_user['role'],
            "tariff": new_user['tariff']
        }
    )
    auth.set_tokens_in_cookies(response, access_token, refresh_token, csrf_token)
    return new_user

@router.post("/signup", response_model=StandardResponse[UserResponse])
@autowrap
async def signup(user_data: CreateUser, db: AsyncSession = Depends(get_db)):
    service = UsersService(db)
    result = await service.create_new_user(user_data)
    return result

@router.post("/set-address", response_model=StandardResponse[dict])
@autowrap
async def set_address(address: int, user_data = Depends(auth.get_user_data_dependency()), db: AsyncSession = Depends(get_db)):
    service = UsersService(db)
    user = await service.set_address(address, int(user_data["sub"]))
    return user


@router.get("/get-me", response_model=StandardResponse[UserResponse])
@autowrap
async def get_me(user_data = Depends(auth.get_user_data_dependency()), db: AsyncSession = Depends(get_db)):
    service = UsersService(db)
    user = await service.get_user_by_id(int(user_data["sub"]))
    return user
