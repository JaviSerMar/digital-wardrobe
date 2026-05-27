
function ProfilePanel({ onClose }) {
  return (
    <aside className="profile-panel">
      <button
        className="profile-panel-close"
        type="button"
        onClick={onClose}
        aria-label="Cerrar perfil"
      >
        ×
      </button>

      <img
        className="profile-panel-photo"
        src="/images/frank.png"
        alt=""
        draggable="false"
      />

      <h2 className="profile-panel-name">Javier Serrano</h2>

      <p className="profile-panel-degree">
        Estudiante del Grado en
        <br />
        Tecnologías Interactivas
      </p>

      <p className="profile-panel-status">
        Buscando prácticas de empresa
      </p>
    </aside>
  );
}

export default ProfilePanel;