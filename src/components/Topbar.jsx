import { useEffect } from "react";
import ControlCenterPanel from "./ControlCenterPanel";
import NotificationsPanel from "./NotificationsPanel";
import ProfilePanel from "./ProfilePanel";
import TopbarMenu from "./TopbarMenu";
import CalendarPanel from "./CalendarPanel";

function Topbar({
  currentDate,
  formatTopbarDate,
  activeTopbarMenu,
  toggleTopbarMenu,
  toggleControlCenterPanel,
  isControlCenterPanelOpen,
  isDarkMode,
  toggleDarkMode,
  toggleProfilePanel,
  isProfilePanelOpen,
  toggleNotificationsPanel,
  isNotificationsPanelOpen,
  setActiveTopbarMenu,
  toggleCalendarPanel,
  isCalendarPanelOpen,
}) {
  const topbarMenus = {
    projects: [
      { id: "velaris", label: "Velaris" },
      { id: "airmonitor", label: "Airmonitor" },
      { id: "bancotech", label: "Bancotech" },
    ],
    file: [
      { id: "about", label: "Sobre mí" },
      { id: "currently", label: "Actualmente" },
      { id: "skills", label: "Skills" },
    ],
    contact: [
      { id: "email", label: "Correo" },
      { id: "github", label: "GitHub" },
      { id: "linkedin", label: "LinkedIn" },
    ],
    help: [
      { id: "navigation", label: "Cómo navegar" },
      { id: "portfolio", label: "Acerca del portfolio" },
    ],
  };


  useEffect(() => {
    function handleOutsidePointerDown(event) {
      if (!event.target.closest(".topbar-menu-anchor")) {
        setActiveTopbarMenu(null);
      }
    }

    document.addEventListener("pointerdown", handleOutsidePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handleOutsidePointerDown);
    };
  }, [setActiveTopbarMenu]);

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

        <button
          className="topbar-item topbar-title"
          type="button"
          onClick={() => globalThis.location.reload()}
          aria-label="Recargar portfolio"
        >
          [portfolio]
        </button>

        <div className="topbar-menu-anchor">
          <button
            className={`topbar-item ${
              activeTopbarMenu === "projects" ? "is-active" : ""
            }`}
            type="button"
            onClick={() => toggleTopbarMenu("projects")}
            aria-haspopup="menu"
            aria-expanded={activeTopbarMenu === "projects"}
          >
            Proyectos
          </button>

          {activeTopbarMenu === "projects" && (
            <TopbarMenu items={topbarMenus.projects} />
          )}
        </div>

        <div className="topbar-menu-anchor">
          <button
            className={`topbar-item ${
              activeTopbarMenu === "file" ? "is-active" : ""
            }`}
            type="button"
            onClick={() => toggleTopbarMenu("file")}
            aria-haspopup="menu"
            aria-expanded={activeTopbarMenu === "file"}
          >
            Archivo
          </button>

          {activeTopbarMenu === "file" && (
            <TopbarMenu items={topbarMenus.file} />
          )}
        </div>

        <div className="topbar-menu-anchor">
          <button
            className={`topbar-item ${
              activeTopbarMenu === "contact" ? "is-active" : ""
            }`}
            type="button"
            onClick={() => toggleTopbarMenu("contact")}
            aria-haspopup="menu"
            aria-expanded={activeTopbarMenu === "contact"}
          >
            Contacto
          </button>

          {activeTopbarMenu === "contact" && (
            <TopbarMenu items={topbarMenus.contact} />
          )}
        </div>

        <div className="topbar-menu-anchor">
          <button
            className={`topbar-item ${
              activeTopbarMenu === "help" ? "is-active" : ""
            }`}
            type="button"
            onClick={() => toggleTopbarMenu("help")}
            aria-haspopup="menu"
            aria-expanded={activeTopbarMenu === "help"}
          >
            Ayuda
          </button>

          {activeTopbarMenu === "help" && (
            <TopbarMenu items={topbarMenus.help} />
          )}
        </div>
      </div>

      <div className="topbar-right">
        <div className="topbar-popover-anchor">
          <button
            className={`topbar-item topbar-icon-button ${
              isControlCenterPanelOpen ? "is-active" : ""
            }`}
            type="button"
            onClick={toggleControlCenterPanel}
            aria-label={
              isControlCenterPanelOpen
                ? "Cerrar centro de control"
                : "Abrir centro de control"
            }
            aria-expanded={isControlCenterPanelOpen}
          >
            <img
              className="topbar-small-icon"
              src="/icons/topbar/iconoCentroControl.png"
              alt=""
              draggable="false"
            />
          </button>

          {isControlCenterPanelOpen && (
            <ControlCenterPanel
              isDarkMode={isDarkMode}
              onToggleDarkMode={toggleDarkMode}
            />
          )}
        </div>

        <div className="topbar-popover-anchor">
          <button
            className={`topbar-item topbar-icon-button ${
              isNotificationsPanelOpen ? "is-active" : ""
            }`}
            type="button"
            onClick={toggleNotificationsPanel}
            aria-label={
              isNotificationsPanelOpen
                ? "Cerrar notificaciones"
                : "Abrir notificaciones"
            }
            aria-expanded={isNotificationsPanelOpen}
          >
            <img
              className="topbar-small-icon"
              src="/icons/topbar/iconoNotificaciones.png"
              alt=""
              draggable="false"
            />
          </button>

          {isNotificationsPanelOpen && (
            <NotificationsPanel onClose={toggleNotificationsPanel} />
          )}
        </div>

        <div className="topbar-popover-anchor">
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

          {isProfilePanelOpen && <ProfilePanel onClose={toggleProfilePanel} />}
        </div>

        <div className="topbar-popover-anchor">
          <button
            className={`topbar-item topbar-date ${
              isCalendarPanelOpen ? "is-active" : ""
            }`}
            type="button"
            onClick={toggleCalendarPanel}
            aria-label="Abrir calendario"
            aria-expanded={isCalendarPanelOpen}
          >
            {formatTopbarDate(currentDate)}
          </button>

          {isCalendarPanelOpen && <CalendarPanel currentDate={currentDate} />}
        </div>
      </div>
    </header>
  );
}

export default Topbar;