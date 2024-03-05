/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../../components/Header";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Foooter";
import { Imgbox, Container, LinkBox } from "./style";

const lista_plataforma = [
    {
        image: "./plataforma/image 2.png",
        link: "",
        name: "Plant Management",
    },
    {
        image: "./plataforma/image 2.png",
        link: "",
        name: "Order Management",
    },
    {
        image: "./plataforma/image 3.png",
        link: "",
        name: "Portal CIGR",
    },
    {
        image: "./plataforma/image 2.png",
        link: "",
        name: "ITSM",
    },
    {
        image: "./plataforma/image 4.png",
        link: "",
        name: "Padtec NMS+",
    },
    {
        image: "./plataforma/image 2.png",
        link: "",
        name: "BCE",
    },
    {
        image: "./plataforma/image 2.png",
        link: "",
        name: "Painel Indicadores",
    },
    {
        image: "./plataforma/image 3.png",
        link: "",
        name: "Report",
    },
    {
        image: "./plataforma/image 7.png",
        link: "",
        name: "SIGA-DOC",
    },
]

export default function Home() {
  useEffect(() => {
    if (localStorage.getItem("access_token") === null) {
      window.location.href = "/login";
    } else {
      (async () => {
        try {
          const { data } = await axios.get("http://localhost:8000/home/", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          });
        } catch (e) {
          console.log("not auth");
        }
      })();

    }

  }, []);

  return (
    <>
      <Header pag="PLATAFORMAS" />
      <div
        style={{
          display: "flex",
          gap: "10px"
        }}
      >
        <Navbar />
        <Container>
            {lista_plataforma.map((index) =>
                <LinkBox key={index.name} href={index.link}>
                    <Imgbox><img src={index.image} /></Imgbox>
                    <span>{index.name}</span>
                </LinkBox>
            )}
        </Container>
      </div>
      <Footer />
    </>
  );
}
