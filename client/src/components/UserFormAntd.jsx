import React from "react";
import { Form, Row, Col, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

export const UserFormAntd = (props) => {
  const { isLogin, handleUserSubmit, titleSubmitButton } = props;

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const formItemLayout = {
    labelCol: {
      span: 10,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const [form] = Form.useForm();

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  return (
    <Row>
      <Col span={14} className="mx-auto pb-2 pt-4">
        <Form
          form={form}
          {...formItemLayout}
          onFinish={handleUserSubmit}
          initialValues={{
            fullName: "",
            email: "",
            password: "",
            passwordConfirmation: "",
            isAdult: false,
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
                { min: 5, message: "Mínimo 5 caracteres" },
              ]}
            >
              <Input placeholder="Nombre completo" />
            </Form.Item>
          ) : null}

          <Form.Item
            label="Correo electrónico"
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Por favor, ingrese un email válido",
              },
            ]}
          >
            {isLogin ? (
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="correo@dominio.com"
              />
            ) : (
              <Input placeholder="correo@dominio.com" />
            )}
          </Form.Item>

          <Form.Item
            label="Contraseña"
            name="password"
            rules={[
              {
                required: true,
                message: "Por favor, ingrese su contraseña",
              },
              { min: 5, message: "Mínimo 6 caracteres" },
            ]}
            hasFeedback
          >
            {isLogin ? (
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
              />
            ) : (
              <Input.Password />
            )}
          </Form.Item>

          {!isLogin ? (
            <Form.Item
              name="passwordConfirmation"
              label="Confirmar contraseña"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Por favor, confirme su contraseña",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error("Las contraseñas ingresadas no coinciden")
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          ) : null}

          {!isLogin ? (
            <>
              <Form.Item
                name="isAdult"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error("Debe ser mayor de edad para registrarse")
                          ),
                  },
                ]}
                {...tailFormItemLayout}
              >
                <Checkbox>Soy mayor de edad</Checkbox>
              </Form.Item>
            </>
          ) : null}

          <Button type="primary" htmlType="submit">
            {titleSubmitButton}
          </Button>
        </Form>
      </Col>
    </Row>
  );
};
