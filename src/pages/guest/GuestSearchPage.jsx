import { Link, useNavigate } from 'react-router-dom';
import { Combobox } from '@headlessui/react';
import { useEffect, useState } from 'react';
import '../../styles/medicinePages/search_medicine.css';
import Axios from 'axios';
import { useDebounce } from '../../components/hooks/useDebounce';

const GuestSearchPage = ({ backTo }) => {
    const [medQuery, setMedQuery] = useState("");
    const [medicineList, setMedicineList] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const debouncedMedQuery = useDebounce(medQuery, 250); 

    const medicineChange = (event) => {
        setMedQuery(event.target.value);
    };
   
    useEffect(() => {
        setIsLoading(true);
        searchMedicine(debouncedMedQuery); 
    }, [debouncedMedQuery]); 

        
    const searchMedicine = async () => {
        setError("");

        if (debouncedMedQuery) {
            try {
                const response = await Axios.get(
                    `${process.env.REACT_APP_LOCALHOST}/getMeds`,
                    { params: { medQuery: medQuery } });
    
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
        <section className='main_container'>
            <div className='sub_container'>
                <div className='sub_container_header'>
                    <Link to={backTo}>
                        <button className='btn_return'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </Link>

                    <div className='main_title'>
                        <h1>Search Medicine</h1>
                    </div>
                </div>

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
                                        <div className="search_loading">Loading...</div>
                                    ) : medicineList === null && !medQuery ? (
                                        <div className="search_loading">Enter medicine to start searching...</div>
                                    ) : medicineList === null && medQuery ? (
                                        <div className='search_loading'>Medicine not found, try again...</div>
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
                {error && 
                    <div className='search_warning'>
                    <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>

                        <div>
                            <span className='font-medium'>{error}</span>
                        </div>
                    </div>
                }
            </div>
        </section>
        </>
    );
};

export default GuestSearchPage;