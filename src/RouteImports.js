/* LOGIN */
import LoginPage  from './pages/LoginPage.jsx';
import SignUpPage  from './pages/SignUpPage.jsx';

/* GUEST */
import GuestPage from './pages/guest/GuestPage.jsx';
import GuestSearchPage from './pages/guest/GuestSearchPage.jsx';
import GuestMedicinePage from './pages/guest/GuestMedicinePage.jsx';
import GuestPDFRenderPage from './pages/guest/GuestPDFRenderPage.jsx';

/* REGISTERED */
import HomePage from './pages/HomePage.jsx';
import MedicinePage  from './pages/medicines/MedicinePage.jsx';
import SubscriptionsPage from './pages/SubscriptionsPage.jsx';
import SearchMedPage  from './pages/medicines/SearchMedPage.jsx';
import PDFRenderPage from './pages/medicines/PDFRenderPage.jsx';

/* VERIFIED */
import SearchDrugPage from './pages/drugBank/SearchDrugPage.jsx';
import FoodInteractionsPage from './pages/drugBank/FoodInteractionsPage.jsx';
import SearchProductPage  from './pages/merck/SearchProductPage.jsx';
import ProductPage  from './pages/merck/ProductPage.jsx';

export { 	
	LoginPage, SignUpPage, HomePage,
	GuestPage, GuestSearchPage, GuestMedicinePage,
	GuestPDFRenderPage, SearchMedPage, MedicinePage,
	PDFRenderPage, SubscriptionsPage, SearchDrugPage, 
	FoodInteractionsPage, SearchProductPage, ProductPage
};
