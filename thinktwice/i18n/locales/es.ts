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
      title: 'Por perfil',
      description: 'Preguntas personalizadas según tu perfil de comprador',
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
    profileDetection: {
      title: 'Tu Perfil',
      subtitle: 'Dos preguntas rápidas para personalizar tu cuestionario',
      questions: {
        pd1: {
          text: '¿Qué desencadenó principalmente tu deseo de comprar esto?',
          a: 'Un impulso repentino — lo vi y sentí que tenía que tenerlo',
          b: 'Una oferta o descuento llamó mi atención',
          c: 'Me di cuenta de que lo necesito para una tarea concreta',
          d: 'No estoy seguro — el precio es mi principal preocupación',
        },
        pd2: {
          text: '¿Cuál de estas opciones se acerca más a lo que sientes ahora?',
          a: 'Estoy emocionado y quiero comprarlo pronto',
          b: 'El ahorro es gran parte de por qué lo quiero',
          c: 'Quiero asegurarme de que el coste está justificado para mi necesidad',
          d: 'Necesito comprobar si realmente puedo permitírmelo',
        },
      },
    },
    profiles: {
      impulsive: { label: 'Comprador Impulsivo', subtitle: 'Guiado por emociones' },
      dealHunter: { label: 'Cazador de Ofertas', subtitle: 'Guiado por descuentos' },
      functional: { label: 'Comprador Funcional', subtitle: 'Guiado por necesidad' },
      budgetConstrained: { label: 'Consciente del Presupuesto', subtitle: 'Orientado a finanzas' },
    },
    profileQuestions: {
      impulsive: {
        iq1: {
          text: '¿Qué desencadenó tu deseo de comprar esto ahora mismo?',
          a: 'Llevo tiempo pensando en esto — tiene sentido de verdad',
          b: 'Lo vi en algún sitio y sentí una emoción inmediata',
          c: 'Estaba aburrido, estresado o buscando animarme',
        },
        iq2: {
          text: '¿Cómo te sientes respecto a esta compra ahora mismo?',
          a: 'Tranquilo y racional — tiene sentido',
          b: 'Emocionado, pero puedo pensarlo bien',
          c: 'Un fuerte impulso de actuar ya',
        },
        iq3: {
          text: 'Si tuvieras que esperar 48 horas antes de comprarlo, ¿seguirías queriéndolo?',
          a: 'Sí, sin ninguna duda',
          b: 'Probablemente sí',
          c: 'No estoy seguro',
        },
        iq4: {
          text: '¿Puedes describir una situación concreta esta semana en la que lo usarías?',
          a: 'Sí — una situación clara y concreta',
          b: 'Quizás — algo general',
          c: 'La verdad es que no — simplemente me gusta mucho',
        },
        iq5: {
          text: '¿Cómo crees que te sentirás una semana después de comprarlo?',
          a: 'Contento — aportará valor real a mi vida',
          b: 'Igual que ahora, pero contento de tenerlo',
          c: 'Puede que me arrepienta',
        },
      },
      dealHunter: {
        dq1: {
          text: '¿Seguirías queriendo este producto si fuera a precio completo?',
          a: 'Sí — el precio no cambia mi necesidad',
          b: 'Quizás, si el precio fuera más razonable',
          c: 'No — la oferta es lo que lo hace atractivo',
        },
        dq2: {
          text: '¿Planeabas comprarlo antes de ver la oferta?',
          a: 'Sí — ya lo estaba buscando',
          b: 'Tenía la necesidad, pero la oferta me animó a actuar',
          c: 'No — la oferta me hizo pensar en comprarlo',
        },
        dq3: {
          text: '¿Cuánto estás gastando realmente (no ahorrando)?',
          a: 'Una cantidad que puedo pagar sin problemas',
          b: 'Usará parte de mi presupuesto',
          c: 'Más de lo que había planeado gastar',
        },
        dq4: {
          text: '¿Qué problema concreto te soluciona este producto ahora mismo?',
          a: 'Un problema claro y recurrente que tengo habitualmente',
          b: 'Algo menor u ocasional',
          c: 'No puedo nombrar un problema concreto',
        },
        dq5: {
          text: '¿Cuántas veces habrías usado esto en los últimos 7 días?',
          a: 'Varias veces (3 o más)',
          b: 'Una o dos veces',
          c: 'Cero — no tengo una necesidad activa ahora mismo',
        },
      },
      functional: {
        fq1: {
          text: '¿Qué tarea concreta no puedes hacer sin este producto?',
          a: 'Una tarea habitual y clara para la que no tengo alternativa',
          b: 'Algo que puedo resolver de otra forma, pero es incómodo',
          c: 'Nada específico — solo quiero mejorar lo que tengo',
        },
        fq2: {
          text: '¿Qué estás usando en su lugar actualmente?',
          a: 'Nada — hay una carencia real',
          b: 'Algo que funciona parcialmente',
          c: 'Algo que ya funciona bien',
        },
        fq3: {
          text: '¿Con qué frecuencia lo usarías de manera realista en los próximos 30 días?',
          a: 'A diario o varias veces a la semana',
          b: 'Un par de veces',
          c: 'Una vez o quizás ninguna',
        },
        fq4: {
          text: '¿Qué pasa si no lo compras hoy?',
          a: 'Me quedaré bloqueado en algo importante',
          b: 'Me las apañaré, pero será incómodo',
          c: 'Nada — puedo esperar indefinidamente',
        },
        fq5: {
          text: '¿Es esta la solución más sencilla y económica a tu problema?',
          a: 'Sí — he valorado alternativas y esta es la mejor opción',
          b: 'Probablemente, aunque no he explorado del todo las alternativas',
          c: 'No — hay opciones más sencillas o baratas que no he probado',
        },
      },
      budgetConstrained: {
        bq1: {
          text: '¿Cómo encaja esta compra en tu presupuesto este mes?',
          a: 'Sin impacto — tengo los fondos disponibles claramente',
          b: 'Ligero impacto — tendré que ajustar otros gastos',
          c: 'Impacto importante — necesitaría crédito o tocar mis ahorros',
        },
        bq2: {
          text: '¿A qué renunciarías para hacer sitio a esta compra?',
          a: 'A nada importante — tengo fondos discrecionales disponibles',
          b: 'A algún gasto no esencial',
          c: 'A algo que realmente necesito o a un objetivo de ahorro',
        },
        bq3: {
          text: '¿Esto es una necesidad o un capricho ahora mismo?',
          a: 'Una necesidad real y urgente',
          b: 'Algo entre medias',
          c: 'Sinceramente, un capricho',
        },
        bq4: {
          text: '¿Cómo te sentirías si surgiera un gasto inesperado después de comprarlo?',
          a: 'Bien — tengo ahorros para cubrirlo',
          b: 'Un poco estresado, pero lo gestionaría',
          c: 'Muy estresado — me pondría en una situación difícil',
        },
        bq5: {
          text: '¿Esta compra te acercará o alejará de tus objetivos financieros?',
          a: 'Me acercará, o no tendrá impacto real',
          b: 'Sin impacto claro en ningún sentido',
          c: 'Me alejará — no está alineada con mis objetivos',
        },
      },
    },
  },
  network: {
    offlineWarning: 'Estás desconectado.',
  },
};
