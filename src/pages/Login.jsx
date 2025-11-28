import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login, register } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  
  const [username, setUsername] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      login(username);
    } else {
      const success = await register(username, birthDate);
      if(success) setIsLogin(true);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 w-100" style={{ background: 'linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%)' }}>
      <div className="card-custom p-5" style={{ width: "100%", maxWidth: "450px" }}>
        <h1 className="text-center mb-4 text-green fw-bold">Candi</h1>
        <h4 className="text-center mb-4 text-secondary">
          {isLogin ? "Bem-vindo de volta!" : "Crie sua conta"}
        </h4>
        
        <div className="d-flex justify-content-center mb-4 bg-light rounded-pill p-1 border">
          <button 
            className={`btn rounded-pill w-50 ${isLogin ? 'btn-custom-green' : 'text-muted'}`} 
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button 
            className={`btn rounded-pill w-50 ${!isLogin ? 'btn-custom-green' : 'text-muted'}`} 
            onClick={() => setIsLogin(false)}
          >
            Cadastrar
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold text-muted">Nome de Usuário</label>
            <input 
              type="text" 
              className="form-control form-control-lg bg-light border-0"
              placeholder="Digite seu nome..."
              required
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
            />
          </div>
          
          {!isLogin && (
            <div className="mb-3">
              <label className="form-label fw-bold text-muted">Data de Nascimento</label>
              <input 
                type="date" 
                className="form-control form-control-lg bg-light border-0"
                required
                value={birthDate} 
                onChange={(e) => setBirthDate(e.target.value)} 
              />
            </div>
          )}

        <button 
  type="submit" 
  className="btn w-100 btn-lg mt-3 shadow-sm text-white"
  style={{ backgroundColor: '#0c0242ff', border: 'none', fontWeight: 'bold' }}
>
  {isLogin ? "ENTRAR" : "CRIAR CONTA"}
</button>
        </form>
      </div>
    </div>
  );
};

export default Login;