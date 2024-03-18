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
        
        if (medQuery) {
            try {
                const response = await Axios.get(
                    `${process.env.REACT_APP_LOCALHOST}/getMeds`,
                    {
                        params : { medQuery: medQuery }
                    }
                );
                   
                // console.log(response.data.medicines.entities[0].pils[0].activePil.file.name);
                // encodeURIComponent(medicine.pils[0].activePil.file.name) 

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
            setError("Input a medicine to start searching!");
        }
        
        setIsLoading(false);
    };

    const navigate = useNavigate();

    const handleViewDetails = (medicine) => {
        navigate(
            `/result/${encodeURIComponent(medicine.name)}`, 
            { state: { medicine }}
        );
    };
  
    return (
        <>
        <section className='main_container'>
            <div className='sub_container'>
            <h1 className="home_title">
                Search Medicine
            </h1>

            <div className='search_medicine_container'>
            <div className='search_medicine'>

            <form className="search_box">   
                <label>Search</label>
                <div className="relative">
                    <div className="search_icon">
                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>

                    <input type="search" className="search_input" placeholder="Search medicine..." required />
                    <button type="submit" className="search_med_btn">Search</button>
                </div>
            </form>

                <div className='search_bar'>
                    <label>
                        Search a medicine:
                        <input type="text" value={medQuery} onChange={medicineChange} />
                    </label>
                    
                    <button onClick={searchMedicine}>Search</button>
                </div>
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
                        <div className='search_medicine_list'>
                            <div key={medicine.id}>
                                <p>Medicine Name: {medicine.name}</p>
                                <button onClick={() => handleViewDetails(medicine)}>
                                    View Medicine Details
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    // If empty array
                    <div className='no_results'>No medicines found</div>
                )}

                {error && <p style={{ color: "red" }}>{error}</p>}
                </div>
            </div>
        </div>
        </section>
        </>
    );
};

export default SearchPage;