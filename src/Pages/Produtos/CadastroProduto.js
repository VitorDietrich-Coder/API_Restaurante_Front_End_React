import React, { useState, useEffect } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from '../../components/Menu/Sidebar';
import Footer from "../../components/Footer/footer.js";
import * as C from "../../components/Template/style.js";
import Grid from "../../components/formProduto/Grid";
import Form from "../../components/formProduto/Form";
import { toast } from "react-toastify";


const CadastroProduto = () => {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [marca, setMarca] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
 
  const getProdutos = async () => {
    const userToken = localStorage.getItem("user_token");
    const hasUser =  JSON.parse(userToken).userToken;
    const headers = {
      "Authorization": `Bearer ${hasUser}`,
    }
  
    try {
      const res = await axios.get("http://localhost:3000/projects/listar-produtos", {headers});
      setProdutos(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getProdutos();
  }, [setProdutos]);

  return (
    <C.Main>
      <C.Container>
        <Sidebar />
        <C.Content>
        <C.Label>Cadastrar produto</C.Label>
        <C.LabelError>{error}</C.LabelError>
          <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getProdutos} />     
        <Grid setOnEdit={setOnEdit} users={produtos} setUsers={setProdutos} />
        </C.Content>
      </C.Container>
      <Footer />
    </C.Main>
  );
};
export default CadastroProduto;
