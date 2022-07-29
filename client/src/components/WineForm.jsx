import React, { useState, useEffect } from "react";
import { Form, Select, InputNumber, Button, Rate, Input, Row, Col } from "antd";
import { winesOptions } from "../data/winesOptions";

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

export const WineForm = ({ processSubmit, initialValues, titleButton }) => {
  const [list, setList] = useState("");
  const [subList, setSubList] = useState("");

  const [form] = Form.useForm();

  const handleChangeType = (value) => {
    setList(value);
    setSubList("");
    form.setFieldsValue({
      variety: "",
    });
    console.log(`Selected ${value}`);
  };

  const handleChangeVariety = (value) => {
    console.log("Valor variety", value);
    setSubList(value);
  };

  useEffect(() => {
    setList(initialValues.type);
    setSubList(initialValues.variety);
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Row>
      <Col
        span={14}
        className="border rounded mx-auto pb-2 pt-4 light-background my-4"
      >
        <Form
          form={form}
          name="validate_other"
          {...formItemLayout}
          onFinish={processSubmit}
          initialValues={initialValues}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Marca del vino"
            name="brand"
            rules={[
              {
                required: true,
                message: "Por favor, ingrese una marca de vino",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="type"
            label="Tipo de vino"
            rules={[
              {
                required: true,
                message: "Por favor, seleccione un tipo de vino",
              },
            ]}
          >
            <Select onChange={handleChangeType}>
              <Option value="">
                Seleccione un tipo de vino, ej: tinto, rosado, blanco...
              </Option>
              <Option value="Rosado">Rosado</Option>
              <Option value="Tinto">Tinto</Option>
              <Option value="Blanco">Blanco</Option>
              <Option value="Espumante">Espumante</Option>
              <Option value="LateHarvest">Late Harvest</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="variety"
            label="Tipo de cepa"
            rules={[
              {
                required: true,
                message: "Por favor, seleccione una cepa",
              },
            ]}
          >
            <Select onChange={handleChangeVariety} value={subList}>
              <Option value="">Seleccione una cepa de vino...</Option>
              {winesOptions[list]?.map((cepa, index) => (
                <Option key={index} value={cepa}>
                  {cepa}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Lugar de origen"
            name="origin"
            rules={[
              {
                required: true,
                message: "Por favor, ingrese el origen del vino",
              },
            ]}
          >
            <Input placeholder="Valle de Colchagua, Chile" />
          </Form.Item>

          <Form.Item label="Capacidad de la botella">
            <Form.Item
              name="bottleCapacity"
              noStyle
              rules={[
                {
                  type: "number",
                  required: true,
                  message: "Por favor, ingrese capacidad de la botella en ml",
                },
              ]}
            >
              <InputNumber min={180} max={16000} placeholder="750" />
            </Form.Item>
            <span className="ant-form-text"> ml</span>
          </Form.Item>

          <Form.Item label="Grados alcohólicos">
            <Form.Item
              name="alcoholicStrength"
              noStyle
              rules={[
                {
                  type: "number",
                  required: true,
                  message: "Por favor, ingrese los grados alcohólicos del vino",
                },
              ]}
            >
              <InputNumber min={0} max={45} placeholder="14.5" />
            </Form.Item>
            <span className="ant-form-text">°</span>
          </Form.Item>

          <Form.Item label="Año de la cosecha">
            <Form.Item
              name="year"
              rules={[
                {
                  type: "number",
                  required: true,
                  message: "Por favor, ingrese el año de la cosecha",
                },
              ]}
            >
              <InputNumber min={1950} max={2100} placeholder="2020" />
            </Form.Item>
          </Form.Item>

          <Form.Item
            label="Clasificación del vino"
            name="classification"
            rules={[
              {
                type: "string",
                required: true,
                message: "Por favor, ingrese la clasificación del vino",
              },
            ]}
          >
            <Input placeholder="Reserva, Gran Reserva, Single Block..." />
          </Form.Item>

          <Form.Item name="rating" label="Puntaje">
            <Rate allowHalf />
          </Form.Item>

          <Form.Item label="Precio">
            <Form.Item
              name="price"
              noStyle
              rules={[
                {
                  type: "number",
                  required: true,
                  message: "Por favor, ingrese el precio del vino",
                },
              ]}
            >
              <InputNumber
                min={1000}
                placeholder="4.990"
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                }
                parser={(value) => value.replace(/\./g, "")}
              />
            </Form.Item>
            <span className="ant-form-text">CLP$</span>
          </Form.Item>

          <Form.Item
            label="Img url del vino"
            name="imageUrl"
            rules={[
              {
                type: "url",
                message: "Por favor, ingrese una URL válida",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              span: 12,
              offset: 6,
            }}
          >
            <Button type="primary" htmlType="submit">
              {titleButton}
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};
