// Characters for Story Mode. Each references an avatarPreset from
// js/ui/components/characterAvatar.js (reused unchanged) plus a gender/accent
// so TTS (js/speech/tts.js) picks a fitting voice, and a personality line the
// conversation screen shows. `player` is the learner's own avatar.

export const CHARACTERS = {
  player: {
    id: 'player', name: 'You', role: 'Traveler / Learner',
    gender: 'neutral', accent: 'american', avatarPreset: 'guest_neutral',
    personality: 'That’s you — speak up and steer the conversation.'
  },

  // Hotel
  grace: {
    id: 'grace', name: 'Grace', role: 'Hotel Receptionist',
    gender: 'female', accent: 'british', avatarPreset: 'receptionist_f',
    personality: 'Warm, professional, and endlessly patient.'
  },
  daniel: {
    id: 'daniel', name: 'Daniel', role: 'Hotel Duty Manager',
    gender: 'male', accent: 'american', avatarPreset: 'manager_m',
    personality: 'Calm problem-solver who wants every guest happy.'
  },

  // Airport
  priya: {
    id: 'priya', name: 'Priya', role: 'Airline Check-in Agent',
    gender: 'female', accent: 'indian', avatarPreset: 'agent_f',
    personality: 'Efficient and friendly, but the clock is always ticking.'
  },
  omar: {
    id: 'omar', name: 'Omar', role: 'Gate Agent',
    gender: 'male', accent: 'international', avatarPreset: 'clerk_m',
    personality: 'Unflappable even when a flight is closing.'
  },

  // Hospital / Pharmacy
  bennett: {
    id: 'bennett', name: 'Dr. Bennett', role: 'Doctor',
    gender: 'female', accent: 'american', avatarPreset: 'doctor_f',
    personality: 'Careful listener; asks one question at a time.'
  },
  fatima: {
    id: 'fatima', name: 'Fatima', role: 'Pharmacist',
    gender: 'female', accent: 'international', avatarPreset: 'pharmacist_f',
    personality: 'Precise about dosages, kind about worries.'
  },

  // Restaurant / Café
  elena: {
    id: 'elena', name: 'Elena', role: 'Waiter',
    gender: 'female', accent: 'international', avatarPreset: 'waiter_f',
    personality: 'Quick, cheerful, remembers the specials by heart.'
  },
  marco: {
    id: 'marco', name: 'Marco', role: 'Restaurant Manager',
    gender: 'male', accent: 'international', avatarPreset: 'manager_m',
    personality: 'Takes complaints seriously and fixes them fast.'
  },

  // Street / Social
  sophie: {
    id: 'sophie', name: 'Sophie', role: 'Friendly Local',
    gender: 'female', accent: 'canadian', avatarPreset: 'assistant_f',
    personality: 'Loves meeting travelers and giving directions.'
  },
  leo: {
    id: 'leo', name: 'Leo', role: 'New Classmate',
    gender: 'male', accent: 'australian', avatarPreset: 'assistant_m',
    personality: 'Chatty and easy-going; happy to make a new friend.'
  },

  // Workplace
  carter: {
    id: 'carter', name: 'Ms. Carter', role: 'Hiring Manager',
    gender: 'female', accent: 'american', avatarPreset: 'manager_f',
    personality: 'Fair but thorough; values clear, honest answers.'
  },
  raj: {
    id: 'raj', name: 'Raj', role: 'Coworker',
    gender: 'male', accent: 'indian', avatarPreset: 'colleague_f',
    personality: 'Direct but reasonable — clear things up and it’s fine.'
  },

  // Café
  mia: {
    id: 'mia', name: 'Mia', role: 'Barista',
    gender: 'female', accent: 'american', avatarPreset: 'assistant_f',
    personality: 'Bubbly and fast; knows every regular’s order.'
  },
  hannah: {
    id: 'hannah', name: 'Hannah', role: 'Old Friend',
    gender: 'female', accent: 'british', avatarPreset: 'colleague_f',
    personality: 'Warm and chatty; you haven’t seen her in years.'
  },

  // Supermarket & Clothing store
  tom: {
    id: 'tom', name: 'Tom', role: 'Store Assistant',
    gender: 'male', accent: 'american', avatarPreset: 'clerk_m',
    personality: 'Helpful and knows exactly which aisle everything is in.'
  },
  zoe: {
    id: 'zoe', name: 'Zoe', role: 'Shop Assistant',
    gender: 'female', accent: 'australian', avatarPreset: 'exec_f',
    personality: 'Stylish, honest about what suits you.'
  },

  // Train station & Taxi
  nina: {
    id: 'nina', name: 'Nina', role: 'Ticket Clerk',
    gender: 'female', accent: 'international', avatarPreset: 'agent_f2',
    personality: 'Quick and precise; the queue is always moving.'
  },
  victor: {
    id: 'victor', name: 'Victor', role: 'Taxi Driver',
    gender: 'male', accent: 'international', avatarPreset: 'driver_m',
    personality: 'Friendly, loves a bit of small talk on the road.'
  },

  // Bank & Police
  david: {
    id: 'david', name: 'David', role: 'Bank Teller',
    gender: 'male', accent: 'british', avatarPreset: 'banker_m',
    personality: 'Calm, patient, careful with the details.'
  },
  grant: {
    id: 'grant', name: 'Officer Grant', role: 'Police Officer',
    gender: 'male', accent: 'american', avatarPreset: 'officer_m',
    personality: 'Reassuring and methodical; takes down every detail.'
  },

  // Home
  emma: {
    id: 'emma', name: 'Emma', role: 'Your Sister',
    gender: 'female', accent: 'american', avatarPreset: 'receptionist_f',
    personality: 'Cheerful morning person — unlike you.'
  },

  // School
  mslee: {
    id: 'mslee', name: 'Ms. Lee', role: 'Teacher',
    gender: 'female', accent: 'american', avatarPreset: 'manager_f',
    personality: 'Encouraging, patient, loves a good question.'
  },
  // Gym
  coach: {
    id: 'coach', name: 'Coach Max', role: 'Fitness Trainer',
    gender: 'male', accent: 'australian', avatarPreset: 'assistant_m',
    personality: 'High-energy and motivating, never pushy.'
  },
  // Museum / tourist guide
  ava: {
    id: 'ava', name: 'Ava', role: 'Museum Guide',
    gender: 'female', accent: 'british', avatarPreset: 'journalist_f',
    personality: 'A walking encyclopedia with a warm smile.'
  },
  // Post office
  pat: {
    id: 'pat', name: 'Pat', role: 'Postal Clerk',
    gender: 'male', accent: 'american', avatarPreset: 'clerk_m',
    personality: 'Efficient and friendly; the queue never scares him.'
  },
  // Library
  ruth: {
    id: 'ruth', name: 'Ruth', role: 'Librarian',
    gender: 'female', accent: 'british', avatarPreset: 'exec_f',
    personality: 'Calm and helpful, with a whisper and a smile.'
  },
  // Seaside
  finn: {
    id: 'finn', name: 'Finn', role: 'Beach Vendor',
    gender: 'male', accent: 'international', avatarPreset: 'barista_m',
    personality: 'Sunny and laid-back, always up for a chat.'
  }
};

export function getCharacter(id) {
  return CHARACTERS[id] || CHARACTERS.player;
}
