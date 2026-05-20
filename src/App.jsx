import { useRef, useState } from "react";
import "./App.css";

const initialDesktopItems = [
  {
    id: "rules",
    type: "folder",
    label: "reglas",
    icon: "/icons/folder.png",
    x: 0,
    y: 0,
  },
  {
    id: "socials",
    type: "folder",
    label: "@redes",
    icon: "/icons/folder.png",
    x: 0,
    y: 1,
  },
  {
    id: "playlist",
    type: "folder",
    label: "playlist",
    icon: "/icons/folder.png",
    x: 0,
    y: 2,
  },
  {
    id: "readme",
    type: "file",
    label: "README.txt",
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
    id: "game",
    type: "app",
    label: "digital_wardrobe",
    icon: "/icons/iconoDigitalWardrobe.png",
    x: 7,
    y: 2,
  },
  {
    id: "sketch-note",
    type: "note",
    label: "sketch01",
    icon: "/icons/stickyNote.png",
    x: 9,
    y: 1,
  },
  {
    id: "tasks-note",
    type: "note",
    label: "tareas",
    icon: "/icons/stickyNote.png",
    x: 9,
    y: 2,
  },
];

const stickyNotesData = {
  "sketch-note": {
    id: "sketch-note-window",
    title: "sketch01",
    type: "sketch",
    left: 170,
    top: 75,
    width: 320,
    height: 180,
  },
  "tasks-note": {
    id: "tasks-note-window",
    title: "tareas",
    type: "tasks",
    left: 690,
    top: 395,
    width: 480,
    height: 160,
  },
};

function App() {
  const gridRef = useRef(null);
  const floatingLayerRef = useRef(null);

  const [desktopItems, setDesktopItems] = useState(initialDesktopItems);
  const [draggedItemId, setDraggedItemId] = useState(null);
  const [openWindows, setOpenWindows] = useState([]);
  const [draggingWindow, setDraggingWindow] = useState(null);

  const [windowPositions, setWindowPositions] = useState(() =>
    Object.fromEntries(
      Object.values(stickyNotesData).map((note) => [
        note.id,
        {
          left: note.left,
          top: note.top,
        },
      ])
    )
  );

  const columns = 12;
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

      if (isCellOccupied) {
        return currentItems;
      }

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

    if (!noteData) return;

    setOpenWindows((currentWindows) => {
      const alreadyOpen = currentWindows.some(
        (window) => window.id === noteData.id
      );

      if (alreadyOpen) {
        return currentWindows;
      }

      const savedPosition = windowPositions[noteData.id] ?? {
        left: noteData.left,
        top: noteData.top,
      };

      return [
        ...currentWindows,
        {
          ...noteData,
          left: savedPosition.left,
          top: savedPosition.top,
        },
      ];
    });
  }

  function handleWindowPointerDown(event, windowId) {
    const windowElement = event.currentTarget.closest(".sticky-window");

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

  return (
    <main className="desktop">
      <header className="topbar">
        <div className="topbar-left">
          <button className="topbar-item topbar-logo-item">
            <img
              className="topbar-logo"
              src="/icons/topbar/wardrobe_os1.png"
              alt="Wardrobe OS"
              draggable="false"
            />
          </button>

          <button className="topbar-item topbar-title">Wardrobe OS</button>
          <button className="topbar-item">Archivo</button>
          <button className="topbar-item">Edición</button>
          <button className="topbar-item">Visualización</button>
          <button className="topbar-item">Ventana</button>
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
                className="desktop-item-icon"
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
            className={`sticky-window sticky-window-${window.type}`}
            style={{
              left: window.left,
              top: window.top,
              width: window.width,
              height: window.height,
            }}
          >
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
                  onClick={() =>
                    setOpenWindows((currentWindows) =>
                      currentWindows.filter(
                        (currentWindow) => currentWindow.id !== window.id
                      )
                    )
                  }
                >
                  <img src="/icons/noteHeader/square-right.svg" alt="" />
                </button>
              </div>
            </div>

            {window.type === "sketch" && (
              <div className="sketch-window-content">
                <img
                  className="sketch-character"
                  src="/images/talkingHeads.png"
                  alt=""
                  draggable="false"
                />

                <div className="sketch-window-text">
                  <p>// SKETCH_01</p>
                  <p>// ----------------------</p>
                  <p>// Boceto de personaje</p>
                  <p>// pendiente de integrar</p>
                </div>
              </div>
            )}

            {window.type === "tasks" && (
              <div className="tasks-window-content">
                <div className="tasks-window-text">
                  <p>/* TAREAS</p>
                  <p>--------------------------</p>
                  <p>Abrir Digital Wardrobe</p>
                  <p>Revisar iconos</p>
                  <p>Pulir animaciones</p>
                  <p>*/</p>
                </div>

                <img
                  className="tasks-window-image"
                  src="/images/caballoSticky.png"
                  alt=""
                  draggable="false"
                />
              </div>
            )}
          </article>
        ))}
      </section>
    </main>
  );
}

export default App;