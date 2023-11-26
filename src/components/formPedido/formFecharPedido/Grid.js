import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1120px;
  margin: 20px auto;
  word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

const Grid = ({ users, setUsers, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (numero_pedido, produtoId) => {
    const userToken = localStorage.getItem("user_token");
    const hasUser =  JSON.parse(userToken).userToken;
    const headers = {
      "Authorization": `Bearer ${hasUser}`,
      'Content-Type': 'application/json'
    }
    try {
      const response = await fetch(`http://localhost:3000/projects/excluir-produto-pedido/${numero_pedido}/${produtoId}`, {
        method: 'DELETE',
        headers: headers
      });
      if (!response.ok) {
        console.log(response);
        throw new Error('Erro ao excluir produto do pedido');
      }
      const data = await response.json();
      const newArray = users.filter((user) => user.numero_pedido !== numero_pedido);
      setUsers(newArray);
      toast.success(data);
    } catch (error) {
      toast.error(error.message);
    }
    
    setOnEdit(null);
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Número Pedido</Th>
          <Th>Id cliente</Th>
          <Th>Nome Cliente</Th>
          <Th>Id Produto</Th>
          <Th>Nome Produto</Th>
          <Th>quantidade</Th>    
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((item, i) => (
         item.itens.map((itens, a) => ( 
          <Tr key={a}>
           <Td width="12%">{item.numero_pedido}</Td>
           <Td width="10%">{item.cliente_id}</Td>
           <Td width="12%">{item.nomeCliente}</Td>
           <Td width="10%">{itens.produto_id}</Td>
           <Td width="15%">{itens.nomeProduto}</Td>
           <Td width="20%">{itens.quantidade}</Td>
            <Td alignCenter width="1%">
              <FaTrash onClick={() => handleDelete(item.numero_pedido, itens.produto_id)} />
            </Td>
          </Tr>
        ))))}
      </Tbody>
    </Table>
  );
};

export default Grid;
