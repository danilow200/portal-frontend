// Importando 'useEffect' do React. 'useEffect' é um hook que permite executar efeitos colaterais em componentes funcionais.
import { useEffect } from 'react';

// Definindo um hook personalizado chamado 'useOnClickOutside'.
export const useOnClickOutside = (ref: any, handler: any) => {
  // Usando 'useEffect' para adicionar um ouvinte de eventos ao documento quando o componente é montado.
  useEffect(() => {
    // Definindo o ouvinte de eventos. Este ouvinte é uma função que será chamada sempre que um evento 'mousedown' ocorrer.
    const listener = (event: { target: any; }) => {
      // Se o alvo do evento está dentro do elemento referenciado (ou seja, se o clique ocorreu dentro do elemento), a função retorna e não faz nada.
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      // Se o alvo do evento está fora do elemento referenciado (ou seja, se o clique ocorreu fora do elemento), a função 'handler' é chamada com o evento.
      handler(event);
    };

    // Adicionando o ouvinte de eventos ao documento. Agora, sempre que um evento 'mousedown' ocorrer, o ouvinte será chamado.
    document.addEventListener('mousedown', listener);

    // Retornando uma função de limpeza. Esta função será chamada quando o componente for desmontado.
    return () => {
      // Removendo o ouvinte de eventos do documento. Isso é importante para evitar vazamentos de memória.
      document.removeEventListener('mousedown', listener);
    };
  },
  // Passando 'ref' e 'handler' como dependências do 'useEffect'. Isso significa que o efeito será executado novamente sempre que 'ref' ou 'handler' mudarem.
  [ref, handler],
  );
};
