import React, { useState } from "react";
import { useNavigate } from "react-router";
import Sidebar from '../../components/Menu/Sidebar';
import Footer from "../../components/Footer/footer.js";
import BuscarClientes from "../../components/Pedido/buscarClientes";
import Carrinho from "../../components/Cart/carrinho.jsx";
import * as C from "../../components/Template/style.js";
import Button from "../../components/Button";

const Pedido = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handelCadastrarPedido = async () => {
    try {
      // Envie os dados para a API

      navigate("/home")
  } catch (error) {
    setError(true);
    console.error('Erro ao enviar dados teste:', error);
  }
};


  return (
    <C.Main>
      <C.Container>
    <Sidebar /> 
       <C.Content>    
        <BuscarClientes />
        <Carrinho />
        <C.LabelError>{error}</C.LabelError>
        <Button Text="Criar Pedido" onClick={handelCadastrarPedido} />  
        </C.Content>    
      </C.Container>
     <Footer/>
   </C.Main>
  )
};

export default Pedido;
