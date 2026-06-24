import { questions } from "./config/questions.js";
import {
  DEFAULT_LANGUAGE,
  MESSENGER_BASE_URL,
  META_EVENTS,
  STORAGE_KEYS,
  SUPPORTED_LANGUAGES,
} from "./config/settings.js";
import { locales } from "./config/locales/index.js";

const state = {
  language: DEFAULT_LANGUAGE,
  landingLanguage: DEFAULT_LANGUAGE,
  currentStep: 0,
  answers: [],
  resultLevel: null,
  startedAt: null,
  utm: {},
};

const views = {
  intro: document.querySelector("#viewIntro"),
  quiz: document.querySelector("#viewQuiz"),
  calculating: document.querySelector("#viewCalculating"),
  result: document.querySelector("#viewResult"),
};

const elements = {
  homeLink: document.querySelector("#homeLink"),
  languageSelect: document.querySelector("#languageSelect"),
  startButton: document.querySelector("#startButton"),
  progressText: document.querySelector("#progressText"),
  progressBar: document.querySelector("#progressBar"),
  questionText: document.querySelector("#questionText"),
  answerList: document.querySelector("#answerList"),
  resultTitle: document.querySelector("#resultTitle"),
  resultLead: document.querySelector("#resultLead"),
  darumaResult: document.querySelector("#darumaResult"),
  darumaImage: document.querySelector("#darumaImage"),
  darumaTitle: document.querySelector("#darumaTitle"),
  darumaCopy: document.querySelector("#darumaCopy"),
  strengthList: document.querySelector("#strengthList"),
  cautionList: document.querySelector("#cautionList"),
  messengerInstruction: document.querySelector("#messengerInstruction"),
  resultCode: document.querySelector("#resultCode"),
  messengerLink: document.querySelector("#messengerLink"),
  copyResultButton: document.querySelector("#copyResultButton"),
  restartButton: document.querySelector("#restartButton"),
};

function getInitialLanguage() {
  const params = new URLSearchParams(window.location.search);
  const queryLanguage = params.get("lang");
  const storedLanguage = localStorage.getItem(STORAGE_KEYS.language);
  const browserLanguage = navigator.language?.slice(0, 2);

  if (SUPPORTED_LANGUAGES.includes(queryLanguage)) return queryLanguage;
  if (SUPPORTED_LANGUAGES.includes(storedLanguage)) return storedLanguage;
  if (SUPPORTED_LANGUAGES.includes(browserLanguage)) return browserLanguage;
  return DEFAULT_LANGUAGE;
}

function getNestedValue(source, path) {
  return path.split(".").reduce((value, key) => value?.[key], source);
}

function translate(path, replacements = {}) {
  const languageValue = getNestedValue(locales[state.language], path);
  const fallbackValue = getNestedValue(locales[DEFAULT_LANGUAGE], path);
  const template = languageValue ?? fallbackValue ?? "";

  return Object.entries(replacements).reduce(
    (text, [key, value]) => text.replaceAll(`{${key}}`, value),
    template,
  );
}

function applyTranslations() {
  document.documentElement.lang = state.language;
  document.documentElement.dir = "ltr";
  elements.languageSelect.value = state.language;
  elements.languageSelect.setAttribute("aria-label", translate("header.language"));

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = translate(node.dataset.i18n);
  });

  renderActiveView();
}

function captureAttribution() {
  const params = new URLSearchParams(window.location.search);
  state.utm = {
    lang: params.get("lang") || "",
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_content: params.get("utm_content") || "",
    utm_term: params.get("utm_term") || "",
  };
}

function track(eventName, payload = {}) {
  const eventPayload = {
    language: state.language,
    landingLanguage: state.landingLanguage,
    currentLanguage: state.language,
    currentStep: state.currentStep + 1,
    utmCampaign: state.utm.utm_campaign,
    ...payload,
  };

  if (window.fbq) {
    const method = eventName === META_EVENTS.pageView ? "track" : "trackCustom";
    window.fbq(method, eventName, eventPayload);
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...eventPayload });
}

function saveState() {
  localStorage.setItem(STORAGE_KEYS.language, state.language);
  localStorage.setItem(
    STORAGE_KEYS.state,
    JSON.stringify({
      currentStep: state.currentStep,
      answers: state.answers,
      resultLevel: state.resultLevel,
      startedAt: state.startedAt,
      landingLanguage: state.landingLanguage,
      utm: state.utm,
    }),
  );
}

function restoreState() {
  const saved = localStorage.getItem(STORAGE_KEYS.state);
  if (!saved) return;

  try {
    const parsed = JSON.parse(saved);
    state.currentStep = parsed.currentStep ?? 0;
    state.answers = Array.isArray(parsed.answers) ? parsed.answers : [];
    state.resultLevel = parsed.resultLevel ?? null;
    state.startedAt = parsed.startedAt ?? null;
    state.landingLanguage = parsed.landingLanguage ?? state.landingLanguage;
    state.utm = parsed.utm ?? state.utm;
  } catch {
    localStorage.removeItem(STORAGE_KEYS.state);
  }
}

function setView(viewName) {
  Object.values(views).forEach((view) => view.classList.add("hidden"));
  views[viewName].classList.remove("hidden");
}

function renderActiveView() {
  if (state.resultLevel) {
    renderResult();
    return;
  }

  if (state.startedAt && state.currentStep < questions.length) {
    renderQuestion();
  }
}

function renderQuestion() {
  setView("quiz");
  const question = questions[state.currentStep];
  const progress = translate("quiz.progress", {
    current: String(state.currentStep + 1),
    total: String(questions.length),
  });

  elements.progressText.textContent = progress;
  elements.progressBar.style.width = `${((state.currentStep + 1) / questions.length) * 100}%`;
  elements.questionText.textContent = translate(`questions.${question.id}.text`);
  elements.answerList.innerHTML = "";

  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.type = "button";
    button.textContent = translate(`questions.${question.id}.answers.${answer.id}`);
    button.addEventListener("click", () => selectAnswer(question.id, answer));
    elements.answerList.append(button);
  });

  track(META_EVENTS.step, {
    questionId: question.id,
    answeredCount: state.answers.length,
  });
}

function selectAnswer(questionId, answer) {
  state.answers[state.currentStep] = {
    questionId,
    answerId: answer.id,
    level: answer.level,
  };

  if (state.currentStep < questions.length - 1) {
    state.currentStep += 1;
    saveState();
    renderQuestion();
    return;
  }

  saveState();
  completeDiagnostic();
}

function startDiagnostic() {
  state.startedAt = new Date().toISOString();
  state.currentStep = 0;
  state.answers = [];
  state.resultLevel = null;
  saveState();
  track(META_EVENTS.start);
  renderQuestion();
}

function completeDiagnostic() {
  setView("calculating");
  window.setTimeout(() => {
    const total = state.answers.reduce((sum, answer) => sum + answer.level, 0);
    const average = total / questions.length;
    state.resultLevel = average >= 2.5 ? "lv3" : average >= 1.7 ? "lv2" : "lv1";
    saveState();
    track(META_EVENTS.complete, { resultLevel: state.resultLevel });
    renderResult();
  }, 650);
}

function getReferralCode() {
  return `jera_${state.language}_${state.resultLevel}`;
}

function getDarumaAsset() {
  const assetByLevel = {
    lv1: "daruma-pink.png",
    lv2: "daruma-blue.png",
    lv3: "daruma-red.png",
  };

  return `./assets/${assetByLevel[state.resultLevel] ?? "daruma-pink.png"}`;
}

function renderList(list, items) {
  list.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    list.append(li);
  });
}

function renderResult() {
  setView("result");
  const result = getNestedValue(locales[state.language], `levels.${state.resultLevel}`)
    ?? getNestedValue(locales[DEFAULT_LANGUAGE], `levels.${state.resultLevel}`);
  const code = getReferralCode();

  elements.resultTitle.textContent = result.title;
  elements.resultLead.textContent = result.lead;
  elements.darumaResult.dataset.level = state.resultLevel;
  elements.darumaImage.src = getDarumaAsset();
  elements.darumaImage.alt = result.daruma.alt;
  elements.darumaTitle.textContent = result.daruma.title;
  elements.darumaCopy.textContent = result.daruma.copy;
  renderList(elements.strengthList, result.strengths);
  renderList(elements.cautionList, result.cautions);
  elements.messengerInstruction.textContent = translate("result.instruction", {
    level: state.resultLevel.toUpperCase(),
  });
  elements.resultCode.textContent = code;
  elements.messengerLink.href = `${MESSENGER_BASE_URL}?ref=${encodeURIComponent(code)}`;

  track(META_EVENTS.result, { resultLevel: state.resultLevel, referralCode: code });
}

async function copyResult() {
  const resultText = `${elements.resultTitle.textContent}\n${elements.resultLead.textContent}\n${getReferralCode()}`;
  await navigator.clipboard.writeText(resultText);
  elements.copyResultButton.textContent = translate("result.copied");
  window.setTimeout(() => {
    elements.copyResultButton.textContent = translate("result.copyButton");
  }, 1600);
}

function restartDiagnostic() {
  localStorage.removeItem(STORAGE_KEYS.state);
  state.currentStep = 0;
  state.answers = [];
  state.resultLevel = null;
  state.startedAt = null;
  setView("intro");
}

function returnToTop(event) {
  event.preventDefault();
  restartDiagnostic();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function changeLanguage(nextLanguage) {
  if (!SUPPORTED_LANGUAGES.includes(nextLanguage)) return;
  const previousLanguage = state.language;
  state.language = nextLanguage;
  saveState();
  applyTranslations();

  if (previousLanguage !== nextLanguage) {
    track(META_EVENTS.languageChanged, {
      previousLanguage,
      selectedLanguage: nextLanguage,
    });
  }
}

function bindEvents() {
  elements.homeLink.addEventListener("click", returnToTop);
  elements.startButton.addEventListener("click", startDiagnostic);
  elements.languageSelect.addEventListener("change", (event) => changeLanguage(event.target.value));
  elements.copyResultButton.addEventListener("click", copyResult);
  elements.restartButton.addEventListener("click", restartDiagnostic);
  elements.messengerLink.addEventListener("click", () => {
    track(META_EVENTS.messenger, {
      resultLevel: state.resultLevel,
      referralCode: getReferralCode(),
    });
  });
}

function init() {
  captureAttribution();
  state.language = getInitialLanguage();
  state.landingLanguage = state.language;
  restoreState();
  bindEvents();
  applyTranslations();
  track(META_EVENTS.pageView);
}

init();
