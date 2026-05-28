function ControlCenterPanel({ isDarkMode, onToggleDarkMode }) {
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
            aria-label="Activar modo oscuro"
          >
            <span className="control-center-switch-thumb" />
          </button>
        </div>
      </section>
    </aside>
  );
}

export default ControlCenterPanel;