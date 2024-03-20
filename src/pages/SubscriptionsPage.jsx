import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { UserAuth } from '../context/AuthContext.js';
import { Medicine } from '../components/medicine/Medicine.js';
import '../styles/subscriptions.css';
import Axios from 'axios';

const SubscriptionsPage = ({ backTo }) => {
    const { user } =  UserAuth();
    const [medicineList, setMedicineList] = useState([]);
    const [notifications, setNotifications] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const getMedicines = useCallback(async () => {
        setIsLoading(true);
        setError("");

        try {
            const response = await Axios.get(
                `${process.env.REACT_APP_LOCALHOST}/getSubs`,
                { params: { user: user.email } }
            );
            
            // Directly accessing data and count from response.data
            const { medicines, count } = response.data;
            console.log(medicines);
            
            if (medicines) {
                setMedicineList(medicines);
                setNotifications(count);
            } else {
                setMedicineList([]);
            }
        } catch (error) {
            console.error(`Axios Error: ${error}`);
            setError("Failed to load subscribed medicines.");
        } 
                    
        setIsLoading(false);
    }, [user.email]);


    const unsubscribe = async (medicine) => {
        try {
            await Axios.get(
                `${process.env.REACT_APP_LOCALHOST}/unSub`,
                {
                    params: { user: user.email, id: medicine.medicineID }
                }
            );

        } catch (error) {
            console.error(`Axios Error: ${error}`);
            setError("Local Server Error");
        }

        getMedicines();
    };
    

    useEffect(() => {
        if (user && user.email) {
            getMedicines();
        }
    }, [user, getMedicines]); // Depend on `user` so that `getMedicines` runs again if `user` changes

    const renderSPC = (medicine) => {
        const type = "spc";
        const path = medicine.spc.path;
        const id = medicine.medicineID;

        navigate(
            `/render/${encodeURIComponent(medicine.medicineName)}/${encodeURIComponent(type)}`, 
            { state: { id, medicine, path, type } }
        );
    };

    const renderPIL = (medicine) => {
        const type = "pil";
        const path = medicine.pil.path;
        const id = medicine.medicineID;

        navigate(
            `/render/${encodeURIComponent(medicine.medicineName)}/${encodeURIComponent(type)}`, 
            { state: { id, medicine, path, type } } 
        );
    };

    // Dedicated div for number of notifications
    // Each medicine list will be its own row
    return (
        <>
        <section className='main_container'>
            <Link to={backTo} className='btn_primary'>Return</Link>
            <div className='sub_container'>
                <h1 className='main_title'>
                    Medicine Subscriptions
                </h1>

                <div className="medicine_list">
                
                    {isLoading ? (
                        <div className='loading'>Loading...</div>
                    ) : medicineList.length > 0 ? (
                        <>
                            <div className='updated_documents_container'>
                                {(notifications !== 0) ? (
                                    <div className='updated_documents'>
                                        <p> Updated documents: {notifications}</p>
                                    </div>
                                ) : (
                                    <div className='updated_documents'>
                                        <p>No updated documents</p>
                                    </div>
                                )}
                            </div>
                    
                            <div className='medicine_list_container'>
                                {medicineList.map((medicine) => (
                                    
                                    <Medicine 
                                        key={medicine.medicineID}
                                        medicine={medicine}
                                        renderSPC={renderSPC}
                                        renderPIL={renderPIL}
                                        unsubscribe={unsubscribe}
                                    />
                                ))}
                            </div>    
                            
                        </>
                    ) : (
                        <div>No subscriptions found</div>
                    )}

                </div>

            </div>

            {error && 
                <div className='error'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>

                    <div>
                        <span className='font-medium'>{error}</span>
                    </div>
                </div>
            }
        </section>
        </>
    );
};

export default SubscriptionsPage;