import { useEffect, useState, useContext } from "react";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Medicamentos = () => {
  const { user } = useContext(AuthContext);
  const [medicines, setMedicines] = useState([]);
  
  // Form States
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [period, setPeriod] = useState("");

  const fetchMedicines = async () => {
    if (!user?.user_id) return;
    try {
      const res = await api.get(`/medicines/user/${user.user_id}`);
      setMedicines(res.data);
    } catch (err) {
      console.error("Erro ao buscar", err);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, [user]);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post("/medicines", {
        medicine_name: name,
        dosage: dosage,
        period: period,
        user_id: user.user_id,
        posology: `Tomar a cada ${period}h`,
        observation: "Cadastro via Web",
        start_date: new Date().toISOString() // CORRIGIDO AQUI
      });
      setName(""); setDosage(""); setPeriod("");
      fetchMedicines();
    } catch (err) {
      alert("Erro ao criar medicamento");
    }
  };

  const handleDelete = async (medId) => {
    if(!window.confirm("Excluir este medicamento?")) return;
    try {
      await api.delete(`/medicines/${medId}?user_id=${user.user_id}`);
      fetchMedicines();
    } catch (err) {
      alert("Erro ao deletar");
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      
      {/* Container Fluid para largura máxima */}
      <div className="container-fluid flex-grow-1 px-4 py-4">
        <div className="card-custom p-4 mb-4">
          <h2 className="text-center text-green mb-4 fw-bold">Gerenciar Medicamentos</h2>
          
          <form onSubmit={handleCreate} className="row g-3 justify-content-center align-items-end">
            <div className="col-md-4">
              <label className="form-label text-muted fw-bold">Nome do Medicamento</label>
              <input 
                placeholder="Ex: Dipirona" 
                className="form-control form-control-lg bg-light border-0" 
                value={name} 
                onChange={e=>setName(e.target.value)} 
                required 
              />
            </div>
            <div className="col-md-3">
              <label className="form-label text-muted fw-bold">Dosagem</label>
              <input 
                placeholder="Ex: 500mg" 
                className="form-control form-control-lg bg-light border-0" 
                value={dosage} 
                onChange={e=>setDosage(e.target.value)} 
                required 
              />
            </div>
            <div className="col-md-2">
              <label className="form-label text-muted fw-bold">Intervalo (Horas)</label>
              <input 
                type="number" 
                placeholder="Ex: 8" 
                className="form-control form-control-lg bg-light border-0" 
                value={period} 
                onChange={e=>setPeriod(e.target.value)} 
                required 
              />
            </div>
            <div className="col-md-2">
              <button type="submit" className="btn btn-custom-pink w-100 btn-lg shadow-sm">
                + Adicionar
              </button>
            </div>
          </form>
        </div>

        <div className="card-custom p-4">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead style={{ backgroundColor: '#1de9b6', color: 'white' }}>
                <tr className="text-center">
                  <th className="py-3">Medicamento</th>
                  <th className="py-3">Dosagem</th>
                  <th className="py-3">Frequência</th>
                  <th className="py-3">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {medicines.length === 0 ? (
                  <tr><td colSpan="4" className="text-center py-4 text-muted">Nenhum medicamento encontrado.</td></tr>
                ) : (
                  medicines.map((m) => (
                    <tr key={m.medicines_id || m._id} className="text-center">
                      <td className="fw-bold text-dark">{m.medicine_name}</td>
                      <td className="text-muted">{m.dosage}</td>
                      <td><span className="badge bg-info text-dark">{m.period} em {m.period} horas</span></td>
                      <td>
                        <button onClick={() => handleDelete(m.medicines_id)} className="btn btn-outline-danger btn-sm rounded-pill px-3">
                          Remover
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Medicamentos;