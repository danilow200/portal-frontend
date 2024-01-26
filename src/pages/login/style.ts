import styled from "styled-components";

export const Container = styled.div`
  /* background-color: red; */
  width: 100%;
  height: 100%;
  display: grid;
  margin: auto;
  align-items: center;
  justify-content: center;
  gap: 100px;
  padding-top: 50px;

  color: #fff;
  text-align: left;
  font-family: Arial;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const BorderContainer = styled.form`
  display: grid;
  align-items: center;
  padding: 34px 42px;
  gap: 40px;
  color: white;
  border-radius: 20px;
  border: 2px solid #fff;
  background: rgba(40, 71, 142, 0);
`;

export const LoginIpunt = styled.input`
  border-radius: 5px;
  background: #fff;
  border: none;
  height: 59px;
  color: #000;
  font-family: Arial;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const LoginButton = styled.button`
  border-radius: 5px;
  background: #28478e;
  padding: 14px;
  border: none;
  margin-top: 60px;

  color: #fff;
  text-align: center;
  font-family: Arial;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  transition: ease-in-out 200ms;

  :hover {
    cursor: pointer;
    filter: brightness(1.2);
  }
`;
