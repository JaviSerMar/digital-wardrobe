import { useEffect } from "react";

function ImageViewer({
  images,
  selectedIndex,
  onSelectImage,
  onClose,
}) {
  const selectedImage = images[selectedIndex];
  const hasMultipleImages = images.length > 1;

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (!hasMultipleImages) {
        return;
      }

      if (event.key === "ArrowUp") {
        const previousIndex =
          selectedIndex === 0
            ? images.length - 1
            : selectedIndex - 1;

        onSelectImage(previousIndex);
      }

      if (event.key === "ArrowDown") {
        const nextIndex =
          selectedIndex === images.length - 1
            ? 0
            : selectedIndex + 1;

        onSelectImage(nextIndex);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    images.length,
    selectedIndex,
    onSelectImage,
    onClose,
    hasMultipleImages,
  ]);

  if (!selectedImage) {
    return null;
  }

  return (
    <div className="image-viewer-overlay">
      <button
        className="image-viewer-backdrop"
        type="button"
        onClick={onClose}
        aria-label="Cerrar visor"
      />

      <section
        className={`image-viewer ${
          hasMultipleImages
            ? ""
            : "image-viewer-single"
        }`}
        onPointerDown={(event) =>
          event.stopPropagation()
        }
      >
        <div className="image-viewer-main">
          <img
            className="image-viewer-main-image"
            src={selectedImage.src}
            alt={selectedImage.alt || ""}
            draggable="false"
          />
        </div>

        {hasMultipleImages && (
          <aside
            className="image-viewer-side-list"
            aria-label="Imágenes"
          >
            {images.map((image, index) => (
              <button
                className={`image-viewer-side-item ${
                  index === selectedIndex
                    ? "is-selected"
                    : ""
                }`}
                type="button"
                key={image.src}
                onClick={() => onSelectImage(index)}
                aria-label={`Ver imagen ${index + 1}`}
              >
                <img
                  src={image.src}
                  alt=""
                  draggable="false"
                />
              </button>
            ))}
          </aside>
        )}
      </section>
    </div>
  );
}

export default ImageViewer;