const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'thinktwice', 'i18n', 'locales');
const files = ['en.ts', 'es.ts', 'ja.ts', 'ko.ts', 'zh.ts', 'ru.ts', 'de.ts'];

const translations = {
  en: "selectApp: 'Select an app...',",
  es: "selectApp: 'Seleccionar app...',",
  ja: "selectApp: 'アプリを選択...',",
  ko: "selectApp: '앱 선택...',",
  zh: "selectApp: '选择应用...',",
  ru: "selectApp: 'Выберите приложение...',",
  de: "selectApp: 'App auswählen...',",
};

files.forEach(file => {
  const lang = file.split('.')[0];
  const t = translations[lang];
  if (!t) return;
  
  const filePath = path.join(localesDir, file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (!content.includes('selectApp:')) {
    content = content.replace(/(distractionApp:\s*['"][^'"]*['"],?)/, `$1\n    ${t}`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Patched', file);
  }
});
