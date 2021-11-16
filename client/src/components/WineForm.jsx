/* eslint-disable no-template-curly-in-string */
import React, { useState } from "react";
import { Form, Select, InputNumber, Button, Upload, Rate, Input } from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};
const normFile = (e) => {
  console.log("Upload event:", e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const winesOptions = {
  rosado: [
    "Cabernet Sauvignon",
    "Grenache",
    "Sangiovese",
    "Syrah",
    "Pinot Noir",
    "Zinfadel",
    "Malbec",
    "Tempranillo",
    "Cariñena",
  ],
  tinto: [
    "Cabernet Sauvignon",
    "Carmenere",
    "Merlot",
    "Syrah",
    "Pinot Noir",
    "Malbec",
    "País",
    "Tempranillo",
    "Lambrusco",
    "Sangiovese",
    "Grenache",
    "Bonarda",
    "Nebbiolo",
    "Carignan",
  ],
};

export const WineForm = ({ processSubmit, initialValues, titleButton }) => {
  const [list, setList] = useState();
  // const [subList, setSubList] = useState();

  const handleChangeType = (value) => {
    setList(value);
    console.log(`Selected ${value}`);
  };

  // const handleChangeVariety = (value) => {
  //   setSubList(value);
  // };

  return (
    <Form
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
            message: "Por favor ingrese una marca de vino",
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
          <Option value="rosado">Rosado</Option>
          <Option value="tinto">Tinto</Option>
          <Option value="blanco">Blanco</Option>
          <Option value="espumante">Espumante</Option>
          <Option value="late-harvest">Late Harvest</Option>
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
        <Select
        // onChange={handleChangeVariety}
        >
          <Option value="">Seleccione una cepa de vino...</Option>
          {winesOptions[list]?.map((cepa, index) => (
            <Option key={index} value={cepa}>
              {cepa}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* <Form.Item
        name="select-multiple"
        label="Select[multiple]"
        rules={[
          {
            required: true,
            message: "Please select your favourite colors!",
            type: "array",
          },
        ]}
      >
        <Select mode="multiple" placeholder="Please select favourite colors">
          <Option value="red">Red</Option>
          <Option value="green">Green</Option>
          <Option value="blue">Blue</Option>
        </Select>
      </Form.Item> */}

      <Form.Item label="InputNumber">
        <Form.Item name="input-number" noStyle>
          <InputNumber min={1} max={10} />
        </Form.Item>
        <span className="ant-form-text"> machines</span>
      </Form.Item>
      <Form.Item name="rate" label="Rate">
        <Rate />
      </Form.Item>

      <Form.Item
        name="upload"
        label="Upload"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        extra="longgggggggggggggggggggggggggggggggggg"
      >
        <Upload name="logo" action="/upload.do" listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item label="Dragger">
        <Form.Item
          name="dragger"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          noStyle
        >
          <Upload.Dragger name="files" action="/upload.do">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload.
            </p>
          </Upload.Dragger>
        </Form.Item>
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
  );
};
