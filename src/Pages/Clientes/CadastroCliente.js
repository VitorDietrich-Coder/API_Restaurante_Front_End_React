import React, { useState, useEffect } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from '../../components/Menu/Sidebar';
import Footer from "../../components/Footer/footer.js";
import * as C from "../../components/Template/style.js";
import Grid from "../../components/formCliente/Grid";
import Form from "../../components/formCliente/Form";
import { toast } from "react-toastify";


const CadastroCliente = () => {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [marca, setMarca] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [clientes, setClientes] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const getClientes = async () => {
    const userToken = localStorage.getItem("user_token");
    const hasUser =  JSON.parse(userToken).userToken;
    const headers = {
      "Authorization": `Bearer ${hasUser}`,
    }
  
    try {
      const response = await fetch("http://localhost:3000/projects/listar-clientes", {
        method: 'GET',
        headers: headers,
      });
    
      if (!response.ok) {
        const errorData = await response.json();
        console.error(`HTTP error! Status: ${response.status}`);
        console.error(errorData); // Adicione isso para visualizar os detalhes do erro no console
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    
      const data = await response.json();
      setClientes(data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
      setError(null); // Limpa o estado de erro em caso de sucesso
    } catch (error) {
      console.error('Erro ao buscar dados da API:', error);
      setError(error.message || 'Erro desconhecido'); // Define uma mensagem de erro padrão se não houver mensagem específica
    }
    
  };

  useEffect(() => {
    getClientes();
  }, [setClientes]);

  return (
    <C.Main>
      <C.Container>
        <Sidebar />
        <C.Content>
        <C.Label>Cadastrar cliente</C.Label>
        <C.LabelError>{error}</C.LabelError>
          <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getClientes} />     
        <Grid setOnEdit={setOnEdit} users={clientes} setUsers={setClientes} />
        </C.Content>
      </C.Container>
      <Footer />
    </C.Main>
  );
};
export default CadastroCliente;
