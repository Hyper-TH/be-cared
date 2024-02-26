import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { useState } from 'react';

const SearchProductPage = ({subPageName, backTo}) => {
    const [prodQuery, setProdQuery] = useState(""); // State for product query to send to server
    const [productList, setProductList] = useState([])  // State for list of product responses
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const productChange = (event) => {
        setProdQuery(event.target.value);
    };
    
    const searchProduct = async () => {
        setIsLoading(true);
        setError("");

        try {
            const response = await Axios.get(`http://localhost:8000/getProds?prodQuery=${encodeURIComponent(prodQuery)}`);
            
            // console.log(response.data);

            if (response.data) {
                setProductList(response.data);
            } else {
                setProductList([]);
            }
        } catch (error) {
            console.error(`Axios Error: ${error}`);
            setError("Local Server Error");
        }

        setIsLoading(false);
    };

    const navigate = useNavigate();

    const handleViewDetails = (product) => {
        navigate({
            pathname: `/result/test`
        });
    };

    return (
        <>
            <div>
                <h1>{subPageName} Page</h1>
            </div>
            <h2>This is the Merck search page</h2>

            <div>
                <button>
                    <Link to={backTo}>Back to Home</Link>
                </button>
                <button onClick={() => handleViewDetails()}>
                    View Product Details
                </button>
            </div>
        </>
    );
};

export default SearchProductPage;