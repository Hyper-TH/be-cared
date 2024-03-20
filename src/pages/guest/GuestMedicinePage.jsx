import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

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

    const renderPIL = (medicine) => {
        navigate(
            `/guest/render/${encodeURIComponent(medicine.name)}`, 
            { state : { medicine } }
        );
    };

    const statusButton = (() => {
        if (medicine.legalCategory.includes('(A)') || medicine.legalCategory.includes('(B)') || medicine.legalCategory.includes('(C)')) {
            return (
                <button className='btn_pharmacy_only_presc'>
                    Pharmacy Only: Prescription
                </button>        
            );
        } else if (medicine.legalCategory.includes('general sale')) {
            return (
                <button className='btn_pharmacy_only'> 
                    General Sale: Non-prescription
                </button>
            );
        } else {
            <button className='btn_general_sale'>
                Pharmacy Only: Non-prescription
            </button>   
        }
    })();  

    useEffect(() => {
        checkFiles();
    });

    return (
        <>
         <section className='main_container'>

            <div className='sub_container'>

                <Link to={backTo}>
                    <button className='btn_primary'>
                        &larr;
                    </button>
                </Link>
                
                <div className='medicine_details_container'>
                    <div className='medicine_details'>
                        <h1 className='medicine_name'>
                            {medicine.name}
                        </h1>

                        <div className='medicine_sub_details'>
                            <div className='flex flex-col mb-4'>
                                <span className='medicine_header inline'>Company:</span>
                                <span className='medicine_text inline'>{medicine.company.name}</span>
                            </div>

                            <div className='flex flex-col mb-4'>
                                <span className='medicine_header inline'>Active Ingredient&#40;s&#41;:</span>
                                <ul className='max-w-md space-y-1 text-gray-300 list-disc list-inside'>
                                    {medicine.ingredients.map((ingredient, index) => (
                                        <li key={index}>
                                            <span className='medicine_text'>{ingredient.name}</span>
                                        </li>
                                    ))}
                                </ul>
                                
                            </div>

                            <div className='medicine_status'>
                                <span className='medicine_header inline'>Status: </span>
                                <span className='medicine_text inline'>{statusButton}</span>
                            </div>
                        </div>

                        <div className='btn_collection_medicine'>
                            {isPIL ? ( 
                                <button 
                                    className='btn_collection_med_guest'
                                    onClick={() => renderPIL(medicine)}>
                                    PIL Document
                                </button>
                            ) : ( 
                                <button 
                                    className='btn_collection_med_guest'
                                    style={{ opacity: 0.5, cursor: 'not-allowed' }}
                                    onClick={() => renderPIL(medicine)}
                                    disabled>
                                    No available PIL Document
                                </button>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    );
};

export default GuestMedicinePage;