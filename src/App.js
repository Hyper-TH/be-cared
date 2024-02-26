import './App.css';
import {
	Routes,
	Route
} from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext.js';
import { 
	GuestPage, GuestSearchPage, GuestMedicinePage, 
	GuestPDFRenderPage, HomePage, LoginPage, 
	MedicinePage, SubscriptionsPage, SearchMedPage, 
	SearchDrugPage, FoodInteractionsPage, SearchProductPage, 
	ProductPage, PDFRenderPage 
} from './RouteImports.js';

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
					element={<GuestPage subPageName="Guest Home" backTo="/" />} 
				/>				

				<Route 
					path="/guest/search"
					element={<GuestSearchPage subPageName="Guest Search" backTo="/guestHome"/>}
				/>
				
				<Route 
					path="/guest/result/:medicineName/:pil/:company/:activeIngredient"
					element={<GuestMedicinePage subPageName="Guest Medicine" backTo="/guest/search" />}
				/>
				
				<Route 
					path="/guest/render/:medicineName/:pil/:company/:activeIngredient"
					element={<GuestPDFRenderPage subPageName="Guest Render" backTo="/guest/result" />}
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
						<SearchMedPage subPageName="Search" backTo="/home"/>
					</ProtectedRoute>
					} 
				/>				
				
				<Route 
					path="/searchDrugs" 
					element={
					<ProtectedRoute>
						<SearchDrugPage subPageName="Search" backTo="/home"/>
					</ProtectedRoute>
					} 
				/>				
				
				<Route 
					path="/foodInteractions" 
					element={
					<ProtectedRoute>
						<FoodInteractionsPage subPageName="Search" backTo="/home"/>
					</ProtectedRoute>
					} 
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
					<ProtectedRoute>
						<PDFRenderPage subPageName="Document" backTo="/result" />
					</ProtectedRoute>
					}
				/>

				
				<Route 
					path="/searchProduct" 
					element={
					<ProtectedRoute>
						<SearchProductPage subPageName="Merck" backTo="/home" />
					</ProtectedRoute>} 
				/>
				
				<Route 
					path="/result/test" 
					element={
					<ProtectedRoute>
						<ProductPage subPageName="Merck" backTo="/home" />
					</ProtectedRoute>} 
				/>

			</Routes>
		</AuthContextProvider>
		</>
	);
}

export default App;
