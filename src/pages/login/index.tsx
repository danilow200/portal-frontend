/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import axios from "axios";
import { BorderContainer, Container, LoginButton, LoginIpunt } from "./style";

export default function Login() {
  const [isAuth, setIsAuth] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      setIsAuth(true);
    }
  }, [isAuth]);

  // Create the submit method.
  const submit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const user = {
      username: username,
      password: password,
    };
    // Create the POST requuest
    const { data } = await axios.post("http://localhost:8000/token/", user, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    // Initialize the access & refresh token in localstorage.
    localStorage.clear();
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);
    axios.defaults.headers.common["Authorization"] = `Bearer ${data["access"]}`;
    window.location.href = "/";
  };

  return (
    <>
      <Container>
        <img alt="Logo Login" src="./logo_login.png" />
        <div>
          <span style={{ marginLeft: "20px" }}>Acesso Portal GMP</span>
          <BorderContainer onSubmit={submit}>
            <LoginIpunt
              type="text"
              name="Usuario"
              placeholder="Usuário"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <LoginIpunt
              type="password"
              name="Senha"
              placeholder="Senha"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <LoginButton type="submit">ENTRAR</LoginButton>
          </BorderContainer>
        </div>
      </Container>
    </>
  );
}
