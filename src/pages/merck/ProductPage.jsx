import { Link, useLocation } from 'react-router-dom';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import '../../styles/merck/product.css';

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
                const response = await Axios.get(
                    `${process.env.REACT_APP_LOCALHOST}/getProduct`,
                    {
                        params: { uploadPath: product.href }
                    }
                );
                
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
    }, [product.href]);

    return (
        <>
        <section className='main_container'>
            <div className='sub_container'>
                <Link to={backTo}>
                    <button className='btn_primary'>
                        &larr;
                    </button>
                </Link>

                <div className='main_title'>
                    <h1>{productInformation.productName}</h1>
                </div>

                <div className='product_details_container'>
                    <div className='product_details'>
                        {isLoading ? (
                            <div className='loading'>Loading...</div>
                        ) : (
                            <>
                            
                            <div className='product_name'>
                                Product Details
                            </div>

                            <div className='product_sub_details'>
                                {Object.entries(productInformation?.productDetails ?? {}).map(([key, value]) => (
                                    <div key={key}>
                                        <span className='product_header inline'>{key} </span>
                                        <span className='product_text inline'>{value}</span>
                                    </div>
                                ))}
                            </div>

                            <div className='product_name'>
                                Product Sub Details
                            </div>
                            
                            <div className='product_sub_details'>
                                {Object.entries(productInformation?.productSubDetails ?? {}).map(([key, value]) => (
                                    <div key={key}>
                                        <span className='product_header inline'>{key} </span>
                                        <span className='product_text inline'>{value}</span>
                                    </div>
                                ))}
                            </div>

                            <div className='product_name'>
                                Product Properties
                            </div>

                            <div className='product_sub_details'>
                                <div className='product_properties_list'>
                                    {Object.entries(productInformation?.productProperties ?? {}).map(([key, value]) => (
                                        <div key={key}>
                                            <span className='product_header inline'>{key}: </span>
                                            <span className='product_text inline'>{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            </>
                        )}

                    </div>
                </div>
                
            </div>
                {error && 
                    <div className='error'>
                    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>

                        <div>
                            <span className='font-medium'>{error}</span>
                        </div>
                    </div>
                }
        </section>
        </>
    )
};

export default ProductPage;