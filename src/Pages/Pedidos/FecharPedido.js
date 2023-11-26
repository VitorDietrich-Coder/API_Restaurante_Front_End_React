import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Sidebar from '../../components/Menu/Sidebar';
import Footer from "../../components/Footer/footer.js";
import BuscarClientes from "../../components/Pedido/buscarClientes";
import Carrinho from "../../components/Cart/carrinho.jsx";
import * as C from "../../components/Template/style.js";
import Button from "../../components/Button";
import Form from "../../components/formPedido/formFecharPedido/Form";
import BuscarFornecedor from "../../components/formPedido/formFecharPedido/BuscarFornecedor";
import axios from "axios";
import { toast } from "react-toastify";

const Pedido = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const handelCadastrarPedido = async () => {
    try {
      // Envie os dados para a API

      navigate("/home")
  } catch (error) {
    setError(true);
    console.error('Erro ao enviar dados teste:', error);
  }
};

const getUsers = async (selectedValue) => {
  const userToken = localStorage.getItem("user_token");
  const hasUser =  JSON.parse(userToken).userToken;
  const headers = {
    "Authorization": `Bearer ${hasUser}`,
  }

  try {
    const res = await axios.get("http://localhost:3000/projects/listar-pedido/" + selectedValue, {headers});
    setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
  } catch (error) {
    toast.error(error);
  }
};

useEffect(() => {
  getUsers();
}, [setUsers]);

  return (
    <C.Main>
      <C.Container>
    <Sidebar /> 
       <C.Content>   
       <C.Label>Pedido</C.Label>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers}/>
        <C.LabelError>{error}</C.LabelError>
        </C.Content>    
      </C.Container>
     <Footer/>
   </C.Main>
  )
};

export default Pedido;
