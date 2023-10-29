import React, { useState } from "react";
import styled from "styled-components";

const SidebarItemContainer = styled.div`
  padding: .75em 1em;
  display: block;
  transition: background-color .15s;
  border-radius: 5px;
  color: #fff;


  &:hover {
    background-color: rgba(255, 255, 255, .1);
  }
`;

const SidebarTitle = styled.div`
  display: flex;
  font-size: 1.2em;
  justify-content: space-between;
`;


const ToggleBtn = styled.i`
  display: inline-block;
  width: 1.5em;
  cursor: pointer;
  transition: transform .3s;
`;

const SidebarContent = styled.div`
  padding-top: .25em;
  height: 0;
  overflow: hidden;

  &.open {
    height: auto;
  }
`;

const plainI = styled.i`
  display: inline-block;
  width: 1.7em;
`;

const PlainSidebarItemLink = styled.a`
  color: #fff;
  text-decoration: none;
  i {
    display: inline-block;
    width: 1.7em;
  }

  &:hover {
    text-decoration: underline;
  }
`;

const SidebarItem = ({ item }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {item.childrens ? (
        <SidebarItemContainer className={open ? "open" : ""}>
          <SidebarTitle>
            <span>
              {item.icon && <plainI className={item.icon}></plainI>}
              {item.title}
            </span>
            <ToggleBtn
              className={open ? "bi-chevron-up" : "bi-chevron-down"}
              onClick={() => setOpen(!open)}
            />
          </SidebarTitle>
          <SidebarContent className={open ? "open" : ""}>
            {item.childrens.map((child, index) => (
              <SidebarItem key={index} item={child} />
            ))}
          </SidebarContent>
        </SidebarItemContainer>
      ) : (
        <PlainSidebarItemLink href={item.path || "#"} className="sidebar-item plain">
          {item.icon && <plainI className={item.icon}></plainI>}
          {item.title}
        </PlainSidebarItemLink>
      )}
    </>
  );
};

export default SidebarItem;
