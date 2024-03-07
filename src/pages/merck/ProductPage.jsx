import { Link, useLocation } from 'react-router-dom';
import Axios from 'axios';
import { useState, useEffect } from 'react';

const ProductPage = ({ backTo }) => {
    const [productInformation, setProductInformation] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    let location = useLocation();
    let state = location.state;
    let product = state.product;

    useEffect(() => {
        const getProductDetails = async () => {
            setIsLoading(true);
            setError("");
    
            try {
                const response = await Axios.get(`${process.env.REACT_APP_LOCALHOST}/getProduct?uploadPath=${encodeURIComponent(product.href)}`);
                
                console.log(response.data.doc)
                if (response.data) {
                    setProductInformation(response.data.doc);
                } else {
                    setProductInformation({});
                }
    
            } catch (error) {
                console.error(`Axios Error: ${error}`);
                setError("Local Server Error");
            }

            setIsLoading(false);
        };

        getProductDetails();
    }, []);

    // TODO: Linear Formula Sub on Numbers
    // TODO: Loading div
    return (
        <>
        <div className="product_information">
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                <h1>{productInformation.productName}</h1>

                <h2>{productInformation.productDescription}</h2>

                <h3>Product Information</h3>    
                <div>
                    {Object.entries(productInformation?.productDetails ?? {}).map(([key, value]) => (
                        <div key={key}>
                        <strong>{key}</strong>: {value}
                        </div>
                    ))}
                </div>

                <h3>Product Properties</h3>
                <div>
                    {Object.entries(productInformation?.productProperties ?? {}).map(([key, value]) => (
                        <div key={key}>
                            <strong>{key}</strong>: {value}
                        </div>
                    ))}
                </div>
                </>
            )}
        </div>    

        <button>
            <Link to={backTo}>Back to the Search Page</Link>
        </button>
        </>
    )
};

export default ProductPage;