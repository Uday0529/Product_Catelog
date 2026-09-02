function ProductCard({ product, onDeleteProduct, onEditProduct }) {
    return (
        <div className="product-card h-100">

            <div className="d-flex justify-content-between align-items-start mb-3">

                <h2 className="product-name mb-0">
                    {product.name}
                </h2>

                <span className="badge bg-secondary">
                    {product.category}
                </span>

            </div>

            <p className="product-description">
                {product.description}
            </p>

            <div className="product-info">

                <div>
                    <small>Price</small>
                    <strong>₹{product.price}</strong>
                </div>

                <div>
                    <small>Stock</small>
                    <strong>{product.stock}</strong>
                </div>

            </div>

            <div className="d-flex gap-2 mt-4">

                <button
                    type="button"
                    className="btn btn-light flex-grow-1"
                    onClick={() => onEditProduct(product)}
                >
                    Edit
                </button>

                <button
                    type="button"
                    className="btn btn-outline-secondary flex-grow-1"
                    onClick={() => onDeleteProduct(product._id)}
                >
                    Delete
                </button>

            </div>

        </div>
    );
}

export default ProductCard;