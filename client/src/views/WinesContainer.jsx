import { Button, Spin } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { WineForm } from '../components/WineForm'
import { UserContext } from '../contexts/UserContext'
import { axiosWithToken } from '../helpers/axios'

export const WinesContainer = () => {
  const startingData = {
    brand: '',
    type: '',
    variety: '',
    origin: '',
    bottleCapacity: '',
    alcoholicStrength: '',
    year: '',
    classification: '',
    rating: '',
    price: '',
    imageUrl: '',
    imageOriginalName: ''
  }

  const navigate = useNavigate()
  const [loaded, setLoaded] = useState(false)
  const { user, setUser } = useContext(UserContext)
  const [initialData, setInitialData] = useState(startingData)
  const { id } = useParams()
  const [s3ImageName, setS3ImageName] = useState('')
  const [fileName, setFileName] = useState('')

  const getWineById = async () => {
    try {
      const wine = await axiosWithToken(`wine/${id}`)
      setInitialData(wine.data)
      setLoaded(true)
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `${err.response.data.message}`,
        confirmButtonText: 'Aceptar'
      })
      if (err.response.status === 401) {
        Swal.fire({
          icon: 'error',
          title: `${err.response.data.msg}`,
          showConfirmButton: false,
          timer: 2000
        })
        setTimeout(() => {
          handleLogOut()
        }, 2100)
      }
    }
  }

  const newWine = async values => {
    try {
      const answer = await axiosWithToken(
        'wine/new',
        {
          ...values,
          author: user._id,
          imageUrl: s3ImageName,
          imageOriginalName: fileName
        },
        'POST'
      )
      Swal.fire({
        icon: 'success',
        title: `${answer.data.msg}`,
        showConfirmButton: false,
        timer: 2000
      })
      setTimeout(() => {
        navigate('/mis-vinos')
      }, 2100)
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `${err.response.data.message}`,
        confirmButtonText: 'Aceptar'
      })
      if (err.response.status === 401) {
        Swal.fire({
          icon: 'error',
          title: `${err.response.data.msg}`,
          showConfirmButton: false,
          timer: 2000
        })
        setTimeout(() => {
          handleLogOut()
        }, 2100)
      }
    }
  }

  const updateWine = async values => {
    try {
      const updateAnswer = await axiosWithToken(
        `wine/${id}`,
        { ...values, imageUrl: s3ImageName, imageOriginalName: fileName },
        'PUT'
      )

      Swal.fire({
        icon: 'success',
        title: `${updateAnswer.data.msg}`,
        showConfirmButton: false,
        timer: 2000
      })
      setTimeout(() => {
        navigate('/mis-vinos')
      }, 2100)
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `${err.response.data.message}`,
        confirmButtonText: 'Aceptar'
      })
      if (err.response.status === 401) {
        Swal.fire({
          icon: 'error',
          title: `${err.response.data.msg}`,
          showConfirmButton: false,
          timer: 2000
        })
        setTimeout(() => {
          handleLogOut()
        }, 2100)
      }
    }
  }

  useEffect(() => {
    if (!user?._id) {
      navigate('/login')
    }
  }, [user, navigate])

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        await getWineById()
      } else {
        setLoaded(true)
      }
    }
    fetchData()
  }, [id]) //eslint-disable-line react-hooks/exhaustive-deps

  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
    navigate('/login')
  }

  return (
    <Container className='m-3 w-75 mx-auto'>
      <Row>
        <Col>
          <p className='text-end'>Hola, {user?.fullName}</p>
          <div className='d-flex justify-content-between'>
            <Button
              type='primary'
              className='d-block'
              onClick={() => navigate('/mis-vinos')}
            >
              Mis vinos
            </Button>
            <Button type='primary' danger onClick={handleLogOut}>
              Cerrar sesión
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          {loaded ? (
            <WineForm
              processSubmit={id !== undefined ? updateWine : newWine}
              initialValues={initialData}
              titleButton={id !== undefined ? 'Actualizar' : 'Crear'}
              getImgName={s3ImageName => setS3ImageName(s3ImageName)}
              getFileName={fileName => setFileName(fileName)}
            />
          ) : (
            <div className='spin-center'>
              <Spin size='large' />
            </div>
          )}
        </Col>
      </Row>
    </Container>
  )
}
