import styled from 'styled-components';

type StyledMenuProps = {
  open: boolean;
};

export const StyledMenu = styled.nav<StyledMenuProps>`
  display: none;
  flex-direction: column;
  justify-content: center;
  background: rgba(0, 0, 255, .7);
  backdrop-filter: blur(5px);
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
  
  @media ${(props) => props.theme.breakpoints.mobile} {
    width: 100%;
    display: flex;
    left: ${({ open }) => open ? '0' : '-50px'};
  }

  .underline {
    width: 100%;
    height: 1px;
    border-radius: 999px;
    background: rgba(0,212,255,.5);
    background: linear-gradient(90deg, rgba(0,212,255,.3) 0%, rgba(9,9,121,1) 50%, rgba(0,212,255,.3) 100%);
  }

  a {
    font-size: 2rem;
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: ${({ theme }) => theme.colors.primaryDark};
    text-decoration: none;
    transition: color 0.3s linear;
    
    @media ${(props) => props.theme.breakpoints.mobile} {
      font-size: 1.5rem;
      text-align: center;
    }

    :hover {
      color: ${({ theme }) => theme.colors.primaryHover};
    }
  }
`;