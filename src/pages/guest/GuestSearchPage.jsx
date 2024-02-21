import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { useState, useEffect } from 'react';

// TODO: Not being redirected properly to the medicine info page
const GuestSearchPage = ({subPageName, backTo}) => {
    const [medQuery, setMedQuery] = useState("");
    const [medicineList, setMedicineList] = useState([]);
    const [error, setError] = useState("");

    const medicineChange = (event) => {
        setMedQuery(event.target.value);
    };

    useEffect(() => {
        console.log(medicineList);
    }, [medicineList]);
      
    const searchMedicine = async () => {
        try {
            const response = await Axios.get(`http://localhost:8000/getMeds?medQuery=${encodeURIComponent(medQuery)}`);

            if (response.data.medicines) {
                setMedicineList(response.data.medicines.entities);

                console.log(`Medicine list: ${medicineList}`);
                setError("");

            } else {
                setMedicineList([]);
                setError("Error retrieving medicines");
            }
        } catch (error) {
            console.error(`Axios Error: ${error}`);
            setMedicineList([]);
            setError("Local Server Error");
        }
    };

    const navigate = useNavigate();

    const handleViewDetails = (medicine) => {

        console.log({
            pil: medicine.pils[0].activePil.file.name
        });
        
        navigate({
            pathname: 
            `/guest/result/${encodeURIComponent(medicine.name)}/${encodeURIComponent(medicine.pils[0].activePil.file.name)}/${encodeURIComponent(medicine.company.name)}/${encodeURIComponent(medicine.ingredients[0].name)}`,

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

                {medicineList?.map((medicine) => 
                    <div key={medicine.id}>
                        <p>Medicine Name: {medicine.name}</p>

                        <button onClick={() => handleViewDetails(medicine)}>
                            View Medicine Details
                        </button>
                        
                    </div>
                )}

                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
        </>
    );
};

export default GuestSearchPage;