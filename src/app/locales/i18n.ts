import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import en from "./en/translation.json";
import fr from "./fr/translation.json";
import { convertLanguageJsonToObject } from "./translations";

export const translationsJson = {
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
};

// Create the 'translations' object to provide full intellisense support for the static json files.
convertLanguageJsonToObject(en);

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources: translationsJson,
    fallbackLng: "en-GB",
    debug: false,

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
