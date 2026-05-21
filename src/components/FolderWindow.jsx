import { folderWindowsData } from "../data/windowsData";

function FolderWindow({
  window,
  closeWindow,
  openFolderScreen,
  openWindowByKey,
  setOpenWindows,
}) {
  return (
    <div className="folder-window-content">
      <div className="folder-header">
        <div className="folder-titlebar">
          <div className="folder-window-buttons">
            <button
              className="folder-window-button folder-close"
              type="button"
              onPointerDown={(event) => event.stopPropagation()}
              onClick={() => closeWindow(window.id)}
              aria-label="Cerrar carpeta"
            />

            <button
              className="folder-window-button folder-minimize"
              type="button"
              aria-label="Minimizar"
            />

            <button
              className="folder-window-button folder-maximize"
              type="button"
              aria-label="Maximizar"
            />
          </div>

          <div className="folder-navigation">
            <button
              className="folder-nav-button"
              type="button"
              onPointerDown={(event) => event.stopPropagation()}
              onClick={() => {
                if (
                  window.id === "projects-window" &&
                  window.currentFolder !== "projects"
                ) {
                  const projectsRoot = folderWindowsData.projects;

                  setOpenWindows((currentWindows) =>
                    currentWindows.map((currentWindow) =>
                      currentWindow.id === "projects-window"
                        ? {
                            ...currentWindow,
                            title: "proyectos",
                            currentFolder: "projects",
                            items: projectsRoot.items,
                          }
                        : currentWindow
                    )
                  );
                }
              }}
            >
              ‹
            </button>

            <div className="folder-nav-divider" />

            <button className="folder-nav-button" type="button">
              ›
            </button>
          </div>

          <h2 className="folder-title">{window.title}</h2>
        </div>

        <img
          className="folder-toolbar-image"
          src="/images/cabeceraCarpetas.png"
          alt=""
          draggable="false"
        />
      </div>

      <div className="folder-main">
        <aside className="folder-sidebar">
          <p className="folder-sidebar-section">Javier Serrano</p>
          <p>Proyectos</p>
          <p>Skills</p>
          <p>Contacto</p>
          <p>Sobre mí</p>

          <p className="folder-sidebar-section folder-sidebar-system">
            Sistema
          </p>
          <p className="is-selected">[portfolio]</p>
          <p>Archivo local</p>
          <p>Recursos</p>
        </aside>

        <div className="folder-content">
          {window.items.map((folderItem) => (
            <button
              className="folder-item"
              key={folderItem.id}
              onPointerDown={(event) => event.stopPropagation()}
              onDoubleClick={(event) => {
                event.stopPropagation();

                if (folderItem.targetFolder) {
                  openFolderScreen(window.id, folderItem.targetFolder);
                  return;
                }

                if (folderItem.openWindowKey) {
                  openWindowByKey(folderItem.openWindowKey);
                }
              }}
            >
              <img src={folderItem.icon} alt="" draggable="false" />
              <span>{folderItem.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FolderWindow;