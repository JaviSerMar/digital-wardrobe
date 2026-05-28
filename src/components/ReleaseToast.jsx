function ReleaseToast({ onOpenProject, onClose }) {
  return (
    <aside
      className="release-toast"
      role="status"
      aria-label="Nuevo proyecto disponible"
    >
      <button
        className="release-toast-content"
        type="button"
        onClick={onOpenProject}
        aria-label="Abrir proyecto Velaris"
      >
        <img
          className="release-toast-icon"
          src="/icons/logoVelaris2.png"
          alt=""
          draggable="false"
        />

        <span className="release-toast-text-content">
          <span className="release-toast-label">NUEVO PROYECTO</span>

          <span className="release-toast-title">
            VELARIS ya está disponible.
          </span>

          <span className="release-toast-link">
            Abrir proyecto <span aria-hidden="true">→</span>
          </span>
        </span>
      </button>

      <button
        className="release-toast-close"
        type="button"
        onClick={onClose}
        aria-label="Cerrar notificación"
      >
        ×
      </button>
    </aside>
  );
}

export default ReleaseToast;