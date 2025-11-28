import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { logout, user } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-gradient-custom px-4 w-100 sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold fs-3" to="/home">
          Candi App
        </Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
            {user && <span className="text-white fw-bold me-3 d-none d-lg-block">Olá, {user.username}</span>}
            
            <Link className="btn btn-light text-success fw-bold btn-sm px-3 rounded-pill" to="/home">Início</Link>
            <Link className="btn btn-light text-success fw-bold btn-sm px-3 rounded-pill" to="/medicamentos">Medicamentos</Link>
            <Link className="btn btn-light text-success fw-bold btn-sm px-3 rounded-pill" to="/agenda">Agenda</Link>
            
            <button onClick={logout} className="btn btn-custom-pink btn-sm px-3 rounded-pill ms-2">Sair</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;