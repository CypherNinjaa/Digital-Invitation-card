/**
 * Wedding invitation data constants
 * Centralized registry of all text, images, and routes extracted from the live site
 */

export const WEDDING_DATE = new Date('2026-07-01T00:00:00');

export const COUPLE = {
  bride: {
    name: 'Meenal',
    parents: 'Daughter of Mr. & Mrs. Sharma',
  },
  groom: {
    name: 'Vikash',
    parents: 'Son of Mr. & Mrs. Patel',
  },
};

export const GOD_QUOTE = '॥ श्री गणेशाय नमः ॥ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥';

export const INTRO_TEXT = 'With the blessings of Shri Ganesh and our beloved families, we joyfully invite you to celebrate the union of';

export const COUNTDOWN_QUOTE = 'A lifetime of togetherness begins with one sacred step';
export const COUNTDOWN_TITLE = 'The Wedding';

export const VENUE = {
  name: 'Rajalakshmi Kalyana Mandapam',
  address1: 'No. 205/1, Velachery Main Road,',
  address2: 'Dhandeeswaram',
  address3: 'Velachery, Chennai, Tamil Nadu — 600042',
  mapUrl: 'https://maps.google.com/?q=Rajalakshmi+Kalyana+Mandapam+Velachery+Chennai',
  imageUrl: 'https://pub-1953a6673e864f3488c645252f75de98.r2.dev/may/Balapriya%20%26%5C/ChatGPT%20Image%20May%2030%2C%202026%2C%2009_57_15%20AM.png',
};

export const EVENTS = [
  {
    title: 'Sangeet Night',
    bg: 'https://pub-1953a6673e864f3488c645252f75de98.r2.dev/website%20assets/events/sangeet/22.png',
    date: {
      day: 'Tuesday',
      num: '30',
      monthYear: 'Jun 2026'
    },
    time: '7:00 PM',
    dark: true,
    tagline: 'An evening of music, dance, and endless celebration.',
    dresscode: {
      colors: ['rgb(138, 79, 76)', 'rgb(212, 175, 55)', 'rgb(245, 236, 212)'],
      names: 'Maroon · Gold · Cream',
      note: 'Traditional Indian/Indo-Western'
    },
    venue: 'Accord Wildlife Pench Resort · Grand Courtyard',
    mapUrl: 'https://maps.google.com/?q=Accord+Wildlife+Pench+Resort'
  },
  {
    title: 'After Party',
    bg: 'https://pub-1953a6673e864f3488c645252f75de98.r2.dev/website%20assets/events/afterparty/65.png',
    date: {
      day: 'Tuesday',
      num: '30',
      monthYear: 'Jun 2026'
    },
    time: '11:00 PM',
    dark: true,
    tagline: 'Let your hair down and party till the stars fade.',
    dresscode: null,
    venue: 'Accord Wildlife Pench Resort · The Lounge',
    mapUrl: 'https://maps.google.com/?q=Accord+Wildlife+Pench+Resort'
  },
  {
    title: 'Carnival',
    bg: 'https://pub-1953a6673e864f3488c645252f75de98.r2.dev/website%20assets/events/carnival/37.png',
    date: {
      day: 'Wednesday',
      num: '1',
      monthYear: 'Jul 2026'
    },
    time: '11:00 AM',
    dark: false,
    tagline: 'A vibrant burst of colors, games, and laughter!',
    dresscode: {
      colors: ['rgb(235, 137, 181)', 'rgb(250, 214, 165)', 'rgb(168, 230, 207)'],
      names: 'Pastel Pink · Peach · Mint',
      note: 'Comfortable & breezy daywear'
    },
    venue: 'Accord Wildlife Pench Resort · Poolside Lawns',
    mapUrl: 'https://maps.google.com/?q=Accord+Wildlife+Pench+Resort'
  },
  {
    title: 'Shera Bandi',
    bg: 'https://pub-1953a6673e864f3488c645252f75de98.r2.dev/website%20assets/events/carnival/37.png',
    date: {
      day: 'Wednesday',
      num: '1',
      monthYear: 'Jul 2026'
    },
    time: '6:00 PM',
    dark: false,
    tagline: 'The groom’s royal procession begins!',
    dresscode: null,
    venue: 'Accord Wildlife Pench Resort · Entrance',
    mapUrl: 'https://maps.google.com/?q=Accord+Wildlife+Pench+Resort'
  },
  {
    title: 'Reception',
    bg: 'https://pub-1953a6673e864f3488c645252f75de98.r2.dev/website%20assets/events/reception/29.png',
    date: {
      day: 'Wednesday',
      num: '1',
      monthYear: 'Jul 2026'
    },
    time: '7:00 PM',
    dark: true,
    tagline: 'Family, love, and shaadi — full filmy package!',
    dresscode: {
      colors: ['rgb(26, 42, 74)', 'rgb(212, 175, 55)'],
      names: 'Navy · Gold',
      note: 'Cocktail formal'
    },
    venue: 'Accord Wildlife Pench Resort · Grand Banquet',
    mapUrl: 'https://maps.google.com/?q=Accord+Wildlife+Pench+Resort'
  },
  {
    title: 'Phere',
    bg: 'https://pub-1953a6673e864f3488c645252f75de98.r2.dev/website%20assets/events/phere/44.png',
    date: {
      day: 'Wednesday',
      num: '1',
      monthYear: 'Jul 2026'
    },
    time: '9:00 PM',
    dark: false,
    tagline: 'The sacred vows to begin our forever.',
    dresscode: {
      colors: ['rgb(138, 32, 48)', 'rgb(212, 175, 55)', 'rgb(242, 234, 225)'],
      names: 'Maroon · Gold · Ivory',
      note: 'Traditional Indian — sarees, lehengas, sherwanis'
    },
    venue: 'Accord Wildlife Pench Resort · Mandap Lawn',
    mapUrl: 'https://maps.google.com/?q=Accord+Wildlife+Pench+Resort'
  }
];

export const STORY_PHOTOS = [
  {
    src: 'https://invifest-demo.vercel.app/assets/Kohli-Anushka-2ITG-1748983672590-scaled.avif',
    cap: 'Memories together'
  },
  {
    src: 'https://invifest-demo.vercel.app/assets/Virat-Kohli-and-Anushka-Sharma-2.webp',
    cap: 'Written in the stars'
  },
  {
    src: 'https://invifest-demo.vercel.app/assets/virat-kohli--anushka-sharma-100712365-3x4.webp',
    cap: 'Joy and laughter'
  },
  {
    src: 'https://invifest-demo.vercel.app/assets/cropped-Virat-Kohli-and-Anushka-Sharma-220820241724319474.avif',
    cap: 'Forever Us'
  }
];

export const FOOTER = {
  messageLine1: "Your presence will turn this real-life romance into a blockbuster we'll never forget.",
  messageLine2: 'Come, dance, laugh, and celebrate with us in true Bollywood style!',
  regards: 'WITH LOVE & GRATITUDE',
  names: `${COUPLE.bride.name} & ${COUPLE.groom.name}`,
};

export const WHATSAPP_CTA = {
  text: 'BUY NOW FOR YOURSELF',
  url: 'https://api.whatsapp.com/send/?phone=919574486049&text=Hi!+I+loved+the+digital+wedding+invitation+demo+on+your+website.+I+would+like+to+create+one+for+my+wedding+too!+Please+share+the+details+and+pricing.+Thank+you!',
};

export const INSTAGRAM_URL = 'https://www.instagram.com/invifestbyaastha';

export const SCRATCH_VALUES = {
  month: 'JULY',
  day: '01',
  year: '2026',
};
