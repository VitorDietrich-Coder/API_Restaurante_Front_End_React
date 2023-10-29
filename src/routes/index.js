import { Fragment } from "react";
import React from "react";
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import useAuth from "../hooks/useAuth";
import Home from "../Pages/Home/Home.js";
import Header from "../components/Header/index.js";
import Signin from "../Pages/Signin/";
import Signup from "../Pages/Signup/index.js";
import Cliente from "../Pages/Clientes/CadastroCliente.js";
import Fornecedor from "../Pages/Fornecedores/CadastroFornecedor.js";
import Produto from "../Pages/Produtos/CadastroProduto.js";
 
import Pedido from "../Pages/Pedidos/CadastrarPedido";

const Private = ({ Item }) => {
  const { signed } = useAuth();

  return signed > 0 ? <Item /> : <Signin />;
};

const RoutesApp = () => {
  const { signed } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/home" element={ signed ? ( <Fragment> <Header /> <Private Item={Home} /> </Fragment>) : ( <Signin /> ) } />
        <Route path="/cliente" element={ signed ? ( <Fragment>  <Header />  <Private Item={Cliente} /> </Fragment>) : ( <Signin /> ) } />
        <Route path="/fornecedor" element={ signed ? ( <Fragment>  <Header />  <Private Item={Fornecedor} /> </Fragment>) : ( <Signin /> ) } />
        <Route path="/produto" element={ signed ? ( <Fragment>  <Header />  <Private Item={Produto} /> </Fragment>) : ( <Signin /> ) } />

        <Route path="/pedido" element={ signed ? ( <Fragment>   <Header />  <Private Item={Pedido} /> </Fragment>) : ( <Signin /> ) } />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Signin />} />
      </Routes>
    </Router>
  );
};

export default RoutesApp;
