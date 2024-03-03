const Product = (props) => {
    return (
        <div className="products">
            <>
            <div>
                <h2>Drug name: {props.name}</h2>
            </div>
            <div>
                {props.products.map(product => (
                    <li key={product.productID}>
                        <p>Product ID: {product.productID}</p>
                        <p>Product Description: {product.productDescription}</p>
                        <button onClick={() => props.handleViewDetails(props.product)}>View Product Details</button>
                    </li>
                ))}
            </div>
            </>
        </div>
    );
};

export default Product;