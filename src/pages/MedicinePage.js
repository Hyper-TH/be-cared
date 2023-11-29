import { Link, useParams } from 'react-router-dom';

export const MedicinePage = ({ subPageName, backTo }) => {
    // const location = useLocation();

    // const { medicineName, parsedSPC } = location.state || {};
    const { medicineName, parsedSPC } = useParams();

    console.log('Medicine name: ', medicineName);
    
    // console.log("Location State: ", location.state);

    return (
        <>
            <h1>{subPageName} Page</h1>
            <p>Medicine Name: {medicineName}</p>
            <p>Parsed SPC: {parsedSPC}</p>

            <button>
                <Link to={backTo}>Back to the Search Page</Link>
            </button>
        </>
    );
};
