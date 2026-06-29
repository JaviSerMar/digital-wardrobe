import DocumentHeader from "./DocumentHeader";

function DocumentWindow({
  window,
  closeWindow,
  onOpenImageViewer,
}) {
  const velarisGalleryImages = [
    {
      src: "/projects/velaris/foto1Velaris.png",
      alt: "Robot Velaris en entorno simulado",
    },
    {
      src: "/projects/velaris/foto2Velaris.png",
      alt: "Vista del almacén simulado de Velaris",
    },
    {
      src: "/projects/velaris/foto3Velaris.png",
      alt: "Mapa de navegación de Velaris",
    },
    {
      src: "/projects/velaris/foto4Velaris.png",
      alt: "Detección visual en Velaris",
    },
    {
      src: "/projects/velaris/foto5Velaris.png",
      alt: "Logo de Velaris",
    },
  ];

  const opencvGalleryImages = [
    {
      src: "/projects/velaris/openCV1.png",
      alt: "Pipeline de visión OpenCV con puerta abierta detectada",
    },
    {
      src: "/projects/velaris/openCV2.png",
      alt: "Pipeline de visión OpenCV con puerta cerrada sin alertas",
    },
  ];

  const architectureGalleryImages = [
    {
      src: "/projects/velaris/arquitecturaVelaris.png",
      alt: "Arquitectura del sistema Velaris",
    },
  ];

  const airMonitorOverviewImages = [
    {
      src: "/projects/airmonitor/airmonitor1.png",
      alt: "Dispositivo AirMonitor instalado en una mochila",
    },
    {
      src: "/projects/airmonitor/airmonitor2.png",
      alt: "Identidad visual del proyecto AirMonitor",
    },
    {
      src: "/projects/airmonitor/airmonitor3.png",
      alt: "Mapa de calor de mediciones ambientales de AirMonitor",
    },
  ];

  const airMonitorSensorImages = [
    {
      src: "/projects/airmonitor/sensor1.png",
      alt: "Sensor de ozono de AirMonitor",
    },
    {
      src: "/projects/airmonitor/sensor2.png",
      alt: "Sensor de temperatura de AirMonitor",
    },
    {
      src: "/projects/airmonitor/sensor3.png",
      alt: "Placa BLE de AirMonitor",
    },
    {
      src: "/projects/airmonitor/sensor4.png",
      alt: "Batería LiPo de AirMonitor",
    },
    {
      src: "/projects/airmonitor/sensor5.png",
      alt: "Montaje ensamblado de AirMonitor",
    },
    {
      src: "/projects/airmonitor/sensor6.png",
      alt: "Unidad compacta de AirMonitor",
    },
    {
      src: "/projects/airmonitor/sensor7.png",
      alt: "Concepto de carcasa de AirMonitor",
    },
    {
      src: "/projects/airmonitor/sensor8.png",
      alt: "Vista explotada de AirMonitor",
    },
  ];

  const airMonitorBeaconImages = [
    {
      src: "/projects/airmonitor/beacon1.png",
      alt: "Dispositivo AirMonitor publicando lecturas mediante Bluetooth",
    },
    {
      src: "/projects/airmonitor/beacon2.png",
      alt: "Aplicación Android detectando el beacon de AirMonitor",
    },
    {
      src: "/projects/airmonitor/beacon3.png",
      alt: "Escaneo de dispositivos BLE desde la aplicación AirMonitor",
    },
    {
      src: "/projects/airmonitor/beacon4.png",
      alt: "AirMonitor conectado con la aplicación móvil",
    },
  ];

  const airMonitorBackendImages = [
    {
      src: "/projects/airmonitor/backend1.png",
      alt: "Arquitectura del backend de AirMonitor",
    },
    {
      src: "/projects/airmonitor/backend2.png",
      alt: "Panel de administración del backend de AirMonitor",
    },
    {
      src: "/projects/airmonitor/backend3.png",
      alt: "API REST, PostgreSQL y Docker Compose de AirMonitor",
    },
  ];

  const airMonitorBackendEndpoints = [
    {
      method: "GET",
      path: "/latest",
    },
    {
      method: "POST",
      path: "/measurements",
    },
    {
      method: "POST",
      path: "/users",
    },
    {
      method: "DELETE",
      path: "/users/:id/measurements",
    },
  ];

  return (
    <div className="document-window-content">
      <DocumentHeader
        title={window.title}
        onClose={() => closeWindow(window.id)}
        toolbarSrc={window.toolbarSrc}
        titleIconSrc={window.titleIconSrc}
        isImageFile={window.fileType === "image"}
        isSmallImageHeader={
          window.fileType === "image" &&
          window.toolbarSrc === "/images/cabeceraImagenMini.png"
        }
        isDesktopPhoto={
          window.id === "desktop-photo-window"
        }
        isArchitectureImage={
          window.id === "velaris-architecture-window" ||
          window.id === "airmonitor-architecture-window"
        }
        isTeamImage={
          window.id === "equipo-image-window"
        }
        isManifestoImage={
          window.id === "velaris-manifesto-window"
        }
      />

      <div
        className={`document-body ${
          window.id === "skills-file-window" ||
          window.id === "velaris-readme-window" ||
          window.id === "velaris-info-window" ||
          window.id === "velaris-stack-window" ||
          window.id === "airmonitor-stack-window" ||
          window.id === "velaris-database-window" ||
          window.id === "velaris-opencv-info-window" ||
          window.id === "airmonitor-readme-window" ||
          window.id === "airmonitor-info-window" ||
          window.id === "airmonitor-sensors-window" ||
          window.id === "airmonitor-beacon-window" ||
          window.id === "airmonitor-backend-window" ||
          window.id === "actualmente-file-window" ||
          window.id === "aprendizaje-file-window" ||
          window.id === "workflow-file-window" ||
          window.id === "email-file-window" ||
          window.fileType === "image"
            ? "document-body-no-scroll"
            : ""
        } ${
          window.id === "velaris-info-window"
            ? "velaris-info-body"
            : ""
        } ${
          window.id === "velaris-database-window" ||
          window.id === "velaris-opencv-info-window"
            ? "velaris-detail-body"
            : ""
        } ${
          window.id === "airmonitor-readme-window"
            ? "airmonitor-readme-body"
            : ""
        } ${
          window.id === "airmonitor-info-window"
            ? "airmonitor-info-body"
            : ""
        } ${
          window.id === "airmonitor-sensors-window"
            ? "airmonitor-sensors-body"
            : ""
        } ${
          window.id === "airmonitor-beacon-window"
            ? "airmonitor-beacon-body"
            : ""
        } ${
          window.id === "airmonitor-backend-window"
            ? "airmonitor-backend-body"
            : ""
        } ${
          window.id === "airmonitor-architecture-window"
            ? "airmonitor-architecture-body"
            : ""
        } ${
          window.fileType === "image"
            ? "image-document-body"
            : ""
        }`}
      >
        {window.id === "skills-file-window" && (
          <pre className="document-code-text">{`              { skills }
                  ├── web / backend
                  │   ├── React
                  │   ├── Node.js
                  │   ├── API REST
                  │   └── WebSocket
                  │
                  ├── IA / robótica
                  │   ├── ROS2
                  │   ├── Nav2
                  │   └── OpenCV
                  │
                  ├── datos / cloud
                  │   ├── PostgreSQL
                  │   ├── Firebase
                  │   └── AWS
                  │
                  ├── lenguajes
                  │   ├── Python
                  │   ├── Java
                  │   ├── C++
                  │   └── JavaScript
                  │
                  └── tools
                      ├── Docker
                      ├── Git
                      ├── Linux
                      └── Figma`}</pre>
        )}

        {window.id === "about-window" && (
          <p>Contenido provisional del documento.</p>
        )}

        {window.id === "email-file-window" && (
          <div className="email-document-content">
            <h2>CONTACTO</h2>

            <p className="email-document-text">
              Puedes contactar conmigo en:
            </p>

            <p
              className="email-document-address"
              onPointerDown={(event) => {
                event.stopPropagation();
              }}
            >
              javiersemarco@gmail.com
            </p>
          </div>
        )}

        {window.fileType === "image" &&
          (window.id === "velaris-architecture-window" ? (
            <button
              className="image-file-viewer image-file-viewer-zoomable"
              type="button"
              onPointerDown={(event) => {
                event.stopPropagation();
              }}
              onClick={() => {
                onOpenImageViewer(
                  architectureGalleryImages,
                  0
                );
              }}
              aria-label="Ampliar arquitectura de Velaris"
            >
              <img
                className="image-file-preview"
                src={window.imageSrc}
                alt={window.title}
                draggable="false"
              />
            </button>
          ) : (
            <div className="image-file-viewer">
              <img
                className="image-file-preview"
                src={window.imageSrc}
                alt={window.title}
                draggable="false"
              />
            </div>
          ))}

        {window.id === "velaris-readme-window" && (
          <article className="velaris-readme-content">
            <section className="velaris-gallery-grid">
              {velarisGalleryImages.map((image, index) => (
                <button
                  className={`velaris-gallery-item velaris-gallery-item-${
                    index + 1
                  }`}
                  type="button"
                  key={image.src}
                  onPointerDown={(event) => {
                    event.stopPropagation();
                  }}
                  onClick={() => {
                    onOpenImageViewer(
                      velarisGalleryImages,
                      index
                    );
                  }}
                  aria-label={`Ampliar imagen ${
                    index + 1
                  } de Velaris`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    draggable="false"
                  />
                </button>
              ))}
            </section>

            <div className="document-readme-text">
              <p>
                <strong>Velaris</strong> combina robótica,
                simulación, visión artificial y desarrollo
                web en un sistema capaz de patrullar un
                espacio, mostrar información en tiempo real
                y ser controlado desde una interfaz web. El
                robot funciona en un almacén simulado con{" "}
                <strong>Gazebo</strong>.{" "}
                <strong>ROS2</strong> coordina el sistema y{" "}
                <strong>Nav2</strong> permite la navegación
                autónoma por el mapa. Desde la web se puede
                ver la cámara, consultar el mapa, revisar el
                estado del robot, iniciar patrullas y enviar
                comandos de movimiento. También incorpora{" "}
                <strong>OpenCV</strong> para capturar y
                procesar imágenes durante las patrullas,
                preparando la base para futuras detecciones
                mediante inteligencia artificial.
              </p>

              <p className="document-readme-stack">
                <strong>
                  Python · ROS2 · Nav2 · Gazebo · RViz ·
                  OpenCV · Vite · WebSocket · AWS Cloud
                </strong>
              </p>
            </div>
          </article>
        )}

        {window.id === "velaris-info-window" && (
          <article className="velaris-info-content">
            <div className="velaris-info-image-wrapper">
              <img
                className="velaris-info-image"
                src="/projects/velaris/velarisReadme.png"
                alt="Robot Velaris patrullando un almacén"
                draggable="false"
              />
            </div>

            <div className="velaris-info-text">
              <p>
                VELARIS surgió para integrar distintas áreas del
                grado en un único sistema. El desarrollo avanzó
                desde la simulación y el movimiento básico del robot
                hasta la navegación autónoma, la conexión con la
                interfaz web, la captura de imágenes y la detección
                de puertas. El resultado fue un sistema coordinado
                capaz de patrullar y centralizar la supervisión del
                entorno.
              </p>

              <p>
                El principal reto fue integrar la simulación, la
                navegación, la cámara y la web para que funcionaran
                de forma coordinada. El resultado es un prototipo
                ampliable que permite controlar patrullas, seguir al
                robot y consultar las incidencias desde una única
                interfaz.
              </p>
            </div>
          </article>
        )}

        {window.id === "velaris-stack-window" && (
          <pre className="document-code-text velaris-stack-text">{`      [ROBÓTICA]
        - Python
        - ROS2
        - Nav2
        - rosbridge_server
        - ros_gz_bridge

      [SIMULACIÓN]
        - Gazebo
        - RViz
        - TurtleBot3
        - Entorno de almacén

      [PANEL WEB]
        - React
        - Vite
        - WebSocket
        - HTML / CSS / JavaScript

      [VISIÓN ARTIFICIAL]
        - OpenCV
        - Cámara en tiempo real
        - Capturas procesadas

      [CLOUD + AI]
        - AWS Cloud
        - Preparación de dataset
        - Modelos de detección`}</pre>
        )}

        {window.id === "airmonitor-stack-window" && (
          <pre className="document-code-text airmonitor-stack-text">{`      [SENSORES Y SISTEMA EMBEBIDO]
          - C++
          - Arduino
          - Sensor electroquímico de ozono
          - Sensor de temperatura
          - Lectura de señales analógicas
          - Calibración de mediciones

      [COMUNICACIÓN]
          - Bluetooth Low Energy
          - iBeacon
          - Tramas de datos
          - Identificación mediante UUID

      [APLICACIÓN ANDROID]
          - Java
          - Android Studio
          - Escaneo de dispositivos BLE
          - Retrofit
          - Gson

      [BACKEND Y DATOS]
          - Node.js
          - Express
          - API REST
          - PostgreSQL
          - Docker
          - Docker Compose

      [INTERFAZ WEB]
          - HTML
          - CSS
          - JavaScript
          - Consulta de mediciones mediante API`}</pre>
        )}

        {window.id === "velaris-database-window" && (
          <article className="velaris-detail-content">
            <div className="velaris-detail-image-wrapper">
              <img
                className="velaris-detail-image"
                src="/projects/velaris/baseDeDatosRobotica.png"
                alt="Diagrama de base de datos de Velaris"
                draggable="false"
              />
            </div>

            <div className="velaris-detail-text">
              <p>
                La base de datos se diseñó para centralizar
                la información generada por el sistema. Su
                estructura relaciona los usuarios con los
                robots y permite almacenar patrullas,
                horarios, puntos de recorrido, conexiones
                con ROS, detecciones y alertas.
              </p>

              <p>
                Este modelo permite conservar el historial
                de actividad del robot y relacionar cada
                incidencia con su patrulla, posición y
                momento de detección. De esta forma, la
                interfaz puede consultar la información
                necesaria para mostrar el estado del sistema
                y revisar los eventos registrados durante la
                vigilancia.
              </p>
            </div>
          </article>
        )}

        {window.id === "velaris-opencv-info-window" && (
          <article className="velaris-detail-content velaris-opencv-content">
            <section className="velaris-opencv-gallery">
              {opencvGalleryImages.map((image, index) => (
                <button
                  className="velaris-opencv-gallery-item"
                  type="button"
                  key={image.src}
                  onPointerDown={(event) => {
                    event.stopPropagation();
                  }}
                  onClick={() => {
                    onOpenImageViewer(
                      opencvGalleryImages,
                      index
                    );
                  }}
                  aria-label={`Ampliar imagen ${
                    index + 1
                  } de OpenCV`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    draggable="false"
                  />
                </button>
              ))}
            </section>

            <div className="velaris-detail-text">
              <p>
                OpenCV se utilizó para capturar y procesar
                las imágenes obtenidas durante las
                patrullas. A partir de la imagen original
                se generaron distintas versiones
                procesadas, como escala de grises y
                detección de bordes, que facilitaron el
                análisis visual del entorno.
              </p>

              <p>
                Este procesamiento sirvió como base para
                detectar puertas y registrar posibles
                incidencias. Las capturas podían
                consultarse desde el panel web, conectando
                la visión artificial con el sistema de
                supervisión de VELARIS.
              </p>
            </div>
          </article>
        )}

        {window.id === "airmonitor-readme-window" && (
          <article className="airmonitor-readme-content">
            <section className="airmonitor-readme-gallery">
              {airMonitorOverviewImages.map((image, index) => (
                <button
                  className="airmonitor-readme-gallery-item"
                  type="button"
                  key={image.src}
                  onPointerDown={(event) => {
                    event.stopPropagation();
                  }}
                  onClick={() => {
                    onOpenImageViewer(
                      airMonitorOverviewImages,
                      index
                    );
                  }}
                  aria-label={`Ampliar imagen ${
                    index + 1
                  } de AirMonitor`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    draggable="false"
                  />
                </button>
              ))}
            </section>

            <div className="airmonitor-readme-text">
              <p>
                <strong>AirMonitor</strong> combina sensores
                ambientales, comunicación Bluetooth y desarrollo
                de software para registrar y consultar la calidad
                del aire en tiempo real. El dispositivo mide ozono
                y temperatura, procesa las señales y publica las
                lecturas mediante <strong>BLE/iBeacon</strong> para
                que una aplicación Android pueda recibirlas.
              </p>

              <p>
                La aplicación actúa como enlace con el servidor:
                envía las mediciones a una API, las almacena en{" "}
                <strong>PostgreSQL</strong> y permite consultarlas
                desde el móvil y la web. El proyecto recorre todo el
                flujo del dato, desde la señal física capturada por
                el sensor hasta su visualización.
              </p>

              <p className="airmonitor-readme-stack">
                <strong>
                  C++ · Arduino · BLE/iBeacon · Java ·
                  Node.js · PostgreSQL · Docker ·
                  JavaScript
                </strong>
              </p>
            </div>
          </article>
        )}

        {window.id === "airmonitor-info-window" && (
          <article className="airmonitor-info-content">
            <div className="airmonitor-info-image-wrapper">
              <img
                className="airmonitor-info-image"
                src="/projects/airmonitor/readmeAirmonitor.png"
                alt="Sistema AirMonitor con dispositivo, aplicación Android y panel web"
                draggable="false"
              />
            </div>

            <div className="airmonitor-info-text">
              <p>
                AirMonitor se desarrolló como un proyecto académico
                en equipo para construir un sistema completo de
                monitorización ambiental. El trabajo se dividió en
                varias capas: adquisición y calibración de señales,
                emisión BLE, recepción en Android, envío a la API y
                consulta desde una interfaz web.
              </p>

              <p>
                El principal reto fue conseguir que tecnologías muy
                diferentes compartieran los mismos datos de forma
                ordenada. La integración permitió comprobar el
                recorrido completo de una medición y trabajar con
                hardware, comunicaciones, aplicaciones móviles y
                servicios backend dentro de un mismo proyecto.
              </p>
            </div>
          </article>
        )}

        {window.id === "airmonitor-sensors-window" && (
          <article className="airmonitor-sensors-content">
            <section className="airmonitor-sensors-gallery">
              {airMonitorSensorImages.map((image, index) => (
                <button
                  className="airmonitor-sensors-gallery-item"
                  type="button"
                  key={image.src}
                  onPointerDown={(event) => {
                    event.stopPropagation();
                  }}
                  onClick={() => {
                    onOpenImageViewer(
                      airMonitorSensorImages,
                      index
                    );
                  }}
                  aria-label={`Ampliar imagen ${
                    index + 1
                  } de los sensores de AirMonitor`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    draggable="false"
                  />
                </button>
              ))}
            </section>

            <div className="airmonitor-sensors-text">
              <p>
                El dispositivo utilizaba sensores de ozono y
                temperatura conectados a las entradas analógicas
                del microcontrolador. Las señales obtenidas se
                convertían en valores ambientales mediante una
                clase encargada de leer y procesar cada medición.
              </p>

              <p>
                Para calcular la concentración de ozono se aplicaron
                los parámetros de sensibilidad, ganancia y
                desplazamiento del sensor. También se realizaron
                pruebas con valores de referencia para observar la
                desviación de las lecturas y ajustar su calibración.
              </p>

              <p>
                Antes de recoger datos válidos, el sensor necesitaba
                un periodo de estabilización. Durante el desarrollo
                se redujo este tiempo para las pruebas, aunque el
                funcionamiento normal requería aproximadamente una
                hora.
              </p>
            </div>
          </article>
        )}

        {window.id === "airmonitor-beacon-window" && (
          <article className="airmonitor-beacon-content">
            <section className="airmonitor-beacon-gallery">
              {airMonitorBeaconImages.map((image, index) => (
                <button
                  className="airmonitor-beacon-gallery-item"
                  type="button"
                  key={image.src}
                  onPointerDown={(event) => {
                    event.stopPropagation();
                  }}
                  onClick={() => {
                    onOpenImageViewer(
                      airMonitorBeaconImages,
                      index
                    );
                  }}
                  aria-label={`Ampliar imagen ${
                    index + 1
                  } de la comunicación BLE de AirMonitor`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    draggable="false"
                  />
                </button>
              ))}
            </section>

            <div className="airmonitor-beacon-text">
              <p>
                Una vez procesadas, las lecturas se publicaban
                periódicamente mediante Bluetooth Low Energy. El
                dispositivo funcionaba como beacon e incluía en sus
                anuncios la identificación de la emisora y los
                valores medidos.
              </p>

              <p>
                La aplicación Android escaneaba los dispositivos
                cercanos, interpretaba la trama iBeacon y recuperaba
                la información sin que el sensor tuviera que
                conectarse directamente a Internet. De esta forma,
                el teléfono funcionaba como puente entre el
                dispositivo físico y el servidor.
              </p>
            </div>
          </article>
        )}

        {window.id === "airmonitor-backend-window" && (
          <article className="airmonitor-backend-content">
            <section className="airmonitor-backend-gallery">
              {airMonitorBackendImages.map((image, index) => (
                <button
                  className="airmonitor-backend-gallery-item"
                  type="button"
                  key={image.src}
                  onPointerDown={(event) => {
                    event.stopPropagation();
                  }}
                  onClick={() => {
                    onOpenImageViewer(
                      airMonitorBackendImages,
                      index
                    );
                  }}
                  aria-label={`Ampliar imagen ${
                    index + 1
                  } del backend de AirMonitor`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    draggable="false"
                  />
                </button>
              ))}
            </section>

            <div className="airmonitor-backend-text">
              <p>
                La aplicación enviaba las mediciones a una API REST
                desarrollada con Node.js y Express. El servidor
                permitía crear usuarios, insertar datos de sensores,
                consultar las últimas lecturas y eliminar mediciones
                asociadas a un usuario.
              </p>

              <p>
                PostgreSQL almacenaba cada lectura junto con su tipo,
                valor, fecha y usuario. La API y la base de datos se
                ejecutaban mediante Docker Compose, lo que permitía
                iniciar conjuntamente toda la infraestructura del
                servidor.
              </p>
            </div>

            <div
              className="airmonitor-backend-endpoints"
              aria-label="Endpoints principales de la API"
            >
              {airMonitorBackendEndpoints.map((endpoint) => (
                <div
                  className="airmonitor-backend-endpoint"
                  key={`${endpoint.method}-${endpoint.path}`}
                >
                  <span className="airmonitor-backend-method">
                    {endpoint.method}
                  </span>

                  <code>{endpoint.path}</code>
                </div>
              ))}
            </div>
          </article>
        )}

        {window.id === "actualmente-file-window" && (
          <pre className="document-code-text actualmente-text">{`ACTUALMENTE

        > BUSCANDO PRÁCTICAS
          En búsqueda de una oportunidad
          para realizar prácticas de empresa
          y seguir creciendo como desarrollador.

        > ÁREAS DE INTERÉS
          Desarrollo web, robótica,
          visión artificial y cloud.

        > PROYECTOS
          Desarrollando un portfolio interactivo
          y documentando proyectos como VELARIS.`}</pre>
        )}

        {window.id === "aprendizaje-file-window" && (
          <pre className="document-code-text skills-detail-text">{` EN APRENDIZAJE

          [ACTUALMENTE]
          - Robótica autónoma con ROS2
          - Visión artificial con OpenCV
          - Interfaces web interactivas
          - Integración cloud

          [PRÓXIMOS PASOS]
          - Modelos de detección visual
          - Despliegue de aplicaciones completas
          - Automatización y sistemas inteligentes`}</pre>
        )}

        {window.id === "workflow-file-window" && (
          <pre className="document-code-text skills-detail-text">{` WORKFLOW

          01 / IDEA
          Definir el objetivo y las funcionalidades
          principales del proyecto.

          02 / ESTRUCTURA
          Organizar componentes, datos y estados.

          03 / DESARROLLO
          Construir por bloques pequeños y comprobables.

          04 / REVISIÓN
          Corregir errores y simplificar el código.

          05 / PRESENTACIÓN
          Preparar documentación y recursos visuales.`}</pre>
        )}
      </div>
    </div>
  );
}

export default DocumentWindow;