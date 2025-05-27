from fastapi import APIRouter
from fastapi.params import Depends
from sqlalchemy.ext.asyncio import AsyncSession


from src.app.db.core import get_db
from src.app.config.auth import auth
from src.app.config.response import StandardResponse, autowrap
from src.app.pages.service import PageService
from src.app.pages.schemas import *


router = APIRouter(prefix="/api/pages", tags=["pages"])

@router.post("/create", response_model=StandardResponse[PageResponse])
@autowrap
async def create_page(page: CreatePage, user_data = Depends(auth.get_user_data_dependency()), db: AsyncSession = Depends(get_db)):
    user_id = int(user_data["sub"])
    service = PageService(db)
    return await service.create_page(page, user_id)

@router.get("/{page_id}", response_model=StandardResponse[PageResponse])
@autowrap
async def get_page_by_id(page_id: int, user_data = Depends(auth.get_user_data_dependency()), db: AsyncSession = Depends(get_db)):
    service = PageService(db)
    return await service.get_page_by_id(page_id)
