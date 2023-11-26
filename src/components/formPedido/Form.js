
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import BuscarFornecedor from "./BuscarFornecedor";
import Grid from "./Grid";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  justify-content: start;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const Content = styled.div`

`;


export const labelError = styled.label`
  font-size: 14px;
  color: red;
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

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.produto.value = onEdit.produto;
      user.quantidade.value = onEdit.quantidade;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.cliente.value ||
      !user.produto.value ||
      !user.quantidade.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }
    const userToken = localStorage.getItem("user_token");
    const hasUser = JSON.parse(userToken).userToken;
    const headers = {
      "Authorization": `Bearer ${hasUser}`,
      'Content-Type': 'application/json'
    }
      if (desabilitado == false) {
        const requestBody = JSON.stringify({
          id_pedido: user.pedido.value,
          itens:
            [
              {
                produto_id: user.produto.value,
                quantidade: user.quantidade.value
              }
            ]
        });
        try {
          const response = await fetch("http://localhost:3000/projects/adicionar-item", {
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
      else {
        const requestBody = JSON.stringify({
          cliente_id: user.cliente.value,
          itens:
            [
              {
                produto_id: user.produto.value,
                quantidade: user.quantidade.value
              }
            ]
        });
        try {
          const response = await fetch("http://localhost:3000/projects/cadastrar/pedido", {
            method: 'POST',
            headers: headers,
            body: requestBody
          })
          if (response.ok) {
            const data = await response.json();
            setDesabilitado(false);
            setSearchValue(data.pedidoid)
            user.pedido.value = data.pedidoid;
            toast.success(data);
          } else {
            const errorData = await response.json();
            toast.error(errorData);
          }
        } catch (error) {
          console.error('Erro:', error);
        }

      }
    getPedido(user.pedido.value);
    user.cliente.value = "";
    user.produto.value = "";
    user.quantidade.value = "";

    setOnEdit(null);

  };
  const handleNovoPedido = (e) => {
    setDesabilitado(true);
  }

  const handleExcluirPedido = (e) => {
    setDesabilitado(true);
  }


  const handleFecharPedido = async (e) => {
    setError("teste");
    e.preventDefault();
    const user = ref.current;
    const userToken = localStorage.getItem("user_token");
    const hasUser = JSON.parse(userToken).userToken;
    const headers = {
      "Authorization": `Bearer ${hasUser}`,
      'Content-Type': 'application/json'
    }
    const requestBody = JSON.stringify(
      {
        id_pedido: user.pedido.value,
        pessoasConta: user.pessoas.value
      }
    );
    try {
      const response = await fetch("http://localhost:3000/projects/fechar-pedido", {
        method: 'POST',
        headers: headers,
        body: requestBody
      })
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
    user.pedido.value = "";
  }

  const [myOptions, setMyOptions] = useState([]);
  const [myOptionsProdutos, setMyOptionsProdutos] = useState([]);
  const [myOptionsClientes, setMyOptionsClientes] = useState([]);
  const [searchValue, setSearchValue] = useState(""); // Estado para controlar o valor da pesquisa
  const [searchValueProduto, setSearchValueProduto] = useState(""); // Estado para controlar o valor da pesquisa
  const [searchValueCliente, setSearchValueCliente] = useState(""); // Estado para controlar o valor da pesquisa
  const [desabilitado, setDesabilitado] = useState(false); // Estado para controlar o valor da pesquisa
  const [error, setError] = useState("");
  const [pedido, setPedido] = useState([]);
  useEffect(() => {
    getDataFromAPI();
    getDataClienteFromAPI();
    getDataFromAPI2();
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
        const options = res.map((item) => item.id)
        setMyOptions(options);
      });
  };

  const getDataFromAPI2 = () => {
    const userToken = localStorage.getItem("user_token");
    const hasUser = JSON.parse(userToken).userToken;
    fetch("http://localhost:3000/projects/listar-produtos", {
      headers: {
        Authorization: `Bearer ${hasUser}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.statusText}`);
        }
        return response.json();
      })
      .then(res => {
        const myOptionsProdutos = res.map(item => ({
          id: item.id, // Substitua 'id' pelo nome da propriedade que contém o id
          nome: item.nome,
        }));
        setMyOptionsProdutos(myOptionsProdutos);
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const getDataClienteFromAPI = () => {
    const userToken = localStorage.getItem("user_token");
    const hasUser = JSON.parse(userToken).userToken;
    fetch("http://localhost:3000/projects/listar-clientes", {
      headers: {
        Authorization: `Bearer ${hasUser}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.statusText}`);
        }
        return response.json();
      })
      .then(res => {
        const optionsClientes = res.map(item2 => ({
          id: item2.id, // Substitua 'id' pelo nome da propriedade que contém o id
          nome: item2.nome,
        }));
        setMyOptionsClientes(optionsClientes);
      })
      .catch(error => {
        setError(error.message);
      });

  };


  const handleInputChangeCliente = (e) => {
    setSearchValueCliente(e.target.value); // Atualiza o valor da pesquisa ao digitar
  };

  const handleInputChange2 = (e) => {
    setSearchValueProduto(e.target.value); // Atualiza o valor da pesquisa ao digitar
  };

  const handleInputChange = (e) => {
    if (e.target.value === "") {
      setPedido([]);
    }
    setSearchValue(e.target.value); // Atualiza o valor da pesquisa ao digitar
    getPedido(e.target.value);
    pedido.map((pedidoss, index) => (
      setSearchValueCliente(pedidoss.cliente_id))
    );
  };

  const getPedido = async (selectedValue) => {
    const userToken = localStorage.getItem("user_token");
    const hasUser = JSON.parse(userToken).userToken;
    const headers = {
      "Authorization": `Bearer ${hasUser}`,
    }
    fetch(`http://localhost:3000/projects/listar-pedido/${selectedValue}`, {
      method: 'GET',
      headers: headers,
    })
      .then(response => {
        if (!response.ok) {
          console.log(response);
          throw new Error(`Erro na requisição: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        setPedido(data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
      })
      .catch(error => {
        setError(error.message);
      });
  };

  useEffect(() => {
    getPedido();
  }, [setPedido],);


  return (
    <Content>
      <labelError>{error}</labelError>
      <FormContainer ref={ref} onSubmit={handleSubmit}>
        <Button onClick={handleNovoPedido}>Novo Pedido</Button>
        <InputArea>
          <Label>Pedido</Label>
          <Input
            name="pedido"
            type="number"
            value={searchValue}
            onChange={handleInputChange}
            disabled={desabilitado}
            placeholder="Pesquise aqui..."
            list="pedidos"
          />
          <Datalist id="pedidos">
            {myOptions.map((option, index) => (
              <option key={index} value={option} />
            ))}
          </Datalist>
        </InputArea>
        <InputArea>
          <Label>Cliente</Label>
          <Input
            name="cliente"
            value={searchValueCliente}
            onChange={handleInputChangeCliente}
            placeholder="Pesquise aqui..."
            list="fornecedores"
          />
          <Datalist id="fornecedores">
            {myOptionsClientes.map((option, index) => (
              <option key={index} value={option.id}>{option.nome}</option>
            ))}
          </Datalist>
        </InputArea>
        <InputArea>
          <Label>Id Produto</Label>
          <Input
            name="produto"
            type="number"
            value={searchValueProduto}
            onChange={handleInputChange2}
            placeholder="Pesquise aqui..."
            list="produtos"
          />
          <Datalist id="produtos">
            {myOptionsProdutos.map((option, index) => (
              <option key={index} value={option.id}>{option.nome}</option>
            ))}
          </Datalist>
        </InputArea>
        <InputArea>
          <Label>Quantidade</Label>
          <Input type="number" name="quantidade" />
        </InputArea>
        <Button type="submit">SALVAR</Button>
        <Button onClick={handleExcluirPedido}>Excluir Pedido</Button>
      </FormContainer>
      <Grid setOnEdit={setOnEdit} users={pedido} setUsers={setPedido} />
    </Content>
  );
};

export default Form;
