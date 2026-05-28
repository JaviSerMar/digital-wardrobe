function DocumentHeader({
  title,
  onClose,
  toolbarSrc = "/images/document-toolbar.png",
  titleIconSrc = "/icons/archivoTxt.png",
  isImageFile = false,
  isDesktopPhoto = false,
  isTeamImage = false,
  isManifestoImage = false,
  isDarkMode = false,
}) {
  function getToolbarSrc() {
    if (!isDarkMode) {
      return toolbarSrc;
    }

    if (toolbarSrc === "/images/cabeceraImagenMini.png") {
      return "/images/VersionOscuro/cabeceraImagenMini_Oscura.png";
    }

    if (toolbarSrc === "/images/cabeceraImagen.png") {
      return "/images/VersionOscuro/cabeceraImagen_Oscura.png";
    }

    return "/images/VersionOscuro/document-toolbar_Oscura.png";
  }

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

      <img
        className={`document-toolbar-image ${
          isImageFile ? "image-toolbar-picture" : ""
        } ${isDesktopPhoto ? "desktop-photo-toolbar" : ""} ${
          isTeamImage ? "team-image-toolbar" : ""
        } ${isManifestoImage ? "manifesto-image-toolbar" : ""}`}
        src={getToolbarSrc()}
        alt=""
        draggable="false"
      />
    </div>
  );
}

export default DocumentHeader;