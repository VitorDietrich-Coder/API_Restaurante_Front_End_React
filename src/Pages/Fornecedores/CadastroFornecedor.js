import React, { useEffect, useState } from "react";
import { Card, Button, Form, Table } from "react-bootstrap";
import { Link} from "react-router-dom";
  import api from "../../services/api";
import "./styles.css";

export default function Product() {

  const [products, setProducts] = useState([]);

  const initialState = {
    id: "",
    produto: "",
    qnt: "",
    valor: "",
  };
  const [data, setData] = useState(initialState);

  useEffect(() => {
    api.get("lista-produto").then((response) => {
      setProducts(response.data);
    });
  }, []);

  async function deleteProduct(id) {
    try {
      await api.delete(`delete-produto/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (err) {
      alert("erro");
    }
  }

  async function editProduct(id) {
    try {
      setData(products.filter((product) => product.id === id)[0]);
    } catch (err) {
      alert("erro");
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if( data.id !== ""){
        const response = await api.put(`produto/${data.id}`, data)
       setProducts( products.map(e => e.id === response.data.id ? Object.assign({}, e,  {
        id: response.data.id,
        produto: response.data.produto,
        qnt: response.data.qnt,
        valor: response.data.valor,
      }) : e))
        setData(initialState)
      }else{
        const response = await api.post(`produto`, data)
        setProducts([...products, response.data]);
        setData(initialState)
      }
        } catch (err) {
          alert("erro");
        }
      }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Card className="marg-botton">
          <Card.Header as="h5">CADASTRAR PRODUTOS</Card.Header>
          <Card.Body>
            <Form.Row>
              <Form.Group className="col-md-6">
                <Form.Label>Nome*</Form.Label>
                <Form.Control
                  name="produto"
                  onChange={(e) => {
                    setData({ ...data, produto: e.target.value });
                  }}
                  value={data.produto}
                  placeholder="Informe o nome do produto"
                />
              </Form.Group>
              <Form.Group className="col-md-3">
                <Form.Label>Quantidade*</Form.Label>
                <Form.Control
                  name="qnt"
                  onChange={(e) => {
                    setData({ ...data, qnt: e.target.value });
                  }}
                  value={data.qnt}
                  placeholder="Qtd de produtos"
                />
              </Form.Group>
              <Form.Group className="col-md-3">
                <Form.Label>Valor*</Form.Label>
                <Form.Control
                  name="valor"
                  onChange={(e) => {
                    setData({ ...data, valor: e.target.value });
                  }}
                  value={data.valor}
                  placeholder="Valor do produto"
                />
              </Form.Group>
            </Form.Row>
            <Button type="submit" variant="primary">
              SALVAR
            </Button>
          </Card.Body>
        </Card>
      </Form>
      <Card>
        <Card.Header as="h5">LISTA DE PRODUTOS</Card.Header>

        <Card.Body>
          <Table>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Valor Und</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, id) => (
                <>
                  <tr key={id}>
                    <td>{product.produto}</td>
                    <td>{product.qnt}</td>
                    <td>{product.valor}</td>
                    <td>
                      <span className="just-icon">
                        <Link onClick={() => editProduct(product.id)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-pencil"
                            viewBox="0 0 16 16"
                          >
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                          </svg>
                        </Link>
                        <Link onClick={() => deleteProduct(product.id)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-trash"
                            viewBox="0 0 16 16"
                          >
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                            <path
                              fill-rule="evenodd"
                              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                            />
                          </svg>
                        </Link>
                      </span>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
}