import React from "react";
import SidebarItem from "./SidebarItem";
import items from "../../data/sidebar.json";
import styled from "styled-components";
import '../Menu/teste.css';

const SidebarContainer = styled.div`
  max-width:  100%;
  flex-shrink: 0;
  background-color: black;
  max-height: 100%;
  overflow: auto;
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      {items.map((item, index) => (
        <SidebarItem key={index} item={item} />
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;
