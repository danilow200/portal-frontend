/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { Container, NavA } from "./style";
import { Burger } from "./Burger";

const navlink = [
    {
        icon: "./nav/Increase.png",
        link: ".",
        name: "Dashboards",
    },
    {
        icon: "./nav/man.png",
        link: "./ticket",
        name: "Manutenção",
    },
    {
        icon: "./nav/List.png",
        link: ".",
        name: "Operacional",
    },
    {
        icon: "./nav/Warehouse.png",
        link: ".",
        name: "Patrimônio",
    },
    {
        icon: "./nav/Boxes.png",
        link: ".",
        name: "Inventário",
    },
    {
        icon: "./nav/Agreement.png",
        link: ".",
        name: "Contratos",
    },
    {
        icon: "./nav/Manual.png",
        link: ".",
        name: "Base Con.",
    },
    {
        icon: "./nav/Paper.png",
        link: ".",
        name: "NTPs",
    },
]

export const Navbar = () => {
    const [aberto, setAberto] = useState(false);

    return (
        <Container estado={aberto}>
            <NavA>
                <Burger open={aberto} setOpen={setAberto} />
                {/* <img style={{marginLeft: "4px", cursor: "pointer", pointerEvents: "all"}} src="./nav/ham.png" onClick={() => setAberto(!aberto)} /> */}
                <span style={{
                        textAlign: "center",
                        width: "100%",
                        opacity: aberto ? 1 : 0,
                        maxHeight: aberto ? "100px" : "0",
                        transition: "opacity 200ms ease-in-out, max-height 200ms ease-in-out"
                    }}>
                        GMP
                    </span>
            </NavA>
            
            <div style={{
                background: "#fff",
                width: aberto ? "300px" : "59px", 
                height: "1px",
                transition: "ease-in-out 200ms"
            }} />
            {navlink.map((index) => 
                <NavA key={index.name} href={index.link}>
                    <img src={index.icon} style={{pointerEvents: "all"}} />
                    <span style={{
                        opacity: aberto ? 1 : 0,
                        maxHeight: aberto ? "100px" : "0",
                        pointerEvents: aberto ? "all": "none" ,
                        transition: "opacity 200ms ease-in-out, max-height 200ms ease-in-out"
                    }}>
                        {index.name}
                    </span>
                </NavA>
            )}
        </Container>
    );
};
