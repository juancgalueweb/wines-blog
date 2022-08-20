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
  message,
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

// const onFinishFailed = (errorInfo) => {
//   console.log("Failed:", errorInfo);
// };

export const WineForm = ({ processSubmit, initialValues, titleButton }) => {
  const [list, setList] = useState("");
  const [subList, setSubList] = useState("");
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

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

  const getFile = (e) => {
    console.log("Upload event: ", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e?.fileList;
  };

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files[]", file);
    });
    setUploading(true);
    axiosWithTokenImageUpload("/image", formData, "POST")
      .then((res) => res.json())
      .then(() => {
        setFileList([]);
        message.success("Subida de data satisfactoria.");
      })
      .catch(() => {
        message.error("Subida fallida.");
      })
      .finally(() => {
        setUploading(false);
      });
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
    fileList,
    name: "file",
    // action: "https://localhost:8000/api/images",
    accept: ".jpg, .png, .jpeg",
    maxCount: 1,
    listType: "picture",
    // headers: {
    //   authorization: "authorization-text",
    // },

    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }

      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
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
          // onFinishFailed={onFinishFailed}
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
                  message: "Por favor, ingrese el precio del vino",
                },
                {
                  required: true,
                  message: "Debe indicar un precio",
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
            name="imageUrl"
            label="Subir foto"
            getValueFromEvent={getFile}
          >
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Selecciona foto</Button>
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
          </Form.Item>

          {/* <Form.Item
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
          </Form.Item> */}

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
