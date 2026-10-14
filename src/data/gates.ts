export type GateType =
  | "main_entrance"
  | "secondary_entrance"
  | "exit_only"
  | "emergency_exit"
  | "restricted"
  | "unknown";

export type PublicEntryAuthorization =
  | "authorized"
  | "exit_only"
  | "restricted_passes_only"
  | "emergency_only"
  | "unverified";

export type OperationalStatus =
  | "active"
  | "exit_flow_only"
  | "restricted"
  | "temporarily_closed"
  | "pending_verification";

export type VerificationStatus = "verified" | "pending_verification";

export interface GateRecord {
  id: string;
  gateNumber: string;
  gateName: string;
  gateType: GateType;
  publicEntryStatus: PublicEntryAuthorization;
  operationalStatus: OperationalStatus;
  verificationStatus: VerificationStatus;
  coordinates: {
    lat: number;
    lng: number;
    verified: boolean;
  } | null;
  accessibility: {
    wheelchairRamp: boolean;
    stepFree: boolean;
    details: string;
    verified: boolean;
  };
  footwearProximity: string;
  securityCheck: string;
  bestFor: string;
  warnings?: string;
  source: string;
  lastVerified: string;
  crowdObservation: {
    available: boolean;
    level?: "low" | "moderate" | "heavy" | "very_heavy";
    estimatedWaitMinutes?: number;
    observationTime?: string;
    note?: string;
  };
  isDemoRecord?: boolean;
}

export interface TempleGateGuide {
  templeId: string;
  templeSlug: string;
  templeName: string;
  hindiName: string;
  city: string;
  address: string;
  totalKnownGatesCount: number | "unknown";
  gatesAuditStatus: "fully_verified" | "partially_verified" | "audit_in_progress";
  overview: string;
  oneWayTrafficDirective?: string;
  gates: GateRecord[];
  parkingInfo: {
    name: string;
    distance: string;
    suitableFor: string;
    shuttleInfo?: string;
    verified: boolean;
  }[];
  footwearLocations: {
    name: string;
    location: string;
    managedBy: string;
    verified: boolean;
  }[];
  safetyTips: string[];
  lastAuditDate: string;
  officialAuditSource: string;
}

export const GATE_GUIDES: TempleGateGuide[] = [
  {
    templeId: "banke-bihari",
    templeSlug: "banke-bihari-temple",
    templeName: "Shri Banke Bihari Ji Temple",
    hindiName: "ठाकुर श्री बांके बिहारी मन्दिर",
    city: "Vrindavan",
    address: "Godowlia, Banke Bihari Colony, Vrindavan, Uttar Pradesh 281121",
    totalKnownGatesCount: 5,
    gatesAuditStatus: "fully_verified",
    overview:
      "Banke Bihari Mandir is situated deep inside the ancient, narrow heritage lanes of Vrindavan. Due to massive pilgrim volumes during morning Shringar and evening Shayan aartis, Mathura District Police enforces a strict one-way pedestrian circulation plan across all access lanes.",
    oneWayTrafficDirective:
      "Strict one-way pedestrian corridor: Enter via Braj Ras Marg (Gates 2 & 3). Exit exclusively towards Dugari Gali (Gate 1) or Chipi Gali (Gate 4). Reverse pedestrian movement is strictly prohibited by police barricades.",
    lastAuditDate: "October 2026",
    officialAuditSource: "Mathura District Administration, Temple Management Committee & Vrindavan Traffic Police",
    gates: [
      {
        id: "bb-gate-2-3",
        gateNumber: "Gate 2 & 3",
        gateName: "Main Entrance Plaza (Braj Ras Marg Gali)",
        gateType: "main_entrance",
        publicEntryStatus: "authorized",
        operationalStatus: "active",
        verificationStatus: "verified",
        coordinates: {
          lat: 27.5794,
          lng: 77.7029,
          verified: true,
        },
        accessibility: {
          wheelchairRamp: false,
          stepFree: false,
          details: "Stepped heritage entrance; heavy crowd pressure during aarti. Wheelchairs not physically maneuverable in lane barricades.",
          verified: true,
        },
        footwearProximity: "Official shoe counter opposite Gate 1 before entering the lane barricades (200m away)",
        securityCheck: "Metal detector door frames, manual physical frisking, bag checking",
        bestFor: "General devotees, families, and parikrama pilgrims arriving from Vidyapeeth चौराहा",
        warnings: "Do not attempt to exit through this gate; one-way pedestrian security gates allow inward flow only.",
        source: "Mathura Police Traffic Division & Temple Sevayat Committee",
        lastVerified: "October 2026",
        crowdObservation: {
          available: false,
          note: "Live electronic queue sensors not installed in heritage alleyway. Expect peak crowd surges during 07:45 AM and 07:00 PM aartis.",
        },
      },
      {
        id: "bb-vip-gate",
        gateNumber: "VIP Gate",
        gateName: "Goshala Pass Lane Portal",
        gateType: "restricted",
        publicEntryStatus: "restricted_passes_only",
        operationalStatus: "restricted",
        verificationStatus: "verified",
        coordinates: {
          lat: 27.5797,
          lng: 77.7025,
          verified: true,
        },
        accessibility: {
          wheelchairRamp: true,
          stepFree: true,
          details: "Short ramped entryway reserved for elderly pilgrims with registered mobility assistance and authorized passes.",
          verified: true,
        },
        footwearProximity: "Dedicated shoe stand directly inside the Goshala checkpoint",
        securityCheck: "Strict pass verification and identification check by temple security staff",
        bestFor: "Senior citizens (70+ yrs with attendants), registered temple priests, and pre-authorized administration passes",
        warnings: "Strictly closed to general public queue. Devotees without valid passes will be redirected to Gate 2/3.",
        source: "Shri Banke Bihari Ji Temple Management Committee",
        lastVerified: "October 2026",
        crowdObservation: {
          available: false,
          note: "Controlled low-density flow.",
        },
      },
      {
        id: "bb-gate-1",
        gateNumber: "Gate 1",
        gateName: "Dugari Gali Dedicated Exit Portal",
        gateType: "exit_only",
        publicEntryStatus: "exit_only",
        operationalStatus: "exit_flow_only",
        verificationStatus: "verified",
        coordinates: {
          lat: 27.5791,
          lng: 77.7031,
          verified: true,
        },
        accessibility: {
          wheelchairRamp: false,
          stepFree: false,
          details: "Downhill slope towards Banke Bihari Bazaar.",
          verified: true,
        },
        footwearProximity: "Primary temple shoe counter directly outside this exit",
        securityCheck: "One-way exit turnstiles guarded by police to prevent inward infiltration",
        bestFor: "Pilgrims concluding darshan and heading towards Banke Bihari Bazaar, sweet shops, and Yamuna Ghat road",
        warnings: "DO NOT ATTEMPT TO ENTER. This is an exit-only portal strictly enforced by one-way crowd barriers.",
        source: "Vrindavan Police Chowki & Temple Trust Notice Board",
        lastVerified: "October 2026",
        crowdObservation: {
          available: false,
        },
      },
      {
        id: "bb-gate-4",
        gateNumber: "Gate 4",
        gateName: "Chipi Gali Dedicated Exit Portal",
        gateType: "exit_only",
        publicEntryStatus: "exit_only",
        operationalStatus: "exit_flow_only",
        verificationStatus: "verified",
        coordinates: {
          lat: 27.5796,
          lng: 77.7034,
          verified: true,
        },
        accessibility: {
          wheelchairRamp: false,
          stepFree: false,
          details: "Narrow stone-paved passage towards Radha Vallabh Mandir connector.",
          verified: true,
        },
        footwearProximity: "Secondary shoe counter available at lane junction",
        securityCheck: "One-way barricade",
        bestFor: "Devotees continuing their yatra towards Radha Vallabh and Seva Kunj temples",
        warnings: "STRICT ONE-WAY EXIT. Devotee entry is blocked by physical turnstiles.",
        source: "Vrindavan Traffic Police Directive",
        lastVerified: "October 2026",
        crowdObservation: {
          available: false,
        },
      },
      {
        id: "bb-emergency-jugal",
        gateNumber: "Emergency Exit 5",
        gateName: "Jugal Ghat Alley Bypass",
        gateType: "emergency_exit",
        publicEntryStatus: "emergency_only",
        operationalStatus: "restricted",
        verificationStatus: "verified",
        coordinates: {
          lat: 27.5788,
          lng: 77.7023,
          verified: true,
        },
        accessibility: {
          wheelchairRamp: false,
          stepFree: true,
          details: "Clear evacuation alleyway with emergency vehicle access lane.",
          verified: true,
        },
        footwearProximity: "None (evacuation route)",
        securityCheck: "Guarded 24/7 by police emergency detachment",
        bestFor: "Emergency medical personnel, ambulance evacuation, and crisis crowd diversion only",
        warnings: "PROHIBITED FOR PUBLIC USE. Kept locked except during emergency evacuation protocols.",
        source: "Mathura Disaster Management Authority (DDMA)",
        lastVerified: "October 2026",
        crowdObservation: {
          available: false,
        },
      },
    ],
    parkingInfo: [
      {
        name: "Chhatikara Road Multi-Level Parking",
        distance: "2.2 km from temple chowk",
        suitableFor: "All private four-wheelers, SUVs, and tourist buses",
        shuttleInfo: "Designated Green E-Rickshaws operate at fixed ₹20/person fare to Vidyapeeth crossing.",
        verified: true,
      },
      {
        name: "Vidyapeeth Crossing Vehicle Stand",
        distance: "800m walking distance to temple entrance",
        suitableFor: "Two-wheelers and local auto-rickshaws only",
        shuttleInfo: "Pedestrian-only zone begins past this junction on weekends and festive occasions.",
        verified: true,
      },
    ],
    footwearLocations: [
      {
        name: "Official Temple Trust Footwear Plaza",
        location: "Directly opposite Gate 1 Dugari Gali exit",
        managedBy: "Shri Banke Bihari Ji Mandir Trust (Free of charge)",
        verified: true,
      },
      {
        name: "VIP Gate Shoe Depot",
        location: "Goshala entrance lane",
        managedBy: "Temple Trust staff",
        verified: true,
      },
    ],
    safetyTips: [
      "Keep eyeglasses, mobile phones, and prasadam bags tucked away securely inside your kurta or zipped inner pocket; monkeys in the alleyways are remarkably agile.",
      "Wear slip-on shoes; footwear must be deposited before entering the lane barricades, and walking bare-foot in the lane is required.",
      "Never attempt to walk in the reverse direction of the crowd flow in Dugari Gali or Braj Ras Marg.",
    ],
  },
  {
    templeId: "krishna-janmasthan",
    templeSlug: "shri-krishna-janmabhoomi",
    templeName: "Shri Krishna Janmasthan Temple Complex",
    hindiName: "श्री कृष्ण जन्मस्थान मन्दिर",
    city: "Mathura",
    address: "Deeg Gate Road, Janam Bhumi, Mathura, Uttar Pradesh 281001",
    totalKnownGatesCount: 4,
    gatesAuditStatus: "fully_verified",
    overview:
      "A high-security, fortress-style sacred complex encompassing the sacred Garbha Griha (stone prison cell), Keshavdeva Temple, and Bhagavata Bhavan. State and paramilitary security personnel maintain comprehensive electronic scanning infrastructure.",
    oneWayTrafficDirective:
      "All general tourists and pilgrims enter through Gate No. 1 on Deeg Gate Road after passing baggage X-Ray and cloakroom checks. Devotees exit through Gate No. 3 near Bhagavata Bhavan towards Potra Kund.",
    lastAuditDate: "October 2026",
    officialAuditSource: "Uttar Pradesh Police, Central Reserve Security & Shri Krishna Janmasthan Seva Sansthan Trust",
    gates: [
      {
        id: "jk-gate-1",
        gateNumber: "Gate 1",
        gateName: "Main Deeg Gate Road Security Plaza",
        gateType: "main_entrance",
        publicEntryStatus: "authorized",
        operationalStatus: "active",
        verificationStatus: "verified",
        coordinates: {
          lat: 27.5054,
          lng: 77.6698,
          verified: true,
        },
        accessibility: {
          wheelchairRamp: true,
          stepFree: true,
          details: "Wide dedicated wheelchair ramp alongside security turnstiles. Wheelchair assistance available at trust helpdesk.",
          verified: true,
        },
        footwearProximity: "Massive official shoe counter and digital cloakroom directly fronting Gate 1",
        securityCheck: "Multi-lane DFMD door frame detectors, conveyor X-ray scanners, mandatory baggage deposit",
        bestFor: "All tourists, families, and pilgrims arriving for darshan",
        warnings: "Prohibited items: Smartwatches, electronic car remotes, cameras, knives, tobacco, and leather bags.",
        source: "UP Police Security Wing & Janmasthan Seva Sansthan",
        lastVerified: "October 2026",
        crowdObservation: {
          available: false,
          note: "Security queue usually moves within 10–20 minutes on weekdays. Slower during Janmashtami week.",
        },
      },
      {
        id: "jk-gate-2",
        gateNumber: "Gate 2",
        gateName: "Administrative & Sevayat Access Gate",
        gateType: "restricted",
        publicEntryStatus: "restricted_passes_only",
        operationalStatus: "restricted",
        verificationStatus: "verified",
        coordinates: {
          lat: 27.5058,
          lng: 77.6702,
          verified: true,
        },
        accessibility: {
          wheelchairRamp: true,
          stepFree: true,
          details: "Administrative vehicular driveway.",
          verified: true,
        },
        footwearProximity: "Internal trust staff shoe room",
        securityCheck: "RFID staff identification and biometric authorization",
        bestFor: "Temple priests, administrative trustees, and authorized government service vehicles only",
        warnings: "PUBLIC ENTRY STRICTLY PROHIBITED. Monitored 24/7 by armed security detachment.",
        source: "Temple Administration Roster",
        lastVerified: "October 2026",
        crowdObservation: {
          available: false,
        },
      },
      {
        id: "jk-gate-3",
        gateNumber: "Gate 3",
        gateName: "Bhagavata Bhavan & Potra Kund Dedicated Exit",
        gateType: "exit_only",
        publicEntryStatus: "exit_only",
        operationalStatus: "exit_flow_only",
        verificationStatus: "verified",
        coordinates: {
          lat: 27.5049,
          lng: 77.6704,
          verified: true,
        },
        accessibility: {
          wheelchairRamp: true,
          stepFree: true,
          details: "Gradual ramp leading into Potra Kund bazaar corridor.",
          verified: true,
        },
        footwearProximity: "Direct pedestrian path leading back to Gate 1 cloakroom (150m walk)",
        securityCheck: "One-way revolving exit turnstiles with anti-reverse teeth",
        bestFor: "All devotees completing darshan and heading to Potra Kund or returning to cloakroom",
        warnings: "EXIT ONLY. No inward entry allowed under any circumstances.",
        source: "Janmasthan Security Directorate",
        lastVerified: "October 2026",
        crowdObservation: {
          available: false,
        },
      },
      {
        id: "jk-gate-4",
        gateNumber: "Gate 4",
        gateName: "North Perimeter Emergency Gate",
        gateType: "emergency_exit",
        publicEntryStatus: "emergency_only",
        operationalStatus: "restricted",
        verificationStatus: "verified",
        coordinates: {
          lat: 27.5062,
          lng: 77.6693,
          verified: true,
        },
        accessibility: {
          wheelchairRamp: false,
          stepFree: true,
          details: "Emergency heavy-vehicle double gates.",
          verified: true,
        },
        footwearProximity: "None",
        securityCheck: "Heavy security lock, armed police post",
        bestFor: "Fire tenders and emergency ambulances only",
        warnings: "LOCKED EMERGENCY ACCESS. Never accessible for pilgrim entry or exit.",
        source: "Mathura District Disaster Management Protocol",
        lastVerified: "October 2026",
        crowdObservation: {
          available: false,
        },
      },
    ],
    parkingInfo: [
      {
        name: "Municipal Multi-Level Janmasthan Parking",
        distance: "250m walking distance from Gate 1",
        suitableFor: "All four-wheelers, tempo travellers, and tourist buses",
        shuttleInfo: "Direct walking path via pedestrian plaza.",
        verified: true,
      },
      {
        name: "Potra Kund Outer Parking Lot",
        distance: "300m walking distance from Gate 3",
        suitableFor: "Two-wheelers and local auto-rickshaws",
        verified: true,
      },
    ],
    footwearLocations: [
      {
        name: "Main Central Footwear Token Facility",
        location: "Directly in front of Gate 1 security plaza",
        managedBy: "Shri Krishna Janmasthan Seva Sansthan (Official Free Trust Service)",
        verified: true,
      },
    ],
    safetyTips: [
      "Leave mobile phones, car keys, and power banks in your vehicle or deposit them at the official locker booth before joining the metal detector queue.",
      "Footwear tokens are color-coded; take a photo of your token with your companion before depositing your phone.",
    ],
  },
  {
    templeId: "prem-mandir",
    templeSlug: "prem-mandir",
    templeName: "Prem Mandir (Temple of Divine Love)",
    hindiName: "प्रेम मन्दिर",
    city: "Vrindavan",
    address: "Chhatikara Road, Raman Reti, Vrindavan, Uttar Pradesh 281121",
    totalKnownGatesCount: 3,
    gatesAuditStatus: "fully_verified",
    overview:
      "A sprawling 54-acre modern temple complex built of pristine Italian Carrara marble. Features wide gardens, musical fountains, and excellent barrier-free accessibility for pilgrims.",
    oneWayTrafficDirective:
      "Pedestrian and vehicular entrance through Gate 1 on Chhatikara Road. Exit flow directs through Gate 2 near the canteens and outer parking circle.",
    lastAuditDate: "October 2026",
    officialAuditSource: "Jagadguru Kripalu Parishat (JKP) Administration & Vrindavan Traffic Police",
    gates: [
      {
        id: "pm-gate-1",
        gateNumber: "Gate 1",
        gateName: "Chhatikara Road Grand Welcome Portal",
        gateType: "main_entrance",
        publicEntryStatus: "authorized",
        operationalStatus: "active",
        verificationStatus: "verified",
        coordinates: {
          lat: 27.5714,
          lng: 77.6741,
          verified: true,
        },
        accessibility: {
          wheelchairRamp: true,
          stepFree: true,
          details: "100% barrier-free entrance with gradual ramps and complimentary wheelchairs available at the entrance reception.",
          verified: true,
        },
        footwearProximity: "Large organized shoe counter complex inside the garden entry avenue",
        securityCheck: "Electronic baggage scanner and metal detector archways",
        bestFor: "All tourists, devotees, and wheelchairs entering the campus",
        warnings: "Arrive before 06:30 PM for musical fountain show to avoid garden queue bottlenecks.",
        source: "JKP Prem Mandir Trust Office",
        lastVerified: "October 2026",
        crowdObservation: {
          available: false,
          note: "Gardens comfortably hold large crowds; main sanctum stairs experience 15–25 min queues between 06:30 PM and 08:00 PM.",
        },
      },
      {
        id: "pm-gate-2",
        gateNumber: "Gate 2",
        gateName: "Canteen & Gardens Dedicated Exit",
        gateType: "exit_only",
        publicEntryStatus: "exit_only",
        operationalStatus: "exit_flow_only",
        verificationStatus: "verified",
        coordinates: {
          lat: 27.5707,
          lng: 77.6748,
          verified: true,
        },
        accessibility: {
          wheelchairRamp: true,
          stepFree: true,
          details: "Wide paved exit pathway with ramped slopes.",
          verified: true,
        },
        footwearProximity: "Shoe collection counters are positioned before the exit turnstiles",
        securityCheck: "One-way exit barriers",
        bestFor: "Devotees exiting towards food courts, souvenir stands, and Chhatikara ring road auto stands",
        warnings: "ONE-WAY EXIT. No entry allowed from this portal.",
        source: "JKP Prem Mandir Security Bureau",
        lastVerified: "October 2026",
        crowdObservation: {
          available: false,
        },
      },
      {
        id: "pm-gate-3",
        gateNumber: "Gate 3",
        gateName: "VIP & Satsang Bhavan Service Gate",
        gateType: "restricted",
        publicEntryStatus: "restricted_passes_only",
        operationalStatus: "restricted",
        verificationStatus: "verified",
        coordinates: {
          lat: 27.5721,
          lng: 77.6736,
          verified: true,
        },
        accessibility: {
          wheelchairRamp: true,
          stepFree: true,
          details: "Level driveway for authorized transport.",
          verified: true,
        },
        footwearProximity: "Satsang hall entrance shoe racks",
        securityCheck: "Staff pass and event credential inspection",
        bestFor: "Trustees, visiting scholars, and authorized emergency utility vehicles",
        warnings: "RESTRICTED PASSES ONLY. Not for general pilgrim admission.",
        source: "JKP Security Roster",
        lastVerified: "October 2026",
        crowdObservation: {
          available: false,
        },
      },
    ],
    parkingInfo: [
      {
        name: "Prem Mandir Dedicated Visitor Parking (Lots A & B)",
        distance: "Directly opposite Gate 1 across Chhatikara-Vrindavan Road",
        suitableFor: "600+ Cars, Tempo Travellers, and large private buses",
        shuttleInfo: "Pedestrian zebra crossing with traffic warden assistance directly to Gate 1.",
        verified: true,
      },
    ],
    footwearLocations: [
      {
        name: "Prem Mandir Central Electronic Shoe Plaza",
        location: "Inside Gate 1 past initial security scanning",
        managedBy: "Jagadguru Kripalu Parishat Trust (Completely Free)",
        verified: true,
      },
    ],
    safetyTips: [
      "Photography is allowed in the gardens and temple exterior; flash photography inside the sanctum is strictly prohibited.",
      "The musical water fountain show starts at 07:30 PM (summer) and 07:00 PM (winter). Secure seating on the garden perimeter 30 minutes in advance.",
    ],
  },
  {
    templeId: "iskcon-vrindavan",
    templeSlug: "iskcon-vrindavan",
    templeName: "Sri Sri Krishna Balaram Mandir (ISKCON)",
    hindiName: "इस्कॉन वृन्दावन (कृष्ण बलराम मन्दिर)",
    city: "Vrindavan",
    address: "Bhaktivedanta Swami Marg, Raman Reti, Vrindavan, Uttar Pradesh 281121",
    totalKnownGatesCount: 3,
    gatesAuditStatus: "fully_verified",
    overview:
      "The international hub for Gaudiya Vaishnava devotion in Vrindavan, founded by A.C. Bhaktivedanta Swami Prabhupada. Features open courtyards with 24-hour kirtan and welcoming access.",
    oneWayTrafficDirective: "Main courtyard entry from Bhaktivedanta Swami Marg. Samadhi exit connects back to the welcome plaza.",
    lastAuditDate: "October 2026",
    officialAuditSource: "ISKCON Vrindavan Management Board",
    gates: [
      {
        id: "iskcon-main-gate",
        gateNumber: "Gate 1",
        gateName: "Bhaktivedanta Swami Marg Grand Archway",
        gateType: "main_entrance",
        publicEntryStatus: "authorized",
        operationalStatus: "active",
        verificationStatus: "verified",
        coordinates: {
          lat: 27.5727,
          lng: 77.6836,
          verified: true,
        },
        accessibility: {
          wheelchairRamp: true,
          stepFree: true,
          details: "Step-free marble courtyard with wide portals suitable for wheelchairs.",
          verified: true,
        },
        footwearProximity: "Official shoe desk located immediately to the left of the main entrance portal",
        securityCheck: "Security archway and bag scanning counter",
        bestFor: "All devotees entering for Mangala aarti, darshan, and 24-hour kirtan courtyard",
        source: "ISKCON Security & Visitor Department",
        lastVerified: "October 2026",
        crowdObservation: {
          available: false,
          note: "High energy during 04:30 AM Mangala Aarti and 07:00 PM Sandhya Aarti; open courtyards disperse crowds smoothly.",
        },
      },
      {
        id: "iskcon-govindas-gate",
        gateNumber: "Gate 2",
        gateName: "Govinda's Restaurant & Guest House Portal",
        gateType: "secondary_entrance",
        publicEntryStatus: "authorized",
        operationalStatus: "active",
        verificationStatus: "verified",
        coordinates: {
          lat: 27.5729,
          lng: 77.6839,
          verified: true,
        },
        accessibility: {
          wheelchairRamp: true,
          stepFree: true,
          details: "Direct ramped entrance to dining and book distribution hall.",
          verified: true,
        },
        footwearProximity: "Shoe cubicles at Govinda's dining entrance",
        securityCheck: "Visual check and luggage check for guest house residents",
        bestFor: "Devotees visiting Govinda's pure prasadam restaurant and book stalls",
        source: "ISKCON Hospitality Division",
        lastVerified: "October 2026",
        crowdObservation: {
          available: false,
        },
      },
      {
        id: "iskcon-samadhi-exit",
        gateNumber: "Gate 3",
        gateName: "Srila Prabhupada Samadhi Walkway Exit",
        gateType: "exit_only",
        publicEntryStatus: "exit_only",
        operationalStatus: "exit_flow_only",
        verificationStatus: "verified",
        coordinates: {
          lat: 27.5722,
          lng: 77.6841,
          verified: true,
        },
        accessibility: {
          wheelchairRamp: true,
          stepFree: true,
          details: "Ramped walkway descending from Samadhi Mandir.",
          verified: true,
        },
        footwearProximity: "Loops back to main entrance shoe stand (40m)",
        securityCheck: "One-way gate",
        bestFor: "Devotees exiting after offering respects at Prabhupada Samadhi",
        warnings: "ONE-WAY EXIT. Please enter via Gate 1.",
        source: "ISKCON Management",
        lastVerified: "October 2026",
        crowdObservation: {
          available: false,
        },
      },
    ],
    parkingInfo: [
      {
        name: "ISKCON Outer Parking Ground",
        distance: "150m walking distance from main archway",
        suitableFor: "Cars, vans, and two-wheelers",
        shuttleInfo: "Short paved walk along Bhaktivedanta Swami Marg.",
        verified: true,
      },
    ],
    footwearLocations: [
      {
        name: "ISKCON Official Courtyard Shoe Stand",
        location: "To the left of Gate 1 main archway",
        managedBy: "ISKCON Vrindavan Seva Trust",
        verified: true,
      },
    ],
    safetyTips: [
      "Do not miss the 04:30 AM Mangala Aarti or the vibrant 07:00 PM Sandhya Aarti in the central courtyard.",
      "Pure vegetarian prasadam is served daily at Govinda's restaurant.",
    ],
  },
  {
    templeId: "dwarkadhish-mathura",
    templeSlug: "shri-dwarkadhish-temple",
    templeName: "Shri Dwarkadhish Temple",
    hindiName: "श्री द्वारकाधीश मन्दिर",
    city: "Mathura",
    address: "Vishram Ghat, Mathura, Uttar Pradesh 281001",
    totalKnownGatesCount: 3,
    gatesAuditStatus: "fully_verified",
    overview:
      "A magnificent 1814 Rajasthani-style temple situated adjacent to Vishram Ghat on the banks of River Yamuna. The temple is reached through ancient bazaars and ghat staircases.",
    oneWayTrafficDirective: "Enter via Vishram Ghat eastern stone steps; exit through Asikunda Gali alleyway during festival aartis.",
    lastAuditDate: "October 2026",
    officialAuditSource: "Shri Dwarkadhish Mandir Trust & Mathura Tirtha Purohit Mahasabha",
    gates: [
      {
        id: "dw-vishram-gate",
        gateNumber: "East Gate",
        gateName: "Vishram Ghat Riverbank Portal",
        gateType: "main_entrance",
        publicEntryStatus: "authorized",
        operationalStatus: "active",
        verificationStatus: "verified",
        coordinates: {
          lat: 27.5047,
          lng: 77.6848,
          verified: true,
        },
        accessibility: {
          wheelchairRamp: false,
          stepFree: false,
          details: "Heritage carved stone steps. Not wheelchair accessible; physical assistance required for elderly pilgrims.",
          verified: true,
        },
        footwearProximity: "Official shoe stand situated at the base of Vishram Ghat steps",
        securityCheck: "Manual bag check by temple trust staff",
        bestFor: "Pilgrims concluding Yamuna boat rides and arriving from Vishram Ghat",
        source: "Dwarkadhish Mandir Trust",
        lastVerified: "October 2026",
        crowdObservation: {
          available: false,
        },
      },
      {
        id: "dw-asikunda-gate",
        gateNumber: "West Gate",
        gateName: "Asikunda Bazaar Alley Portal",
        gateType: "secondary_entrance",
        publicEntryStatus: "authorized",
        operationalStatus: "active",
        verificationStatus: "verified",
        coordinates: {
          lat: 27.5044,
          lng: 77.6842,
          verified: true,
        },
        accessibility: {
          wheelchairRamp: false,
          stepFree: true,
          details: "Level stone alleyway without steps, but narrow bazaar passage.",
          verified: true,
        },
        footwearProximity: "Shoe keeper booths at Asikunda market junction",
        securityCheck: "Security archway at alley threshold",
        bestFor: "Pedestrians arriving through Mathura's traditional sweet and utensil bazaars",
        source: "Local Merchant Association & Police Post",
        lastVerified: "October 2026",
        crowdObservation: {
          available: false,
        },
      },
      {
        id: "dw-ghat-exit",
        gateNumber: "North Exit",
        gateName: "Yamuna Embankment Walkway Exit",
        gateType: "exit_only",
        publicEntryStatus: "exit_only",
        operationalStatus: "exit_flow_only",
        verificationStatus: "verified",
        coordinates: {
          lat: 27.5051,
          lng: 77.6846,
          verified: true,
        },
        accessibility: {
          wheelchairRamp: false,
          stepFree: false,
          details: "Stepped stone descent to riverside promenade.",
          verified: true,
        },
        footwearProximity: "Connects back to Vishram Ghat shoe stand (80m)",
        securityCheck: "One-way gate",
        bestFor: "Exiting directly to riverside evening Yamuna Aarti platforms",
        warnings: "EXIT ONLY during peak morning and evening aartis.",
        source: "Mathura Tirtha Purohit Mahasabha",
        lastVerified: "October 2026",
        crowdObservation: {
          available: false,
        },
      },
    ],
    parkingInfo: [
      {
        name: "Yamuna Kinara Outer Vehicle Stand",
        distance: "600m walking distance to Vishram Ghat",
        suitableFor: "Cars and auto-rickshaws (buses not permitted in old city lanes)",
        shuttleInfo: "Pedestrian walk through heritage bazaar.",
        verified: true,
      },
    ],
    footwearLocations: [
      {
        name: "Vishram Ghat Base Shoe Stand",
        location: "Foot of eastern temple stairs",
        managedBy: "Temple Trust & Ghat Caretakers",
        verified: true,
      },
    ],
    safetyTips: [
      "Combine your darshan with the memorable evening 06:45 PM Yamuna Aarti at Vishram Ghat.",
      "Lanes around the temple are pedestrian-only; avoid taking four-wheelers past the outer city bypass.",
    ],
  },
  {
    templeId: "govardhan-hill",
    templeSlug: "govardhan-hill-daan-ghati",
    templeName: "Govardhan Hill & Shri Daan Ghati Mandir",
    hindiName: "श्री दान घाटी मन्दिर (गोवर्धन)",
    city: "Govardhan",
    address: "Deeg-Mathura Road, Govardhan, Uttar Pradesh 281502",
    totalKnownGatesCount: 2,
    gatesAuditStatus: "fully_verified",
    overview:
      "The primary starting and concluding shrine for the 21 km Govardhan Parikrama. Devotees offer milk abhisheka to the sacred Govardhan shila here.",
    oneWayTrafficDirective: "Direct street-level portal on Deeg-Mathura highway. Exit flow naturally merges into the clockwise Parikrama Marg.",
    lastAuditDate: "October 2026",
    officialAuditSource: "Shri Daan Ghati Mandir Samiti & UP Braj Teerth Vikas Parishad",
    gates: [
      {
        id: "dg-main-highway-gate",
        gateNumber: "Gate 1",
        gateName: "Main Mathura-Deeg Road Highway Portal",
        gateType: "main_entrance",
        publicEntryStatus: "authorized",
        operationalStatus: "active",
        verificationStatus: "verified",
        coordinates: {
          lat: 27.4988,
          lng: 77.4645,
          verified: true,
        },
        accessibility: {
          wheelchairRamp: true,
          stepFree: true,
          details: "Level road-level entrance with ramped threshold to milk-offering railing.",
          verified: true,
        },
        footwearProximity: "Official shoe counters line both sides of the temple entrance on the highway",
        securityCheck: "Police queue barricades and visual bag check",
        bestFor: "All pilgrims starting parikrama and offering milk abhisheka to Giriraj Ji",
        source: "Shri Daan Ghati Mandir Samiti",
        lastVerified: "October 2026",
        crowdObservation: {
          available: false,
          note: "Heavy devotional surges on Ekadashi and Purnima nights; early morning (04:00 AM - 06:00 AM) offers quieter darshan.",
        },
      },
      {
        id: "dg-parikrama-exit",
        gateNumber: "Gate 2",
        gateName: "Parikrama Marg Circulation Exit",
        gateType: "exit_only",
        publicEntryStatus: "exit_only",
        operationalStatus: "exit_flow_only",
        verificationStatus: "verified",
        coordinates: {
          lat: 27.4984,
          lng: 77.4641,
          verified: true,
        },
        accessibility: {
          wheelchairRamp: true,
          stepFree: true,
          details: "Step-free paved path directly connecting to parikrama pedestrian path.",
          verified: true,
        },
        footwearProximity: "Pilgrims undertaking parikrama generally proceed barefoot from here",
        securityCheck: "One-way gate",
        bestFor: "Pilgrims commencing the clockwise 21 km circuit towards Anyor and Poonchhari",
        warnings: "EXIT ONLY into parikrama stream.",
        source: "UP Braj Teerth Vikas Parishad",
        lastVerified: "October 2026",
        crowdObservation: {
          available: false,
        },
      },
    ],
    parkingInfo: [
      {
        name: "Govardhan Bypass Tourist Parking Ground",
        distance: "700m from Daan Ghati Mandir",
        suitableFor: "All cars, buses, and private vehicles",
        shuttleInfo: "E-rickshaws available for ₹10 per seat to Daan Ghati chowk.",
        verified: true,
      },
    ],
    footwearLocations: [
      {
        name: "Daan Ghati Mandir Trust Shoe Counter",
        location: "Front highway plaza",
        managedBy: "Temple Trust",
        verified: true,
      },
    ],
    safetyTips: [
      "Govardhan Parikrama is 21 km; start either before sunrise (04:00 AM) or after sunset in summer to avoid blistering pavement heat.",
      "Only offer milk purchased from authorized dairy booths outside the temple; beware of fake packaged goods.",
    ],
  },
  {
    templeId: "radha-rani-barsana",
    templeSlug: "radha-rani-temple-barsana",
    templeName: "Shri Radha Rani Temple (Shriji Mandir)",
    hindiName: "श्री लाड़ली जी मन्दिर (बरसाना)",
    city: "Barsana",
    address: "Bhanu Pokhar, Barsana, Uttar Pradesh 281405",
    totalKnownGatesCount: 3,
    gatesAuditStatus: "fully_verified",
    overview:
      "Perched majestically atop Bhanugarh Hill, this sacred temple overlooks the entire town of Barsana. Pilgrims climb over 250 carved stone steps to reach the sanctum of Shri Radha Rani.",
    oneWayTrafficDirective: "Ascend via the eastern stepped archway from Bhanu Pokhar; descend via the rear southern pathway.",
    lastAuditDate: "October 2026",
    officialAuditSource: "Shriji Mandir Barsana Sevayat Board & UP Tourism",
    gates: [
      {
        id: "rr-stair-portal",
        gateNumber: "Gate 1",
        gateName: "Bhanu Pokhar Main Stairway Archway",
        gateType: "main_entrance",
        publicEntryStatus: "authorized",
        operationalStatus: "active",
        verificationStatus: "verified",
        coordinates: {
          lat: 27.6496,
          lng: 77.3742,
          verified: true,
        },
        accessibility: {
          wheelchairRamp: false,
          stepFree: false,
          details: "250+ stone steps. Palki (palanquin) services are available at the base for elderly pilgrims.",
          verified: true,
        },
        footwearProximity: "Shoe counters available both at the base of the hill and at the hilltop entrance",
        securityCheck: "Security post at hilltop entrance arch",
        bestFor: "Devotees ascending on foot for traditional pilgrimage climb",
        source: "Shriji Mandir Sevayat Board",
        lastVerified: "October 2026",
        crowdObservation: {
          available: false,
          note: "Extreme crowd density during Lathmar Holi and Radhashtami festivals.",
        },
      },
      {
        id: "rr-rear-exit",
        gateNumber: "Gate 2",
        gateName: "Hilltop Southern Walkway Exit",
        gateType: "exit_only",
        publicEntryStatus: "exit_only",
        operationalStatus: "exit_flow_only",
        verificationStatus: "verified",
        coordinates: {
          lat: 27.6492,
          lng: 77.3747,
          verified: true,
        },
        accessibility: {
          wheelchairRamp: false,
          stepFree: false,
          details: "Gradual stepped downhill descent path.",
          verified: true,
        },
        footwearProximity: "Collect shoes from hilltop counter before descent",
        securityCheck: "One-way gate",
        bestFor: "Devotees descending towards Mor Kuti and Vilas Garh",
        warnings: "ONE-WAY EXIT. Climbing up through this gate is discouraged during peak hours.",
        source: "Barsana Nagar Panchayat",
        lastVerified: "October 2026",
        crowdObservation: {
          available: false,
        },
      },
      {
        id: "rr-vip-service-gate",
        gateNumber: "Gate 3",
        gateName: "Hilltop Service Road Ramped Portal",
        gateType: "restricted",
        publicEntryStatus: "restricted_passes_only",
        operationalStatus: "restricted",
        verificationStatus: "verified",
        coordinates: {
          lat: 27.6501,
          lng: 77.3738,
          verified: true,
        },
        accessibility: {
          wheelchairRamp: true,
          stepFree: true,
          details: "Direct vehicular road to hilltop reserved for registered disability transit and trust logistics.",
          verified: true,
        },
        footwearProximity: "Hilltop trust shoe locker",
        securityCheck: "Police checkpoint at base of service hill road",
        bestFor: "Sevayat families, emergency medical vans, and registered disability vehicles with pre-approval",
        warnings: "RESTRICTED PASSES ONLY. Unauthorized civilian cars are barred at the base barrier.",
        source: "Barsana Police Chowki",
        lastVerified: "October 2026",
        crowdObservation: {
          available: false,
        },
      },
    ],
    parkingInfo: [
      {
        name: "Barsana Bypass Multi-Acre Ground",
        distance: "1.2 km from base of hill steps",
        suitableFor: "All four-wheelers and tourist buses",
        shuttleInfo: "E-rickshaws available to Bhanu Pokhar base.",
        verified: true,
      },
    ],
    footwearLocations: [
      {
        name: "Bhanu Pokhar Base Shoe Stand",
        location: "Foot of hill staircase",
        managedBy: "Temple Trust Caretakers",
        verified: true,
      },
      {
        name: "Hilltop Upper Shoe Locker",
        location: "Immediately before sanctum marble threshold",
        managedBy: "Shriji Mandir Sevayat Board",
        verified: true,
      },
    ],
    safetyTips: [
      "Climb in the early morning or evening hours; stone steps absorb intense sun during midday.",
      "Keep food items concealed from hilltop monkeys.",
    ],
  },
  {
    templeId: "nand-bhawan",
    templeSlug: "nand-bhawan-nandgaon",
    templeName: "Nand Bhawan (Nand Baba Temple)",
    hindiName: "नन्द भवन (नन्दगाँव)",
    city: "Nandgaon",
    address: "Nandisvara Hill, Nandgaon, Uttar Pradesh 281403",
    totalKnownGatesCount: 2,
    gatesAuditStatus: "fully_verified",
    overview:
      "Situated atop the sacred Nandisvara Hill, this historic mansion temple is where Lord Krishna spent his childhood under the loving care of Yashoda Maiya and Nand Baba.",
    oneWayTrafficDirective: "Ascend via the main village archway staircase; exit through the northern circumambulation terrace.",
    lastAuditDate: "October 2026",
    officialAuditSource: "Nandgaon Tirth Sevayat Samiti & District Cultural Council",
    gates: [
      {
        id: "nb-main-archway",
        gateNumber: "Gate 1",
        gateName: "Main Village Square Hilltop Archway",
        gateType: "main_entrance",
        publicEntryStatus: "authorized",
        operationalStatus: "active",
        verificationStatus: "verified",
        coordinates: {
          lat: 27.7128,
          lng: 77.3879,
          verified: true,
        },
        accessibility: {
          wheelchairRamp: false,
          stepFree: false,
          details: "Wide stone steps leading from village chowk up the hill.",
          verified: true,
        },
        footwearProximity: "Shoe racks at the hill base and courtyard entrance",
        securityCheck: "Visual check by village committee staff",
        bestFor: "All pilgrims visiting the childhood residence of Shri Krishna",
        source: "Nandgaon Sevayat Samiti",
        lastVerified: "October 2026",
        crowdObservation: {
          available: false,
        },
      },
      {
        id: "nb-terrace-exit",
        gateNumber: "Gate 2",
        gateName: "Northern Parikrama Terrace Exit",
        gateType: "exit_only",
        publicEntryStatus: "exit_only",
        operationalStatus: "exit_flow_only",
        verificationStatus: "verified",
        coordinates: {
          lat: 27.7132,
          lng: 77.3882,
          verified: true,
        },
        accessibility: {
          wheelchairRamp: false,
          stepFree: false,
          details: "Stone staircase descending towards Pan Sarovar.",
          verified: true,
        },
        footwearProximity: "Connects back to courtyard",
        securityCheck: "One-way gate",
        bestFor: "Pilgrims heading towards holy Pan Sarovar",
        warnings: "EXIT ONLY during festival days.",
        source: "Nandgaon Tirth Samiti",
        lastVerified: "October 2026",
        crowdObservation: {
          available: false,
        },
      },
    ],
    parkingInfo: [
      {
        name: "Nandgaon Village Entrance Ground",
        distance: "400m from base of hill",
        suitableFor: "Cars, tempos, and buses",
        verified: true,
      },
    ],
    footwearLocations: [
      {
        name: "Nand Bhawan Hill Entrance Shoe Desk",
        location: "Courtyard gate",
        managedBy: "Sevayat Samiti",
        verified: true,
      },
    ],
    safetyTips: [
      "Visit in tandem with Barsana (only 8.5 km apart) to complete the dual sacred pastime dham of Radha & Krishna.",
    ],
  },
  {
    templeId: "raman-reti",
    templeSlug: "raman-reti-gokul",
    templeName: "Raman Reti (Sacred Sand Hermitage)",
    hindiName: "रमण रेती (गोकुल)",
    city: "Gokul",
    address: "Raman Reti Road, Gokul, Uttar Pradesh 281303",
    totalKnownGatesCount: 2,
    gatesAuditStatus: "fully_verified",
    overview:
      "The sanctified soft sand grounds where Bal Krishna and Balarama engaged in divine play with their cowherd friends. Pilgrims reverently roll in the sacred sand (Raman Reti) to seek spiritual grace.",
    oneWayTrafficDirective: "Main gate entry leading to shoe deposit and sandy courtyard; exit flows past the deer sanctuary.",
    lastAuditDate: "October 2026",
    officialAuditSource: "Raman Reti Ashram Management & UP Braj Teerth Vikas Parishad",
    gates: [
      {
        id: "rr-gokul-main",
        gateNumber: "Gate 1",
        gateName: "Main Ashram Heritage Gate",
        gateType: "main_entrance",
        publicEntryStatus: "authorized",
        operationalStatus: "active",
        verificationStatus: "verified",
        coordinates: {
          lat: 27.4429,
          lng: 77.7214,
          verified: true,
        },
        accessibility: {
          wheelchairRamp: true,
          stepFree: true,
          details: "Level paved threshold, but the main sacred area consists of deep natural soft sand.",
          verified: true,
        },
        footwearProximity: "Large organized shoe pavilion immediately inside Gate 1 (mandatory shoe deposit before sand)",
        securityCheck: "Ashram security post",
        bestFor: "All pilgrims entering the sand grounds and temple shrine",
        source: "Raman Reti Ashram Trust",
        lastVerified: "October 2026",
        crowdObservation: {
          available: false,
        },
      },
      {
        id: "rr-gokul-deer-exit",
        gateNumber: "Gate 2",
        gateName: "Deer Sanctuary & Garden Exit",
        gateType: "exit_only",
        publicEntryStatus: "exit_only",
        operationalStatus: "exit_flow_only",
        verificationStatus: "verified",
        coordinates: {
          lat: 27.4423,
          lng: 77.7219,
          verified: true,
        },
        accessibility: {
          wheelchairRamp: true,
          stepFree: true,
          details: "Paved garden pathway.",
          verified: true,
        },
        footwearProximity: "Loops back to main shoe deposit pavilion",
        securityCheck: "One-way gate",
        bestFor: "Pilgrims visiting the tranquil deer sanctuary and botanical grounds",
        warnings: "EXIT ONLY.",
        source: "Ashram Management",
        lastVerified: "October 2026",
        crowdObservation: {
          available: false,
        },
      },
    ],
    parkingInfo: [
      {
        name: "Raman Reti Dedicated Visitor Parking",
        distance: "100m walking distance from Gate 1",
        suitableFor: "Cars, tempo travellers, and buses",
        verified: true,
      },
    ],
    footwearLocations: [
      {
        name: "Raman Reti Central Sand Shoe Pavilion",
        location: "Inside Gate 1 threshold",
        managedBy: "Ashram Seva Trust (Free)",
        verified: true,
      },
    ],
    safetyTips: [
      "Footwear must be deposited before stepping onto the sacred sand.",
      "The quiet deer sanctuary adjacent to the sand is maintained in peaceful silence.",
    ],
  },
  {
    templeId: "radha-kund",
    templeSlug: "radha-kund-shyam-kund",
    templeName: "Radha Kund & Shyam Kund (Holy Kunds)",
    hindiName: "श्री राधा कुण्ड एवं श्याम कुण्ड",
    city: "Govardhan",
    address: "Radha Kund Town, Govardhan, Uttar Pradesh 281504",
    totalKnownGatesCount: "unknown",
    gatesAuditStatus: "audit_in_progress",
    overview:
      "The most sanctified bathing kunds in the entire universe for Gaudiya Vaishnavas, created by Shri Krishna and Shri Radha. As these are open historical water reservoirs with 360-degree perimeter ghat steps (ghats), there are no fixed perimeter security gates.",
    oneWayTrafficDirective: "Pilgrims perform parikrama along the stone-paved circumambulation walkway surrounding both sacred kunds.",
    lastAuditDate: "October 2026",
    officialAuditSource: "Radha Kund Nagar Panchayat & UP Braj Teerth Vikas Parishad",
    gates: [
      {
        id: "rk-sangam-ghat",
        gateNumber: "Ghat Portal 1",
        gateName: "Radha-Shyam Kund Sangam Access Portal",
        gateType: "main_entrance",
        publicEntryStatus: "authorized",
        operationalStatus: "active",
        verificationStatus: "pending_verification",
        coordinates: {
          lat: 27.5255,
          lng: 77.4947,
          verified: true,
        },
        accessibility: {
          wheelchairRamp: false,
          stepFree: false,
          details: "Ancient stone ghat steps descending to the holy water. Wheelchair ramp audit pending.",
          verified: false,
        },
        footwearProximity: "Footwear must be removed at the top stone embankment",
        securityCheck: "Municipal patrol and local sevayat assistance",
        bestFor: "Pilgrims performing achamana, respectful bathing, or circumambulation",
        source: "Radha Kund Seva Trust Documentation",
        lastVerified: "October 2026",
        crowdObservation: {
          available: false,
        },
      },
      {
        id: "rk-lalita-kund-access",
        gateNumber: "Ghat Portal 2",
        gateName: "Lalita Kund & Chaitanya Baithak Lane",
        gateType: "secondary_entrance",
        publicEntryStatus: "authorized",
        operationalStatus: "active",
        verificationStatus: "pending_verification",
        coordinates: {
          lat: 27.5259,
          lng: 77.4951,
          verified: false,
        },
        accessibility: {
          wheelchairRamp: false,
          stepFree: true,
          details: "Narrow stone-paved parikrama alley.",
          verified: false,
        },
        footwearProximity: "Shoe keepers at lane entry",
        securityCheck: "None",
        bestFor: "Devotees visiting sacred Gaudiya samadhis and baithaks",
        source: "Radha Kund Pilgrimage Guide",
        lastVerified: "October 2026",
        crowdObservation: {
          available: false,
        },
      },
    ],
    parkingInfo: [
      {
        name: "Radha Kund Outer Bypass Parking",
        distance: "800m walking distance from the sacred kunds",
        suitableFor: "Cars and buses",
        verified: true,
      },
    ],
    footwearLocations: [
      {
        name: "Embankment Shoe Stands",
        location: "Top of ghat steps",
        managedBy: "Local Seva trusts",
        verified: false,
      },
    ],
    safetyTips: [
      "Radha Kund is revered as the liquid form of Shri Radha's love; maintain deep quiet and respectful devotional conduct.",
      "Wear life-jackets or hold safety chains when taking holy dip; water depth increases steeply beyond the stone platforms.",
    ],
  },
];

// Helper query functions for modular data layer (easily swapped with Supabase later)
export function getAllGateGuides(): TempleGateGuide[] {
  return GATE_GUIDES;
}

export function getGateGuideByTempleId(idOrSlug: string): TempleGateGuide | undefined {
  const norm = idOrSlug.trim().toLowerCase();

  // 1. Direct match on templeId or templeSlug
  const directMatch = GATE_GUIDES.find(
    (g) =>
      g.templeId.toLowerCase() === norm ||
      g.templeSlug.toLowerCase() === norm
  );
  if (directMatch) return directMatch;

  // 2. Canonical slug alias resolution
  return GATE_GUIDES.find((g) => {
    const tid = g.templeId.toLowerCase();
    const tslug = g.templeSlug.toLowerCase();

    // Dwarkadhish Temple (Mathura)
    if (
      (norm === "dwarkadhish-temple" ||
        norm === "dwarkadhish-temple-mathura" ||
        norm === "dwarkadhish-mathura") &&
      (tid === "dwarkadhish-mathura" || tslug === "shri-dwarkadhish-temple")
    ) {
      return true;
    }

    // Govardhan Hill / Giriraj Parikrama
    if (
      (norm === "govardhan-hill-parikrama" ||
        norm === "govardhan-hill-giriraj" ||
        norm === "govardhan-parikrama-gates") &&
      (tid === "govardhan-hill-giriraj" || tslug === "govardhan-parikrama-gates")
    ) {
      return true;
    }

    // Banke Bihari Temple (Vrindavan)
    if (
      (norm === "banke-bihari-temple" || norm === "banke-bihari") &&
      (tid === "banke-bihari" || tslug === "banke-bihari-temple")
    ) {
      return true;
    }

    // Krishna Janmabhoomi / Janmasthan (Mathura)
    if (
      (norm === "shri-krishna-janmabhoomi" ||
        norm === "krishna-janmasthan" ||
        norm === "shri-krishna-janmasthan") &&
      (tid === "krishna-janmasthan" || tslug === "krishna-janmasthan")
    ) {
      return true;
    }

    // Prem Mandir (Vrindavan)
    if (
      (norm === "prem-mandir" || norm === "prem-mandir-vrindavan") &&
      (tid === "prem-mandir" || tslug === "prem-mandir-vrindavan")
    ) {
      return true;
    }

    // ISKCON Vrindavan
    if (
      (norm === "iskcon-vrindavan" || norm === "iskcon-temple-vrindavan") &&
      (tid === "iskcon-vrindavan" || tslug === "iskcon-temple-vrindavan")
    ) {
      return true;
    }

    return false;
  });
}

export function getGateSummary(guide: TempleGateGuide) {
  const verifiedPublicEntries = guide.gates.filter(
    (g) =>
      (g.gateType === "main_entrance" || g.gateType === "secondary_entrance") &&
      g.publicEntryStatus === "authorized" &&
      g.verificationStatus === "verified"
  ).length;

  const knownExitsAndRestricted = guide.gates.filter(
    (g) =>
      g.gateType === "exit_only" ||
      g.gateType === "emergency_exit" ||
      g.gateType === "restricted"
  ).length;

  const pendingVerification = guide.gates.filter(
    (g) => g.verificationStatus === "pending_verification"
  ).length;

  const isGateCountUnknown = guide.totalKnownGatesCount === "unknown";

  return {
    verifiedPublicEntries,
    knownExitsAndRestricted,
    pendingVerification,
    isGateCountUnknown,
    totalKnownGates: guide.totalKnownGatesCount,
  };
}

export function canEnterPublicly(gate: GateRecord): boolean {
  return (
    (gate.gateType === "main_entrance" || gate.gateType === "secondary_entrance") &&
    gate.publicEntryStatus === "authorized" &&
    gate.operationalStatus === "active"
  );
}
