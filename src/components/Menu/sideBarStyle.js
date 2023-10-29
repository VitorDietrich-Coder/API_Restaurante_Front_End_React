import styled from 'styled-components';

export const Sidebar = styled.div`
  width: 260px;
  flex-shrink: 0;
  background-color: rgba(22, 22, 22, 1);
  height: 100%;
  overflow: auto;
`;

export const SidebarItem = styled.div`
  padding: .75em 1em;
  display: block;
  transition: background-color .15s;
  border-radius: 5px;

  &:hover {
    background-color: rgba(255, 255, 255, .1);
  }

  &.open > .sidebar-title .toggle-btn {
    transform: rotate(180deg);
  }
`;

export const SidebarTitle = styled.div`
  display: flex;
  font-size: 1.2em;
  justify-content: space-between;
`;

export const SidebarToggleBtn = styled.i`
  display: inline-block;
  width: 1.5em;
  cursor: pointer;
  transition: transform .3s;
`;

export const SidebarContent = styled.div`
  padding-top: .25em;
  height: 0;
  overflow: hidden;

  &.open {
    height: auto;
  }
`;

export const PlainSidebarItemLink = styled.a`
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
