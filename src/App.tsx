import { BrowserRouter, Route, Routes } from "react-router";
import DashboardPage from "./pages/DashboardPage.tsx";
import AppLayout from "./components/layout/AppLayout.tsx";
import OperationsPage from "./pages/OperationsPage.tsx";
import StoresPage from "./pages/StoresPage.tsx";
import StoreDetailsPage from "./pages/StoreDetailsPage.tsx";
import PayoutsAndBalancePage from "./pages/PayoutsAndBalancePage.tsx";
import DocumentsPage from "./pages/DocumentsPage.tsx";
import EventLogPage from "./pages/EventLogPage.tsx";
import DocumentationPage from "./pages/DocumentationPage.tsx";
import CompanyDetailsPage from "./pages/CompanyDetailsPage.tsx";
import UsersPage from "./pages/UsersPage.tsx";
import CompanyApplicationLayout from "./pages/CompanyApplicationLayout.tsx";
import CompanyApplicationPage from "./pages/CompanyApplicationPage.tsx";
import CompanyApplicationSignatoryPage from "./pages/CompanyApplicationSignatoryPage.tsx";
import CompanyApplicationPayoutAccountsPage from "./pages/CompanyApplicationPayoutAccountsPage.tsx";
import CompanyApplicationReviewPage from "./pages/CompanyApplicationReviewPage.tsx";
import AddCompanyPage from "./pages/AddCompanyPage.tsx";
import SignInPage from "./pages/SignInPage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import { StandalonePageLoadingLayout } from "@/components/ui/PageLoadingBoundary.tsx";

function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>
                    <Route element={<AppLayout />}>
                        <Route path="/" element={<DashboardPage/>} />
                        <Route path="/operations" element={<OperationsPage/>} />
                        <Route path="/stores" element={<StoresPage/>} />
                        <Route path="/stores/studio" element={<StoreDetailsPage />} />
                        <Route path="/balance" element={<PayoutsAndBalancePage />} />
                        <Route path="/documents" element={<DocumentsPage />} />
                        <Route path="/events" element={<EventLogPage />} />
                        <Route path="/documentation" element={<DocumentationPage />} />
                        <Route path="/company" element={<CompanyDetailsPage />} />
                        <Route path="/company/application" element={<CompanyApplicationLayout />}>
                            <Route index element={<CompanyApplicationPage />} />
                            <Route path="signatory" element={<CompanyApplicationSignatoryPage />} />
                            <Route path="payout-accounts" element={<CompanyApplicationPayoutAccountsPage />} />
                            <Route path="review" element={<CompanyApplicationReviewPage />} />
                        </Route>
                        <Route path="/users" element={<UsersPage />} />
                    </Route>
                    <Route element={<StandalonePageLoadingLayout />}>
                        <Route path="/company/new" element={<AddCompanyPage />} />
                        <Route path="/sign-in" element={<SignInPage />} />
                        <Route path="/sign-up" element={<SignUpPage />} />
                    </Route>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
