import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";
import { createI18nStore, isLoading } from "svelte-i18next";

import es from "./es.json";
import eu from "./eu.json";

const resources = {
  es: { translation: es },
  eu: { translation: eu },
};

i18next
  .use(HttpBackend)
  .use(LanguageDetector)
  .init({
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
  });
export const i18n = createI18nStore(i18next);
