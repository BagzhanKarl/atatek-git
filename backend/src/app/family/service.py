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

    async def _set_partners(self, husband_id: int, wife_id: int) -> bool:
        husband = await self.db.execute(select(Family).where(Family.id == husband_id))
        husband = husband.scalars().first()
        wife = await self.db.execute(select(Family).where(Family.id == wife_id))
        wife = wife.scalars().first()
        if husband and wife:
            if husband.partners_id is None:
                husband.partners_id = []
            if wife.partners_id is None:
                wife.partners_id = []
                
            if wife_id not in husband.partners_id:
                husband.partners_id = husband.partners_id + [wife_id]
            if husband_id not in wife.partners_id:
                wife.partners_id = wife.partners_id + [husband_id]

            await self.db.flush()
            return True
        return False

    async def _set_father(self, node_id: int, father_id: int) -> bool:
        node = await self.db.execute(select(Family).where(Family.id == node_id))
        node = node.scalars().first()
        if node:
            node.father_id = father_id
            await self.db.flush()
            return True
        return False

    async def _set_mother(self, node_id: int, mother_id: int) -> bool:
        node = await self.db.execute(select(Family).where(Family.id == node_id))
        node = node.scalars().first()
        if node:
            node.mother_id = mother_id
            await self.db.flush()
            return True
        return False

    async def create_node(
            self, 
            user_id: int,
            node: FamilyCreate,
            father_id: int = None,
            mother_id: int = None,
            partner_id: int = None,
            ) -> FamilyResponse:
        try:
            # Проверка существования связанных узлов
            if father_id:
                father = await self.db.execute(select(Family).where(Family.id == father_id))
                father = father.scalars().first()
                if not father:
                    raise HTTPException(status_code=404, detail="Отец не найден")
            
            if mother_id:
                mother = await self.db.execute(select(Family).where(Family.id == mother_id))
                mother = mother.scalars().first()
                if not mother:
                    raise HTTPException(status_code=404, detail="Мать не найдена")
            
            if partner_id:
                partner = await self.db.execute(select(Family).where(Family.id == partner_id))
                partner = partner.scalars().first()
                if not partner:
                    raise HTTPException(status_code=404, detail="Партнер не найден")

            new_node = Family(
                user_id=user_id,
                full_name=node.full_name,
                date_of_birth=node.date_of_birth,
                is_alive=node.is_alive,
                death_date=node.death_date,
                bio=node.bio,
                sex=node.sex,
                img='https://cdn.atatek.kz/family/default.png',
            )
            self.db.add(new_node)
            await self.db.flush()

            # Валидация пола при установке связей
            if father_id and node.sex.lower() == 'male':
                raise HTTPException(status_code=400, detail="Нельзя установить отца для мужчины")
            if mother_id and node.sex.lower() == 'female':
                raise HTTPException(status_code=400, detail="Нельзя установить мать для женщины")

            if father_id:
                await self._set_father(new_node.id, father_id)
            if mother_id:
                await self._set_mother(new_node.id, mother_id)
            if partner_id:
                await self._set_partners(new_node.id, partner_id)

            return FamilyResponse(
                id=new_node.id,
                full_name=new_node.full_name,
                date_of_birth=new_node.date_of_birth,
                is_alive=new_node.is_alive,
                death_date=new_node.death_date,
                bio=new_node.bio,
                sex=new_node.sex,
                fid=new_node.father_id,
                mid=new_node.mother_id,
                pids=new_node.partners_id,
                user_id=new_node.user_id,
            ).model_dump()
        except HTTPException:
            raise
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Ошибка при создании узла: {str(e)}")
