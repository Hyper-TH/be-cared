import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../../styles/merck/search_product.css';
import Axios from 'axios';
import Product from '../../components/merck/Product';
import { Dropdown } from 'flowbite-react';

const SearchProductPage = ({ backTo }) => {
    const [prodQuery, setProdQuery] = useState("");     // State for product query to send to server
    const [productList, setProductList] = useState([])  // State for list of product responses
    const [searchType, setSearchType] = useState("");   // Default to name
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleOpen = () => {
        setIsOpen(!isOpen);
    };
    

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
            setError("Choose a type then input a drug to start searching!");
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
            <Link to={backTo} className='btn_primary'>Back</Link>
            <div className='sub_container'>
                <h1 className='main_title'>
                    Search Merck Products
                </h1>

                <div className='search_product_container'>
                    <div className='search_product'>
                        <div className='search_product_bar'>
                            <form className="search_product_form">
                                <div className='search_container'>

                                    <div className="relative flex-2">
                                        <select id="type" className="search_type">
                                            <option selected>Search Type</option>
                                            <option value="US">Product ID</option>
                                            <option value="DE">Product Name</option>

                                        </select>
                                        
                                        <div className="dropdown_icon">
                                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 12">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 8 8 8-8"/>
                                            </svg>
                                        </div>

                                    </div>
                        
                                    <div className="relative flex-1">
                                        <input type="search" className="product_input" placeholder="T1503 or Trizma Base..." required />
                                        
                                        <button type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
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

                    {isLoading ? (
                        <div>Loading...</div>
                    ) : productList === null ? (
                        // Render nothing if productList is null, which is the initial state before loading
                        null
                    ) : productList.length > 0 ? (
                        // Map over the medicine list if it has items
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