import axios from "axios";
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
         setDesabilitado(true);
          user.nome.value = onEdit.nome;
          user.cpfcnpj.value = onEdit.cpf_cnpj;
          user.email.value = onEdit.email;
          user.telefone.value = onEdit.telefone;
          user.rua.value = onEdit.rua;
          user.numero.value = onEdit.numero;  
          user.cidade.value = onEdit.cidade;  
          user.estado.value = onEdit.estado;  
          user.cep.value = onEdit.cep;  
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.nome.value ||
      !user.cpfcnpj.value ||
      !user.email.value ||
      !user.telefone.value ||
      !user.rua.value ||
      !user.numero.value ||
      !user.cidade.value ||
      !user.estado.value ||
      !user.cep.value 
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
      const nomeRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]{1,150}$/;
      if (!nomeRegex.test(user.nome.value )) {
        setError("Nome inválido");
        return;
      }
  
      // Validar CPF
      const cpfRegex = /^\d{1,14}$/;
      if (!cpfRegex.test(user.cpfcnpj.value)) {
        setError("CPF ou CNPJ inválido");
        return;
      }

      const telefoneRegex = /^\d{1,20}$/;
      if (!telefoneRegex.test(user.telefone.value)) {
        setError("Telefone inválido");
        return;
      }
      // Validar CEP
      const cepRegex = /^\d{1,8}$/;
      if (!cepRegex.test(user.cep.value)) {
        setError("CEP inválido");
        return;
      }
      const requestBody = JSON.stringify({
        id_fornecedor: id,
        nome: user.nome.value,
        email: user.email.value,
        telefone: user.telefone.value,
        endereco:{
        rua: user.rua.value,
        numero: user.numero.value,
        cidade: user.cidade.value,
        estado: user.estado.value,
        cep: user.cep.value
        }
      });

      try {
        const response = await fetch("http://localhost:3000/projects/alterar-fornecedor", {
          method: 'PUT',
          headers: headers,
          body: requestBody
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data)
          toast.success(data);
        } else {
          const errorData = await response.json();
          console.log(errorData)
          toast.error(errorData);
        }
      } catch (error) {
        console.error('Erro:', error);
      }
    } else {
      if (!user.nome.value || !user.email.value || !user.cpfcnpj.value || !user.telefone.value) {
        setError("Por favor, preencha todos os campos.");
        return;
      }
  
      const nomeRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]{1,150}$/;
      if (!nomeRegex.test(user.nome.value )) {
        setError("Nome inválido");
        return;
      }
  
      // Validar CPF
      const cpfRegex = /^\d{1,14}$/;
      if (!cpfRegex.test(user.cpfcnpj.value)) {
        setError("CPF ou CNPJ inválido");
        return;
      }

      const telefoneRegex = /^\d{1,20}$/;
      if (!telefoneRegex.test(user.telefone.value)) {
        setError("Telefone inválido");
        return;
      }
      // Validar CEP
      const cepRegex = /^\d{1,8}$/;
      if (!cepRegex.test(user.cep.value)) {
        setError("CEP inválido");
        return;
      }
      const requestBody = JSON.stringify({
        nome: user.nome.value,
        email: user.email.value,
        cpf_cnpj:  user.cpfcnpj.value,
        telefone: user.telefone.value,
        endereco:{
        rua: user.rua.value,
        numero: user.numero.value,
        cidade: user.cidade.value,
        estado: user.estado.value,
        cep: user.cep.value
        }
      });
        
      try {
        const response = await fetch("http://localhost:3000/projects/cadastrar/fornecedor", {
          method: 'POST',
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
    }
    setDesabilitado(false);
    user.nome.value = "";
    user.cpfcnpj.value = "";
    user.email.value = "";
    user.telefone.value = "";
    user.rua.value = "";
    user.numero.value = "";  
    user.cidade.value = "";  
    user.estado.value = "";  
    user.cep.value = "";  

    setOnEdit(null);
    getUsers();
  };

    const [myOptions, setMyOptions] = useState([]);
    const [searchValue, setSearchValue] = useState(""); // Estado para controlar o valor da pesquisa
    const [desabilitado, setDesabilitado] = useState(false); // Estado para controlar o valor da pesquisa

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
          if (Array.isArray(res) && res.length > 0) {
            const options = res.map((item) => ({
              id: item.id, // Substitua 'id' pelo nome da propriedade que contém o id
              nome: item.nome
            }));
            setMyOptions(options);
          } else {
            console.error('A resposta da API não é uma array ou está vazia:', res);
            // Trate o caso em que a resposta não é uma array ou está vazia
          }
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
        <Label>CPF/CNPJ</Label>
        <Input name="cpfcnpj"  disabled={desabilitado}/>
      </InputArea>
      <InputArea>
        <Label>EMAIL</Label>
        <Input name="email" />
      </InputArea>
      <InputArea>
        <Label>Telefone</Label>
        <Input name="telefone" />
      </InputArea>
      <InputArea>
        <Label>Rua</Label>
        <Input name="rua" />
      </InputArea>
      <InputArea>
        <Label>Número</Label>
        <Input name="numero" />
      </InputArea>
      <InputArea>
        <Label>Cidade</Label>
        <Input name="cidade" />
      </InputArea>
      <InputArea>
        <Label>Estado</Label>
        <Input name="estado" />
      </InputArea>
      <InputArea>
        <Label>CEP</Label>
        <Input name="cep" />
      </InputArea>
      <labelError>{error}</labelError>
      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;
