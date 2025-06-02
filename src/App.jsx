import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Navbar from './components/Navbar'
import PrivateRoute from './routes/PrivateRoute'
import './app.css'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={ <PrivateRoute> <Products /> </PrivateRoute> } />
        <Route path="/product/:id" element={ <PrivateRoute> <ProductDetails /> </PrivateRoute> } />
        <Route path="/cart" element={ <PrivateRoute> <Cart /> </PrivateRoute> } />
      </Routes>
    </>
  )
}

export default App
