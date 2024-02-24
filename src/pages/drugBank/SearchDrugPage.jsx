import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useState } from 'react';
import { Drug } from '../../components/drugBank/Drug';
import { DrugInteraction } from '../../components/drugBank/DrugInteraction';

const SearchDrugPage = ({backTo}) => {
	const [drugQuery, setDrugQuery] = useState("");	// Used for auto complete
	const [drugList, setDrugList] = useState([]);	// List for drug search
	const [drugs, setDrugs] = useState([]);			// Singular drug for CRUD operations on the list
	const [interactions, setInteractions] = useState([]);   // Interaction Results	
	const [error, setError] = useState("");	

	// Trigger auto-complete for every input
	// TODO: Improve performance
  	const drugChange = (e) => {
      	setDrugQuery(e.target.value);

		searchDrug(drugQuery);
  	};

  	const searchDrug = async (input) => {

		try {
			const res = await Axios.get(`http://localhost:8000/autoComplete?input=${encodeURIComponent(input)}`);

			if (res.data.drugs) {
				setDrugList(res.data.drugs);

				setError("");
			} else {
				setDrugList([]);

				setError("Error retrieving Drugs");
			}
		} catch (error) {
			console.error(`Axios Error: ${error}`);
			setDrugList([]);

			setError("Local Server Error");
		}
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
	};

	// Delete drug from interaction list query
	const deleteDrug = (id) => {
		setDrugs(drugs.filter((drug) => drug.id !== id));	
	};

	// Query to get interactions based on the chosen list of drugs
	const getInteractions = async (drugs) => {
		try {
			// Serialize the array into a JSON string
			const drugsJSON = JSON.stringify(drugs);
			// Encode the JSON string to be URL-safe
			const encodedDrugs = encodeURIComponent(drugsJSON);
	
			const res = await Axios.get(`http://localhost:8000/interactions?drugs=${encodedDrugs}`);
	
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
	};

	return (
		<>
		<h2>Drug Search Page</h2>

		<div>
			<label>
				{/* TODO: Improve input search bar so that it's "floating" */}
				Search a Drug:
				<input type="text" onChange={drugChange} />
			</label>
		</div>

		<div className="drug_interaction_results">
			{interactions.map((interaction) => {
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
			})}
		</div>

		<div>
			<button>
				<Link to={backTo}>Back to Home</Link>
			</button>

			
			<div className="drug_interaction_list"> 
				{drugs.map((drug) => {
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

			{drugList?.map((drug) => 
			<div key={drug.drugbank_pcid}>
				<p>Drug Name: {drug.name}</p>

				<button onClick={() => addDrug(drug.drugbank_pcid, drug.name)}>
					Add to interaction list
				</button>
			</div>
			)}

			{error && <p style={{ color: "red" }}>{error}</p>}
		</div>
		</>
	);
}

export default SearchDrugPage;