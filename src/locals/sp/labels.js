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
  FEED: {
    TITLE: 'Bienvenido al feed',
    MENU: {
      LEFT_DRAWER: {
        BUTTON_TEXT: 'Un drawer',
        TITLE: 'Drawer izquierdo',
        INPUT_PLACEHOLDER: 'Ingresar algo...',
        CANCEL_BUTTON: 'Cancelar',
        SAVE_BUTTON: 'Guardar'
      },
      RIGHT_DRAWER: {
        BUTTON_TEXT: 'Otro drawer',
        TITLE: 'Drawer derecho',
        INPUT_PLACEHOLDER: 'Ingresar algo...',
        CANCEL_BUTTON: 'Cancelar',
        SAVE_BUTTON: 'Guardar'
      },
    },
  },
};

export { LABELS };