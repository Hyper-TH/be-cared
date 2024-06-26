import './App.css';
import { Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext.js';
import {
	LoginPage, SignUpPage, HomePage,
	GuestPage, GuestSearchPage, GuestMedicinePage,
	GuestPDFRenderPage, SearchMedPage, MedicinePage,
	PDFRenderPage, SubscriptionsPage, SearchDrugPage, 
	FoodInteractionsPage, SearchProductPage, ProductPage
} from './RouteImports.js';
import ProtectedRoute from './components/auth/ProtectedRoute.js';

function App() {
	return (
		<>
		<AuthContextProvider>
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route 
					path="/signUp" 
					element={<SignUpPage backTo="/"/>} />

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
					path="/guest/result/:medicineName"
					element={<GuestMedicinePage subPageName="Guest Medicine" backTo="/guest/search" />}
				/>
				
				<Route 
					path="/guest/render/:medicineName"
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
					path="/result/:medicineName"
					element={
					<ProtectedRoute>
						<MedicinePage subPageName="Medicine" backTo="/search" />
					</ProtectedRoute>
					}
				/>

				<Route
					
					path="/render/:medicineName/:type"
					element={
					<ProtectedRoute>
						<PDFRenderPage subPageName="Document" backTo="/result" />
					</ProtectedRoute>
					}
				/>

				{ /* START MERCK */ }
				<Route 
					path="/searchProduct" 
					element={
					<ProtectedRoute>
						<SearchProductPage subPageName="Merck" backTo="/home" />
					</ProtectedRoute>} 
				/>
				
				<Route 
					path="/result/product/:productName" 
					element={
					<ProtectedRoute>
						<ProductPage subPageName="Merck" backTo="/searchProduct" />
					</ProtectedRoute>} 
				/>
				{ /* END MERCK */ }

			</Routes>
		</AuthContextProvider>
		</>
	);
}

export default App;