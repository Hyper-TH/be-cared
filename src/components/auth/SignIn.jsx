import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';

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
        <section className='bg-gray-50 dark:bg-gray-900'>
        <div className='sign_in_container'>
            <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                beCared
            </a>

            <div className='sign_in_sub_container'>

                <div className='sign_in'>
                    <h1>Sign in to your account</h1>

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


                    {error && <p style={{ color: "red" }}>{error}</p>}
                </div>
            </div>
        </div>
        </section>
    );
};

export default Signin;