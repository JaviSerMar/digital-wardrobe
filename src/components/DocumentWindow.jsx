import DocumentHeader from "./DocumentHeader";

function DocumentWindow({ window, closeWindow }) {
  return (
    <div className="document-window-content">
      <DocumentHeader
        title={window.title}
        onClose={() => closeWindow(window.id)}
        toolbarSrc={window.toolbarSrc}
        titleIconSrc={window.titleIconSrc}
        isImageFile={window.fileType === "image"}
        isDesktopPhoto={window.id === "desktop-photo-window"}
        isTeamImage={window.id === "equipo-image-window"}
        isManifestoImage={window.id === "velaris-manifesto-window"}
      />

      <div
        className={`document-body ${
          window.id === "skills-file-window" ||
          window.id === "velaris-stack-window" ||
          window.id === "actualmente-file-window" ||
          window.id === "aprendizaje-file-window" ||
          window.id === "workflow-file-window" ||
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
            <img
              className="velaris-readme-cover"
              src="/projects/velaris/turtlebotRectangular.png"
              alt="Velaris project preview"
              draggable="false"
            />

            <div className="document-readme-text">
            <h2>VELARIS: Robot autónomo de vigilancia</h2>

              <p>
                <strong>Velaris</strong> combina robótica, simulación, visión
                artificial y desarrollo web en un sistema capaz de patrullar un
                espacio, mostrar información en tiempo real y ser controlado
                desde una interfaz web.
              </p>

              <p>
                El robot funciona en un almacén simulado con{" "}
                <strong>Gazebo</strong>. <strong>ROS2</strong> coordina el
                sistema y <strong>Nav2</strong> permite la navegación autónoma
                por el mapa.
              </p>

              <p>
                Desde la web se puede ver la cámara, consultar el mapa, revisar
                el estado del robot, iniciar patrullas y enviar comandos de
                movimiento.
              </p>

              <p>
                También incorpora <strong>OpenCV</strong> para capturar y
                procesar imágenes durante las patrullas, preparando la base para
                futuras detecciones mediante inteligencia artificial.
              </p>

              <h2>TECNOLOGÍAS</h2>

              <p>
                <strong>
                  Python · ROS2 · Nav2 · Gazebo · RViz · OpenCV · Vite ·
                  WebSocket · AWS Cloud
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
          <pre className="document-code-text actualmente-text">{`   ACTUALMENTE

            > VELARIS
              Robot autónomo de vigilancia.
              Proyecto documentado y disponible.

            > DIGITAL WARDROBE
              Experiencia interactiva en desarrollo.
              Se está cocinando...

            > PORTFOLIO
              Escritorio web experimental.
              Nuevas funciones próximamente.`}</pre>
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