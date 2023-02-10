import { Col, Row } from 'antd'
import React, { useContext, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import { useLocation, useNavigate } from 'react-router-dom'
import { UserFormAntd } from '../components/UserFormAntd'
import { LoginContext } from '../contexts/LoginContext'
import { UserContext } from '../contexts/UserContext'

export const LoginRegisterScreen = () => {
  const { isLogin, setIsLogin } = useContext(LoginContext)
  const { user } = useContext(UserContext)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/mis-vinos')
    }
    location.pathname === '/register' ? setIsLogin(false) : setIsLogin(true)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container className='m-3 mx-auto'>
      <Row>
        <Col
          xs={22}
          xl={14}
          className='border rounded bg-light mx-auto pb-2 pt-4'
        >
          {isLogin ? (
            <h2 className='text-center'>Login</h2>
          ) : (
            <h2 className='text-center'>Registro</h2>
          )}
          <UserFormAntd
            isLogin={isLogin}
            titleSubmitButton={isLogin ? 'Login' : 'Registro'}
          />
        </Col>
      </Row>
    </Container>
  )
}
