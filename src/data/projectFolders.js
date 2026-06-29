export const imageGalleries = {
  "velaris-dataset": {
    title: "dataset",
    width: 700,
    height: 500,
    left: 210,
    top: 85,

    items: [
      {
        src: "/projects/velaris/foto1dataset.png",
        title: "foto01.png",
        alt: "Imagen 1 del dataset de Velaris",
      },
      {
        src: "/projects/velaris/foto2dataset.png",
        title: "foto02.png",
        alt: "Imagen 2 del dataset de Velaris",
      },
      {
        src: "/projects/velaris/foto3dataset.png",
        title: "foto03.png",
        alt: "Imagen 3 del dataset de Velaris",
      },
      {
        src: "/projects/velaris/foto4dataset.png",
        title: "foto04.png",
        alt: "Imagen 4 del dataset de Velaris",
      },
      {
        src: "/projects/velaris/foto5dataset.png",
        title: "foto05.png",
        alt: "Imagen 5 del dataset de Velaris",
      },
      {
        src: "/projects/velaris/foto6dataset.png",
        title: "foto06.png",
        alt: "Imagen 6 del dataset de Velaris",
      },
    ],
  },
};

export const projectFolderScreens = {
  velaris: {
    title: "velaris",
    path: "proyectos / velaris",
    items: [
      {
        id: "velaris-readme",
        label: "VELARIS.txt",
        icon: "/icons/archivoTxt.png",
        openWindowKey: "velaris-readme",
      },
      {
        id: "velaris-info",
        label: "README.txt",
        icon: "/icons/archivoTxt.png",
        openWindowKey: "velaris-info",
      },
      {
        id: "velaris-stack",
        label: "tecnologias.txt",
        icon: "/icons/archivoTxt.png",
        openWindowKey: "velaris-stack",
      },
      {
        id: "velaris-database",
        label: "baseDeDatos.txt",
        icon: "/icons/archivoTxt.png",
        openWindowKey: "velaris-database",
      },
      {
        id: "velaris-opencv-info",
        label: "openCV.txt",
        icon: "/icons/archivoTxt.png",
        openWindowKey: "velaris-opencv-info",
      },
      {
        id: "velaris-app",
        label: "Velaris.app",
        icon: "/icons/logoAppVelaris.png",
        openWindowKey: "velaris-app",
      },
      {
        id: "velaris-manifesto",
        label: "manifesto.png",
        icon: "/icons/iconoFoto.png",
        openWindowKey: "velaris-manifesto",
      },
      {
        id: "velaris-architecture",
        label: "arquitectura.png",
        icon: "/icons/iconoFoto.png",
        openWindowKey: "velaris-architecture",
      },
      {
        id: "velaris-media",
        label: "dataset",
        icon: "/icons/folder.png",
        targetFolder: "velaris-media",
      },
      {
        id: "velaris-videos",
        label: "videos",
        icon: "/icons/folder.png",
        targetFolder: "velaris-videos",
      },
    ],
  },

  "velaris-media": {
    title: "dataset",
    path: "proyectos / velaris / dataset",
    items: [
      {
        id: "velaris-poster",
        label: "foto01.png",
        icon: "/icons/iconoFoto.png",
        galleryKey: "velaris-dataset",
        galleryIndex: 0,
      },
      {
        id: "velaris-landing",
        label: "foto02.png",
        icon: "/icons/iconoFoto.png",
        galleryKey: "velaris-dataset",
        galleryIndex: 1,
      },
      {
        id: "velaris-gazebo",
        label: "foto03.png",
        icon: "/icons/iconoFoto.png",
        galleryKey: "velaris-dataset",
        galleryIndex: 2,
      },
      {
        id: "velaris-camera",
        label: "foto04.png",
        icon: "/icons/iconoFoto.png",
        galleryKey: "velaris-dataset",
        galleryIndex: 3,
      },
      {
        id: "velaris-opencv",
        label: "foto05.png",
        icon: "/icons/iconoFoto.png",
        galleryKey: "velaris-dataset",
        galleryIndex: 4,
      },
      {
        id: "velaris-foto06",
        label: "foto06.png",
        icon: "/icons/iconoFoto.png",
        galleryKey: "velaris-dataset",
        galleryIndex: 5,
      },
    ],
  },

  "velaris-videos": {
    title: "videos",
    path: "proyectos / velaris / videos",
    items: [
      {
        id: "velaris-video-movim-auto",
        label: "movimAuto.mp4",
        icon: "/icons/archivoVideo.png",
        externalUrl:
          "https://drive.google.com/file/d/1XLoW44Ym_YMePfj3Nx4KyjlYPS0FFSkx/view?usp=sharing",
      },
      {
        id: "velaris-video-camara-robot",
        label: "camaraRobot.mp4",
        icon: "/icons/archivoVideo.png",
        externalUrl:
          "https://drive.google.com/file/d/1P9YHaY2chpl2UQSvLE1ch_bJUo_N9omV/view?usp=sharing",
      },
      {
        id: "velaris-video-testeo-final",
        label: "testeoFinal.mp4",
        icon: "/icons/archivoVideo.png",
        externalUrl:
          "https://drive.google.com/file/d/1M_jN6-xQWMyV-IJhGJrlAle7S_rWivH9/view?usp=sharing",
      },
      {
        id: "velaris-video-testeo-resumido",
        label: "testeoResumido.mp4",
        icon: "/icons/archivoVideo.png",
        externalUrl:
          "https://drive.google.com/file/d/1fYORTdGpd6gD8LEZiU6t2IbOo__Mwsbv/view?usp=sharing",
      },
    ],
  },

  airmonitor: {
    title: "airmonitor",
    path: "proyectos / airmonitor",
    items: [
      {
        id: "airmonitor-readme",
        label: "README.txt",
        icon: "/icons/archivoTxt.png",
      },
      {
        id: "airmonitor-stack",
        label: "stack.txt",
        icon: "/icons/archivoTxt.png",
      },
      {
        id: "airmonitor-media",
        label: "media",
        icon: "/icons/folder.png",
      },
    ],
  },

  "airmonitor-media": {
    title: "media",
    path: "proyectos / airmonitor / media",
    items: [],
  },

  bancotech: {
    title: "bancotech",
    path: "proyectos / bancotech",
    items: [
      {
        id: "bancotech-readme",
        label: "README.txt",
        icon: "/icons/archivoTxt.png",
      },
      {
        id: "bancotech-stack",
        label: "stack.txt",
        icon: "/icons/archivoTxt.png",
      },
      {
        id: "bancotech-media",
        label: "media",
        icon: "/icons/folder.png",
      },
    ],
  },

  "bancotech-media": {
    title: "media",
    path: "proyectos / bancotech / media",
    items: [],
  },
};