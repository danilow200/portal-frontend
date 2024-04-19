import styled from 'styled-components';

type StyledBurgerProps = {
    open: boolean,
  };

export const StyledBurger = styled.button<StyledBurgerProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2.8rem;
  height: 3rem;
  background: transparent;
  border: none;
  cursor: pointer;
  pointer-events: all;
  padding-left: 10px;
  z-index: 10;
  
  &:focus {
    outline: none;
  }
  
  div {
    width: 2.8rem;
    height: 0.25rem;
    background: #fff;
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }

    :nth-child(2) {
      opacity: ${({ open }) => open ? '0' : '1'};
      transform: ${({ open }) => open ? 'translateX(20px)' : 'translateX(0)'};
    }

    :nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`;