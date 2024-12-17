import 'react-i18next';

declare module 'react-i18next' {
  interface DefaultResources {
    translation: typeof import('./locales/en/translation.json');
  }
}
