import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Col, Form, Input } from 'antd'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { LoginContext } from '../contexts/LoginContext'
import { UserContext } from '../contexts/UserContext'
import { axiosWithoutToken } from '../helpers/axios'

export const UserFormAntd = props => {
  const { titleSubmitButton } = props

  // const onFinishFailed = (errorInfo) => {
  //   console.log("Failed:", errorInfo);
  // };

  const formItemLayout = {
    labelCol: {
      span: 10
    },
    wrapperCol: {
      span: 16
    }
  }

  const [form] = Form.useForm()

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0
      },
      sm: {
        span: 16,
        offset: 8
      }
    }
  }

  //Apis de registrar y login
  const { isLogin, setIsLogin } = useContext(LoginContext)
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const KEY = 'wines-app'

  //Registro de usuario
  const registerUser = async values => {
    try {
      await axiosWithoutToken('auth/register', values, 'POST')
      // console.log("Respuesta al registrar usuario", response);
      Swal.fire({
        icon: 'success',
        title: `<strong>${values.fullName}</strong> se registró exitosamente. Por favor, inicie sesión`,
        showConfirmButton: true,
        confirmButtonText: 'Ok'
      }).then(result => {
        if (result.isConfirmed) {
          setIsLogin(true)
          navigate('/login')
        }
      })
      form.resetFields()
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        html: `<ul class="swal-list">${err.response.data.map(
          error => `<li>${error}</li>`
        )}</ul>`,
        confirmButtonText: 'Lo arreglaré!'
      })
    }
  }

  //Login de usuario
  const loginUser = async values => {
    try {
      const userData = await axiosWithoutToken('auth/login', values, 'POST')
      setUser(userData.data)
      // console.log("User from axios", userData.data);
      localStorage.setItem(KEY, JSON.stringify(userData.data))
      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesión exitoso!',
        showConfirmButton: false,
        timer: 2000
      })
      setTimeout(() => {
        navigate('/mis-vinos')
      }, 2100)
    } catch (err) {
      // console.log(err);
      Swal.fire({
        icon: 'error',
        title: `${err.response.data.msg}`,
        confirmButtonText: 'Lo revisaré!'
      })
    }
  }

  const handleOnClick = () => {
    if (isLogin) {
      setIsLogin(false)
      navigate('/register')
    } else {
      setIsLogin(true)
      navigate('/login')
    }
  }

  return (
    <Col span={14} className='mx-auto pb-2 pt-4'>
      <Form
        form={form}
        {...formItemLayout}
        onFinish={isLogin ? loginUser : registerUser}
        initialValues={{
          fullName: '',
          email: '',
          password: '',
          passwordConfirmation: '',
          isAdult: false
        }}
        // onFinishFailed={onFinishFailed}
      >
        {!isLogin ? (
          <Form.Item
            label='Nombre completo'
            name='fullName'
            rules={[
              {
                type: 'string',
                required: true,
                message: 'Por favor, ingrese su nombre y apellido'
              },
              { min: 5, message: 'Mínimo 5 caracteres' }
            ]}
          >
            <Input placeholder='Nombre completo' />
          </Form.Item>
        ) : null}

        <Form.Item
          label='Correo electrónico'
          name='email'
          rules={[
            {
              type: 'email',
              required: true,
              message: 'Por favor, ingrese un email válido'
            }
          ]}
        >
          {isLogin ? (
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='correo@dominio.com'
            />
          ) : (
            <Input placeholder='correo@dominio.com' />
          )}
        </Form.Item>

        <Form.Item
          label='Contraseña'
          name='password'
          rules={[
            {
              required: true,
              message: 'Por favor, ingrese su contraseña'
            },
            { min: 6, message: 'Mínimo 6 caracteres' }
          ]}
          hasFeedback
        >
          {isLogin ? (
            <Input.Password
              prefix={<LockOutlined className='site-form-item-icon' />}
            />
          ) : (
            <Input.Password />
          )}
        </Form.Item>

        {!isLogin ? (
          <Form.Item
            name='passwordConfirmation'
            label='Confirmar contraseña'
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Por favor, confirme su contraseña'
              },
              ({ getFieldValue }) => ({
                validator (_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }

                  return Promise.reject(
                    new Error('Las contraseñas ingresadas no coinciden')
                  )
                }
              })
            ]}
          >
            <Input.Password />
          </Form.Item>
        ) : null}

        {!isLogin ? (
          <>
            <Form.Item
              name='isAdult'
              valuePropName='checked'
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error('Debe ser mayor de edad para registrarse')
                        )
                }
              ]}
              {...tailFormItemLayout}
            >
              <Checkbox>Soy mayor de edad</Checkbox>
            </Form.Item>
          </>
        ) : null}
        <div className='d-flex justify-content-between align-items-center'>
          <Button type='primary' htmlType='submit'>
            {titleSubmitButton}
          </Button>
          <Button onClick={handleOnClick}>
            Ir al {isLogin ? 'registro' : 'login'}
          </Button>
        </div>
      </Form>
    </Col>
  )
}
