import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

// TODO: Add Error usestate()
const GuestMedicinePage = ({ backTo }) => {
    const [isPIL, setIsPIL] = useState(false);

    let location = useLocation();
    let state = location.state;
    let medicine = state.medicine;

    const navigate = useNavigate();

    const checkFiles = () => {
        // Check each level of the object to avoid accessing a property on undefined
        if (medicine.pils && medicine.pils[0] && medicine.pils[0].activePil && medicine.pils[0].activePil.file && medicine.pils[0].activePil.file.name) {
            setIsPIL(true);
        } else {
            setIsPIL(false); // Set to false if the path doesn't exist
        }
    }

    // TODO: Refer to medicinePage to add appropriate render for no PDFs
    const renderPIL = (medicine) => {
        navigate(
            `/guest/render/${encodeURIComponent(medicine.name)}`, 
            { state : { medicine } }
        );
    };

    useEffect(() => {
        checkFiles();
    });

    // Add isLoading usestate and appropriate rendering
    return (
        <>
        <div className='medicine_details'>
            <div className='title'>
                <h1>{medicine.name}</h1>

            </div>
            <div className='medicine_sub_details'>
                <p>Company: {medicine.company.name}</p>
                <p>Active Ingredient: {medicine.ingredients[0].name}</p>

                <div className='medicine_status'>
                    Status: {medicine.legalCategory}
                </div>
            </div>
            
            <div className='document_buttons'>
                {isPIL ?  (
                    <button 
                        onClick={() => renderPIL(medicine)}>
                        View PIL Document
                    </button>
                ) : (
                    <button 
                        style={{ opacity: 0.5, cursor: 'not-allowed' }}
                        onClick={() => renderPIL(medicine)}>
                        No available PIL Document
                    </button>
                )}

            </div>
            
            <button>
                <Link to={backTo}>Back to the Search Page</Link>
            </button>
        </div>
            
        </>
    );
};

export default GuestMedicinePage;