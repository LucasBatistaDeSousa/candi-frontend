import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="container-fluid d-flex flex-column justify-content-center align-items-center flex-grow-1 text-center px-4">
        <div className="card-custom p-5" style={{ maxWidth: '800px', width: '100%' }}>
          <h1 className="display-3 fw-bold text-green mb-3">Bem-vindo ao Candi! 💖</h1>
          <p className="lead text-muted mb-5">
            Seu assistente pessoal para o controle de tratamentos oncológicos. <br/>
            Simples, rápido e feito para você.
          </p>
          
          <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
            <Link className="btn btn-custom-green btn-lg px-5 shadow rounded-pill" to="/medicamentos">
              💊 Ver Medicamentos
            </Link>
            <Link className="btn btn-outline-secondary btn-lg px-5 rounded-pill" to="/agenda">
              📅 Ver Minha Agenda
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;