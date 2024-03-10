import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { UserAuth } from '../context/AuthContext.js';
import Axios from 'axios';

const SubscriptionsPage = ({subPageName, backTo}) => {
    const { user } =  UserAuth();
    const [medicineList, setMedicineList] = useState(null);
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
    
            if (response.data && response.data.medicines) {
                setMedicineList(response.data.medicines);
            } else {
                setMedicineList([]);
            }
        } catch (error) {
            console.error(`Axios Error: ${error}`);
            setError("Failed to load subscribed medicines.");
        } finally {
            setIsLoading(false);
        }
    }, [user.email]);


    const unsubscribe = async (medicine) => {
        try {
            await Axios.get(
                `${process.env.REACT_APP_LOCALHOST}/unSub`,
                {
                    params: { user: user.email, id: medicine.id }
                }
            );

        } catch (error) {
            console.error(`Axios Error: ${error}`);
            setError("Local Server Error");
        }

        getMedicines();
    };
    
    const renderSPC = (medicine) => {
        const type = "SPC";
        const filePath = medicine.spc;

        navigate(
            `/render/${encodeURIComponent(medicine.name)}/${encodeURIComponent(type)}`, 
            { state: { medicine, filePath, type } }
        );
    };

    const renderPIL = (medicine) => {
        const type = "PIL";
        const filePath = medicine.pil;

        navigate(
            `/render/${encodeURIComponent(medicine.name)}/${encodeURIComponent(type)}`, 
            { state: { medicine, filePath, type } } 
        );
    };

    useEffect(() => {
        if (user && user.email) {
            getMedicines();
        }
    }, [user, getMedicines]); // Depend on `user` so that `getMedicines` runs again if `user` changes

    return (
        <>
            <h1>{subPageName}</h1>
            
            <div className="medicine_list">
                {isLoading ? (
                    <div>Loading...</div>
                ) : medicineList === null ? (
                    // Render nothing if medicineList is null, which is the initial state before loading
                    null
                ) : medicineList.length > 0 ? (
                    // Map over the medicine list if it has items
                    medicineList.map((medicine) => (
                        <div key={medicine.id}>
                            <p>Medicine Name: {decodeURIComponent(medicine.name)}</p>
                            <button onClick={() => renderSPC(medicine)}>
                                View SPC Document
                            </button>
                            <button onClick={() => renderPIL(medicine)}>
                                View PIL Document
                            </button>
                            <button onClick={() => unsubscribe(medicine)}>
                                Unsubscribe to this medicine
                            </button>
                        </div>
                    ))
                ) : (
                    // If empty array
                    <div>No medicines found</div>
                )}

            </div>

            <button>
                <Link to={backTo}>Back to Home</Link>
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </>
    );
};

export default SubscriptionsPage;