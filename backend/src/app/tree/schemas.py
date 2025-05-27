from pydantic import BaseModel, Field
from typing import Optional



class BaseTree(BaseModel):
    id: int = Field(..., description="ID дерева", example=1)
    name: str = Field(..., description="Название дерева", example="Жарты")


