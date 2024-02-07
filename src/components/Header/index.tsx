/* eslint-disable @next/next/no-img-element */
import { LogoutButton } from "../logout";
import { Container } from "./style";

export const Header = () => {
    return <>
        <Container>
            <img src="./logo_header.png" alt="logo_header" width={242} height={49} />
            <LogoutButton />
        </Container>
    </>
};