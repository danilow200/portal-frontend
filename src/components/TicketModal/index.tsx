import { Container, InfoCard, Tabela, TituloCard } from "./style";
import { Chart } from "react-google-charts";

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

  row.sort((a, b) => {
    if (a[2] instanceof Date && b[2] instanceof Date) {
      return a[2].getTime() - b[2].getTime();
    }
    return 0;
  });

  for (let i = 0; i < props.ticketData.descontos.length; i++) {
    let desconto = props.ticketData.descontos[i];
    let entrada = new Date(desconto.inicio);
    entrada.setHours(entrada.getHours() + 3);
    let saida = new Date(desconto.fim);
    saida.setHours(saida.getHours() + 3);
    row.push(["Descontos", "", entrada, saida]);
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
        height="300px"
        options={timeline_options}
      />
      <TituloCard>Descontos</TituloCard>
      <Tabela role="grid">
        <thead>
          <tr className="cabeca">
          <th className="sort" tabIndex={0} rowSpan={1} colSpan={1}>Inicio</th>
            <th className="sort" tabIndex={0} rowSpan={1} colSpan={1}>Fim</th>
            <th tabIndex={0} rowSpan={1} colSpan={1}>Tempo Total</th>
            <th tabIndex={0} rowSpan={1} colSpan={1}>Auditor</th>
            <th tabIndex={0} rowSpan={1} colSpan={1}>Categoria</th>
            <th tabIndex={0} rowSpan={1} colSpan={1}>Status</th>
          </tr>
        </thead>
        <tbody>
          {props.ticketData.descontos.map((desconto, index) => 
            <tr key={index} role="row">
              <td>{desconto.inicio}</td>
              <td>{desconto.fim}</td>
              <td>{desconto.total}</td>
              <td>{desconto.auditor}</td>
              <td><span className="categoria">{desconto.categoria}</span></td>
              <td>{desconto.aplicado && <span className="aprovado">APROVADO</span>}</td>
            </tr>
          )}
        </tbody>
      </Tabela>
    </Container>
  );
};
