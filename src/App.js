import './App.css';
import {
	Routes,
	Route
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage  from './pages/LoginPage';
import MedicinePage  from './pages/MedicinePage';
import SubscriptionsPage from './pages/SubscriptionsPage';
import SearchPage  from './pages/SearchPage';
import MerckPage  from './pages/MerckPage';
import HTMLRenderPage from './pages/HTMLRenderPage';
import PILRenderPage from './pages/PILRenderPage';
import { AuthContextProvider } from './context/AuthContext.js';
import ProtectedRoute from './components/auth/ProtectedRoute.js';

function App() {
	return (
		<>
		<AuthContextProvider>
			<Routes>
				<Route path="/" element={<LoginPage />} />

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
					path="/result/:medicineName/:parsedSPC/:pil/:company/:activeIngredient"
					element={
					<ProtectedRoute>
						<MedicinePage subPageName="Medicine" backTo="/search" />
					</ProtectedRoute>
					}
				/>
				<Route
					path="/render/:medicineName/:parsedSPC/:pil/:company/:activeIngredient"
					element={
					<ProtectedRoute>
						<HTMLRenderPage subPageName="Document" backTo="/result" />
					</ProtectedRoute>
					}
				/>
				<Route
					
					path="/pil/:medicineName/:parsedSPC/:pil/:company/:activeIngredient"
					element={
					<ProtectedRoute>
						<PILRenderPage subPageName="Document" backTo="/result" />
					</ProtectedRoute>
					}
				/>
			</Routes>
		</AuthContextProvider>
		</>
	);
}

export default App;
