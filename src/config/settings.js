export const SUPPORTED_LANGUAGES = ["ja", "en", "my", "id"];
export const DEFAULT_LANGUAGE = "ja";
export const STORAGE_KEYS = {
  language: "jeraDiagnosticLanguage",
  state: "jeraDiagnosticState",
};

export const MESSENGER_BASE_URL = "https://m.me/jera.career";

export const META_EVENTS = {
  pageView: "PageView",
  start: "StartDiagnostic",
  step: "DiagnosticStep",
  complete: "CompleteDiagnostic",
  result: "JERAResultView",
  messenger: "MessengerClick",
  languageChanged: "LanguageChanged",
};
