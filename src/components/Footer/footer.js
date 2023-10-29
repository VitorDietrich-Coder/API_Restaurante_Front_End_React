import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faGithub,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const FooterContainer = styled.footer`
  text-align: center;
  background-color: rgba(49, 49, 54, 0.993);
  color: aliceblue;
  font-size: 15px;
  width: 100%;
  height: 4rem;
  display: grid;
  grid-template-columns: 3fr 6fr 1fr 1fr 1fr;
  position: static;
  bottom: 0;
  left: 0;
`;

const FooterItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ size }) => size || "20px"};
  background: ${({ background }) => background || "#292a30"};
  cursor: pointer;
  transition: background-color 0.4s;

  &:hover {
    background-color: ${({ hoverBackground }) => hoverBackground || "#000000"};
  }
`;

const CopyrightText = styled.span`
  padding-right: 5px;
  padding-left: 5px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterItem size="15px" background="rgba(49, 49, 54, 0.993)">
        <CopyrightText>Copyright</CopyrightText>
        <FontAwesomeIcon icon={faCopyright} />
        <span style={{ paddingLeft: 5 }}>
          {new Date().getFullYear()} YourCompany. All Rights Reserved.
        </span>
      </FooterItem>
      <FooterItem background="#292a30">
        <FontAwesomeIcon icon={faGithub} />
      </FooterItem>
      <FooterItem background="#25252b">
        <FontAwesomeIcon icon={faFacebook} />
      </FooterItem>
      <FooterItem background="#202025">
        <FontAwesomeIcon icon={faYoutube} />
      </FooterItem>
    </FooterContainer>
  );
};

export default Footer;
