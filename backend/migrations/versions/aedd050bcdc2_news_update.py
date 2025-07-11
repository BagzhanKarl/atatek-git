"""news update

Revision ID: aedd050bcdc2
Revises: eeb1795af8f0
Create Date: 2025-06-17 12:16:34.118798

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'aedd050bcdc2'
down_revision: Union[str, None] = 'eeb1795af8f0'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('news_tags',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.add_column('page_news', sa.Column('views', sa.Integer(), nullable=False))
    op.add_column('page_news', sa.Column('tags', sa.ARRAY(sa.Integer()), nullable=False))
    # ### end Alembic commands ###


def downgrade() -> None:
    """Downgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('page_news', 'tags')
    op.drop_column('page_news', 'views')
    op.drop_table('news_tags')
    # ### end Alembic commands ###
