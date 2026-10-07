import { BrowserRouter, Route, Routes } from "react-router";
import DashboardPage from "./pages/DashboardPage.tsx";
import AppLayout from "./components/layout/AppLayout.tsx";
import OperationsPage from "./pages/OperationsPage.tsx";
import StoresPage from "./pages/StoresPage.tsx";
import PayoutsAndBalancePage from "./pages/PayoutsAndBalancePage.tsx";
import DocumentsPage from "./pages/DocumentsPage.tsx";
import EventLogPage from "./pages/EventLogPage.tsx";
import DocumentationPage from "./pages/DocumentationPage.tsx";
import CompanyDetailsPage from "./pages/CompanyDetailsPage.tsx";
import UsersPage from "./pages/UsersPage.tsx";
import CompanyApplicationPage from "./pages/CompanyApplicationPage.tsx";
import CompanyApplicationSignatoryPage from "./pages/CompanyApplicationSignatoryPage.tsx";
import CompanyApplicationPayoutAccountsPage from "./pages/CompanyApplicationPayoutAccountsPage.tsx";
import CompanyApplicationReviewPage from "./pages/CompanyApplicationReviewPage.tsx";

function App() {

  return (
    <>
        <BrowserRouter>
            <AppLayout>
                <Routes>
                    <Route path="/" element={<DashboardPage/>} />
                    <Route path="/operations" element={<OperationsPage/>} />
                    <Route path="/stores" element={<StoresPage/>} />
                    <Route path="/balance" element={<PayoutsAndBalancePage />} />
                    <Route path="/documents" element={<DocumentsPage />} />
                    <Route path="/events" element={<EventLogPage />} />
                    <Route path="/documentation" element={<DocumentationPage />} />
                    <Route path="/company" element={<CompanyDetailsPage />} />
                    <Route path="/company/application" element={<CompanyApplicationPage />} />
                    <Route path="/company/application/signatory" element={<CompanyApplicationSignatoryPage />} />
                    <Route path="/company/application/payout-accounts" element={<CompanyApplicationPayoutAccountsPage />} />
                    <Route path="/company/application/review" element={<CompanyApplicationReviewPage />} />
                    <Route path="/users" element={<UsersPage />} />
                </Routes>
            </AppLayout>
        </BrowserRouter>
    </>
  )
}

export default App
