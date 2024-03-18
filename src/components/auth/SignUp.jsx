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
            setError(error);

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
                    />
                </div>
               
               <div>
                    <label>Password: </label>
                    <input 
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

               </div>
               
               <div>
                    <label>Confirm Password: </label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
               </div>
               
                    <button className='btn_login'>Sign Up</button>
                    <button className='btn_login' onClick={returnLogin}>Back to login</button>
                </form>
           

            {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
            </div>
        </div>
        </>
    );
};

export default SignUp;