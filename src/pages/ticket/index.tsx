// Importando as funções 'useEffect' e 'useState' do React.
// 'useEffect' é usado para executar efeitos colaterais em componentes funcionais.
// 'useState' é um hook que permite adicionar o estado do React a componentes funcionais.
import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../../components/Header";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Foooter";
import { Tabela } from "./style";

type FilaType = {
  nome: string,
  entrada: string,
  saida: string
}

type TicketType = {
  ticket: number,
  estacao: string,
  descricao: string,
  prioridade: number,
  sla: string,
  atendimento: string,
  categoria: string,
  filas: FilaType[]
}

export default function Home() {
  const [tickets, setTickets] = useState<TicketType[]>([]);

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
          display: "flex",
          gap: "10px"
        }}
      >
        <Navbar />
        <div>
          <Tabela role="grid">
            <thead>
              <tr className="cabeca">
                <th tabIndex={0} rowSpan={1} colSpan={1}>Ticket</th>
                <th tabIndex={0} rowSpan={1} colSpan={1}>Site</th>
                <th tabIndex={0} rowSpan={1} colSpan={1}>Categoria</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map(( tick,index) => 
                <tr key={index} role="row">
                  <th>{tick.ticket}</th>
                  <th>{tick.estacao}</th>
                  <th>{tick.categoria}</th>
                  {/* {tick.filas.map(( fila, index2) => 
                    <div key={index2}>{fila.nome}</div>
                  )} */}
                </tr>
              )}
            </tbody>
          </Tabela>
        </div>
      </div>
      <Footer />
    </>
  );
}
