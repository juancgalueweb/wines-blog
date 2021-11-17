import React, { useState, useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "antd";
import { useHistory, useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { WineForm } from "../components/WineForm";
import Swal from "sweetalert2";
import { axiosWithoutToken, axiosWithToken } from "../helpers/axios";

export const WinesContainer = () => {
  const startingData = {
    brand: "",
    type: "",
    variety: "",
    origin: "",
    bottleCapacity: "",
    alcoholicStrength: "",
    year: "",
    classification: "",
    rating: "",
    price: "",
    imageUrl: "",
  };

  const history = useHistory();
  const [loaded, setLoaded] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [initialData, setInitialData] = useState(startingData);
  const { id } = useParams();

  const getWineById = async () => {
    try {
      const wine = await axiosWithToken(`wine/${id}`);
      console.log("Data del vino de axios", wine.data);
      setInitialData(wine.data);
      setLoaded(true);
    } catch (err) {
      console.log("Error al obtener un vino por su ID", err);
    }
  };

  const newWine = async (values) => {
    try {
      await axiosWithToken("wine/new", { ...values, author: user._id }, "POST");
      Swal.fire({
        icon: "success",
        title: "Vino registrado con éxito",
        showConfirmButton: false,
        timer: 2000,
      });
      setTimeout(() => {
        history.push("/mis-vinos");
      }, 2100);
    } catch (err) {
      console.log(err.response.data.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response.data.message,
        confirmButtonText: "Aceptar",
      });
    }
  };

  const updateWine = async (values) => {
    try {
      const response = await axiosWithToken(`wine/${id}`, values, "PUT");
      console.log("Respuesta al actualizar vino", response);
      Swal.fire({
        icon: "success",
        title: "El vino fue modificado",
        showConfirmButton: false,
        timer: 2000,
      });
      setTimeout(() => {
        history.push("/mis-vinos");
      }, 2100);
    } catch (err) {
      console.log("Error al modificar el vino", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        await getWineById();
      } else {
        setLoaded(true);
      }
    };
    fetchData();
  }, [id]); //eslint-disable-line react-hooks/exhaustive-deps

  const handleLogOut = async () => {
    setUser(null);
    localStorage.clear();
    try {
      console.log("Sesión cerrada!");
      await axiosWithoutToken("auth/logout", {}, "POST");
    } catch (err) {
      console.log("Error al hacer logout", err);
    }
  };

  return (
    <Container className="m-3 w-75 mx-auto">
      <Row>
        <Col>
          <p className="text-end">Hola, {user?.fullName}</p>
          <Button
            type="primary"
            danger
            className="float-end"
            onClick={handleLogOut}
          >
            Cerrar sesión
          </Button>
          <br />
          <Button
            type="primary"
            className="d-block"
            onClick={() => history.push("/mis-vinos")}
          >
            Mis vinos
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          {loaded ? (
            <WineForm
              processSubmit={id !== undefined ? updateWine : newWine}
              initialValues={initialData}
              titleButton={id !== undefined ? "Actualizar" : "Crear"}
            />
          ) : (
            <h1>Cargando...</h1>
          )}
        </Col>
      </Row>
    </Container>
  );
};
