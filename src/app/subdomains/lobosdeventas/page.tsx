'use client';

import React from 'react';
import './style.css';

export default function LobosDeVentasPage() {
  return (
    <div className="lobos-body-wrapper">
      <header>
        <div className="header-barContainer">
          <div className="header-bar">
            <p className="header-bar__left">PROGRAMA ONLINE</p>
            <p className="header-bar__right">LOBOS DE VENTAS</p>
          </div>
        </div>
        <div className="header-front">
          <p className="header-front__name">HUGO HERRERA</p>
          <h1 className="header-front__title">PROGRAMA LOBOS DE VENTAS</h1>
          <p className="header-front__description">
            Domina el arte de vender y deja de perder clientes que deberían ser tuyos
          </p>
          <a
            className="access-link"
            href="https://pay.hotmart.com/N90359648C?off=ikdtqoy6&checkoutMode=10"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="access-button" type="button">QUIERO VENDER MÁS</button>
          </a>
        </div>
      </header>

      <main>
        <section className="main-integralProgram">
          <h2 className="main-integralProgram__title">
            DEJA DE IMPROVISAR. APRENDE A VENDER{' '}
            <span className="blue-text">COMO UN PROFESIONAL</span>
          </h2>
          <p className="main-integralProgram__description">
            El sistema probado que ya utilizan los mejores equipos de ventas en
            Latinoamérica para convertir vendedores promedio en cerradores de
            alto rendimiento... en solo 30 días.
          </p>
          <p className="main-integralProgram__description">
            Más de 12 módulos prácticos donde Hugo Herrera se convierte en tu
            coach personal — disponible para ti las 24 horas, los 7 días de la semana.
          </p>
        </section>

        <section className="main-credibility">
          <div className="main-credibility__stats">
            <div className="main-credibility__stat">
              <p className="main-credibility__stat-number">+120</p>
              <p className="main-credibility__stat-label">Empresas capacitadas</p>
            </div>
            <div className="main-credibility__stat">
              <p className="main-credibility__stat-number">+180</p>
              <p className="main-credibility__stat-label">Reseñas en Google</p>
            </div>
            <div className="main-credibility__stat">
              <p className="main-credibility__stat-number">+6,500</p>
              <p className="main-credibility__stat-label">Asistentes a eventos</p>
            </div>
            <div className="main-credibility__stat">
              <p className="main-credibility__stat-number">+300K</p>
              <p className="main-credibility__stat-label">Comunidad en redes</p>
            </div>
          </div>
        </section>

        <section className="main-integralProgram">
          <h2 className="main-integralProgram__title">
            ESTO ES TODO LO QUE VAS A <span className="blue-text">DOMINAR</span>
          </h2>
          <picture>
            <source
              media="(min-width: 720px)"
              srcSet="/subdomains/lobosdeventas/src/img/modulos-desktop.jpg"
            />
            <img
              className="main-integralProgram__img"
              src="/subdomains/lobosdeventas/src/img/modulos-mobile.jpg"
              alt="Módulos del programa"
            />
          </picture>
          <a
            className="access-link"
            href="https://pay.hotmart.com/N90359648C?off=ikdtqoy6&checkoutMode=10"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="access-button" type="button">QUIERO VENDER MÁS</button>
          </a>
        </section>

        <section className="main-plus">
          <div className="main-plus__process">
            <p className="main-plus__process-title">
              Todo lo que necesitas para vender con confianza:
            </p>
            <div className="main-plus__process-itemsContainer">
              <div className="main-plus__process-item">
                <img
                  className="main-plus__process-item__img"
                  src="/subdomains/lobosdeventas/src/icons/pc-icon.png"
                  alt="ícono laptop"
                />
                <p className="main-plus__process-item__description">
                  <span className="blue-item">+350 Videos cortos</span> y prácticos
                  que puedes aplicar desde el día 1.
                </p>
              </div>
              <div className="main-plus__process-item">
                <img
                  className="main-plus__process-item__img"
                  src="/subdomains/lobosdeventas/src/icons/script-icon.png"
                  alt="ícono script"
                />
                <p className="main-plus__process-item__description">
                  <span className="blue-item">Scripts de ventas probados</span>, listos
                  para usar en tu negocio hoy mismo.
                </p>
              </div>
              <div className="main-plus__process-item">
                <img
                  className="main-plus__process-item__img"
                  src="/subdomains/lobosdeventas/src/icons/exercise-icon.png"
                  alt="ícono ejercicios"
                />
                <p className="main-plus__process-item__description">
                  <span className="blue-item">Ejercicios prácticos</span> para que
                  cada técnica se vuelva parte de ti.
                </p>
              </div>
              <div className="main-plus__process-item">
                <img
                  className="main-plus__process-item__img"
                  src="/subdomains/lobosdeventas/src/icons/access-icon.png"
                  alt="ícono acceso"
                />
                <p className="main-plus__process-item__description">
                  <span className="blue-item">Herramientas y recursos exclusivos</span>
                  que usan los vendedores top.
                </p>
              </div>
            </div>
            <div className="main-plus__process-space"></div>
          </div>
          <div className="main-plus__promise">
            <p className="main-plus__promise-title">Nuestra promesa para ti:</p>
            <p className="main-plus__promise-description">
              Si aplicas durante{' '}
              <span className="promise-description-bold">30 días</span> los ejercicios
              del programa en tu negocio, vas a cerrar más ventas. Así de simple.
            </p>
          </div>
        </section>

        <section className="main-why">
          <h2 className="main-why__title">
            ¿POR QUÉ ELEGIR <span className="blue-text">LOBOS DE VENTAS?</span>
          </h2>
          <p className="main-why__description">
            Porque te da las armas que necesitas para vender con seguridad,{' '}
            <span className="negrita">sin importar tu industria.</span> Esto es
            lo que vas a dominar:
          </p>
          <div className="main-why__itemsContainer">
            <div className="main-why__item">
              <img className="main-why__item-img" src="/subdomains/lobosdeventas/src/icons/check-icon.png" alt="Check icon" />
              <p className="main-why__item-description">
                Mentalidad ganadora y fundamentos que separan a los vendedores promedio de los profesionales
              </p>
            </div>
            <div className="main-why__item">
              <img className="main-why__item-img" src="/subdomains/lobosdeventas/src/icons/check-icon.png" alt="Check icon" />
              <p className="main-why__item-description">
                Embudos y procesos de ventas que funcionan en cualquier industria
              </p>
            </div>
            <div className="main-why__item">
              <img className="main-why__item-img" src="/subdomains/lobosdeventas/src/icons/check-icon.png" alt="Check icon" />
              <p className="main-why__item-description">
                8 métodos de prospección para que nunca te falten clientes
              </p>
            </div>
            <div className="main-why__item">
              <img className="main-why__item-img" src="/subdomains/lobosdeventas/src/icons/check-icon.png" alt="Check icon" />
              <p className="main-why__item-description">
                104 maneras de resolver objeciones — no te quedas sin respuesta nunca más
              </p>
            </div>
            <div className="main-why__item">
              <img className="main-why__item-img" src="/subdomains/lobosdeventas/src/icons/check-icon.png" alt="Check icon" />
              <p className="main-why__item-description">
                35 estrategias probadas para cerrar ventas con éxito
              </p>
            </div>
            <div className="main-why__item">
              <img className="main-why__item-img" src="/subdomains/lobosdeventas/src/icons/check-icon.png" alt="Check icon" />
              <p className="main-why__item-description">
                Domina todos los canales: WhatsApp, llamada, videollamada y presencial
              </p>
            </div>
            <div className="main-why__item">
              <img className="main-why__item-img" src="/subdomains/lobosdeventas/src/icons/check-icon.png" alt="Check icon" />
              <p className="main-why__item-description">
                Seguimiento estratégico para que ningún cliente se te escape
              </p>
            </div>
            <div className="main-why__item">
              <img className="main-why__item-img" src="/subdomains/lobosdeventas/src/icons/check-icon.png" alt="Check icon" />
              <p className="main-why__item-description">
                Oratoria, lenguaje corporal y habilidades sociales para generar confianza al instante
              </p>
            </div>
          </div>
          <div className="gift-bonus-card">
            <span className="gift-icon">🎁</span>
            <div className="gift-content">
              <strong>Además incluye talleres exclusivos grabados:</strong> Inteligencia Artificial para vender más, Ofertas Irresistibles (Método Hormozi), Principios de Persuasión, Marca Personal, +10 talleres de Emprendimiento y más.
            </div>
          </div>
          <p>
            Todo esto lo aprenderás con{' '}
            <span className="negrita">lecciones en video paso a paso</span>, un{' '}
            <span className="negrita">Taller de Bienvenida en vivo</span> donde{' '}
            crearemos juntos tu plan de acción personalizado, y{' '}
            <span className="negrita">acompañamiento continuo</span> por WhatsApp{' '}
            para que nunca te sientas solo en el proceso.
          </p>
          <p className="negrita main-why__ready">
            ¿Estás listo para dejar de perder ventas y empezar a cerrar como un profesional?
          </p>
          <a
            className="access-link"
            href="https://pay.hotmart.com/N90359648C?off=ikdtqoy6&checkoutMode=10"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="access-button" type="button">
              QUIERO EMPEZAR AHORA
            </button>
          </a>
        </section>

        <section className="main-access">
          <div className="main-accessContainer">
            <h2 className="main-access__title">
              ENTRENA DONDE QUIERAS,{' '}
              <span className="blue-text">CUANDO QUIERAS</span>
            </h2>
            <p className="main-access__description">
              Desde tu celular, tablet o computadora. En el bus, en tu oficina o
              antes de dormir. Hugo Herrera estará contigo al alcance de un clic,
              listo para convertirte en el vendedor que siempre quisiste ser.
            </p>
            <img
              className="main-access__img"
              src="/subdomains/lobosdeventas/src/img/programa.jpg"
              alt="Programa lobos de ventas"
            />
          </div>
        </section>

        <section className="main-testimonials">
          <h2 className="main-testimonials__title">RESULTADOS REALES DE NUESTROS <span className="blue-text">ALUMNOS</span></h2>
          <div className="main-testimonials__container">
            <div className="main-testimonials__item">
              <p className="main-testimonials__quote">&ldquo;Multipléqué por 6 mis resultados semanales. Lo vi en mi propia vendedora: aplicó el sistema y los resultados fueron inmediatos.&rdquo;</p>
              <p className="main-testimonials__author"><span className="negrita">Lenin Salvador</span> &mdash; CEO de Impulsa Inmobiliaria</p>
            </div>
            <div className="main-testimonials__item">
              <p className="main-testimonials__quote">&ldquo;Vendimos 8 lotes de terreno en un solo mes. Solo el módulo de oratoria disparó las ventas y nos llenó la cartera de reservas.&rdquo;</p>
              <p className="main-testimonials__author"><span className="negrita">Alex Gualpa</span> &mdash; Gerente Comercial de Tribu Real State</p>
            </div>
          </div>
          <a href="https://www.hugoherreracoach.com/casos-de-exito" target="_blank" rel="noopener noreferrer" style={{ color: '#579AFF', fontSize: '1.8rem', fontWeight: 600, padding: '12px 0' }}>Ver más casos de éxito →</a>
        </section>

        <section className="main-clients">
          <h2 className="main-clients__title">
            EMPRESAS QUE YA <span className="blue-text">CONFÍAN</span> EN LOBOS DE{' '}
            VENTAS
          </h2>
          <div>
            <img className="inclub" src="/subdomains/lobosdeventas/src/img/inclub.png" alt="Inclub" />
            <img className="mpc" src="/subdomains/lobosdeventas/src/img/mpc.png" alt="Municipalidad Provincial de Cajamarca" />
            <img className="belcan" src="/subdomains/lobosdeventas/src/img/belcan.png" alt="Belcan Inmobiliaria" />
            <img className="racser" src="/subdomains/lobosdeventas/src/img/racser.png" alt="Distribuidora y comercializadora Racser" />
            <img className="century-21" src="/subdomains/lobosdeventas/src/img/century-21.png" alt="Century 21" />
            <img className="ayni" src="/subdomains/lobosdeventas/src/img/ayni.png" alt="Ayni Financiera" />
            <img className="tribu-real-state" src="/subdomains/lobosdeventas/src/img/tribu-real-state.png" alt="Tribu Real State" />
            <img className="top-x" src="/subdomains/lobosdeventas/src/img/top-x.png" alt="Top X" />
          </div>
        </section>

        <section className="main-packs">
          <h2>
            ELIGE TU CAMINO PARA <span className="blue-text subrayado">VENDER MÁS</span>
          </h2>
          <div className="main-packs-individual">
            <h3 className="main-packs__title">INDIVIDUAL</h3>
            <p className="main-packs__price">297 USD</p>
            <p className="main-packs__students">1 Estudiante</p>
            <p className="main-packs__text">
              Para ti que vendes solo y quieres resultados rápidos:
            </p>
            <hr />
            <p className="main-packs__text">- Acceso completo a +350 lecciones en video</p>
            <hr />
            <p className="main-packs__text">
              - 🎁 BONUS: Taller de Bienvenida en vivo (valorizado en $250 USD)
            </p>
            <hr />
            <p className="main-packs__text">
              - Acompañamiento personalizado por WhatsApp (30 días)
            </p>
            <hr />
            <p className="main-packs__text">- Acceso a la comunidad privada de vendedores</p>
            <hr />
            <p className="main-packs__text">- Certificado digital</p>
            <hr />
            <p className="main-packs__text">- Actualizaciones gratuitas de por vida</p>
            <a
              className="access-link"
              href="https://pay.hotmart.com/N90359648C?off=ikdtqoy6&checkoutMode=10"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="access-button" type="button">
                QUIERO SER UN LOBO
              </button>
            </a>
            <div className="main-packs__cuotes">
              <img
                className="main-packs__cuotes-img"
                src="/subdomains/lobosdeventas/src/icons/cuotes-icon.png"
                alt="ícono cuotas"
              />
              <p className="main-packs__cuotes-text">Paga hasta en 3 cuotas</p>
            </div>
          </div>
          <div className="main-packs-teams">
            <h3 className="main-packs__title title-team">EQUIPOS Y NEGOCIOS</h3>
            <p className="main-packs__students students-team">Varios Estudiantes</p>
            <p className="main-packs__text text-team">
              Para líderes que quieren un equipo de ventas imparable:
            </p>
            <hr />
            <p className="main-packs__text text-team">
              - 🎁 Taller de Bienvenida estratégico con tu equipo (2 horas)
            </p>
            <hr />
            <p className="main-packs__text text-team">
              - Acceso completo a +350 lecciones para todo tu equipo
            </p>
            <hr />
            <p className="main-packs__text text-team">
              - Acompañamiento personalizado por WhatsApp (30 días)
            </p>
            <hr />
            <p className="main-packs__text text-team">- Acceso a la comunidad privada de vendedores</p>
            <hr />
            <p className="main-packs__text text-team">- Certificados digitales para cada miembro</p>
            <hr />
            <p className="main-packs__text text-team">
              - Actualizaciones gratuitas de por vida
            </p>
            <a className="access-link" href="https://wa.link/n1kicq" target="_blank" rel="noopener noreferrer">
              <button className="access-button" type="button">
                QUIERO CAPACITAR A MI EQUIPO
              </button>
            </a>
          </div>
        </section>
      </main>

      <footer>
        <img
          className="footer-img"
          src="/subdomains/lobosdeventas/src/img/logo-lobos-de-ventas.png"
          alt="Programa Lobos de Ventas"
        />
        <p className="footer-copyright">
          Copyright © 2026 Hugo Herrera. Todos los derechos reservados
        </p>
        <p className="footer-links">
          Hugo Herrera | Aviso Legal | Politica de Cookies
        </p>
      </footer>
    </div>
  );
}
