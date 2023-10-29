  /**
   * Get all products from API
   */
const getAllProduct = async () => {
  const response = await fetch('http://127.0.0.1:6543/products');
  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.message);
  }
  return body.products;
}

/**
 * Send POST request to get specific  products detail
 * 
 * Example:
 * 
 * getProduct(1)
 */
const getProduct = async (id) => {
  const response = await fetch('http://127.0.0.1:6543/product', {
      method: 'POST',
      body: JSON.stringify({ id: id }),
  });
  if (response.status !== 200) {
      throw Error(body.message);
  }
  
  const body = await response.json();
  
  if (body.product === null) {
      throw Error('Product not found');
  }
  return body;
}

/**
 * Send POST request to get total price of products
 *   Example request:
 * 
 *  ids = [1, 2, 3]
 */
const getTotalProduct = async (chart_list) => {
    
    const products_id_array = chart_list.map((product) => product.id);
    if (products_id_array.length === 0) return 0;

    const response = await fetch('http://127.0.0.1:6543/total', {
        method: 'POST',
        body: JSON.stringify({ ids: products_id_array }),
    });
    const body = await response.json();

    if (response.status !== 200) {
        throw Error(body.message);
    }
    return body.total;
}

/**
 * Send POST request to add new products
 *  Example request:
 * 
 * {
 *    name: 'Product 1',
 *    price: 1000,
 *    stock: 10,
 *    description: 'Lorem ipsum dolor sit amet,
 * }
 */
const addProduct = async (product) => {
  const response = await fetch('http://127.0.0.1:6543/add', {
        method: 'POST',
        body: JSON.stringify(product),

    });
    const body = await response.json();

    if (response.status !== 200) {
        throw Error(body.message);
    }
    return body;
}

/**
 * Send POST request to edit products
 * Example request:
 * 
 * {
 *    id: 1,
 *    name: 'Product 1',
 *    price: 1000,
 *    stock: 10,
 *    description: 'Lorem ipsum dolor sit amet,
 * }
 * 
 */
const editProduct = async (product) => {
  console.log(product);
  const response = await fetch('http://127.0.0.1:6543/edit', {
        method: 'PUT',
        body: JSON.stringify(product),

    });
    const body = await response.json();

    if (response.status !== 200) {
        throw Error(body.message);
    }
    return body;
}

/**
 * Send POST request to get delete products 
 *  Example request:
 * 
 *  {
 *    id: 1
 *  }
 */
const deleteProduct = async (id) => {
  const response = await fetch('http://127.0.0.1:6543/delete', {
      method: 'DELETE',
      body: JSON.stringify({ id: id }),
  });
  const body = await response.json();

  if (response.status !== 200) {
      throw Error(body.message);
  }
  return body;
}


export { getAllProduct, getTotalProduct, getProduct, addProduct, editProduct, deleteProduct };