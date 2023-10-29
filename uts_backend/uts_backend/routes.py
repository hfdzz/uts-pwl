def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/')
    config.add_route('add', '/add')
    config.add_route('products', '/products')
    config.add_route('edit', '/edit')
    config.add_route('delete', '/delete')
    config.add_route('total', '/total')
    config.add_route('product_detail', '/product')
    