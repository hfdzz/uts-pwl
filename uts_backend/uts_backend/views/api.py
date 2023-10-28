from pyramid.view import view_config, view_defaults
from pyramid.response import Response
from sqlalchemy.exc import SQLAlchemyError

from .. import models

# send response with CORS headers added
def cors_response(data):
    response = Response(json=data)
    response.headers.update({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Max-Age': '1728000',
    })
    return response

@view_defaults(renderer='json')
class ProductView:
    def __init__(self, request):
        self.request = request

    @view_config(route_name='products', request_method='GET')
    def get_products(self):
        """
        Get all products from database and return as JSON.
       
        return {'products': products_json:list}

        Example response:\n
        {"products": [\n
                {\n
                    "description": "A small, lightweight and powerful laptop",\n
                    "id": 1,\n
                    "image": "https://www.notebookcheck.net/uploads/tx_nbc2/4zu3_01.jpg",\n
                    "name": "MacBook Air",\n
                    "price": 999.99\n
                },\n
                {\n
                    "description": "A small, lightweight and powerful laptop",\n
                    "id": 2,\n
                    "image": "https://www.notebookcheck.net/uploads/tx_nbc2/4zu3_01.jpg",\n
                    "name": "MacBook Air",\n
                    "price": 999.99\n
                }\n
            ]
        }
        """
        try:
            query = self.request.dbsession.query(models.Product)
            products = query.limit(1).offset(0).all()
            products_json = []
            for product in products:
                products_json.append(product.to_json())
        except SQLAlchemyError:
            return Response(db_err_msg, content_type='text/plain', status=500)
        return cors_response({'products': products_json})
    
    @view_config(route_name='add', request_method='POST')
    def add_product(self):
        """
        Add a new product to database.

        Example request body:\n
        {\n
            "name": "MacBook Air",\n
            "price": 999.99,\n
            "description": "A small, lightweight and powerful laptop",\n
            "image": "https://www.notebookcheck.net/uploads/tx_nbc2/4zu3_01.jpg"\n
        }
        """
        try:
            product = models.Product(
                name=self.request.json_body['name'],
                price=self.request.json_body['price'],
                description=self.request.json_body['description'],
                image=self.request.json_body['image']
            )
            self.request.dbsession.add(product)
            self.request.dbsession.flush()
            self.request.dbsession.refresh(product)
        except SQLAlchemyError:
            return Response(db_err_msg, content_type='text/plain', status=500)
        return cors_response(product.to_json())
    
    @view_config(route_name='edit', request_method='PUT')
    def edit_product(self):
        """
        Edit a product in database.

        Example request body:\n
        {\n
            "id": 1,\n
            "name": "MacBook Air",\n
            "price": 999.99,\n
            "description": "A small, lightweight and powerful laptop",\n
            "image": "https://www.notebookcheck.net/uploads/tx_nbc2/4zu3_01.jpg"\n
        }
        """
        try:
            product = self.request.dbsession.query(models.Product).filter(models.Product.id == self.request.json_body['id']).one()
            product.name = self.request.json_body['name']
            product.price = self.request.json_body['price']
            product.description = self.request.json_body['description']
            product.image = self.request.json_body['image']
            self.request.dbsession.flush()
            self.request.dbsession.refresh(product)
        except SQLAlchemyError:
            return Response(db_err_msg, content_type='text/plain', status=500)
        return cors_response(product.to_json())
    
    @view_config(route_name='delete', request_method='DELETE')
    def delete_product(self):
        """
        Delete a product from database.

        Example request body:\n
        {\n
            "id": 1\n
        }
        """
        try:
            product = self.request.dbsession.query(models.Product).filter(models.Product.id == self.request.json_body['id']).one()
            self.request.dbsession.delete(product)
        except SQLAlchemyError:
            return Response(db_err_msg, content_type='text/plain', status=500)
        return cors_response(product.to_json())
    
    @view_config(route_name='total', request_method='POST')
    def get_total(self):
        """
        Get price total from products.

        Example request body:\n
        {\n
            "ids": [1, 2]\n
        }
        """
        try:
            total = 0
            for id in self.request.json_body['ids']:
                product = self.request.dbsession.query(models.Product).filter(models.Product.id == id).one()
                total += product.price
        except SQLAlchemyError:
            return Response(db_err_msg, content_type='text/plain', status=500)
        return cors_response({'total': total})
    
    @view_config(route_name='product_detail', request_method='POST')
    def get_product_detail(self):
        """
        Get detail of a product from database base on given produc ID.

        Example request body:\n
        {\n
            "id": 1\n
        }
        """
        try:
            product = self.request.dbsession.query(models.Product).filter(models.Product.id == self.request.json_body['id']).one()
        except SQLAlchemyError:
            return Response(db_err_msg, content_type='text/plain', status=500)
        return cors_response(product.to_json())
    


db_err_msg = """\
ERRROR: Database error.
"""