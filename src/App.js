import './App.css';
import {
	BrowserRouter as
	Router,
	Routes,
	Route
} from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { MerckPage } from './pages/MerckPage';
import { ServerTest } from './pages/components/ServerTest';
import { MedicinePage } from './pages/MedicinePage';
import { HTMLRenderPage } from './pages/HTMLRenderPage';

function App() {
	return (
		<>
		<Router>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route 
					path="/search" 
					element={<SearchPage subPageName="Search" backTo="/" />} 
				/>
				<Route 
					path="/merck" 
					element={<MerckPage subPageName="Merck" backTo="/" />} 
				/>
				<Route 
					path="/serverTest" 
					element={<ServerTest subPageName="Server" backTo="/" />} 
				/>
				<Route
					path="/result/:medicineName/:parsedSPC"
					element={<MedicinePage subPageName="Medicine" backTo="/search" />}
				/>
				<Route
					path="/render/:medicineName/:parsedSPC"
					element={<HTMLRenderPage subPageName="Document" backTo="/result" />}
				/>
			</Routes>
		</Router>
		</>
	);
}

export default App;
