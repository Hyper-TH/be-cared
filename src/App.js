import './App.css';
import {
	Routes,
	Route
} from 'react-router-dom';
import GuestPage from './pages/guest/GuestPage.jsx';
import GuestSearchPage from './pages/guest/GuestSearchPage.jsx';
import GuestMedicinePage from './pages/guest/GuestMedicinePage.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage  from './pages/LoginPage.jsx';
import MedicinePage  from './pages/MedicinePage.jsx';
import SubscriptionsPage from './pages/SubscriptionsPage.jsx';
import SearchPage  from './pages/SearchPage.jsx';
import MerckPage  from './pages/MerckPage.jsx';
import PDFRenderPage from './pages/PDFRenderPage.jsx';
import { AuthContextProvider } from './context/AuthContext.js';
import ProtectedRoute from './components/auth/ProtectedRoute.js';

function App() {
	return (
		<>
		<AuthContextProvider>
			<Routes>
				<Route path="/" element={<LoginPage />} />


				{/* START GUEST PAGES */}
				<Route 
					path="/guestHome" 
					element={
						<GuestPage subPageName="Home" backTo="/" />
					} 
				/>				
				<Route 
					path="/guestSearch" 
					element={
						<GuestSearchPage subPageName="Guest Search" backTo="/guestHome" />
					} 
				/>				
				
				<Route 
					path="/guestMedicine" 
					element={
						<GuestMedicinePage subPageName="Guest Medicine" backTo="/guestHome" />
					} 
				/>
				{/* END GUEST PAGES */}
				
				<Route 
					path="/home" 
					element={
					<ProtectedRoute>
						<HomePage subPageName="Home" backTo="/" />
					</ProtectedRoute>
					} 
				/>

				<Route 
					path="/subscriptions" 
					element={
					<ProtectedRoute>
						<SubscriptionsPage subPageName="Subscriptions" backTo="/home" />
					</ProtectedRoute>
					} 
				/>

				<Route 
					path="/search" 
					element={
					<ProtectedRoute>
						<SearchPage subPageName="Search" backTo="/home" />
					</ProtectedRoute>
					} 
				/>

				<Route 
					path="/merck" 
					element={
					<ProtectedRoute>
						<MerckPage subPageName="Merck" backTo="/home" />
					</ProtectedRoute>} 
				/>

				<Route
					path="/result/:medicineName/:spc/:pil/:company/:activeIngredient"
					element={
					<ProtectedRoute>
						<MedicinePage subPageName="Medicine" backTo="/search" />
					</ProtectedRoute>
					}
				/>

				<Route
					
					path="/render/:medicineName/:spc/:pil/:company/:activeIngredient/:type"
					element={
						<PDFRenderPage subPageName="Document" backTo="/result" />
					}
				/>
			</Routes>
		</AuthContextProvider>
		</>
	);
}

export default App;
