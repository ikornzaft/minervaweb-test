const LABELS = {
  LOGIN: {
    TITLE: 'Esta App',
    FORM: {
      EMAIL_LABEL: 'Dirección de email',
      EMAIL_PLACEHOLDER: 'mail@dominio.com',
      PASS_LABEL: 'Password',
      PASS_PLACEHOLDER: 'tu clave',
    },
    BUTTON_TEXT: 'Ingresar',
    MESSAGES: {
      ERROR: {
        INVALID_EMAIL: 'No es un email válido.',
        INVALID_PASS: 'El password no es válido.',
        WRONG_PASS: 'El password es incorrecto.',
        ICOMPLETE_DATA: 'Por favor, completar la totalidad de los datos.',
        UNREGISTED_EMAIL: 'no está registrado.',
        TECHNICAL_ISSUES: 'Problemas técnicos. Por favor intentar nuevamente.',
        CONNECTION: 'Problemas con la conexión.',
      },
    },
  },
  TOP_MENU: {
    MENU: {
      LEFT_DRAWER: {
        BUTTON_TEXT: 'Menú',
        TITLE: 'Drawer izquierdo',
        INPUT_PLACEHOLDER: 'Ingresar algo...',
        CANCEL_BUTTON: 'Cancelar',
        SAVE_BUTTON: 'Guardar',
      },
      BUTTONS: {
        BUTTON_1: 'Actividades',
        BUTTON_2: 'Form cualquiera',
        BUTTON_3: 'Links y Botones',
        BUTTON_4: 'De todo un poco',
      },
    },
  },
  ACTIVIDADES: {
    TITLE: 'Actividades pendientes',
    ACTIVIDAD: {
      IMAGE_ALT: 'Imágen de la actividad',
    }
  },
  ARTICULO: {
    SECCION: {
      HEADING: 'Otros artículos',
    },
  },
  FEED: {
    TITLE: 'Bienvenido al feed',
  },
  FORM: {
    TITLE: 'Esto es un form',
    FIRST_FIELD: {
      TEXT: 'Nombre',
      PLACEHOLDER: 'Tu nombre',
    },
    SECOND_FIELD: {
      TEXT: 'Apellido',
      PLACEHOLDER: 'Tu apellido',
    },
    BUTTON_TEXT: 'Enviar',
  },
  MIXED_ELEMENTS: {
    TITLE: 'Acá hay links y botones',
    SECTION_1: {
      TITLE: '¿A dónde querés ir?',
      BUTTON_1: 'Feed',
      BUTTON_2: 'Form',
    },
    MODAL_1: {
      BUTTON_TEXT: 'Más información',
      TITLE: 'Acá hay más información',
      CONTENT:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam rerum iure a aut obcaecati doloribus natus explicabo possimus magni, ipsa cum iste officia esse eum quia eaque reiciendis veniam? Dignissimos.',
      SECOND_BUTON_TEXT: 'Seguir',
    },
    MODAL_2: {
      BUTTON_TEXT: '¿Querés un perro?',
      TITLE: 'Un perro',
    },
    SECTION_2: {
      TITLE: 'Más cosas...',
      MODAL_3: {
        BUTTON_TEXT: 'Otro form',
        FIRST_FIELD_LABEL: '¿Nos dejarías tu opinión?',
        FIRST_FIELD_PLACEHOLDER: 'Comentario...',
        SUBMIT_BUTTON_TEXT: 'Enviar opinión',
      },
      MODAL_4: {
        BUTTON_TEXT: 'Spinner',
        TITLE: 'Cargando por siempre...',
      },
    },
  },
  DE_TODO: {
    TITLE: 'De todo un poco', 
    MENU: {
      BUTTON_TEXT: 'Un menú',
      ITEM_1: 'Download',
      ITEM_2: 'Create a Copy',
      ITEM_3: 'Mark as Draft',
      ITEM_4: 'Delete',
      ITEM_5: 'Attend a Workshop',
    },
    POPOVER_1: {
      BUTTON_TEXT: 'Popover',
      HEADER: 'Pop Over!',
      BODY: 'Esto es un popover!'
    },
    POPOVER_2: {
      BUTTON_TEXT: 'Otro popover',
      HEADER: 'Este es otro popover',
      BODY: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.',
      FOOTER: {
        CONTENT: 'Paso 2 de 4',
        BUTTON_1_TEXT: 'Configurar Email',
        BUTTON_2_TEXT: 'Sig.'
      },
    },
    ACCORDION: {
      SECTION_1: {
        TITLE: 'Esta es la sección 1 de un acordeón',
        CONTENT: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      },
      SECTION_2: {
        TITLE: 'Y esta es la sección 2',
        CONTENT: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      },
    },
    TABS: {
      TAB_1: {
        TITLE: 'Uno', 
        CONTENT: 'one!',
      },
      TAB_2: {
        TITLE: 'Dos', 
        CONTENT: 'two!',
      },
      TAB_3: {
        TITLE: 'Tres', 
        CONTENT: 'three!',
      },
    }
  }
};

export { LABELS };
