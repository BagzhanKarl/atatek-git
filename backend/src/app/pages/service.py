from src.app.auth.models import User
from src.app.pages.models import *
from src.app.pages.schemas import *
from src.app.role.service import RoleService
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException
from sqlalchemy import select


class PageService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.role_service = RoleService(db)

    async def create_page(self, page: CreatePage, user_id: int) -> PageResponse:
        user_role = await self.role_service.get_user_role(user_id)
        if user_role != 3:
            raise HTTPException(status_code=403, detail="У вас нет прав на создание страниц")
        try:
            existing_page = await self.db.execute(select(Page).where(Page.tree_id == page.tree_id))
            if existing_page.scalar_one_or_none():
                raise HTTPException(status_code=400, detail="Страница с таким деревом уже существует")
            
            new_page = Page(
                title=page.title,
                tree_id=page.tree_id,
                bread1=page.bread1,
                bread2=page.bread2,
                bread3=page.bread3,
                main_gen=page.main_gen,
                main_gen_child=page.main_gen_child,
            )
            self.db.add(new_page)
            await self.db.commit()
            await self.db.refresh(new_page)

            return PageResponse(
                id=new_page.id,
                title=new_page.title,
                tree=BaseTree(id=new_page.tree_id, name=new_page.tree.name),
                bread1=new_page.bread1,
                bread2=new_page.bread2,
                bread3=new_page.bread3,
                main_gen=new_page.main_gen,
                main_gen_child=new_page.main_gen_child,
                moderators=None,
            ).model_dump()
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))

    async def get_page_by_id(self, page_id: int) -> PageResponse:
        try:
            page = await self.db.execute(select(Page).where(Page.id == page_id))
            result = page.scalars().first()
            if not result:
                raise HTTPException(status_code=404, detail="Страница не найдена")
            
            moderators = await self.db.execute(select(User).join(UserPage).where(UserPage.page_id == page_id))
            moderators_list = [
                BaseUser(
                    id=moderator.id, 
                    first_name=moderator.first_name, 
                    last_name=moderator.last_name, 
                    phone=moderator.phone
                    ).model_dump()
                    for moderator in moderators.scalars().all()
                ]

            return PageResponse(
                id=result.id,
                title=result.title,
                tree=BaseTree(id=result.tree_id, name=result.tree.name),
                bread1=result.bread1,
                bread2=result.bread2,
                bread3=result.bread3,
                main_gen=result.main_gen,
                main_gen_child=result.main_gen_child,
                moderators=moderators_list,
            ).model_dump()
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))
