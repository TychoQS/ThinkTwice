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
      title: 'Profile-based',
      description: 'Personalized questions based on your buyer profile',
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
    profileDetection: {
      title: 'Your Profile',
      subtitle: 'Two quick questions to personalise your questionnaire',
      questions: {
        pd1: {
          text: 'What mainly triggered your desire to buy this?',
          a: 'A sudden impulse — I saw it and felt I had to have it',
          b: 'A deal or discount caught my attention',
          c: 'I realised I need it for a specific task',
          d: "I'm not sure — the price is my main concern",
        },
        pd2: {
          text: 'Which of these feels most true right now?',
          a: "I'm excited and want to buy it soon",
          b: 'The savings are a big part of why I want it',
          c: 'I want to make sure the cost is justified for my need',
          d: 'I need to check whether I can actually afford it',
        },
      },
    },
    profiles: {
      impulsive: { label: 'Impulsive Shopper', subtitle: 'Emotion-driven' },
      dealHunter: { label: 'Deal Hunter', subtitle: 'Discount-driven' },
      functional: { label: 'Functional Buyer', subtitle: 'Need-driven' },
      budgetConstrained: { label: 'Budget-Conscious', subtitle: 'Financially mindful' },
    },
    profileQuestions: {
      impulsive: {
        iq1: {
          text: 'What triggered your desire to buy this right now?',
          a: "I've been thinking about this for a while — it genuinely makes sense",
          b: 'I saw it somewhere and felt an immediate excitement',
          c: 'I was bored, stressed, or looking for a mood boost',
        },
        iq2: {
          text: 'How are you feeling about this purchase right now?',
          a: 'Calm and rational — it just makes sense',
          b: 'Excited, but I can think it through',
          c: 'A strong urge to act on it right now',
        },
        iq3: {
          text: 'If you had to wait 48 hours before buying, would you still want it?',
          a: 'Yes, without a doubt',
          b: 'Probably yes',
          c: "I'm not sure",
        },
        iq4: {
          text: 'Can you describe a specific situation this week where you will use it?',
          a: 'Yes — a clear, concrete situation',
          b: 'Maybe — something general',
          c: 'Not really — I just really like it',
        },
        iq5: {
          text: 'How do you think you will feel one week after buying this?',
          a: 'Happy — it will genuinely add value to my life',
          b: 'About the same, but glad I have it',
          c: 'I might regret it',
        },
      },
      dealHunter: {
        dq1: {
          text: 'Would you still want this product if it were full price?',
          a: "Yes — the price doesn't change my need for it",
          b: 'Maybe, if the price were more reasonable',
          c: 'No — the deal is what makes it attractive',
        },
        dq2: {
          text: 'Did you plan to buy this before you saw the deal?',
          a: 'Yes — I was already looking for it',
          b: 'I had the need, but the deal prompted the action',
          c: 'No — the deal made me think of buying it',
        },
        dq3: {
          text: 'How much are you actually spending (not saving)?',
          a: 'An amount I can afford without any issue',
          b: 'It will use up part of my budget',
          c: 'More than I had planned to spend',
        },
        dq4: {
          text: 'What specific problem does this product solve for you right now?',
          a: 'A clear, recurring problem I deal with regularly',
          b: 'Something minor or occasional',
          c: "I can't name a specific problem",
        },
        dq5: {
          text: 'How many times would you have used this in the past 7 days?',
          a: 'Several times (3 or more)',
          b: 'Once or twice',
          c: "Zero — I don't have an active need right now",
        },
      },
      functional: {
        fq1: {
          text: "What specific task can't you accomplish without this product?",
          a: 'A clear, regular task I have no good workaround for',
          b: 'Something I can work around, but it is inconvenient',
          c: 'Nothing specific — I just want an upgrade',
        },
        fq2: {
          text: 'What are you currently using instead?',
          a: 'Nothing — there is a genuine gap in what I have',
          b: 'Something that partially works',
          c: 'Something that already works fine',
        },
        fq3: {
          text: 'How often will you realistically use this in the next 30 days?',
          a: 'Daily or several times a week',
          b: 'A few times',
          c: 'Once, or maybe not at all',
        },
        fq4: {
          text: "What happens if you don't buy this today?",
          a: "I'll be blocked on something important",
          b: "I'll manage, but it will be inconvenient",
          c: 'Nothing — I can wait indefinitely',
        },
        fq5: {
          text: 'Is this the simplest and most cost-effective solution to your problem?',
          a: "Yes — I've considered alternatives and this is the best fit",
          b: 'Probably, but I have not fully explored alternatives',
          c: 'No — there are simpler or cheaper options I have not tried',
        },
      },
      budgetConstrained: {
        bq1: {
          text: 'How does this purchase fit into your budget this month?',
          a: 'No impact — I have the funds clearly available',
          b: 'Slight impact — I will need to adjust other spending',
          c: 'Significant impact — I would need credit or dip into savings',
        },
        bq2: {
          text: 'What would you give up to make room for this purchase?',
          a: 'Nothing significant — I have discretionary funds available',
          b: 'Some non-essential spending',
          c: 'Something I actually need or a savings goal',
        },
        bq3: {
          text: 'Is this a need or a want right now?',
          a: 'A genuine, urgent need',
          b: 'Somewhere in between',
          c: 'Honestly, a want',
        },
        bq4: {
          text: 'How would you feel if an unexpected expense came up after buying this?',
          a: 'Fine — I have savings to cover it',
          b: 'A bit stressed, but I would manage',
          c: 'Very stressed — it would put me in a difficult position',
        },
        bq5: {
          text: 'Will buying this move you closer to or further from your financial goals?',
          a: 'Closer, or no real impact',
          b: 'No clear impact either way',
          c: 'Further away — it is not aligned with my goals',
        },
      },
    },
  },
  network: {
    offlineWarning: 'You are currently offline.',
  },
};
