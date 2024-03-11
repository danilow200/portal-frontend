import styled from "styled-components";

type PageProps = {
  ativo?: boolean;
};

export const Tabela = styled.table`
  font-family: "Inter", sans-serif;
  min-width: 1000px;
  width: 100%;
  height: 600px;
  max-height: 600px;
  overflow: auto;
  display:block;
  margin: 0 auto;
  clear: both;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 0.9em;
  border-bottom: 1px solid #a6c9e2;
  color: #000;
  font-weight: 500;
  text-align: center;

  .cabeca {
    background-color: #fff !important;
    width: 100%;
    border-bottom: 1px solid #a6c9e2;
    font-weight: 700;
    font-size: 12;
  }

  tr{
    height: 30px;
  }

  td{
    width: 300px;
  }

  tr:nth-child(odd){
    background-color: #F9F9F9;
  }
`;

export const HeaderArea = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  justify-content: space-between;

  
  .fechado{
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='%2326749a'><polygon points='0,0 100,0 50,50'/></svg>")
      no-repeat;
    background-size: 12px;
    background-position: calc(100% - 8px) 17px;
    background-repeat: no-repeat;
  }


  .aberto{
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='%2326749a'><g transform='rotate(180, 50, 50)'><polygon points='0,0 100,0 50,50'/></g></svg>")
    no-repeat;
    background-size: 12px;
    background-position: calc(100% - 8px) 10px;
    background-repeat: no-repeat;
  }
`;

export const BuscaInput = styled.input`
  border: 1px #2a71b1 solid;
  background: transparent;
  display: flex;
  padding: 8px;
  padding-left: 30px;
  border-radius: 3px;
  color: #2a71b1;
  width: 250px;

  ::placeholder {
    color: #2a71b1;
  }

  :focus {
    outline: none;
  }
`;

export const QuantidadeTicket = styled.span`
  text-align: center;
  color: #2A71B1;
  font-size: 16px;
  font-weight: 500;
  align-self: center;
`;

export const DowloadButton = styled.button`
  width: 40px;
  height: 40px;
  align-self: end;
  justify-self: end;
  background: #fff;
  display: flex;
  padding: 10px;
  border: #2A71B1 2px solid;
  border-radius: 6px;
  cursor: pointer;
  transition: ease-in-out 200ms;

  :hover {
    background-color: #2A71B1;
    
    .hover_color {
      stroke: #fff;
    }
  }
`;

export const SelectArea = styled.select`
  height: 40px;
  width: 230px;
  align-self: end;
  justify-self: end;
  background: #fff;
  display: flex;
  padding: 10px;
  border: #2A71B1 2px solid;
  border-radius: 6px;
  color: #2A71B1;
  cursor: pointer;
  font-size: 16px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  :focus {
    outline: none;
  }
`

export const CountArea = styled.select`
  height: 40px;
  width: 66px;
  align-self: end;
  justify-self: end;
  background: #fff;
  display: flex;
  padding: 10px;
  border: #2A71B1 2px solid;
  border-radius: 6px;
  color: #2A71B1;
  cursor: pointer;
  font-size: 16px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin-left: 50px;

  :focus {
    outline: none;
  }
`;

export const PagContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  text-align: center;
  gap: 10px;
  transition: ease-in-out 200ms;

  span {
    color: #2a71b1;
    font-size: 16px;
    margin-left: 10px;
    margin-right: 10px;
    font-weight: 700;
  }
`;

export const PagButton = styled.button<PageProps>`
  display: flex;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  background: ${props => props.ativo ? "#2a71b1" : "#FFF"};
  border: none;
  color: ${props => props.ativo ? "#FFF" : "#2a71b1"};
  cursor: pointer;
  filter: drop-shadow(0 4px 4px rgba(0,0,0,.25));
`;

export const NavButton = styled.button`
  display: flex;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  background: #fff;
  border: none;
  color: #2a71b1;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
`;
