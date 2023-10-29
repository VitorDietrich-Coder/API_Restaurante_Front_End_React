import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  width: 100%;
  background-color: #000000;
  flex-direction: row;
`;

const Container = styled.div`
  display: flex;
  align-items: flex-end;
  height: 100px;
  width: 100%;
  padding-right: 0px;
  justify-content: end;
  align-items: center;
`;

const Logo = styled.img`
  width: 100px;
  align-items: flex-start;
  margin-left: 80px;
  padding: 15px 0;
  position: static;
`;

const MenuSection = styled.div`
  display: flex;
  &.on {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #7259c1;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const MenuToggle = styled.div`
  width: 40px;
  height: 30px;
  margin-right: 20px;
`;

const One = styled.div`
  background-color: #ffffff;
  height: 5px;
  width: 100%;
  margin: 6px auto;
  transition-duration: 0.3s;
  &.on {
    transform: rotate(45deg) translate(7px, 7px);
    background-color: #fff;
  }
`;

const Two = styled.div`
  background-color: #ffffff;
  height: 5px;
  width: 100%;
  margin: 6px auto;
  transition-duration: 0.3s;
  opacity: 0;
`;

const Three = styled.div`
  background-color: #ffffff;
  height: 5px;
  width: 100%;
  margin: 6px auto;
  transition-duration: 0.3s;
  &.on {
    transform: rotate(-45deg) translate(8px, -9px);
    background-color: #fff;
  }
`;

const Nav = styled.nav`
  display: flex;
`;

const Ul = styled.ul`
  display: flex;
`;

const Li = styled.li`
  margin-right: 20px;
  font-size: 1.2rem;
`;

const A = styled.a`
  text-decoration: none;
  color: rgb(241, 239, 239);
  text-transform: uppercase;
  font-family: 'Roboto', sans-serif;
  font-size: 1.2rem;
  padding: 2.0rem;
  transition: all 250ms linear 0s;
  &:hover {
    font-size: 1.4rem;
  }
  position: relative;
  animation-name: menu;
  animation-duration: 1s;
  transition: 100ms;
`;

const FiLogOut = styled(FiArrowLeft)`
  position: relative;
  top: 2px;
  left: 2px;
`;

const Header = () => {
  const [classOn, setClassOn] = useState(false);
  const { signout } = useAuth();
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <Logo src="../../../logoRestaurante.png" alt="logo" />
      <Container>
        <MenuSection className={classOn ? 'on' : ''} onClick={() => setClassOn(!classOn)}>
          <Nav>
            <Ul>
              <Li>
                <A href="/">SOBRE NÓS</A>
              </Li>
              <Li>
                <A href="/">CONTATO</A>
              </Li>
              <Li>
                <A onClick={signout} className={classOn ? 'show' : 'hide'} href="/">
                  SAIR <FiLogOut className="FiArrowLeft" />
                </A>
              </Li>
            </Ul>
          </Nav>
        </MenuSection>
      </Container>
    </HeaderContainer>
  );
};

export default Header;
