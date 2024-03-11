<script lang="ts">
  import "../../lib";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function setLocale(value) {
    localStorage.setItem("locale", value);
    sessionStorage.setItem("locale", value);
    localStorage.setItem("lng", value);
    sessionStorage.setItem("lng", value);

    dispatch("localeChanged", { value });
  }

  function clear() {
    localStorage.clear();
    sessionStorage.clear();
  }
</script>

<main>
  <!-- <h1>Hello World!</h1>
  <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p> -->

  <p class="container">
    <!-- <my-component></my-component> -->
    <button on:click={() => setLocale("es")}>Set Spanish Locale</button>
    <button on:click={() => setLocale("eu")}>Set EU Locale</button>
    <button on:click={() => localStorage.setItem("locale", "message")}>
      Set 'message'
    </button>
    <button on:click={() => clear()}> clear </button>
    <my-footer>
      <ul class="sedeMapaWeb" slot="enlaces">
        <li>
          <span>Conozca la sede</span>
          <ul>
            <li>
              <a
                href="https://www.desebizkaia.bfa/es/acerca-de-la-sede"
                target="_self">Acerca de la sede</a
              >
            </li>
            <li>
              <a
                href="https://www.desebizkaia.bfa/es/requisitos-tecnicos"
                target="_self">Requisitos técnicos</a
              >
            </li>
            <li>
              <a
                href="https://www.desebizkaia.bfa/es/medios-de-identificacion"
                target="_self">Medios de identificación y firma admitidos</a
              >
            </li>
            <li>
              <a href="https://www.desebizkaia.bfa/es/normativa" target="_self"
                >Normativa</a
              >
            </li>
            <li>
              <a
                href="https://www.desebizkaia.bfa/es/calendario-de-dias-inhabiles"
                target="_self">Calendario de días inhábiles</a
              >
            </li>
            <li>
              <a
                href="https://www.desebizkaia.bfa/es/fecha-y-hora-oficial"
                target="_self">Fecha y Hora oficial</a
              >
            </li>
            <li>
              <a
                href="https://www.desebizkaia.bfa/es/registro-apoderamientos"
                target="_self">Registro de apoderamientos</a
              >
            </li>
          </ul>
        </li>
        <li>
          <a
            href="https://desahtml.desebizkaia.bfa/es/catalogo-de-tramites-y-servicios"
            >Catálogo de trámites</a
          >
        </li>
        <li>
          <span>Mis gestiones</span>
          <ul>
            <li>
              <a
                href="https://desahtml.desebizkaia.bfa/es/mis-favoritos"
                target="_self">Mis favoritos</a
              >
            </li>
            <li>
              <a
                href="https://desahtml.desebizkaia.bfa/es/mis-expedientes"
                target="_self">Mis expedientes</a
              >
            </li>
            <li>
              <a
                href="https://desahtml.desebizkaia.bfa/es/mis-presentaciones"
                target="_self">Mis presentaciones</a
              >
            </li>
            <li>
              <a
                href="https://desahtml.desebizkaia.bfa/es/mis-borradores"
                target="_self">Mis borradores</a
              >
            </li>
            <li>
              <a
                href="https://desahtml.desebizkaia.bfa/es/mis-notificaciones"
                target="_self">Mis notificaciones y comunicaciones</a
              >
            </li>
            <li>
              <a
                href="https://desahtml.desebizkaia.bfa/es/representacion"
                target="_self">Registro de apoderamientos</a
              >
            </li>
            <li>
              <a
                href="http://desajboss.desebizkaia.bfa/sede-dipubiz/solicitante"
                target="_self">Mis licitaciones electrónicas</a
              >
            </li>
            <li>
              <a
                href="http://desajboss.desebizkaia.bfa/sede-dipubiz/solicitante"
                target="_self">Mis pedidos</a
              >
            </li>
            <li>
              <a
                href="https://desajboss.desebizkaia.bfa/JXSS001C/?procedimiento=2270&amp;formulario=4748&amp;idioma=C&amp;sede=S&amp;perfil=CI"
                target="_blank">Gestión del pago</a
              >
            </li>
          </ul>
        </li>
        <li>
          <span>Servicios</span>
          <ul>
            <li>
              <a
                href="https://www.desebizkaia.bfa/es/verificacion-de-los-certificados-de-la-sede"
                target="_self"
                >Verificación de los certificados de la sede electrónica</a
              >
            </li>
            <li>
              <a
                href="https://www.desebizkaia.bfa/es/verificacion-de-los-sellos-electronicos-de-la-sede"
                target="_self"
                >Verificación de los sellos electrónicos de la sede electrónica</a
              >
            </li>
            <li>
              <a
                href="https://desahtml.desebizkaia.bfa/es/verificacion-de-documentos"
                target="_self"
                >Verificación de documentos con localizador y sus firmas</a
              >
            </li>
            <li>
              <a
                href="https://www.desebizkaia.bfa/es/interoperabilidad"
                target="_self">Interoperabilidad</a
              >
            </li>
            <li>
              <a
                href="https://www.desebizkaia.bfa/es/firma-de-documentos-y-validar-firmas"
                target="_self">Firma de documentos y Validación de Firmas</a
              >
            </li>
            <li>
              <a
                href="http://apps.bizkaia.net/BT00/BAO_BOB?idi=es"
                target="_blank">Boletín Oficial Bizkaia</a
              >
            </li>
            <li>
              <a href="http://apps.bizkaia.net/CGFW/?idioma=ES" target="_self"
                >Facturación electrónica</a
              >
            </li>
            <li>
              <a
                href="https://www.bizkaia.eus/es/web/contratacion-publica/home"
                target="_self">Contratación Pública</a
              >
            </li>
          </ul>
        </li>
        <li>
          <a href="https://desahtml.desebizkaia.bfa/es/mis-avisos">Mis avisos</a
          >
        </li>
        <li>
          <span>Oficinas Virtuales</span>
          <ul>
            <li>
              <a
                href="https://apli.bizkaia.net/apps/seguru/lantrebanet/jqd1login.aspx?sdpto=10&amp;amp;lang=cas"
                target="_self">Infraestructuras y Desarrollo Territorial</a
              >
            </li>
          </ul>
        </li>
        <li>
          <a href="https://www.ebizkaia.eus/es/sistemas-de-firma-admitidos"
            >Sistema de Firma Admitidos</a
          >
        </li>
        <li>
          <a href="https://www.desebizkaia.bfa/es/-necesitas-ayuda-">Ayuda</a>
        </li>
      </ul>
    </my-footer>
    <!-- <section>
    <my-footer menus="{[ 'Home', 'About', 'Contact' ]}" language="es"></my-footer>
  </section> -->
  </p>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    font-size: 4em;
    line-height: 1.1;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }

    .container {
      display: inline-block;
      /* max-width: 320px; */
    }
  }
</style>
