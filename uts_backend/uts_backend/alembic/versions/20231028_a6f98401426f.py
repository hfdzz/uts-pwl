"""new

Revision ID: a6f98401426f
Revises: 9196b8fc570e
Create Date: 2023-10-28 17:37:47.951134

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a6f98401426f'
down_revision = '9196b8fc570e'
branch_labels = None
depends_on = None

def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('product', 'price',
               existing_type=sa.INTEGER(),
               type_=sa.Float(),
               existing_nullable=True)
    # ### end Alembic commands ###

def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('product', 'price',
               existing_type=sa.Float(),
               type_=sa.INTEGER(),
               existing_nullable=True)
    # ### end Alembic commands ###