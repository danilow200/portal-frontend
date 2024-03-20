import { Container, InfoCard } from "./style";
import { Chart } from "react-google-charts";

type FilaType = {
  nome: string,
  entrada: string,
  saida: string
}

type DescontoType = {
  inicio: string,
  fim: string,
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

export const TicketModal = (props: { ticketData: TicketType }) => {
  function convertDateFormat(dateStr: String) {
    let [date, time] = dateStr.split(' ');
  
    let [day, month, year] = date.split('/');
    let newDateStr = `${year}-${month}-${day}T${time}`;
  
    let dateObj = new Date(newDateStr);
    return dateObj.toISOString();
  }
  
  const columns = [
    {type: "string", id: "Ticket"},
    {type: "string", id: "name"},
    {type: "date", id: "Start"},
    {type: "date", id: "End"},
  ]

  const row = [];
  
  row.push(["Ticket", props.ticketData.ticket.toString(), new Date(convertDateFormat(props.ticketData.inicio)), new Date(convertDateFormat(props.ticketData.fim))]);

  console.log(props.ticketData)

  for (let i = 0; i < props.ticketData.filas.length; i++) {
    let fila = props.ticketData.filas[i];
    let entrada = new Date(fila.entrada);
    entrada.setHours(entrada.getHours() + 3);
    let saida = new Date(fila.saida);
    saida.setHours(saida.getHours() + 3);
    row.push([fila.nome, "", entrada, saida]);
}

  console.log(row);

  const data = [columns, ...row];

  var timeline_options = {
    hAxis: {
      format:''
    },
    tooltip:{
      allowHtml: true,
      format: "MMM dd, yyyy"
    },
    vAxis: {
      format: 'long'
    }
  };

  return( 
    <Container>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "100px"}}>
        <InfoCard>
          <span className="esquerda titulo">Ticket: </span>
          <span className="titulo">{props.ticketData.ticket}</span>
          <span className="esquerda">Site: </span>
          <span>{props.ticketData.estacao}</span>
          <span className="esquerda">Causa: </span>
          <span>{props.ticketData.descricao}</span>
          <span className="esquerda">Categoria: </span>
          <span>{props.ticketData.categoria}</span>
          <span className="esquerda">Prioridade: </span>
          <span>{props.ticketData.prioridade}</span>
          <span className="esquerda">Status: </span>
          <span>{props.ticketData.status}</span>
        </InfoCard>
        <InfoCard>
          <span className="esquerda titulo">SLA: </span>
          <span className="titulo">{props.ticketData.sla}</span>
          <span className="esquerda">Abertura: </span>
          <span>{props.ticketData.inicio}</span>
          <span className="esquerda">Fechamento: </span>
          <span>{props.ticketData.fim}</span>
          <span className="esquerda">Atendimento: </span>
          <span>{props.ticketData.atendimento}</span>
        </InfoCard>
      </div>
      <Chart
        chartType="Timeline"
        data={data}
        width="100%"
        height="400px"
        options={timeline_options}
      />
      {props.ticketData.descontos.map((desconto, index) => 
        <div style={{color: "#000"}} key={index}>{desconto.inicio}</div>
      )}
    </Container>
  );
};
