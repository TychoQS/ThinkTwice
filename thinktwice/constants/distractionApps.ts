export type DistractionAppId = 'youtube' | 'spotify' | 'instagram' | 'duolingo' | 'browser';

export const DISTRACTION_APPS: Record<DistractionAppId, { deepLink: string; icon: string }> = {
    youtube: { deepLink: 'youtube://', icon: 'logo-youtube' },
    spotify: { deepLink: 'spotify://', icon: 'musical-notes' },
    instagram: { deepLink: 'instagram://', icon: 'logo-instagram' },
    duolingo: { deepLink: 'duolingo://', icon: 'language' },
    browser: { deepLink: 'https://es.wikipedia.org/wiki/Especial:Aleatoria', icon: 'globe-outline' }
};
