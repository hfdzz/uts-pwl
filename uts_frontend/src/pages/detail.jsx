import { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { getProduct, deleteProduct } from '../lib/uts-pwl-api'

export async function loader({ params }) {
  const data = await getProduct(params.id)
  return { data }
}

export default function Detail() {
  const { data } = useLoaderData()
  
  return (
    <div className="container m-5">
      <div className="row">
        <div className="col-md-12">
          <a href="/" className="btn btn-secondary">Back</a>
        </div>
      </div>
      <div className="row m-3">
        <div className="col-md-2">
          <img src={data.image} alt={data.name} />
        </div>
        <div className="col-md-6">
          <h3>{data.name}</h3>
          <p><span>Rp</span>{data.price.toString().replace('.',',').replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
          <p>{data.description}</p>
        </div>
      </div>
      <div className="row m-3">
        <a href={'/product/'+data.id+'/edit'} className="btn btn-primary">Edit</a>
        <button href="/" className="btn btn-danger"
          onClick={
            async () => {
              await deleteProduct(data.id)
              window.location.href = '/'
            }
          }
        >Delete</button>
      </div>
    </div>
  )
}