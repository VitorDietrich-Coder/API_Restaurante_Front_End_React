import React, { useState } from "react";
import {
  Container,
  Button,
  TextField,
} from "@material-ui/core";
import axios from 'axios'; // Importe o Axios

import "./styles.css";

function Form() {
  const [nome, setName] = useState('');
  const [cargo, setCargo] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState(0);
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cep, setCep] = useState('');

  const [CPFError, setCPFError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verifique se todos os campos foram preenchidos
    if (!nome || !cargo || !telefone || !email || !cpf || !senha) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    // Verifique se o CPF tem 11 dígitos
    if (cpf.length !== 11) {
      setCPFError(true);
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

      // Verifique a resposta da API e faça algo com ela, se necessário
      console.log('Resposta da API:', response.data);

      // Limpe os campos do formulário após o envio bem-sucedido
      setName('');
      setCargo('');
      setTelefone('');
      setEmail('');
      setCpf('');
      setRua('');
      setNumero('');
      setCidade('');
      setEstado('');
      setCep('');


    } catch (error) {
      console.error('Erro ao enviar dados teste:', error);
    }
  };

  return (
    <Container maxWidth="sm" component="article" className="form">
      <h1>Formulário de Cadastro</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          id="nome"
          label="Nome"
          variant="outlined"
          margin="dense"
          fullWidth
          value={nome}
          onChange={(event) => {setName(event.target.value)}}
        />
        <TextField
          id="cargo"
          label="Cargo"
          variant="outlined"
          margin="dense"
          fullWidth
          value={cargo}
          onChange={(event) => {setCargo(event.target.value)}}
        />
       <TextField
          id="telefone"
          label="Telefone"
          variant="outlined"
          margin="dense"
          fullWidth
          value={telefone}
          onChange={(event) => {setTelefone(event.target.value)}}
        />
       <TextField
          id="email"
          label="Email"
          variant="outlined"
          margin="dense"
          fullWidth
          value={email}
          onChange={(event) => {setEmail(event.target.value)}}
        />
        <TextField
          id="cpf"
          label="CPF"
          variant="outlined"
          margin="dense"
          fullWidth
          error={CPFError}
          helperText={CPFError && "Deve conter 11 dígitos. Insira apenas os números."}
          value={cpf}
          onBlur={(event) => {
            const tmpCPF = event.target.value;

            if (tmpCPF.length !== 11) {
              setCPFError(true);
            } else {
              setCPFError(false);
            }
          }}
          onChange={(event) => {
            const tmpCPF = event.target.value;

            if (tmpCPF.length === 11) {
              setCPFError(false);
            }

            setCpf(event.target.value)}
          }
        />

       <TextField
          id="senha"
          label="Senha"
          variant="outlined"
          margin="dense"
          fullWidth
          value={senha}
          onChange={(event) => {setSenha(event.target.value)}}
        />

        <TextField
        id="rua"
        label="Rua"
        variant="outlined"
        margin="dense"
        type="number"
        fullWidth
        value={rua}
        onChange={(event) => {setRua(event.target.value)}}
      />

<TextField
        id="numero"
        label="Numero"
        variant="outlined"
        margin="dense"
        fullWidth
        value={numero}
        onChange={(event) => {setNumero(event.target.value)}}
      />

<TextField
        id="cidade"
        label="Cidade"
        variant="outlined"
        margin="dense"
        fullWidth
        value={cidade}
        onChange={(event) => {setCidade(event.target.value)}}
      />

<TextField
        id="estado"
        label="Estado"
        variant="outlined"
        margin="dense"
        fullWidth
        value={estado}
        onChange={(event) => {setEstado(event.target.value)}}
      />

<TextField
        id="cep"
        label="Cep"
        variant="outlined"
        margin="dense"
        fullWidth
        value={cep}
        onChange={(event) => {setCep(event.target.value)}}
      />

    <Button className="btn-form" variant="contained" color="primary" onClick={handleSubmit}>
      Cadastrar
    </Button>

      </form>

      <p>{nome}</p>
    </Container>
  );
}

export default Form;
