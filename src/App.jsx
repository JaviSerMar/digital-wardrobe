import { useEffect, useRef, useState } from "react";
import "./App.css";
import { initialDesktopItems } from "./data/desktopItems";
import ProfilePanel from "./components/ProfilePanel";

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

import FolderWindow from "./components/FolderWindow";
import StickyWindow from "./components/StickyWindow";
import ImageWidget from "./components/ImageWidget";

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
  const [isProfilePanelOpen, setIsProfilePanelOpen] = useState(false);

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
              title: folderScreen.path,
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

  function toggleProfilePanel() {
    setIsProfilePanelOpen((currentState) => !currentState);
  }



  return (
    <main className="desktop">
      <Topbar
        currentDate={currentDate}
        formatTopbarDate={formatTopbarDate}
        toggleProfilePanel={toggleProfilePanel}
        isProfilePanelOpen={isProfilePanelOpen}
      />

      {isProfilePanelOpen && (
        <ProfilePanel onClose={() => setIsProfilePanelOpen(false)} />
      )}

      <DesktopGrid
        gridRef={gridRef}
        desktopItems={desktopItems}
        draggedItemId={draggedItemId}
        handleItemDoubleClick={handleItemDoubleClick}
        handlePointerDown={handlePointerDown}
        handlePointerUp={handlePointerUp}
        setDraggedItemId={setDraggedItemId}
      />

      <ImageWidget />

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
            {(window.type === "welcome" || window.type === "profile") && (
              <StickyWindow window={window} closeWindow={closeWindow} />
            )}

            {window.type === "document" && (
              <DocumentWindow window={window} closeWindow={closeWindow} />
            )}

            {window.type === "terminal" && (
              <TerminalWindow window={window} closeWindow={closeWindow} />
            )}

          {window.type === "folder-window" && (
            <FolderWindow
              window={window}
              closeWindow={closeWindow}
              openFolderScreen={openFolderScreen}
              openWindowByKey={openWindowByKey}
              setOpenWindows={setOpenWindows}
            />
          )}  
          </article>
        ))}
      </section>
    </main>
  );
}

export default App;