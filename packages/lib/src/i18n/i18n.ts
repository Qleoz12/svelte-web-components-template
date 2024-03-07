import i18next from "i18next";
import LanguageDetector, { type DetectorOptions } from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";
import { createI18nStore, isLoading } from "svelte-i18next";

import es from "./es.json";
import eu from "./eu.json";

const resources = {
  es: { translation: es },
  eu: { translation: eu },
};

const customLanguageDetector = {
  name: "ulrContextLanguageDetector",
  cacheUserLanguage(lng: string, options: DetectorOptions) {
    // al parecer esta funcion sirve para guardar el idioma en un store. en nuestro caso no la necesitamos pero debe implementarse
    console.log(lng, options);
    return lng;
  },
  lookup: (options: DetectorOptions) => {
    console.log(options);
    const url = new URL(window.location.href);
    const resultado = url.pathname
      .split("/")
      .find((idioma) => idioma === ("es") || idioma === ("eu"));
    return resultado ? resultado : "eu";
  },
};

const languageDetector = new LanguageDetector();
languageDetector.addDetector(customLanguageDetector);

i18next
  .use(HttpBackend)
  .use(languageDetector)
  // .use(LanguageDetector)
  .init({
    // lng: localStorage.getItem('language') || 'eu', 
    resources,
    fallbackLng: ["eu", "es"],
    debug: true,
    detection: {
      order: [
        "ulrContextLanguageDetector",
        "querystring",
        "path",
        "cookie",
        "localStorage",
        "sessionStorage",
        "navigator",
        "htmlTag",
        "subdomain",
      ],
      caches: ["localStorage"],
      lookupQuerystring: "lng",
      lookupLocalStorage: "locale",
    },
    interpolation: {
      escapeValue: false,
  },
  });
export const i18n = createI18nStore(i18next);
export const changeLanguage= i18next.changeLanguage


// Listen for changes in localStorage
window.addEventListener("storage", (event) => {
  if (event.key === "locale") {
    i18next.changeLanguage(event.newValue);
  }
});