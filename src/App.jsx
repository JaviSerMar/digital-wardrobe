import "./App.css";

function App() {
  return (
    <main className="desktop">
      <header className="topbar">
        <div className="topbar-left">
          <strong>Digital Wardrobe</strong>
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
        </div>

        <div className="topbar-right">
          <span>Wi-Fi</span>
          <span>100%</span>
          <span>22:45</span>
        </div>
      </header>

      <section className="desktop-icons">
        <button className="desktop-icon">
          <img className="folder-icon" src="/icons/folder.png" alt="" />
          <span>about Me</span>
        </button>

        <button className="desktop-icon">
          <img className="folder-icon" src="/icons/folder.png" alt="" />
          <span>socials</span>
        </button>

        <button className="desktop-icon">
          <img className="folder-icon" src="/icons/folder.png" alt="" />
          <span>radio</span>
        </button>
      </section>

      <button className="game-shortcut">
        <span className="app-icon">W</span>
        <span>Wardrobe Simulator</span>
      </button>

      
    </main>
  );
}

export default App;