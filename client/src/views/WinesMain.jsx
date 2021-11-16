// import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import Swal from "sweetalert2";
import "antd/dist/antd.css";
import { Table } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "antd";
import { axiosWithoutToken, axiosWithToken } from "../helpers/axios";

export const WinesMain = () => {
  // const baseUrl = process.env.REACT_APP_API_URL;
  const [wines, setWines] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  const getWinesByUser = async () => {
    try {
      const winesData = await axiosWithToken(`wines/${user._id}`);
      // const winesData = await axios.get(`${baseUrl}/wines/${user._id}`);
      setWines(winesData.data);
      setLoaded(true);
      console.log("Data de los vinos por usuario", winesData.data);
    } catch (err) {
      console.log("Error al consultar todos los vinos x usuario", err);
    }
  };

  //Borrar un vino
  const deleteWine = async (wineId, wineBrand) => {
    try {
      await Swal.fire({
        title: `¿Seguro que quiere borrar el vino <strong>${wineBrand}</strong>?`,
        showDenyButton: true,
        denyButtonText: "Me arrepentí",
        confirmButtonText: "Borrar",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("¡Borrado!", "", "success");
          axiosWithToken(`wine/delete/${wineId}`, {}, "DELETE");
          // axios.delete(`${baseUrl}/wine/delete/${wineId}`);
          setWines(wines.filter((wine) => wine._id !== wineId));
        } else if (result.isDenied) {
          Swal.fire("No se borrará", "", "info");
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log("Usario del contexto", user);
    if (!user?._id) {
      history.push("/login");
    }
  }, [user, history]);

  useEffect(() => {
    getWinesByUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleLogOut = async () => {
    setUser(null);
    localStorage.clear();
    try {
      await axiosWithoutToken("auth/logout", {}, "POST");
      // await axios.post(`${baseUrl}/auth/logout`);
    } catch (err) {
      console.log("Error al hacer logout", err);
    }
  };

  //Definiendo las columnas de la tabla de Ant Design
  const columns = [
    {
      title: "Marca",
      dataIndex: "brand",
      filters: [
        {
          text: wines.map((wine) => wine.brand),
          value: wines.map((wine) => wine.brand),
        },
      ],
      onFilter: (value, record) => record.brand.indexOf(value) === 0,
      sorter: (a, b) => a.brand.length - b.brand.length,
      sortDirections: ["ascend", "descend", "ascend"],
    },
    {
      title: "Capacidad botella (ml)",
      dataIndex: "bottleCapacity",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.bottleCapacity - b.bottleCapacity,
    },
    {
      title: "Valle o lugar de origen",
      dataIndex: "origin",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.origin - b.origin,
    },
    {
      title: "Tipo de vino",
      dataIndex: "type",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.type - b.type,
    },
    {
      title: "Cepa",
      dataIndex: "variety",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.variety - b.variety,
    },
    {
      title: "Grado alcohólico",
      dataIndex: "alcoholicStrength",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.alcoholicStrength - b.alcoholicStrength,
    },
    {
      title: "Año de cosecha",
      dataIndex: "year",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.year - b.year,
    },
    {
      title: "Clasificación",
      dataIndex: "classification",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.classification - b.classification,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.rating - b.rating,
    },
    {
      title: "Precio",
      dataIndex: "price",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Acciones",
      dataIndex: "actions",
      render: () => {
        return wines.map((wine) => (
          <>
            <FontAwesomeIcon
              icon={faEdit}
              size="lg"
              className="text-success mx-2"
              onClick={() => history.push(`/vino/${wine._id}`)}
            />
            <FontAwesomeIcon
              className="text-danger mx-2 delete-pointer"
              icon={faTrashAlt}
              size="lg"
              onClick={() => {
                deleteWine(wine._id, wine.brand);
              }}
            />
          </>
        ));
      },
    },
  ];

  const tableOnChange = (pagination, filters, sorter) => {
    console.log("Table params", pagination, filters, sorter);
  };

  return (
    <Container className="my-3 mx-auto bg-light shadow rounded px-4">
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
            onClick={() => history.push("/nuevo-vino")}
          >
            Registrar un vino
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="text-center">Mis vinos</h2>
          {loaded && wines.length === 0 ? (
            <p className="text-center fs-4 wine-color">
              No hay vinos registrados. Anímese a registrar su primer vino 🍷👏🏼
            </p>
          ) : (
            <Table
              columns={columns}
              dataSource={wines}
              onChange={tableOnChange}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};
