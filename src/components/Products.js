import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UilShoppingCart } from '@iconscout/react-unicons';
import axios from 'axios';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="products-container">
      {products.map((product) => (
        <motion.div
          key={product.id}
          className="product-card"
          whileHover={{ scale: 1.05 }}
        >
          <img src={product.image_url} alt={product.name} />
          <h3>{product.name}</h3>
          <p>${product.price}</p>
          <button className="add-to-cart">
            <UilShoppingCart /> Add to Cart
          </button>
        </motion.div>
      ))}
    </div>
  );
}

export default Products; 