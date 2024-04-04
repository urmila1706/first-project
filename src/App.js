import React, { useState, useEffect } from "react"; // Import React and necessary hooks

import "./index.css"; // Import the CSS file for styling

function App() {
  const [products, setProducts] = useState([]); // Initialize state for products
  const [productId, setProductId] = useState(""); // Initialize state for product ID input
  const [sellingPrice, setSellingPrice] = useState(""); // Initialize state for selling price input
  const [productName, setProductName] = useState(""); // Initialize state for product name input
  const [totalValue, setTotalValue] = useState(0); // Initialize state for total value

  // Load products from local storage on component mount
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")); // Retrieve stored products from local storage
    if (storedProducts) {
      setProducts(storedProducts); // Set products state with the retrieved data
    }
  }, []);

  // Save products to local storage whenever the products state changes
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products)); // Store products state in local storage
  }, [products]);

  const handleAddProduct = () => {
    if (productId && sellingPrice && productName) {
      const newProduct = {
        id: productId,
        price: sellingPrice,
        name: productName,
      };

      // Update the state with the new product
      setProducts([...products, newProduct]); // Add the new product to the products state

      // Clear input fields
      setProductId(""); // Clear product ID input
      setSellingPrice(""); // Clear selling price input
      setProductName(""); // Clear product name input
    }
  };

  const handleDeleteProduct = (productId) => {
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    ); // Remove the product with the given ID
    setProducts(updatedProducts); // Update the products state with the filtered list
  };

  // Calculate total value whenever products change
  useEffect(() => {
    const total = products.reduce(
      (acc, product) => acc + parseFloat(product.price),
      0
    ); // Calculate the total value of products
    setTotalValue(total); // Set the total value in the state
  }, [products]);

  return (
    <div>
      <h1>Add Products</h1>
      <div>
        <label>Product ID: </label>
        <input
          type="text"
          value={productId}
          onChange={(e) => setProductId(e.target.value)} // Update productId state when the input value changes
        />
      </div>
      <div>
        <label>Selling Price: </label>
        <input
          type="text"
          value={sellingPrice}
          onChange={(e) => setSellingPrice(e.target.value)} // Update sellingPrice state when the input value changes
        />
      </div>
      <div>
        <label>Product Name: </label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)} // Update productName state when the input value changes
        />
      </div>
      <button onClick={handleAddProduct}>Add Product</button>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {`Product ID: ${product.id} - Selling Price: ${product.price} - Product Name: ${product.name}`}
            <button onClick={() => handleDeleteProduct(product.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div>
        <label>Total value worth of products: Rs</label>
        <input type="text" value={totalValue} readOnly />
      </div>
    </div>
  );
}

export default App;