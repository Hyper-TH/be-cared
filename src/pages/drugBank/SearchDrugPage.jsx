import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import { Drug } from '../../components/Drug';

const SearchDrugPage = ({backTo}) => {
	const [drugQuery, setDrugQuery] = useState("");
	const [drugList, setDrugList] = useState([]);
	const [drugs, setDrugs] = useState([]);
	const [error, setError] = useState("");

  	const drugChange = (e) => {
      	setDrugQuery(e.target.value);
		searchDrug(drugQuery);
  	};

  	const searchDrug = async (input) => {
		try {
			const response = await Axios.get(`http://localhost:8000/autoComplete?input=${encodeURIComponent(input)}`);

			if (response.data.drugs) {
				setDrugList(response.data.drugs);

				setError("");

				for (let a of drugs) {
					console.log(a);
				}
				
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
		console.log(`Removing ${id}`);

		// Not removing
		setDrugs(drugs.filter((drug) => drug.id !== id));	
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