function Topbar({ currentDate, formatTopbarDate }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="topbar-item topbar-logo-item">
          <img
            className="topbar-logo"
            src="/icons/topbar/wardrobe_os1.png"
            alt="[portfolio]"
            draggable="false"
          />
        </button>

        <button className="topbar-item topbar-title">[portfolio]</button>
        <button className="topbar-item">Proyectos</button>
        <button className="topbar-item">Archivo</button>
        <button className="topbar-item">Contacto</button>
        <button className="topbar-item">Ayuda</button>
      </div>

      <div className="topbar-right">
        <button className="topbar-item topbar-icon-button">
          <img
            className="topbar-small-icon"
            src="/icons/topbar/iconoCentroControl.png"
            alt=""
            draggable="false"
          />
        </button>

        <button className="topbar-item topbar-icon-button">
          <img
            className="topbar-small-icon"
            src="/icons/topbar/iconoNotificaciones.png"
            alt=""
            draggable="false"
          />
        </button>

        <button className="topbar-item topbar-icon-button">
          <img
            className="topbar-small-icon"
            src="/icons/topbar/iconoPerfil.png"
            alt=""
            draggable="false"
          />
        </button>

        <button className="topbar-item topbar-date">
          {formatTopbarDate(currentDate)}
        </button>
      </div>
    </header>
  );
}

export default Topbar;