// Importando as funções 'useEffect' e 'useState' do React.
// 'useEffect' é usado para executar efeitos colaterais em componentes funcionais.
// 'useState' é um hook que permite adicionar o estado do React a componentes funcionais.
import { SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../../components/Header";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Foooter";
import { BuscaInput, CountArea, DowloadButton, FilterModal, HeaderArea, ModalContainer, NavButton, PagButton, PagContainer, QuantidadeTicket, SelectArea, SemTicketMessagem, Tabela, UploadButton } from "./style";
import Image from "next/image";
import { relative } from "path";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TicketModal } from "../../components/TicketModal";

type FilaType = {
  nome: string,
  entrada: string,
  saida: string
}

type DescontoType = {
  ticket: number,
  estacao: string,
  inicio: string,
  fim: string,
  total: string,
  auditor: string,
  categoria: string,
  aplicado: boolean
}

type TicketType = {
  ticket: number,
  estacao: string,
  descricao: string,
  prioridade: number,
  sla: string,
  inicio: string,
  fim: string,
  atendimento: string,
  mes: string,
  categoria: string,
  status: string,
  filas: FilaType[],
  descontos: DescontoType[],
}

type AxiosData = {
  prioridade?: string;
  categoria?: string;
  mes?: string;
}

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const qs = require('qs');

export default function Home() {
  const [tickets, setTickets] = useState<DescontoType[]>([]);
  const [oTicket, setOTicket] = useState<TicketType | undefined>();
  const [select, isSelect] = useState(false);
  const [count, isCount] = useState(false);
  const [countTicket, isCountTicket] = useState(10);
  const [pagina, isPagina] = useState(0);
  const [mes, isMes] = useState("Março - 2024");
  const [selectTicket, isSelectTicket] = useState(1);
  const [isAscending, setIsAscending] = useState(true);
  const [sortField, setSortField] = useState('');
  const [abrirFiltro, setAbrirFiltro] = useState(false);
  const cateogiraOptions = ['DWDM', 'FIBRA', 'INFRA', 'IP', 'RADIO', 'CLIENTE', 'VIASAT', 'DESCONHECIDO'];
  const prioridadeOptions = ['Alta', 'Média', 'Baixa'];
  const [categoria, setCategoria] = useState('');
  const [prioridade, setPrioridade] = useState('');
  const [altera, setAltera] = useState(true);

  const sortTicket = async(field: keyof DescontoType, inverte: Boolean) => {
    console.log(tickets)
    setSortField(field);
    const sortedTickets = [...tickets].sort((a: DescontoType, b: DescontoType) => {
      let valueA: number = 0, valueB: number = 0;
      if (field === 'inicio' || field === 'fim') {
        const [date, time] = a[field].split(" ");
        const [day, month, year] = date.split("/");
        valueA = new Date(`${month}/${day}/${year} ${time}`).getTime();
        
        const [dateB, timeB] = b[field].split(" ");
        const [dayB, monthB, yearB] = dateB.split("/");
        valueB = new Date(`${monthB}/${dayB}/${yearB} ${timeB}`).getTime();
      }  else if (field === 'ticket') {
        valueA = a[field];
        valueB = b[field];
      }
      if (inverte){
        return isAscending ? valueA - valueB : valueB - valueA;
      }
      else{
        return !isAscending ? valueA - valueB : valueB - valueA;
      }
    });
  
    setTickets(sortedTickets);
    if (inverte){
      setIsAscending(!isAscending); // inverte a direção para a próxima vez que sortTicket for chamada
    }
  }
  const atualiza_ticket = async () => {
    axios.get('http://localhost:8000/get_descontos/')
    .then(function (response) {
      // handle success
      console.log(response.data);
      setTickets(response.data);
      setAltera(!altera);
    })
    .catch(function (error) {
      // handle error
      console.error(error);
    });
  };

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
      (atualiza_ticket)();
    // eslint-disable-next-line
  }}, [mes]);

  useEffect(() => {
    console.log(sortField);
      if (sortField === 'ticket') {
        sortTicket('ticket', false);
      }
      if (sortField === 'inicio') {
        sortTicket('inicio', false);
      }
      if (sortField === 'fim') {
        sortTicket('fim', false);
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [altera]);

  const altera_select = async () => {
    if(select == true){
      isSelect(false);
    }
    if(count == true){
      isCount(false);
    }
  }

  const totalBotoes = Math.ceil(tickets.length / countTicket);

  // Cria um array com os números das páginas
  const paginas = Array.from({ length: totalBotoes }, (_, index) => index + 1);

  const altera_pag_cont = async (e: { target: { value: any; }; }) =>{
    isCountTicket(Number(e.target.value));
    isPagina(Number(0));
  }

  const altera_mes = async(e: { target: { value: any; }; }) =>{
    console.log(String(e.target.value));
    isMes(String(e.target.value));
  }

  const busca_ticket = async (e: Number) => {
    axios.get(`http://localhost:8000/busca_ticket/?q=${e}`)
    .then(function (response) {
      // handle success
      console.log(response.data);
      setOTicket(response.data);
      isSelectTicket(e);
    })
    .catch(function (error) {
      // handle error
      console.error(error);
    });
  };


  // Retornando o JSX para renderizar na página.
  return (
    <div onClick={altera_select} style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      <Header pag="DESCONTOS" />
      <div
        style={{
          display: "flex",
          gap: "10px"
        }}
      >
        <Navbar />
        <div style={{margin: "auto", width: "100%", padding: "20px", display: "grid", gap: "20px"}}>
        <ToastContainer />
          <HeaderArea>
            <div style={{position: "relative"}}>
              <BuscaInput id="busca" placeholder="Busca" />
              <label htmlFor="busca" style={{position: "absolute", top: "10px", left: "8px"}}>
                <Image src={"/search.png"} width={15}  height={16} alt="busca_icon" />
              </label>
            </div>

            <div style={{display: "flex", position: "relative"}}>
              <Image style={{cursor: "pointer"}} onClick={() => setAbrirFiltro(!abrirFiltro)} src="/Filter.png" width={32} height={40} alt="" />
              <QuantidadeTicket style={{cursor: "pointer"}} onClick={() => setAbrirFiltro(!abrirFiltro)}>FILTRAR</QuantidadeTicket>
              <FilterModal style={{display: abrirFiltro? 'grid' : 'none'}}>
                <div>
                  <span>Categoria:</span>
                  <div>
                    <label>
                      <input type="radio" name="categoria" value={''} onChange={(e) => setCategoria(e.target.value)} />
                      TODAS
                    </label>
                  </div>
                  {cateogiraOptions.map(option => (
                    <div key={option}>
                      <label>
                        <input type="radio" name="categoria" value={option} onChange={(e) => setCategoria(e.target.value)} />
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
                
                <div style={{display: "grid", lineHeight: "1cm"}}>
                  
                  <div>
                    <span>Priordade:</span>
                    <div>
                      <label>
                        <input type="radio" name="prioridade" value={''} onChange={(e) => setPrioridade(e.target.value)} />
                        Todas
                      </label>
                    </div>
                    {prioridadeOptions.map(option => (
                      <div style={{height: "37px"}} key={option}>
                        <label>
                          <input type="radio" name="prioridade" value={option} onChange={(e) => setPrioridade(e.target.value)} />
                          {option}
                        </label>
                      </div>
                    ))} 
                  </div>
                  
                  <button onClick={atualiza_ticket}>Filtrar</button>
                </div>
              </FilterModal>
            </div>

            <div style={{display: "flex", gap: "8px"}}>
              <QuantidadeTicket>
                {(countTicket * (pagina + 1)) - countTicket + 1}
                {(countTicket * (pagina + 1)) > tickets.length && <> até {tickets.length} de </>} 
                {(countTicket * (pagina + 1)) <= tickets.length && <> até {countTicket * (pagina + 1)} de </>} 
                {tickets.length} Incidentes
              </QuantidadeTicket>
              <CountArea 
                className={count? "aberto" : "fechado"} 
                onClick={() => isCount(!count)}
                value={countTicket}
                onChange={altera_pag_cont}
              >
                <option value={"10"} onClick={() => isCountTicket(10)}>10</option>
                <option value={"25"} onClick={() => isCountTicket(25)}>25</option>
                <option value={"50"} onClick={() => isCountTicket(50)}>50</option>
              </CountArea>
              <SelectArea 
                className={select? "aberto" : "fechado"} 
                onClick={() => isSelect(!select)}
                onChange={altera_mes}
                defaultValue={"Março - 2024"}
              >
                <option value={"Janeiro - 2024"}>Janeiro - 2024</option>
                <option value={"Fevereiro - 2024"}>Fevereiro - 2024</option>
                <option value={"Março - 2024"}>Março - 2024</option>
              </SelectArea>
            </div>
            
          </HeaderArea>
          {tickets.length != 0 && 
            <Tabela role="grid">
              <thead>
                <tr className="cabeca">
                  <th className="sort" tabIndex={0} rowSpan={1} colSpan={1} onClick={() => sortTicket('ticket', true)}>Ticket {sortField == 'ticket' && isAscending && <>&#8595;</>}{sortField == 'ticket' && !isAscending && <>&#8593;</>}</th>
                  <th tabIndex={0} rowSpan={1} colSpan={1}>Site</th>
                  <th tabIndex={0} rowSpan={1} colSpan={1}>Categoria</th>
                  <th tabIndex={0} rowSpan={1} colSpan={1}>Status</th>
                  <th className="sort" tabIndex={0} rowSpan={1} colSpan={1} onClick={() => sortTicket('inicio', true)}>Inicio {sortField == 'inicio' && isAscending && <>&#8595;</>}{sortField == 'inicio' && !isAscending && <>&#8593;</>}</th>
                  <th className="sort" tabIndex={0} rowSpan={1} colSpan={1} onClick={() => sortTicket('fim', true)}>Fim {sortField == 'fim' && isAscending && <>&#8595;</>}{sortField == 'fim' && !isAscending && <>&#8593;</>}</th>
                  <th tabIndex={0} rowSpan={1} colSpan={1}>Tempo Total</th>
                </tr>
              </thead>
              <tbody>
                {tickets.slice(pagina * countTicket, countTicket * (pagina + 1)).map(( tick,index) => 
                  <tr key={tick.ticket} role="row">
                    <td className="ticket" onClick={() => busca_ticket(tick.ticket)}>{tick.ticket}</td>
                    <td>{tick.estacao}</td>
                    <td><span className="categoria">{tick.categoria}</span></td>
                    <td>{tick.aplicado && <span className="aprovado">APROVADO</span>}</td>
                    <td>{tick.inicio}</td>
                    <td>{tick.fim}</td>
                    <td>{tick.total}</td>
                    {tick.ticket == selectTicket && 
                      <ModalContainer>
                        <TicketModal ticketData={oTicket[0]} />
                        <span className="X-no-peito"  onClick={() => isSelectTicket(1)}>X</span>
                      </ModalContainer>
                    }
                  </tr>
                )}
              </tbody>
            </Tabela>
          }
          {tickets.length === 0 && <SemTicketMessagem>Sem Tickets</SemTicketMessagem>}
          
          <PagContainer>
            {pagina > 0 && 
              <NavButton onClick={() => isPagina(pagina -1)}>&lt;</NavButton>
            }
            {paginas.map((pagNu, index) => {
                if (pagNu >= pagina - 1 && pagNu <= pagina + 3) {
                    // Renderiza os números ao redor da página atual
                    return (
                        <PagButton
                            onClick={() => isPagina(pagNu - 1)}
                            ativo={pagina + 1 === pagNu}
                            key={pagNu}
                        >
                            {pagNu}
                        </PagButton>
                    );
                } else if (pagNu === pagina + 4 || pagNu === pagina - 2) {
                    // Renderiza "..." antes e depois dos números ao redor da página atual
                    return <span key={`ellipsis${pagNu}`}>...</span>;
                } else if (pagNu === 1 || pagNu === paginas.length) {
                    // Renderiza o primeiro e último número
                    return (
                        <PagButton
                            onClick={() => isPagina(pagNu - 1)}
                            ativo={pagina + 1 === pagNu}
                            key={pagNu}
                        >
                            {pagNu}
                        </PagButton>
                    );
                }
                return null; // Ignora outros números
            })}
            {pagina < totalBotoes - 1 && 
              <NavButton onClick={() => isPagina(pagina + 1)}>&gt;</NavButton>
            }
            {pagina == totalBotoes - 1 && 
              <NavButton style={{cursor: "default"}} />
            }
          </PagContainer>

        </div>
      </div>
      <Footer />
    </div>
  );
}