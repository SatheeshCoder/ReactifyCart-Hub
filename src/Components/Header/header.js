// src/components/Header.js
import React, { useState } from "react";
import { connect } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import Cart from "../Cart/cart"; // Import the Cart component

const Header = ({ cartCount }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div style={headerStyle}>
      <h1>My Online Store</h1>
      <div style={cartStyle} onClick={toggleCart}>
        <FaShoppingCart size={20} style={{ marginRight: "5px" }} />
        <span style={cartCountStyle}>{cartCount}</span>
      </div>
      {isCartOpen && <Cart onClose={toggleCart} />}{" "}
      {/* Render Cart component when isCartOpen is true */}
    </div>
  );
};


const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px",
  backgroundColor: "#333",
  color: "#fff",
};

const cartStyle = {
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
};

const cartCountStyle = {
  marginLeft: "5px", // Add some space between the icon and the count
  backgroundColor: "#ff4500", // Orange background color
  color: "#fff",
  borderRadius: "50%", // Make it a circle
  padding: "5px 8px", // Add some padding
};

const mapStateToProps = (state) => ({
  cartCount: state.cart.items.length,
});

export default connect(mapStateToProps)(Header);
