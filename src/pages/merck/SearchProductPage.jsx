import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../../styles/merck/search_product.css';
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

        if (prodQuery && searchType) {
            console.log(`Search Type: `, searchType);
            console.log(`Searching:` , prodQuery);
            
            try {
                console.log(`Requesting server for product list..`);
                const response = await Axios.get(
                    `${process.env.REACT_APP_LOCALHOST}/getProds`,
                {
                    params: { 
                        prodQuery: prodQuery,
                        searchType: searchType
                    }
                });
                
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
        } else {
            setError("Choose a type then type in a product to start searching!");
        }

        setIsLoading(false);
    };

    const navigate = useNavigate();

    const handleViewDetails = (product) => {
        navigate(`/result/product/${encodeURIComponent(product.productID)}`, { state: { product }});
    };

    return (
        <>
        <section className='main_container'>
            <div className='sub_container'>
                <div className='sub_container_header'>
                    <Link to={backTo}>
                        <button className='btn_return'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </Link>

                    <div className='main_title'>
                        <h1>Search Merck Products</h1>
                    </div>
                </div>
                
                <div className='search_product_container'>
                    <div className='search_product'>
                        <div className='search_product_bar'>
                            <form className="search_product_form">
                                <div className='search_container'>

                                    <div className="relative flex-2">
                                        <select id="dropdown" value={searchType} className="search_type" onChange={handleDropdownChange}>
                                            <option value="">Search Type</option>
                                            <option value="number">Product ID</option>
                                            <option value="name">Product Name</option>

                                        </select>
                                        
                                        <div className="dropdown_icon">
                                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 12">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 8 8 8-8"/>
                                            </svg>
                                        </div>

                                    </div>
                        
                                    <div className="relative flex-1">
                                        <input type="search" value={prodQuery} onChange={productChange} className="product_input" placeholder="T1503 or Trizma Base..." required />
                                        
                                        <button onClick={searchProduct} className="btn_search_product">
                                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                            </svg>
                                            <span className="sr-only">Search</span>
                                        </button>
                                    </div>

                                </div>
                            </form>
                        </div>


                    </div>

                </div>

                <div className='product_list'>
                    <div className='product_list_container'>
                        {isLoading ? (
                            <div className='loading'>Loading...</div>
                        ) : productList === null && !prodQuery ? (
                            null
                        ) : productList !== null && prodQuery ? ( 
                            <div className='loading'>Product not found, try again...</div>
                        ) : productList.length > 0 ? (
                            // Map over the medicine list if it has items
                            productList.map((product, index) => {
                                return (
                                    <Product
                                        key={index}
                                        name={product.productName}
                                        products={product.products}
                                        product={product}
                                        handleViewDetails={handleViewDetails}
                                    />
                                )
                            })
                        ) : (
                            // If empty array
                            <div className='loading text-center'>Choose search type and product to start searching</div>
                        )}
                    </div>
                </div>

            {error && 
                <div className='search_warning'>
                    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>

                    <div>
                        <span className='font-medium'>{error}</span>
                    </div>
                </div>
            }
            </div>
        </section>
    </>
    );
};

export default SearchProductPage;