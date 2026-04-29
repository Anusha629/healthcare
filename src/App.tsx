import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAppStore } from "./store/useAppStore";
import { Suspense, lazy } from "react";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const AnalyticsPage = lazy(() => import("./pages/AnalyticsPage"));
const PatientListPage = lazy(() => import("./pages/PatientListPage"));
const PatientDetailsPage = lazy(() => import("./pages/PatientDetailsPage"));
const Layout = lazy(() => import("./components/Layout"));

function AuthGuard({ children }: { children: JSX.Element }) {
  const user = useAppStore((state) => state.user);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="route-loading">Loading…</div>}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <AuthGuard>
                <Layout />
              </AuthGuard>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="patients" element={<PatientListPage />} />
            <Route path="patients/:id" element={<PatientDetailsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
