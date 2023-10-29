import React from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import Sidebar from '../../components/Menu/Sidebar.js';
import Footer from "../../components/Footer/footer.js";
import * as C from "../../components/Template/style.js";

const Home = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();

  const handleSignout = () => {
    signout();
  };

  return (
    <C.Main>
      <C.Container>
      <Sidebar/>
          <C.Content>    
          <C.Label>SISTEMA DE LOGIN</C.Label>
          </C.Content>
     </C.Container>
     <Footer/>
   </C.Main>
  )
};

export default Home;
