import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useState } from 'react';
import { Drug } from '../../components/drugBank/Drug';
import { DrugInteraction } from '../../components/drugBank/DrugInteraction';

// TODO: AUTO COMPLETE NOT COMPLETELY RESPONSIVE
const SearchDrugPage = ({backTo}) => {
	const [drugQuery, setDrugQuery] = useState("");	// Used for auto complete
	const [drugList, setDrugList] = useState([]);	// List for drug search
	const [drugs, setDrugs] = useState([]);			// Singular drug for CRUD operations on the list
	const [interactions, setInteractions] = useState(null);   // Interaction Results	
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");	

	// Trigger auto-complete for every input
  	const drugChange = (e) => {
      	setDrugQuery(e.target.value);

		searchDrug(drugQuery);
  	};

  	const searchDrug = async (input) => {
		setIsLoading(true);
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
			// console.error(`Axios Error: ${error}`);
			setDrugList([]);
			setError("Local Server Error");
		}

		setIsLoading(false);
 	};
	
	// Add drug to the list to be sent for interaction query
	const addDrug = (id, name) => {
		// Check if the drug with the same ID already exists in the list
		if (drugs.some(drug => drug.id === id)) {
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
		
		setDrugs([...drugs, newDrug]);
		setDrugList([]);
		setDrugQuery("");
	};

	// Delete drug from interaction list query
	const deleteDrug = (id) => {
		setDrugs(drugs.filter((drug) => drug.id !== id));	
	};

	// Query to get interactions based on the chosen list of drugs
	const getInteractions = async (drugs) => {
		
		if (drugs.length >= 2) {
			try {
				// Serialize the array into a JSON string
				const drugsJSON = JSON.stringify(drugs);
				// Encode the JSON string to be URL-safe
				const encodedDrugs = encodeURIComponent(drugsJSON);
		
				const res = await Axios.get(
					`${process.env.REACT_APP_LOCALHOST}/interactions`,
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
			setError("Choose at least 2 drugs!");
		}
	};

	return (
		<>
		<div className='drug_interactions'>
		<div className='title'>
			<h2>Drug Search Page</h2>
		</div>

		<div className='search_bar'>
			<label>
				{/* TODO: Improve input search bar so that it's "floating" */}
				Search a Drug:
				<input 
					type="text" 
					value={drugQuery}
					onChange={drugChange} 
				/>
			</label>
		</div>

		<div className="no_interactions_warning">
			<h3>If no interactions are found between two drugs, 
			it does not necessarily mean that no interactions exist. 
			Always consult with a healthcare professional.</h3>
		</div>
		
		<div className="drug_interaction_results">
			{interactions?.length === 0 ? (
				<div>No Interactions found</div>
			) : (
				interactions?.map((interaction) => {
					return(
						<DrugInteraction
							key={interaction.id}
							subject={interaction.subject}
							affected={interaction.affected}
							severity={interaction.severity}
							description={interaction.description}
							actual_description={interaction.actual_description}
							references={interaction.references}
						/>
					)
				}))
			}
		</div>

			<button>
				<Link to={backTo}>Back to Home</Link>
			</button>

			
			<div className="drug_interaction_list"> 
				{drugs?.map((drug) => {
					return (
						<Drug 
							key={drug.id}
							drugId={drug.id}
							drugName={drug.name}
							deleteDrug={deleteDrug}
						/>
					)
				})}
			</div>
			
			<button onClick={() => getInteractions(drugs)}>Get interactions</button>
			
			<div className="drug_search_list">
				{isLoading ?  (
					<div>Loading...</div>
				) : drugList.length === 0 && !drugQuery ? (
					<div>Enter drug to start searching...</div>
				) : drugList.length === 0 && drugQuery ? (
					<div>Drug not found, type more...</div>
				) : (
					drugList?.map((drug) => 
					<div key={drug.drugbank_pcid}>
						<p>Drug Name: {drug.name}</p>
	
						<button onClick={() => addDrug(drug.drugbank_pcid, drug.name)}>
							Add to interaction list
						</button>
					</div>
				))}
			</div>
			

			{error && <p style={{ color: "red" }}>{error}</p>}
		</div>
		</>
	);
}

export default SearchDrugPage;