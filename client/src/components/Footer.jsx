import { MailOutlined, TwitterOutlined } from '@ant-design/icons'
import React from 'react'

export const Footer = () => {
  return (
    <footer className='bg-dark pt-3 pb-2 text-white'>
      <div className='container text-center text-md-start'>
        <div className='row text-center text-md-start'>
          <div className='col-md-3 mx-auto mt-3'>
            <h4 className='mb-4 fw-bold text-warning text-uppercase'>
              Mis vinos favoritos
            </h4>
            <p className='text-white'>Espero disfruten la aplicación</p>
          </div>
          <div className='col-md-3 mx-auto mt-3'>
            <h4 className='mb-4 fw-bold text-warning text-uppercase'>
              Productos
            </h4>
            <p>
              <a
                href='/mis-vinos'
                className='effect-underline text-decoration-none text-white '
              >
                Mis vinos
              </a>
            </p>
            <p className='text-white'>Próximante nuevas funciones...</p>
          </div>
          <div className='col-md-3 mx-auto mt-3'>
            <h4 className='mb-4 fw-bold text-warning text-uppercase'>
              Contáctame
            </h4>
            <p>
              <MailOutlined className='text-warning fs-4 me-2' />
              <a
                href='mailto:juancgalue@icloud.com?subject=Comentario%20sobre%20la%20aplicación%20de%20registro%20de%20vinos'
                target='_blank'
                rel='noopener noreferrer'
                className='effect-underline text-decoration-none text-white'
              >
                Envíame un e-mail
              </a>
            </p>
            <p>
              <TwitterOutlined className='text-warning fs-4 me-2' />
              <a
                href='https://twitter.com/juancgalue?lang=en'
                className='effect-underline text-decoration-none text-white'
                target='_blank'
                rel='noreferrer'
              >
                @juancgalue
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
