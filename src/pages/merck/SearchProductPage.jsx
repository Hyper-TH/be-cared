import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Axios from 'axios';
import Product from '../../components/merck/Product';

const SearchProductPage = ({ backTo }) => {
    const [prodQuery, setProdQuery] = useState("");     // State for product query to send to server
    const [productList, setProductList] = useState([])  // State for list of product responses
    const [searchType, setSearchType] = useState("");   // Default to name
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const productChange = (event) => {
        setProdQuery(event.target.value);
    };
    
    const handleDropdownChange = (event) => {
        setSearchType(event.target.value);
    };

    const searchProduct = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setError("");

        try {
            console.log(`Requesting server for product list..`);
            const response = await Axios.get(`${process.env.REACT_APP_LOCALHOST}/getProds?prodQuery=${encodeURIComponent(prodQuery)}&searchType=${encodeURIComponent(searchType)}`);
            
            console.log(`Got response: ${response.data.products}`);
            
            if (response.data.products) {
                setProductList(response.data.products);
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
        navigate(`/result/product/${encodeURIComponent(product.productID)}`, { state: { product }});
    };

    return (
        <>
        <h2>Product Search Page</h2>
        <div>
            <form>
                {/* TODO: Have it so that if user hasn't chosen, default to name OR have them choose */}
                <label htmlFor="dropdown">Choose search type:</label>
                <select id="dropdown" value={searchType} onChange={handleDropdownChange}>
                    <option value="">Select...</option>
                    <option value="name">Product Name</option>
                    <option value="number">Product ID</option>
                </select>
                
                <label>
                    Search a product:
                    <input type="text" value={prodQuery} onChange={productChange} />
                </label>

                <button onClick={searchProduct}>Submit</button>
            </form>
        </div>

        <div>
            <button>
                <Link to={backTo}>Back to Home</Link>
            </button>

            {isLoading ? (
                <div>Loading...</div>
            ) : productList === null ? (
                // Render nothing if productList is null, which is the initial state before loading
                null
            ) : productList.length > 0 ? (
                // Map over the medicine list if it has items
                // TODO: Warning: Encountered two children with the same key, `0`. 
                productList.map((product) => {
                    return (
                        <Product
                            key={product.id}
                            name={product.productName}
                            products={product.products}
                            product={product}
                            handleViewDetails={handleViewDetails}
                        />
                    )
                })
            ) : (
                // If empty array
                <div>No products found</div>
            )}

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    </>
    );
};

export default SearchProductPage;