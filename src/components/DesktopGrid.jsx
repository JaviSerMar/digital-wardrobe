function DesktopGrid({
  gridRef,
  desktopItems,
  draggedItemId,
  handleItemDoubleClick,
  handlePointerDown,
  handlePointerUp,
  setDraggedItemId,
}) {
  return (
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
  );
}

export default DesktopGrid;