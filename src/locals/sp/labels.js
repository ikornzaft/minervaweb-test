const LABELS = {
  LOGIN: {
    TITLE: 'Aprender en Red',
    FORM: {
      USER_LABEL: 'Nombre de usuario',
      USER_PLACEHOLDER: 'tu usuario',
      PASS_LABEL: 'Password',
      PASS_PLACEHOLDER: 'tu clave',
    },
    BUTTON_TEXT: 'Ingresar',
    MESSAGES: {
      ERROR: {
        INVALID_USER: 'No es un usuario válido.',
        INVALID_PASS: 'El password no es válido.',
        WRONG_PASS: 'El password es incorrecto.',
        ICOMPLETE_DATA: 'Por favor, completar la totalidad de los datos.',
        UNREGISTED_USER: 'no está registrado.',
        TECHNICAL_ISSUES: 'Problemas técnicos. Por favor intentar nuevamente.',
        CONNECTION: 'Problemas con la conexión.',
      },
    },
  },

  TOP_MENU: {
    MENU: {
      LEFT_DRAWER: {
        BUTTON_TEXT: 'Menú',
        MATERIAS: {
          BUTTON_1: 'Matemáticas',
          BUTTON_2: 'Comunicación',
          BUTTON_3: 'Ciencias Naturales',
          BUTTON_4: 'Estudios Sociales',
          BUTTON_5: 'Investigación',
        },
      },
      BUTTONS: {
        BUTTON_1: 'Actividades',
        BUTTON_2: 'Consultas',
        BUTTON_3: 'Foro',
        BUTTON_4: 'Autoevaluaciones',
        BUTTON_5: 'Tareas',
        BUTTON_6: 'Exámenes',
      },
      RIGHT_DRAWER: {
        BUTTON_TEXT: 'Edición',
        OPCIONES: {
          BUTTON_1: 'Crear artículo',
          BUTTON_2: 'Crear tarea',
          BUTTON_3: 'Crear exámen',
          BUTTON_4: 'Crear autoevaluación',
        },
        NEW_ACTIVITY_MODAL: {
          TITLE: 'Crear un nuevo artículo',
          FORM_INPUT_1: 'Título',
          FORM_INPUT_2: 'Copete',
          CONTENT_LABEL: 'Contenido',
          FORM_BUTTON: 'Crear artículo',
        },
      },
    },
  },

  ACTIVITIES: {
    EMPTY_LIST: {
      TEXT: 'No tienes actividades asignadas en este momento',
    },
    TITLE: {
      AREA_1: 'Matemáticas',
      AREA_2: 'Comunicación',
      AREA_3: 'Ciencias Naturales',
      AREA_4: 'Estudios Sociales',
      AREA_5: 'Investigación',
    },

    ACTIVITY: {
      IMAGE_ALT: 'Imágen de la actividad',
      BADGES: {
        AREA_1: 'MATEMÁTICAS',
        AREA_2: 'COMUNICACIÓN',
        AREA_3: 'CIENCIAS NATURALES',
        AREA_4: 'ESTUDIOS SOCIALES',
        AREA_5: 'INVESTIGACIÓN',
      },
    },
  },

  ARTICLE: {
    POPOVER: {
      TITLE: '¿Tienes alguna duda sobre este contenido?',
      PLACEHOLDER: 'Ingresa tu consulta',
      BUTON_CONTENT: 'Enviar consulta',
      TOASTER: {
        TOASTER_TITLE: 'Se envió tu consulta',
      },
    },
    SECCION: {
      HEADING: 'Otros artículos',
    },
  },

  CREATE_ARTICLE: {
    FORM: {
      AREA_SELECTOR: {
        LABEL: 'Elige la materia',
      },
      TITLE: {
        LABEL: 'Título',
      },
      SUBTITLE: {
        LABEL: 'Subtítulo',
        PLACEHOLDER: 'Descripción del artículo',
      },
      SECTIONS: {
        LABEL: 'Agregar a secciones',
        BUTTON_1: 'Para saber más',
        BUTTON_2: 'Para hacer',
      },
      PARAGRAPHS: {
        BUTTON: 'Agregar contenido',
      },
      TOASTS: {
        SUCCESS: {
          TITLE: 'Artículo guardadao',
          DESCRIPTION: 'Se creó un nuevo artículo',
        },
        ERROR: {
          TITLE: 'Se produjo un error al crear el artículo',
        },
      },
      SUBMIT_BUTTON: 'Crear artículo',
      ERRORS: {
        TITLE_ERROR: 'Es necesario incluir un título',
        SUBTITLE_ERROR: 'Es necesario incluir un subtítulo',
        WORKAREA_ERROR: 'Es necesaria una materia',
      },
    },
    PARAGRAPHS: {
      TABS: {
        TITLE_1: 'Texto',
        TITLE_2: 'Archivos',
        TITLE_3: 'Links',
      },
      TAB_1: {
        LABEL: 'Texto del artículo',
        PLACEHOLDER: 'Ingresa el texto del artículo',
      },
      SUBMIT_BUTTON: 'Confirmar contenido',
    },
    EDIT_PARAGRAPHS: {
      MODAL_TITLE: 'Contenido',
      FILE_FORM: {
        LOADING: 'Subiendo...',
        UPLOAD_BUTTON: 'Subir archivo',
      },
    },
  },
};

export { LABELS };
