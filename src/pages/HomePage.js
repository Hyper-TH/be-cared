import { Link } from 'react-router-dom';

export const HomePage = () => {
    return (
    <>
    <div>
        <h2>Home Page</h2>
        <p>Choose an option:</p>

        <div>
            <button>
                <Link to="/search">Search Medicine</Link>
            </button>
            <button>
                <Link to="/merck">Search chemical compound</Link>
            </button>
            {/* <button>
                <Link to="/serverTest">Test server here</Link>
            </button> */}
        </div>
    </div>
    </>
    );
};