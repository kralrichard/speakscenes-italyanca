// Aggregates every authored dialogue into one registry. To add new content,
// create a new file in this folder exporting an array of createDialogue(...)
// results, then add one line here. Everything else (pickers, engine,
// progress, review) discovers content through this module -- nothing else
// needs to change.
import { HOTEL_DIALOGUES } from './hotel.js?v=5';
import { RESTAURANT_DIALOGUES } from './restaurant.js?v=5';
import { CAFE_DIALOGUES } from './cafe.js?v=5';
import { PHARMACY_DIALOGUES } from './pharmacy.js?v=5';
import { TAXI_DIALOGUES } from './taxi.js?v=5';
import { PASSPORT_CONTROL_DIALOGUES } from './passport-control.js?v=5';
import { AIRPORT_DIALOGUES } from './airport.js?v=5';
import { HOSPITAL_DIALOGUES } from './hospital.js?v=5';
import { PARTY_DIALOGUES } from './party.js?v=5';
import { TRAIN_STATION_DIALOGUES } from './train-station.js?v=5';
import { CLOTHING_STORE_DIALOGUES } from './clothing-store.js?v=5';
import { PHONE_CALL_DIALOGUES } from './phone-call.js?v=5';
import { TECH_STORE_DIALOGUES } from './tech-store.js?v=5';
import { JOB_INTERVIEW_DIALOGUES } from './job-interview.js?v=5';
import { BANK_DIALOGUES } from './bank.js?v=5';
import { TRAVEL_AGENCY_DIALOGUES } from './travel-agency.js?v=5';
import { BUSINESS_MEETING_DIALOGUES } from './business-meeting.js?v=5';
import { DEBATE_TOPICS_DIALOGUES } from './debate-topics.js?v=5';

export const ALL_DIALOGUES = [
  ...HOTEL_DIALOGUES,
  ...RESTAURANT_DIALOGUES,
  ...CAFE_DIALOGUES,
  ...PHARMACY_DIALOGUES,
  ...TAXI_DIALOGUES,
  ...PASSPORT_CONTROL_DIALOGUES,
  ...AIRPORT_DIALOGUES,
  ...HOSPITAL_DIALOGUES,
  ...PARTY_DIALOGUES,
  ...TRAIN_STATION_DIALOGUES,
  ...CLOTHING_STORE_DIALOGUES,
  ...PHONE_CALL_DIALOGUES,
  ...TECH_STORE_DIALOGUES,
  ...JOB_INTERVIEW_DIALOGUES,
  ...BANK_DIALOGUES,
  ...TRAVEL_AGENCY_DIALOGUES,
  ...BUSINESS_MEETING_DIALOGUES,
  ...DEBATE_TOPICS_DIALOGUES
];

export function getDialogueById(id) {
  return ALL_DIALOGUES.find(d => d.id === id);
}

export function findDialogues({ locationId, scenarioId, level, topic } = {}) {
  return ALL_DIALOGUES.filter(d =>
    (!locationId || d.locationId === locationId) &&
    (!scenarioId || d.scenarioId === scenarioId) &&
    (!level || d.level === level) &&
    (!topic || (d.tags || []).includes(topic))
  );
}

/** Returns a Set of "locationId::scenarioId" keys that have at least one
 *  authored dialogue -- used by the picker to mark scenarios as playable
 *  vs. "Coming soon". */
export function getAvailableScenarioKeys() {
  return new Set(ALL_DIALOGUES.map(d => `${d.locationId}::${d.scenarioId}`));
}

/** Returns a Set of level codes that have at least one authored dialogue for
 *  a given location+scenario -- used to grey out levels with no content. */
export function getAvailableLevels(locationId, scenarioId) {
  return new Set(
    ALL_DIALOGUES
      .filter(d => d.locationId === locationId && d.scenarioId === scenarioId)
      .map(d => d.level)
  );
}
