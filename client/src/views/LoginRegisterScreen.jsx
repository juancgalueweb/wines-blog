import React, { useEffect, useContext } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import Button from "react-bootstrap/Button";
// import { UserForm } from "../components/UserForm";
import { UserContext } from "../contexts/UserContext";
import { LoginContext } from "../contexts/LoginContext";
import { UserFormAntd } from "../components/UserFormAntd";
import { Row, Col, Button } from "antd";

export const LoginRegisterScreen = () => {
  const { isLogin, setIsLogin } = useContext(LoginContext);
  const { user } = useContext(UserContext);
  const location = useLocation();
  const history = useHistory();

  const handleOnClick = () => {
    if (isLogin) {
      setIsLogin(false);
      history.push("/register");
    } else {
      setIsLogin(true);
      history.push("/login");
    }
  };

  useEffect(() => {
    if (user) {
      history.push("/mis-vinos");
    }
    location.pathname === "/register" ? setIsLogin(false) : setIsLogin(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container className="m-3 w-75 mx-auto">
      <Row>
        <Col span={14} className="border rounded bg-light mx-auto pb-2 pt-4">
          {isLogin ? (
            <h2 className="text-center">Login</h2>
          ) : (
            <h2 className="text-center">Registro</h2>
          )}
          <UserFormAntd
            isLogin={isLogin}
            titleSubmitButton={isLogin ? "Login" : "Registro"}
          />
          <Button onClick={handleOnClick} className="styled-button">
            Ir al {isLogin ? "registro" : "login"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
