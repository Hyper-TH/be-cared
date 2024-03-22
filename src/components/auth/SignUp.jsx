import { useState } from 'react'
import { useNavigate } from 'react-router';
import { UserAuth } from '../../context/AuthContext.js';
import '../../styles/sign_in.css';

const SignUp = () => {
    const { createUser } = UserAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
 
    const navigate = useNavigate();

    const signUp = async (e) => {
        e.preventDefault();
        setError("");

        // Check if passwords match
        if (password !== confirmPassword) {
            setError("Passwords do not match.");

            return; 
        };
        
        try {
            const type = "standard";
            const userCredential = await createUser(email, password, type);

            if (userCredential) {
                console.log(`Successful login!`);

                navigate('/home');
            };

        } catch (error) {
            setError(error.message);

            console.error(error);
        };
    };

    const returnLogin = () => {
        navigate('/');
    };

    return (
        <>
        <div className="sub_container">
            <div className='sign_in_container'>
                <div className='sign_in'>
                    <h1 className='main_title'>
                        Create your account
                    </h1>

                    <form onSubmit={signUp} className='sign_in_form'>
                        <div>
                            <label>Email Address: </label>
                            <input 
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    
                    <div>
                            <label>Password: </label>
                            <input 
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                    </div>
                    
                    <div>
                            <label>Confirm Password: </label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                    </div>
                    
                            <button className='btn_login'>Sign Up</button>
                    </form>

                    <button className='btn_login' onClick={returnLogin}>Back to login</button>
                

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

export default SignUp;