import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useState } from 'react';
import { Drug } from '../../components/Drug';

const SearchDrugPage = ({backTo}) => {
	const [drugQuery, setDrugQuery] = useState("");
	const [drugList, setDrugList] = useState([]);
	const [drugs, setDrugs] = useState([]);
	const [response, setResponse] = useState("");
	const [error, setError] = useState("");

  	const drugChange = (e) => {
      	setDrugQuery(e.target.value);
		searchDrug(drugQuery);
  	};

	// TODO: When the user has chosen a drug, clear the search
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
	};

	const deleteDrug = (id) => {

		setDrugs(drugs.filter((drug) => drug.id !== id));	
	};

	const getInteractions = async (drugs) => {
		try {
			// Serialize the array into a JSON string
			const drugsJSON = JSON.stringify(drugs);
			// Encode the JSON string to be URL-safe
			const encodedDrugs = encodeURIComponent(drugsJSON);
	
			const res = await Axios.get(`http://localhost:8000/interactions?drugs=${encodedDrugs}`);
	
			console.log(`${res}`);
			if (res.data) {
				setResponse(res.data);
				
				setError("");
			} else {
				setResponse(null);
				setError("Error retrieving interaction results");
			}
		} catch (error) {
			console.error(`Axios Error: ${error}`);
			setResponse(null);
			setError("Local Server Error");
		}
	};

	return (
		<>
		<h2>Drug Search Page</h2>

		<div>
			<label>
				Search a Drug:
				<input type="text" onChange={drugChange} />
			</label>
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