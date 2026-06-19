function DockBar() {
  const dockItems = [
    {
      id: "vscode",
      label: "VS Code",
      icon: "/icons/dock/visualStudio.png",
    },
    {
      id: "github",
      label: "GitHub",
      icon: "/icons/dock/github.png",
    },
    {
      id: "frontend",
      label: "HTML / CSS / JS",
      icon: "/icons/dock/frontend.png",
    },
    {
      id: "python",
      label: "Python",
      icon: "/icons/dock/python.png",
    },
    {
      id: "ros2",
      label: "ROS2",
      icon: "/icons/dock/ros2.png",
    },
    {
      id: "aws",
      label: "AWS",
      icon: "/icons/dock/aws.png",
    },
    {
      id: "unity",
      label: "Unity",
      icon: "/icons/dock/unity.png",
    },
    {
      id: "blender",
      label: "Blender",
      icon: "/icons/dock/blender.png",
    },
    {
      id: "figma",
      label: "Figma",
      icon: "/icons/dock/figma.png",
    },
    {
      id: "trello",
      label: "Trello",
      icon: "/icons/dock/trello.png",
    },
  ];

  return (
    <nav className="dock-bar" aria-label="Aplicaciones">
      <div className="dock-apps">
        {dockItems.map((item) => (
          <button className="dock-item" type="button" key={item.id}>
            <span className="dock-icon">
              <img
                className="dock-icon-image"
                src={item.icon}
                alt=""
                draggable="false"
              />
            </span>

            <span className="dock-tooltip">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="dock-separator" />

      <button className="dock-item dock-trash" type="button">
        <span className="dock-icon">
          <img
            className="dock-icon-image"
            src="/icons/papelera.png"
            alt=""
            draggable="false"
          />
        </span>

        <span className="dock-tooltip">Papelera</span>
      </button>
    </nav>
  );
}

export default DockBar;