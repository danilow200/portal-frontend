import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    align-items: start;
    justify-items: center;
    padding-top: 80px;
`;

export const LinkBox = styled.a`
    display: grid;
    gap: 10px;
    max-width: 180px;
    text-align: center;

    span {
        font-family: "Urbanist", sans-serif;
        font-weight: 500;
        color: #1469ac;
        font-size: 32px;
    }
`;

export const Imgbox = styled.div`
    height: 180px;
    width: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(217, 217, 217, 0.2);
    border: 2px #1496AC solid;
    border-radius: 25px;
`;