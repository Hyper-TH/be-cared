import { useState } from 'react'
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
        } catch (error) {
            setError(error.message);

            console.log(error)
        }
    };

    return (
        <div className='sign_in'>
            <div className='title'>
                <h1>Sign in to your account</h1>

            </div>

            <div className='sign_up_prompt'>
                <p>
                    Don't have an account? <Link to='/signUp'>Sign up</Link>.
                </p>
            </div>
            
            <div className='create_account_form'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email Address: </label>
                        <input 
                            type="email"
                            placeholder='Enter your email'
                            value={email} 
                            onChange={(e) =>  setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Password: </label>
                        <input 
                            type="password" 
                            placeholder='Enter your password'
                            value={password}
                            onChange={(e) =>  setPassword(e.target.value)}/>
                    </div>

                    <button>Login</button>
                </form>
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default Signin;