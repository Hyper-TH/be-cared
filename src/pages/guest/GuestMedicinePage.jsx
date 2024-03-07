import { Link, useNavigate, useLocation } from 'react-router-dom';

const GuestMedicinePage = ({ backTo }) => {

    let location = useLocation();
    let state = location.state;
    let medicine = state.medicine;

    const navigate = useNavigate();

    const renderPIL = (medicine) => {
        navigate(`/guest/render/${encodeURIComponent(medicine.name)}`, { state : { medicine }});
    };

    return (
        <>
            <h1>{medicine.name}</h1>
            <div>
                <p>Company: {medicine.company.name}</p>
                <p>Active Ingredient: {medicine.ingredients[0].name}</p>
            </div>

            <button onClick={() => renderPIL(medicine)}>
                View PIL Document
            </button>

            <button>
                <Link to={backTo}>Back to the Search Page</Link>
            </button>
        </>
    );
};

export default GuestMedicinePage;