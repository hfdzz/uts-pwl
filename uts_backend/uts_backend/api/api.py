from pyramid.view import view_config
from pyramid.response import Response



@view_config(route_name='test', renderer='json', request_method='GET')
def test(request):
    print(f'[GET_request] from {request.remote_addr}')
    return Response(json_body={'message': 'Hello World!'}, headers={'Access-Control-Allow-Origin': 'http://127.0.0.1:5173'})


@view_config(route_name='test', renderer='json', request_method='POST')
def test_post(request):
    print(f'[POST_request] from {request.remote_addr}')
    return Response(json_body={'message': 'Hello World!'}, headers={'Access-Control-Allow-Origin': 'http://127.0.0.1:5173'})