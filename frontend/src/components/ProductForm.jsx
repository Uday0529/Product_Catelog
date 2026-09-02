import { useEffect, useState } from "react";

function ProductForm({
    onProductAdded,
    editingProduct,
    onProductUpdated
}) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (editingProduct) {
            setName(editingProduct.name);
            setDescription(editingProduct.description);
            setPrice(editingProduct.price);
            setCategory(editingProduct.category);
            setStock(editingProduct.stock);
        }
    }, [editingProduct]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim() || !description.trim() || !category.trim()) {
            alert("Please fill all text fields");
            return;
        }

        if (Number(price) <= 0) {
            alert("Price must be greater than 0");
            return;
        }

        if (Number(stock) < 0) {
            alert("Stock cannot be negative");
            return;
        }

        try {
            if (editingProduct) {

                const updatedProduct = {
                    ...editingProduct,
                    name,
                    description,
                    price: Number(price),
                    category,
                    stock: Number(stock)
                };

                await onProductUpdated(updatedProduct);

            } else {

                const newProduct = {
                    name,
                    description,
                    price: Number(price),
                    category,
                    stock: Number(stock)
                };

                await onProductAdded(newProduct);
            }

            setName("");
            setDescription("");
            setPrice("");
            setCategory("");
            setStock("");

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>

            <div className="mb-4">
                <h2 className="form-title">
                    {editingProduct ? "Edit Product" : "Add Product"}
                </h2>

                <p className="text-secondary mb-0">
                    {editingProduct
                        ? "Update product information"
                        : "Add a new product to your catalog"}
                </p>
            </div>

            <div className="mb-3">
                <label className="form-label">
                    Product Name
                </label>

                <input
                    type="text"
                    required
                    className="form-control dark-input"
                    placeholder="Enter product name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">
                    Description
                </label>

                <textarea
                    className="form-control dark-input"
                    required
                    placeholder="Enter product description"
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <div className="row g-3">

                <div className="col-12 col-md-6">
                    <label className="form-label">
                        Price
                    </label>

                    <input
                        type="number"
                        min="0"
                        className="form-control dark-input"
                        placeholder="₹ Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>

                <div className="col-12 col-md-6">
                    <label className="form-label">
                        Stock
                    </label>

                    <input
                        type="number"
                        min="0"
                        className="form-control dark-input"
                        placeholder="Stock quantity"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                    />
                </div>

            </div>

            <div className="mt-3 mb-4">
                <label className="form-label">
                    Category
                </label>

                <input
                    type="text"
                    className="form-control dark-input"
                    placeholder="e.g. Electronics"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
            </div>

            <button
                type="submit"
                className="btn btn-light w-100 fw-semibold"
            >
                {editingProduct ? "Update Product" : "Add Product"}
            </button>

        </form>
    );
}

export default ProductForm;