/* eslint-disable @next/next/no-html-link-for-pages */
import React from 'react';
import { bool } from 'prop-types';
import { StyledMenu } from './style';

type MenuProps = {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
  }

export const Menu = ({ open }: MenuProps) => {
  return (
    <StyledMenu open={open}>
      <a href="/">
        <span role="img" aria-label="about us">&#x1f481;&#x1f3fb;&#x200d;&#x2642;&#xfe0f;</span>
        About us
      </a>
      <div className='underline' />
      <a href="/">
        <span role="img" aria-label="price">&#x1f4b8;</span>
        Pricing
      </a>
      <div className='underline' />
      <a href="/">
        <span role="img" aria-label="contact">&#x1f4e9;</span>
        Contact
        </a>
    </StyledMenu>
  )
}
Menu.propTypes = {
  open: bool.isRequired,
}