import React from "react";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const navigate = useNavigate();

  // Função para login
  const login = async (credentials) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/auth/login`, credentials);
      const jwtToken = response.data.token;

      // Armazena o token no localStorage
      localStorage.setItem("token", jwtToken);
      setToken(jwtToken);

      navigate("/dashboard");
    } catch (error) {
        if (!error.response) {
            alert("O backend está fora do ar. Tente novamente mais tarde.");
          } else if (error.response.status === 401) {
            alert("Falha na autenticação! Verifique suas credenciais.");
          } else {
            alert("Ocorreu um erro. Tente novamente.");
          }
    }
  };

  // Função para logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};