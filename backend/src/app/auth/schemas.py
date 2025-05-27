from pydantic import BaseModel, Field
from typing import Optional
from src.app.role.schemas import BaseRole
from src.app.tariff.schemas import BaseTariff

class CreateUser(BaseModel):
    first_name: str = Field(..., min_length=2, max_length=50, example="John")
    last_name: str = Field(..., min_length=2, max_length=50, example="Doe")
    middle_name: Optional[str] = Field(None, min_length=2, max_length=50, example="John")                               
    password: str = Field(..., min_length=8, max_length=100, example="password")
    phone: str = Field(..., example="+77761174378")


class UserResponse(BaseModel):
    id: int = Field(..., example=1)                             
    first_name: str = Field(..., example="John")
    last_name: str = Field(..., example="Doe")
    middle_name: Optional[str] = Field(None, example="John")
    phone: str = Field(..., example="+77761174378")
    role: Optional[BaseRole] = Field(None)
    tariff: Optional[BaseTariff] = Field(None)
    
                                                                                        
    
class LoginUser(BaseModel):
    phone: str = Field(..., example="+77761174378")
    password: str = Field(..., example="password")


