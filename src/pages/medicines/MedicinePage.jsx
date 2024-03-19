import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { UserAuth } from '../../context/AuthContext.js';
import '../../styles/medicinePages/medicine.css';
import Axios from 'axios';

// TODO: Add Error usestate()
const MedicinePage = ({ backTo }) => {
    const { user } = UserAuth();
    const [isPIL, setIsPIL] = useState(false);
    const [isSPC, setIsSPC] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [subscription, setSubscription] = useState(false);

    let location = useLocation();
    const navigate = useNavigate();
    let state = location.state;
    let medicine = state.medicine;
    
    const checkFiles = useCallback(() => {
        // Check each level of the object to avoid accessing a property on undefined
        if (medicine.pils && medicine.pils[0] && medicine.pils[0].activePil && medicine.pils[0].activePil.file && medicine.pils[0].activePil.file.name) {
            setIsPIL(true);
        } else {
            setIsPIL(false); // Set to false if the path doesn't exist
        }
    
        if (medicine.activeSPC && medicine.activeSPC.file && medicine.activeSPC.file.name) {
            setIsSPC(true);
        } else {
            setIsSPC(false); // Set to false if the path doesn't exist
        }
    }, [medicine]);
    
    const checkSub = useCallback(async (medicine) => {
        try {
            const response = await Axios.get(
                `${process.env.REACT_APP_LOCALHOST}/checkSub`,
                {
                    params: {
                        user: user.email,
                        id: encodeURIComponent(medicine.id),
                    }
                }           
            );

            if (response.data.exists === true) {
                console.log(`Medicine subbed`);
                setSubscription(true);
            } else {
                console.log(`Medicine not subbed`);
                setSubscription(false);
            }

        } catch (error) {
            console.error(`Axios Error: ${error}`);
        }
    },[user]);

    const cacheMed = async (medicine) => {
        try {
            const status = await Axios.get(
                `${process.env.REACT_APP_LOCALHOST}/cacheMed`,
                {
                    params: {
                        id: medicine.id,
                        name: medicine.name,
                        activeIngredient: medicine.ingredients[0].name,
                        company: medicine.company.name,
                        status: medicine.legalCategory,
                        pil: medicine.pils && medicine.pils[0] && medicine.pils[0].activePil && medicine.pils[0].activePil.file && medicine.pils[0].activePil.file.name 
                        ? medicine.pils[0].activePil.file.name
                        : '', 
                        spc: medicine.activeSPC && medicine.activeSPC.file && medicine.activeSPC.file.name 
                        ? medicine.activeSPC.file.name
                        : '' 
                    }
                   
                }
            );

            console.log(status);
    
            try {
                const status = await Axios.get(
                    `${process.env.REACT_APP_LOCALHOST}/cacheDoc`,
                    {
                        params: {
                            pil: medicine.pils && medicine.pils[0] && medicine.pils[0].activePil && medicine.pils[0].activePil.file && medicine.pils[0].activePil.file.name 
                            ? medicine.pils[0].activePil.file.name
                            : '', 
                            spc: medicine.activeSPC && medicine.activeSPC.file && medicine.activeSPC.file.name 
                            ? medicine.activeSPC.file.name
                            : '' 
                        }
                    }
                );

                console.log(status);
                
            } catch (error) {
                console.error(`Axios Error: ${error}`);
            }

        } catch (error) {
            console.error(`Axios Error: ${error}`);
        };
       
    };

    const subscribe = async (medicine) => {
        await Axios.get(
            `${process.env.REACT_APP_LOCALHOST}/subscribe`,
            {
                params: {
                    user: user.email,
                    id: medicine.id,
                    name: medicine.name,
                    pil: medicine.pils && medicine.pils[0] && medicine.pils[0].activePil && medicine.pils[0].activePil.file && medicine.pils[0].activePil.file.name 
                  ? encodeURIComponent(medicine.pils[0].activePil.file.name) 
                  : '', 
                    spc: medicine.activeSPC && medicine.activeSPC.file && medicine.activeSPC.file.name 
                  ? medicine.activeSPC.file.name
                  : '' 
                }
            }
        );

        // After subscribing, re-check the subscription status
        await checkSub(medicine);
    };


    // Styles for the button
    const buttonStyle = {
        opacity: subscription ? 0.5 : 1, // Make button transparent when subscription is true
        cursor: subscription ? 'not-allowed' : 'pointer', // Change cursor style
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

    const renderSPC = (medicine) => {
        const type = "spc";

        navigate(
            `/render/${encodeURIComponent(medicine.name)}/${encodeURIComponent(type)}`, 
            { state: { medicine, type } }
        );
    };

    const renderPIL = (medicine) => {
        const type = "pil";
        
        navigate(
            `/render/${encodeURIComponent(medicine.name)}/${encodeURIComponent(type)}`, 
            { state: { medicine, type } }
        );
    };

    // useEffect should call checkSub with the correct medicine and user parameter
    useEffect(() => {
        checkFiles();

        // Only call checkSub if the medicine and user.email are defined
        if (medicine && user && user.email) {
            setIsLoading(true);

            checkSub(medicine);
            cacheMed(medicine);

            setIsLoading(false);
        }
    }, [medicine, user, checkFiles, checkSub]); // Depend on both `medicine` and `user` so that checkSub runs again if either changes

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
                        {isLoading ? (
                            <div>Loading...</div>
                        ) : (
                            <> 
                            <h1 className='medicine_name'>
                                {medicine.name}
                            </h1>

                            <div className='medicine_sub_details'>
                                <div className='flex flex-col mb-4'>
                                    <span className='medicine_header inline'>Company:</span>
                                    <span className='medicine_text inline'>{medicine.company.name}</span>
                                </div>

                                {/* TODO: Active ingredients are in a list sometimes */}
                                <div className='flex flex-col mb-4'>
                                    <span className='medicine_header inline'>Active Ingredient:</span>
                                    <span className='medicine_text inline'>{medicine.ingredients[0].name}</span>
                                </div>

                                <div className='medicine_status'>
                                    <span className='medicine_header inline'>Status: </span>
                                    <span className='medicine_text inline'>{statusButton}</span>
                                </div>
                            </div>

                            <div className='btn_collection_medicine'>
                                {isSPC ?  (
                                    <button 
                                        className='btn_collection_med_left'
                                        onClick={() => renderSPC(medicine)}>
                                        SPC Document
                                    </button>
                                ) : (
                                    <button 
                                        className='btn_collection_med_left'
                                        style={{ opacity: 0.5, cursor: 'not-allowed' }}
                                        onClick={() => renderSPC(medicine)}
                                        disabled>
                                        No available SPC Document
                                    </button>
                                )}

                                {isPIL ? ( 
                                    <button 
                                        className='btn_collection_med_mid'
                                        onClick={() => renderPIL(medicine)}>
                                        PIL Document
                                    </button>
                                ) : ( 
                                    <button 
                                        className='btn_collection_med_mid'
                                        style={{ opacity: 0.5, cursor: 'not-allowed' }}
                                        onClick={() => renderPIL(medicine)}
                                        disabled>
                                        No available PIL Document
                                    </button>
                                )}

                                <button 
                                    className='btn_collection_med_right'
                                    style={buttonStyle}
                                    disabled={subscription}
                                    onClick={() => subscribe(medicine)}>
                                    Subscribe
                                </button>
                            </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
        </>
    );
};

export default MedicinePage;