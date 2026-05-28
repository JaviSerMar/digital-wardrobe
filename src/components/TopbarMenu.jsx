function TopbarMenu({ items }) {
  return (
    <nav className="topbar-menu" aria-label="Menú">
      {items.map((item) => (
        <button
          className="topbar-menu-item"
          type="button"
          key={item.id}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}

export default TopbarMenu;