// Importando a biblioteca 'axios' para fazer solicitações HTTP.
import axios from "axios";

// Importando o componente 'CustomButton' de './style'.
import { CustomButton } from "./style";

// Definindo um componente funcional chamado 'LogoutButton'.
export const LogoutButton = () => {
  // Definindo uma função assíncrona chamada 'logout'.
  const logout = async () => {
    try {
      // Fazendo uma solicitação POST para a API de logout.
      const { data } = await axios.post(
        "http://localhost:8000/logout/",
        // Enviando o token de atualização armazenado no armazenamento local como parte do corpo da solicitação.
        { refresh_token: localStorage.getItem("refresh_token") },
        {
          headers: {
            "Content-Type": "application/json",
            // Incluindo o token de acesso no cabeçalho da solicitação.
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          // Permitindo o envio de cookies.
          withCredentials: true,
        }
      );
      // Limpando o armazenamento local após o logout bem-sucedido.
      localStorage.clear();
      // Removendo o cabeçalho de autorização padrão do axios.
      axios.defaults.headers.common["Authorization"] = null;
      // Redirecionando o usuário para a página de login.
      window.location.href = "/login";
    } catch (e) {
      // Se ocorrer um erro (por exemplo, a solicitação falhar), registra "logout não funcionou" no console.
      console.log("logout não funcionou", e);
    }
  };

  // Retornando um botão de logout que, quando clicado, chama a função de logout.
  return <CustomButton onClick={logout}>Logout</CustomButton>;
};
