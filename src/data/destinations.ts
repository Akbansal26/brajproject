import { Destination, ParikramaInfo } from "@/types";

export interface DestinationWithAttribution extends Destination {
  imageAttribution?: {
    source: string;
    author: string;
    license: string;
    subject: string;
  };
}

export const SACRED_DESTINATIONS: (Destination & {
  imageAttribution?: {
    source: string;
    author: string;
    license: string;
    subject: string;
  };
})[] = [
  {
    id: "mathura",
    name: "Mathura",
    hindiName: "श्री मथुरा",
    slug: "mathura",
    tagline: "The Sacred Birthplace of Shri Krishna & Ancient Yamuna Ghats",
    description:
      "One of the seven sacred Sapta Puri cities. Centered around Shri Krishna Janmasthan, historic Vishram Ghat, and celebrated evening Yamuna Aratis.",
    distanceFromMathuraKm: 0,
    keyTemples: ["Shri Krishna Janmasthan", "Dwarkadhish Temple", "Vishram Ghat", "Bhuteshwar Mahadev"],
    significance: "Appearance place of Bhagavan Krishna (Avatara Sthali).",
    darshanSummary: "Morning: 05:30 AM – 12:00 PM | Evening: 04:00 PM – 09:30 PM",
    imageUrl: "/images/destinations/mathura.jpg",
    imageAttribution: {
      source: "Wikimedia Commons (File:Vishram_Ghat.jpg)",
      author: "Umang108",
      license: "CC BY-SA 4.0",
      subject: "Historic Vishram Ghat at sunset on the sacred Yamuna River, Mathura",
    },
  },
  {
    id: "vrindavan",
    name: "Vrindavan",
    hindiName: "श्री वृन्दावन",
    slug: "vrindavan",
    tagline: "The Realm of Divine Love & 5,000+ Sacred Mandirs",
    description:
      "The forest of Tulsi where Lord Krishna performed His enchanting childhood pastimes and Raas Lila with Shri Radha and the Gopis.",
    distanceFromMathuraKm: 12,
    keyTemples: ["Thakur Bankey Bihari", "Radha Raman Mandir", "Prem Mandir", "Nidhivan", "ISKCON"],
    significance: "Heart of Braj devotion, eternal Raas Lila and seva.",
    darshanSummary: "Morning: 07:45 AM – 12:00 PM | Evening: 05:30 PM – 09:30 PM",
    imageUrl: "/images/destinations/vrindavan.jpg",
    imageAttribution: {
      source: "Wikimedia Commons (File:Prem_mandir_Vrindavan.JPG)",
      author: "Ashish Bhatnagar",
      license: "CC BY-SA 3.0",
      subject: "Prem Mandir complex, Vrindavan",
    },
  },
  {
    id: "govardhan",
    name: "Govardhan",
    hindiName: "श्री गोवर्धन",
    slug: "govardhan",
    tagline: "The Holy Giriraj Hill of 21 Kilometers Sacred Parikrama",
    description:
      "The sacred hill lifted by seven-year-old Krishna on His little finger for 7 days to protect the inhabitants of Braj from Indra's torrential deluge.",
    distanceFromMathuraKm: 26,
    keyTemples: ["Daan Ghati Mandir", "Mukharvind Mandir (Jatipura)", "Mansi Ganga", "Radha Kund & Shyam Kund"],
    significance: "Non-different from Shri Krishna Himself; most revered parikrama path in Braj.",
    darshanSummary: "Open 24 hours for circumambulation | Temple Seva: 06:00 AM – 09:00 PM",
    imageUrl: "/images/destinations/govardhan.jpg",
    imageAttribution: {
      source: "Wikimedia Commons (File:Kusum_Sarovar,_Govardhan.jpg)",
      author: "Ekabhishek",
      license: "CC BY-SA 4.0",
      subject: "Historical sandstone pavilions of Kusum Sarovar at Govardhan Hill",
    },
  },
  {
    id: "barsana",
    name: "Barsana",
    hindiName: "श्री बरसाना",
    slug: "barsana",
    tagline: "The Hilltop Abode of Shri Radha Rani & Lathmar Holi",
    description:
      "Surrounded by four hilltops representing the four heads of Lord Brahma, topped by the magnificent Shriji (Radha Rani) Mandir overlooking the Braj plains.",
    distanceFromMathuraKm: 45,
    keyTemples: ["Radha Rani Mandir (Shriji)", "Maan Mandir", "Kirti Mandir", "Peeli Pokhar"],
    significance: "Birthplace and palace of Srimati Radharani, Queen of Braj.",
    darshanSummary: "Morning: 05:00 AM – 01:30 PM | Evening: 05:00 PM – 09:00 PM",
    imageUrl: "/images/destinations/barsana.jpg",
    imageAttribution: {
      source: "Wikimedia Commons (File:Radharani_Temple_Barsana_3.jpg)",
      author: "Kridha20",
      license: "CC BY-SA 4.0",
      subject: "Shri Radha Rani Temple (Shriji Mandir) atop Bhanugarh Hill, Barsana",
    },
  },
  {
    id: "nandgaon",
    name: "Nandgaon",
    hindiName: "श्री नन्दगांव",
    slug: "nandgaon",
    tagline: "The Pastoral Home of Nand Maharaj & Yashoda Ma",
    description:
      "Perched on Nandishwar Hill, Nandgaon was the pastoral village where Krishna grew up as the darling son of Yashoda and leader of the cowherd boys.",
    distanceFromMathuraKm: 52,
    keyTemples: ["Nand Bhavan Mandir", "Pan Sarovar", "Yashoda Kund", "Charan Pahari"],
    significance: "Home of Krishna's loving foster parents and childhood pastimes.",
    darshanSummary: "Morning: 05:30 AM – 12:30 PM | Evening: 04:30 PM – 08:30 PM",
    imageUrl: "/images/destinations/nandgaon.jpg",
    imageAttribution: {
      source: "Wikimedia Commons (File:नंदगांव का क़स्बा और पहाडी पर नंदराय मंदिर.JPG)",
      author: "Hemant Shesh",
      license: "CC BY-SA 4.0",
      subject: "Scenic view of Nandgaon and Nanda Bhavan Temple on Nandishwar Hill",
    },
  },
  {
    id: "gokul",
    name: "Gokul",
    hindiName: "श्री गोकुल",
    slug: "gokul",
    tagline: "The Playground of Infant Krishna & Holy Raman Reti",
    description:
      "Where Vasudeva crossed the Yamuna carrying newborn Krishna to safety. Famous for the soft, sacred sands of Raman Reti where pilgrims roll in devotion.",
    distanceFromMathuraKm: 16,
    keyTemples: ["Raman Reti Ashram", "Chaurasi Khamba", "Brahmand Ghat", "Nand Bhavan Gokul"],
    significance: "Bal-leela sthali, mud-eating leela at Brahmand Ghat.",
    darshanSummary: "Morning: 06:00 AM – 12:00 PM | Evening: 04:00 PM – 08:30 PM",
    imageUrl: "/images/destinations/gokul.jpg",
    imageAttribution: {
      source: "Wikimedia Commons (File:Ramanreti-Gokul.jpg)",
      author: "12 a 02",
      license: "CC BY-SA 4.0",
      subject: "Sacred sands and grounds of Raman Reti Ashram, Gokul",
    },
  },
];

export const PARIKRAMA_ROUTES: ParikramaInfo[] = [
  {
    id: "giriraj-21km",
    name: "Giriraj Govardhan Parikrama",
    hindiName: "श्री गिरिराज परिक्रमा",
    distanceKm: 21,
    durationHours: "5 - 7 Hours on foot",
    startPoint: "Daan Ghati Temple or Manasi Ganga",
    landmarks: [
      "Manasi Ganga",
      "Daan Ghati",
      "Govinda Kunda",
      "Puchhari Ka Lautha",
      "Jatipura Mukharvind",
      "Radha Kund & Shyam Kund",
    ],
  },
  {
    id: "vrindavan-panchkosi",
    name: "Vrindavan Panchkosi Parikrama",
    hindiName: "वृन्दावन पंचकोशी परिक्रमा",
    distanceKm: 11,
    durationHours: "2.5 - 4 Hours on foot",
    startPoint: "Keshi Ghat or ISKCON Temple",
    landmarks: [
      "Keshi Ghat",
      "Kaliya Ghat",
      "Madan Mohan Temple",
      "Tatiya Sthan",
      "Gopeshwar Mahadev",
    ],
  },
];

export const GENERAL_TEMPLE_RULES = [
  "Strict dress code: Modest attire covering shoulders and knees is mandatory across traditional shrines.",
  "Footwear and leather items must be deposited at authorized counters before entering temple complexes.",
  "Photography and mobile phone usage are strictly prohibited inside the sanctum sanctorum (Garbhagriha).",
  "Beware of spontaneous donations demanded by unauthorized guides; always offer seva through official temple trust receipt counters.",
];
