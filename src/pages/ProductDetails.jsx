import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { addToCart } = useCart()

  useEffect(() => {
    setLoading(true)
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Product not found')
        return res.json()
      })
      .then(data => {
        setProduct(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [id])

  if (loading) return <div className="loader">Loading product...</div>
  if (error) return <div className="error-message">{error}</div>

  return (
    <div className="container product-details-container">
      <div className="product-details-card">
        <img className="product-details-image" src={product.image} alt={product.title} />
        <div className="product-details-info">
          <h2>{product.title}</h2>
          <p className="product-details-price">${product.price.toFixed(2)}</p>
          <p>{product.description}</p>
          <button className="btn-primary" onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}
export default ProductDetails