// Importando as funções 'useEffect' e 'useState' do React.
// 'useEffect' é usado para executar efeitos colaterais em componentes funcionais.
// 'useState' é um hook que permite adicionar o estado do React a componentes funcionais.
import { useEffect, useState } from "react";

// Importando a biblioteca 'styled-components' para estilização.
import styled from "styled-components";

// Importando a biblioteca 'axios' para fazer solicitações HTTP.
import axios from "axios";

// Importando o componente 'LogoutButton'.
import { LogoutButton } from "../../components/logout";
import { Header } from "../../components/Header";
import { Navbar } from "../../components/Navbar";

// Definindo um componente funcional chamado 'Home'.
export default function Home() {
  // Inicializando o estado 'message' com uma string vazia.
  const [tickets, setTickets] = useState([]);

  // Usando 'useEffect' para executar o código dentro da função quando o componente é montado.
  useEffect(() => {
    // Verificando se o token de acesso existe no armazenamento local.
    if (localStorage.getItem("access_token") === null) {
      // Se o token de acesso não existir, redireciona o usuário para a página de login.
      window.location.href = "/login";
    } else {
      // Se o token de acesso existir, faz uma solicitação GET para a API.
      (async () => {
        try {
          const { data } = await axios.get("http://localhost:8000/home/", {
            headers: {
              "Content-Type": "application/json",
              // Incluindo o token de acesso no cabeçalho da solicitação.
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          });
        } catch (e) {
          // Se ocorrer um erro (por exemplo, o usuário não está autenticado), registra "not auth" no console.
          console.log("not auth");
        }
      })();

    }

    (async () => {
      try {
        const response = await axios.get("http://localhost:8000/get_tickets/");
        console.log(response.data);
        setTickets(response.data)
      } catch (error) {
        console.error(`Erro ao buscar tickets: ${error}`);
      }
    })();

  }, []);

  // Retornando o JSX para renderizar na página.
  return (
    <>
      <Header pag="TICKETS" />
      <div
        style={{
          display: "grid",
        }}
      >
        <Navbar />
      </div>
    </>
  );
}
