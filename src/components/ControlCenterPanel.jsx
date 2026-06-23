function ControlCenterPanel({
  isDarkMode,
  onToggleDarkMode,
  isDockVisible,
  onToggleDock,
}) {
  return (
    <aside className="control-center-panel">
      <h2 className="control-center-title">Centro de control</h2>

      <section className="control-center-section">
        <p className="control-center-section-title">APARIENCIA</p>

        <div className="control-center-setting">
          <div className="control-center-setting-text">
            <span className="control-center-setting-name">
              Modo oscuro
            </span>

            <span className="control-center-setting-status">
              {isDarkMode ? "Activado" : "Desactivado"}
            </span>
          </div>

          <button
            className={`control-center-switch ${
              isDarkMode ? "is-enabled" : ""
            }`}
            type="button"
            onClick={onToggleDarkMode}
            role="switch"
            aria-checked={isDarkMode}
            aria-label="Activar o desactivar el modo oscuro"
          >
            <span className="control-center-switch-thumb" />
          </button>
        </div>
      </section>

      <section className="control-center-section">
        <p className="control-center-section-title">ESCRITORIO</p>

        <div className="control-center-setting">
          <div className="control-center-setting-text">
            <span className="control-center-setting-name">
              Mostrar Dock
            </span>

            <span className="control-center-setting-status">
              {isDockVisible ? "Activado" : "Desactivado"}
            </span>
          </div>

          <button
            className={`control-center-switch ${
              isDockVisible ? "is-enabled" : ""
            }`}
            type="button"
            onClick={onToggleDock}
            role="switch"
            aria-checked={isDockVisible}
            aria-label="Mostrar u ocultar el Dock"
          >
            <span className="control-center-switch-thumb" />
          </button>
        </div>
      </section>
    </aside>
  );
}

export default ControlCenterPanel;