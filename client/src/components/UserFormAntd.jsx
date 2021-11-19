import React from "react";
import { Form, Row, Col, Input, Button } from "antd";

export const UserFormAntd = (props) => {
  const { isLogin, handleUserSubmit, titleSubmitButton } = props;

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row>
      <Col span={10} className="border rounded bg-light mx-auto pb-2 pt-4">
        <Form
          onFinish={handleUserSubmit}
          initialValues={{
            fullName: "",
            email: "",
            isAdult: false,
            password: "",
            passwordConfirmation: "",
          }}
          onFinishFailed={onFinishFailed}
        >
          {!isLogin ? (
            <Form.Item
              label="Nombre completo"
              name="fullName"
              rules={[
                {
                  type: "string",
                  required: true,
                  message: "Por favor, ingrese su nombre y apellido",
                },
              ]}
            >
              <Input />
            </Form.Item>
          ) : null}

          <Button type="primary" htmlType="submit">
            {titleSubmitButton}
          </Button>
        </Form>
      </Col>
    </Row>
  );
};
