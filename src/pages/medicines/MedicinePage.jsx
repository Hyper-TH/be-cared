import { Link, useNavigate, useLocation } from 'react-router-dom';

const MedicinePage = ({ backTo }) => {
    let location = useLocation();
    let state = location.state;
    let medicine = state.medicine;
    
    const navigate = useNavigate();

    const renderSPC = (medicine) => {
        const type = "SPC";

        navigate(`/render/${encodeURIComponent(medicine.name)}/${encodeURIComponent(type)}`, { state: { medicine, type }});
    };

    const renderPIL = (medicine) => {
        const type = "PIL";
        
        navigate(`/render/${encodeURIComponent(medicine.name)}/${encodeURIComponent(type)}`, { state: { medicine, type }});
    };

    // const subscribe = (medicine) => {

    // };

    return (
        <>
            {/* TODO: Get medicine images and whether its market status */}
            <h1>{medicine.name}</h1>
            <div>
                <p>Company: {medicine.company.name}</p>
                <p>Active Ingredient: {medicine.ingredients[0].name}</p>
            </div>
            <button onClick={() => renderSPC(medicine)}>
                View SPC Document
            </button>

            <button onClick={() => renderPIL(medicine)}>
                View PIL Document
            </button>

            {/* <button onClick={() => subscribe(medicine)}>
                Subscribe
            </button> */}

            <button>
                <Link to={backTo}>Back to the Search Page</Link>
            </button>
        </>
    );
};

export default MedicinePage;