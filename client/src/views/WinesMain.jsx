import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { Table, Image, Badge, Button, Rate, Modal } from "antd";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { axiosWithToken } from "../helpers/axios";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import noImage from "../images/no-image.png";
import { thousandSeparator } from "../helpers/thousandSeparator";
import { uniqueArrayData } from "../helpers/uniqueArrayData";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";

export const WinesMain = () => {
  const [wines, setWines] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const getWinesByUser = async () => {
    try {
      const winesData = await axiosWithToken(`wines/${user._id}`);
      const promises = winesData.data.map(async (row) => {
        let response;
        if (row.imageUrl !== "") {
          response = await axiosWithToken(`getFile/${row.imageUrl}`);
          return { ...row, imageUrl: response.data.imageUrl, key: uuidv4() };
        } else {
          return { ...row, key: uuidv4() };
        }
      });
      const result = await Promise.all(promises);
      setWines(result);
      setLoaded(true);
      setLoading(false);
    } catch (err) {
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
  };

  //Borrar un vino
  const deleteWine = (record) => {
    const executeDelete = async () => {
      try {
        await axiosWithToken(`wine/delete/${record._id}`, {}, "DELETE");
        setWines(wines.filter((wine) => wine._id !== record._id));
      } catch (err) {
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
    };

    Modal.confirm({
      title: `¿Seguero que quiere borrar el vino ${record.brand} ${record.type} ${record.variety}?`,
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        executeDelete();
      },
    });
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user) {
      getWinesByUser();
    } else {
      return;
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleLogOut = () => {
    setUser(null);
    localStorage.clear();
    navigate("/login");
  };

  const tableProps = { loading };

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
        return (
          <span style={{ textAlign: "center" }}>
            {record === "LateHarvest" ? "Late Harvest" : record}
          </span>
        );
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
      filters: uniqueArrayData(wines, "rating")
        .sort((a, b) => b - a)
        .map((rate) => ({
          text: <Rate allowHalf disabled defaultValue={rate} />,
          value: rate,
        })),
      onFilter: (value, record) =>
        record.rating.toString().indexOf(value.toString()) === 0,
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
              style={{ color: "#F18F01", marginLeft: 5, fontSize: 18 }}
              onClick={() => navigate(`/vino/${record._id}`)}
            />
            <DeleteOutlined
              style={{ color: "#E63F32", marginLeft: 16, fontSize: 18 }}
              onClick={() => {
                deleteWine(record);
              }}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <Container
        className="my-3 mx-auto shadow rounded px-4 py-3"
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
              onClick={() => navigate("/nuevo-vino")}
            >
              Registrar un vino
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2 className="text-center wine-color">Mis vinos</h2>
            {loaded && wines.length === 0 ? (
              <p className="text-center fs-4 wine-color">
                No hay vinos registrados. Anímese a registrar su primer vino
                🍷👏🏼
              </p>
            ) : (
              <>
                <div>
                  <p
                    className="nice-red-color"
                    style={{ display: "inline-block", marginRight: "7px" }}
                  >
                    Total de vinos registrados
                  </p>
                  <Badge count={wines.length} />
                </div>
                <Table
                  {...tableProps}
                  columns={columns}
                  dataSource={wines}
                  pagination={{
                    showSizeChanger: true,
                    current: page,
                    pageSize: pageSize,
                    onChange: (page, pageSize) => {
                      setPage(page);
                      setPageSize(pageSize);
                    },
                  }}
                />
              </>
            )}
          </Col>
        </Row>
      </Container>
      <br />
    </>
  );
};
