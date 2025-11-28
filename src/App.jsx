import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { useContext } from "react";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Medicamentos from "./pages/Medicamentos";
import Agenda from "./pages/Agenda"; // <--- Importar Agenda

const PrivateRoute = ({ children }) => {
  const { authenticated } = useContext(AuthContext);
  return authenticated ? children : <Navigate to="/" />;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          
          <Route path="/home" element={
            <PrivateRoute><Home /></PrivateRoute>
          } />
          
          <Route path="/medicamentos" element={
            <PrivateRoute><Medicamentos /></PrivateRoute>
          } />

          <Route path="/agenda" element={ // <--- Rota Nova
            <PrivateRoute><Agenda /></PrivateRoute>
          } />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;