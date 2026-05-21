export const stickyNotesData = {
  "welcome-note": {
    id: "welcome-note-window",
    title: "bienvenida",
    type: "welcome",
    left: 170,
    top: 58,
    width: 455,
    height: 155,
  },
  "profile-note": {
    id: "profile-note-window",
    title: "profile.js",
    type: "profile",
    left: 620,
    top: 360,
    width: 540,
    height: 190,
  },
};

export const documentWindowsData = {
  about: {
    id: "about-window",
    title: "sobre mi",
    type: "document",
    left: 300,
    top: 120,
    width: 760,
    height: 430,
  },
  "skills-file": {
    id: "skills-file-window",
    title: "habilidades.txt",
    type: "document",
    left: 340,
    top: 150,
    width: 760,
    height: 650,
  },
  "velaris-readme": {
    id: "velaris-readme-window",
    title: "README.txt",
    type: "document",
    left: 360,
    top: 90,
    width: 620,
    height: 590,
  },
};

export const terminalWindowsData = {
  terminal: {
    id: "terminal-window",
    title: "terminal",
    type: "terminal",
    left: 360,
    top: 140,
    width: 620,
    height: 380,
  },
};

export const folderWindowsData = {
  projects: {
    id: "projects-window",
    title: "proyectos",
    type: "folder-window",
    currentFolder: "projects",
    left: 260,
    top: 90,
    width: 760,
    height: 430,
    items: [
      {
        id: "velaris-folder",
        type: "folder",
        label: "velaris",
        icon: "/icons/folder.png",
        targetFolder: "velaris",
      },
      {
        id: "airmonitor-folder",
        type: "folder",
        label: "airmonitor",
        icon: "/icons/folder.png",
        targetFolder: "airmonitor",
      },
      {
        id: "bancotech-folder",
        type: "folder",
        label: "bancotech",
        icon: "/icons/folder.png",
        targetFolder: "bancotech",
      },
    ],
  },

  skills: {
    id: "skills-window",
    title: "skills",
    type: "folder-window",
    left: 290,
    top: 120,
    width: 760,
    height: 430,
    items: [
      {
        id: "habilidades-file",
        label: "habilidades.txt",
        icon: "/icons/archivoTxt.png",
      },
    ],
  },

  contact: {
    id: "contact-window",
    title: "@contacto",
    type: "folder-window",
    left: 320,
    top: 150,
    width: 760,
    height: 430,
    items: [
      {
        id: "email-file",
        label: "email.txt",
        icon: "/icons/archivoTxt.png",
      },
      {
        id: "github-file",
        label: "github.url",
        icon: "/icons/archivoTxt.png",
      },
      {
        id: "linkedin-file",
        label: "linkedin.url",
        icon: "/icons/archivoTxt.png",
      },
    ],
  },
};