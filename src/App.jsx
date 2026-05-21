import { useRef, useState } from "react";
import "./App.css";

const initialDesktopItems = [
  {
    id: "projects",
    type: "folder",
    label: "proyectos",
    icon: "/icons/folder.png",
    x: 0,
    y: 0,
  },
  {
    id: "skills",
    type: "folder",
    label: "skills",
    icon: "/icons/folder.png",
    x: 0,
    y: 1,
  },
  {
    id: "contact",
    type: "folder",
    label: "@contacto",
    icon: "/icons/folder.png",
    x: 0,
    y: 2,
  },
  {
    id: "about",
    type: "file",
    label: "sobre mi",
    icon: "/icons/archivoTxt.png",
    x: 0,
    y: 3,
  },
  {
    id: "trash",
    type: "trash",
    label: "papelera",
    icon: "/icons/papelera.png",
    x: 0,
    y: 4,
  },
  {
    id: "terminal",
    type: "app",
    label: "terminal",
    icon: "/icons/terminal.png",
    x: 1,
    y: 2,
  },
  {
    id: "skills-file",
    type: "file",
    label: "habilidades.txt",
    icon: "/icons/archivoTxt.png",
    x: 1,
    y: 3,
  },
  {
    id: "welcome-note",
    type: "note",
    label: "bienvenida",
    icon: "/icons/stickyNote.png",
    x: 8,
    y: 2,
  },
  {
    id: "profile-note",
    type: "note",
    label: "profile.js",
    icon: "/icons/stickyNote.png",
    x: 9,
    y: 2,
  },
  {
    id: "cooking",
    type: "app",
    label: "cocinando",
    icon: "/icons/cocinando.png",
    x: 13,
    y: 0,
  },
];

const stickyNotesData = {
  "welcome-note": {
    id: "welcome-note-window",
    title: "bienvenida",
    type: "welcome",
    left: 170,
    top: 58,
    width: 455,
    height: 155,
  },
  "profile-note": {
    id: "profile-note-window",
    title: "profile.js",
    type: "profile",
    left: 620,
    top: 360,
    width: 540,
    height: 190,
  },
};

const documentWindowsData = {
  about: {
    id: "about-window",
    title: "sobre mi",
    type: "document",
    left: 300,
    top: 120,
    width: 760,
    height: 430,
  },
  "skills-file": {
    id: "skills-file-window",
    title: "habilidades.txt",
    type: "document",
    left: 340,
    top: 150,
    width: 760,
    height: 650,
  },
};

function DocumentHeader({ title, onClose, onDragStart, onDragMove, onDragEnd }) {
  return (
    <div className="document-header">
      <div
        className="document-titlebar"
        onPointerDown={onDragStart}
        onPointerMove={onDragMove}
        onPointerUp={onDragEnd}
        onPointerCancel={onDragEnd}
      >
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

  const [windowPositions, setWindowPositions] = useState(() =>
    Object.fromEntries(
      [...Object.values(stickyNotesData), ...Object.values(documentWindowsData)].map(
        (window) => [
          window.id,
          {
            left: window.left,
            top: window.top,
          },
        ]
      )
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
    const windowData = noteData || documentData;

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
      <header className="topbar">
        <div className="topbar-left">
          <button className="topbar-item topbar-logo-item">
            <img
              className="topbar-logo"
              src="/icons/topbar/wardrobe_os1.png"
              alt="[portfolio]"
              draggable="false"
            />
          </button>

          <button className="topbar-item topbar-title">[portfolio]</button>
          <button className="topbar-item">Proyectos</button>
          <button className="topbar-item">Archivo</button>
          <button className="topbar-item">Contacto</button>
          <button className="topbar-item">Ayuda</button>
        </div>

        <div className="topbar-right">
          <button className="topbar-item topbar-icon-button">
            <img
              className="topbar-small-icon"
              src="/icons/topbar/iconoCentroControl.png"
              alt=""
              draggable="false"
            />
          </button>

          <button className="topbar-item topbar-icon-button">
            <img
              className="topbar-small-icon"
              src="/icons/topbar/iconoNotificaciones.png"
              alt=""
              draggable="false"
            />
          </button>

          <button className="topbar-item topbar-icon-button">
            <img
              className="topbar-small-icon"
              src="/icons/topbar/iconoPerfil.png"
              alt=""
              draggable="false"
            />
          </button>

          <button className="topbar-item topbar-date">
            lunes 18 mayo 15:56
          </button>
        </div>
      </header>

      <section ref={gridRef} className="desktop-grid">
        {desktopItems.map((item) => (
          <button
            key={item.id}
            className={`desktop-item desktop-item-${item.type} ${
              draggedItemId === item.id ? "is-dragging" : ""
            }`}
            onDoubleClick={() => handleItemDoubleClick(item)}
            onPointerDown={(event) => handlePointerDown(event, item.id)}
            onPointerUp={(event) => handlePointerUp(event, item.id)}
            onPointerCancel={() => setDraggedItemId(null)}
            style={{
              gridColumn: item.x + 1,
              gridRow: item.y + 1,
            }}
          >
            <div className="desktop-item-content">
              <img
                className={`desktop-item-icon ${
                  item.id === "cooking" ? "desktop-item-icon-cooking" : ""
                }`}
                src={item.icon}
                alt=""
                draggable="false"
              />
              <span>{item.label}</span>
            </div>
          </button>
        ))}
      </section>

      <section ref={floatingLayerRef} className="desktop-floating-layer">
        {openWindows.map((window) => (
          <article
            key={window.id}
            className={`floating-window ${
              window.type === "document"
                ? "document-window"
                : `sticky-window sticky-window-${window.type}`
            }`}
            style={{
              left: window.left,
              top: window.top,
              width: window.width,
              height: window.height,
              zIndex: window.zIndex || 1,
            }}
          >
            {window.type !== "document" && (
              <div
                className="sticky-window-header"
                onPointerDown={(event) =>
                  handleWindowPointerDown(event, window.id)
                }
                onPointerMove={handleWindowPointerMove}
                onPointerUp={handleWindowPointerUp}
                onPointerCancel={() => setDraggingWindow(null)}
              >
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
              <div className="document-window-content">
                <DocumentHeader
                  title={window.title}
                  onClose={() => closeWindow(window.id)}
                  onDragStart={(event) =>
                    handleWindowPointerDown(event, window.id)
                  }
                  onDragMove={handleWindowPointerMove}
                  onDragEnd={handleWindowPointerUp}
                />

                <div className="document-body">
                  {window.id === "skills-file-window" && (
                    <pre className="document-code-text">{`              { skills }
                  ├── web / backend
                  │   ├── React
                  │   ├── Node.js
                  │   ├── API REST
                  │   └── WebSocket
                  │
                  ├── IA / robótica
                  │   ├── ROS2
                  │   ├── Nav2
                  │   └── OpenCV
                  │
                  ├── datos / cloud
                  │   ├── PostgreSQL
                  │   ├── Firebase
                  │   └── AWS
                  │
                  ├── lenguajes
                  │   ├── Python
                  │   ├── Java
                  │   ├── C++
                  │   └── JavaScript
                  │
                  └── tools
                      ├── Docker
                      ├── Git
                      ├── Linux
                      └── Figma`}</pre>
                  )}

                  {window.id === "about-window" && (
                    <p>Contenido provisional del documento.</p>
                  )}
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