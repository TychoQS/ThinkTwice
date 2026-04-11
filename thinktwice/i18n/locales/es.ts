export default {
  welcome: {
    title: 'ThinkTwice',
    subtitle: 'Toma decisiones conscientes antes de cada compra',
    description:
      'Te ayudamos a pausar, reflexionar y evitar compras impulsivas a través de conversaciones guiadas y cuestionarios inteligentes.',
    getStarted: 'Comenzar',
  },
  lobby: {
    title: '¿Cómo te gustaría reflexionar?',
    subtitle: 'Elige un método para analizar tu decisión de compra',
    chatbot: {
      title: 'Chatbot',
      description: 'Ten una conversación guiada sobre tu compra',
    },
    questionnaire: {
      title: 'Cuestionario',
      description: 'Responde preguntas rápidas para evaluar tu decisión',
    },
    crisis: {
      title: 'Kit de Crisis',
      description: 'Herramientas rápidas para romper el patrón compulsivo',
    },
  },
  chat: {
    title: 'Chat',
    inputPlaceholder: 'Describe lo que quieres comprar...',
    send: 'Enviar',
    welcomeMessage:
      '¡Hola! Estoy aquí para ayudarte a pensar dos veces sobre tu compra. Dime, ¿qué estás considerando comprar?',
    thinkingMessage:
      'Eso es interesante. Déjame hacerte algunas preguntas para ayudarte a reflexionar sobre esta decisión.',
    errorMessage: 'Lo siento, algo salió mal. Por favor, inténtalo de nuevo.',
    networkError: 'Error de conexión. Verifica tu internet e inténtalo de nuevo.',
    typingIndicator: 'La IA está pensando...',
    retryButton: 'Reintentar',
  },
  drawer: {
    home: 'Inicio',
    settings: 'Ajustes',
    darkMode: 'Modo oscuro',
    lightMode: 'Modo claro',
  },
  settings: {
    title: 'Ajustes',
    appearance: 'Apariencia',
    theme: 'Tema',
    themeSystem: 'Sistema',
    themeLight: 'Claro',
    themeDark: 'Oscuro',
    fontSize: 'Tamaño de fuente',
    fontSmall: 'Pequeño',
    fontMedium: 'Mediano',
    fontLarge: 'Grande',
    language: 'Idioma',
    distractionApp: 'App de distracción',
    selectApp: 'Seleccionar app...',
    apps: {
      youtube: 'YouTube',
      spotify: 'Spotify',
      instagram: 'Instagram',
      duolingo: 'Duolingo',
      browser: 'Artículo Aleatorio Wikipedia',
    },
  },
  crisis: {
    title: 'Kit de Crisis',
    subtitle: 'Rompe el patrón compulsivo',
    description: '¿Sientes un impulso fuerte por comprar? Usa estas herramientas para darte tiempo y espacio.',
    waitingRoom: {
      title: 'Sala de Espera',
      description: 'Espera 10 minutos para calmarte antes de decidir',
    },
    instantDistraction: {
      title: 'Distracción Instantánea',
      description: 'Abre tu app predefinida para despejar la mente',
    },
  },
  waitingRoom: {
    title: 'Sala de Espera',
    subtitle: 'Respira y deja que el tiempo pase',
    timeRemaining: 'Tiempo restante:',
    completed: '¡Tiempo cumplido! ¿Aún quieres comprarlo?',
    leave: 'Salir de la Sala',
  },
  questionnaire: {
    modeTitle: 'Elige tu test',
    modeSubtitle: '¿Cuánto tiempo tienes para reflexionar?',
    quickTest: {
      title: 'Test rápido',
      description: 'Responde 8 preguntas y obtén una recomendación inmediata',
    },
    customTest: {
      title: 'Test personalizado',
      description: 'Preguntas adaptadas al tipo de producto que quieres comprar',
      comingSoon: 'Próximamente',
    },
    start: 'Comenzar',
    progress: 'Pregunta {{current}} de {{total}}',
    back: 'Atrás',
    next: 'Siguiente',
    result: {
      title: 'Tu resultado',
      proceed: {
        label: '¡Adelante!',
        description: 'Lo has pensado bien. Parece una compra meditada, no impulsiva.',
      },
      wait: {
        label: 'Piénsalo bien',
        description: 'Hay algunas señales de alerta. Considera esperar unos días antes de decidir.',
      },
      avoid: {
        label: 'Evita esta compra',
        description: 'Parece una compra impulsiva. Da un paso atrás — probablemente te alegrarás de haber esperado.',
      },
      tryAgain: 'Intentar de nuevo',
      backHome: 'Volver al inicio',
    },
    questions: {
      q1: {
        text: '¿Habías planificado esta compra antes de hoy?',
        a: 'Sí, lo tenía en mente desde hace tiempo',
        b: 'Lo pensé hace unos días',
        c: 'No, se me ocurrió al momento',
      },
      q2: {
        text: '¿Tienes presupuesto para esto sin afectar tus finanzas?',
        a: 'Sí, entra perfectamente en mi presupuesto',
        b: 'Podría, aunque ajustaría mi presupuesto',
        c: 'No, usaría crédito o ahorros',
      },
      q3: {
        text: '¿Ya tienes algo similar que funcione bien?',
        a: 'No, realmente lo necesito',
        b: 'Tengo algo parecido pero no cubre mis necesidades',
        c: 'Sí, tengo algo que hace lo mismo',
      },
      q4: {
        text: '¿Seguirías queriendo esto dentro de 30 días?',
        a: 'Sin duda, es algo que llevo tiempo queriendo',
        b: 'Probablemente sí',
        c: 'No estoy seguro',
        d: 'Posiblemente no',
      },
      q5: {
        text: '¿Cómo describirías esta compra?',
        a: 'Es una necesidad real',
        b: 'Es algo útil que quiero',
        c: 'Es un capricho del momento',
      },
      q6: {
        text: '¿Has comparado precios o investigado alternativas?',
        a: 'Sí, he investigado bien',
        b: 'He mirado algo pero no en profundidad',
        c: 'No, lo compraría directamente',
      },
      q7: {
        text: '¿Estás comprando influenciado por una emoción del momento?',
        a: 'No, mi estado de ánimo no influye en esto',
        b: 'Quizás un poco',
        c: 'Sí, estoy emocionado/estresado ahora mismo',
      },
      q8: {
        text: 'Si esperas una semana, ¿qué crees que pasará?',
        a: 'Seguiré igual de convencido',
        b: 'Quizás cambie de opinión',
        c: 'Probablemente me alegre de no haberlo comprado',
      },
    },
  },
  network: {
    offlineWarning: 'Estás desconectado.',
  },
};
