import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Axios from 'axios';

const GuestSearchPage = ({ backTo }) => {
    const [medQuery, setMedQuery] = useState("");
    const [medicineList, setMedicineList] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const medicineChange = (event) => {
        setMedQuery(event.target.value);
    };
     
    const searchMedicine = async () => {
        setIsLoading(true);
        setError("");

        if (medQuery) {
            try {
                const response = await Axios.get(`${process.env.REACT_APP_LOCALHOST}/getMeds?medQuery=${encodeURIComponent(medQuery)}`);
    
                if (response.data.medicines) {
                    setMedicineList(response.data.medicines.entities);
                } else {
                    setMedicineList([]);
                }
            } catch (error) {
                console.error(`Axios Error: ${error}`);
                setError("Local Server Error");
            }
            
        } else {
            setError("Input a medicine to start searching!")
        }
        
        setIsLoading(false);
    };

    const navigate = useNavigate();

    const handleViewDetails = (medicine) => {
        navigate(`/guest/result/${encodeURIComponent(medicine.name)}`, { state : { medicine }});
    };

    return (
        <>
            <h2>Medicine Search Page</h2>

            <div>
                <label>
                    Search a medicine:
                    <input type="text" value={medQuery} onChange={medicineChange} />
                </label>
                <button onClick={searchMedicine}>Search</button>
            </div>

            <div>
                <button>
                    <Link to={backTo}>Back to Home</Link>
                </button>

                {isLoading ? (
                    <div>Loading...</div>
                ) : medicineList === null ? (
                    // Render nothing if medicineList is null, which is the initial state before loading
                    null
                ) : medicineList.length > 0 ? (
                    // Map over the medicine list if it has items
                    medicineList.map((medicine) => (
                        <div key={medicine.id}>
                            <p>Medicine Name: {medicine.name}</p>
                            <button onClick={() => handleViewDetails(medicine)}>
                                View Medicine Details
                            </button>
                        </div>
                    ))
                ) : (
                    // If empty array
                    <div>No medicines found</div>
                )}

                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
        </>
    );
};

export default GuestSearchPage;