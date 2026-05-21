function StickyWindow({ window, closeWindow }) {
  return (
    <>
      <div className="sticky-window-header">
        <div className="sticky-window-header-left">
          <img src="/icons/noteHeader/square-left.svg" alt="" />
        </div>

        <div className="sticky-window-header-right">
          <img src="/icons/noteHeader/triangle-right.svg" alt="" />

          <button
            className="sticky-window-close"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => closeWindow(window.id)}
          >
            <img src="/icons/noteHeader/square-right.svg" alt="" />
          </button>
        </div>
      </div>

      {window.type === "welcome" && (
        <div className="welcome-window-content">
          <img
            className="welcome-window-image"
            src="/images/talkingHeads.png"
            alt=""
            draggable="false"
          />

          <div className="welcome-window-text">
            <p>/**</p>
            <p> * <strong>Bienvenido a mi [portfolio]</strong></p>
            <p> *</p>
            <p> * Soy <strong>Javier Serrano</strong>,</p>
            <p>
              {" "}
              * estudiante de <strong>Tecnologías Interactivas</strong> en la
              UPV.
            </p>
            <p> *</p>
            <p> * Haz clic en los iconos para explorar el escritorio.</p>
            <p> */</p>
          </div>
        </div>
      )}

      {window.type === "profile" && (
        <div className="profile-window-content">
          <div className="profile-window-text">
            <p>/**</p>
            <p> * [profile.js]</p>
            <p> *</p>
            <p>
              {" "}
              * <strong>Desarrollador de software</strong> en formación,
            </p>
            <p>
              {" "}
              * interesado en crear <strong>sistemas interactivos</strong>
            </p>
            <p>
              {" "}
              * que conecten <strong>web</strong>, <strong>datos</strong>,
              sensores y robótica.
            </p>
            <p> *</p>
            <p> * Trabajo con tecnologías frontend, backend,</p>
            <p>
              {" "}
              * IoT, <strong>visión artificial</strong> y entornos simulados.
            </p>
            <p> */</p>
          </div>

          <img
            className="profile-window-image"
            src="/images/caballoSticky.png"
            alt=""
            draggable="false"
          />
        </div>
      )}
    </>
  );
}

export default StickyWindow;