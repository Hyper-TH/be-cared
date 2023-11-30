import { Link, useParams, useNavigate } from 'react-router-dom';

export const MedicinePage = ({ subPageName, backTo }) => {
    const { medicineName, parsedSPC } = useParams();

    const navigate = useNavigate();

    const renderHTML = (medicineName, parsedSPC) => {
        console.log(parsedSPC);
        
        navigate({
            pathname: `/render/${encodeURIComponent(medicineName)}/${encodeURIComponent(parsedSPC)}`
        });
    };

    return (
        <>
            <h1>{subPageName} Page</h1>
            <p>Medicine Name: {medicineName}</p>
            <p>Parsed SPC: {parsedSPC}</p>

            <button onClick={() => renderHTML(medicineName, parsedSPC)}>
                View document
            </button>
            <button>
                <Link to={backTo}>Back to the Search Page</Link>
            </button>
        </>
    );
};
