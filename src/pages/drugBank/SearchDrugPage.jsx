import { Link } from "react-router-dom";
import Axios from "axios";
import { Combobox } from "@headlessui/react";
import { useState } from "react";
import { Drug } from "../../components/drugBank/Drug";
import { DrugInteraction } from "../../components/drugBank/DrugInteraction";
import '../../styles/drugbankPages/drug_interactions.css';

// TODO: AUTO COMPLETE NOT COMPLETELY RESPONSIVE
const SearchDrugPage = ({ backTo }) => {
	const [drugQuery, setDrugQuery] = useState(""); // Used for auto complete
	const [drugList, setDrugList] = useState([]); // List for drug search
	const [drugs, setDrugs] = useState([]); // Singular drug for CRUD operations on the list
	const [interactions, setInteractions] = useState(null); // Interaction Results
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
			{ params: { input: input } }
		);

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
		if (drugs.some((drug) => drug.id === id)) {
			// If the drug already exists, throw an error or show a message

			console.error("Drug already exists in the list");
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
		if (drugs.length != 5) {
			try {
				// Serialize the array into a JSON string
				const drugsJSON = JSON.stringify(drugs);
				// Encode the JSON string to be URL-safe
				const encodedDrugs = encodeURIComponent(drugsJSON);

				const res = await Axios.get(
				`${process.env.REACT_APP_LOCALHOST}/interactions`,
				{ params: { drugs: encodedDrugs } }
				);

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
			setError("Exceeded limit of 5 drugs!");
		}
	};

	return (
		<>
		<section className="main_container">
		<Link to={backTo} className="btn_primary">Back</Link>
			<div className="sub_container">
				<h1 className="home_title">Drug Interactions</h1>

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
									placeholder="Search drug..."
									/>

								</div>

								<Combobox.Options className="combox_auto_complete">
									{isLoading ? (
										<div className="loading">Loading...</div>
									) : drugList === null && !drugQuery ? (
										<div className="loading">Enter drug to start searching...</div>
									) : drugList.length === 0 && drugQuery ? (
										<div className="loading">Drug not found, type more...</div>
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
						<svg class="info" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
							<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
						</svg>
						<b>Warning</b>: If no interactions are found between two drugs, it does not
						necessarily mean that no interactions exist. Always consult with
						a healthcare professional.
					</div>
				</div>

				<div className="drug_interaction_list">
				{drugs?.map((drug) => {
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

				{drugs.length === 0 || drugs.length === 1 ? (
					<p>Add at least two and up to 5 drugs</p>
				) : (
					<button className='btn_primary' onClick={() => getInteractions(drugs)}>
						Get interactions
					</button>
				)}

				
			</div>

			<div className="drug_interaction_results">
				{interactions?.length === 0 ? (
					<div>No Interactions found</div>
				) : (
					interactions?.map((interaction) => {
					return (
						<DrugInteraction
						key={interaction.id}
						subject={interaction.subject}
						affected={interaction.affected}
						severity={interaction.severity}
						description={interaction.description}
						actual_description={interaction.actual_description}
						references={interaction.references}
						/>
					);
					})
				)}
			</div>

			{error && (
				<div className="error">
				<svg
					class="flex-shrink-0 inline w-4 h-4 me-3"
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
	);
};

export default SearchDrugPage;
