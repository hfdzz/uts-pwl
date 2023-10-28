from sqlalchemy import (
    Column,
    Index,
    Integer,
    Text,
    Float
)

from .meta import Base


class Product(Base):
    __tablename__ = 'product'
    id = Column(Integer, primary_key=True)
    name = Column(Text)
    price = Column(Float)
    description = Column(Text)
    image = Column(Text)

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price,
            'description': self.description,
            'image': self.image
        }


Index('product_index', Product.name, unique=False, mysql_length=255)
