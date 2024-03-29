import { Link } from 'react-router-dom';
import Axios from 'axios';
import { Combobox } from "@headlessui/react";
import { useEffect, useState } from 'react';
import { Drug } from '../../components/drugBank/Drug';
import { FoodInteraction } from '../../components/drugBank/FoodInteraction';
import '../../styles/drugbankPages/food_interactions.css';
import { useDebounce } from '../../components/hooks/useDebounce';

const FoodInteractionsPage = ({backTo}) => {
    const [drugQuery, setDrugQuery] = useState("");	// Used for auto complete
    const [drugList, setDrugList] = useState([]);	// List for drug search
	const [drug, setDrugs] = useState([]);			// Singular drug for CRUD operations on the list
	const [interactions, setInteractions] = useState([]);   // Interaction Results	
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");	
	const debouncedDrugQuery = useDebounce(drugQuery, 250)

    // Trigger auto-complete for every input
  	const drugChange = (e) => {
        setDrugQuery(e.target.value);
    };

	useEffect(() => {
		setIsLoading(true);
		searchDrug(debouncedDrugQuery);
	}, [debouncedDrugQuery]);

  	const searchDrug = async (input) => {
		setError("");

		try {
			const res = await Axios.get(
				`${process.env.REACT_APP_LOCALHOST}/autoComplete`,
				{ params: { input: input } });

			if (res.data.drugs) {
				setDrugList(res.data.drugs);
			} else {
				setDrugList([]);
			}
		} catch (error) {
			console.error(`Axios Error: ${error}`);
			
			setDrugList([]);
			setError("Local Server Error");
		}

		setIsLoading(false);
 	};

    // Add drug to the state to be sent for interaction query
	const addDrug = (id, name) => {
		// Check if there is already a drug
		if (drug.some(drug => drug.id === id)) {
			// If the drug already exists, throw an error or show a message
			
			console.error('Drug already exists in the list');
			// Optionally, you can set an error state here
			return;
		}
	
		// If the drug doesn't exist in the list, add it
		const newDrug = {
			id: id,
			name: name,
		};
		
		setDrugs([...drug, newDrug]);
		setDrugList([]);
		setDrugQuery("");
	};

	// Delete drug from interaction list query
	const deleteDrug = (id) => {
		setDrugs(drug.filter((drug) => drug.id !== id));	
	};

    // Query to get interactions based on the chosen drug
	const getFoodInteractions = async (drugs) => {
		if (drugs.length > 0) {
			try {
				// Serialize the array into a JSON string
				const drugsJSON = JSON.stringify(drugs);
				// Encode the JSON string to be URL-safe
				const encodedDrugs = encodeURIComponent(drugsJSON);
		
				const res = await Axios.get(
					`${process.env.REACT_APP_LOCALHOST}/foodInteractions`,
					{ params: { drugs: encodedDrugs } });
		
				console.log(res.data.interactions);
				if (res.data.interactions) {
					setInteractions(res.data.interactions);
					
					setError("");
				} else {
					setInteractions([]);
	
					setError("Error retrieving interaction results");
				}
			} catch (error) {
				console.error(`Axios Error: ${error}`);
				setInteractions([]);
	
				setError("Local Server Error");
			}
		} else {
			setError("Choose at least 1 or more drugs!");
		}
	};

    return (
        <>
		<section className="main_container">
			<div className="sub_container">
				<div className='sub_container_header'>
                    <Link to={backTo}>
                        <button className='btn_return'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </Link>

                    <div className='main_title'>
                        <h1>Drug and Food Interactions</h1>
                    </div>
                </div>

				<div className="search_drug_container">
					<div className="search_drug">
						<div className="search_box">
							<Combobox as="div">
								<div className="flex items-center">
									<div className="search_icon">
										<svg
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
										>
											<path
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
											/>
										</svg>
									</div>

									<Combobox.Input
									className="search_input"
									onChange={drugChange}
									value={drugQuery}
									placeholder="Search drug to add to the list..."
									/>

								</div>

								<Combobox.Options className="combox_auto_complete">
									{isLoading ? (
										<div className="search_loading">Loading...</div>
									) : drugList === null && !drugQuery ? (
										<div className="search_loading">Enter drug to start searching...</div>
									) : drugList === null && drugQuery ? (
										<div className="search_loading">Drug not found, type more...</div>
									) : drugList.length > 0 ? (
										// Map over drug list if it has items
										drugList?.map((drug) => (
										<Combobox.Option key={drug.drugbank_pcid} value={drug}>
											{({ active }) => (
												<div onClick={() => addDrug(drug.drugbank_pcid, drug.name)}
												className={`cursor-pointer p-2 ${
													active
													? "text-white bg-blue-500"
													: "text-gray-800 hover:bg-gray-100"
												} border-b border-gray-800 last:border-b-0 first:rounded-t-md last:rounded-b-md`}>
												{drug.name}
												</div>
											)}
										</Combobox.Option>
									))) : (
										<div>
											No drugs found
										</div>
									)}
								</Combobox.Options>
							</Combobox>
						</div>
						</div>
				<div className="no_interactions_warning">
					<div>
						<svg className="info" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
							<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
						</svg>
						<b>Warning</b>: If no interactions are found, it does not
						necessarily mean that no interactions exist. Always consult with
						a healthcare professional.
					</div>
				</div>

				<div className="drug_interaction_list">
				{drug?.map((drug) => {
					return (
					<Drug
						key={drug.id}
						drugId={drug.id}
						drugName={drug.name}
						deleteDrug={deleteDrug}
					/>
					);
				})}
				</div>

				{drug.length === 0 ? (
					<p className="two_five">Add at least one up to 5 drugs</p>
				) : (
					<button className='btn_primary' onClick={() => getFoodInteractions(drug)}>
						Get interactions
					</button>
				)}

				
			</div>

			<div className="food_interaction_list">
				{interactions.map((interaction) => {
					return (
						<FoodInteraction
							key={interaction.id}
							name={interaction.name}
							num_interactions={interaction.num_interactions}
							interactions={interaction.interactions}
						/>
					)
				})}
			</div>

			{error && (
				<div className="search_warning">
				<svg
					className="flex-shrink-0 inline w-4 h-4 me-3"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 20 20"
				>
					<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
				</svg>

				<div>
					<span className="font-medium">{error}</span>
				</div>
				</div>
			)}
			</div>
		</section>
        </>
    )
}




export default FoodInteractionsPage