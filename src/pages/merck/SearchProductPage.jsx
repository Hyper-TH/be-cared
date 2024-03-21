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

                        
                    <form className="max-w-sm mx-auto relative">
                    <label htmlfor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                    <div className="relative">
                        <select id="countries" className="appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 pr-10 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected>Choose a country</option>
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="FR">France</option>
                            <option value="DE">Germany</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 12">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 8 8 8-8"/>
                            </svg>
                        </div>
                    </div>
                </form>

                        

                        <div className="max-w-lg mx-auto">
                            <div className="flex">

                                {/* <button data-dropdown-toggle="dropdown" className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" onClick={handleOpen}>
                                    Search Type
                                    <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                    </svg>
                                </button>
                                    
                                <div className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                    {isOpen ? (
                                        <ul className="dropdown_list" aria-labelledby="btn_dropdown">
                                            <li>
                                                <button className='btn_dropdown_option'>Product ID</button>
                                            </li>

                                            <li>
                                                <button className='btn_dropdown_option'>Product Name</button>
                                            </li>
                                        </ul>
                                    ) : null}

                                </div> */}
                                {/* <Dropdown className="btn_dropdown" dismissOnClick={false}>
                                    <Dropdown.Item className='btn_dropdown_option'>Product ID</Dropdown.Item>
                                    <Dropdown.Item className='btn_dropdown_option'>Product Type</Dropdown.Item>
                                </Dropdown> */}

                                                            
                                <div className="relative w-full">
                                    <input className="product_input" placeholder="T1503 or Trizma" />
                                    <button className="product_search">
                                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                        </svg>
                                        <span className="sr-only">Search</span>
                                    </button>
                                </div>

                            </div>
                        </div>
                        <form className="max-w-lg mx-auto">
                            <div className="flex">
                                <label htmlfor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
                                
                                <button 
                                    id="dropdown-button" 
                                    data-dropdown-toggle="dropdown" 
                                    className="yokeToCopy" type="button">All categories 
                                    <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                    </svg>
                                </button>
                                
                                <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                                    <li>
                                        <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mockups</button>
                                    </li>
                                    <li>
                                        <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Templates</button>
                                    </li>
                                    <li>
                                        <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Design</button>
                                    </li>
                                    <li>
                                        <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logos</button>
                                    </li>
                                    </ul>
                                </div>
                                
                                <div className="relative w-full">
                                    <input type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Mockups, Logos, Design Templates..." required />
                                    <button type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                        </svg>
                                        <span className="sr-only">Search</span>
                                    </button>
                                </div>
                            </div>
                        </form>

                        <div className='search_bar'>
                            <form className="max-w-lg mx-auto">
                                <div className='flex'>

                                    {/* <form className="max-w-sm mx-auto relative"> */}
                                        {/* If relative div is uncommented, the arrow disappears */}
                                        <div className="relative">
                                            <select id="countries" className="selectYoke">
                                                <option selected>Search Type</option>
                                                <option value="US">Product ID</option>
                                                <option value="DE">Product Name</option>
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white">
                                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 12">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 8 8 8-8"/>
                                                </svg>
                                            </div>
                                        </div>
                                    {/* </form> */}

                                        
                        
                                    <div className="relative w-full">
                                        <input type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Mockups, Logos, Design Templates..." required />
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