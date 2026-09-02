import ProductCard from "./productCard";

function ProductList({
    products,
    onDeleteProduct,
    onEditProduct
}) {

    return (
        <div className="product-list">

            {products.length === 0 ? (
                <p>No products found.</p>
            ) : (
                products.map((product) => (
                    <ProductCard
                        key={product._id}
                        product={product}
                        onDeleteProduct={onDeleteProduct}
                        onEditProduct={onEditProduct}
                    />
                ))
            )}

        </div>
    );
}

export default ProductList;