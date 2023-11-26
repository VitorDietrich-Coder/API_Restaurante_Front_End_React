import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

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

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Datalist = styled.datalist`
  /* Adicione seus estilos aqui */
  background-color: #f8f8f8;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #333;
  /* Adicione outros estilos conforme necessário */
`;
const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();
  const [error, setError] = useState("");

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;
          user.fornecedor.value =   onEdit.fornecedor_id ;  
          user.nome.value = onEdit.nome;
          user.preco.value = onEdit.preco;
          user.marca.value = onEdit.marca;
          user.quantidade.value = onEdit.quantidade;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.nome.value ||
      !user.preco.value ||
      !user.marca.value ||
      !user.quantidade.value ||
      !user.fornecedor.value 
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    const userToken = localStorage.getItem("user_token");
    const hasUser =  JSON.parse(userToken).userToken;
    const headers = {
      "Authorization": `Bearer ${hasUser}`,
      'Content-Type': 'application/json'

    }
  
    if (onEdit) {
      var id = onEdit.id
      console.log(user.fornecedor.value);

      const requestBody = JSON.stringify({
        id_produto: id,
        nome: user.nome.value,
        preco: user.preco.value,
        fornecedor_id: user.fornecedor.value,
        quantidade: user.quantidade.value,
        marca: user.marca.value
      });
      
      try {
        const response = await fetch("http://localhost:3000/projects/alterar-produto", {
          method: 'PUT',
          headers: headers,
          body: requestBody
        });
      
        if (response.ok) {
          const data = await response.json();
          toast.success(data);
        } else {
          const errorData = await response.json();
          toast.error(errorData);
        }
      } catch (error) {
        console.error('Erro:', error);
      }
    } else {
      const requestBody = JSON.stringify({
        nome: user.nome.value,
        preco: user.preco.value,
        fornecedor_id: user.fornecedor.value,
        quantidade: user.quantidade.value,
        marca: user.marca.value
      });
        
      try {
        const response = await fetch("http://localhost:3000/projects/cadastrar/produto", {
          method: 'POST',
          headers: headers,
          body: requestBody,
        });
      
        if (!response.ok) {
          // Captura e exibe o erro da API
          const errorData = await response.json();
          setError(errorData.message || 'Erro desconhecido');
          console.error('Erro ao enviar dados:', errorData);
          return;
        }
      
        // Se chegou até aqui, os dados foram enviados com sucesso
        const data = await response.json();
        // Trate os dados conforme necessário
      } catch (error) {
        setError('Erro desconhecido ao enviar dados');
        console.error('Erro ao enviar dados:', error);
        // Trate o erro, se necessário
      }      
    }

    user.nome.value = "";
    user.preco.value = "";
    user.marca.value = "";
    user.quantidade.value = "";
    user.fornecedor.value = "";

    setOnEdit(null);
    getUsers();
  };

    const [myOptions, setMyOptions] = useState([]);
    const [searchValue, setSearchValue] = useState(""); // Estado para controlar o valor da pesquisa
  
    useEffect(() => {
      getDataFromAPI();
    }, []);
  
    const getDataFromAPI = () => {
      const userToken = localStorage.getItem("user_token");
      const hasUser = JSON.parse(userToken).userToken;
      fetch("http://localhost:3000/projects/listar-fornecedores", {
        headers: {
          Authorization: `Bearer ${hasUser}`,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          const options = res.map((item) => ({
            id: item.id, // Substitua 'id' pelo nome da propriedade que contém o id
            nome: item.nome
          }));
          setMyOptions(options);
        });
    };
  
    const handleInputChange = (e) => {
      setSearchValue(e.target.value); // Atualiza o valor da pesquisa ao digitar
    };

    function retornaFornecedor(valor)
    {
      console.log(valor);
      const userToken = localStorage.getItem("user_token");
      const hasUser =  JSON.parse(userToken).userToken;
      const headers = {
        "Authorization": `Bearer ${hasUser}`,
        'Content-Type': 'application/json'
      }
    
      return fetch("http://localhost:3000/projects/listar-fornecedor/" + valor, {
        method: 'GET',
        headers: headers,
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Erro na requisição');
          }   
          return response.json(); // Este método lê o corpo da resposta como JSON
        })
        .then(data => {
          return data[0];
        })
        .catch(error => {
          console.error('Erro:', error);
        });
    }
    

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nome" />
      </InputArea>
      <InputArea>
        <Label>Preço</Label>
        <Input name="preco" type="number" />
      </InputArea>
      <InputArea>
        <Label>Marca</Label>
        <Input name="marca" />
      </InputArea>
      <InputArea>
        <Label>Quantidade</Label>
        <Input name="quantidade" type="number"/>
      </InputArea>
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
       <option key={index} value={option.id}>{option.nome}</option>
     ))}
      </Datalist>
    </InputArea>
      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;
