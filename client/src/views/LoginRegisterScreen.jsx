import React, { useEffect, useContext } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { UserForm } from "../components/UserForm";
import { UserContext } from "../contexts/UserContext";
import { LoginContext } from "../contexts/LoginContext";
import Swal from "sweetalert2";
import { axiosWithoutToken } from "../helpers/axios";

const KEY = "wines-app";

export const LoginRegisterScreen = () => {
  const { isLogin, setIsLogin } = useContext(LoginContext);
  const { user, setUser } = useContext(UserContext);
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

  //Registro de usuario
  const registerUser = async (values, { resetForm }) => {
    try {
      const response = await axiosWithoutToken("auth/register", values, "POST");
      // const response = await axios.post(`${baseUrl}/auth/register`, values);
      console.log("Respuesta al registrar usuario", response);
      Swal.fire({
        icon: "success",
        title: `<strong>${values.fullName}</strong> se registró exitosamente. Por favor, inicie sesión`,
        showConfirmButton: true,
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          setIsLogin(true);
          history.push("/login");
        }
      });
      resetForm();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        html: `<ul class="swal-list">${err.response.data.map(
          (error) => `<li>${error}</li>`
        )}</ul>`,
        confirmButtonText: "Lo arreglaré!",
      });
    }
  };

  //Login de usuario
  const loginUser = async (values) => {
    try {
      const userData = await axiosWithoutToken("auth/login", values, "POST");
      // const userData = await axios.post(`${baseUrl}/auth/login`, values);
      console.log("User from axios", userData.data);
      setUser(userData.data);
      localStorage.setItem(KEY, JSON.stringify(userData.data));
      Swal.fire({
        icon: "success",
        title: "Inició de sesión exitosa!",
        showConfirmButton: false,
        timer: 2000,
      });
      setTimeout(() => {
        history.push("/mis-vinos");
      }, 2100);
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Oops... usario o contraseña incorrecta",
        confirmButtonText: "Lo revisaré!",
      });
    }
  };

  useEffect(() => {
    if (user) {
      history.push("/mis-vinos");
    }
    location.pathname === "/register" ? setIsLogin(false) : setIsLogin(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Container className="mx-auto my-2">
        <Row className="d-flex justify-content-center align-items-center">
          <Col className="col-5 bg-light shadow rounded">
            {isLogin ? (
              <h2 className="text-center">Login</h2>
            ) : (
              <h2 className="text-center">Registro</h2>
            )}
            <UserForm
              isLogin={isLogin}
              handleUserSubmit={isLogin ? loginUser : registerUser}
              titleSubmitButton={isLogin ? "Login" : "Registro"}
            />
            <Button variant="warning" onClick={handleOnClick} className="mb-3">
              Ir al {isLogin ? "registro" : "login"}
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
