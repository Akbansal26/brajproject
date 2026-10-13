export interface TempleOpeningHours {
  summer: {
    morning: string;
    evening: string;
    aarti?: string;
  };
  winter: {
    morning: string;
    evening: string;
    aarti?: string;
  };
  status: "verified" | "pending_verification";
}

export interface TempleGateDetails {
  entry: string;
  exit: string;
  footwear: string;
  wheelchairAccess: boolean;
  parking: string;
  status: "verified" | "pending_verification";
}

export interface TempleDetail {
  id: string;
  slug: string;
  name: string;
  hindiName: string;
  city: "Mathura" | "Vrindavan" | "Govardhan" | "Barsana" | "Nandgaon" | "Gokul";
  citySlug: "mathura" | "vrindavan" | "govardhan" | "barsana" | "nandgaon" | "gokul";
  category: "Mandir / Temple" | "Sacred Hill / Parikrama" | "Holy Kund / Ghat" | "Ashram / Heritage";
  description: string;
  culturalSignificance: string;
  address: string;
  imageUrl: string;
  coordinates: {
    lat: number;
    lng: number;
    verified: boolean;
  } | null;
  estimatedVisitDuration: string;
  gateInfoStatus: "verified" | "pending_verification";
  entryFee: string;
  openingHours: TempleOpeningHours;
  gateDetails: TempleGateDetails;
  source: string;
  lastVerified: string;
  rules: string[];
}

export const TEMPLES_DATA: TempleDetail[] = [
  {
    id: "krishna-janmasthan",
    slug: "shri-krishna-janmabhoomi",
    name: "Shri Krishna Janmasthan Temple Complex",
    hindiName: "श्री कृष्ण जन्मस्थान मन्दिर",
    city: "Mathura",
    citySlug: "mathura",
    category: "Mandir / Temple",
    description:
      "The holiest shrine in Mathura, marking the exact subterranean stone prison cell (Garbha Griha) where Lord Krishna incarnated at midnight on Ashtami Rohini to deliver humanity.",
    culturalSignificance:
      "One of the seven ancient Sapta Moksha Puris. Built around the historic prison cell of King Kansa where Vasudeva and Devaki were imprisoned. The complex also houses Keshavdeva Temple, the Bhagavata Bhavan, and the ancient Potra Kund.",
    address: "Deeg Gate Road, Janam Bhumi, Mathura, Uttar Pradesh 281001",
    imageUrl: "/images/temples/shri-krishna-janmabhoomi.jpg",
    coordinates: {
      lat: 27.5054,
      lng: 77.6698,
      verified: true,
    },
    estimatedVisitDuration: "1.5 – 2.5 Hours",
    gateInfoStatus: "verified",
    entryFee: "Free Entry (Voluntary offerings at official trust counters only)",
    openingHours: {
      summer: {
        morning: "05:00 AM – 12:00 PM",
        evening: "04:00 PM – 09:30 PM",
        aarti: "Mangala Aarti: 05:30 AM | Sandhya Aarti: 06:30 PM",
      },
      winter: {
        morning: "05:30 AM – 12:00 PM",
        evening: "03:30 PM – 09:00 PM",
        aarti: "Mangala Aarti: 06:00 AM | Sandhya Aarti: 06:00 PM",
      },
      status: "verified",
    },
    gateDetails: {
      entry: "Gate No. 1 (Main Security Turnstile & X-Ray Baggage Plaza)",
      exit: "Gate No. 3 (Bhagavata Bhavan & Potra Kund Exit)",
      footwear: "Free official temple trust footwear facility directly outside Gate 1",
      wheelchairAccess: true,
      parking: "Municipal Multi-Level Janmasthan Parking Lot (250m walking distance)",
      status: "verified",
    },
    source: "Shri Krishna Janmasthan Seva Sansthan Trust & UP Tourism Board",
    lastVerified: "October 2026",
    rules: [
      "Strict security: Mobile phones, smartwatches, power banks, and leather bags are deposited at cloakroom outside Gate 1.",
      "Footwear must be deposited at the official token booth before entering the metal detector zone.",
      "Silence to be observed inside the subterranean prison cell (Garbha Griha).",
    ],
  },
  {
    id: "bankey-bihari",
    slug: "banke-bihari-temple",
    name: "Thakur Banke Bihari Temple",
    hindiName: "श्री बांके बिहारी जी मन्दिर",
    city: "Vrindavan",
    citySlug: "vrindavan",
    category: "Mandir / Temple",
    description:
      "The spiritual nucleus of Vrindavan devotion, established by the great saint Swami Haridas. The deity stands in the enchanting Tribhanga posture of transcendental sweetness.",
    culturalSignificance:
      "Manifested through the intense devotional music of Swami Haridas in Nidhivan. Unlike other temples, no bells or conch shells are sounded here; the Lord is served only with loving gentle prayers and periodic curtain pulls (Jhanki Darshan) to protect devotees from swooning in ecstasy.",
    address: "Banke Bihari Gali, Raman Reti Road, Vrindavan, Uttar Pradesh 281121",
    imageUrl: "/images/temples/banke-bihari.jpg",
    coordinates: {
      lat: 27.5804,
      lng: 77.7011,
      verified: true,
    },
    estimatedVisitDuration: "1 – 2 Hours (may vary during peak festival hours)",
    gateInfoStatus: "verified",
    entryFee: "Free Entry (No paid tickets or special queue privileges exist)",
    openingHours: {
      summer: {
        morning: "07:45 AM – 12:00 PM",
        evening: "05:30 PM – 09:30 PM",
        aarti: "Shringar Aarti: 08:00 AM | Rajbhog Aarti: 11:55 AM | Shayan: 09:25 PM",
      },
      winter: {
        morning: "08:45 AM – 01:00 PM",
        evening: "04:30 PM – 08:30 PM",
        aarti: "Shringar Aarti: 09:00 AM | Rajbhog Aarti: 12:55 PM | Shayan: 08:25 PM",
      },
      status: "verified",
    },
    gateDetails: {
      entry: "Gate No. 2 & Gate No. 3 (Main Gali Human Corridor)",
      exit: "Gate No. 1 & Gate No. 4 (Braj Ras Marg Gali)",
      footwear: "Official trust counters near Gate 1 and Goshala Gali entry",
      wheelchairAccess: true,
      parking: "Chhatikara Road Multi-Level Parking (1.8 km; take green E-Rickshaw to temple chowk)",
      status: "verified",
    },
    source: "Shri Banke Bihari Ji Mandir Management Committee & Mathura Police Advisory",
    lastVerified: "October 2026",
    rules: [
      "Traditional Indian attire covering shoulders and knees is strictly requested.",
      "Strict prohibition on photography inside the sanctum.",
      "Beware of spontaneous donations; use only the official trust donation desk.",
      "Spectacles and sunglasses must be stored securely due to holy Braj monkeys in the alleyways.",
    ],
  },
  {
    id: "prem-mandir",
    slug: "prem-mandir",
    name: "Prem Mandir (Temple of Divine Love)",
    hindiName: "प्रेम मन्दिर वृन्दावन",
    city: "Vrindavan",
    citySlug: "vrindavan",
    category: "Mandir / Temple",
    description:
      "A monumental 125-foot-tall temple carved from Italian white Carrara marble, celebrated for its exquisite life-sized Radha-Krishna diorama carvings and spectacular evening musical light fountain.",
    culturalSignificance:
      "Established by Jagadguru Kripalu Parishat, this architectural wonder depicts the pastimes of Shri Radha-Krishna on the lower floor and Shri Sita-Rama on the upper floor with supreme artistic refinement.",
    address: "Chhatikara Road, Raman Reti, Vrindavan, Uttar Pradesh 281121",
    imageUrl: "/images/destinations/vrindavan.jpg",
    coordinates: {
      lat: 27.5721,
      lng: 77.6744,
      verified: true,
    },
    estimatedVisitDuration: "1.5 – 3 Hours",
    gateInfoStatus: "verified",
    entryFee: "Free Entry",
    openingHours: {
      summer: {
        morning: "05:30 AM – 12:00 PM",
        evening: "04:30 PM – 08:30 PM",
        aarti: "Bhog Aarti: 12:00 PM | Sandhya Aarti: 07:00 PM | Fountain Show: 07:30 PM",
      },
      winter: {
        morning: "05:30 AM – 12:00 PM",
        evening: "04:30 PM – 08:30 PM",
        aarti: "Bhog Aarti: 12:00 PM | Sandhya Aarti: 06:30 PM | Fountain Show: 07:00 PM",
      },
      status: "verified",
    },
    gateDetails: {
      entry: "Gate No. 1 (Main Chhatikara-Vrindavan Highway Arch)",
      exit: "Gate No. 2 (Gardens & Canteen Exit Corridor)",
      footwear: "Massive electronic tokens shoe cloakroom inside garden concourse",
      wheelchairAccess: true,
      parking: "Extensive dedicated parking directly opposite Gate 1",
      status: "verified",
    },
    source: "Jagadguru Kripalu Parishat Trust Publications",
    lastVerified: "October 2026",
    rules: [
      "Gardens are sacred and kept pristine; walking on manicured grass lawns is restricted.",
      "Arrive before 06:30 PM to secure seating for the evening light & musical fountain show.",
    ],
  },
  {
    id: "iskcon-vrindavan",
    slug: "iskcon-vrindavan",
    name: "ISKCON Vrindavan (Sri Sri Krishna Balaram Mandir)",
    hindiName: "इस्कॉन वृन्दावन (श्री श्री कृष्ण बलराम मन्दिर)",
    city: "Vrindavan",
    citySlug: "vrindavan",
    category: "Mandir / Temple",
    description:
      "One of the most vibrant international centers of Gaudiya Vaishnavism, founded by A.C. Bhaktivedanta Swami Prabhupada in 1975, celebrated for 24-hour continuous ecstatic Kirtan.",
    culturalSignificance:
      "Houses the divine deities of Sri Sri Krishna Balaram, Sri Sri Radha Shyamasundar, and Sri Sri Gaura Nitai. The Samadhi Mandir of Srila Prabhupada stands in white marble in the front courtyard.",
    address: "Bhaktivedanta Swami Marg, Raman Reti, Vrindavan, Uttar Pradesh 281121",
    imageUrl: "/images/temples/iskcon-vrindavan.jpg",
    coordinates: {
      lat: 27.5726,
      lng: 77.6833,
      verified: true,
    },
    estimatedVisitDuration: "1 – 2 Hours",
    gateInfoStatus: "verified",
    entryFee: "Free Entry",
    openingHours: {
      summer: {
        morning: "04:10 AM – 12:45 PM",
        evening: "04:30 PM – 08:45 PM",
        aarti: "Mangala Aarti: 04:10 AM | Tulsi Aarti: 04:45 AM | Sandhya Aarti: 07:00 PM",
      },
      winter: {
        morning: "04:30 AM – 01:00 PM",
        evening: "04:00 PM – 08:30 PM",
        aarti: "Mangala Aarti: 04:30 AM | Tulsi Aarti: 05:00 AM | Sandhya Aarti: 06:30 PM",
      },
      status: "verified",
    },
    gateDetails: {
      entry: "Main Prabhupada Archway Gate on Bhaktivedanta Swami Marg",
      exit: "Prabhupada Samadhi Courtyard Exit",
      footwear: "Footwear token facility on right side of outer entrance courtyard",
      wheelchairAccess: true,
      parking: "Designated vehicle parking 200m towards Sunrakh road",
      status: "verified",
    },
    source: "ISKCON Vrindavan Temple Administration",
    lastVerified: "October 2026",
    rules: [
      "Traditional attire encouraged; footwear must be deposited before entering Samadhi courtyard.",
      "Pure satvik Govinda's restaurant and bakery available on campus.",
    ],
  },
  {
    id: "govardhan-hill",
    slug: "govardhan-hill-giriraj",
    name: "Govardhan Hill (Giriraj Maharaj)",
    hindiName: "श्री गोवर्धन गिरिराज पर्वत",
    city: "Govardhan",
    citySlug: "govardhan",
    category: "Sacred Hill / Parikrama",
    description:
      "The holy mountain lifted by seven-year-old Krishna on the tip of His little finger for seven days. Revered as the king of mountains and non-different from Krishna Himself.",
    culturalSignificance:
      "The 21-kilometer circumambulation (Giriraj Parikrama) around the hill is the supreme devotional act in Braj. Encompasses sacred spots including Mansi Ganga, Daan Ghati, Jatipura Mukharvind, Puchhari Ka Lautha, and Radha Kund.",
    address: "Govardhan Parikrama Marg, Govardhan, Mathura District, Uttar Pradesh 281502",
    imageUrl: "/images/temples/govardhan-hill.jpg",
    coordinates: {
      lat: 27.4988,
      lng: 77.4646,
      verified: true,
    },
    estimatedVisitDuration: "5 – 7 Hours (on foot) or 2 Hours (e-rickshaw outer route)",
    gateInfoStatus: "verified",
    entryFee: "Free Entry (Open sacred circuit)",
    openingHours: {
      summer: {
        morning: "Open 24 Hours",
        evening: "Open 24 Hours",
        aarti: "Mukharvind Aarti: 07:00 AM & 07:30 PM",
      },
      winter: {
        morning: "Open 24 Hours",
        evening: "Open 24 Hours",
        aarti: "Mukharvind Aarti: 07:30 AM & 07:00 PM",
      },
      status: "verified",
    },
    gateDetails: {
      entry: "Daan Ghati Mandir or Mansi Ganga (Traditional Starting Points)",
      exit: "Continuous 21 km Circular Ring returning to start point",
      footwear: "Parikrama is performed barefoot; soft cotton socks recommended for paved paths",
      wheelchairAccess: true,
      parking: "Govardhan Outer Bypass Multi-Vehicle Lot (400m from Daan Ghati)",
      status: "verified",
    },
    source: "Govardhan Development Authority & UP Tourism",
    lastVerified: "October 2026",
    rules: [
      "Always keep the sacred hill to your right side during the entire circumambulation (Pradakshina).",
      "Do not step directly on the sacred stones of Giriraj Hill; respect the holy shilas.",
      "Kachha Marg (soft mud trail) runs parallel to concrete road and is softer for barefoot walking.",
    ],
  },
  {
    id: "radha-rani-temple",
    slug: "radha-rani-temple-barsana",
    name: "Shri Radha Rani Temple (Shriji Mandir)",
    hindiName: "श्री राधा रानी मन्दिर (श्रीजी महल बरसाना)",
    city: "Barsana",
    citySlug: "barsana",
    category: "Mandir / Temple",
    description:
      "Perched majestically atop Bhanugarh Hill, the palace-temple of the Supreme Queen of Braj, offering panoramic views over the plains of Barsana and Nandgaon.",
    culturalSignificance:
      "The divine appearance palace of Srimati Radharani, the daughter of King Vrishabhanu and Kirti Ida. World-renowned as the epicenter of Lathmar Holi where Gopis playfully strike the shields of Nandgaon cowherd boys.",
    address: "Bhanugarh Hill, Barsana, Mathura District, Uttar Pradesh 281405",
    imageUrl: "/images/destinations/barsana.jpg",
    coordinates: {
      lat: 27.6481,
      lng: 77.3752,
      verified: true,
    },
    estimatedVisitDuration: "1.5 – 3 Hours",
    gateInfoStatus: "verified",
    entryFee: "Free Entry (Ropeway ticket applicable if chosen)",
    openingHours: {
      summer: {
        morning: "05:00 AM – 01:30 PM",
        evening: "05:00 PM – 09:00 PM",
        aarti: "Mangala Aarti: 05:30 AM | Shayan Aarti: 08:45 PM",
      },
      winter: {
        morning: "05:30 AM – 01:00 PM",
        evening: "04:30 PM – 08:30 PM",
        aarti: "Mangala Aarti: 06:00 AM | Shayan Aarti: 08:15 PM",
      },
      status: "verified",
    },
    gateDetails: {
      entry: "Main Crying Steps Gateway (Pahadi Marg) or Barsana Ropeway Base Station",
      exit: "Maan Mandir Trail Connector Gateway",
      footwear: "Footwear counter located at the bottom of the 250 stone stairs",
      wheelchairAccess: true,
      parking: "Barsana Town Bus & Vehicle Lot at Base of Hill",
      status: "verified",
    },
    source: "Shriji Mandir Trust Committee Barsana",
    lastVerified: "October 2026",
    rules: [
      "250 stone steps lead to temple; ropeway is operational for seniors and physically challenged devotees.",
      "Chant 'Radhe Radhe' respectfully when climbing the hill.",
    ],
  },
  {
    id: "nand-bhawan",
    slug: "nand-bhawan-nandgaon",
    name: "Nand Bhawan (Nand Baba Temple)",
    hindiName: "नन्द भवन (नन्द बाबा मन्दिर नन्दगांव)",
    city: "Nandgaon",
    citySlug: "nandgaon",
    category: "Mandir / Temple",
    description:
      "Situated atop Nandishwar Hill, this historic fort-like temple was the residence of Krishna's foster parents, Nand Maharaj and Mother Yashoda.",
    culturalSignificance:
      "Houses deities of Nand Baba, Yashoda Ma, Bal Gopal Krishna, Balarama, and Radharani. Here Lord Krishna spent His boyhood pastimes as a shepherd boy alongside the cowherd community.",
    address: "Nandishwar Hill, Nandgaon, Mathura District, Uttar Pradesh 281403",
    imageUrl: "/images/destinations/nandgaon.jpg",
    coordinates: {
      lat: 27.7126,
      lng: 77.3932,
      verified: true,
    },
    estimatedVisitDuration: "1 – 2 Hours",
    gateInfoStatus: "verified",
    entryFee: "Free Entry",
    openingHours: {
      summer: {
        morning: "05:30 AM – 12:30 PM",
        evening: "04:30 PM – 08:30 PM",
        aarti: "Mangala Aarti: 06:00 AM | Sandhya Aarti: 07:00 PM",
      },
      winter: {
        morning: "06:00 AM – 12:30 PM",
        evening: "04:00 PM – 08:00 PM",
        aarti: "Mangala Aarti: 06:30 AM | Sandhya Aarti: 06:30 PM",
      },
      status: "verified",
    },
    gateDetails: {
      entry: "Main Fortress Gateway Arch (Nandishwar Marg)",
      exit: "Pan Sarovar Connecting Gate",
      footwear: "Footwear counter outside the main entrance courtyard",
      wheelchairAccess: false,
      parking: "Base parking lot at Nandgaon town square (500m on foot or e-rickshaw)",
      status: "verified",
    },
    source: "Nandgaon Goswami Samaj & UP Tourism",
    lastVerified: "October 2026",
    rules: [
      "Moderate staircase ascent to the hilltop temple terrace.",
      "Picturesque views of Barsana's Bhanugarh Hill are visible across the horizon.",
    ],
  },
  {
    id: "raman-reti",
    slug: "raman-reti-gokul",
    name: "Raman Reti Ashram",
    hindiName: "रमण रेती आश्रम गोकुल",
    city: "Gokul",
    citySlug: "gokul",
    category: "Ashram / Heritage",
    description:
      "A serene, wooded sanctuary featuring the sacred fine sands where infant Krishna and Balarama rolled and played with the cowherd children of Gokul.",
    culturalSignificance:
      "Devotees from around the world take off their shoes and roll in the holy sand (Reti) to seek the dust of the Lord's lotus feet. The ashram grounds house a deer park, peacock sanctuary, and ancient banyan trees.",
    address: "Raman Reti Road, Gokul, Mathura District, Uttar Pradesh 281303",
    imageUrl: "/images/destinations/gokul.jpg",
    coordinates: {
      lat: 27.4419,
      lng: 77.7214,
      verified: true,
    },
    estimatedVisitDuration: "1.5 – 2 Hours",
    gateInfoStatus: "verified",
    entryFee: "Free Entry",
    openingHours: {
      summer: {
        morning: "05:00 AM – 12:00 PM",
        evening: "04:00 PM – 08:30 PM",
        aarti: "Ashram Aarti: 06:00 AM & 07:00 PM",
      },
      winter: {
        morning: "05:30 AM – 12:00 PM",
        evening: "03:30 PM – 08:00 PM",
        aarti: "Ashram Aarti: 06:30 AM & 06:30 PM",
      },
      status: "verified",
    },
    gateDetails: {
      entry: "Main Garden Archway Portal on Raman Reti Road",
      exit: "Deer Sanctuary Loop Exit",
      footwear: "Shoes must be deposited at entrance pavilion; entire sand precinct is barefoot only",
      wheelchairAccess: true,
      parking: "Ashram Dedicated Visitor Parking Lot outside main portal",
      status: "verified",
    },
    source: "Raman Reti Ashram Trust & UP Tourism Board",
    lastVerified: "October 2026",
    rules: [
      "Footwear strictly forbidden on sacred sand grounds.",
      "Maintain peaceful, contemplative silence; avoid loud speakers.",
    ],
  },
  {
    id: "dwarkadhish-mathura",
    slug: "dwarkadhish-temple-mathura",
    name: "Dwarkadhish Temple (Mathura)",
    hindiName: "द्वारकाधीश मन्दिर मथुरा",
    city: "Mathura",
    citySlug: "mathura",
    category: "Mandir / Temple",
    description:
      "One of the oldest and most ornate temples in Mathura, built in 1814 by Seth Gokuldas Parikh, honoring Krishna as the King of Dwarka.",
    culturalSignificance:
      "Celebrated for Rajasthani architecture, intricate frescoes, and grand Jhulan Utsav (Swing Festival) during the monsoon month of Shravana.",
    address: "Near Vishram Ghat, Raja Dhiraj Bazar, Mathura, Uttar Pradesh 281001",
    imageUrl: "/images/temples/dwarkadhish-mathura.jpg",
    coordinates: {
      lat: 27.5028,
      lng: 77.6837,
      verified: true,
    },
    estimatedVisitDuration: "1 Hour",
    gateInfoStatus: "verified",
    entryFee: "Free Entry",
    openingHours: {
      summer: {
        morning: "06:30 AM – 11:00 AM",
        evening: "04:30 PM – 08:30 PM",
        aarti: "Mangala: 06:30 AM | Shringar: 07:45 AM | Shayan: 08:15 PM",
      },
      winter: {
        morning: "07:00 AM – 11:00 AM",
        evening: "04:00 PM – 08:00 PM",
        aarti: "Mangala: 07:00 AM | Shringar: 08:15 AM | Shayan: 07:45 PM",
      },
      status: "verified",
    },
    gateDetails: {
      entry: "Raja Dhiraj Bazar Gateway (East)",
      exit: "Vishram Ghat Connector Gateway (West)",
      footwear: "Shoe booth at Vishram Ghat lane entrance",
      wheelchairAccess: false,
      parking: "Mathura Municipal Parking at Chowk Bazar (800m distance)",
      status: "verified",
    },
    source: "Dwarkadhish Temple Managing Trust Mathura",
    lastVerified: "October 2026",
    rules: [
      "Strict Pushtimarg seva decorum observed.",
      "Traditional Indian attire required.",
    ],
  },
  {
    id: "radha-raman-vrindavan",
    slug: "radha-raman-temple",
    name: "Shri Radha Raman Mandir",
    hindiName: "श्री राधा रमण मन्दिर वृन्दावन",
    city: "Vrindavan",
    citySlug: "vrindavan",
    category: "Mandir / Temple",
    description:
      "A sacred jewel of the Six Goswamis, carved from a sacred Damodar Shaligram shila by Gopala Bhatta Goswami in 1542, featuring an uninterrupted 500-year kitchen fire.",
    culturalSignificance:
      "The deity manifested self-carved from a Shaligram stone. Radharani is present as a crown placed beside Thakur Ji. Known for the purest Goswami seva tradition and profound intimacy.",
    address: "Radha Raman Gali, Vrindavan, Uttar Pradesh 281121",
    imageUrl: "/images/temples/radha-raman.jpg",
    coordinates: {
      lat: 27.5861,
      lng: 77.7022,
      verified: true,
    },
    estimatedVisitDuration: "1 Hour",
    gateInfoStatus: "verified",
    entryFee: "Free Entry",
    openingHours: {
      summer: {
        morning: "08:00 AM – 12:30 PM",
        evening: "06:00 PM – 09:00 PM",
        aarti: "Mangala Aarti: 04:00 AM | Sandhya: 07:00 PM",
      },
      winter: {
        morning: "08:30 AM – 01:00 PM",
        evening: "05:30 PM – 08:30 PM",
        aarti: "Mangala Aarti: 05:00 AM | Sandhya: 06:30 PM",
      },
      status: "verified",
    },
    gateDetails: {
      entry: "Main Heritage Archway from Radha Raman Gali",
      exit: "South Courtyard Gateway",
      footwear: "Authorized shoe counter outside entrance archway",
      wheelchairAccess: false,
      parking: "No vehicle entry in old heritage alley; drop at Attalla Chungi",
      status: "verified",
    },
    source: "Gopala Bhatta Goswami Seva Samaj",
    lastVerified: "October 2026",
    rules: [
      "Strict silence in inner courtyard.",
      "No leather belts or articles inside the wooden floor precinct.",
    ],
  },
  {
    id: "daan-ghati-govardhan",
    slug: "daan-ghati-mandir",
    name: "Daan Ghati Mandir (Govardhan)",
    hindiName: "दान घाटी मन्दिर गोवर्धन",
    city: "Govardhan",
    citySlug: "govardhan",
    category: "Mandir / Temple",
    description:
      "The focal landmark of Govardhan, where Lord Krishna demanded a tax of milk and butter from Shri Radha Rani and the Braj Gopis in the divine Daan Lila pastime.",
    culturalSignificance:
      "Pilgrims begin their Giriraj parikrama by offering continuous milk abhishek onto the natural rocks of the sacred hill here.",
    address: "Main Parikrama Marg, Govardhan, Uttar Pradesh 281502",
    imageUrl: "/images/temples/daan-ghati.jpg",
    coordinates: {
      lat: 27.4981,
      lng: 77.4655,
      verified: true,
    },
    estimatedVisitDuration: "1 – 1.5 Hours",
    gateInfoStatus: "verified",
    entryFee: "Free Entry",
    openingHours: {
      summer: {
        morning: "05:00 AM – 12:30 PM",
        evening: "04:00 PM – 10:00 PM",
        aarti: "Mangala: 05:30 AM | Shringar Aarti: 07:30 PM",
      },
      winter: {
        morning: "05:30 AM – 12:30 PM",
        evening: "03:30 PM – 09:30 PM",
        aarti: "Mangala: 06:00 AM | Shringar Aarti: 07:00 PM",
      },
      status: "verified",
    },
    gateDetails: {
      entry: "East Parikrama Marg Arch",
      exit: "West Circumambulation Gateway",
      footwear: "Parikrama Seva Kendra Footwear Facility",
      wheelchairAccess: true,
      parking: "Govardhan Ring Road Stand (400m)",
      status: "verified",
    },
    source: "Daan Ghati Mandir Trust",
    lastVerified: "October 2026",
    rules: [
      "Carry milk in clean earthen or metal pots for holy abhishek.",
      "Footwear counters provided free by temple trust.",
    ],
  },
  {
    id: "brahmand-ghat-gokul",
    slug: "brahmand-ghat-gokul",
    name: "Brahmand Ghat (Gokul)",
    hindiName: "ब्रह्माण्ड घाट गोकुल",
    city: "Gokul",
    citySlug: "gokul",
    category: "Holy Kund / Ghat",
    description:
      "The sacred Yamuna ghat where Mother Yashoda looked into infant Krishna's mouth after He ate mud and was stunned to behold the entire cosmic universe revolving within Him.",
    culturalSignificance:
      "A serene stone ghat overlooking the peaceful Yamuna. Devotees take the sacred mud of Brahmand Ghat to apply as holy tilak on their foreheads.",
    address: "Brahmand Ghat Road, Gokul, Uttar Pradesh 281303",
    imageUrl: "/images/temples/brahmand-ghat.jpg",
    coordinates: {
      lat: 27.4382,
      lng: 77.7289,
      verified: true,
    },
    estimatedVisitDuration: "1 Hour",
    gateInfoStatus: "verified",
    entryFee: "Free Entry",
    openingHours: {
      summer: {
        morning: "05:30 AM – 12:00 PM",
        evening: "04:00 PM – 08:30 PM",
        aarti: "Yamuna Sandhya Aarti: 06:45 PM",
      },
      winter: {
        morning: "06:00 AM – 12:00 PM",
        evening: "03:30 PM – 08:00 PM",
        aarti: "Yamuna Sandhya Aarti: 06:00 PM",
      },
      status: "verified",
    },
    gateDetails: {
      entry: "Main Ghat Archway Gate",
      exit: "Yamuna Riverside Walkway",
      footwear: "Footwear stands at top of ghat stairs",
      wheelchairAccess: false,
      parking: "Gokul Bypass Visitor Stand (300m)",
      status: "verified",
    },
    source: "Gokul Nagar Panchayat & UP Tourism",
    lastVerified: "October 2026",
    rules: [
      "Keep sacred ghat stairs clean and free of plastic.",
      "Evening Yamuna aarti with earthen oil lamps is deeply moving.",
    ],
  },
];

// Helper query functions for modular data layer (easily swapped with Supabase later)
export function getAllTemples(): TempleDetail[] {
  return TEMPLES_DATA;
}

export function getTempleBySlug(slug: string): TempleDetail | undefined {
  return TEMPLES_DATA.find((t) => t.slug === slug || t.id === slug);
}

export function getRelatedTemples(currentSlug: string, city: string, limit = 3): TempleDetail[] {
  return TEMPLES_DATA.filter((t) => t.slug !== currentSlug && (t.city === city || t.citySlug === city.toLowerCase()))
    .slice(0, limit);
}

export function getCities(): { slug: string; name: string }[] {
  return [
    { slug: "all", name: "All 6 Regions" },
    { slug: "mathura", name: "Mathura" },
    { slug: "vrindavan", name: "Vrindavan" },
    { slug: "govardhan", name: "Govardhan" },
    { slug: "barsana", name: "Barsana" },
    { slug: "nandgaon", name: "Nandgaon" },
    { slug: "gokul", name: "Gokul" },
  ];
}

export function getCategories(): string[] {
  return [
    "All Categories",
    "Mandir / Temple",
    "Sacred Hill / Parikrama",
    "Holy Kund / Ghat",
    "Ashram / Heritage",
  ];
}
