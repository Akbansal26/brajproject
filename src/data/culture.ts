export interface CulturalStory {
  id: string;
  title: string;
  hindiTitle: string;
  category: "seva" | "childhood" | "lila" | "radha" | "govardhan" | "festivals" | "heritage";
  categoryLabel: string;
  excerpt: string;
  content: string[];
  spiritualEssence: string;
  devotionalTradition: string;
  historicalContext: string;
  scripturalSource: string;
  keyLocations: string[];
  relatedTempleSlugs: string[];
  imageUrl: string;
}

export const CULTURAL_CATEGORIES: { id: string; label: string; hindiLabel: string }[] = [
  { id: "all", label: "All Heritage", hindiLabel: "संपूर्ण ब्रज धरोहर" },
  { id: "seva", label: "Laddu Gopal Seva", hindiLabel: "लड्डू गोपाल सेवा" },
  { id: "childhood", label: "Krishna Childhood", hindiLabel: "बाल लीलाएं" },
  { id: "lila", label: "Braj Leela Katha", hindiLabel: "ब्रज लीला कथा" },
  { id: "radha", label: "Radha Rani Traditions", hindiLabel: "राधा रानी परंपरा" },
  { id: "govardhan", label: "Govardhan & Annakut", hindiLabel: "गोवर्धन एवं अन्नकूट" },
  { id: "festivals", label: "Braj ki Holi & Utsav", hindiLabel: "होली एवं महाउत्सव" },
  { id: "heritage", label: "Language, Food & Music", hindiLabel: "भाषा, खानपान व संगीत" },
];

export const CULTURAL_STORIES: CulturalStory[] = [
  {
    id: "laddu-gopal-seva",
    title: "Laddu Gopal Ji: Bhakti aur Seva Bhava",
    hindiTitle: "लड्डू गोपाल जी: वात्सल्य भाव एवं अष्टयाम सेवा",
    category: "seva",
    categoryLabel: "Devotional Care",
    excerpt:
      "Understanding how Braj families nurture the infant deity through Ashtayama seva, seasonal attire, warm baths, cooling chandan, and midday shayan.",
    content: [
      "In Braj households across Mathura, Vrindavan, and Gokul, Laddu Gopal Ji is revered not as a symbolic statue, but as the living child of the home. This tradition is rooted in Vatsalya Rasa — the mood of parental tender affection where the devotee treats the Lord with the protective care a mother offers her child.",
      "The daily routine reflects Ashtayama Seva (the eight periods of the day): Mangala (waking the child gently with soft songs), Snana (bathing in tepid water with tender herbs or rosewater), Shringara (adorning with tiny garments, peacock feather, and butter pot), Rajbhog (serving fresh makhan, mishri, and milk), and Shayan (midday and nocturnal restful sleep).",
      "Rituals shift with nature's rhythm: In the scorching summer (Grishma), He receives cooling Chandan Yatra coatings, light malmal cotton robes, and fragrant khus fans. In harsh winter (Sheetkaal), He is wrapped in velvet quilts, served saffron-infused warm milk, and warmed by discreet heaters.",
      "Pilgrims traveling to Braj frequently carry their personal Laddu Gopal Ji deities to Gokul, gently rolling them in the soft sands of Raman Reti where Krishna performed His infant crawlings.",
    ],
    spiritualEssence: "Approaching the Supreme through unconditional parental tenderness and gentle daily service.",
    devotionalTradition:
      "Vatsalya Bhava formalized by Pushtimarg (Vallabhacharya tradition) and Gaudiya Vaishnavism, where devotion transcends awe and manifests as intimate, affectionate caretaking.",
    historicalContext:
      "Cult of the infant Krishna (Bala Krishna) has ancient roots documented in the Harivamsha, emerging into elaborate domestic rituals during the 15th-16th century Bhakti movement.",
    scripturalSource: "Srimad Bhagavatam (Canto 10, Chapters 8-9) & Pushtimarg Seva Paddhati text traditions.",
    keyLocations: ["Raman Reti (Gokul)", "Bankey Bihari Gali", "Chandan Ghat Mathura"],
    relatedTempleSlugs: ["raman-reti-gokul", "banke-bihari-temple", "dwarkadhish-temple-mathura"],
    imageUrl: "https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "krishna-childhood-stories",
    title: "Shri Krishna's Childhood Stories: Gokul & Nandgaon",
    hindiTitle: "श्री कृष्ण की बाल लीलाएं: माखन चोरी से पूतना उद्धार",
    category: "childhood",
    categoryLabel: "Sacred Lore",
    excerpt:
      "From Makhan Chori and Putana Moksha to Yamalarjuna and Kaliya Daman — pastimes that reveal divinity through innocent childhood play.",
    content: [
      "Makhan Chori (Stealing Butter): Despite His household having countless cows, young Krishna broke clay pots in neighbors' homes and fed fresh butter to village monkeys and companion gopas. This leela symbolizes that the Divine steals not curd, but the hearts (Chitta-Chora) of pure devotees.",
      "Putana Moksha: When the demoness Putana arrived disguised as an affectionate maternal maiden bearing poisoned milk, infant Krishna sucked out her toxic life-air while simultaneously granting her the exalted eternal status of a celestial mother in Goloka.",
      "Yamalarjuna Deliverance: Bound to a wooden mortar (Damodara) by mother Yashoda for His mischief, toddler Krishna crawled between two ancient twin Arjuna trees, uprooting them and liberating the celestial demigods Nalakuvara and Manigriva from an ancient curse.",
      "Kaliya Daman: Leaping into the venomous whirlpools of Yamuna at Kaliya Ghat, Krishna danced upon the hundred hoods of the great serpent Kaliya, purging the waters of toxic malice and commanding the serpent to dwell harmlessly in the deep sea.",
    ],
    spiritualEssence: "Divine mercy that liberates even those who approach with animosity, while exalting simple innocent love.",
    devotionalTradition:
      "Pilgrims in Braj re-enact these pastimes during daily chants, and children in Braj streets are routinely addressed as 'Kanhaiya' or 'Lalla'.",
    historicalContext:
      "Early narrative depictions of Kaliya Daman and Damodara Leela appear in 1st-3rd century CE Mathura Kushana art and Gupta period reliefs.",
    scripturalSource: "Srimad Bhagavatam (Canto 10, Chapters 6, 9-10, 16) & Vishnu Purana (Book 5).",
    keyLocations: ["Kaliya Ghat Vrindavan", "Brahmand Ghat Gokul", "Ukhal Bandhan Gokul", "Nand Bhawan"],
    relatedTempleSlugs: ["raman-reti-gokul", "brahmand-ghat-gokul", "nand-bhawan-nandgaon"],
    imageUrl: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "braj-leela-katha",
    title: "Braj Leela Katha: The Sanctified Pastimes of Vrindavan",
    hindiTitle: "ब्रज लीला कथा: महारास, चीर घाट एवं सेवा कुंज",
    category: "lila",
    categoryLabel: "Sacred Pastimes",
    excerpt:
      "Explore the spiritual depths of Maha Raas at Banshi Vat, the secluded groves of Seva Kunj, Chir Ghat, and the dust of Braj.",
    content: [
      "Maha Raas (The Circle Dance of Pure Love): Under the autumn full moon of Sharad Purnima beside the Yamuna at Banshi Vat, Krishna resonated His flute (Vamshi Dhwani). The Gopis gathered in transcendental surrender; Krishna multiplied Himself so each devotee experienced Him directly by her side.",
      "Seva Kunj & Nidhivan: Deep in Vrindavan, Seva Kunj preserves the grove where Krishna tenderly combed Shri Radha's hair and decorated Her feet with mahawar (red lac). In Braj theology, these bowers remain active in eternal subtle reality (Nitya Vihara).",
      "Chir Ghat: Located north on the Yamuna banks, Chir Ghat recalls the Katyayani Vrata where the maiden gopis prayed to Goddess Katyayani to obtain Krishna as their eternal protector, renouncing all bodily shame and material vanity.",
      "Brahmand Ghat: At Gokul, when Yashoda inspected child Krishna's mouth after friends complained He had eaten clay, He opened His lips to reveal the entire cosmic manifestation — galaxies, suns, stars, and time itself.",
    ],
    spiritualEssence: "The transcendental union of individual consciousness (Atman) with Supreme Consciousness (Paramatman).",
    devotionalTradition:
      "In Gaudiya and Nimbarka traditions, the Raas Lila is understood as the highest pinnacle of selfless love (Prema), completely free from any tinge of worldly lust (Kama).",
    historicalContext:
      "Vrindavan's sacred groves were systematically mapped in the 16th century CE by Chaitanya Mahaprabhu and the Six Goswamis through scriptural research and mystical contemplation.",
    scripturalSource: "Srimad Bhagavatam (Rasa Panchadhyayi, Canto 10, Chapters 29-33) & Chaitanya Charitamrita.",
    keyLocations: ["Seva Kunj", "Nidhivan", "Banshi Vat", "Brahmand Ghat Gokul"],
    relatedTempleSlugs: ["radha-raman-temple", "banke-bihari-temple", "brahmand-ghat-gokul"],
    imageUrl: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "radha-rani-traditions",
    title: "Radha Rani and Braj Traditions: The Queen of Braj",
    hindiTitle: "राधा रानी एवं ब्रज परंपराएं: ब्रजेश्वरी का आधिपत्य",
    category: "radha",
    categoryLabel: "Divine Feminine",
    excerpt:
      "Why every greeting in Braj begins with 'Radhe Radhe', the heritage of Bhanugarh hill in Barsana, and the supreme reverence for the divine counterpart.",
    content: [
      "The Eternal Queen of Braj: In the cultural fabric of Mathura and Vrindavan, Krishna Himself is considered subordinate to the compassionate grace of Shri Radha (Brajeshwari). Without Radha's merciful recommendation, no seeker is believed to attain Krishna's inner sanctum.",
      "The 'Radhe Radhe' Greeting: Whether auto drivers in Mathura, priests at Banke Bihari, or ascetics along the parikrama marg, people greet each other exclusively with 'Radhe Radhe'. It functions as a prayer, greeting, blessing, and reminder of the divine feminine presence.",
      "Bhanugarh & Barsana: Perched atop Bhanugarh hill is the grand Ladli Ji Mandir, built of yellow and red Dholpur sandstone. The surrounding villages celebrate Radha's childhood in Barsana, where Her father Vrishabhanu Ji ruled.",
      "Radhashtami Festival: Celebrated on Bhadrapada Shukla Ashtami (15 days after Janmashtami), Barsana erupts in sublime festivities. Pilgrims sing Samaj Gayan hymns from 4:00 AM, showering Ladli Ji with laddu and fragrant waters.",
    ],
    spiritualEssence: "Hladini Shakti — the divine energy of ecstatic compassion, unconditional mercy, and devotional shelter.",
    devotionalTradition:
      "Emphasized predominantly by the Radhavallabh Sampradaya (founded by Hit Harivansh Mahaprabhu), Nimbarka Sampradaya, and Gaudiya Vaishnavism where Radha is worshiped as the primary deity.",
    historicalContext:
      "While early Puranas mention the Gopis collectively, Radha's theological preeminence crystallized in Jayadeva's Gita Govinda (12th century CE) and blossomed fully in 16th century Vrindavan poetry.",
    scripturalSource: "Padma Purana, Brahma Vaivarta Purana, and Gita Govinda.",
    keyLocations: ["Radha Rani Temple (Bhanugarh, Barsana)", "Prem Sarovar", "Radha Kund", "Maan Mandir"],
    relatedTempleSlugs: ["radha-rani-temple-barsana", "radha-raman-temple", "prem-mandir"],
    imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "govardhan-puja-annakut",
    title: "Govardhan Puja & The Annakut Tradition",
    hindiTitle: "गोवर्धन पूजा एवं अन्नकूट: गिरिराज धरण लीला",
    category: "govardhan",
    categoryLabel: "Sacred Hills & Ecology",
    excerpt:
      "The historic lifting of Mount Govardhan, the celebration of Annakut 56 Bhog, and the sacred 21-kilometer barefoot Parikrama.",
    content: [
      "Govardhan Dharan: When young Krishna convinced the Brajwasis to worship nature and the lifegiving Govardhan Hill rather than offering animal and food sacrifices to the rain-god Indra, a wrathful Indra flooded Braj. Krishna lifted the hill on the tip of His little finger for seven continuous days and nights, sheltering every creature.",
      "Annakut & 56 Bhog: To celebrate the lifting and nourish Krishna after His seven-day exertion, the villagers offered an enormous mountain of food (Annakut) comprising 56 distinct regional delicacies (Chhappan Bhog) — sweet halwas, puris, spiced vegetables, kheer, and butter.",
      "The 21-km Parikrama Tradition: Millions perform the 7-kos (21 km) circumambulation of Giriraj Maharaj, encompassing Daan Ghati, Mansi Ganga, Radha Kund, Shyam Kund, and Jatipura. Many perform Dandavati Parikrama, prostrating the entire 21 kilometers over weeks.",
      "Ecological Stewardship: Govardhan stands as India's earliest ecological declaration — honoring sacred groves, groundwater springs, grazing meadows, and living hills over ritualistic appeasement of celestial powers.",
    ],
    spiritualEssence: "Nature as direct divine manifestation and refuge; surrender to divine protection against cosmic storms.",
    devotionalTradition:
      "Govardhan is worshiped as non-different from Krishna Himself (Krishna Swaroop). Devotees never step onto the ridge with footwear or take rocks away without ritual authorization.",
    historicalContext:
      "The Govardhan pillar reliefs and seals date back over 1800 years in the Mathura archaeological complex.",
    scripturalSource: "Srimad Bhagavatam (Canto 10, Chapters 24-27) & Garga Samhita.",
    keyLocations: ["Daan Ghati Mandir", "Mansi Ganga", "Radha Kund", "Mukharbind Jatipura"],
    relatedTempleSlugs: ["govardhan-hill-giriraj", "daan-ghati-mandir"],
    imageUrl: "https://images.unsplash.com/photo-1596766487920-80a9161a0b36?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "braj-ki-holi-festivals",
    title: "Braj ki Holi & Living Local Festivals",
    hindiTitle: "ब्रज की विश्वप्रसिद्ध होली एवं स्थानीय महाउत्सव",
    category: "festivals",
    categoryLabel: "Ecstatic Celebrations",
    excerpt:
      "The 40-day Holi of Braj: Lathmar Holi in Barsana and Nandgaon, Phoolon ki Holi at Banke Bihari, Huranga, and Janmashtami.",
    content: [
      "40-Day Spring Celebration: While Holi is celebrated for a day or two across India, in Braj it begins on Vasant Panchami and lasts over forty days across the villages of Mathura, Vrindavan, Barsana, Nandgaon, Gokul, and Baldeo.",
      "Lathmar Holi (Barsana & Nandgaon): Gopa men from Nandgaon arrive at Barsana, teasing the women with folk verses. The women, armed with stout wooden lathis, playfully strike the men's leather shields while traditional Tesu (Palash tree) organic orange water is sprayed.",
      "Phoolon ki Holi (Banke Bihari Mandir): On Ekadashi prior to Holi, the sanctum gates open as priests throw hundreds of kilograms of fragrant flower petals (marigold, rose, jasmine) over the congregation instead of dry powders.",
      "Janmashtami & Chhappan Bhog: Krishna Janmashtami witnesses midnight abhishek at Krishna Janmasthan with milk, curd, honey, and sacred Yamuna water. Temple towers glow under thousands of oil lamps.",
    ],
    spiritualEssence: "The dissolution of social pride and ego through joyful devotion, color, music, and divine camaraderie.",
    devotionalTradition:
      "Traditional Holi songs (Hori, Rasiya) have been composed in Braj Bhasha for centuries by saint-poets like Surdas, Rasik Pritam, and Kumbhandas.",
    historicalContext:
      "Travel records from the Mughal court and British administrative gazetteers describe the vibrant crowds and ritual authenticity of Barsana's Lathmar Holi.",
    scripturalSource: "Bhavishya Purana, Garga Samhita, and Braj Bhasha Rasiya folklore traditions.",
    keyLocations: ["Radha Rani Temple Barsana", "Nand Bhawan Nandgaon", "Banke Bihari Vrindavan", "Janmasthan Mathura"],
    relatedTempleSlugs: ["radha-rani-temple-barsana", "nand-bhawan-nandgaon", "banke-bihari-temple", "shri-krishna-janmabhoomi"],
    imageUrl: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "braj-language-food-music",
    title: "Braj Heritage: Bhasha, Rasoi & Haveli Sangeet",
    hindiTitle: "ब्रज संस्कृति: ब्रजभाषा, स्वाद एवं हवेली संगीत",
    category: "heritage",
    categoryLabel: "Cultural Expressions",
    excerpt:
      "The sweet phonetics of Braj Bhasha poetry, culinary wonders from Mathura Peda to Bedmi Puri, and classical Samaj Gayan.",
    content: [
      "Braj Bhasha Literature: Once the lingua franca of North Indian classical literature and bhakti poetry, Braj Bhasha is characterized by gentle phonetic cadence and mellifluous sweetness. The immortal compositions of the Ashtachhap poets (notably Surdas and Nanddas) formed the golden age of devotional Hindi.",
      "Prasadam & Culinary Heritage: Braj's food culture revolves around pure dairy: legendary golden-brown Mathura Peda made of slow-roasted mawa and boora; crispy Bedmi Puri with spicy hing-infused aloo sabzi for breakfast; malai lassi served in earthen kulhads; and the 56 varieties of Annakut.",
      "Haveli Sangeet & Samaj Gayan: Preserved in the classical temples of Vrindavan and Gokul, Haveli Sangeet combines Dhrupad and Dhamar ragas keyed to the time of day and season. At Radha Raman and Banke Bihari, saint-priests sing Samaj Gayan verses seated cross-legged with pakhawaj and manjeera.",
      "Handicrafts & Sanjhi Art: Vrindavan's Sanjhi art is an intricate stencil technique using cut paper and dry colored powders to create elaborate floral diagrams illustrating Krishna's pastimes on water surfaces or temple floors.",
    ],
    spiritualEssence: "Sanctifying everyday human faculties — language, taste, sound, and sight — as offerings of divine beauty.",
    devotionalTradition:
      "Every dish cooked in traditional Braj kitchens is offered first as Naivedya or Bhog to the deity before household consumption, ensuring food is consumed as sanctified prasadam.",
    historicalContext:
      "Braj Bhasha dominated the imperial courts and temple shrines from the 15th to late 19th century before modern standard Khariboli Hindi gained prominence.",
    scripturalSource: "Chaurasi Vaishnavan ki Varta, Sur Sagar, and Rasik Vani texts.",
    keyLocations: ["Vishram Ghat Mathura", "Radha Raman Mandir Vrindavan", "Bankey Bihari Bazar", "Loi Bazar"],
    relatedTempleSlugs: ["dwarkadhish-temple-mathura", "radha-raman-temple", "banke-bihari-temple"],
    imageUrl: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
  },
];

export function getAllCultureStories(): CulturalStory[] {
  return CULTURAL_STORIES;
}

export function getCultureStoryById(id: string): CulturalStory | undefined {
  return CULTURAL_STORIES.find((story) => story.id === id);
}

export function getCultureStoriesByCategory(category: string): CulturalStory[] {
  if (category === "all") return CULTURAL_STORIES;
  return CULTURAL_STORIES.filter((story) => story.category === category);
}
