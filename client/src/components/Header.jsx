import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faRightToBracket,
  faWineGlass,
  faHouseChimney,
} from "@fortawesome/free-solid-svg-icons";
import { LoginContext } from "../contexts/LoginContext";

export const Header = () => {
  const navigate = useNavigate();
  const { setIsLogin } = useContext(LoginContext);

  const handleRegister = () => {
    setIsLogin(false);
    navigate("/register");
  };

  const handleLogin = () => {
    setIsLogin(true);
    navigate("/login");
  };

  return (
    <Navbar collapseOnSelect bg="light" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand id="brand-text">
          <img
            src="/filling-wine-glass.png"
            alt="Copa de vino"
            width="40"
            height="40"
            className="d-inline-block align-middle"
          />{" "}
          Mis vinos favoritos
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">
              <FontAwesomeIcon icon={faHouseChimney} className="me-2" />
              Home
            </Nav.Link>
            <Nav.Link href="/mis-vinos">
              <FontAwesomeIcon icon={faWineGlass} className="me-2" />
              Ver mis vinos
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={handleRegister} href="/register">
              <FontAwesomeIcon icon={faUserPlus} className="me-2" />
              Registro
            </Nav.Link>
            <Nav.Link onClick={handleLogin} href="/login">
              <FontAwesomeIcon icon={faRightToBracket} className="me-2" />
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
