import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from '../../components/Menu/Sidebar';
import Footer from "../../components/Footer/footer.js";
import * as C from "../../components/Template/style.js";

const CadastroCliente = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf_cnpj, setCpf] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [cep, setCep] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCadastroCliente = async () => {
    // Verifique se todos os campos foram preenchidos
    if (!nome || !telefone || !email || !cpf_cnpj) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    // Verifique se o CPF tem 11 dígitos
    if (cpf_cnpj.length !== 11) {
      setError("Por favor, preencha todos os campos.");
      setError(true);
      return;
    }

    try {
      // Envie os dados para a API
      const response = await axios.post(
        "http://localhost:3000/auth/cadastrar/cliente",
        {
          nome,
          telefone,
          email,
          cpf_cnpj,
          endereco: {
            rua,
            numero,
            cidade,
            estado,
            cep,
          },
        }
      );

      alert("Usuário cadastrado com sucesso!", response);
      navigate("/");
    } catch (error) {
      setError(error.message);
      console.error("Erro ao enviar dados teste:", error);
    }
  };


  return (
    <C.Main>
      <C.Container>
        <Sidebar />
        <C.Content>
        <C.Label>Cadastrar Cliente</C.Label>
        <C.LabelError>{error}</C.LabelError>
          <div style={{ display: "flex" }}>
            <div style={{ flex: 1, padding: "0 10px" }}>
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
                placeholder="Digite seu telefone"
                value={telefone}
                onChange={(e) => [setTelefone(e.target.value), setError("")]}
              />
              <Input
                placeholder="Digite seu CPF"
                value={cpf_cnpj}
                onChange={(e) => [setCpf(e.target.value), setError("")]}
              />
            </div>
            <div style={{ flex: 1, padding: "0 10px" }}>
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
            </div>
          </div>
          <C.ButtonColumn>
          <Button Text="Inscrever-se" onClick={handleCadastroCliente} />
          <C.LabelSignup>
            Já tem uma conta?
            <C.Strong>
              <Link to="/">&nbsp;Entre</Link>
            </C.Strong>
          </C.LabelSignup>
        </C.ButtonColumn>
        </C.Content>

      </C.Container>
      <Footer />
    </C.Main>
  );
};

export default CadastroCliente;
