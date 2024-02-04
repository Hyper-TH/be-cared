import './App.css';
import {
	BrowserRouter as
	Router,
	Routes,
	Route
} from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { SignedOutPage } from './pages/SignedOutPage';
import { SearchPage } from './pages/SearchPage';
import { MerckPage } from './pages/MerckPage';
import { MedicinePage } from './pages/MedicinePage';
import { HTMLRenderPage } from './pages/HTMLRenderPage';
import { PILRenderPage } from './pages/PILRenderPage';
import { CurrentUsers } from './pages/components/auth/CurrentUsers';

function App() {
	return (
		<>
		<Router>
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route 
					path="/home" 
					element={<HomePage subPageName="Home" backTo="/" />} 
				/>
				<Route 
					path="/loggedOut" 
					element={<SignedOutPage subPageName="LoggedOut" backTo="/" />} 
				/>

				{/* TEMPORARY CHECKER*/}
				<Route 
					path="/currentUsers" 
					element={<CurrentUsers subPageName="currentUsers" backTo="/" />} 
				/>

				<Route 
					path="/search" 
					element={<SearchPage subPageName="Search" backTo="/home" />} 
				/>
				<Route 
					path="/merck" 
					element={<MerckPage subPageName="Merck" backTo="/home" />} 
				/>
				<Route
					path="/result/:medicineName/:parsedSPC/:pil/:company/:activeIngredient"
					element={<MedicinePage subPageName="Medicine" backTo="/search" />}
				/>
				<Route
					path="/render/:medicineName/:parsedSPC/:pil/:company/:activeIngredient"
					element={<HTMLRenderPage subPageName="Document" backTo="/result" />}
				/>
				<Route
					path="/pil/:medicineName/:parsedSPC/:pil/:company/:activeIngredient"
					element={<PILRenderPage subPageName="Document" backTo="/result" />}
				/>
			</Routes>
		</Router>
		</>
	);
}

export default App;
