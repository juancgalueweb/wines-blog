import React, { useState, useEffect } from "react";
import {
  Form,
  Select,
  InputNumber,
  Button,
  Rate,
  Input,
  Row,
  Col,
  Upload,
  Alert,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { winesOptions } from "../data/winesOptions";
import { axiosWithTokenImageUpload } from "../helpers/axios";

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

export const WineForm = ({
  processSubmit,
  initialValues,
  titleButton,
  getImgName,
}) => {
  const [list, setList] = useState("");
  const [subList, setSubList] = useState("");
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [uploadResponseMsg, setUploadResponseMsg] = useState("");

  const [form] = Form.useForm();
  let uploadResponse;
  const handleChangeType = (value) => {
    setList(value);
    setSubList("");
    form.setFieldsValue({
      variety: "",
    });
    // console.log(`Selected ${value}`);
  };

  const handleChangeVariety = (value) => {
    // console.log("Valor variety", value);
    setSubList(value);
  };

  const getFile = (e) => {
    // console.log("Upload event: ", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e?.fileList;
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      fileList.forEach((file) => {
        formData.append("file", file);
      });
      setUploading(true);
      if (initialValues.brand === "") {
        uploadResponse = await axiosWithTokenImageUpload(
          "uploadSingleFile",
          formData,
          "POST"
        );
        getImgName(uploadResponse.data.imageName);
      } else {
        uploadResponse = await axiosWithTokenImageUpload(
          `updateSingleFile/${initialValues.imageUrl}`,
          formData,
          "POST"
        );
        getImgName(uploadResponse.data.imageName);
      }
      // console.log("Upload response: ", uploadResponse.data);
      setFileList([]);
      setUploaded(true);
      setUploadResponseMsg(uploadResponse.data.msg);
      setUploading(false);
    } catch (err) {
      setUploaded(false);
      setUploadResponseMsg(err.response.data.msg);
    }
  };

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    // fileList,
    // name: "file",
    headers: {
      authorization: "authorization-text",
    },
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

          <Form.Item
            name="rating"
            label="Puntaje"
            rules={[
              {
                required: true,
                message: "Debe indicar un puntaje",
              },
              {
                validator: (_, value) => {
                  if (value > 0) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("El puntaje no puede ser cero")
                  );
                },
              },
            ]}
          >
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
            // name="imageUrl"
            label="Subir foto"
            getValueFromEvent={getFile}
          >
            <Upload
              {...props}
              accept=".jpg, .png, .jpeg"
              maxCount={1}
              listType="picture"
              multiple={false}
            >
              <Button
                icon={<UploadOutlined />}
                disabled={fileList.length === 1 || uploaded}
              >
                Seleccione 1 foto
              </Button>
            </Upload>
            <Button
              type="secondary"
              onClick={handleUpload}
              disabled={fileList.length === 0}
              loading={uploading}
              style={{ marginTop: 16 }}
            >
              {uploading ? "Subiendo" : "Iniciar la subida"}
            </Button>
            {uploaded && (
              <Alert
                showIcon
                message={uploadResponseMsg}
                type="success"
                closable={false}
                style={{ marginTop: 15 }}
              ></Alert>
            )}
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
