import DocumentHeader from "./DocumentHeader";

function DocumentWindow({ window, closeWindow }) {
  return (
    <div className="document-window-content">
      <DocumentHeader
        title={window.title}
        onClose={() => closeWindow(window.id)}
      />

      <div
        className={`document-body ${
          window.id === "skills-file-window" ? "document-body-no-scroll" : ""
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

        {window.id === "velaris-readme-window" && (
          <article className="velaris-readme-content">
            <img
              className="velaris-readme-cover"
              src="/projects/velaris/turtlebotRectangular.png"
              alt="Velaris project preview"
              draggable="false"
            />

            <div className="document-readme-text">
              <h1>VELARIS</h1>

              <p>
                <strong>Robot móvil autónomo de vigilancia</strong> para
                entornos tipo almacén.
              </p>

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
      </div>
    </div>
  );
}

export default DocumentWindow;