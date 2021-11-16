import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const UserForm = (props) => {
  const { isLogin, handleUserSubmit, titleSubmitButton } = props;

  const registerSchema = Yup.object().shape({
    fullName: Yup.string().min(5, "Mínimo 5 caracteres").required("Requerido"),
    email: Yup.string()
      .email("Formato de email inválido")
      .required("Requerido"),
    isAdult: Yup.boolean()
      .required("Requerido")
      .oneOf([true], "Debe tener 18 años o más para registrarse"),
    password: Yup.string().min(6, "Mínimo 6 caracteres").required("Requerido"),
    passwordConfirmation: Yup.string()
      .required("Requerido")
      .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir"),
  });

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Formato de email inválido")
      .required("Requerido"),
    password: Yup.string().min(6, "Mínimo 6 caracteres").required("Requerido"),
  });

  return (
    <>
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          isAdult: false,
          password: "",
          passwordConfirmation: "",
        }}
        validationSchema={isLogin ? loginSchema : registerSchema}
        onSubmit={handleUserSubmit}
      >
        {({
          errors,
          touched,
          values,
          handleChange,
          handleSubmit,
          getFieldProps,
          isValid,
          dirty,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            {!isLogin ? (
              <Form.Group className="mb-3" controlId="fullName">
                <Form.Label>
                  <span className="is-required">*</span> Nombre completo
                </Form.Label>
                <Form.Control
                  type="text"
                  name="fullName"
                  placeholder="Nombre completo"
                  value={values.fullName}
                  onChange={handleChange}
                  isValid={touched.fullName && !errors.fullName}
                  isInvalid={!!errors.fullName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.fullName}
                </Form.Control.Feedback>
              </Form.Group>
            ) : null}
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>
                <span className="is-required">*</span> Correo electrónico
              </Form.Label>
              <Form.Control
                type="string"
                name="email"
                placeholder="tu_correo@dominio.com"
                value={values.email}
                onChange={handleChange}
                isValid={touched.email && !errors.email}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            {!isLogin ? (
              <Form.Group className="mb-3" controlId="adultCheckbox">
                <Form.Label>
                  <span className="is-required">*</span> ¿Es mayor de edad?
                </Form.Label>
                <Form.Check
                  type="checkbox"
                  name="isAdult"
                  label="Marcar la casilla si es mayor de edad"
                  value={values.isAdult}
                  {...getFieldProps("isAdult")}
                  checked={getFieldProps("isAdult").value}
                  isValid={touched.isAdult && !errors.isAdult}
                  isInvalid={!!errors.isAdult}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.isAdult}
                </Form.Control.Feedback>
              </Form.Group>
            ) : null}
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>
                <span className="is-required">*</span> Contraseña
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                isValid={touched.password && !errors.password}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            {!isLogin ? (
              <Form.Group className="mb-3" controlId="passwordConfirm">
                <Form.Label>
                  <span className="is-required">*</span> Confirmar contraseña
                </Form.Label>
                <Form.Control
                  type="password"
                  name="passwordConfirmation"
                  value={values.passwordConfirmation}
                  onChange={handleChange}
                  isValid={
                    touched.passwordConfirmation && !errors.passwordConfirmation
                  }
                  isInvalid={!!errors.passwordConfirmation}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.passwordConfirmation}
                </Form.Control.Feedback>
              </Form.Group>
            ) : null}

            <Button
              variant="primary"
              type="submit"
              className="my-2"
              disabled={!(dirty && isValid)}
            >
              {titleSubmitButton}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};
