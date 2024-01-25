import React from 'react';
import { bool, func } from 'prop-types';
import { StyledBurger } from './style';

type BurgerProps = {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const Burger = ({ open, setOpen }: BurgerProps) => {
  return (
    <StyledBurger open={open} onClick={() => setOpen(!open)}>
      <div />
      <div />
      <div />
    </StyledBurger>
  )
}
Burger.propTypes = {
  open: bool.isRequired,
  setOpen: func.isRequired,
};