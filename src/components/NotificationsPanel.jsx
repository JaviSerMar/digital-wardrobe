function NotificationsPanel({ onClose }) {
  return (
    <aside className="notifications-panel">
      <div className="notifications-panel-header">
        <h2 className="notifications-panel-title">Notificaciones</h2>

        <button
          className="notifications-panel-close"
          type="button"
          onClick={onClose}
          aria-label="Cerrar notificaciones"
        >
          ×
        </button>
      </div>

      <div className="notification-card notification-card-active">
        <p className="notification-label">ÚLTIMA PUBLICACIÓN</p>
        <h3 className="notification-project">VELARIS</h3>
        <p className="notification-description">
          Robot autónomo de vigilancia.
          <br />
          Disponible ahora.
        </p>
      </div>

      <div className="notification-card notification-card-future">
        <p className="notification-label">PRÓXIMAMENTE</p>
        <h3 className="notification-project">Nuevo proyecto en desarrollo</h3>
        <p className="notification-description notification-cooking">
          something cookin&apos;
        </p>
      </div>
    </aside>
  );
}

export default NotificationsPanel;