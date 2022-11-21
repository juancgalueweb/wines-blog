import React from "react";
import { Carousel } from "antd";
import { Card, Col, Row } from "antd";
import { Layout } from "antd";
import { Footer } from "../components/Footer";
import { v4 as uuidv4 } from "uuid";

const { Content } = Layout;

const images = [
  { imageUrl: "/carrusel1.jpeg", alt: "Carrusel uno" },
  { imageUrl: "/carrusel2.jpg", alt: "Carrusel dos" },
  { imageUrl: "/carrusel3.jpg", alt: "Carrusel tres" },
  { imageUrl: "/carrusel4.jpg", alt: "Carrusel cuatro" },
];

export const HomeScreen = () => {
  return (
    <>
      <Layout>
        <Content className="m-4">
          Si eres un amante del vino como yo, te invito a utilizar esta
          aplicación para que puedas tener un registro de tus vinos favoritos.
          Es muy sencillo utilizarla, solo tienes que registrarte, iniciar
          sesión y ya podrás añadir a una base de datos exclusiva para tí, los
          vinos que ya te tomaste o los que quieras experimentar. Y lo mejor de
          todo, <strong>es gratis.</strong>{" "}
        </Content>
      </Layout>
      <Carousel autoplay effect="fade" pauseOnHover={false}>
        {images.map((image) => (
          <div key={uuidv4()}>
            <img
              src={image.imageUrl}
              alt={image.alt}
              className="image-carousel"
            />
          </div>
        ))}
      </Carousel>
      <h1 className="text-dark text-center pt-3">Beneficios de tomar vino</h1>
      <div className="my-container">
        <Row gutter={16}>
          <Col xs={24} xl={8}>
            <Card
              title="Previene enfermedades cardíacas"
              headStyle={{ backgroundColor: "#fafafa" }}
              style={{ minHeight: "fit-content", marginTop: 10 }}
            >
              Las propiedades del vino tinto para el corazón son unas de las más
              estudiadas por la comunidad científica y extendidas por todo el
              mundo. Y no es para menos: aunque no sirve para curar enfermedades
              como tal, su alta concentración en polifenoles y vitamina E, sí
              ayudan a mantener la sangre y los vasos sanguíneos limpios; algo
              muy beneficioso para la salud cardíaca a largo plazo.
            </Card>
          </Col>
          <Col xs={24} xl={8}>
            <Card
              title="Ayuda a prevenir el colesterol"
              headStyle={{ backgroundColor: "#fafafa" }}
              style={{ minHeight: "fit-content", marginTop: 10 }}
            >
              Como ya hemos comentado, esta bebida es muy rica en polifenoles
              como el resveratrol: un componente con alta concentración de
              antioxidantes que evita la formación de coágulos y de
              lipoproteínas de baja densidad (LDL o "colesterol malo").
            </Card>
          </Col>
          <Col xs={24} xl={8}>
            <Card
              title="Aumenta los niveles de Omega 3"
              headStyle={{ backgroundColor: "#fafafa" }}
              style={{ minHeight: "fit-content", marginTop: 10 }}
            >
              Prestigiosos investigadores y universidades de todo el mundo están
              de acuerdo en que los consumidores habituales (y moderados) de
              vino presentan más concentración de ácidos grasos Omega 3 en
              sangre: un elemento imprescindible para el correcto funcionamiento
              del organismo.
            </Card>
          </Col>
        </Row>
      </div>
      <br />
      <Footer />
    </>
  );
};
