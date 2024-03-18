import { Link, useNavigate } from 'react-router-dom';
import { Combobox } from '@headlessui/react';
import Axios from 'axios';
import { useState } from 'react';

const SearchPage = ({ backTo }) => {
    const [medQuery, setMedQuery] = useState("");
    const [medicineList, setMedicineList] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const medicineChange = (event) => {
        setMedQuery(event.target.value);

        console.log(`Got: `, medQuery);

        searchMedicine(medQuery);
    };

    // TODO: Set grace period (after 500ms call the API)
    const searchMedicine = async () => {
        setIsLoading(true);
        setError("");
        
        if (medQuery) {
            console.log(`Searching for: `, medQuery);

            try {
                const response = await Axios.get(
                    `${process.env.REACT_APP_LOCALHOST}/getMeds`,
                    {
                        params : { medQuery: medQuery }
                    }
                );
                   
                console.log(response);
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
        <Link to={backTo} className='btn_primary'>Back to Home</Link>
            <div className='sub_container'>
                <h1 className="home_title">
                    Search Medicine
                </h1>

                <div className='search_medicine_container'>
                    <div className='search_medicine'>
                        <div className="search_box">
                            <Combobox as="div">                
                                <div className="flex items-center">
                                    <div className="search_icon">
                                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                        </svg>
                                    </div>

                                    <Combobox.Input
                                        className="search_input"
                                        onChange={medicineChange}
                                        value={medQuery}
                                        placeholder="Search medicine..."
                                    />

                                </div>

                                <Combobox.Options className="combox_auto_complete">
                                    {isLoading ? (
                                        <div className="loading">Loading...</div>
                                    ) : medicineList === null ? (
                                        null 
                                    ) : medicineList.length > 0 ? (
                                        // Map over the medicine list if it has items
                                        medicineList?.map((medicine) => (
                                        <Combobox.Option key={medicine.id} value={medicine}>
                                            {({ active }) => (
                                                <div onClick={() => handleViewDetails(medicine)} 
                                                    className={`cursor-pointer p-2 ${active ? 'text-white bg-blue-500' : 'text-gray-800 hover:bg-gray-100'} border-b border-gray-800 last:border-b-0 first:rounded-t-md last:rounded-b-md`}>
                                                    {medicine.name}
                                                </div>
                                            )}
                                        </Combobox.Option>

                                    ))) : (
                                        <div>
                                            No medicines found
                                        </div>
                                    )}
                                </Combobox.Options>
                            </Combobox>
                        </div>
                    </div>
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
        </section>
        </>
    );
};

export default SearchPage;