from fastapi import APIRouter, HTTPException
from fastapi.params import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from src.app.db.core import get_db
from src.app.config.auth import auth
from src.app.config.response import StandardResponse, autowrap
from src.app.family.schemas import *
from src.app.family.service import FamilyService

router = APIRouter(prefix="/api/family", tags=["family"])


@router.get('/tree', response_model=StandardResponse[FamilyTree])
@autowrap
async def get_family_tree(user_data = Depends(auth.get_user_data_dependency()), db: AsyncSession = Depends(get_db)):
    service = FamilyService(db)
    return await service.get_family_tree(int(user_data["sub"]))

