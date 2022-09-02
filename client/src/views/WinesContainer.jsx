import React, { useState, useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "antd";
import { useHistory, useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { WineForm } from "../components/WineForm";
import Swal from "sweetalert2";
import { axiosWithToken } from "../helpers/axios";

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
  const [s3ImageName, setS3ImageName] = useState("");

  const getWineById = async () => {
    try {
      const wine = await axiosWithToken(`wine/${id}`);
      console.log("Wine by ID before adding signed url", wine.data);
      // const imageSignedUrl = await axiosWithToken(
      //   `getFile/${wine.data.imageUrl}`
      // );
      // setInitialData({ ...wine.data, imageUrl: imageSignedUrl.data.imageUrl });
      setInitialData(wine.data);
      setLoaded(true);
    } catch (err) {
      console.log("Error al obtener un vino por su ID", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${err.response.data.message}`,
        confirmButtonText: "Aceptar",
      });
      if (err.response.status === 401) {
        Swal.fire({
          icon: "error",
          title: `${err.response.data.msg}`,
          showConfirmButton: false,
          timer: 2000,
        });
        setTimeout(() => {
          handleLogOut();
        }, 2100);
      }
    }
  };

  const newWine = async (values) => {
    try {
      const answer = await axiosWithToken(
        "wine/new",
        { ...values, author: user._id, imageUrl: s3ImageName },
        "POST"
      );
      Swal.fire({
        icon: "success",
        title: `${answer.data.msg}`,
        showConfirmButton: false,
        timer: 2000,
      });
      setTimeout(() => {
        history.push("/mis-vinos");
      }, 2100);
    } catch (err) {
      // console.log("Error", err.response);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${err.response.data.message}`,
        confirmButtonText: "Aceptar",
      });
      if (err.response.status === 401) {
        Swal.fire({
          icon: "error",
          title: `${err.response.data.msg}`,
          showConfirmButton: false,
          timer: 2000,
        });
        setTimeout(() => {
          handleLogOut();
        }, 2100);
      }
    }
  };

  const updateWine = async (values) => {
    console.log("Values adentro del updateWine: ", values);
    try {
      const answer = await axiosWithToken(`wine/${id}`, values, "PUT");
      // console.log("Respuesta al actualizar vino", response);
      Swal.fire({
        icon: "success",
        title: `${answer.data.msg}`,
        showConfirmButton: false,
        timer: 2000,
      });
      setTimeout(() => {
        history.push("/mis-vinos");
      }, 2100);
    } catch (err) {
      // console.log("Error al modificar el vino", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${err.response.data.message}`,
        confirmButtonText: "Aceptar",
      });
      if (err.response.status === 401) {
        Swal.fire({
          icon: "error",
          title: `${err.response.data.msg}`,
          showConfirmButton: false,
          timer: 2000,
        });
        setTimeout(() => {
          handleLogOut();
        }, 2100);
      }
    }
  };

  useEffect(() => {
    if (!user?._id) {
      history.push("/login");
    }
  }, [user, history]);

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

  const handleLogOut = () => {
    setUser(null);
    localStorage.clear();
    history.push("/login");
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
              getImgName={(s3ImageName) => setS3ImageName(s3ImageName)}
            />
          ) : (
            <h1>Cargando...</h1>
          )}
        </Col>
      </Row>
    </Container>
  );
};
