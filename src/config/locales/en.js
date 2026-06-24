export default {
  header: { language: "Language" },
  hero: {
    eyebrow: "For care and hospital workers",
    title: "What is your career type?",
    subtitle: "Answer 5 quick questions to find hints for work style and salary growth in Japan.",
    startButton: "Try the type check",
    bubble: "Takes about 1 minute",
  },
  quiz: { label: "Career type check", helper: "Choose by feeling", progress: "{current}/{total}" },
  calculating: {
    label: "Checking",
    title: "Finding your matching type.",
    copy: "We are preparing your result based on your experience and preferences.",
  },
  result: {
    label: "Your result",
    helper: "Here is your result",
    darumaKicker: "Your Daruma color",
    strengthsTitle: "Your good points",
    cautionsTitle: "Points before consultation",
    copyButton: "Copy result",
    copied: "Copied",
    messengerButton: "Ask on Messenger",
    restartButton: "Check again",
    instruction: "When Messenger opens, please send: “My result was {level}.”",
  },
  trust: {
    eyebrow: "First time is OK",
    title: "A simple check to connect your experience to the next work style.",
    copy: "We organize your care or hospital work experience, Japanese level, and preferences before consultation.",
    item1: "Easy to answer",
    item2: "Result appears immediately",
    item3: "Consult on Messenger",
  },
  footer: {
    notice: "This is a simple check. Final conditions will be confirmed during consultation.",
    privacy: "Privacy policy",
  },
  errors: { missingTranslation: "Some text cannot be displayed." },
  questions: {
    experience: {
      text: "Have you worked at a care facility or hospital?",
      answers: { exp0: "Less than 1 year", exp1: "Less than 2 years", exp2: "2 years or more" },
    },
    japanese: {
      text: "Are you comfortable speaking Japanese with patients, users, or staff?",
      answers: {
        jp0: "Simple conversation is OK",
        jp1: "Daily conversation feels comfortable",
        jp2: "I can explain and discuss work matters",
      },
    },
    skill: {
      text: "Which experience is closest to you?",
      answers: {
        care: "Supporting patients or users as part of a team",
        factory: "Experience working night shifts",
        technical: "Certified at Jitsumusha Kenshu level or above",
      },
    },
    timing: {
      text: "How do you feel about your next work style?",
      answers: {
        soon: "I want to ask soon",
        threeMonths: "I want to think slowly",
        research: "I only want information first",
      },
    },
    goal: {
      text: "What matters most to you?",
      answers: {
        salary: "Higher income",
        stable: "Stable long-term work",
        support: "Support for life and procedures",
      },
    },
  },
  levels: {
    lv1: {
      title: "Slow preparation type",
      lead: "Start by organizing your experience and hopes. It will be easier to find work that fits you.",
      daruma: {
        title: "Soft-preparation pink Daruma",
        copy: "You move best when you prepare calmly first. Support and a clear next step will help you feel ready.",
        alt: "Pink Daruma",
      },
      strengths: ["Strong room to grow", "Easy to prepare with support"],
      cautions: ["Japanese level and experience need to be checked", "A short note about your preferences will help consultation"],
    },
    lv2: {
      title: "Better-condition consultation type",
      lead: "Your field experience may help you discuss better conditions than now.",
      daruma: {
        title: "Calm and steady blue Daruma",
        copy: "You can compare choices based on experience. Looking at salary, shifts, and commute together will lead to a better decision.",
        alt: "Blue Daruma",
      },
      strengths: ["Care or hospital experience can be valued", "You can compare work style and salary conditions"],
      cautions: ["Visa status and work conditions need confirmation", "Check shifts and commute as well as salary"],
    },
    lv3: {
      title: "Ready-to-challenge type",
      lead: "Your experience and communication skills may support salary growth or leader-candidate roles.",
      daruma: {
        title: "Take-action red Daruma",
        copy: "You are ready to move when you see a chance. Sharing your skills clearly can make salary-up consultation smoother.",
        alt: "Red Daruma",
      },
      strengths: ["You can be trusted at the workplace", "Your experience can support better conditions"],
      cautions: ["Sort your preferred conditions by priority", "Prepare specific tasks you can do before consultation"],
    },
  },
};
