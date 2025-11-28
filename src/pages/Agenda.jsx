import { useEffect, useState, useContext } from "react";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Agenda = () => {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  
  // Estados do Formulário
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [obs, setObs] = useState("");

  const fetchAppointments = async () => {
    if (!user?.user_id) return;
    try {
      const res = await api.get(`/appointments/user/${user.user_id}`);
      setAppointments(res.data);
    } catch (err) {
      console.error("Erro ao buscar agenda", err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [user]);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post("/appointments", {
        name: name,
        date: date, 
        obs: obs,
        user_id: user.user_id
      });
      setName(""); setDate(""); setObs("");
      fetchAppointments();
    } catch (err) {
      alert("Erro ao criar compromisso.");
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Remover este compromisso?")) return;
    try {
      await api.delete(`/appointments/${id}?user_id=${user.user_id}`);
      fetchAppointments();
    } catch (err) {
      alert("Erro ao remover.");
    }
  };

  // CORRIGIDO AQUI: Adicionado o espaço em const formatDate
  const formatDate = (isoString) => {
    const d = new Date(isoString);
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      
      <div className="container-fluid flex-grow-1 px-4 py-4">
        
        {/* Card do Formulário */}
        <div className="d-flex justify-content-center mb-5">
          <div className="card-custom p-4 w-100" style={{ maxWidth: "900px" }}>
            <h2 className="text-center text-green mb-4 fw-bold">📅 Nova Consulta ou Exame</h2>
            
            <form onSubmit={handleCreate} className="row g-3 align-items-end">
              <div className="col-md-4">
                <label className="form-label text-muted small fw-bold">O que é?</label>
                <input 
                  placeholder="Ex: Consulta Dermatologista" 
                  className="form-control bg-light border-0" 
                  value={name} 
                  onChange={e=>setName(e.target.value)} 
                  required 
                />
              </div>
              <div className="col-md-3">
                <label className="form-label text-muted small fw-bold">Quando?</label>
                <input 
                  type="datetime-local"
                  className="form-control bg-light border-0" 
                  value={date} 
                  onChange={e=>setDate(e.target.value)} 
                  required 
                />
              </div>
              <div className="col-md-3">
                <label className="form-label text-muted small fw-bold">Observação</label>
                <input 
                  placeholder="Ex: Levar exames anteriores" 
                  className="form-control bg-light border-0" 
                  value={obs} 
                  onChange={e=>setObs(e.target.value)} 
                />
              </div>
              <div className="col-md-2">
                <button type="submit" className="btn btn-custom-pink w-100 fw-bold shadow-sm">
                  Agendar
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Lista Minimalista de Cards */}
        <div className="row justify-content-center">
          <div className="col-12" style={{ maxWidth: "900px" }}>
            <h4 className="text-muted mb-3 border-bottom pb-2">Seus Compromissos</h4>
            
            {appointments.length === 0 ? (
              <p className="text-center text-muted mt-4">Nenhum compromisso agendado.</p>
            ) : (
              <div className="row g-3">
                {appointments.map((appt) => (
                  <div key={appt.appointment_id || appt._id} className="col-md-6">
                    <div className="card-custom p-3 h-100 d-flex flex-column justify-content-between position-relative border-start border-5" 
                         style={{ borderColor: 'var(--primary-color)' }}>
                      
                      <div>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h5 className="fw-bold text-dark m-0">{appt.name}</h5>
                          <span className="badge bg-light text-secondary border">
                            {formatDate(appt.date)}
                          </span>
                        </div>
                        {appt.obs && (
                          <p className="text-muted small mb-0">
                            <i className="bi bi-info-circle me-1"></i> {appt.obs}
                          </p>
                        )}
                      </div>

                      <div className="mt-3 text-end">
                        <button 
                          onClick={() => handleDelete(appt.appointment_id)} 
                          className="btn btn-sm text-danger fw-bold hover-opacity"
                          style={{ background: 'transparent', border: 'none' }}
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default Agenda;