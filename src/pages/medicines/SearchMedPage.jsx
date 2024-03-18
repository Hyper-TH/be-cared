import { Link, useNavigate } from 'react-router-dom';
import { Combobox } from '@headlessui/react';
import Axios from 'axios';
import { useState } from 'react';

const SearchPage = ({ backTo }) => {
    const [medQuery, setMedQuery] = useState("");
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [medicineList, setMedicineList] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchMedicines = async (query) => {
        setIsLoading(true);
        setError("");
        
        if (!query) {
            setMedicineList([]);
            setError("Input a medicine to start searching!");
            setIsLoading(false);
            return;
        }

        try {
            const response = await Axios.get(
                `${process.env.REACT_APP_LOCALHOST}/getMeds`, { params : { medQuery: query } }
            );

            if (response.data.medicines) {
                // setMedicineList(response.data.medicines.entities);
                setMedicineList(response.data.medicines.entities.slice(0, 5));
            } else {
                setMedicineList([]);
            }
        } catch (error) {
            console.error(`Axios Error: ${error}`);
            setError("Local Server Error");
        }

        setIsLoading(false);
    };

    // const medicineChange = (event) => {
    //     setMedQuery(event.target.value);

    //     searchMedicine(medQuery);
    // };

    // const searchMedicine = async () => {
    //     setIsLoading(true);
    //     setError("");
        
    //     if (medQuery) {
    //         try {
    //             const response = await Axios.get(
    //                 `${process.env.REACT_APP_LOCALHOST}/getMeds`,
    //                 {
    //                     params : { medQuery: medQuery }
    //                 }
    //             );
                   
    //             // console.log(response.data.medicines.entities[0].pils[0].activePil.file.name);
    //             // encodeURIComponent(medicine.pils[0].activePil.file.name) 

    //             if (response.data.medicines) {
    //                 setMedicineList(response.data.medicines.entities);
    //             } else {
    //                 setMedicineList([]);
    //             }
    //         } catch (error) {
    //             console.error(`Axios Error: ${error}`);
    //             setError("Local Server Error");
    //         }
    //     } else {
    //         setError("Input a medicine to start searching!");
    //     }
        
    //     setIsLoading(false);
    // };

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

            {/* <form className="search_box">   
                <label>Search</label>
                <div className="relative">
                    <div className="search_icon">
                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>

                    <input 
                        type="text" 
                        className="search_input" 
                        placeholder="Search medicine..." 
                        value={medQuery} 
                        onChange={medicineChange} 
                    />

                    <button className="search_med_btn" onClick={searchMedicine}>
                        Search
                    </button>
                </div>
            </form> */}

        <div className="search_box relative max-w-md mx-auto">
            <Combobox as="div" value={selectedMedicine} onChange={setSelectedMedicine}>
                <Combobox.Label className="mb-2 text-sm font-medium text-gray-900 dark:text-white sr-only">Search:</Combobox.Label>
                <div className="flex items-center">
                    <div className="search_icon absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <Combobox.Input
                        className="search_input"
                        onChange={(event) => {
                            setMedQuery(event.target.value);
                            fetchMedicines(event.target.value);
                        }}
                        displayValue={(medicine) => medicine ? medicine.name : ""}
                        placeholder="Search medicine..."
                    />
                </div>

                    <Combobox.Options className="absolute z-10 w-full mt-1 overflow-auto text-sm bg-white shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {medicineList?.map((medicine) => (
                            <Combobox.Option key={medicine.id} value={medicine}>
                                {({ active }) => (
                                    <div className={`${active ? 'text-white bg-blue-500' : 'text-black'}`}>
                                        {medicine.name}
                                    </div>
                                )}
                            </Combobox.Option>
                        ))}
                    </Combobox.Options>
            </Combobox>
        </div>
            

                {/* {isLoading ? (
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
                )} */}

                {error && <p style={{ color: "red" }}>{error}</p>}
            <Link to={backTo} className='btn_primary'>Back to Home</Link>
                </div>
            </div>
        </div>
        </section>
        </>
    );
};

export default SearchPage;