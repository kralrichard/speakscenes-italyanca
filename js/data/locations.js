// Full location catalog. This is the "menu" shown in the location picker.
// Not every scenario below has authored dialogues yet -- the selection
// screen cross-checks js/data/dialogues/index.js at runtime and shows
// scenarios with no content as "Coming soon" rather than hiding them, so
// the app is honest about scope while still demonstrating the full breadth
// the system is designed for. Adding a new location/scenario here is enough
// for it to show up; drop matching dialogue files in js/data/dialogues/ to
// make it playable.
//
// sceneType keys into the small reusable set of animated scene templates in
// js/ui/components/sceneBackground.js (many locations intentionally share a
// template family -- e.g. every shop uses 'retail' with a different accent
// color -- so the visual system stays maintainable at catalog scale).

// minWorldLevel/featured are additive fields used only by the world map
// (js/ui/screens/worldScreen.js) and its unlock logic
// (js/progress/worldStore.js) -- every other consumer of this file
// (pickerScreen.js, dialogueScreen.js) ignores unknown keys, so adding them
// here cannot break existing screens. Only locations with real authored
// dialogue content today are marked featured: true for the world map's v1.
export const LOCATIONS = [
  { id: 'seaside', name: 'At the Seaside', icon: '🏖️', sceneType: 'seaside', scenarios: [
    { id: 'beach-walk', name: 'Walking on the Beach' },
    { id: 'renting-equipment', name: 'Renting Beach Equipment' },
    { id: 'lifeguard-safety', name: 'Talking to a Lifeguard' },
    { id: 'ice-cream-stand', name: 'At the Ice Cream Stand' }
  ]},
  { id: 'hotel', name: 'At a Hotel', icon: '🏨', sceneType: 'hotel-lobby', featured: true, minWorldLevel: 'A1', scenarios: [
    { id: 'booking-room', name: 'Booking a Room' },
    { id: 'check-in', name: 'Checking In' },
    { id: 'breakfast-info', name: 'Asking About Breakfast' },
    { id: 'reporting-problem', name: 'Reporting a Problem' },
    { id: 'room-change', name: 'Requesting a Room Change' },
    { id: 'late-checkout', name: 'Asking for Late Checkout' },
    { id: 'lost-key', name: 'Losing the Room Key' },
    { id: 'facilities', name: 'Asking About Hotel Facilities' },
    { id: 'complaint', name: 'Making a Complaint' },
    { id: 'housekeeping', name: 'Talking to Housekeeping' },
    { id: 'check-out', name: 'Checking Out' }
  ]},
  { id: 'airport', name: 'At an Airport', icon: '✈️', sceneType: 'airport', featured: true, minWorldLevel: 'A2', scenarios: [
    { id: 'check-in-desk', name: 'Airline Check-in Desk' },
    { id: 'security', name: 'Going Through Security' },
    { id: 'lost-luggage', name: 'Reporting Lost Luggage' },
    { id: 'missed-flight', name: 'Missing a Flight' },
    { id: 'boarding-info', name: 'Asking About Boarding' }
  ]},
  { id: 'airplane', name: 'On an Airplane', icon: '🛫', sceneType: 'airplane-cabin', scenarios: [
    { id: 'finding-seat', name: 'Finding Your Seat' },
    { id: 'inflight-order', name: 'Ordering In-flight Food' },
    { id: 'seatmate-chat', name: 'Talking to a Seatmate' },
    { id: 'turbulence', name: 'During Turbulence' }
  ]},
  { id: 'restaurant', name: 'At a Restaurant', icon: '🍽️', sceneType: 'restaurant', featured: true, minWorldLevel: 'A2', scenarios: [
    { id: 'ordering-food', name: 'Ordering Food' },
    { id: 'menu-questions', name: 'Asking About the Menu' },
    { id: 'order-complaint', name: 'Complaining About an Order' },
    { id: 'splitting-bill', name: 'Splitting the Bill' },
    { id: 'booking-table', name: 'Booking a Table' }
  ]},
  { id: 'cafe', name: 'At a Café', icon: '☕', sceneType: 'cafe', featured: true, minWorldLevel: 'A1', scenarios: [
    { id: 'ordering-coffee', name: 'Ordering Coffee' },
    { id: 'barista-smalltalk', name: 'Small Talk with the Barista' },
    { id: 'studying-chat', name: 'Working/Studying at a Café' },
    { id: 'meeting-friend', name: 'Meeting a Friend' }
  ]},
  { id: 'hospital', name: 'At a Hospital', icon: '🏥', sceneType: 'hospital', featured: true, minWorldLevel: 'A2', scenarios: [
    { id: 'describing-symptoms', name: 'Describing Symptoms' },
    { id: 'doctor-consult', name: 'Talking to a Doctor' },
    { id: 'emergency-room', name: 'At the Emergency Room' }
  ]},
  { id: 'pharmacy', name: 'At a Pharmacy', icon: '💊', sceneType: 'retail', featured: true, minWorldLevel: 'A1', scenarios: [
    { id: 'asking-medicine', name: 'Asking for Medicine' },
    { id: 'side-effects', name: 'Asking About Side Effects' },
    { id: 'refill-prescription', name: 'Refilling a Prescription' }
  ]},
  { id: 'supermarket', name: 'At a Supermarket', icon: '🛒', sceneType: 'retail', scenarios: [
    { id: 'finding-item', name: 'Finding an Item' },
    { id: 'product-questions', name: 'Asking About a Product' },
    { id: 'checkout', name: 'At the Checkout' }
  ]},
  { id: 'train-station', name: 'At a Train Station', icon: '🚆', sceneType: 'transit', scenarios: [
    { id: 'buying-ticket', name: 'Buying a Ticket' },
    { id: 'platform-delay', name: 'Asking About a Delay' },
    { id: 'lost-item', name: 'Reporting a Lost Item' }
  ]},
  { id: 'taxi', name: 'In a Taxi', icon: '🚕', sceneType: 'taxi', featured: true, minWorldLevel: 'A1', scenarios: [
    { id: 'giving-directions', name: 'Giving Directions' },
    { id: 'discussing-fare', name: 'Discussing the Fare' },
    { id: 'driver-smalltalk', name: 'Small Talk with the Driver' }
  ]},
  { id: 'bus-stop', name: 'At a Bus Stop', icon: '🚌', sceneType: 'street', scenarios: [
    { id: 'asking-route', name: 'Asking About the Route' },
    { id: 'waiting-chat', name: 'Waiting and Chatting' }
  ]},
  { id: 'bank', name: 'At a Bank', icon: '🏦', sceneType: 'bank-office', featured: true, minWorldLevel: 'B2', scenarios: [
    { id: 'opening-account', name: 'Opening an Account' },
    { id: 'lost-card', name: 'Reporting a Lost Card' },
    { id: 'charge-complaint', name: 'Complaint About a Charge' }
  ]},
  { id: 'police-station', name: 'At a Police Station', icon: '🚓', sceneType: 'formal-office', scenarios: [
    { id: 'reporting-theft', name: 'Reporting a Theft' },
    { id: 'witness-statement', name: 'Giving a Witness Statement' }
  ]},
  { id: 'job-interview', name: 'At a Job Interview', icon: '💼', sceneType: 'formal-office', featured: true, minWorldLevel: 'B2', scenarios: [
    { id: 'general-interview', name: 'General Interview' },
    { id: 'behavioral-questions', name: 'Behavioral Questions' },
    { id: 'salary-negotiation', name: 'Salary Negotiation' }
  ]},
  { id: 'school', name: 'At School', icon: '🏫', sceneType: 'school', scenarios: [
    { id: 'talking-teacher', name: 'Talking to a Teacher' },
    { id: 'homework-help', name: 'Asking About Homework' }
  ]},
  { id: 'university', name: 'At a University', icon: '🎓', sceneType: 'school', scenarios: [
    { id: 'course-registration', name: 'Registering for a Course' },
    { id: 'professor-chat', name: 'Talking to a Professor' },
    { id: 'campus-life', name: 'Campus Life' }
  ]},
  { id: 'home', name: 'At Home', icon: '🏠', sceneType: 'home', featured: true, minWorldLevel: 'A0', scenarios: [
    { id: 'about-your-day', name: 'Talking About Your Day' },
    { id: 'household-chores', name: 'Household Chores' },
    { id: 'hosting-guest', name: 'Hosting a Guest' }
  ]},
  { id: 'party', name: 'At a Party', icon: '🎉', sceneType: 'party', scenarios: [
    { id: 'meeting-someone-new', name: 'Meeting Someone New' },
    { id: 'party-smalltalk', name: 'Small Talk' },
    { id: 'saying-goodbye', name: 'Saying Goodbye' }
  ]},
  { id: 'gym', name: 'At a Gym', icon: '🏋️', sceneType: 'gym', scenarios: [
    { id: 'membership-questions', name: 'Asking About Membership' },
    { id: 'asking-spotter', name: 'Asking for a Spotter' },
    { id: 'class-signup', name: 'Fitness Class Sign-up' }
  ]},
  { id: 'clothing-store', name: 'At a Clothing Store', icon: '👗', sceneType: 'retail', scenarios: [
    { id: 'asking-size', name: 'Asking for a Size' },
    { id: 'trying-on', name: 'Trying on Clothes' },
    { id: 'returning-item', name: 'Returning a Damaged Product' }
  ]},
  { id: 'tech-store', name: 'At a Technology Store', icon: '💻', sceneType: 'retail', scenarios: [
    { id: 'product-advice', name: 'Asking About a Product' },
    { id: 'comparing-options', name: 'Comparing Options' },
    { id: 'warranty-questions', name: 'Warranty Questions' }
  ]},
  { id: 'travel-agency', name: 'At a Travel Agency', icon: '🧳', sceneType: 'formal-office', scenarios: [
    { id: 'booking-trip', name: 'Booking a Complex Trip' },
    { id: 'changing-itinerary', name: 'Changing an Itinerary' }
  ]},
  { id: 'car-rental', name: 'At a Car Rental Office', icon: '🚗', sceneType: 'formal-office', scenarios: [
    { id: 'renting-car', name: 'Renting a Car' },
    { id: 'return-problem', name: 'Reporting a Return Problem' }
  ]},
  { id: 'passport-control', name: 'At Passport Control', icon: '🛂', sceneType: 'airport', scenarios: [
    { id: 'standard-entry', name: 'Standard Entry Questions' },
    { id: 'extended-questioning', name: 'Extended Questioning' }
  ]},
  { id: 'customs', name: 'At Customs', icon: '📦', sceneType: 'airport', scenarios: [
    { id: 'declaring-items', name: 'Declaring Items' },
    { id: 'random-check', name: 'Random Check' }
  ]},
  { id: 'business-meeting', name: 'During a Business Meeting', icon: '🤝', sceneType: 'formal-office', scenarios: [
    { id: 'project-update', name: 'Giving a Project Update' },
    { id: 'negotiation', name: 'Negotiating a Deal' },
    { id: 'presentation', name: 'Giving a Presentation' }
  ]},
  { id: 'phone-call', name: 'During a Phone Call', icon: '📞', sceneType: 'home', scenarios: [
    { id: 'resolving-misunderstanding', name: 'Resolving a Misunderstanding' },
    { id: 'making-appointment', name: 'Making an Appointment' },
    { id: 'customer-service-call', name: 'Customer Service Call' }
  ]},
  { id: 'new-person', name: 'Meeting a New Person', icon: '🙋', sceneType: 'party', scenarios: [
    { id: 'introducing-yourself', name: 'Introducing Yourself' },
    { id: 'exchanging-contact', name: 'Exchanging Contact Info' }
  ]},
  { id: 'friend-chat', name: 'Talking to a Friend', icon: '👯', sceneType: 'home', scenarios: [
    { id: 'catching-up', name: 'Catching Up' },
    { id: 'weekend-plans', name: 'Making Weekend Plans' },
    { id: 'sharing-news', name: 'Sharing News' }
  ]},
  { id: 'directions', name: 'Asking for Directions', icon: '🧭', sceneType: 'street', scenarios: [
    { id: 'asking-directions', name: 'Asking for Directions' },
    { id: 'being-lost', name: 'Being Lost' }
  ]},
  { id: 'complaint', name: 'Making a Complaint', icon: '📣', sceneType: 'retail', scenarios: [
    { id: 'returning-product', name: 'Returning a Product' },
    { id: 'service-complaint', name: 'Complaining About Service' }
  ]},
  { id: 'feelings', name: 'Talking About Feelings', icon: '💬', sceneType: 'home', scenarios: [
    { id: 'bad-day', name: 'Talking About a Bad Day' },
    { id: 'emotional-support', name: 'Giving Emotional Support' },
    { id: 'discussing-stress', name: 'Discussing Stress' }
  ]},
  { id: 'debate-topics', name: 'Complex Social & Professional Topics', icon: '🧠', sceneType: 'cafe', scenarios: [
    { id: 'social-issue-debate', name: 'Debating a Social Issue' },
    { id: 'philosophical-discussion', name: 'A Philosophical Discussion' },
    { id: 'cultural-discussion', name: 'A Cultural Discussion' }
  ]}
];

export function getLocation(id) {
  return LOCATIONS.find(l => l.id === id);
}

export function getScenario(locationId, scenarioId) {
  const loc = getLocation(locationId);
  return loc && loc.scenarios.find(s => s.id === scenarioId);
}

// Cross-cutting conversational topics. A dialogue can carry several of these
// as tags so the picker can filter "show me every complaint scenario"
// regardless of which physical location it happens in.
export const TOPICS = [
  { id: 'small-talk', name: 'Small Talk' },
  { id: 'complaint', name: 'Making a Complaint' },
  { id: 'negotiation', name: 'Negotiation' },
  { id: 'problem-solving', name: 'Solving a Problem' },
  { id: 'booking', name: 'Booking Something' },
  { id: 'ordering', name: 'Ordering Something' },
  { id: 'making-plans', name: 'Making Plans' },
  { id: 'feelings', name: 'Talking About Feelings' },
  { id: 'directions', name: 'Asking for Directions' },
  { id: 'meeting-someone', name: 'Meeting Someone New' },
  { id: 'interview', name: 'Interview' },
  { id: 'advice', name: 'Giving or Asking for Advice' },
  { id: 'apology', name: 'Apologizing' },
  { id: 'abstract-discussion', name: 'Abstract / Social Discussion' }
];
