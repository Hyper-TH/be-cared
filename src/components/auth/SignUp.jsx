import { useState } from 'react'
import { useNavigate } from 'react-router';
import { UserAuth } from '../../context/AuthContext.js';

const SignUp = () => {
    const { createUser } = UserAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const signUp = async (e) => {
        e.preventDefault();
        
        try {
            const type = "standard";
            const userCredential = await createUser(email, password, type);

            if (userCredential) {
                console.log(`Successful login!`);
                navigate('/home');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="sign-in=container">
            <form onSubmit={signUp}>
                <h1>Create Account</h1>

                <input 
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input 
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
};

export default SignUp;
// TODO: When a user signs up, users database is updated with an empty medicine field (if possible)

