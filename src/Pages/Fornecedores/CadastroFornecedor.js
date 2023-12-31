import React, { useState, useEffect } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from '../../components/Menu/Sidebar';
import Footer from "../../components/Footer/footer.js";
import * as C from "../../components/Template/style.js";
import Grid from "../../components/formFornecedor/Grid";
import Form from "../../components/formFornecedor/Form";
import { toast } from "react-toastify";


const CadastroFornecedor = () => {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [marca, setMarca] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [fornecedores, setFornecedores] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const getFornecedores = async () => {
    const userToken = localStorage.getItem("user_token");
    const hasUser =  JSON.parse(userToken).userToken;
    const headers = {
      "Authorization": `Bearer ${hasUser}`,
    }
  
    try {
      const res = await axios.get("http://localhost:3000/projects/listar-fornecedores", {headers});
      setFornecedores(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getFornecedores();
  }, [setFornecedores]);

  return (
    <C.Main>
      <C.Container>
        <Sidebar />
        <C.Content>
        <C.Label>Cadastrar fornecedor</C.Label>
        <C.LabelError>{error}</C.LabelError>
          <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getFornecedores} />     
        <Grid setOnEdit={setOnEdit} users={fornecedores} setUsers={setFornecedores} />
        </C.Content>
      </C.Container>
      <Footer />
    </C.Main>
  );
};
export default CadastroFornecedor;
