import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useState } from 'react';
import { Drug } from '../../components/drugBank/Drug';
import { FoodInteraction } from '../../components/drugBank/FoodInteraction';

const FoodInteractionsPage = ({backTo}) => {
    const [drugQuery, setDrugQuery] = useState("");	// Used for auto complete
    const [drugList, setDrugList] = useState([]);	// List for drug search
	const [drug, setDrugs] = useState([]);			// Singular drug for CRUD operations on the list
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
	};

	// Delete drug from interaction list query
	const deleteDrug = (id) => {
		setDrugs(drug.filter((drug) => drug.id !== id));	
	};

    // Query to get interactions based on the chosen drug
	const getFoodInteractions = async (drugs) => {
		try {
			// Serialize the array into a JSON string
			const drugsJSON = JSON.stringify(drugs);
			// Encode the JSON string to be URL-safe
			const encodedDrugs = encodeURIComponent(drugsJSON);
	
			const res = await Axios.get(`http://localhost:8000/foodInteractions?drugs=${encodedDrugs}`);
	
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
        <h2>Food Interactions Page</h2>

        <div>
			<label>
				{/* TODO: Improve input search bar so that it's "floating" */}
				Search a Drug:
				<input type="text" onChange={drugChange} />
			</label>
		</div>

		<div className="food_interaction_results">
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

		<div>
			<button>
				<Link to={backTo}>Back to Home</Link>
			</button>

			
			<div className="drug_interaction_list"> 
				{drug.map((drug) => {
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

            <button onClick={() => getFoodInteractions(drug)}>Get food interactions</button>

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
    )
}

export default FoodInteractionsPage