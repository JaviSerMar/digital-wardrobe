function Topbar({
  currentDate,
  formatTopbarDate,
  toggleProfilePanel,
  isProfilePanelOpen,
}) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="topbar-item topbar-logo-item" type="button">
          <img
            className="topbar-logo"
            src="/icons/topbar/wardrobe_os1.png"
            alt="[portfolio]"
            draggable="false"
          />
        </button>

        <button className="topbar-item topbar-title" type="button">
          [portfolio]
        </button>

        <button className="topbar-item" type="button">
          Proyectos
        </button>

        <button className="topbar-item" type="button">
          Archivo
        </button>

        <button className="topbar-item" type="button">
          Contacto
        </button>

        <button className="topbar-item" type="button">
          Ayuda
        </button>
      </div>

      <div className="topbar-right">
        <button className="topbar-item topbar-icon-button" type="button">
          <img
            className="topbar-small-icon"
            src="/icons/topbar/iconoCentroControl.png"
            alt=""
            draggable="false"
          />
        </button>

        <button className="topbar-item topbar-icon-button" type="button">
          <img
            className="topbar-small-icon"
            src="/icons/topbar/iconoNotificaciones.png"
            alt=""
            draggable="false"
          />
        </button>

        <button
          className={`topbar-item topbar-icon-button ${
            isProfilePanelOpen ? "is-active" : ""
          }`}
          type="button"
          onClick={toggleProfilePanel}
          aria-label={isProfilePanelOpen ? "Cerrar perfil" : "Abrir perfil"}
          aria-expanded={isProfilePanelOpen}
        >
          <img
            className="topbar-small-icon"
            src="/icons/topbar/iconoPerfil.png"
            alt=""
            draggable="false"
          />
        </button>

        <button className="topbar-item topbar-date" type="button">
          {formatTopbarDate(currentDate)}
        </button>
      </div>
    </header>
  );
}

export default Topbar;