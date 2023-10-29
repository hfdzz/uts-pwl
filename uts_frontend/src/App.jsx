import { useEffect, useState } from 'react'
import { getAllProduct, getTotalProduct } from './lib/uts-pwl-api'
import Card from './components/Card'

function App() {
  const [products_list, setProducts_list] = useState([])
  const [chart_list, setChart_list] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getAllProduct()
      setProducts_list(products)
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    const fetchTotal = async () => {
      const total = await getTotalProduct(chart_list)
      setTotal(total)
    }
    fetchTotal()
  }, [chart_list])

  const addToCart = (product) => {
    setChart_list([...chart_list, product])
  }
  return (
    <>
      <div className="container">
        <div className="row m-4">
          <div className="col-md-8">
            <a href="/add" className="btn btn-secondary">Add New Product</a>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="row">
              {products_list.map((product, key) => (
                <a href={'product/'+product.id} className="col-md-4 card" key={key}>
                  <Card product={product} addToCart={addToCart} />
                </a>
              ))}
            </div>
          </div>
          <div className="col-md-4">
            <h3>Cart</h3>
            <ul className="list-group">
              {chart_list.map((product, key) => (
                <li className="list-group-item" key={key}>
                  <div className="row">
                    <div className="col-md-8">{product.name}</div>
                    <div className="col-md-4">
                      <span>Rp</span>
                      {product.price
                        .toString()
                        .replace('.', ',')
                        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="row">
              <div className="col-md-8">Total</div>
              <div className="col-md-4">
                <span>Rp</span>
                {
                  total
                    .toFixed(2)
                    .toString()
                    .replace('.', ',')
                    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                }
                {
                  chart_list.length !== 0 &&
                  (
                    <button className="btn btn-primary"
                      onClick={() => {
                        alert('Checkout success')
                        setChart_list([])
                      }}
                    >Checkout</button>
                  )
                }
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">Total Item</div>
              <div className="col-md-4">{chart_list.length}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
