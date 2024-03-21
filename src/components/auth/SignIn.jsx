import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import '../../styles/sign_in.css';

const Signin = () => {
    const { signIn } = UserAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await signIn(email, password);
            
            navigate('/home');
        } catch (error) {
            setError(error.message);

            console.log(error)
        }
    };

    const guestDirect = () => {
        navigate('/guestHome');
    };    
    
    const signUpDirect = () => {
        navigate('/signUp');
    };

    return (
        <>
        <div className='sub_container'>
            <h1 className="flex items-center mb-6 text-4xl font-bold text-gray-900 dark:text-white">
                <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                beCared
            </h1>

            <div className='sign_in_container'>
                <div className='sign_in'>
                    <h1 className='sign_in_title'>
                        Sign in to your account
                    </h1>

                        <form onSubmit={handleSubmit} className='sign_in_form'>
                            <div>
                                <label>Your email</label>
                                <input 
                                    type="email"
                                    placeholder='example@domain.com'
                                    value={email} 
                                    onChange={(e) =>  setEmail(e.target.value)}/>
                            </div>

                            <div>
                                <label>Password</label>
                                <input 
                                    type="password" 
                                    placeholder='Enter your password'
                                    value={password}
                                    onChange={(e) =>  setPassword(e.target.value)}/>
                            </div>

                            <button className='btn_login'>Login</button>

                    <p>
                        Don't have an account? 
                    </p>

                    <div className='btn_collection_sign_in' role="group">
                        <button className='sign_up_btn' onClick={signUpDirect}>
                        Sign Up
                        </button>

                        <button className='guest_btn' onClick={guestDirect}>
                            Login as Guest
                        </button>


                    </div>

                    </form>

                </div>
            </div>
            {error && 
                <div className='error'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>

                    <div>
                        <span className='font-medium'>{error}</span>
                    </div>
                </div>
            }
        </div>
    </>
    );
};

export default Signin;