function FolderIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M3.5 7h6l1.7 2H20.5v9H3.5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect
        x="4"
        y="4"
        width="6"
        height="6"
        rx="1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />

      <rect
        x="14"
        y="4"
        width="6"
        height="6"
        rx="1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />

      <rect
        x="4"
        y="14"
        width="6"
        height="6"
        rx="1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />

      <rect
        x="14"
        y="14"
        width="6"
        height="6"
        rx="1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="5" cy="6" r="1.1" fill="currentColor" />
      <circle cx="5" cy="12" r="1.1" fill="currentColor" />
      <circle cx="5" cy="18" r="1.1" fill="currentColor" />

      <path
        d="M9 6h11M9 12h11M9 18h11"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="m8 10 4 4 4-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 15V4m0 0L8.5 7.5M12 4l3.5 3.5M6 11v8h12v-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 5h8l8 8-7 7-9-9z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />

      <circle cx="8.5" cy="9.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="m12 3 2.6 5.4 5.9.8-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.2 5.9-.8z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle
        cx="10.5"
        cy="10.5"
        r="5.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <path
        d="m15 15 4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DocumentHeader({
  title,
  onClose,
  toolbarSrc = "/images/document-toolbar.png",
  titleIconSrc = "/icons/archivoTxt.png",
  isImageFile = false,
  isSmallImageHeader = false,
  isDesktopPhoto = false,
  isArchitectureImage = false,
  isTeamImage = false,
  isManifestoImage = false,
}) {
  const usesReducedImageToolbar =
    isDesktopPhoto || isArchitectureImage;

  return (
    <div className="document-header">
      <div className="document-titlebar">
        <div className="document-window-buttons">
          <button
            className="document-window-button document-close"
            type="button"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={onClose}
            aria-label="Cerrar ventana"
          />

          <button
            className="document-window-button document-minimize"
            type="button"
            aria-label="Minimizar"
          />

          <button
            className="document-window-button document-maximize"
            type="button"
            aria-label="Maximizar"
          />
        </div>

        <div className="document-title">
          <img
            className="document-title-icon"
            src={titleIconSrc}
            alt=""
            draggable="false"
          />

          <span>{title} — [javier serrano]</span>
        </div>
      </div>

      {isImageFile && isSmallImageHeader ? (
        <div className="image-small-toolbar">
          <div className="image-toolbar-group">
            <button type="button" aria-label="Carpeta">
              <FolderIcon />
            </button>

            <button type="button" aria-label="Vista de cuadrícula">
              <GridIcon />
            </button>

            <button type="button" aria-label="Vista de lista">
              <ListIcon />
            </button>
          </div>

          <button
            className="image-toolbar-view-button"
            type="button"
          >
            <span>Vista</span>
            <ChevronDownIcon />
          </button>

          <div className="image-toolbar-group">
            <button type="button" aria-label="Compartir">
              <ShareIcon />
            </button>

            <button type="button" aria-label="Etiqueta">
              <TagIcon />
            </button>

            <button type="button" aria-label="Favoritos">
              <StarIcon />
            </button>
          </div>

          <div className="image-toolbar-search">
            <SearchIcon />
            <span>Buscar</span>
          </div>
        </div>
      ) : (
        <img
          className={`document-toolbar-image ${
            isImageFile ? "image-toolbar-picture" : ""
          } ${
            usesReducedImageToolbar
              ? "desktop-photo-toolbar"
              : ""
          } ${
            isTeamImage ? "team-image-toolbar" : ""
          } ${
            isManifestoImage
              ? "manifesto-image-toolbar"
              : ""
          }`}
          src={toolbarSrc}
          alt=""
          draggable="false"
        />
      )}
    </div>
  );
}

export default DocumentHeader;