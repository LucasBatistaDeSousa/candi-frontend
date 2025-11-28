import { createContext, useState, useEffect } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("candi_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username) => {
    try {
      // 1. Busca todos os perfis
      const response = await api.get("/profiles");
      const profiles = response.data;

      // 2. Tenta encontrar o usuário pelo nome
      const foundUser = profiles.find(
        (p) => p.username.toLowerCase() === username.toLowerCase()
      );

      if (foundUser) {
        // Login sucesso: Salva o objeto do usuário (que contém o user_id)
        localStorage.setItem("candi_user", JSON.stringify(foundUser));
        setUser(foundUser);
        navigate("/home");
      } else {
        alert("Usuário não encontrado! Crie uma conta primeiro.");
      }
    } catch (error) {
      console.error("Erro ao buscar usuários", error);
      alert("Erro ao conectar com a API.");
    }
  };

  const register = async (username, birthDate) => {
    try {
      // Cria um novo perfil
      const response = await api.post("/profiles", {
        username: username,
        birth_date: birthDate,
        // IDs fixos ou gerados conforme sua API pede no readme
        cancer_id: "0000-cancer-uuid-padrao", 
        image_uri: "https://via.placeholder.com/150"
      });
      alert("Usuário criado com sucesso! Faça login agora.");
      return true;
    } catch (error) {
      console.error("Erro ao cadastrar", error);
      alert("Erro ao criar usuário.");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("candi_user");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ authenticated: !!user, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};