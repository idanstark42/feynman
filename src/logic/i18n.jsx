import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'he',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          welcome: 'Welcome',
          plans: {
            free: 'Free',
            monthly: 'Monthly',
            courses: 'Per Course'
          },
          titles: {
            home: 'Home',
            user: 'User',
            about: 'About'
          },
          actions: {
            add: 'add',
            remove: 'remove',
            play: 'play',
            search: 'search',
            logout: 'Logout',
            login: 'Login'
          },
          texts: {
            about: 'about'
          }
        }
      },
      he: {
        translation: {
          welcome: 'ברוכים הבאים',
          plans: {
            free: 'חינם',
            monthly: 'חודשי',
            courses: 'לפי קורס'
          },
          titles: {
            home: 'בית',
            user: 'משתמש',
            about: 'על האתר'
          },
          actions: {
            add: 'הוספה',
            remove: 'הסרה',
            play: 'הפעלה',
            search: 'חיפוש',
            logout: 'יציאה',
            login: 'כניסה'
          },
          texts: {
            about: 'על האתר'
          }
        }
      }
    }
  })

export default i18n