import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
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
        } catch (e) {
            setError(e.message);
            console.log(error)
        }
    }

    return (
        <div>
            <h1>Sign in to your account</h1>
            <p>
                Don't have an account? <Link to='/signup'>Sign up</Link>.
            </p>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email Address</label>
                    <input type="email" onChange={(e) =>  setEmail(e.target.value)}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" onChange={(e) =>  setPassword(e.target.value)}/>
                </div>

                <button>Login</button>
            </form>
        </div>
    )
}

export default Signin;