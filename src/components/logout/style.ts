import styled from "styled-components";

export const CustomButton = styled.button`
  border-radius: 5px;
  background: #fff;
  padding: 10px 14px;
  border: none;
  cursor: pointer;
  height: 40px;

  color: #28478e;
  text-align: center;
  font-family: Arial;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  transition: ease-in-out 200ms;

  :hover {
    translate: 0 -4px;
    filter: drop-shadow(0px 0px 4px #fff);
  }
`;
