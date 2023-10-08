import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  height: 100vh;
`;

export const Content = styled.div`
  rowGap: 100px;
  display: flex;
  alignContent: wrap;
  justify-content: center;
  flex-direction: row; 
  width: 100%;
  box-shadow: 0 1px 2px #0003;
  background-color: white;
  max-width: 550px; 
  padding: 20px;
  border-radius: 5px;
`;

export const LabelColumn = styled.div`
  display: flex;
  row-gap: 20px;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 5px;
`;

export const Label = styled.label`
  font-size: 18px;
  font-weight: 600;
  color: #676767;
  margin-bottom: 5px;
`;

export const ButtonColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 10px;
`;

export const LabelSignin = styled.label`
  font-size: 16px;
  color: #676767;
`;

export const LabelSignup = styled.label`
  font-size: 16px;
  color: #676767;
`;


export const labelError = styled.label`
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
