function DocumentHeader({ title, onClose }) {
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
            src="/icons/archivoTxt.png"
            alt=""
            draggable="false"
          />
          <span>{title} — [javier serrano]</span>
        </div>
      </div>

      <img
        className="document-toolbar-image"
        src="/images/document-toolbar.png"
        alt=""
        draggable="false"
      />
    </div>
  );
}

export default DocumentHeader;