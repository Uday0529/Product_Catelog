import { useEffect, useState } from "react";

import { getAllProducts } from "./services/productAPi";

function App() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        const fetchProducts = async () => {

            try {
                setLoading(true);

                const data = await getAllProducts();

                setProducts(data.products);
            } catch (err) {
                setError("Failed to load products");
            }
            finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (

        <div>
            <h1>Product Catalog</h1>

            {loading && <p>Loading products...</p>}

            {error && <p>{error}</p>}

            {!loading && !error && (
                <div>
                    {products.map((product) => (
                        <div key={product._id}>
                            <h2>{product.name}</h2>
                            <p>₹{product.price}</p>
                            <p>{product.category}</p>
                            <p>Stock: {product.stock}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default App;
