import { Link, useNavigate } from 'react-router-dom';

export const SubscriptionsPage = ({subPageName, backTo}) => {
    return (
        <>
            <h1>{subPageName}</h1>
            
            <button>
                <Link to={backTo}>Back to Home</Link>
            </button>
        </>
    );
};