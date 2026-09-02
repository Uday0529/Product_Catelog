import { useEffect, useState } from "react";
import "./App.css";
import {
    getAllProducts,
    createProduct,
    deleteProduct,
    updateProduct
} from "./services/productAPi";

import ProductList from "./components/productList";
import ProductForm from "./components/ProductForm";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editingProduct, setEditingProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem("token")
    );
    const [showRegister, setShowRegister] = useState(false);

    // EDIT PRODUCT
    const handleEditProduct = (product) => {
        setEditingProduct(product);
    };


    // UPDATE PRODUCT
    const handleProductUpdated = async (product) => {
        try {

            const data = await updateProduct(
                product._id,
                product
            );

            setProducts((prevProducts) =>
                prevProducts.map((item) =>
                    item._id === product._id
                        ? data
                        : item
                )
            );

            setEditingProduct(null);

        } catch (err) {

            console.error(err);
            alert("Failed to update product");

        }
    };


    // ADD PRODUCT
    const handleProductAdded = async (product) => {
        try {

            const data = await createProduct(product);

            setProducts((prevProducts) => [
                ...prevProducts,
                data
            ]);

        } catch (err) {

            console.error(err);
            alert("Failed to add product");

        }
    };


    // DELETE PRODUCT
    const handleProductDeleted = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to Delete this Product?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await deleteProduct(id);

            setProducts((prevProducts) =>
                prevProducts.filter(
                    (product) => product._id !== id
                )
            );

        } catch (err) {

            console.error(err);
            alert("Failed to delete product");

        }
    };


    // SEARCH + CATEGORY FILTER
    const filteredProducts = products.filter((product) => {

        const matchesSearch =
            product.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

        const matchesCategory =
            categoryFilter === "All" ||
            product.category === categoryFilter;

        return matchesSearch && matchesCategory;
    });


    // FETCH PRODUCTS
    useEffect(() => {

        const fetchProducts = async () => {

            try {

                setLoading(true);

                const data = await getAllProducts();

                setProducts(data.products);

            } catch (err) {

                setError("Failed to load products");

            } finally {

                setLoading(false);

            }
        };

        fetchProducts();

    }, []);

    if (!isAuthenticated) {

        if (showRegister) {
            return (
                <Register
                    onRegister={() => setShowRegister(false)}
                    onGoToLogin={() => setShowRegister(false)}
                />
            );
        }

        return (
            <Login
                onLogin={() => setIsAuthenticated(true)}
                onGoToRegister={() => setShowRegister(true)}
            />
        );
    }

    return (

        <div className="app-container">

            {/* NAVBAR */}

            <nav className="navbar navbar-dark mb-4">

                <div className="container">

                    <span className="navbar-brand fw-bold">
                        Product Catalog
                    </span>

                    <span className="text-secondary">
                        Manage your products
                    </span>

                    <button
                        className="btn btn-outline-light"
                        onClick={() => {
                            localStorage.removeItem("token");
                            setIsAuthenticated(false);
                        }}
                    >
                        Logout
                    </button>

                </div>

            </nav>


            <main className="container pb-5">

                <div className="row g-4">


                    {/* PRODUCT FORM */}

                    <div className="col-12 col-lg-4">

                        <div className="card dark-card">

                            <div className="card-body">

                                <ProductForm
                                    onProductAdded={handleProductAdded}
                                    editingProduct={editingProduct}
                                    onProductUpdated={handleProductUpdated}
                                />

                            </div>

                        </div>

                    </div>


                    {/* PRODUCTS SECTION */}

                    <div className="col-12 col-lg-8">


                        {/* PRODUCTS HEADER */}

                        <div className="d-flex justify-content-between align-items-center mb-3">

                            <div>

                                <h2 className="section-title mb-1">
                                    Products
                                </h2>

                                <p className="text-secondary mb-0">
                                    Browse and manage your catalog
                                </p>

                            </div>


                            <span className="badge bg-secondary">

                                {filteredProducts.length} Products

                            </span>

                        </div>


                        {/* SEARCH + FILTER */}

                        <div className="card dark-card mb-4">

                            <div className="card-body">

                                <div className="row g-3">


                                    {/* SEARCH */}

                                    <div className="col-12 col-md-8">

                                        <input
                                            type="text"
                                            className="form-control dark-input"
                                            placeholder="Search products..."
                                            value={searchTerm}
                                            onChange={(e) =>
                                                setSearchTerm(e.target.value)
                                            }
                                        />

                                    </div>


                                    {/* CATEGORY */}

                                    <div className="col-12 col-md-4">

                                        <select
                                            className="form-select dark-input"
                                            value={categoryFilter}
                                            onChange={(e) =>
                                                setCategoryFilter(e.target.value)
                                            }
                                        >

                                            <option value="All">
                                                All Categories
                                            </option>

                                            <option value="Electronics">
                                                Electronics
                                            </option>

                                            <option value="Clothing">
                                                Clothing
                                            </option>

                                            <option value="Books">
                                                Books
                                            </option>

                                            <option value="Other">
                                                Other
                                            </option>

                                        </select>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* LOADING */}

                        {loading && (

                            <div className="text-center py-5">

                                <div
                                    className="spinner-border text-light"
                                    role="status"
                                >

                                    <span className="visually-hidden">
                                        Loading...
                                    </span>

                                </div>

                            </div>

                        )}


                        {/* ERROR */}

                        {error && (

                            <div className="alert alert-danger">
                                {error}
                            </div>

                        )}


                        {/* PRODUCT LIST / EMPTY STATE */}

                        {!loading && !error && (

                            <>
                                {filteredProducts.length === 0 ? (

                                    <div className="empty-state">

                                        <h3>
                                            No products found
                                        </h3>

                                        <p>
                                            Try changing your search or
                                            category filter.
                                        </p>

                                    </div>

                                ) : (

                                    <ProductList
                                        products={filteredProducts}
                                        onDeleteProduct={handleProductDeleted}
                                        onEditProduct={handleEditProduct}
                                    />

                                )}
                            </>

                        )}

                    </div>

                </div>

            </main>

        </div>

    );
}

export default App;