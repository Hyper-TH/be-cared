const Product = (props) => {
    return (
        <div className="product_box">

            <div className="product_row">
                <h2 className="product_name">{props.name}</h2>
            </div>

            {props.products.map((product, index) => (
            <div className="sub_product_row" key={index}>
                <div className="sub_product_info">
                    <p>ID: {product.productID}</p>
                    <p>Description: {product.productDescription}</p>
                </div>

                <div className="sub_product_actions">
                    <button className="btn_sub_product" onClick={() => props.handleViewDetails(product)}>View Product Details</button>
                </div>
            </div>
            ))}
           
        </div>
    );
};

export default Product;