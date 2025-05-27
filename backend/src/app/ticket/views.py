from fastapi import APIRouter, Response
from fastapi.params import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from src.app.config.response import *
from src.app.db.core import get_db
from src.app.ticket.service import TicketService
from src.app.ticket.schemas import *

router = APIRouter()

@router.post("/create", response_model=StandardResponse[TicketResponse])
@autowrap
async def create_ticket(ticket: TicketCreate, db: AsyncSession = Depends(get_db)):
    service = TicketService(db)
    new_ticket = await service.create_ticket(ticket)
    return new_ticket

@router.get("/my", response_model=StandardResponse[List[TicketResponse]])
@autowrap
async def get_tickets_by_user(user_id: int, db: AsyncSession = Depends(get_db)):
    service = TicketService(db)
    tickets = await service.get_tickets_by_user(user_id)
    return tickets


@router.get("/details/{ticket_id}", response_model=StandardResponse[TicketResponse])
@autowrap
async def get_ticket_details(ticket_id: int, db: AsyncSession = Depends(get_db)):
    service = TicketService(db)
    ticket = await service.get_ticket_details(ticket_id)
    return ticket

