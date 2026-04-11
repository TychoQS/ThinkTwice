export default {
  welcome: {
    title: 'ThinkTwice',
    subtitle: 'Make mindful decisions before every purchase',
    description:
      'We help you pause, reflect, and avoid impulse buying through guided conversations and smart questionnaires.',
    getStarted: 'Get Started',
  },
  lobby: {
    title: 'How would you like to reflect?',
    subtitle: 'Choose a method to analyze your purchase decision',
    chatbot: {
      title: 'Chatbot',
      description: 'Have a guided conversation about your purchase',
    },
    questionnaire: {
      title: 'Questionnaire',
      description: 'Answer quick questions to evaluate your decision',
    },
    crisis: {
      title: 'Crisis Toolkit',
      description: 'Quick tools to break the compulsive pattern',
    },
  },
  chat: {
    title: 'Chat',
    inputPlaceholder: 'Describe what you want to buy...',
    send: 'Send',
    welcomeMessage:
      "Hi! I'm here to help you think twice about your purchase. Tell me, what are you considering buying?",
    thinkingMessage:
      "That's interesting. Let me ask you a few questions to help you reflect on this decision.",
    errorMessage: 'Sorry, something went wrong. Please try again.',
    networkError: 'Connection error. Please check your internet and try again.',
    typingIndicator: 'AI is thinking...',
    retryButton: 'Retry',
  },
  drawer: {
    home: 'Home',
    settings: 'Settings',
    darkMode: 'Dark mode',
    lightMode: 'Light mode',
  },
  settings: {
    title: 'Settings',
    appearance: 'Appearance',
    theme: 'Theme',
    themeSystem: 'System',
    themeLight: 'Light',
    themeDark: 'Dark',
    fontSize: 'Font size',
    fontSmall: 'Small',
    fontMedium: 'Medium',
    fontLarge: 'Large',
    language: 'Language',
    distractionApp: 'Instant Distraction App',
    selectApp: 'Select an app...',
    apps: {
      youtube: 'YouTube',
      spotify: 'Spotify',
      instagram: 'Instagram',
      duolingo: 'Duolingo',
      browser: 'Random Wikipedia Article',
    },
  },
  crisis: {
    title: 'Crisis Toolkit',
    subtitle: 'Methods to break the compulsive pattern',
    description: 'Feeling a strong urge to buy? Use these tools to give yourself some time and distance.',
    waitingRoom: {
      title: 'Digital Waiting Room',
      description: 'Wait 10 minutes to cool down before purchasing',
    },
    instantDistraction: {
      title: 'Instant Distraction',
      description: 'Open your predefined app to get your mind off it',
    },
  },
  waitingRoom: {
    title: 'Waiting Room',
    subtitle: 'Breathe and let time pass',
    timeRemaining: 'Time remaining:',
    completed: "Time's up! Do you still want to buy it?",
    leave: 'Leave Waiting Room',
  },
  questionnaire: {
    modeTitle: 'Choose your test',
    modeSubtitle: 'How much time do you have to reflect?',
    quickTest: {
      title: 'Quick Test',
      description: 'Answer 8 questions and get an instant recommendation',
    },
    customTest: {
      title: 'Product-specific',
      description: 'Personalized questions based on the type of product',
      comingSoon: 'Coming soon',
    },
    start: 'Start',
    progress: 'Question {{current}} of {{total}}',
    back: 'Back',
    next: 'Next',
    result: {
      title: 'Your result',
      proceed: {
        label: 'Go for it!',
        description: "You've thought this through well. This looks like a considered purchase, not an impulse.",
      },
      wait: {
        label: 'Think it over',
        description: 'There are some yellow flags. Consider waiting a few days before deciding.',
      },
      avoid: {
        label: 'Avoid this purchase',
        description: "This looks like an impulse buy. Take a step back — you'll likely be glad you waited.",
      },
      tryAgain: 'Try again',
      backHome: 'Back to home',
    },
    questions: {
      q1: {
        text: 'Had you planned this purchase before today?',
        a: "Yes, I've been thinking about it for a while",
        b: 'I thought about it a few days ago',
        c: 'No, I just came across it',
      },
      q2: {
        text: 'Can you afford this without affecting your finances?',
        a: 'Yes, it fits comfortably in my budget',
        b: 'I could, but it would stretch my budget',
        c: "No, I'd use credit or savings",
      },
      q3: {
        text: 'Do you already own something similar that works well?',
        a: "No, I genuinely need it",
        b: "I have something similar but it doesn't fully meet my needs",
        c: 'Yes, I have something that does the same job',
      },
      q4: {
        text: 'Would you still want this in 30 days?',
        a: "Absolutely, it's something I've wanted for a while",
        b: 'Probably yes',
        c: "I'm not sure",
        d: 'Possibly not',
      },
      q5: {
        text: 'How would you describe this purchase?',
        a: "It's a real necessity",
        b: "It's something useful I want",
        c: "It's a spur-of-the-moment impulse",
      },
      q6: {
        text: 'Have you compared prices or researched alternatives?',
        a: "Yes, I've done my research",
        b: "I've looked a bit but not in depth",
        c: "No, I'd buy it right away",
      },
      q7: {
        text: 'Are you buying influenced by a current emotion (stress, excitement, sadness)?',
        a: "No, my mood isn't influencing this",
        b: 'Maybe a little',
        c: "Yes, I'm feeling emotional right now",
      },
      q8: {
        text: 'If you waited a week, what do you think would happen?',
        a: "I'd still be just as convinced",
        b: 'I might change my mind',
        c: "I'd probably be glad I didn't buy it",
      },
    },
  },
  network: {
    offlineWarning: 'You are currently offline.',
  },
};
