import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const Signin = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/login/funcionario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          senha,
        }),
      });
  
      if (!response.ok) {
        // Captura e exibe o erro da API
        const errorData = await response.json();
        setError(errorData.message || 'Erro desconhecido');
        console.error('Erro ao enviar dados:', errorData);
        return;
      }
  
      // Se chegou até aqui, os dados foram enviados com sucesso
      const responseData = await response.json();
      signin(responseData.token);
      navigate("/home");
    } catch (error) {
      setError('Erro desconhecido ao enviar dados');
      console.error('Erro ao enviar dados:', error);
    }
  };
  

  return (
    <C.Container>
      <C.Label>SISTEMA DE LOGIN</C.Label>
      <C.Content>
        <Input
          type="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        <Input
          type="password"
          placeholder="Digite sua Senha"
          value={senha}
          onChange={(e) => [setSenha(e.target.value), setError("")]}
        />
        <C.labelError>{error}</C.labelError>
        <Button Text="Entrar" onClick={handleLogin} />
        <C.LabelSignup>
          Não tem uma conta?
          <C.Strong>
            <Link to="/signup">&nbsp;Registre-se</Link>
          </C.Strong>
        </C.LabelSignup>
      </C.Content>
    </C.Container>
  );
};

export default Signin;
