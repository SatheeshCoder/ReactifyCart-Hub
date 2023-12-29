// src/components/ProductList.js
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addToCart } from "../../Redux/Action/Cart";
import "./style.css"
import Header from "../Header/header";


const truncateText = (text, limit) => {
  const words = text.split(" ");
  if (words.length > limit) {
    return words.slice(0, limit).join(" ") + " ...";
  }
  return text;
};

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setProducts(data.products);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false); // Set loading to false on error
      }
    };

    fetchProducts();
  }, []);
  const handleImageLoad = () => {
    setLoading(false); // Set loading to false when the image has loaded
  };

  const handleImageError = () => {
    setLoading(false); // Set loading to false on image load error
  };
   const handleAddToCart = async (product) => {
     try {
       setLoadingProducts((prevLoading) => [...prevLoading, product.id]);

       // Perform the addToCart action (e.g., API call or any asynchronous operation)
       await addToCart(product);

       // Simulate a delay of 1 minute (adjust the time as needed)
       await new Promise((resolve) => setTimeout(resolve, 1000));
     } catch (error) {
       console.error("Error adding to cart:", error);
     } finally {
       setLoadingProducts((prevLoading) =>
         prevLoading.filter((id) => id !== product.id)
       );
     }
   };

  
  return (
    <div>
      <Header />
      <h1 style={{ textAlign: "center" }}>Product List</h1>

      {loading ? (
        // Show pulsating loader while data is being fetched
        <div className="loader-container">
          <div className="pulsating-loader"></div>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {products.map((product) => (
            <ul
              key={product.id}
              style={{
                listStyle: "none",
                padding: "0",
              }}
            >
              <li
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                <div>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    style={{
                      width: "100%",
                      height: "200px", // Set the desired height for the thumbnail
                      objectFit: "cover",
                      borderRadius: "4px 4px 0 0",
                      display: loading ? "none" : "block",
                    }}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                  />
                  <div style={{ padding: "15px" }}>
                    <h2 style={{ color: "#333", marginTop: "10px" }}>
                      {truncateText(product.title, 1)}
                    </h2>
                    <p style={{ color: "#666" }}>
                      {truncateText(product.description, 2)}
                    </p>{" "}
                    <p style={{ color: "#666" }}>Price: ${product.price}</p>
                    <p style={{ color: "#666" }}>
                      Discount: {product.discountPercentage}%
                    </p>
                    <button
                      style={{
                        width: "100%",
                        height: "40px", // Set the desired fixed height
                        backgroundColor: "#4caf50",
                        color: "#fff",
                        border: "none",
                        padding: "10px",
                        cursor: "pointer",
                        borderRadius: "0 0 4px 4px",
                        position: "relative", // Add position relative to the button
                      }}
                      onClick={() => handleAddToCart(product)}
                    >
                      {loadingProducts.includes(product.id) ? (
                        <div
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            borderRadius: "50%",
                            border: "4px solid #ffffff", // semi-transparent white for the border
                            borderTop: "4px solid red", // green for the actual loader
                            width: "20px",
                            height: "20px",
                            animation: "spin 0.6s linear infinite", // apply the spin animation
                          }}
                        ></div>
                      ) : (
                        "Add to Cart"
                      )}
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          ))}
        </div>
      )}
    </div>
  );
};

export default connect(null, { addToCart })(ProductList);
