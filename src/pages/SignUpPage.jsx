import SignUp from '../components/auth/SignUp';
import { Link } from 'react-router-dom';

const SignUpPage = ({ backTo }) => {
    return (
        <>
        <div className="App">
            <SignUp />
            <button>
                <Link to={backTo}>Return to Login Page</Link>
            </button>
        </div>
        </>
    );
};

export default SignUpPage;