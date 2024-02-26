import { Link } from 'react-router-dom';

const SearchProductPage = ({subPageName, backTo}) => {
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
            </div>
        </>
    );
};

export default SearchProductPage;