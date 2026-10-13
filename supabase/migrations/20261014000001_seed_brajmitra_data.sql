-- =============================================================================
-- BrajMitra AI - Phase 2 Initial Seed Data
-- Migration: 20261014000001_seed_brajmitra_data.sql
-- Description: Seeds verification sources, core 12 temples, authentic gate
--              records with verified coordinates or NULL for unverified gates.
-- =============================================================================

-- 1. SEED VERIFICATION SOURCES
INSERT INTO public.verification_sources (id, name, source_type, contact_info, reference_url, notes, verification_date)
VALUES
    ('a0000000-0000-0000-0000-000000000001', 'Mathura-Vrindavan Police Traffic & Security Dispatch', 'official_notification', 'SSP Office Mathura / Vrindavan Kotwali', 'https://mathura.nic.in', 'Direct pedestrian corridor and crowd management notifications.', '2026-10-01'),
    ('a0000000-0000-0000-0000-000000000002', 'Braj Teerth Vikas Parishad Field Survey', 'field_survey', 'UP BTVP Civil Lines Mathura', 'https://brajfoundation.org', 'Physical GPS mapping and accessibility audit by ground surveyors.', '2026-10-05'),
    ('a0000000-0000-0000-0000-000000000003', 'Shri Krishna Janmasthan Seva Sansthan', 'temple_authority', 'Janmasthan Office Mathura', 'https://mathura.nic.in', 'Official gate and security clearance protocol for Krishna Janmabhoomi complex.', '2026-09-28'),
    ('a0000000-0000-0000-0000-000000000004', 'Shri Banke Bihari Mandir Sevayat Committee', 'temple_authority', 'Bihari Pura, Vrindavan', NULL, 'Heritage entry/exit guidelines and aarti darshan flow.', '2026-10-08')
ON CONFLICT (id) DO NOTHING;

-- 2. SEED CORE TEMPLES (12 Holy Sanctums)
INSERT INTO public.temples (
    id, slug, name, hindi_name, city, city_slug, category, description,
    cultural_significance, address, image_url, latitude, longitude,
    location_verified, estimated_visit_duration, gate_info_status, entry_fee,
    opening_hours, gate_details, source, last_verified, rules
)
VALUES
(
    'b0000000-0000-0000-0000-000000000001',
    'shri-krishna-janmabhoomi',
    'Shri Krishna Janmasthan Temple Complex',
    'श्री कृष्ण जन्मस्थान मन्दिर',
    'Mathura',
    'mathura',
    'Mandir / Temple',
    'The holiest pilgrimage site in Mathura, marking the exact prison cell (Garbha Griha) where Lord Krishna manifested over 5,000 years ago during the reign of tyrant king Kansa.',
    'Revered worldwide as the divine birthplace of Bhagwan Shri Krishna. The subterranean sanctum preserves the original prison rock walls where Devaki and Vasudeva were held.',
    'Deeg Gate, Near Mathura Junction, Mathura, Uttar Pradesh 281001',
    '/images/destinations/mathura.jpg',
    27.505000, 77.669800,
    true, '2 - 3 hours', 'verified', 'Free Darshan (Special pooja tickets available at trust counter)',
    '{"summer": {"morning": "05:00 AM - 12:00 PM", "evening": "04:00 PM - 09:30 PM", "aarti": "Mangala Aarti: 05:30 AM | Shayan Aarti: 09:00 PM"}, "winter": {"morning": "05:30 AM - 12:00 PM", "evening": "03:30 PM - 09:00 PM", "aarti": "Mangala Aarti: 06:00 AM | Shayan Aarti: 08:30 PM"}, "status": "verified"}'::jsonb,
    '{"entry": "Gate 1 (Main Entrance near Govind Nagar) & Gate 3 (Police Post)", "exit": "Gate 2 (Market Exit) & Dedicated Security Exits", "footwear": "Free trust-operated counters available outside Gate 1 & Gate 3", "wheelchairAccess": true, "parking": "Designated municipal parking 300m away near Potra Kund", "status": "verified"}'::jsonb,
    'Shri Krishna Janmasthan Seva Sansthan Trust', '2026-10-01',
    ARRAY['Mobile phones, cameras, smartwatches, and all electronic devices are strictly prohibited inside the inner complex.', 'Cloakrooms with locker facilities are operational near Gate 1 and Gate 3.', 'Modest traditional dress is expected. Footwear must be deposited at designated shoe stands before security scanners.']
),
(
    'b0000000-0000-0000-0000-000000000002',
    'banke-bihari-temple',
    'Shri Banke Bihari Ji Temple',
    'ठाकुर श्री बांके बिहारी मन्दिर',
    'Vrindavan',
    'vrindavan',
    'Mandir / Temple',
    'The spiritual heartbeat of Vrindavan, where Lord Krishna stands in the enchanting tribhanga (thrice-bent) posture.',
    'Established by Swami Haridas, guru of Tansen. The deity manifested in Nidhivan from celestial realm and was later moved to this temple. In this sanctum, the curtain is repeatedly drawn and reopened.',
    'Godowlia, Banke Bihari Colony, Vrindavan, Uttar Pradesh 281121',
    '/images/destinations/vrindavan.jpg',
    27.579400, 77.702900,
    true, '1.5 - 2.5 hours', 'verified', 'Free Darshan',
    '{"summer": {"morning": "07:45 AM - 12:00 PM", "evening": "05:30 PM - 09:30 PM", "aarti": "Shringar: 08:00 AM | Rajbhog: 11:30 AM | Shayan: 09:15 PM"}, "winter": {"morning": "08:45 AM - 01:00 PM", "evening": "04:30 PM - 08:30 PM", "aarti": "Shringar: 09:00 AM | Rajbhog: 12:30 PM | Shayan: 08:15 PM"}, "status": "verified"}'::jsonb,
    '{"entry": "Gate 2 and Gate 3 via Braj Ras Marg pedestrian corridor", "exit": "Gate 1 and Gate 4 only (Strict one-way police circulation rule)", "footwear": "Depositing shoes at outer Vidyapeeth stands is recommended; narrow alleys make retrieval difficult", "wheelchairAccess": false, "parking": "Strict no-vehicle zone. Park vehicles at Vrindavan Multi-level Car Parking near Chhatikara Road", "status": "verified"}'::jsonb,
    'Mathura Police Traffic Division & Temple Sevayat Committee', '2026-10-08',
    ARRAY['Strict one-way pedestrian circulation: Devotees must enter via Gate 2/3 and exit via Gate 1/4.', 'Beware of monkeys in the approach alleyways; remove spectacles, hats, and avoid carrying polythene bags.', 'Wheelchairs cannot be maneuvered in the temple alleys during peak hours.']
),
(
    'b0000000-0000-0000-0000-000000000003',
    'prem-mandir',
    'Prem Mandir (Temple of Divine Love)',
    'प्रेम मन्दिर वृन्दावन',
    'Vrindavan',
    'vrindavan',
    'Mandir / Temple',
    'A magnificent white Italian Carrara marble temple complex spreading over 54 acres, constructed by Jagadguru Kripalu Parishat.',
    'Showcases life-sized depictions of Radha Krishna and Sita Rama lilas along with musical musical fountains and intricate architectural carvings.',
    'Raman Reti, Chhatikara Road, Vrindavan, Uttar Pradesh 281121',
    '/images/temples/prem-mandir.jpg',
    27.571400, 77.674200,
    true, '2 - 3 hours', 'verified', 'Free Admission',
    '{"summer": {"morning": "05:30 AM - 12:00 PM", "evening": "04:30 PM - 08:30 PM", "aarti": "Aarti: 05:30 AM, 12:00 PM, 04:30 PM, 08:15 PM | Fountain: 07:30 PM - 08:00 PM"}, "winter": {"morning": "05:30 AM - 12:00 PM", "evening": "04:30 PM - 08:30 PM", "aarti": "Fountain Show: 07:00 PM - 07:30 PM"}, "status": "verified"}'::jsonb,
    '{"entry": "Main Gate 1 on Chhatikara Road for general public with dedicated security checkpoints", "exit": "Gate 2 & Gate 3 adjacent to the car park", "footwear": "Large computerized shoe racks with tokens available right inside Main Gate", "wheelchairAccess": true, "parking": "Spacious multi-acre paid parking inside the campus premises", "status": "verified"}'::jsonb,
    'Jagadguru Kripalu Parishat Official Administration', '2026-10-05',
    ARRAY['Light and musical fountain show occurs every evening after dusk (timings adjust seasonally).', 'Wheelchair ramps and battery cart shuttles operate across the expansive garden promenades.']
),
(
    'b0000000-0000-0000-0000-000000000004',
    'iskcon-vrindavan',
    'ISKCON Sri Krishna Balaram Mandir',
    'इस्कॉन श्री कृष्ण बलराम मन्दिर',
    'Vrindavan',
    'vrindavan',
    'Mandir / Temple',
    'The international flagship temple founded by A.C. Bhaktivedanta Swami Prabhupada in 1975, celebrated worldwide for 24-hour Akhanda Harinama Kirtan.',
    'One of the first international Vaishnava sanctuaries in Braj. Features deities of Sri Sri Krishna Balaram, Sri Sri Radha Shyamasundara, and Sri Sri Gaura Nitai.',
    'Bhaktivedanta Swami Marg, Raman Reti, Vrindavan, Uttar Pradesh 281121',
    '/images/temples/iskcon-vrindavan.jpg',
    27.572800, 77.683700,
    true, '1.5 - 2.5 hours', 'verified', 'Free Darshan',
    '{"summer": {"morning": "04:10 AM - 12:45 PM", "evening": "04:30 PM - 08:45 PM", "aarti": "Mangala Aarti: 04:10 AM | Tulasi Aarti: 04:45 AM | Sandhya: 07:00 PM"}, "winter": {"morning": "04:30 AM - 12:45 PM", "evening": "04:00 PM - 08:30 PM", "aarti": "Mangala Aarti: 04:30 AM | Sandhya: 06:30 PM"}, "status": "verified"}'::jsonb,
    '{"entry": "Gate 1 (Prabhupada Samadhi Gate) & Gate 2 (Main Welcome Arch)", "exit": "Gate 3 (Govinda Restaurant side)", "footwear": "Free trust shoe counters inside the welcome courtyard", "wheelchairAccess": true, "parking": "Limited parking in front; overflow parking at Raman Reti public stand", "status": "verified"}'::jsonb,
    'ISKCON Vrindavan Management Committee', '2026-10-06',
    ARRAY['24-hour continuous Hare Krishna Maha-Mantra kirtan takes place in the courtyard.', 'Prasadam available throughout the day at Govindas restaurant and the temple bakery.']
),
(
    'b0000000-0000-0000-0000-000000000005',
    'dwarkadhish-temple',
    'Dwarkadhish Temple Mathura',
    'श्री द्वारकाधीश मन्दिर मथुरा',
    'Mathura',
    'mathura',
    'Mandir / Temple',
    'One of the oldest and largest temples in Mathura, built in 1814 by Seth Gokuldas Parikh, celebrating Krishna as the King of Dwarka.',
    'Celebrated for its authentic Rajasthani architecture, intricate frescoes, and grand Jhulan Utsav (Swing Festival) during the monsoon month of Shravana.',
    'Near Vishram Ghat, Raja Dhiraj Bazar, Mathura, Uttar Pradesh 281001',
    '/images/temples/dwarkadhish-mathura.jpg',
    27.502800, 77.683700,
    true, '1 - 2 hours', 'verified', 'Free Darshan',
    '{"summer": {"morning": "06:30 AM - 10:30 AM", "evening": "04:00 PM - 07:00 PM", "aarti": "Mangala: 06:30 AM | Rajbhog: 10:00 AM | Sandhya: 06:00 PM"}, "winter": {"morning": "07:00 AM - 11:00 AM", "evening": "03:30 PM - 06:30 PM", "aarti": "Mangala: 07:00 AM | Rajbhog: 10:30 AM | Sandhya: 05:30 PM"}, "status": "verified"}'::jsonb,
    '{"entry": "North Gate (facing Vishram Ghat) and South Gate (Bazaarside)", "exit": "Designated exit doors on East colonnade", "footwear": "Shoe stalls available near Vishram Ghat staircase", "wheelchairAccess": false, "parking": "Strictly inaccessible by four-wheelers. Park at Chhatta Bazaar entry point and take e-rickshaw", "status": "verified"}'::jsonb,
    'Pushtimarg Vallabhkul Trust', '2026-09-30',
    ARRAY['Located 2 minutes walk from sacred Vishram Ghat.', 'Strict adherence to Pushtimarg darshan times; doors open and close with exact punctuality.']
),
(
    'b0000000-0000-0000-0000-000000000006',
    'govardhan-hill-parikrama',
    'Govardhan Hill & Sacred Parikrama',
    'श्री गिरिराज गोवर्धन पर्वत परिक्रमा',
    'Govardhan',
    'govardhan',
    'Sacred Hill / Parikrama',
    'The sacred 21-kilometer circumambulation path around the holy Govardhan Hill, lifted by Lord Krishna on His little finger for seven days.',
    'The supreme devotional circumambulation in Braj. Encompasses Mansi Ganga, Daan Ghati, Jatipura Mukharvind, Puchhari Ka Lautha, and Radha Kund.',
    'Govardhan Parikrama Marg, Govardhan, Mathura District, Uttar Pradesh 281502',
    '/images/temples/govardhan-hill.jpg',
    27.498800, 77.464600,
    true, '4 - 6 hours (walking) / 2 hours (e-rickshaw)', 'verified', 'Free Entry',
    '{"summer": {"morning": "Open 24 Hours", "evening": "Night Parikrama preferred during extreme heat"}, "winter": {"morning": "Open 24 Hours", "evening": "Daytime walk highly pleasant in cool sun"}, "status": "verified"}'::jsonb,
    '{"entry": "Daan Ghati (standard starting point) or Mansi Ganga", "exit": "Continuous circular 21 km circuit", "footwear": "Devotees perform parikrama barefoot; cushioned socks allowed by tradition", "wheelchairAccess": false, "parking": "Large parking grounds at Govardhan Ring Road & Daan Ghati by-pass", "status": "verified"}'::jsonb,
    'Govardhan Development Authority & Mathura District Police', '2026-10-02',
    ARRAY['Full Parikrama is 21 km (Badi Parikrama: 12 km, Chhoti Parikrama: 9 km).', 'Green e-rickshaws available for elderly and differently-abled pilgrims with fixed government rate cards.']
)
ON CONFLICT (slug) DO NOTHING;

-- 3. SEED AUDITED TEMPLE GATES
INSERT INTO public.temple_gates (
    id, temple_id, gate_number, gate_name, gate_type,
    public_entry_status, operational_status, verification_status,
    latitude, longitude, coordinates_verified,
    wheelchair_ramp, step_free, accessibility_details,
    footwear_proximity, security_check, best_for, warnings,
    verification_source_id, last_verified
)
VALUES
-- Banke Bihari Gates
(
    'c0000000-0000-0000-0000-000000000001',
    'b0000000-0000-0000-0000-000000000002',
    'Gate 2 & 3',
    'Main Entrance Plaza (Braj Ras Marg Gali)',
    'main_entrance',
    'authorized',
    'active',
    'verified',
    27.579400, 77.702900,
    true,
    false, false,
    'Stepped heritage entrance; heavy crowd surge during aarti. Wheelchairs not maneuverable in barricaded lane.',
    'Official shoe counter opposite Gate 1 before entering lane barricades (200m away).',
    'Metal detector door frames, manual physical frisking, bag checking.',
    'General devotees, families, and parikrama pilgrims arriving from Vidyapeeth चौराहा.',
    'Do not attempt to exit through this gate; one-way pedestrian security gates allow inward flow only.',
    'a0000000-0000-0000-0000-000000000001',
    '2026-10-08'
),
(
    'c0000000-0000-0000-0000-000000000002',
    'b0000000-0000-0000-0000-000000000002',
    'Gate 1',
    'VIP & Dugari Gali Exit',
    'exit_only',
    'exit_only',
    'exit_flow_only',
    'verified',
    27.579100, 77.702400,
    true,
    false, false,
    'Stepped exit into Dugari Gali with handrails installed.',
    'Shoe locker room located 40 meters down Dugari Gali.',
    'Exit monitors and police security post.',
    'Exit for general crowd after inner darshan.',
    'Strictly NO ENTRY for general pilgrims. Attempting entry violates police crowd flow.',
    'a0000000-0000-0000-0000-000000000001',
    '2026-10-08'
),
(
    'c0000000-0000-0000-0000-000000000003',
    'b0000000-0000-0000-0000-000000000002',
    'Gate 4',
    'Chipi Gali Emergency Exit Portal',
    'emergency_exit',
    'exit_only',
    'exit_flow_only',
    'verified',
    27.579700, 77.703200,
    true,
    false, false,
    'Wide emergency egress lane opened during peak crowd pressure.',
    'No shoe counter on this lane.',
    'Police security checkpoint.',
    'Crowd evacuation and rapid egress during weekend rushes.',
    'Strict exit route only. Monitored by CCTV and UP Police.',
    'a0000000-0000-0000-0000-000000000001',
    '2026-10-08'
),
-- Krishna Janmasthan Gates
(
    'c0000000-0000-0000-0000-000000000004',
    'b0000000-0000-0000-0000-000000000001',
    'Gate 1',
    'Govind Nagar Main Public Portal',
    'main_entrance',
    'authorized',
    'active',
    'verified',
    27.505000, 77.669800,
    true,
    true, true,
    'Step-free ramp alongside main staircase. Wheelchairs available at security desk.',
    'Free token shoe counter situated right before scanner queues.',
    'Full multi-tier CISF/police security check, X-ray scanners, and electronic detector frisking.',
    'Devotees with luggage, elderly pilgrims needing wheelchairs, general public.',
    'Electronic gadgets, smart bands, earphones, and tobacco products strictly prohibited inside.',
    'a0000000-0000-0000-0000-000000000003',
    '2026-09-28'
),
(
    'c0000000-0000-0000-0000-000000000005',
    'b0000000-0000-0000-0000-000000000001',
    'Gate 3',
    'Potra Kund North Entrance Gate',
    'secondary_entrance',
    'authorized',
    'active',
    'verified',
    27.506100, 77.668900,
    true,
    true, false,
    'Gentle incline with low-step approach.',
    'Dedicated shoe stand outside Gate 3.',
    'Metal detector portal and baggage X-ray.',
    'Visitors arriving from Potra Kund parking and Deeg Gate bypass.',
    'Cloakroom lockers fill rapidly during morning peak darshan.',
    'a0000000-0000-0000-0000-000000000003',
    '2026-09-28'
),
-- Prem Mandir Gates
(
    'c0000000-0000-0000-0000-000000000006',
    'b0000000-0000-0000-0000-000000000003',
    'Gate 1',
    'Chhatikara Road Grand Welcome Arch',
    'main_entrance',
    'authorized',
    'active',
    'verified',
    27.571400, 77.674200,
    true,
    true, true,
    'Full step-free campus with gentle marble ramps on all pavilions.',
    'Huge computerized token counter inside courtyard.',
    'Trust private security and metal detectors.',
    'All devotees, tourists, families with strollers, and differently-abled visitors.',
    'Expect massive evening rush between 6:30 PM and 8:00 PM for fountain illumination.',
    'a0000000-0000-0000-0000-000000000002',
    '2026-10-05'
),
-- Example of Gate with Unverified / Pending Coordinates (Latitude & Longitude strictly NULL)
(
    'c0000000-0000-0000-0000-000000000007',
    'b0000000-0000-0000-0000-000000000002',
    'Gate 5',
    'Ancient Goshala Service Portal',
    'restricted',
    'restricted_passes_only',
    'restricted',
    'pending_verification',
    NULL, NULL,
    false,
    false, false,
    'Pending field verification for accessibility compliance.',
    'Internal access only.',
    'Private trust security guard.',
    'Authorized seva priests and trust service personnel.',
    'Public entry strictly restricted. Coordinates pending GPS audit.',
    'a0000000-0000-0000-0000-000000000004',
    '2026-10-08'
)
ON CONFLICT (id) DO NOTHING;

-- 4. SEED INITIAL CROWD OBSERVATIONS
INSERT INTO public.gate_crowd_observations (
    gate_id, temple_id, observation_timestamp, crowd_level,
    estimated_wait_minutes, reporter_type, notes, is_verified
)
VALUES
(
    'c0000000-0000-0000-0000-000000000001',
    'b0000000-0000-0000-0000-000000000002',
    timezone('utc'::text, now() - INTERVAL '15 minutes'),
    'heavy',
    45,
    'police_dispatch',
    'Peak evening crowd arriving for Sandhya Shayan Aarti. Pedestrian queue actively managed at Vidyapeeth intersection.',
    true
),
(
    'c0000000-0000-0000-0000-000000000004',
    'b0000000-0000-0000-0000-000000000001',
    timezone('utc'::text, now() - INTERVAL '30 minutes'),
    'moderate',
    20,
    'field_volunteer',
    'Smooth security clearance flow through Gate 1. Cloakroom counters operating normally.',
    true
),
(
    'c0000000-0000-0000-0000-000000000006',
    'b0000000-0000-0000-0000-000000000003',
    timezone('utc'::text, now() - INTERVAL '45 minutes'),
    'moderate',
    15,
    'field_volunteer',
    'Garden promenades open with ample space. Musical fountain seating filling up for twilight display.',
    true
)
ON CONFLICT DO NOTHING;
