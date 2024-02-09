import SignIn from '../components/auth/SignIn';
import SignInAsGuest from '../components/auth/GuestSignIn';

const LoginPage = () => {
    return (
        <>
        <div className="App">
            <SignIn />
            <SignInAsGuest />
        </div>
        </>
    );
};

export default LoginPage;

