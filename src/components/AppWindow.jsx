function SignalIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 18v-2M8 18v-5M12 18v-8M16 18V7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 9.5a12 12 0 0 1 16 0M7.5 13a7 7 0 0 1 9 0M10.5 16.2a2.5 2.5 0 0 1 3 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <circle cx="12" cy="19" r="1.2" fill="currentColor" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg viewBox="0 0 28 14" aria-hidden="true">
      <rect
        x="1"
        y="2"
        width="22"
        height="10"
        rx="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <rect
        x="3.5"
        y="4.5"
        width="16"
        height="5"
        rx="1.5"
        fill="currentColor"
      />

      <path
        d="M25 5v4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function RobotIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect
        x="5"
        y="7"
        width="14"
        height="12"
        rx="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M12 7V4M9 13h.01M15 13h.01M9 17h6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <circle cx="12" cy="3.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m8 5 11 7-11 7z" fill="currentColor" />
    </svg>
  );
}

function StopIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect
        x="6"
        y="6"
        width="12"
        height="12"
        rx="2"
        fill="currentColor"
      />
    </svg>
  );
}

function ChevronIcon({ direction }) {
  const rotation = {
    up: "rotate(0 12 12)",
    right: "rotate(90 12 12)",
    down: "rotate(180 12 12)",
    left: "rotate(-90 12 12)",
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="m7 15 5-6 5 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform={rotation[direction]}
      />
    </svg>
  );
}

function CameraPreview() {
  return (
    <div className="velaris-home-camera">
      <div className="velaris-home-camera-top">
        <span className="velaris-home-recording">
          <span />
          REC
        </span>

        <span>CAM01 · Principal</span>

        <span className="velaris-home-expand" aria-hidden="true">
          ↗
        </span>
      </div>

      <div className="velaris-home-camera-scene">
        <span className="velaris-camera-moon" />
        <span className="velaris-camera-box box-left" />
        <span className="velaris-camera-box box-center" />
        <span className="velaris-camera-box box-right" />
        <span className="velaris-camera-path" />
      </div>

      <div className="velaris-home-camera-bottom">
        <span>⌁ 0.89 m/s</span>
        <span>▣ 78%</span>
      </div>
    </div>
  );
}

function HomeView() {
  return (
    <div className="velaris-view velaris-home-dashboard">
      <section className="velaris-operator-card">
        <div className="velaris-operator-avatar">JS</div>

        <div className="velaris-operator-info">
          <span>Robot conectado</span>
          <strong>turtlebot burger</strong>
        </div>

        <span className="velaris-operator-arrow" aria-hidden="true">
          <ChevronIcon direction="down" />
        </span>
      </section>

      <section className="velaris-home-section">
        <div className="velaris-home-section-title">
          <span>CÁMARA EN VIVO</span>
        </div>

        <CameraPreview />
      </section>

      <section className="velaris-home-status-grid">
        <article className="velaris-home-card">
          <span className="velaris-home-card-label">ESTADO</span>

          <div className="velaris-home-battery">
            <strong>Batería 78%</strong>
          </div>

          <div className="velaris-home-progress">
            <span style={{ width: "78%" }} />
          </div>

          <dl className="velaris-home-data-list">
            <div>
              <dt>Modo</dt>
              <dd>Autónomo</dd>
            </div>

            <div>
              <dt>Conexión</dt>
              <dd>Estable</dd>
            </div>
          </dl>
        </article>

        <article className="velaris-home-card">
          <span className="velaris-home-card-label">MODO</span>

          <div className="velaris-home-mode-title">
            <span>◎</span>
            <strong>Autónomo</strong>
          </div>

          <div className="velaris-home-segmented">
            <span className="is-active">Auto</span>
            <span>Manual</span>
          </div>

          <div className="velaris-home-mode-status">
            <span>Estado</span>
            <strong>Patrullando</strong>
          </div>
        </article>
      </section>

      <section className="velaris-home-section">
        <div className="velaris-home-section-title">
          <span>CONTROL MANUAL</span>
        </div>

        <div className="velaris-home-control">
          <div className="velaris-home-direction">
            <span className="velaris-home-direction-label">MOVER</span>

            <div className="velaris-home-direction-grid">
              <span className="velaris-home-direction-button direction-up">
                <ChevronIcon direction="up" />
              </span>

              <span className="velaris-home-direction-button direction-left">
                <ChevronIcon direction="left" />
              </span>

              <span className="velaris-home-direction-button direction-stop">
                <StopIcon />
              </span>

              <span className="velaris-home-direction-button direction-right">
                <ChevronIcon direction="right" />
              </span>

              <span className="velaris-home-direction-button direction-down">
                <ChevronIcon direction="down" />
              </span>
            </div>
          </div>

          <div className="velaris-home-patrol">
            <span className="velaris-home-direction-label">PATRULLA</span>

            <div className="velaris-home-patrol-action is-start">
              <PlayIcon />
              <span>Iniciar</span>
            </div>

            <div className="velaris-home-patrol-action">
              <span className="velaris-home-pause-icon">Ⅱ</span>
              <span>Pausar</span>
            </div>

            <div className="velaris-home-patrol-action">
              <StopIcon />
              <span>Detener</span>
            </div>
          </div>
        </div>

        <div className="velaris-home-control-footer">
          <span>Último comando</span>
          <strong>DETENER · 12:17</strong>
        </div>
      </section>

      <section className="velaris-home-section">
        <div className="velaris-home-section-title">
          <span>MAPA Y NAVEGACIÓN</span>
        </div>

        <div className="velaris-home-map">
          <img
            src="/projects/velaris/mapaAlmacen.png"
            alt="Mapa del almacén"
            draggable="false"
          />

          <div className="velaris-home-map-route route-one" />
          <div className="velaris-home-map-route route-two" />
          <div className="velaris-home-map-route route-three" />

          <span
            className="velaris-home-map-point point-one"
            aria-label="Waypoint 1"
          />

          <span
            className="velaris-home-map-point point-two"
            aria-label="Waypoint 2"
          />

          <span
            className="velaris-home-map-point point-three"
            aria-label="Waypoint 3"
          />

          <span
            className="velaris-home-map-door door-one"
            aria-label="Puerta norte"
          >
            P1
          </span>

          <span
            className="velaris-home-map-door door-two"
            aria-label="Puerta de carga"
          >
            P2
          </span>

          <span
            className="velaris-home-map-door door-three"
            aria-label="Puerta este"
          >
            P3
          </span>

          <span
            className="velaris-home-map-robot"
            aria-label="Posición del robot"
          >
            <RobotIcon />
          </span>

          <span className="velaris-home-expand" aria-hidden="true">
            ↗
          </span>

          <span className="velaris-home-map-location">
            Almacén Norte · Planta 1
          </span>
        </div>
      </section>

      <section className="velaris-home-section">
        <div className="velaris-home-section-title">
          <span>PATRULLAJE</span>
        </div>

        <div className="velaris-home-patrol-card">
          <div className="velaris-home-patrol-heading">
            <div>
              <span>Patrulla nocturna · Sector A–C</span>
              <small>6 puntos de control</small>
            </div>

            <strong>En curso</strong>
          </div>

          <div className="velaris-home-patrol-progress-heading">
            <span>Progreso</span>
            <strong>57%</strong>
          </div>

          <div className="velaris-home-progress">
            <span style={{ width: "57%" }} />
          </div>

          <div className="velaris-home-patrol-summary">
            <article>
              <span>WAYPOINTS</span>
              <strong>3/6</strong>
            </article>

            <article>
              <span>TIEMPO</span>
              <strong>09:32</strong>
            </article>
          </div>
        </div>
      </section>

      <section className="velaris-home-section">
        <div className="velaris-home-section-title">
          <span>ALERTAS</span>
          <span className="velaris-home-section-link">Ver todas</span>
        </div>

        <div className="velaris-home-alert-list">
          <article className="is-warning">
            <span className="velaris-home-alert-icon">!</span>

            <div>
              <strong>Puerta abierta detectada</strong>
              <small>Zona norte · Hace 2 min</small>
            </div>

            <span>›</span>
          </article>

          <article className="is-danger">
            <span className="velaris-home-alert-icon">△</span>

            <div>
              <strong>Obstáculo en ruta</strong>
              <small>Sector C · Hace 7 min</small>
            </div>

            <span>›</span>
          </article>

          <article className="is-neutral">
            <span className="velaris-home-alert-icon">⌁</span>

            <div>
              <strong>Conexión inestable</strong>
              <small>Sector A · Hace 14 min</small>
            </div>

            <span>›</span>
          </article>
        </div>
      </section>
    </div>
  );
}

function AppWindow({ window, closeWindow }) {
  return (
    <div className="app-window-content">
      <div className="app-phone-shell">
        <div className="app-phone-frame">
          <div className="app-phone-screen">
            <header className="app-phone-statusbar">
              <span className="app-phone-time">9:41</span>

              <div className="app-phone-status-icons">
                <SignalIcon />
                <WifiIcon />
                <BatteryIcon />
              </div>
            </header>

            <div className="app-phone-toolbar">
              <div className="app-phone-brand">
                <img
                  src="/icons/logoAppVelaris.png"
                  alt=""
                  draggable="false"
                />

                <div>
                  <h1>VELARIS</h1>
                  <p>Centro de vigilancia</p>
                </div>
              </div>

              <span className="app-phone-online-status">
                <span className="app-phone-online-dot" />
                En línea
              </span>

              <button
                className="app-phone-close"
                type="button"
                onPointerDown={(event) => event.stopPropagation()}
                onClick={() => closeWindow(window.id)}
                aria-label="Cerrar Velaris.app"
              >
                ×
              </button>
            </div>

            <main className="app-phone-body">
              <HomeView />
            </main>

            <div className="app-phone-home-indicator" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppWindow;

