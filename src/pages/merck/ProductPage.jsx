import { Link, useNavigate, useLocation } from 'react-router-dom';
import Axios from 'axios';
import { useState, useEffect } from 'react';

const ProductPage = ({ backTo }) => {
    const [productDetails, setProductDetails] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // Accessing the state in the target component
    let location = useLocation();
    let state = location.state;
    let product = state.product;

    const getProductDetails = async () => {
        setIsLoading(true);
        setError("");

        try {
            const response = await Axios.get(`http://localhost:8000/getProduct?uploadPath=${encodeURIComponent(product.href)}`);
            
            console.log(response.data);
        } catch (error) {
            console.error(`Axios Error: ${error}`);
            setError("Local Server Error");
        }
    };

    useEffect(() => {
        getProductDetails();
    }, []);

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