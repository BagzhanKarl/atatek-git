from fastapi import APIRouter
from fastapi.params import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.app.db.core import get_db
from src.app.config.auth import auth
from src.app.config.response import StandardResponse, autowrap
from src.app.aulet.schemas import *


router = APIRouter(prefix="/api/aulet", tags=["menin-auletim"])


@router.get('/my', response_model=StandardResponse[AuletData])
@autowrap
async def get_aulet_tree(
    user_data = Depends(auth.get_user_data_dependency()),
    db: AsyncSession = Depends(get_db),
):
    pass

@router.post('/my/create', response_model=StandardResponse[AuletData])
@autowrap
async def create_aulet_person(
    user_data = Depends(auth.get_user_data_dependency()),
    db: AsyncSession = Depends(get_db),
):
    pass

@router.put('/my/update/{person_id}', response_model=StandardResponse[AuletData])
@autowrap
async def update_aulet_person(
    person_id: int,
    user_data = Depends(auth.get_user_data_dependency()),
    db: AsyncSession = Depends(get_db),
):
    pass

@router.delete('/my/delete/{person_id}', response_model=StandardResponse[AuletData])
@autowrap
async def delete_aulet_person(
    person_id: int,
    user_data = Depends(auth.get_user_data_dependency()),
    db: AsyncSession = Depends(get_db),
):
    pass