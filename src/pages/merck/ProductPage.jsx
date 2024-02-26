import { Link, useNavigate, useParams } from 'react-router-dom';

const ProductPage = ({ backTo }) => {
    return (
        <>
            <h1>Hello!</h1>

            <button>
                <Link to={backTo}>Back to the Search Page</Link>
            </button>    
        </>
    )
};

export default ProductPage;