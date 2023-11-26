import React, { useState, useEffect } from "react";
import styled from "styled-components";

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Datalist = styled.datalist`
  /* Adicione seus estilos aqui */
  background-color: #f8f8f8;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #333;
  /* Adicione outros estilos conforme necessário */
`;

const Label = styled.label``;

const BuscarFornecedor = (onFornecedorSelected ) => {
  const [myOptions, setMyOptions] = useState([]);
  const [searchValue, setSearchValue] = useState(""); // Estado para controlar o valor da pesquisa


  useEffect(() => {
    getDataFromAPI();
  }, []);

  const getDataFromAPI = () => {
    const userToken = localStorage.getItem("user_token");
    const hasUser = JSON.parse(userToken).userToken;
    fetch("http://localhost:3000/projects/listar-pedidos", {
      headers: {
        Authorization: `Bearer ${hasUser}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        const options = res.map((item) => item.id); // Extrai apenas os fornecedores da resposta
        setMyOptions(options);
      });
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value); // Atualiza o valor da pesquisa ao digitar
  };

  return (
    <InputArea>
      <Label>Fornecedor</Label>
      <Input
        name="fornecedor"
        value={searchValue}
        onChange={handleInputChange}
        placeholder="Pesquise aqui..."
        list="fornecedores"
      />
      <Datalist id="fornecedores">
        {myOptions.map((option, index) => (
          <option key={index} value={option} />
        ))}
      </Datalist>
    </InputArea>
  );
};

export default BuscarFornecedor;
