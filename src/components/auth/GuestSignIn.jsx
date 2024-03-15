import React from 'react'
import { useNavigate } from 'react-router-dom';

const GuestSignIn = () => {
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/guestHome');
    };

    return (
        <div className='guest_login'>
            <button onClick={handleSubmit}>Login as Guest</button>
        </div>
    );
};

export default GuestSignIn;