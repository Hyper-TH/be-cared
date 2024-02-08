import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { useState, useEffect } from 'react';

const SearchPage = ({subPageName, backTo}) => {
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

            // console.log(`Medicine list: `);
            // console.log(response.data.medicines.entities);

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
            // medicineName: medicine.name,
            parsedSPC: medicine.activeSPC.parsedSpc,    // pass in uploadPath
            pil: medicine.activeSPC.file.name,
            // company: medicine.company.name,
            // activeIngredient: medicine.ingredients[0].name,
        });
        
        navigate({
            pathname: 
            `/result/${encodeURIComponent(medicine.name)}/${encodeURIComponent(medicine.activeSPC.parsedSpc)}/${encodeURIComponent(medicine.activeSPC.file.name)}/${encodeURIComponent(medicine.company.name)}/${encodeURIComponent(medicine.ingredients[0].name)}`,

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

                        {/* Button to redirect */}
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

export default SearchPage;