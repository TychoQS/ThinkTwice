const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'thinktwice', 'i18n', 'locales');
const locales = ['de.ts', 'ru.ts', 'zh.ts', 'ko.ts', 'ja.ts'];

const translations = {
  de: {
    lobby_crisis: `
    crisis: {
      title: 'Krisen-Toolkit',
      description: 'Schnelle Werkzeuge, um das zwanghafte Muster zu durchbrechen',
    },`,
    settings: `
    distractionApp: 'Ablenkungs-App',
    apps: {
      youtube: 'YouTube',
      spotify: 'Spotify',
      instagram: 'Instagram',
      duolingo: 'Duolingo',
      browser: 'Zufälliger Wikipedia-Artikel',
    },`,
    crisis: `
  crisis: {
    title: 'Krisen-Toolkit',
    subtitle: 'Methoden, um das zwanghafte Muster zu durchbrechen',
    description: 'Verspüren Sie einen starken Drang zu kaufen? Verwenden Sie diese Werkzeuge, um sich etwas Zeit und Abstand zu geben.',
    waitingRoom: {
      title: 'Wartezimmer',
      description: 'Warten Sie 10 Minuten, um sich abzukühlen',
    },
    instantDistraction: {
      title: 'Sofortige Ablenkung',
      description: 'Öffnen Sie Ihre vordefinierte App, um auf andere Gedanken zu kommen',
      notSetTitle: 'Keine App gewählt',
      notSetDesc: 'Bitte wählen Sie zuerst eine Ablenkungs-App in den Einstellungen.',
    },
  },`
  },
  ru: {
    lobby_crisis: `
    crisis: {
      title: 'Набор для кризиса',
      description: 'Быстрые инструменты, чтобы разорвать компульсивный паттерн',
    },`,
    settings: `
    distractionApp: 'Приложение для отвлечения',
    apps: {
      youtube: 'YouTube',
      spotify: 'Spotify',
      instagram: 'Instagram',
      duolingo: 'Duolingo',
      browser: 'Случайная статья из Википедии',
    },`,
    crisis: `
  crisis: {
    title: 'Набор для кризиса',
    subtitle: 'Методы разорвать компульсивный паттерн',
    description: 'Чувствуете сильное желание купить? Используйте эти инструменты, чтобы дать себе время и дистанцию.',
    waitingRoom: {
      title: 'Зал ожидания',
      description: 'Подождите 10 минут, чтобы остыть',
    },
    instantDistraction: {
      title: 'Мгновенное отвлечение',
      description: 'Откройте заданное приложение, чтобы отвлечься',
      notSetTitle: 'Приложение не выбрано',
      notSetDesc: 'Пожалуйста, сначала выберите приложение для отвлечения в настройках.',
    },
  },`
  },
  zh: {
    lobby_crisis: `
    crisis: {
      title: '危机工具箱',
      description: '打破强迫性消费模式的快捷工具',
    },`,
    settings: `
    distractionApp: '转移注意力应用',
    apps: {
      youtube: 'YouTube',
      spotify: 'Spotify',
      instagram: 'Instagram',
      duolingo: 'Duolingo',
      browser: '随机维基百科文章',
    },`,
    crisis: `
  crisis: {
    title: '危机工具箱',
    subtitle: '打破强迫模式的方法',
    description: '有强烈的购买冲动？使用这些工具给自己一点时间和距离。',
    waitingRoom: {
      title: '等待室',
      description: '等待10分钟冷静下来',
    },
    instantDistraction: {
      title: '即刻分心',
      description: '打开预设应用以转移注意力',
      notSetTitle: '未选择应用',
      notSetDesc: '请先在设置中选择重定向应用程序。',
    },
  },`
  },
  ko: {
    lobby_crisis: `
    crisis: {
      title: '위기 툴킷',
      description: '강박적인 패턴을 끊기 위한 빠른 도구',
    },`,
    settings: `
    distractionApp: '주의 분산 앱',
    apps: {
      youtube: 'YouTube',
      spotify: 'Spotify',
      instagram: 'Instagram',
      duolingo: 'Duolingo',
      browser: '무작위 위키백과 문서',
    },`,
    crisis: `
  crisis: {
    title: '위기 툴킷',
    subtitle: '강박 패턴을 끊는 방법',
    description: '강한 구매 충동을 느끼시나요? 이 도구를 사용하여 시간과 거리를 두세요.',
    waitingRoom: {
      title: '대기실',
      description: '구매 전 10분 동안 진정하세요',
    },
    instantDistraction: {
      title: '즉각적인 주의 분산',
      description: '주의를 돌리기 위해 미리 설정된 앱 열기',
      notSetTitle: '앱 미선택됨',
      notSetDesc: '설정에서 먼저 주의 분산 앱을 선택해주세요.',
    },
  },`
  },
  ja: {
    lobby_crisis: `
    crisis: {
      title: '危機ツールキット',
      description: '強迫的なパターンを断ち切るための迅速なツール',
    },`,
    settings: `
    distractionApp: '気を紛らわすアプリ',
    apps: {
      youtube: 'YouTube',
      spotify: 'Spotify',
      instagram: 'Instagram',
      duolingo: 'Duolingo',
      browser: 'ランダムなWikipedia記事',
    },`,
    crisis: `
  crisis: {
    title: '危機ツールキット',
    subtitle: '強迫的なパターンを断ち切る方法',
    description: '強い購買衝動を感じていますか？これらのツールを使用して、時間と距離を置いてください。',
    waitingRoom: {
      title: '待合室',
      description: '購入する前に10分間待って落ち着く',
    },
    instantDistraction: {
      title: '即座の気晴らし',
      description: '気を紛らわすために事前定義されたアプリを開く',
      notSetTitle: 'アプリが選択されていません',
      notSetDesc: 'まず設定で気を紛らわすアプリを選択してください。',
    },
  },`
  }
};

locales.forEach(file => {
  const lang = file.split('.')[0];
  const t = translations[lang];
  if (!t) return;
  
  const filePath = path.join(localesDir, file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Inject lobby_crisis before the end of lobby
  if (!content.includes('crisis: {') || !content.match(/crisis:\s*\{\s*title:/)) {
    content = content.replace(/(questionnaire:\s*\{[\s\S]*?\},)(\s*\}\,)/, `$1${t.lobby_crisis}$2`);
  }
  
  // Inject settings
  if (!content.includes('distractionApp:')) {
    content = content.replace(/(language:\s*['"][^'"]*['"],?)/, `$1${t.settings}`);
  }
  
  // Inject crisis block
  if (!content.includes('crisis: {') || !content.match(/instantDistraction:/)) {
      // Find the last block or just before waitingRoom: {
      content = content.replace(/(\s*waitingRoom:\s*\{)/, `${t.crisis}\n$1`);
  }
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Patched', file);
});
