function TerminalWindow({ window, closeWindow }) {
  return (
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
        <p className="terminal-line">
          Type <span>help</span> to explore.
        </p>
        <p className="terminal-line"></p>
        <p className="terminal-line">
          <span className="terminal-prompt">javier@portfolio</span>:~$ help
        </p>
        <p className="terminal-line">available commands:</p>
        <p className="terminal-line">
          about · projects · skills · contact · clear
        </p>
        <p className="terminal-line"></p>
        <p className="terminal-line">
          <span className="terminal-prompt">javier@portfolio</span>:~${" "}
          <span className="terminal-cursor">_</span>
        </p>
      </div>
    </div>
  );
}

export default TerminalWindow;