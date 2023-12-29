// src/components/Cart.js
// src/components/Cart.js
import React from "react";
import { connect } from "react-redux";
import { clearCart } from "../../Redux/Action/Cart";

const Cart = ({ cartItems, clearCart,onClose }) => {
  return (
    <div style={cartContainerStyle}>
      <h2>Shopping Cart</h2>
      <button onClick={onClose}>Close Cart</button>

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


const cartContainerStyle = {
  position: "fixed",
  top: "0",
  right: "0",
  height: "100%",
  width: "300px",
  backgroundColor: "#fff",
  boxShadow: "-4px 0 10px rgba(0, 0, 0, 0.1)",
  padding: "20px",
  boxSizing: "border-box",
  overflowY: "auto",
  color:"red",
  transition: "transform 0.3s ease-in-out",
};


