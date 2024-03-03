import { Link, useNavigate, useLocation } from 'react-router-dom';

const ProductPage = ({ backTo }) => {
    // Accessing the state in the target component
    let location = useLocation();
    let state = location.state;
    let product = state.product;

    console.log(product)
    // TODO: Linear Formula Sub on Numbers
    return (
        <>
            <h1>{product.productName}</h1>

            <button>
                <Link to={backTo}>Back to the Search Page</Link>
            </button>    
        </>
    )
};

export default ProductPage;