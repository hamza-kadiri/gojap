"""empty message

Revision ID: 9da78184af12
Revises: 3df92cdd2df0
Create Date: 2020-02-03 01:22:37.080525

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9da78184af12'
down_revision = '3df92cdd2df0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('table', sa.Column(
        'current_command_id', sa.Integer(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('table', 'current_command_id')
    # ### end Alembic commands ###
