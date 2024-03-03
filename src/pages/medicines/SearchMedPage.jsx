import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { useState } from 'react';

const SearchPage = ({ backTo }) => {
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

        try {
            const response = await Axios.get(`http://localhost:8000/getMeds?medQuery=${encodeURIComponent(medQuery)}`);

            // console.log(response.data.medicines.entities);

            if (response.data.medicines) {
                setMedicineList(response.data.medicines.entities);
            } else {
                setMedicineList([]);
            }
        } catch (error) {
            console.error(`Axios Error: ${error}`);
            setError("Local Server Error");
        }
        setIsLoading(false);
    };

    const navigate = useNavigate();

    // TODO: shorten the pathname (base on SearchProductPage.jsx)
    const handleViewDetails = (medicine) => {
        navigate({
            pathname: 
            `/result/${encodeURIComponent(medicine.name)}/${encodeURIComponent(medicine.activeSPC.file.name)}/${encodeURIComponent(medicine.pils[0].activePil.file.name)}/${encodeURIComponent(medicine.company.name)}/${encodeURIComponent(medicine.ingredients[0].name)}`,
        });
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

export default SearchPage;