import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { UserAuth } from '../context/AuthContext.js';
import { Medicine } from '../components/medicine/Medicine.js';
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

    return (
        <>
            <div className='title'>
                <h1>
                    Medicine Subscriptions
                </h1>
            </div>
            
            <div className="medicine_list">
                
                {isLoading ? (
                    <div>Loading...</div>
                ) : medicineList.length > 0 ? (
                    <>
                        <div>
                        {(notifications != 0) ? (
                           <p> Updated documents: {notifications}</p>

                        ) : (
                            <p>No updated documents</p>
                        )}
                        </div>
                
                    {medicineList.map((medicine) => (
                        
                        <Medicine 
                            key={medicine.medicineID}
                            medicine={medicine}
                            renderSPC={renderSPC}
                            renderPIL={renderPIL}
                            unsubscribe={unsubscribe}
                        />
                    ))}
                    </>
                ) : (
                    <div>No subscriptions found</div>
                )}

                <button>
                    <Link to={backTo}>Back to Home</Link>
                </button>

            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </>
    );
};

export default SubscriptionsPage;