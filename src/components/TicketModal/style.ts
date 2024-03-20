import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    width: 1200px;
    height: 700px;
    background: white;
    border: #2A71B1 1px solid;
    border-radius: 8px;
    padding: 8px;
    gap: 10px;
    box-shadow: 0 4px 4px rgba(0,0,0, 0.25);
`;

export const InfoCard = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    width: 100%;
    height: 150px;
    padding-bottom: 8px;
    border: 1px solid #2A71B1;
    border-radius: 4px;
    text-align: start;
    line-height: 0.5cm;
    box-shadow: 0 4px 4px rgba(0,0,0, 0.25);
    background: #F9F9F9;

    .esquerda {
        font-weight: bold;
        color: #0D3080;
        padding-left: 12px;
    }

    .titulo {
        border-bottom: 1px solid #2A71B1;
        margin-bottom: 8px;
        padding-top: 8px;
        padding-bottom: 8px;
        background: #fff;
        border-top-right-radius: 4px;
        border-top-left-radius: 4px;
        height: 36px;
        font-weight: bold;
    }
`;