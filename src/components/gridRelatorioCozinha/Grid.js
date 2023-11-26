import  React, { useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import { useReactToPrint } from "react-to-print";

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
  const componentRef = useRef();
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <Table ref={componentRef}>
        <Thead>
          {/* ... (mesmo conteúdo como antes) */}
        </Thead>
        <Tbody>
          {users.map((item, i) => (
            item.produtos.map((produtos, a) => ( 
              <Tr key={a}>
                <Td width="7%">{item.id_pedido}</Td>
                <Td width="10%">{item.cliente}</Td>
                <Td width="10%">{produtos.produto}</Td>
                <Td width="12%">{produtos.quantidade_consumida}</Td>
                <Td width="10%">{produtos.preco_unitario}</Td>
                <Td width="12%">{produtos.valor_total_item}</Td>
                <Td width="10%">{produtos.fornecedor}</Td>
                <Td width="15%">{item.valor_total_pedido}</Td>
              </Tr>
            ))
          ))}
        </Tbody>
      </Table>
      <button onClick={handlePrint}>Exportar para PDF</button>
    </div>
  );
};

export default Grid;
