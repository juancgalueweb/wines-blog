import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faSignInAlt,
  faWineGlassAlt,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import wineGlass from "../images/filling-wine-glass.png";
import { LoginContext } from "../contexts/LoginContext";

export const Header = () => {
  const history = useHistory();
  const { setIsLogin } = useContext(LoginContext);

  const handleRegister = () => {
    setIsLogin(false);
    history.push("/register");
  };

  const handleLogin = () => {
    setIsLogin(true);
    history.push("/login");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand id="brand-text">
          <img
            src={wineGlass}
            alt="Imagen de una copa de vino"
            width="40"
            height="40"
            className="d-inline-block align-middle"
          />{" "}
          Mis vinos favoritos
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => history.push("/home")}>
              <FontAwesomeIcon icon={faHome} className="me-2" />
              Home
            </Nav.Link>
            <Nav.Link onClick={() => history.push("/mis-vinos")}>
              <FontAwesomeIcon icon={faWineGlassAlt} className="me-2" />
              Ver mis vinos
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={handleRegister}>
              <FontAwesomeIcon icon={faUserPlus} className="me-2" />
              Registro
            </Nav.Link>
            <Nav.Link onClick={handleLogin}>
              <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
