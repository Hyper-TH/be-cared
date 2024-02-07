import { Link, useNavigate } from 'react-router-dom';

const SubscriptionsPage = ({subPageName, backTo}) => {
    return (
        <>
            <h1>{subPageName}</h1>
            
            <button>
                <Link to={backTo}>Back to Home</Link>
            </button>
        </>
    );
};

export default SubscriptionsPage;