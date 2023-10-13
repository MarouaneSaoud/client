import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";


const Dashboard = lazy(() => import("./pages/dashboard"));
const Login2 = lazy(() => import("./pages/auth/login2"));
const ForgotPass2 = lazy(() => import("./pages/auth/forgot-password2"));
const LockScreen2 = lazy(() => import("./pages/auth/lock-screen2"));
const Error = lazy(() => import("./pages/404"));
const NotAuthorized = lazy(() => import("./pages/403"));

import Layout from "./layout/Layout";

const  CompanyForm = lazy(() => import("./pages/admin/forms/companyForm.jsx"));
const  ReferenceForm = lazy(() => import("./pages/admin/model/referenceForm.jsx"));
const  DevicesForm = lazy(() => import("./pages/admin/forms/devicesForm"));
const  AdminForm = lazy(() => import("./pages/admin/forms/AdminForm.jsx"));
const  Companyliste = lazy(() => import("./pages/admin/Tables/companyliste"));
const  Devicesliste = lazy(() => import("./pages/admin/Tables/devicesliste"));
const  Adminliste = lazy(() => import("./pages/admin/Tables/Adminliste.jsx"));
const ViewCompany=lazy(() =>import ("./pages/admin/views/viewCompany"));
const ManagerDashboard =lazy(()=> import("./pages/dashboard/managerDashboard"))
const ClientForm = lazy(() => import("./pages/manager/Forms/clientForm"));
const ListClient = lazy(() => import("./pages/manager/Tables/listClient"));
const ManagerDevice = lazy(() => import("./pages/manager/Tables/managerDevice"));
const GroupeDevice = lazy(()=> import("./pages/manager/Tables/listGroupe"))
const DetailGroup = lazy(()=> import("./pages/manager/Tables/detailsGroup"))
const Configuration = lazy(()=> import("./pages/manager/Forms/configForm.jsx"))
const HelloPage = lazy(()=> import("./pages/dashboard/clientDashboard"))

import Loading from "@/components/Loading";
function App() {
    const responsiveStyles = {
        fontSize: '16px',
        '@media (min-width: 768px)': {
            fontSize: '18px',
        },
        '@media (min-width: 1024px)': {
            fontSize: '20px',
        },
    };
  return (

    <main className="App  relative">
        <div style={responsiveStyles}/>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <Login2 />
            </Suspense>
          }
        />
        <Route
          path="/forgot-password2"
          element={
            <Suspense fallback={<Loading />}>
              <ForgotPass2 />
            </Suspense>
          }
        />
        <Route
          path="/lock-screen2"
          element={
            <Suspense fallback={<Loading />}>
              <LockScreen2 />
            </Suspense>
          }
        />
        <Route path="/*" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add-company" element={<CompanyForm />} />
          <Route path="add-reference" element={<ReferenceForm/>} />
          <Route path="add-devices" element={<DevicesForm/>} />
          <Route path="add-users" element={<AdminForm/>} />
          <Route path="list-devices" element={<Devicesliste/>} />
          <Route path="list-company" element={<Companyliste/>} />
          <Route path="list-users" element={<Adminliste/>} />
          <Route path="view-company/:id" element={<ViewCompany/>} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Route>
        <Route path="/manager" element={<Layout />}>
          <Route path="dashboard" element={<ManagerDashboard />} />
          <Route path="add-clients" element={<ClientForm/>}/>
          <Route path="list-clients" element={<ListClient/>}/>
          <Route path="list-groupe" element={<GroupeDevice/>}/>
          <Route path="managerDevice" element={<ManagerDevice/>}/>
          <Route path="detailGroup/:id" element={<DetailGroup/>}/>
          <Route path="configuration" element={<Configuration/>}/>
        </Route>  <Route path="/client" element={<Layout />}>
         <Route path="" element={<HelloPage/>} />
        </Route>
        <Route
          path="/404"
          element={
            <Suspense fallback={<Loading />}>
              <Error />
            </Suspense>
          }
        />
        <Route
            path="/403"
            element={
              <Suspense fallback={<Loading />}>
                <NotAuthorized />
              </Suspense>
            }
        />

      </Routes>
    </main>
  );
}
  export default App;
