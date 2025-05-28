from src.app.tariff.models import *
from sqlalchemy.ext.asyncio import AsyncSession

class TariffService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def _change_edit_count(self, user_id: int) -> bool:
        query = select(UserTariff).where(UserTariff.user_id == user_id)
        result = await self.db.execute(query)
        result = result.scalars().first()
        if not result:
            raise HTTPException(status_code=404, detail="Тариф не найден")
        
        if result.t_edit_child > 0:
            result.t_edit_child -= 1
            await self.db.commit()
            await self.db.refresh(result)
            return True
        else:
            return False
    
    async def _change_add_count(self, user_id: int, count: int = None) -> bool:
        query = select(UserTariff).where(UserTariff.user_id == user_id)
        result = await self.db.execute(query)
        result = result.scalars().first()
        if not result:
            raise HTTPException(status_code=404, detail="Тариф не найден")
        
        if count:
            result.t_add_child += count
        else:
            result.t_add_child -= 1
        await self.db.commit()
        await self.db.refresh(result)
        return True
        
        
