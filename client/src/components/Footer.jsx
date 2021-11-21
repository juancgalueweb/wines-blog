import React from "react";
import { TwitterOutlined, MailOutlined } from "@ant-design/icons";

export const Footer = () => {
  return (
    <footer class="bg-dark pt-3 pb-2 text-white">
      <div class="container text-center text-md-start">
        <div class="row text-center text-md-start">
          <div class="col-md-3 mx-auto mt-3">
            <h4 class="mb-4 fw-bold text-warning text-uppercase">
              Mis vinos favoritos
            </h4>
            <p class="text-white">Espero disfruten la aplicación</p>
          </div>
          <div class="col-md-3 mx-auto mt-3">
            <h4 class="mb-4 fw-bold text-warning text-uppercase">Productos</h4>
            <p>
              <a href="/mis-vinos" class="text-decoration-none text-white">
                Mis vinos
              </a>
            </p>
            <p class="text-white">Próximante nuevas funciones...</p>
          </div>
          <div class="col-md-3 mx-auto mt-3">
            <h4 class="mb-4 fw-bold text-warning text-uppercase">Contáctame</h4>
            <p>
              <a
                href="mailto:juancgalue@icloud.com?subject=Comentario%20sobre%20la%20aplicación%20de%20registro%20de%20vinos"
                target="_blank"
                rel="noopener noreferrer"
                class="text-decoration-none text-white"
              >
                <MailOutlined className="text-warning fs-4 me-2" />
                Envíame un e-mail
              </a>
            </p>
            <p>
              <a
                href="https://twitter.com/juancgalue?lang=en"
                class="text-decoration-none text-white"
                target="_blank"
                rel="noreferrer"
              >
                <TwitterOutlined className="text-warning fs-4 me-2" />
                @juancgalue
              </a>
            </p>
            {/* <p>
              <a href="#formTag" class="text-decoration-none text-white">
                <i class="fab fa-wpforms text-warning me-2"></i>Send me a form
              </a>
            </p> */}
          </div>
        </div>
      </div>
    </footer>
  );
};
