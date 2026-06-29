import { folderWindowsData } from "../data/windowsData";
import { projectFolderScreens } from "../data/projectFolders";

function FolderWindow({
  window,
  closeWindow,
  openWindowByKey,
  openImageGallery,
  setOpenWindows,
}) {
  const isProjectsWindow =
    window.id === "projects-window";

  const navigationHistory =
    Array.isArray(window.navigationHistory) &&
    window.navigationHistory.length > 0
      ? window.navigationHistory
      : [window.currentFolder || "projects"];

  const navigationIndex =
    Number.isInteger(window.navigationIndex)
      ? window.navigationIndex
      : navigationHistory.length - 1;

  const canGoBack =
    isProjectsWindow && navigationIndex > 0;

  const canGoForward =
    isProjectsWindow &&
    navigationIndex < navigationHistory.length - 1;

  function getFolderData(folderKey) {
    if (folderKey === "projects") {
      return {
        title: folderWindowsData.projects.title,
        items: folderWindowsData.projects.items,
      };
    }

    return projectFolderScreens[folderKey] || null;
  }

  function navigateToFolder(folderKey) {
    const targetFolder = getFolderData(folderKey);

    if (!targetFolder) {
      return;
    }

    setOpenWindows((currentWindows) =>
      currentWindows.map((currentWindow) => {
        if (currentWindow.id !== window.id) {
          return currentWindow;
        }

        const currentFolder =
          currentWindow.currentFolder || "projects";

        const currentHistory =
          Array.isArray(
            currentWindow.navigationHistory
          ) &&
          currentWindow.navigationHistory.length > 0
            ? currentWindow.navigationHistory
            : [currentFolder];

        const currentIndex =
          Number.isInteger(
            currentWindow.navigationIndex
          )
            ? currentWindow.navigationIndex
            : currentHistory.length - 1;

        const historyBeforeCurrent =
          currentHistory.slice(0, currentIndex + 1);

        const nextHistory =
          historyBeforeCurrent[
            historyBeforeCurrent.length - 1
          ] === folderKey
            ? historyBeforeCurrent
            : [...historyBeforeCurrent, folderKey];

        return {
          ...currentWindow,
          title: targetFolder.title,
          currentFolder: folderKey,
          items: targetFolder.items,
          navigationHistory: nextHistory,
          navigationIndex: nextHistory.length - 1,
        };
      })
    );
  }

  function navigateThroughHistory(nextIndex) {
    const folderKey = navigationHistory[nextIndex];
    const targetFolder = getFolderData(folderKey);

    if (!targetFolder) {
      return;
    }

    setOpenWindows((currentWindows) =>
      currentWindows.map((currentWindow) =>
        currentWindow.id === window.id
          ? {
              ...currentWindow,
              title: targetFolder.title,
              currentFolder: folderKey,
              items: targetFolder.items,
              navigationHistory,
              navigationIndex: nextIndex,
            }
          : currentWindow
      )
    );
  }

  function handleBackNavigation(event) {
    event.stopPropagation();

    if (!canGoBack) {
      return;
    }

    navigateThroughHistory(navigationIndex - 1);
  }

  function handleForwardNavigation(event) {
    event.stopPropagation();

    if (!canGoForward) {
      return;
    }

    navigateThroughHistory(navigationIndex + 1);
  }

  function handleFolderItemOpen(event, folderItem) {
    event.stopPropagation();

    if (folderItem.targetFolder) {
      navigateToFolder(folderItem.targetFolder);
      return;
    }

    if (
      folderItem.galleryKey &&
      Number.isInteger(folderItem.galleryIndex)
    ) {
      openImageGallery(
        folderItem.galleryKey,
        folderItem.galleryIndex
      );
      return;
    }

    if (folderItem.openWindowKey) {
      openWindowByKey(folderItem.openWindowKey);
      return;
    }

    if (!folderItem.externalUrl) {
      return;
    }

    if (folderItem.id === "email-file") {
      document.location.href =
        folderItem.externalUrl;
      return;
    }

    globalThis.open(
      folderItem.externalUrl,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <div className="folder-window-content">
      <div className="folder-header">
        <div className="folder-titlebar">
          <div className="folder-window-buttons">
            <button
              className="folder-window-button folder-close"
              type="button"
              onPointerDown={(event) =>
                event.stopPropagation()
              }
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
              onPointerDown={(event) =>
                event.stopPropagation()
              }
              onClick={handleBackNavigation}
              disabled={!canGoBack}
              aria-label="Volver"
            >
              ‹
            </button>

            <div className="folder-nav-divider" />

            <button
              className="folder-nav-button"
              type="button"
              onPointerDown={(event) =>
                event.stopPropagation()
              }
              onClick={handleForwardNavigation}
              disabled={!canGoForward}
              aria-label="Avanzar"
            >
              ›
            </button>
          </div>

          <h2 className="folder-title">
            {window.title}
          </h2>
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
          <p className="folder-sidebar-section">
            Javier Serrano
          </p>

          <p>Proyectos</p>
          <p>Skills</p>
          <p>Contacto</p>
          <p>Sobre mí</p>

          <p className="folder-sidebar-section folder-sidebar-system">
            Sistema
          </p>

          <p className="is-selected">
            [portfolio]
          </p>

          <p>Archivo local</p>
          <p>Recursos</p>
        </aside>

        <div className="folder-content">
          {window.items.map((folderItem) => (
            <button
              className="folder-item"
              type="button"
              key={folderItem.id}
              onPointerDown={(event) =>
                event.stopPropagation()
              }
              onDoubleClick={(event) =>
                handleFolderItemOpen(
                  event,
                  folderItem
                )
              }
              aria-label={folderItem.label}
            >
              <span className="folder-item-visual">
                <img
                  src={folderItem.icon}
                  alt=""
                  draggable="false"
                />
              </span>

              <span>{folderItem.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FolderWindow;