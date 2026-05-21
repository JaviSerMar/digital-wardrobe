import { useEffect, useRef, useState } from "react";
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
    y: 5,
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
  {
    id: "digital-wardrobe",
    type: "app",
    label: "digital_wardrobe",
    icon: "/icons/iconoDigitalWardrobe.png",
    x: 0,
    y: 4,
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
  "velaris-readme": {
    id: "velaris-readme-window",
    title: "README.txt",
    type: "document",
    left: 360,
    top: 90,
    width: 620,
    height: 590,
  },
};

const terminalWindowsData = {
  terminal: {
    id: "terminal-window",
    title: "terminal",
    type: "terminal",
    left: 360,
    top: 140,
    width: 620,
    height: 380,
  },
};

const folderWindowsData = {
  projects: {
    id: "projects-window",
    title: "proyectos",
    type: "folder-window",
    currentFolder: "projects",
    left: 260,
    top: 90,
    width: 760,
    height: 430,
    items: [
      {
        id: "velaris-folder",
        type: "folder",
        label: "velaris",
        icon: "/icons/folder.png",
        targetFolder: "velaris",
      },
      {
        id: "airmonitor-folder",
        type: "folder",
        label: "airmonitor",
        icon: "/icons/folder.png",
        targetFolder: "airmonitor",
      },
      {
        id: "bancotech-folder",
        type: "folder",
        label: "bancotech",
        icon: "/icons/folder.png",
        targetFolder: "bancotech",
      },
    ],
  },

  skills: {
    id: "skills-window",
    title: "skills",
    type: "folder-window",
    left: 290,
    top: 120,
    width: 760,
    height: 430,
    items: [
      {
        id: "habilidades-file",
        label: "habilidades.txt",
        icon: "/icons/archivoTxt.png",
      },
    ],
  },

  contact: {
    id: "contact-window",
    title: "@contacto",
    type: "folder-window",
    left: 320,
    top: 150,
    width: 760,
    height: 430,
    items: [
      {
        id: "email-file",
        label: "email.txt",
        icon: "/icons/archivoTxt.png",
      },
      {
        id: "github-file",
        label: "github.url",
        icon: "/icons/archivoTxt.png",
      },
      {
        id: "linkedin-file",
        label: "linkedin.url",
        icon: "/icons/archivoTxt.png",
      },
    ],
  },
};

const projectFolderScreens = {
  velaris: {
    title: "velaris",
    items: [
      {
        id: "velaris-readme",
        label: "README.txt",
        icon: "/icons/archivoTxt.png",
        openWindowKey: "velaris-readme",
      },
      {
        id: "velaris-stack",
        label: "stack.txt",
        icon: "/icons/archivoTxt.png",
      },
      {
        id: "velaris-media",
        label: "capturas",
        icon: "/icons/folder.png",
      },
    ],
  },

  airmonitor: {
    title: "airmonitor",
    items: [
      {
        id: "airmonitor-readme",
        label: "README.txt",
        icon: "/icons/archivoTxt.png",
      },
      {
        id: "airmonitor-stack",
        label: "stack.txt",
        icon: "/icons/archivoTxt.png",
      },
      {
        id: "airmonitor-media",
        label: "capturas",
        icon: "/icons/folder.png",
      },
    ],
  },

  bancotech: {
    title: "bancotech",
    items: [
      {
        id: "bancotech-readme",
        label: "README.txt",
        icon: "/icons/archivoTxt.png",
      },
      {
        id: "bancotech-stack",
        label: "stack.txt",
        icon: "/icons/archivoTxt.png",
      },
      {
        id: "bancotech-media",
        label: "capturas",
        icon: "/icons/folder.png",
      },
    ],
  },
};



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
            {formatTopbarDate(currentDate)}
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
                <div className="document-window-content">
                                <DocumentHeader
                  title={window.title}
                  onClose={() => closeWindow(window.id)}
                />

                <div
                  className={`document-body ${
                    window.id === "skills-file-window" ? "document-body-no-scroll" : ""
                  }`}
                >                
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

                  {window.id === "velaris-readme-window" && (
                    <article className="velaris-readme-content">
                      <img
                        className="velaris-readme-cover"
                        src="/projects/velaris/turtlebotRectangular.png"
                        alt="Velaris project preview"
                        draggable="false"
                      />

                      <h1>VELARIS</h1>

                      <p>
                        <strong>Robot móvil autónomo de vigilancia</strong> para entornos tipo
                        almacén.
                      </p>

                      <p>
                        <strong>Velaris</strong> combina robótica, simulación, visión artificial y
                        desarrollo web en un sistema capaz de patrullar un espacio, mostrar
                        información en tiempo real y ser controlado desde una interfaz web.
                      </p>

                      <p>
                        El robot funciona en un almacén simulado con <strong>Gazebo</strong>.{" "}
                        <strong>ROS2</strong> coordina el sistema y <strong>Nav2</strong> permite
                        la navegación autónoma por el mapa.
                      </p>

                      <p>
                        Desde la web se puede ver la cámara, consultar el mapa, revisar el estado
                        del robot, iniciar patrullas y enviar comandos de movimiento.
                      </p>

                      <p>
                        También incorpora <strong>OpenCV</strong> para capturar y procesar imágenes
                        durante las patrullas, preparando la base para futuras detecciones mediante
                        inteligencia artificial.
                      </p>

                      <h2>TECNOLOGÍAS</h2>

                      <p>
                        <strong>
                          Python · ROS2 · Nav2 · Gazebo · RViz · OpenCV · Vite · WebSocket
                          · AWS Cloud
                        </strong>
                      </p>
                    </article>
                  )}

                </div>
              </div>
            )}

            {window.type === "terminal" && (
              <div className="terminal-window-content">
                <div className="terminal-header">
                  <div className="terminal-buttons">
                    <button
                      className="terminal-button terminal-close"
                      type="button"
                      onPointerDown={(event) => event.stopPropagation()}
                      onClick={() => closeWindow(window.id)}
                      aria-label="Cerrar terminal"
                    />

                    <button
                      className="terminal-button terminal-minimize"
                      type="button"
                      aria-label="Minimizar"
                    />

                    <button
                      className="terminal-button terminal-maximize"
                      type="button"
                      aria-label="Maximizar"
                    />
                  </div>

                  <span className="terminal-title">terminal — [javier serrano]</span>
                </div>

                <div className="terminal-body">
                  <p className="terminal-line">Last login: portfolio desktop</p>
                  <p className="terminal-line">Type <span>help</span> to explore.</p>
                  <p className="terminal-line"></p>
                  <p className="terminal-line">
                    <span className="terminal-prompt">javier@portfolio</span>:~$ help
                  </p>
                  <p className="terminal-line">available commands:</p>
                  <p className="terminal-line">about · projects · skills · contact · clear</p>
                  <p className="terminal-line"></p>
                  <p className="terminal-line">
                    <span className="terminal-prompt">javier@portfolio</span>:~$ <span className="terminal-cursor">_</span>
                  </p>
                </div>
              </div>
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