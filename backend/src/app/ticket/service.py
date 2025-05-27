from src.app.ticket.models import *
from src.app.ticket.schemas import *
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

class TicketService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create_ticket(self, data: TicketCreate):
        # Создаем основной тикет
        ticket = Ticket(
            ticket_type=data.ticket_type,
            status=data.status,
            created_by=data.created_by,
            answered_by=data.answered_by
        )
        self.db.add(ticket)
        await self.db.flush()

        # Создаем связанные данные в зависимости от типа тикета
        if data.ticket_type == "add_data" and data.add_data:
            add_data_entries = [
                TicketAddData(
                    ticket_id=ticket.id,
                    parent_id=entry.parent_id,
                    name=entry.name
                )
                for entry in data.add_data
            ]
            self.db.add_all(add_data_entries)
        elif data.ticket_type == "edit_data" and data.edit_data:
            edit_data = TicketEditData(
                ticket_id=ticket.id,
                tree_id=data.edit_data.tree_id,
                new_name=data.edit_data.new_name,
                new_bio=data.edit_data.new_bio,
                new_birth=data.edit_data.new_birth,
                new_death=data.edit_data.new_death
            )
            self.db.add(edit_data)
            await self.db.flush()

        await self.db.commit()
        await self.db.refresh(ticket)

        # Получаем полные данные для ответа
        if data.ticket_type == "add_data":
            query = select(TicketAddData).where(TicketAddData.ticket_id == ticket.id)
            result = await self.db.execute(query)
            add_data = result.scalars().all()
            return TicketResponse(
                id=ticket.id,
                ticket_type=ticket.ticket_type.value,
                status=ticket.status.value,
                created_by=ticket.created_by,
                answered_by=ticket.answered_by,
                add_data=[{
                    'id': item.id,
                    'ticket_id': item.ticket_id,
                    'parent_id': item.parent_id,
                    'name': item.name
                } for item in add_data]
            ).model_dump()
        else:
            query = select(TicketEditData).where(TicketEditData.ticket_id == ticket.id)
            result = await self.db.execute(query)
            edit_data = result.scalars().first()
            
            edit_data_dict = None
            if edit_data:
                edit_data_dict = {
                    'id': edit_data.id,
                    'ticket_id': edit_data.ticket_id,
                    'tree_id': edit_data.tree_id,
                    'new_name': edit_data.new_name,
                    'new_bio': edit_data.new_bio,
                    'new_birth': edit_data.new_birth,
                    'new_death': edit_data.new_death
                }

            return TicketResponse(
                id=ticket.id,
                ticket_type=ticket.ticket_type.value,
                status=ticket.status.value,
                created_by=ticket.created_by,
                answered_by=ticket.answered_by,
                edit_data=edit_data_dict
            ).model_dump()

    async def get_tickets_by_user(self, user_id: int):
        # Получаем все тикеты пользователя
        query = select(Ticket).where(Ticket.created_by == user_id)
        result = await self.db.execute(query)
        tickets = result.scalars().all()
        
        tickets_response = []
        for ticket in tickets:
            # Для каждого тикета получаем связанные данные
            if ticket.ticket_type == "add_data":
                query = select(TicketAddData).where(TicketAddData.ticket_id == ticket.id)
                result = await self.db.execute(query)
                add_data = result.scalars().all()
                tickets_response.append(TicketResponse(
                    id=ticket.id,
                    ticket_type=ticket.ticket_type.value,
                    status=ticket.status.value,
                    created_by=ticket.created_by,
                    answered_by=ticket.answered_by,
                    add_data=[{
                        'id': item.id,
                        'ticket_id': item.ticket_id,
                        'parent_id': item.parent_id,
                        'name': item.name
                    } for item in add_data]
                ).model_dump())
            else:
                query = select(TicketEditData).where(TicketEditData.ticket_id == ticket.id)
                result = await self.db.execute(query)
                edit_data = result.scalars().first()
                
                edit_data_dict = None
                if edit_data:
                    edit_data_dict = {
                        'id': edit_data.id,
                        'ticket_id': edit_data.ticket_id,
                        'tree_id': edit_data.tree_id,
                        'new_name': edit_data.new_name,
                        'new_bio': edit_data.new_bio,
                        'new_birth': edit_data.new_birth,
                        'new_death': edit_data.new_death
                    }
                
                tickets_response.append(TicketResponse(
                    id=ticket.id,
                    ticket_type=ticket.ticket_type.value,
                    status=ticket.status.value,
                    created_by=ticket.created_by,
                    answered_by=ticket.answered_by,
                    edit_data=edit_data_dict
                ).model_dump())
        
        return tickets_response

    async def get_ticket_details(self, ticket_id: int):
        # Получаем основной тикет
        query = select(Ticket).where(Ticket.id == ticket_id)
        result = await self.db.execute(query)
        ticket = result.scalars().first()
        
        if not ticket:
            return None
        
        # Получаем связанные данные в зависимости от типа тикета
        if ticket.ticket_type == "add_data":
            query = select(TicketAddData).where(TicketAddData.ticket_id == ticket.id)
            result = await self.db.execute(query)
            add_data = result.scalars().all()
            return TicketResponse(
                id=ticket.id,
                ticket_type=ticket.ticket_type.value,
                status=ticket.status.value,
                created_by=ticket.created_by,
                answered_by=ticket.answered_by,
                add_data=[{
                    'id': item.id,
                    'ticket_id': item.ticket_id,
                    'parent_id': item.parent_id,
                    'name': item.name
                } for item in add_data]
            ).model_dump()
        else:
            query = select(TicketEditData).where(TicketEditData.ticket_id == ticket.id)
            result = await self.db.execute(query)
            edit_data = result.scalars().first()
            
            edit_data_dict = None
            if edit_data:
                edit_data_dict = {
                    'id': edit_data.id,
                    'ticket_id': edit_data.ticket_id,
                    'tree_id': edit_data.tree_id,
                    'new_name': edit_data.new_name,
                    'new_bio': edit_data.new_bio,
                    'new_birth': edit_data.new_birth,
                    'new_death': edit_data.new_death
                }
            
            return TicketResponse(
                id=ticket.id,
                ticket_type=ticket.ticket_type.value,
                status=ticket.status.value,
                created_by=ticket.created_by,
                answered_by=ticket.answered_by,
                edit_data=edit_data_dict
            ).model_dump()
        
