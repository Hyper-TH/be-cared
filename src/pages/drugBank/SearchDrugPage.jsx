import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { useState, useEffect } from 'react';

const SearchDrugPage = ({backTo}) => {
	const [drugQuery, setDrugQuery] = useState("");
	const [drugList, setDrugList] = useState([]);
	const [error, setError] = useState("");

  	const drugChange = (e) => {
      	setDrugQuery(e.target.value);
		searchDrug(drugQuery)
  	};

	// useEffect(() => {
	// 	console.log(medicineList);
	// }, [medicineList]);
		
  	const searchDrug = async (input) => {
		try {
			const response = await Axios.get(`http://localhost:8000/autoComplete?input=${encodeURIComponent(input)}`);

			if (response.data.drugs) {
				setDrugList(response.data.drugs);

				console.log(`Drug list: ${drugList}`);
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

	const navigate = useNavigate();

	const handleViewDetails = (medicine) => {
		navigate({
			pathname: 
			`/result/${encodeURIComponent(medicine.name)}/${encodeURIComponent(medicine.activeSPC.file.name)}/${encodeURIComponent(medicine.pils[0].activePil.file.name)}/${encodeURIComponent(medicine.company.name)}/${encodeURIComponent(medicine.ingredients[0].name)}`,
		});
	
	};

  return (
      <>
          <h2>Drug Search Page</h2>

          <div>
              <label>
                  Search a Drug:
                  <input type="text" onChange={drugChange} />
              </label>
              {/* <button onClick={searchMedicine}>Search</button> */}
          </div>

          <div>
              <button>
                  <Link to={backTo}>Back to Home</Link>
              </button>


              {drugList?.map((drug) => 
                  <div key={drug.drugbank_pcid}>
                      <p>Drug Name: {drug.name}</p>
                      <p>Drug Brand: {drug.brand}</p>

                      {/* <button onClick={() => handleViewDetails(medicine)}>
                          View Medicine Details
                      </button>
                       */}
                  </div>
              )}

              {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
      </>
  );
}

export default SearchDrugPage;