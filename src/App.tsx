import {lazy, Suspense} from "react";
import {BrowserRouter, Route, Routes} from "react-router";
import AppLayout from "./components/layout/AppLayout.tsx";
import RouteLoadingFallback from "@/components/ui/RouteLoadingFallback.tsx";
import {StandalonePageLoadingLayout} from "@/components/ui/PageLoadingBoundary.tsx";
import {APP_ROUTES} from "@/app/routes.constants.ts";
import RequireAuth from "@/components/auth/RequireAuth.tsx";

// Загружает страницу только при первом переходе на соответствующий маршрут.
const DashboardPage = lazy(() => import("./pages/DashboardPage.tsx"));
const OperationsPage = lazy(() => import("./pages/OperationsPage.tsx"));
const StoresPage = lazy(() => import("./pages/StoresPage.tsx"));
const StoreDetailsPage = lazy(() => import("./pages/StoreDetailsPage.tsx"));
const PayoutsAndBalancePage = lazy(() => import("./pages/PayoutsAndBalancePage.tsx"));
const DocumentsPage = lazy(() => import("./pages/DocumentsPage.tsx"));
const EventLogPage = lazy(() => import("./pages/EventLogPage.tsx"));
const DocumentationPage = lazy(() => import("./pages/DocumentationPage.tsx"));
const CompanyDetailsPage = lazy(() => import("./pages/CompanyDetailsPage.tsx"));
const UsersPage = lazy(() => import("./pages/UsersPage.tsx"));
const CompanyApplicationLayout = lazy(() => import("./pages/CompanyApplicationLayout.tsx"));
const CompanyApplicationPage = lazy(() => import("./pages/CompanyApplicationPage.tsx"));
const CompanyApplicationSignatoryPage = lazy(() => import("./pages/CompanyApplicationSignatoryPage.tsx"));
const CompanyApplicationPayoutAccountsPage = lazy(() => import("./pages/CompanyApplicationPayoutAccountsPage.tsx"));
const CompanyApplicationReviewPage = lazy(() => import("./pages/CompanyApplicationReviewPage.tsx"));
const AddCompanyPage = lazy(() => import("./pages/AddCompanyPage.tsx"));
const SignInPage = lazy(() => import("./pages/SignInPage.tsx"));
const SignUpPage = lazy(() => import("./pages/SignUpPage.tsx"));
const ErrorPage = lazy(() => import("./pages/ErrorPage.tsx"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage.tsx"));

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<RequireAuth />}>
                        <Route element={<AppLayout/>}>
                            <Route path={APP_ROUTES.home} element={<DashboardPage/>}/>
                            <Route path={APP_ROUTES.operations} element={<OperationsPage/>}/>
                            <Route path={APP_ROUTES.stores} element={<StoresPage/>}/>
                            <Route path={APP_ROUTES.storeDetails} element={<StoreDetailsPage/>}/>
                            <Route path={APP_ROUTES.balance} element={<PayoutsAndBalancePage/>}/>
                            <Route path={APP_ROUTES.documents} element={<DocumentsPage/>}/>
                            <Route path={APP_ROUTES.events} element={<EventLogPage/>}/>
                            <Route path={APP_ROUTES.documentation} element={<DocumentationPage/>}/>
                            <Route path={APP_ROUTES.company} element={<CompanyDetailsPage/>}/>
                            <Route path={APP_ROUTES.companyApplication} element={<CompanyApplicationLayout/>}>
                                <Route index element={<CompanyApplicationPage/>}/>
                                <Route path={APP_ROUTES.companyApplicationSignatory}
                                       element={<CompanyApplicationSignatoryPage/>}/>
                                <Route path={APP_ROUTES.companyApplicationPayoutAccounts}
                                       element={<CompanyApplicationPayoutAccountsPage/>}/>
                                <Route path={APP_ROUTES.companyApplicationReview}
                                       element={<CompanyApplicationReviewPage/>}/>
                            </Route>
                            <Route path={APP_ROUTES.users} element={<UsersPage/>}/>
                        </Route>
                    </Route>
                    <Route element={<StandalonePageLoadingLayout/>}>
                        <Route element={<RequireAuth/>}>
                            <Route path={APP_ROUTES.companyCreate} element={<AddCompanyPage/>}/>
                        </Route>
                        <Route path={APP_ROUTES.signIn} element={<SignInPage/>}/>
                        <Route path={APP_ROUTES.signUp} element={<SignUpPage/>}/>
                    </Route>
                    <Route
                        path={APP_ROUTES.error}
                        element={
                            <Suspense fallback={<RouteLoadingFallback fullScreen/>}>
                                <ErrorPage/>
                            </Suspense>
                        }
                    />
                    <Route
                        path="*"
                        element={
                            <Suspense fallback={<RouteLoadingFallback fullScreen/>}>
                                <NotFoundPage/>
                            </Suspense>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
