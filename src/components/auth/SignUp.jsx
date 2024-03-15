import { useState } from 'react'
import { useNavigate } from 'react-router';
import { UserAuth } from '../../context/AuthContext.js';

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

    return (
        <div className="sign_up">
            <div className='title'>
                <h1>Create your account</h1>
            </div>

            <div className="sign_up_form">
            <form onSubmit={signUp}>
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
               
                <button type="submit">Sign Up</button>
                </form>
             </div>
           

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default SignUp;