import styled from "styled-components";

export const Container = styled.div`
  background-image: url('/login_bg.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  height: 100vh;
  width: 100%;
  display: grid;
  margin: auto;
  align-items: center;
  justify-content: center;
  gap: 0px;
  /* padding-top: 50px; */

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
  cursor: pointer;

  color: #fff;
  text-align: center;
  font-family: Arial;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  transition: ease-in-out 200ms;

  :hover {
    color: #28478e;
    background: white;
  }
`;
