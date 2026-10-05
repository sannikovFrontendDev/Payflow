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
                    <Route path="/users" element={<UsersPage />} />
                </Routes>
            </AppLayout>
        </BrowserRouter>
    </>
  )
}

export default App
