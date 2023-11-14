import { Link } from 'react-router-dom';

export const SearchPage = ({subPageName, backTo}) => {
    return (
        <>
            <div>
                <h1>{subPageName} Page</h1>
            </div>
            <h2>This is the search page</h2>

            <div>
                <button>
                    <Link to={backTo}>Back to Home</Link>
                </button>
            </div>
        </>
    );
};