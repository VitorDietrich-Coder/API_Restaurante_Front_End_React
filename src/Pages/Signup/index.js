import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const Signup = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaConf, setSenhaConf] = useState("");
  const [cargo, setCargo] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cep, setCep] = useState('');
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { signup } = useAuth();
  const handleSignup = async () => {
  
    // Verifique se todos os campos foram preenchidos
    if (!nome || !cargo || !telefone || !email || !cpf || !senha) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    // Verifique se o CPF tem 11 dígitos
    if (cpf.length !== 11) {
      setError(true);
      return;
    }

    try {
      // Envie os dados para a API
      const response = await axios.post('http://localhost:3000/auth/cadastrar/funcionario', {
        nome,
        cargo,
        telefone,
        email,
        cpf,
        senha,
        endereco:
        {
         rua,
         numero,
         cidade,
         estado,
         cep,
        }
      });
  
      alert('Usuário cadatrado com sucesso!', response);
      navigate("/");

    } catch (error) {
      setError(error.message);
      console.error('Erro ao enviar dados teste:', error);
    }
  };

  return (
    <C.Container>
      <C.Label>SISTEMA DE CADASTRO</C.Label>
      <C.labelError>{error}</C.labelError>
      <C.Content>
        <C.LabelColumn>
          <Input
            type="nome"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => [setNome(e.target.value), setError("")]}
          />
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
          <Input
            type="password"
            placeholder="Confirme sua Senha"
            value={senhaConf}
            onChange={(e) => [setSenhaConf(e.target.value), setError("")]}
          />
          <Input
            placeholder="Digite seu cargo"
            value={cargo}
            onChange={(e) => [setCargo(e.target.value), setError("")]}
          />
          <Input
            placeholder="Digite seu telefone"
            value={telefone}
            onChange={(e) => [setTelefone(e.target.value), setError("")]}
          />
          <Input
            placeholder="Digite seu CPF"
            value={cpf}
            onChange={(e) => [setCpf(e.target.value), setError("")]}
          />
        </C.LabelColumn>
        <C.LabelColumn>
          <Input
            placeholder="Digite sua Rua"
            value={rua}
            onChange={(e) => [setRua(e.target.value), setError("")]}
          />
          <Input
            placeholder="Digite seu Número"
            value={numero}
            onChange={(e) => [setNumero(e.target.value), setError("")]}
          />
          <Input
            placeholder="Digite sua Cidade"
            value={cidade}
            onChange={(e) => [setCidade(e.target.value), setError("")]}
          />
          <Input
            placeholder="Digite seu Estado"
            value={estado}
            onChange={(e) => [setEstado(e.target.value), setError("")]}
          />
          <Input
            placeholder="Digite seu CEP"
            value={cep}
            onChange={(e) => [setCep(e.target.value), setError("")]}
          />
        </C.LabelColumn>
      </C.Content>
      <C.ButtonColumn>
          <Button Text="Inscrever-se" onClick={handleSignup} />
          <C.LabelSignin>
            Já tem uma conta?
            <C.Strong>
              <Link to="/">&nbsp;Entre</Link>
            </C.Strong>
          </C.LabelSignin>
        </C.ButtonColumn>
    </C.Container>
  );
};

export default Signup;
