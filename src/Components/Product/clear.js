// src/components/Cart.js
import React from "react";
import { connect } from "react-redux";
import { clearCart } from "../../Redux/Action/Cart";

const Cart = ({ cartItems, clearCart }) => {
  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>{item.title}</li>
        ))}
      </ul>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cartItems: state.cart.items,
});

export default connect(mapStateToProps, { clearCart })(Cart);
