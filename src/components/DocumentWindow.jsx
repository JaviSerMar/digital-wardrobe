import DocumentHeader from "./DocumentHeader";

function DocumentWindow({
  window,
  closeWindow,
  isDarkMode,
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
        isDesktopPhoto={window.id === "desktop-photo-window"}
        isTeamImage={window.id === "equipo-image-window"}
        isManifestoImage={window.id === "velaris-manifesto-window"}
        isDarkMode={isDarkMode}
      />

      <div
        className={`document-body ${
          window.id === "skills-file-window" ||
          window.id === "velaris-readme-window" ||
          window.id === "velaris-stack-window" ||
          window.id === "actualmente-file-window" ||
          window.id === "aprendizaje-file-window" ||
          window.id === "workflow-file-window" ||
          window.id === "email-file-window" ||
          window.fileType === "image"
            ? "document-body-no-scroll"
            : ""
        } ${window.fileType === "image" ? "image-document-body" : ""}`}
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
              onPointerDown={(event) => event.stopPropagation()}
            >
              javiersemarco@gmail.com
            </p>
          </div>
        )}

        {window.fileType === "image" && (
          <div className="image-file-viewer">
            <img
              className="image-file-preview"
              src={window.imageSrc}
              alt={window.title}
              draggable="false"
            />
          </div>
        )}

        {window.id === "velaris-readme-window" && (
          <article className="velaris-readme-content">
            <section className="velaris-gallery-grid">
              {velarisGalleryImages.map((image, index) => (
                <button
                  className={`velaris-gallery-item velaris-gallery-item-${index + 1}`}
                  type="button"
                  key={image.src}
                  onPointerDown={(event) => {
                    event.stopPropagation();
                  }}
                  onClick={() => {
                    onOpenImageViewer(velarisGalleryImages, index);
                  }}
                  aria-label={`Ampliar imagen ${index + 1} de Velaris`}
                >
                  <img src={image.src} alt={image.alt} draggable="false" />
                </button>
              ))}
            </section>

            <div className="document-readme-text">
              <p>
                <strong>Velaris</strong> combina robótica, simulación, visión artificial y
                desarrollo web en un sistema capaz de patrullar un espacio, mostrar
                información en tiempo real y ser controlado desde una interfaz web. El robot
                funciona en un almacén simulado con <strong>Gazebo</strong>.{" "}
                <strong>ROS2</strong> coordina el sistema y <strong>Nav2</strong> permite
                la navegación autónoma por el mapa. Desde la web se puede ver la cámara,
                consultar el mapa, revisar el estado del robot, iniciar patrullas y enviar
                comandos de movimiento. También incorpora <strong>OpenCV</strong> para
                capturar y procesar imágenes durante las patrullas, preparando la base para
                futuras detecciones mediante inteligencia artificial.
              </p>

              <p className="document-readme-stack">
                <strong>
                  Python · ROS2 · Nav2 · Gazebo · RViz · OpenCV · Vite · WebSocket · AWS
                  Cloud
                </strong>
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