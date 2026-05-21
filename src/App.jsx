import { useEffect, useRef, useState } from "react";
import "./App.css";
import { initialDesktopItems } from "./data/desktopItems";

import {
  stickyNotesData,
  documentWindowsData,
  terminalWindowsData,
  folderWindowsData,
} from "./data/windowsData";

import { projectFolderScreens } from "./data/projectFolders";
import DocumentHeader from "./components/DocumentHeader";
import Topbar from "./components/Topbar";
import DesktopGrid from "./components/DesktopGrid";
import TerminalWindow from "./components/TerminalWindow";
import DocumentWindow from "./components/DocumentWindow";

function formatTopbarDate(date) {
  const days = [
    "domingo",
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
  ];

  const months = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  const dayName = days[date.getDay()];
  const dayNumber = date.getDate();
  const monthName = months[date.getMonth()];

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${dayName} ${dayNumber} ${monthName} ${hours}:${minutes}`;
}





function App() {
  const gridRef = useRef(null);
  const floatingLayerRef = useRef(null);

  const [desktopItems, setDesktopItems] = useState(initialDesktopItems);
  const [draggedItemId, setDraggedItemId] = useState(null);
  const [openWindows, setOpenWindows] = useState(() =>
    Object.values(stickyNotesData).map((window, index) => ({
      ...window,
      zIndex: index + 1,
    }))
  );
  const [draggingWindow, setDraggingWindow] = useState(null);

  const [currentDate, setCurrentDate] = useState(() => new Date());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const [windowPositions, setWindowPositions] = useState(() =>
  Object.fromEntries(
    [
      ...Object.values(stickyNotesData),
      ...Object.values(documentWindowsData),
      ...Object.values(terminalWindowsData),
      ...Object.values(folderWindowsData),
    ].map((window) => [
      window.id,
      {
        left: window.left,
        top: window.top,
      },
    ])
  )
);

  const columns = 14;
  const rows = 7;
  const cellWidth = 86;
  const cellHeight = 96;
  const columnGap = 20;
  const rowGap = 10;

  function moveItemToPointer(itemId, event) {
    if (!gridRef.current) return;

    const gridRect = gridRef.current.getBoundingClientRect();

    const relativeX = event.clientX - gridRect.left;
    const relativeY = event.clientY - gridRect.top;

    const newX = Math.round(
      (relativeX - cellWidth / 2) / (cellWidth + columnGap)
    );

    const newY = Math.round(
      (relativeY - cellHeight / 2) / (cellHeight + rowGap)
    );

    const limitedX = Math.max(0, Math.min(columns - 1, newX));
    const limitedY = Math.max(0, Math.min(rows - 1, newY));

    setDesktopItems((currentItems) => {
      const isCellOccupied = currentItems.some(
        (item) =>
          item.id !== itemId && item.x === limitedX && item.y === limitedY
      );

      if (isCellOccupied) return currentItems;

      return currentItems.map((item) =>
        item.id === itemId
          ? {
              ...item,
              x: limitedX,
              y: limitedY,
            }
          : item
      );
    });
  }

  function handlePointerDown(event, itemId) {
    setDraggedItemId(itemId);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerUp(event, itemId) {
    moveItemToPointer(itemId, event);
    setDraggedItemId(null);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function handleItemDoubleClick(item) {
    const noteData = stickyNotesData[item.id];
    const documentData = documentWindowsData[item.id];
    const terminalData = terminalWindowsData[item.id];
    const folderData = folderWindowsData[item.id];


    const windowData = noteData || documentData || terminalData || folderData;

    if (!windowData) return;

    setOpenWindows((currentWindows) => {
      const alreadyOpen = currentWindows.some(
        (window) => window.id === windowData.id
      );

      if (alreadyOpen) return currentWindows;

      const savedPosition = windowPositions[windowData.id] ?? {
        left: windowData.left,
        top: windowData.top,
      };

      const maxZIndex = Math.max(
        0,
        ...currentWindows.map((window) => window.zIndex || 1)
      );

      return [
        ...currentWindows,
        {
          ...windowData,
          left: savedPosition.left,
          top: savedPosition.top,
          zIndex: maxZIndex + 1,
        },
      ];
    });
  }

  function handleWindowPointerDown(event, windowId) {
    bringWindowToFront(windowId);

    const windowElement = event.currentTarget.closest(".floating-window");

    if (!windowElement) return;

    const windowRect = windowElement.getBoundingClientRect();

    setDraggingWindow({
      id: windowId,
      offsetX: event.clientX - windowRect.left,
      offsetY: event.clientY - windowRect.top,
    });

    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handleWindowPointerMove(event) {
    if (!draggingWindow || !floatingLayerRef.current) return;

    const layerRect = floatingLayerRef.current.getBoundingClientRect();

    const newLeft = event.clientX - layerRect.left - draggingWindow.offsetX;
    const newTop = event.clientY - layerRect.top - draggingWindow.offsetY;

    setOpenWindows((currentWindows) =>
      currentWindows.map((window) =>
        window.id === draggingWindow.id
          ? {
              ...window,
              left: newLeft,
              top: newTop,
            }
          : window
      )
    );

    setWindowPositions((currentPositions) => ({
      ...currentPositions,
      [draggingWindow.id]: {
        left: newLeft,
        top: newTop,
      },
    }));
  }

  function handleWindowPointerUp(event) {
    setDraggingWindow(null);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function closeWindow(windowId) {
    setOpenWindows((currentWindows) =>
      currentWindows.filter((currentWindow) => currentWindow.id !== windowId)
    );
  }

  function openFolderScreen(windowId, targetFolder) {
    const folderScreen = projectFolderScreens[targetFolder];

    if (!folderScreen) return;

    setOpenWindows((currentWindows) =>
      currentWindows.map((window) =>
        window.id === windowId
          ? {
              ...window,
              title: `proyectos / ${folderScreen.title}`,
              currentFolder: targetFolder,
              items: folderScreen.items,
            }
          : window
      )
    );
  }

  function openWindowByKey(windowKey) {
    const windowData =
      documentWindowsData[windowKey] ||
      terminalWindowsData[windowKey] ||
      folderWindowsData[windowKey];

    if (!windowData) return;

    setOpenWindows((currentWindows) => {
      const alreadyOpen = currentWindows.some(
        (window) => window.id === windowData.id
      );

      if (alreadyOpen) return currentWindows;

      const savedPosition = windowPositions[windowData.id] ?? {
        left: windowData.left,
        top: windowData.top,
      };

      const maxZIndex = Math.max(
        0,
        ...currentWindows.map((window) => window.zIndex || 1)
      );

      return [
        ...currentWindows,
        {
          ...windowData,
          left: savedPosition.left,
          top: savedPosition.top,
          zIndex: maxZIndex + 1,
        },
      ];
    });
  }

  function bringWindowToFront(windowId) {
    setOpenWindows((currentWindows) => {
      const maxZIndex = Math.max(
        ...currentWindows.map((window) => window.zIndex || 1)
      );

      return currentWindows.map((window) =>
        window.id === windowId
          ? {
              ...window,
              zIndex: maxZIndex + 1,
            }
          : window
      );
    });
  }



  return (
    <main className="desktop">
      <Topbar currentDate={currentDate} formatTopbarDate={formatTopbarDate} />

      <DesktopGrid
        gridRef={gridRef}
        desktopItems={desktopItems}
        draggedItemId={draggedItemId}
        handleItemDoubleClick={handleItemDoubleClick}
        handlePointerDown={handlePointerDown}
        handlePointerUp={handlePointerUp}
        setDraggedItemId={setDraggedItemId}
      />

      <section ref={floatingLayerRef} className="desktop-floating-layer">
        {openWindows.map((window) => (
          <article
            key={window.id}
            className={`floating-window ${
              window.type === "document"
                ? "document-window"
                : window.type === "terminal"
                  ? "terminal-window"
                  : window.type === "folder-window"
                    ? "folder-window"
                    : `sticky-window sticky-window-${window.type}`
            }`}
            onPointerDown={(event) => handleWindowPointerDown(event, window.id)}
            onPointerMove={handleWindowPointerMove}
            onPointerUp={handleWindowPointerUp}
            onPointerCancel={() => setDraggingWindow(null)}
            style={{
              left: window.left,
              top: window.top,
              width: window.width,
              height: window.height,
              zIndex: window.zIndex || 1,
            }}
          >
            {window.type !== "document" &&
              window.type !== "terminal" &&
              window.type !== "folder-window" && (
              <div className="sticky-window-header">
                <div className="sticky-window-header-left">
                  <img src="/icons/noteHeader/square-left.svg" alt="" />
                </div>

                <div className="sticky-window-header-right">
                  <img src="/icons/noteHeader/triangle-right.svg" alt="" />

                  <button
                    className="sticky-window-close"
                    onPointerDown={(event) => event.stopPropagation()}
                    onClick={() => closeWindow(window.id)}
                  >
                    <img src="/icons/noteHeader/square-right.svg" alt="" />
                  </button>
                </div>
              </div>
            )}

            {window.type === "welcome" && (
              <div className="welcome-window-content">
                <img
                  className="welcome-window-image"
                  src="/images/talkingHeads.png"
                  alt=""
                  draggable="false"
                />

                <div className="welcome-window-text">
                  <p>/**</p>
                  <p> * <strong>Bienvenido a mi [portfolio]</strong></p>
                  <p> *</p>
                  <p> * Soy <strong>Javier Serrano</strong>,</p>
                  <p>
                    {" "}
                    * estudiante de <strong>Tecnologías Interactivas</strong> en
                    la UPV.
                  </p>
                  <p> *</p>
                  <p> * Haz clic en los iconos para explorar el escritorio.</p>
                  <p> */</p>
                </div>
              </div>
            )}

            {window.type === "profile" && (
              <div className="profile-window-content">
                <div className="profile-window-text">
                  <p>/**</p>
                  <p> * [profile.js]</p>
                  <p> *</p>
                  <p>
                    {" "}
                    * <strong>Desarrollador de software</strong> en formación,
                  </p>
                  <p>
                    {" "}
                    * interesado en crear <strong>sistemas interactivos</strong>
                  </p>
                  <p>
                    {" "}
                    * que conecten <strong>web</strong>, <strong>datos</strong>,
                    sensores y robótica.
                  </p>
                  <p> *</p>
                  <p> * Trabajo con tecnologías frontend, backend,</p>
                  <p>
                    {" "}
                    * IoT, <strong>visión artificial</strong> y entornos
                    simulados.
                  </p>
                  <p> */</p>
                </div>

                <img
                  className="profile-window-image"
                  src="/images/caballoSticky.png"
                  alt=""
                  draggable="false"
                />
              </div>
            )}

            {window.type === "document" && (
              <DocumentWindow window={window} closeWindow={closeWindow} />
            )}

            {window.type === "terminal" && (
              <TerminalWindow window={window} closeWindow={closeWindow} />
            )}

            {window.type === "folder-window" && (
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

                    <p className="folder-sidebar-section folder-sidebar-system">Sistema</p>
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
            )}
          </article>
        ))}
      </section>
    </main>
  );
}

export default App;