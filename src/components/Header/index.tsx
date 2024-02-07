/* eslint-disable @next/next/no-img-element */
import { LogoutButton } from "../logout";
import { Container, TextContainer } from "./style";

interface HeaderProps {
  pag: string;
}

export const Header: React.FC<HeaderProps> = ({ pag }) => {
    return (
        <Container>
            <img src="./logo_header.png" alt="logo_header" width={242} height={49} />
            <TextContainer>{pag}</TextContainer>
            <LogoutButton />
        </Container>
    );
};
