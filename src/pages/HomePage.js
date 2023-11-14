import { Link } from 'react-router-dom';

export const HomePage = () => {
    return (
    <>
    <div>
        <h2>Home Page</h2>
        <p>Choose website to search from:</p>

        <div>
            <button>
                <Link to="/search">Medicines / PFizer</Link>
            </button>
            <button>
                <Link to="/merck">Merck</Link>
            </button>
        </div>
    </div>
    </>
    );
};