// import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import "antd/dist/antd.css";
import { Table, Modal, Image } from "antd";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Rate } from "antd";
import { axiosWithoutToken, axiosWithToken } from "../helpers/axios";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import noImage from "../images/no-image.png";

export const WinesMain = () => {
  const [wines, setWines] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const history = useHistory();

  const getWinesByUser = async () => {
    try {
      const winesData = await axiosWithToken(`wines/${user._id}`);
      const result = winesData.data.map((row) => ({ ...row, key: row._id }));
      setWines(result);
      setLoaded(true);
      console.log("Data de los vinos por usuario", winesData.data);
    } catch (err) {
      console.log("Error al consultar todos los vinos x usuario", err);
    }
  };

  //Borrar un vino
  const deleteWine = async (record) => {
    try {
      await Modal.confirm({
        title: `Seguero que quiere borrar el ${record.brand}`,
        okText: "Yes",
        okType: "danger",
        onOk: () => {
          axiosWithToken(`wine/delete/${record._id}`, {}, "DELETE");
          setWines(wines.filter((wine) => wine._id !== record._id));
        },
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
    } catch (err) {
      console.log("Error al hacer logout", err);
    }
  };

  //Función que recibe todos los vinos y devuelve un arreglo con los valores
  //únicos de lo que deseamos filtrar en las columnas de la tabla
  const uniqueArrayData = (array, fieldToFilter) => {
    const setValues = new Set(array.map((ele) => ele[fieldToFilter]));
    return Array.from(setValues);
  };

  const thousandSeparator = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  //Definiendo las columnas de la tabla de Ant Design
  const columns = [
    {
      key: "1",
      title: "Marca",
      dataIndex: "brand",
      filters: uniqueArrayData(wines, "brand").map((brand) => ({
        text: brand,
        value: brand,
      })),
      onFilter: (value, record) => record.brand.indexOf(value) === 0,
    },
    {
      key: "2",
      title: "Tipo",
      dataIndex: "type",
      filters: uniqueArrayData(wines, "type").map((wineType) => ({
        text: wineType,
        value: wineType,
      })),
      onFilter: (value, record) => record.type.indexOf(value) === 0,
      render: (record) => {
        return <p>{record === "LateHarvest" ? "Late Harvest" : record}</p>;
      },
    },
    {
      key: "3",
      title: "Cepa",
      dataIndex: "variety",
      filters: uniqueArrayData(wines, "variety").map((wineCepa) => ({
        text: wineCepa,
        value: wineCepa,
      })),
      onFilter: (value, record) => record.variety.indexOf(value) === 0,
    },
    {
      key: "4",
      title: "Origen",
      dataIndex: "origin",
      filters: uniqueArrayData(wines, "origin").map((origin) => ({
        text: origin,
        value: origin,
      })),
      onFilter: (value, record) => record.origin.indexOf(value) === 0,
    },
    {
      key: "5",
      title: "Botella (ml)",
      dataIndex: "bottleCapacity",
      sorter: (a, b) => a.bottleCapacity - b.bottleCapacity,
      render: (record) => {
        return (
          <span style={{ textAlign: "right", display: "block" }}>
            {thousandSeparator(record)}
          </span>
        );
      },
    },
    {
      key: "6",
      title: "alc.",
      dataIndex: "alcoholicStrength",
      sorter: (a, b) => a.alcoholicStrength - b.alcoholicStrength,
    },
    {
      key: "7",
      title: "Año",
      dataIndex: "year",
      sorter: (a, b) => a.year - b.year,
    },
    {
      key: "8",
      title: "Clasif.",
      dataIndex: "classification",
      filters: uniqueArrayData(wines, "classification").map((classif) => ({
        text: classif,
        value: classif,
      })),
      onFilter: (value, record) => record.classification.indexOf(value) === 0,
    },
    {
      key: "9",
      title: "Rating",
      dataIndex: "rating",
      width: "15%",
      align: "center",
      sorter: (a, b) => a.rating - b.rating,
      render: (record) => {
        return <Rate allowHalf disabled defaultValue={record} />;
      },
    },
    {
      key: "10",
      title: "Precio (CLP)",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      render: (record) => {
        return (
          <span style={{ textAlign: "right", display: "block" }}>
            {thousandSeparator(record)}
          </span>
        );
      },
    },
    {
      key: "11",
      title: "Img",
      dataIndex: "imageUrl",
      render: (record) => {
        return <Image width={30} src={!record ? noImage : record} />;
      },
    },
    {
      key: "12",
      title: "Acciones",
      render: (record) => {
        return (
          <>
            <EditOutlined
              style={{ color: "#F18F01" }}
              onClick={() => history.push(`/vino/${record._id}`)}
            />
            <DeleteOutlined
              style={{ color: "#E63F32", marginLeft: 6 }}
              onClick={() => {
                deleteWine(record);
              }}
            />
          </>
        );
      },
    },
  ];

  const tableOnChange = (pagination, filters, sorter) => {
    console.log("Table params", pagination, filters, sorter);
  };

  return (
    <Container
      className="my-3 mx-auto bg-light shadow rounded px-4"
      id="my-container"
    >
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
              pagination={{
                current: page,
                pageSize: pageSize,
                onChange: (page, pageSize) => {
                  setPage(page);
                  setPageSize(pageSize);
                },
              }}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};
