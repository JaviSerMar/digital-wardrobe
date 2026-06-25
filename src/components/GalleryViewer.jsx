import { useEffect, useRef } from "react";

function getItemTitle(item, index) {
  if (item.title) {
    return item.title;
  }

  if (item.label) {
    return item.label;
  }

  if (item.src) {
    const fileName = item.src.split("/").pop();

    if (fileName) {
      return fileName;
    }
  }

  return `Imagen ${index + 1}`;
}

function GalleryViewer({
  items = [],
  selectedIndex = 0,
  onSelectItem,
  onClose,
  iconSrc = "/icons/iconoFoto2.png",
  sidebarIconSrc = "/icons/iconoFoto2.png",
  changeOnHover = true,
  ariaLabel = "Galería de imágenes",
}) {
  const thumbnailRefs = useRef([]);
  const selectedItem = items[selectedIndex];

  useEffect(() => {
    if (items.length === 0) {
      return undefined;
    }

    function selectPreviousItem() {
      const previousIndex =
        selectedIndex === 0
          ? items.length - 1
          : selectedIndex - 1;

      onSelectItem(previousIndex);
    }

    function selectNextItem() {
      const nextIndex =
        selectedIndex === items.length - 1
          ? 0
          : selectedIndex + 1;

      onSelectItem(nextIndex);
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (
        event.key === "ArrowUp" ||
        event.key === "ArrowLeft"
      ) {
        event.preventDefault();
        selectPreviousItem();
        return;
      }

      if (
        event.key === "ArrowDown" ||
        event.key === "ArrowRight"
      ) {
        event.preventDefault();
        selectNextItem();
        return;
      }

      if (event.key === "Home") {
        event.preventDefault();
        onSelectItem(0);
        return;
      }

      if (event.key === "End") {
        event.preventDefault();
        onSelectItem(items.length - 1);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    items.length,
    selectedIndex,
    onSelectItem,
    onClose,
  ]);

  useEffect(() => {
    const selectedThumbnail =
      thumbnailRefs.current[selectedIndex];

    selectedThumbnail?.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  }, [selectedIndex]);

  if (!selectedItem || items.length === 0) {
    return null;
  }

  const selectedTitle = getItemTitle(
    selectedItem,
    selectedIndex
  );

  return (
    <div
      className="gallery-viewer"
      role="region"
      aria-label={ariaLabel}
    >
      <header className="gallery-viewer-titlebar">
        <div className="gallery-viewer-window-buttons">
          <button
            className="gallery-viewer-window-button gallery-viewer-close"
            type="button"
            onPointerDown={(event) =>
              event.stopPropagation()
            }
            onClick={onClose}
            aria-label="Cerrar galería"
          />

          <span
            className="gallery-viewer-window-button gallery-viewer-minimize"
            aria-hidden="true"
          />

          <span
            className="gallery-viewer-window-button gallery-viewer-maximize"
            aria-hidden="true"
          />
        </div>

        <div className="gallery-viewer-title">
          {iconSrc && (
            <img
              src={iconSrc}
              alt=""
              draggable="false"
            />
          )}

          <span>{selectedTitle}</span>
        </div>
      </header>

      <img
        className="gallery-viewer-toolbar-image"
        src="/images/cabeceraImagen.png"
        alt=""
        draggable="false"
      />

      <div className="gallery-viewer-content">
        <aside
          className="gallery-viewer-sidebar"
          aria-label="Listado de imágenes"
          onPointerDown={(event) =>
            event.stopPropagation()
          }
        >
          <div className="gallery-viewer-list">
            {items.map((item, index) => {
              const itemTitle = getItemTitle(item, index);
              const isSelected =
                index === selectedIndex;

              return (
                <button
                  ref={(element) => {
                    thumbnailRefs.current[index] = element;
                  }}
                  className={`gallery-viewer-item ${
                    isSelected ? "is-selected" : ""
                  }`}
                  type="button"
                  key={item.id || `${item.src}-${index}`}
                  onMouseEnter={() => {
                    if (changeOnHover) {
                      onSelectItem(index);
                    }
                  }}
                  onFocus={() => onSelectItem(index)}
                  onClick={() => onSelectItem(index)}
                  aria-label={`Ver ${itemTitle}`}
                  aria-current={
                    isSelected ? "true" : undefined
                  }
                >
                  <span className="gallery-viewer-thumbnail">
                    <img
                      src={
                        item.iconSrc ||
                        sidebarIconSrc
                      }
                      alt=""
                      draggable="false"
                    />
                  </span>

                  <span className="gallery-viewer-item-title">
                    {itemTitle}
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        <main className="gallery-viewer-main">
          <img
            className="gallery-viewer-main-image"
            src={selectedItem.src}
            alt={
              selectedItem.alt ||
              `Vista ampliada de ${selectedTitle}`
            }
            draggable="false"
          />
        </main>
      </div>
    </div>
  );
}

export default GalleryViewer;
