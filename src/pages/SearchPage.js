import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useState, useEffect } from 'react';

export const SearchPage = ({subPageName, backTo}) => {
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

            // 
            console.log(`Medicine list: `);
            console.log(response.data.medicines.entities);

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

    return (
        <>
            <div>
                <h1>{subPageName} Page</h1>
            </div>
            <h2>This is the search page</h2>

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
                        <p>Medicine ID: {medicine.id}</p>
                        <p>Medicine Name: {medicine.name}</p>
                        <p>Document: {medicine.activeSPC.parsedSpc}</p>
                    </div>
                )}

                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
        </>
    );
};