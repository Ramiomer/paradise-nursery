import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './App.css';

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  // Total cost of a single plant line (unit price x quantity)
  const calculateTotalCost = (item) => item.cost * item.quantity;

  // Total amount of the whole cart
  const calculateTotalAmount = () =>
    cart.reduce((total, item) => total + calculateTotalCost(item), 0);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // Quantity would reach 0, so remove the item
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    alert('Coming Soon');
  };

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>
      <div className="cart-total">Total Cart Amount: ${calculateTotalAmount()}</div>

      {cart.length === 0 && <p className="empty-cart">Your cart is empty.</p>}

      {cart.map((item) => (
        <div className="cart-item" key={item.name}>
          <img src={item.image} alt={item.name} />
          <div className="cart-item-details">
            <h3>{item.name}</h3>
            <div>Unit price: ${item.cost}</div>
            <div className="quantity-controls">
              <button onClick={() => handleDecrement(item)} aria-label="Decrease quantity">-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleIncrement(item)} aria-label="Increase quantity">+</button>
            </div>
            <div>Total: ${calculateTotalCost(item)}</div>
          </div>
          <button className="delete-button" onClick={() => handleRemove(item)}>
            Delete
          </button>
        </div>
      ))}

      <div className="cart-actions">
        <button className="continue-button" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        <button className="checkout-button" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartItem;
