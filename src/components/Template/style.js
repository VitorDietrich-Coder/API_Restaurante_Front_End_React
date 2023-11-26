import styled from "styled-components";

export const Main = styled.div`
    display: flex;
    flex-direction: column; /* Alteração aqui */
    min-height: 100vh; /* Alteração aqui */ 
`;

export const Html = styled.div`
  height: 100vh;
`;

export const Body = styled.div`
  height: 100vh;
`;


export const Container = styled.div`
    flex-grow: 1; /* Alteração aqui */
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: center;
    max-height: 100%;
    max-width: 100%;
    padding: 0px 0px 0px 0px; /* Alterado o valor do padding */
    border: 0px;
`;

export const Content = styled.div`
  gap: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  background-color: white;
  max-width: 100%;
  padding: 10px;
`;

export const Label = styled.label`
  font-size: 18px;
  font-weight: 600;
  color: #676767;
`;

export const LabelSignup = styled.label`
  font-size: 16px;
  color: #676767;
`;

export const LabelError = styled.label`
  font-size: 14px;
  color: red;
`;

export const Strong = styled.strong`
  cursor: pointer;

  a {
    text-decoration: none;
    color: #676767;
  }
`;

export const ButtonColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 10px;
`;
 