from fastapi import HTTPException
from src.app.family.models import Family
from src.app.family.schemas import *
from src.app.tariff.models import Tariff, UserTariff

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from typing import Optional

class FamilyService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_access_count(self, user_id: int) -> bool:
        user_tariff = await self.db.execute(select(UserTariff).where(UserTariff.user_id == user_id))
        user_tariff = user_tariff.scalars().first()
        if user_tariff:
            tariff = await self.db.execute(select(Tariff).where(Tariff.id == user_tariff.tariff_id))
            tariff = tariff.scalars().first()
            if tariff:
                count = await self.db.execute(select(Family).where(Family.user_id == user_id))
                data = count.scalars().all()
                if tariff.t_family_count > len(data):
                    return True
        return False
    
    async def get_family_tree(self, user_id: int) -> FamilyTree:
        data = await self.db.execute(select(Family).where(Family.user_id == user_id))
        data = data.scalars().all()
        return FamilyTree(
            nodes=[
                FamilyResponse(
                    id=node.id,
                    full_name=node.full_name,
                    date_of_birth=node.date_of_birth,
                ).model_dump()
                for node in data
            ]
        ).model_dump()
