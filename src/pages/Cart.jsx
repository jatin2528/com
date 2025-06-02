import React from 'react'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart()

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (cart.length === 0)
    return <div className="container"><h3>Your cart is empty</h3></div>

  return (
    <div className="container cart-container">
      {cart.map(item => (
        <div className="cart-item" key={item.id}>
          <img className="cart-item-image" src={item.image} alt={item.title} />
          <div className="cart-item-info">
            <h4>{item.title}</h4>
            <p>${item.price.toFixed(2)}</p>
          </div>
          <div className="cart-item-actions">
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={e => updateQuantity(item.id, Number(e.target.value))}
              className="cart-quantity-input"
            />
            <button className="btn-remove" onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        </div>
      ))}
      <div className="cart-summary">
        Total: ${totalPrice.toFixed(2)}
      </div>
    </div>
  )
}
