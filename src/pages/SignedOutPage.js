import { Link, useNavigate } from 'react-router-dom';

export const SignedOutPage = ({subPageName, backTo}) => {
    return (
        <>
        <button>
            <Link to={backTo}>Back to Login</Link>
        </button>
        </>
    );
};