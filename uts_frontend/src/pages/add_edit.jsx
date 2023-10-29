import { useEffect, useState } from 'react'
import { 
  getProduct,
  deleteProduct,
  addProduct,
  editProduct
} from '../lib/uts-pwl-api'
import { useLoaderData } from 'react-router-dom'

export async function loader({ params }) {
  if (params.id === undefined) {
    return { data: null }
  }
  const data = await getProduct(params.id)
  return { data }
}

function Add_edit() {
  // from for add and edit product
  const { data } = useLoaderData();
  const [input, setInput] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
  })
  const [isEdit, setIsEdit] = useState(data !== null)

  useEffect(() => {
    if (isEdit) {
      setInput({
        name: data.name,
        price: data.price,
        description: data.description,
        image: data.image,
      })
    }
  }, [data])


  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (isEdit) {
      // edit product
      editProduct({id:data.id, ...input}).then(() => {
        window.location.href = '/product/'+data.id
      })
    } else {
      // add product
      addProduct({...input, image: imageLinkGenerator()}).then(() => {
        window.location.href = '/'
      })
    }
  }
  const imageLinkGenerator = () => {
    const texColor = Math.floor(Math.random()) === 1 ? 'ffffff' : '000000'
    // bg color, random color code
    const bgColor = Math.floor(Math.random() * 16777215).toString(16)
    const imageLink = `http://dummyimage.com/128x128.png/${bgColor}/${texColor}`
    return imageLink;
  }

  return (
    <div className="container m-5">
      <div className="row">
        <div className="col-md-12">
          <a href="/" className="btn btn-secondary">
            Back
          </a>
        </div>
      </div>
      <div className="row m-3">
        <div className="col-md-8 offset-md-2">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Product Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={input.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Product Price</label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                value={input.price}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Product Description</label>
              <textarea
                style={{resize: 'none'}}
                className="form-control"
                id="description"
                name="description"
                value={input.description}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {isEdit ? 'Save' : 'Add'}
            </button>
          </form>
        </div>
        {
          isEdit && (
            <div className="col-md-2">
              <img src={input.image} alt={input.name} />
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Add_edit