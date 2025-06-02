import React, { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { addToCart } = useCart()

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch products')
        return res.json()
      })
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="loader">Loading products...</div>
  if (error) return <div className="error-message">{error}</div>

  return (
    <div className="products-container">
      {products.map(prod => (
        <div className="product-card" key={prod.id}>
          <Link to={`/product/${prod.id}`}>
            <img className="product-image" src={prod.image} alt={prod.title} />
          </Link>
          <h3 className="product-title">{prod.title}</h3>
          <p className="product-price">${prod.price.toFixed(2)}</p>
          <button className="add-cart-btn" onClick={() => addToCart(prod)}>Add to Cart</button>
        </div>
      ))}
    </div>
  )
}

export default Products
