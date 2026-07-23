// Italian dialogue library. Every file exports an array of createDialogue({...})
// objects; createDialogue validates on import, so a malformed dialogue fails
// loudly at boot with its id instead of half-rendering inside a lesson.
//
// Adding a location: author the file, import it here, and add it to the spread
// below — nothing else in the app needs to change.

import { CAFE_DIALOGUES } from './cafe.js?v=5';
import { RESTAURANT_DIALOGUES } from './restaurant.js?v=5';
import { HOTEL_DIALOGUES } from './hotel.js?v=5';
import { DIRECTIONS_DIALOGUES } from './directions.js?v=5';
import { SUPERMARKET_DIALOGUES } from './supermarket.js?v=5';
import { PHARMACY_DIALOGUES } from './pharmacy.js?v=5';
import { NEW_PERSON_DIALOGUES } from './new-person.js?v=5';
import { JOB_INTERVIEW_DIALOGUES } from './job-interview.js?v=5';
import { FRIEND_CHAT_DIALOGUES } from './friend-chat.js?v=5';
import { TAXI_DIALOGUES } from './taxi.js?v=5';

export const ALL_DIALOGUES = [
  ...CAFE_DIALOGUES,
  ...RESTAURANT_DIALOGUES,
  ...HOTEL_DIALOGUES,
  ...DIRECTIONS_DIALOGUES,
  ...SUPERMARKET_DIALOGUES,
  ...PHARMACY_DIALOGUES,
  ...NEW_PERSON_DIALOGUES,
  ...JOB_INTERVIEW_DIALOGUES,
  ...FRIEND_CHAT_DIALOGUES,
  ...TAXI_DIALOGUES
];

// Same API surface as the original app's index, so every screen (picker,
// dialogue, progress, review, encounter, mini-games) works unchanged.

export function getDialogueById(id) {
  return ALL_DIALOGUES.find(d => d.id === id) || null;
}

export function findDialogues({ locationId, scenarioId, level, topic } = {}) {
  return ALL_DIALOGUES.filter(d =>
    (!locationId || d.locationId === locationId) &&
    (!scenarioId || d.scenarioId === scenarioId) &&
    (!level || d.level === level) &&
    (!topic || (d.tags || []).includes(topic))
  );
}

export function getAvailableScenarioKeys() {
  return new Set(ALL_DIALOGUES.map(d => `${d.locationId}::${d.scenarioId}`));
}

export function getAvailableLevels(locationId, scenarioId) {
  return new Set(
    ALL_DIALOGUES
      .filter(d => (!locationId || d.locationId === locationId) &&
                   (!scenarioId || d.scenarioId === scenarioId))
      .map(d => d.level)
  );
}
