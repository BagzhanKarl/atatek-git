"""Default data for role and tariff

Revision ID: ac9a2a2e598d
Revises: e53a75d491f5
Create Date: 2025-05-25 13:48:43.081387

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql import table, column

# revision identifiers, used by Alembic.
revision: str = 'ac9a2a2e598d'
down_revision: Union[str, None] = 'e53a75d491f5'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # Создаем таблицы для вставки данных
    roles = table('roles',
        column('id', sa.Integer),
        column('name', sa.String),
        column('description', sa.String)
    )

    tariffs = table('tariffs',
        column('id', sa.Integer),
        column('name', sa.String),
        column('price', sa.Integer),
        column('t_add_child', sa.Integer),
        column('t_edit_child', sa.Integer),
        column('t_family_count', sa.Integer)
    )

    # Вставляем роли
    op.bulk_insert(roles, [
        {'id': 1, 'name': 'user', 'description': 'Обычный пользователь'},
        {'id': 2, 'name': 'moderator', 'description': 'Модератор системы'},
        {'id': 3, 'name': 'admin', 'description': 'Администратор системы'}
    ])

    # Вставляем тарифы
    op.bulk_insert(tariffs, [
        {
            'id': 1,
            'name': 'Бастау',
            'price': 1000,
            't_add_child': 1,
            't_edit_child': 1,
            't_family_count': 5
        },
        {
            'id': 2,
            'name': 'Сарапшы',
            'price': 2000,
            't_add_child': 3,
            't_edit_child': 3,
            't_family_count': 10
        },
        {
            'id': 3,
            'name': 'Алтын',
            'price': 3000,
            't_add_child': 5,
            't_edit_child': 5,
            't_family_count': 15
        }
    ])


def downgrade() -> None:
    """Downgrade schema."""
    # Удаляем все данные из таблиц
    op.execute('DELETE FROM tariffs')
    op.execute('DELETE FROM roles')
