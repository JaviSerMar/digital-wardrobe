import { useEffect, useRef, useState } from "react";
import "./App.css";

import AppWindow from "./components/AppWindow";
import DesktopGrid from "./components/DesktopGrid";
import DockBar from "./components/DockBar";
import DocumentWindow from "./components/DocumentWindow";
import FolderWindow from "./components/FolderWindow";
import GalleryViewer from "./components/GalleryViewer";
import ImageViewer from "./components/ImageViewer";
import ImageWidget from "./components/ImageWidget";
import ReleaseToast from "./components/ReleaseToast";
import StickyWindow from "./components/StickyWindow";
import TerminalWindow from "./components/TerminalWindow";
import Topbar from "./components/Topbar";

import { initialDesktopItems } from "./data/desktopItems";
import {
  imageGalleries,
  projectFolderScreens,
} from "./data/projectFolders";

import {
  documentWindowsData,
  folderWindowsData,
  stickyNotesData,
  terminalWindowsData,
} from "./data/windowsData";

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
  const [isNotificationsPanelOpen, setIsNotificationsPanelOpen] =
    useState(false);
  const [isControlCenterPanelOpen, setIsControlCenterPanelOpen] =
    useState(false);
  const [isCalendarPanelOpen, setIsCalendarPanelOpen] = useState(false);

  const [isDockVisible, setIsDockVisible] = useState(() => {
    const savedDockVisibility = localStorage.getItem(
      "portfolio-dock-visible"
    );

    return savedDockVisibility !== "false";
  });

  const [activeTopbarMenu, setActiveTopbarMenu] = useState(null);

  const [isReleaseToastVisible, setIsReleaseToastVisible] = useState(true);

  const [viewerImages, setViewerImages] = useState([]);
  const [viewerSelectedIndex, setViewerSelectedIndex] = useState(0);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

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

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (!isReleaseToastVisible) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setIsReleaseToastVisible(false);
    }, 15000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isReleaseToastVisible]);

  useEffect(() => {
    localStorage.setItem(
      "portfolio-dock-visible",
      String(isDockVisible)
    );
  }, [isDockVisible]);

  const columns = 14;
  const rows = 7;
  const cellWidth = 86;
  const cellHeight = 96;
  const columnGap = 20;
  const rowGap = 10;

  function moveItemToPointer(itemId, event) {
    if (!gridRef.current) {
      return;
    }

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
          item.id !== itemId &&
          item.x === limitedX &&
          item.y === limitedY
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
    const documentData = documentWindowsData[item.id];
    const terminalData = terminalWindowsData[item.id];
    const folderData = folderWindowsData[item.id];

    const windowData =
      noteData ||
      documentData ||
      terminalData ||
      folderData;

    if (!windowData) {
      return;
    }

    setOpenWindows((currentWindows) => {
      const alreadyOpen = currentWindows.some(
        (window) => window.id === windowData.id
      );

      if (alreadyOpen) {
        return currentWindows;
      }

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

    const windowElement = event.currentTarget.closest(
      ".floating-window"
    );

    if (!windowElement) {
      return;
    }

    const windowRect = windowElement.getBoundingClientRect();

    setDraggingWindow({
      id: windowId,
      offsetX: event.clientX - windowRect.left,
      offsetY: event.clientY - windowRect.top,
    });

    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handleWindowPointerMove(event) {
    if (!draggingWindow || !floatingLayerRef.current) {
      return;
    }

    const layerRect =
      floatingLayerRef.current.getBoundingClientRect();

    const newLeft =
      event.clientX -
      layerRect.left -
      draggingWindow.offsetX;

    const newTop =
      event.clientY -
      layerRect.top -
      draggingWindow.offsetY;

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
      currentWindows.filter(
        (currentWindow) => currentWindow.id !== windowId
      )
    );
  }

  function toggleCalendarPanel() {
    setIsCalendarPanelOpen((currentState) => !currentState);
    setIsProfilePanelOpen(false);
    setIsNotificationsPanelOpen(false);
    setIsControlCenterPanelOpen(false);
    setActiveTopbarMenu(null);
  }

  function openImageViewer(images, selectedIndex) {
    setViewerImages(images);
    setViewerSelectedIndex(selectedIndex);
    setIsImageViewerOpen(true);
  }

  function openImageGallery(galleryKey, selectedIndex = 0) {
    const galleryData = imageGalleries[galleryKey];

    const items = Array.isArray(galleryData)
      ? galleryData
      : galleryData?.items;

    if (!Array.isArray(items) || items.length === 0) {
      return;
    }

    const safeSelectedIndex =
      Number.isInteger(selectedIndex) &&
      selectedIndex >= 0 &&
      selectedIndex < items.length
        ? selectedIndex
        : 0;

    const galleryConfig = Array.isArray(galleryData)
      ? {}
      : galleryData;

    const galleryWindowId = `gallery-${galleryKey}-window`;

    const savedPosition = windowPositions[galleryWindowId] ?? {
      left: galleryConfig.left ?? 160,
      top: galleryConfig.top ?? 70,
    };

    setOpenWindows((currentWindows) => {
      const maxZIndex = Math.max(
        0,
        ...currentWindows.map((window) => window.zIndex || 1)
      );

      const galleryIsAlreadyOpen = currentWindows.some(
        (window) => window.id === galleryWindowId
      );

      if (galleryIsAlreadyOpen) {
        return currentWindows.map((window) =>
          window.id === galleryWindowId
            ? {
                ...window,
                items,
                selectedIndex: safeSelectedIndex,
                zIndex: maxZIndex + 1,
              }
            : window
        );
      }

      return [
        ...currentWindows,
        {
          id: galleryWindowId,
          type: "gallery",
          galleryKey,
          title: galleryConfig.title ?? galleryKey,
          items,
          selectedIndex: safeSelectedIndex,
          iconSrc:
            galleryConfig.iconSrc ??
            "/icons/iconoFoto.png",
          changeOnHover:
            galleryConfig.changeOnHover ?? true,
          ariaLabel:
            galleryConfig.ariaLabel ??
            "Galería de imágenes",
          left: savedPosition.left,
          top: savedPosition.top,
          width: galleryConfig.width ?? 980,
          height: galleryConfig.height ?? 650,
          zIndex: maxZIndex + 1,
        },
      ];
    });
  }

  function selectGalleryItem(windowId, selectedIndex) {
    setOpenWindows((currentWindows) =>
      currentWindows.map((window) =>
        window.id === windowId &&
        window.type === "gallery"
          ? {
              ...window,
              selectedIndex,
            }
          : window
      )
    );
  }

  function closeImageViewer() {
    setIsImageViewerOpen(false);
    setViewerImages([]);
    setViewerSelectedIndex(0);
  }

  function openFolderScreen(windowId, targetFolder) {
    const folderScreen = projectFolderScreens[targetFolder];

    if (!folderScreen) {
      return;
    }

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

    if (!windowData) {
      return;
    }

    setOpenWindows((currentWindows) => {
      const alreadyOpen = currentWindows.some(
        (window) => window.id === windowData.id
      );

      if (alreadyOpen) {
        return currentWindows;
      }

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
        0,
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

  function toggleControlCenterPanel() {
    setIsControlCenterPanelOpen((currentState) => !currentState);
    setIsNotificationsPanelOpen(false);
    setIsProfilePanelOpen(false);
    setIsCalendarPanelOpen(false);
    setActiveTopbarMenu(null);
  }

  function toggleProfilePanel() {
    setIsProfilePanelOpen((currentState) => !currentState);
    setIsNotificationsPanelOpen(false);
    setIsControlCenterPanelOpen(false);
    setIsCalendarPanelOpen(false);
    setActiveTopbarMenu(null);
  }

  function toggleTopbarMenu(menuName) {
    setActiveTopbarMenu((currentMenu) =>
      currentMenu === menuName ? null : menuName
    );

    setIsProfilePanelOpen(false);
    setIsNotificationsPanelOpen(false);
    setIsControlCenterPanelOpen(false);
    setIsCalendarPanelOpen(false);
  }

  function toggleNotificationsPanel() {
    setIsNotificationsPanelOpen(
      (currentState) => !currentState
    );

    setIsProfilePanelOpen(false);
    setIsControlCenterPanelOpen(false);
    setIsCalendarPanelOpen(false);
    setActiveTopbarMenu(null);
  }

  function toggleDock() {
    setIsDockVisible((currentState) => !currentState);
  }

  function openVelarisFromToast() {
    const projectsWindow = folderWindowsData.projects;
    const velarisScreen = projectFolderScreens.velaris;

    if (!velarisScreen) {
      return;
    }

    setIsReleaseToastVisible(false);

    setOpenWindows((currentWindows) => {
      const maxZIndex = Math.max(
        0,
        ...currentWindows.map((window) => window.zIndex || 1)
      );

      const projectsWindowIsOpen = currentWindows.some(
        (window) => window.id === projectsWindow.id
      );

      if (projectsWindowIsOpen) {
        return currentWindows.map((window) =>
          window.id === projectsWindow.id
            ? {
                ...window,
                title: velarisScreen.path,
                currentFolder: "velaris",
                items: velarisScreen.items,
                zIndex: maxZIndex + 1,
              }
            : window
        );
      }

      const savedPosition =
        windowPositions[projectsWindow.id] ?? {
          left: projectsWindow.left,
          top: projectsWindow.top,
        };

      return [
        ...currentWindows,
        {
          ...projectsWindow,
          title: velarisScreen.path,
          currentFolder: "velaris",
          items: velarisScreen.items,
          left: savedPosition.left,
          top: savedPosition.top,
          zIndex: maxZIndex + 1,
        },
      ];
    });
  }

  return (
    <main className="desktop">
      <Topbar
        currentDate={currentDate}
        formatTopbarDate={formatTopbarDate}
        toggleControlCenterPanel={toggleControlCenterPanel}
        isControlCenterPanelOpen={isControlCenterPanelOpen}
        toggleProfilePanel={toggleProfilePanel}
        isProfilePanelOpen={isProfilePanelOpen}
        toggleNotificationsPanel={toggleNotificationsPanel}
        isNotificationsPanelOpen={isNotificationsPanelOpen}
        activeTopbarMenu={activeTopbarMenu}
        toggleTopbarMenu={toggleTopbarMenu}
        setActiveTopbarMenu={setActiveTopbarMenu}
        toggleCalendarPanel={toggleCalendarPanel}
        isCalendarPanelOpen={isCalendarPanelOpen}
        isDockVisible={isDockVisible}
        toggleDock={toggleDock}
      />

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

      <DockBar isVisible={isDockVisible} />

      {isImageViewerOpen && (
        <ImageViewer
          images={viewerImages}
          selectedIndex={viewerSelectedIndex}
          onSelectImage={setViewerSelectedIndex}
          onClose={closeImageViewer}
        />
      )}

      {isReleaseToastVisible && (
        <ReleaseToast
          onOpenProject={openVelarisFromToast}
          onClose={() => setIsReleaseToastVisible(false)}
        />
      )}

      <section
        ref={floatingLayerRef}
        className="desktop-floating-layer"
      >
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
                    : window.type === "app"
                      ? "app-window"
                      : window.type === "gallery"
                        ? "gallery-window"
                        : `sticky-window sticky-window-${window.type}`
            }`}
            onPointerDown={(event) =>
              handleWindowPointerDown(event, window.id)
            }
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
            {(window.type === "welcome" ||
              window.type === "profile") && (
              <StickyWindow
                window={window}
                closeWindow={closeWindow}
              />
            )}

            {window.type === "document" && (
              <DocumentWindow
                window={window}
                closeWindow={closeWindow}
                onOpenImageViewer={openImageViewer}
              />
            )}

            {window.type === "terminal" && (
              <TerminalWindow
                window={window}
                closeWindow={closeWindow}
              />
            )}

            {window.type === "folder-window" && (
              <FolderWindow
                window={window}
                closeWindow={closeWindow}
                openFolderScreen={openFolderScreen}
                openWindowByKey={openWindowByKey}
                openImageGallery={openImageGallery}
                setOpenWindows={setOpenWindows}
              />
            )}

            {window.type === "app" && (
              <AppWindow
                window={window}
                closeWindow={closeWindow}
              />
            )}

            {window.type === "gallery" && (
              <GalleryViewer
                items={window.items}
                selectedIndex={window.selectedIndex}
                onSelectItem={(selectedIndex) =>
                  selectGalleryItem(
                    window.id,
                    selectedIndex
                  )
                }
                onClose={() => closeWindow(window.id)}
                iconSrc={window.iconSrc}
                changeOnHover={window.changeOnHover}
                ariaLabel={window.ariaLabel}
              />
            )}
          </article>
        ))}
      </section>
    </main>
  );
}

export default App;