import { useState } from 'react'

function Card({product, addToCart}) {

    return (
    <>
        <div className='card-img-top'>
            <img src={product.image} alt={product.name} sizes='128' />
        </div>
        <div className='card-body'>
            <h5 className='card-title'>{product.name}</h5>
            <p className='card-text'><span>Rp</span>{product.price.toString().replace('.',',').replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
            <button className='btn btn-primary'
                onClick={(e) => {
                    e.preventDefault()
                    addToCart(product)
                }}
            >
                Add to cart
            </button>
        </div>
    </>
    )
}

export default Card
