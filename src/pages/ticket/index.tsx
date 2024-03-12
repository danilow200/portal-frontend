// Importando as funções 'useEffect' e 'useState' do React.
// 'useEffect' é usado para executar efeitos colaterais em componentes funcionais.
// 'useState' é um hook que permite adicionar o estado do React a componentes funcionais.
import { SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../../components/Header";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Foooter";
import { BuscaInput, CountArea, DowloadButton, HeaderArea, NavButton, PagButton, PagContainer, QuantidadeTicket, SelectArea, Tabela, UploadButton } from "./style";
import Image from "next/image";
import { relative } from "path";

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
  status: string,
  filas: FilaType[]
}

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export default function Home() {
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [select, isSelect] = useState(false);
  const [count, isCount] = useState(false);
  const [countTicket, isCountTicket] = useState(10);
  const [pagina, isPagina] = useState(0);

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

  const download_csv = async () => {
    try {
      const response = await axios.get("http://localhost:8000/exporta_csv/", { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.csv'); // ou qualquer outro nome de arquivo que você deseja
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.log("download não funcionou", e);
    }
  };


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

  const [myfile, setMyFile] = useState<File | null>(null);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setMyFile(file);
      console.log(file);
    }
  };

  const handleDownload = async () => {
    const formData = new FormData();
    if (myfile) {
      formData.append('myfile', myfile);
    }
    console.log(myfile);

  
    try {
      const response = await axios.post('http://localhost:8000/Import_Excel_pandas/', formData, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Retornando o JSX para renderizar na página.
  return (
    <div onClick={altera_select}>
      <Header pag="TICKETS" />
      <div
        style={{
          display: "flex",
          gap: "10px"
        }}
      >
        <Navbar />
        <div style={{margin: "auto", width: "100%", padding: "20px", display: "grid", gap: "20px"}}>
          
          <HeaderArea style={{justifyContent: "start"}}>
            <SelectArea className={select? "aberto" : "fechado"} onClick={() => isSelect(!select)}>
              <option value={"Janeiro"}>Janeiro</option>
              <option value={"Fevereiro"}>Fevereiro</option>
              <option value={"Março"}>Março</option>
            </SelectArea>
            <div style={{position: "relative"}}>
              <UploadButton htmlFor="upload_csv">
                <input 
                  id="upload_csv" 
                  type="file" 
                  name="myfile" 
                  accept=".csv" 
                  onChange={handleUpload}
                  style={{display: "none"}} 
                />
                <div style={{position: "absolute", top: "10px", left: "8px"}}>
                  <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className="hover_color" d="M13.987 10.7778V4.33203C13.987 4.19058 13.9354 4.05492 13.8433 3.9549L11.2677 1.15621C11.1757 1.05619 11.0509 1 10.9207 1H1.38973C1.11867 1 0.898926 1.23878 0.898926 1.53333V18.2444C0.898926 18.539 1.11867 18.7778 1.38973 18.7778H9.079" stroke="#2A71B1" stroke-linecap="round" stroke-linejoin="round"/>
                    <path className="hover_color" d="M10.7153 1V4.02222C10.7153 4.31677 10.935 4.55556 11.2061 4.55556H13.9874" stroke="#2A71B1" stroke-linecap="round" stroke-linejoin="round"/>
                    <path className="hover_color" d="M10.7153 16.1111H15.6234M15.6234 16.1111L13.1694 13.4445M15.6234 16.1111L13.1694 18.7778" stroke="#2A71B1" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                {myfile === null ? "importar" : myfile.name}
              </UploadButton>
            </div>
            <DowloadButton onClick={handleDownload}>
              <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path className="hover_color" d="M1.20703 1H15.9312" stroke="#2A71B1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path className="hover_color" d="M8.56895 17V5M8.56895 5L12.8635 8.5M8.56895 5L4.27441 8.5" stroke="#2A71B1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </DowloadButton>
          </HeaderArea>

          <HeaderArea>
            <div style={{position: "relative"}}>
              <BuscaInput id="busca" placeholder="Busca" />
              <label htmlFor="busca" style={{position: "absolute", top: "10px", left: "8px"}}>
                <Image src={"/search.png"} width={15}  height={16} alt="busca_icon" />
              </label>
            </div>
            <div style={{display: "flex"}}>
              <Image src="/Filter.png" width={32} height={40} alt="" />
              <QuantidadeTicket>FILTRAR</QuantidadeTicket>
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
              <SelectArea className={select? "aberto" : "fechado"} onClick={() => isSelect(!select)}>
                <option value={"Janeiro"}>Janeiro</option>
                <option value={"Fevereiro"}>Fevereiro</option>
                <option value={"Março"}>Março</option>
              </SelectArea>
              <DowloadButton onClick={download_csv}>
                <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path className="hover_color" d="M0.993652 17H15.7178" stroke="#2A71B1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path className="hover_color" d="M8.35558 1V13M8.35558 13L12.6501 9.5M8.35558 13L4.06104 9.5" stroke="#2A71B1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </DowloadButton>
            </div>
            
          </HeaderArea>
          <Tabela role="grid">
            <thead>
              <tr className="cabeca">
                <th tabIndex={0} rowSpan={1} colSpan={1}>Ticket</th>
                <th tabIndex={0} rowSpan={1} colSpan={1}>Site</th>
                <th tabIndex={0} rowSpan={1} colSpan={1}>Causa</th>
                <th tabIndex={0} rowSpan={1} colSpan={1}>Categoria</th>
                <th tabIndex={0} rowSpan={1} colSpan={1}>Prioridade</th>
                <th tabIndex={0} rowSpan={1} colSpan={1}>Status</th>
                <th tabIndex={0} rowSpan={1} colSpan={1}>Atendimento</th>
              </tr>
            </thead>
            <tbody>
              {tickets.slice(pagina * countTicket, countTicket * (pagina + 1)).map(( tick,index) => 
                <tr key={index} role="row">
                  <td>{tick.ticket}</td>
                  <td>{tick.estacao}</td>
                  <td>{tick.descricao}</td>
                  <td>{tick.categoria}</td>
                  <td>{tick.prioridade}</td>
                  <td>{tick.status}</td>
                  <td>{tick.atendimento}</td>
                </tr>
              )}
            </tbody>
          </Tabela>
          <PagContainer>
            {pagina > 0 && 
              <NavButton onClick={() => isPagina(pagina -1)}>&lt;</NavButton>
            }
            {paginas.map((pagNu, index) => {
                if (index < 4) {
                    // Renderiza os quatro primeiros números
                    return (
                        <PagButton
                            onClick={() => isPagina(pagNu - 1)}
                            ativo={pagina + 1 === pagNu}
                            key={pagNu}
                        >
                            {pagNu}
                        </PagButton>
                    );
                } else if (index === 4) {
                    // Renderiza "..." após os quatro primeiros números
                    return <span key="ellipsis">...</span>;
                } else if (index === paginas.length - 1) {
                    // Renderiza o último número
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
