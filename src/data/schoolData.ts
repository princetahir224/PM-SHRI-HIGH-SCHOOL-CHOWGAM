export interface FacilityItem {
  id: string;
  name: string;
  category: 'academic' | 'infrastructure' | 'sanitation' | 'safety' | 'green';
  description: string;
  status: 'Operational' | 'Active' | 'Under Enhancement' | 'Planned Expansion';
  accessibility: string;
  features: string[];
  imageKey?: string;
  notes?: string;
}

export interface DevelopmentDomain {
  id: string;
  code: string;
  title: string;
  tagline: string;
  objectives: string[];
  keyActivities: string[];
  pedagogy: string;
  nepAlignment: string;
}

export interface QualityIndicator {
  id: string;
  domainNumber: number;
  domainName: string;
  target: string;
  status: 'Completed' | 'In Progress' | 'Needs Improvement' | 'Not Started';
  evidence: string;
  actionPlan: string;
  lastUpdated: string;
}

export interface StaffMember {
  id: string;
  slotNumber: number;
  role: string;
  designation: string;
  department: string;
  name: string; // Placeholder or verified
  qualifications: string;
  responsibilities: string;
  isHOI?: boolean;
  status: 'Verified Role' | 'Profile Configurable';
}

export interface NoticeItem {
  id: string;
  title: string;
  category: 'Academic' | 'Admissions' | 'Examination' | 'General' | 'PM SHRI' | 'Holiday';
  date: string;
  content: string;
  attachmentName?: string;
  isImportant?: boolean;
}

export interface AcademicClass {
  grade: string;
  section: string;
  medium: string;
  subjects: string[];
  syllabusOverview: string;
}

export const INITIAL_SCHOOL_INFO = {
  name: "PM SHRI Govt High School Chowgam",
  shortName: "PM SHRI GHS Chowgam",
  motto: "Excellence in Education • Innovation in Learning • Values for Life",
  tagline: "Rooted in Nature. Inspired by Knowledge. Empowering Every Learner. Building Tomorrow.",
  subtext: "Empowering young minds through quality education, digital innovation, inclusive learning, environmental responsibility, and holistic development in the beautiful surroundings of Chowgam.",
  location: {
    village: "Chowgam",
    zone: "Shanglus",
    district: "Anantnag",
    stateUT: "Jammu and Kashmir",
    country: "India",
    distanceFromAnantnag: "Approximately 27 km from Anantnag",
    setting: "Scenic mini-valley nestled at the foot of lush green mountains",
    landmark: "Chowgam Valley, Foot of Pine Mountains"
  },
  infrastructure: {
    buildings: "Two school buildings (Two-story red-brick main building with balcony colonnade + second auxiliary block)",
    campusArea: "Approximately 3 acres (subject to official land record verification)",
    staffCount: 13,
    classrooms: "Well-ventilated learning rooms with mountain views",
    smartClassroom: "Operational Smart Classroom with interactive display",
    ictLab: "Dedicated ICT Computer Laboratory",
    library: "Dedicated school library with reading tables",
    toilets: "Separate boys', girls', and CWSN-accessible barrier-free toilet units",
    water: "Clean drinking water facility with filtration points",
    electricity: "Functional electricity connections & power backup"
  },
  hoi: {
    title: "Headmaster / Head of Institution (HOI)",
    name: "Mr. Shareef Ahmad Khan",
    qualifications: "M.A., B.Ed.",
    phone: "7889725799",
    email: "hschowgam@gmail.com",
    message: "Welcome to PM SHRI Govt High School Chowgam. Nestled within this serene mini-valley surrounded by verdant mountains, our institution stands as a beacon of hope and transformation for our children. Guided by the National Education Policy (NEP) 2020 and the PM SHRI framework, we nurture every child's innate curiosity, scientific reasoning, moral values, and creative potential. Here, education is not mere bookish learning—it is the joyous awakening of the whole human being in harmony with nature.",
    vision: "To cultivate a model public school where academic rigor, digital empowerment, environmental stewardship, and human empathy unite to prepare future leaders of Jammu & Kashmir and India.",
    annualPriorities: [
      "Deepening competency-based and experiential learning across Classes 6 to 10.",
      "Expanding ICT and smart-classroom pedagogical use for every enrolled student.",
      "Ensuring 100% barrier-free accessibility and tailored support for Children with Special Needs (CWSN).",
      "Promoting green campus initiatives, tree plantation drives, and student-led environmental audits.",
      "Strengthening School Management Committee (SMC) and parental collaboration."
    ]
  },
  contact: {
    phone: "7889725799",
    displayPhone: "+91 78897 25799",
    email: "hschowgam@gmail.com",
    officeHours: "Monday to Saturday, 10:00 AM – 04:00 PM"
  }
};

export const INITIAL_FACILITIES: FacilityItem[] = [
  {
    id: "fac-1",
    name: "Two-Story Main School Building",
    category: "infrastructure",
    description: "Solid multi-story concrete and timber educational block housing main high school classrooms, administrative chamber, and smart rooms with scenic mountain orientation.",
    status: "Operational",
    accessibility: "Ground floor ramp access and wide corridors.",
    features: ["Multiple well-lit classrooms", "Natural ventilation", "High thermal insulation for mountain climate"]
  },
  {
    id: "fac-2",
    name: "Second School Building",
    category: "infrastructure",
    description: "Dedicated auxiliary building providing additional flexible classrooms, activity spaces, and designated study zones.",
    status: "Operational",
    accessibility: "Level entry threshold suitable for all students.",
    features: ["Activity-oriented space", "Group learning layout", "Direct connection to open grounds"]
  },
  {
    id: "fac-3",
    name: "Smart Classroom / Digital Interactive Room",
    category: "academic",
    description: "Technology-enabled classroom equipped with an interactive digital board, multimedia learning projector, and curated audiovisual educational content.",
    status: "Active",
    accessibility: "Accessible ground-level access with assistive audio capability.",
    features: ["Interactive Smart Screen", "Digital NCERT / DIKSHA curriculum content", "Audio-visual learning support"]
  },
  {
    id: "fac-4",
    name: "ICT Computer Laboratory",
    category: "academic",
    description: "Dedicated computing lab facilitating foundational digital literacy, computational thinking, and technology skills for high school students.",
    status: "Active",
    accessibility: "Ergonomic seating arrangements and wheelchair-accessible workstation.",
    features: ["Student computing terminals", "Educational software & typing tools", "Cyber safety guidelines posted"]
  },
  {
    id: "fac-5",
    name: "Dedicated School Library",
    category: "academic",
    description: "Peaceful reading sanctuary stocked with academic reference textbooks, Kashmiri and Urdu literature, English storybooks, scientific magazines, and general knowledge works.",
    status: "Operational",
    accessibility: "Well-spaced reading aisles and seated desks with natural window illumination.",
    features: ["Curated book catalog", "Reading club corner", "Lending register"]
  },
  {
    id: "fac-6",
    name: "Separate Boys' Toilet Facility",
    category: "sanitation",
    description: "Hygienic, private, and ventilated toilet facility specifically designated for male students with running water and handwashing stations.",
    status: "Operational",
    accessibility: "Clear approach pathway with non-slip flooring.",
    features: ["Dedicated urinals & cubicles", "Running water supply", "Daily sanitation roster"]
  },
  {
    id: "fac-7",
    name: "Separate Girls' Toilet Facility",
    category: "sanitation",
    description: "Safe, dignified, and clean sanitation block exclusively for female students, ensuring privacy, hygiene, and menstrual hygiene support.",
    status: "Operational",
    accessibility: "Private secluded entryway with paved pathway.",
    features: ["Privacy-ensured enclosures", "Handwashing sink with soap", "Hygienic disposal provisions"]
  },
  {
    id: "fac-8",
    name: "CWSN-Accessible Barrier-Free Toilet",
    category: "sanitation",
    description: "Custom-designed sanitation facility for Children With Special Needs featuring wider doorways, grab support rails, and level access.",
    status: "Operational",
    accessibility: "Full wheelchair turning radius, sturdy safety grab bars, low-height fixtures.",
    features: ["Stainless steel grab bars", "Anti-skid floor tiles", "Emergency call bell provision"]
  },
  {
    id: "fac-9",
    name: "Clean Drinking Water Point",
    category: "sanitation",
    description: "Safe potable drinking water station with filtration mechanisms catering to the entire student body and staff.",
    status: "Operational",
    accessibility: "Accessible tap height for children of varying statures.",
    features: ["Water filtration units", "Multiple tap stations", "Regular water purity checks"]
  },
  {
    id: "fac-10",
    name: "Science Practical Learning Resources",
    category: "academic",
    description: "Hands-on science kits, experimental apparatus, models, and charts for Physics, Chemistry, and Biology experiential demonstrations.",
    status: "Active",
    accessibility: "Demonstration tables with clear sightlines and tactile science models.",
    features: ["Microscopes & slides", "Chemical demonstration kits", "Anatomy & botanical charts"]
  },
  {
    id: "fac-11",
    name: "Mathematics Learning Corner",
    category: "academic",
    description: "Manipulative math aids, geometric shapes, abacus tools, and graphing aids to demystify mathematical concepts through visual and tactile touch.",
    status: "Active",
    accessibility: "Multi-sensory geometric solids and tactile measuring tools.",
    features: ["Geometric solids & models", "Fraction strips & measuring kits", "Math puzzle corner"]
  },
  {
    id: "fac-12",
    name: "Sports Grounds & Outdoor Physical Education",
    category: "infrastructure",
    description: "Outdoor play space nestled amidst the valley floor where students engage in volleyball, cricket, badminton, yoga, and physical fitness activities.",
    status: "Active",
    accessibility: "Graded outdoor surface with clear perimeter safety.",
    features: ["Volleyball & badminton equipment", "Cricket gear & footballs", "Daily morning yoga space"]
  },
  {
    id: "fac-13",
    name: "Green Campus & Botanical Plantation",
    category: "green",
    description: "Lush eco-garden and native tree plantation plots managed in partnership with the student Eco-Club in the picturesque Chowgam valley.",
    status: "Operational",
    accessibility: "Gently sloping stone pathways throughout the school lawn.",
    features: ["Native pine & chinár saplings", "Medicinal herbs corner", "Composting bin area"]
  },
  {
    id: "fac-14",
    name: "First-Aid & Student Safety Unit",
    category: "safety",
    description: "Equipped first-aid station with sterile dressings, emergency medicines, antiseptic supplies, and trained designated staff.",
    status: "Operational",
    accessibility: "Immediate ground-floor access adjacent to HOI office.",
    features: ["Standard emergency medical kit", "Stretcher & resting cot", "Direct contact with local PHC"]
  },
  {
    id: "fac-15",
    name: "Staff Room & Teacher Preparation Area",
    category: "infrastructure",
    description: "Collaborative workspace for the school's 13 staff members equipped with lesson planning desks and curriculum materials.",
    status: "Operational",
    accessibility: "Level access for all faculty members.",
    features: ["Individual teacher desks", "Lesson planning station", "Staff meeting table"]
  },
  {
    id: "fac-16",
    name: "Barrier-Free Ramps & Pathways",
    category: "infrastructure",
    description: "Graded ramps and solid paving connecting the main gate, school buildings, and sanitation facilities for barrier-free movement.",
    status: "Operational",
    accessibility: "Mild gradient slope compliant with universal accessibility norms.",
    features: ["Non-slip surface paving", "Support handrails along key transitions", "Level room thresholds"]
  }
];

export const BEYOND_CLASSROOM_DOMAINS: DevelopmentDomain[] = [
  {
    id: "domain-a",
    code: "A",
    title: "Intellectual & Cognitive Development",
    tagline: "Cultivating curiosity, scientific temper, and reasoned inquiry.",
    objectives: [
      "Fostering independent analytical thinking beyond rote memorization.",
      "Encouraging evidence-based reasoning and hypothesis testing.",
      "Developing deep conceptual clarity in mathematics, sciences, and languages."
    ],
    keyActivities: [
      "Weekly 'Question of the Week' inquiry circle in morning assemblies.",
      "Student science mini-projects demonstrating local natural phenomena.",
      "Mathematics problem-solving circles and logic puzzles."
    ],
    pedagogy: "Inquiry-based and experiential learning rooted in real-life observations of the Chowgam valley.",
    nepAlignment: "NEP 2020 Para 4.4: Shift from rote learning to critical thinking and inquiry."
  },
  {
    id: "domain-b",
    code: "B",
    title: "Physical Development & Sports",
    tagline: "Building endurance, vitality, discipline, and sportsmanship.",
    objectives: [
      "Instilling lifelong daily fitness and healthy bodily habits.",
      "Promoting team spirit, fair play, and resilience in competition.",
      "Incorporating traditional games alongside standard sports."
    ],
    keyActivities: [
      "Daily structured morning assembly physical training (PT) & Pranayama.",
      "Inter-house volleyball, cricket, and badminton matches.",
      "Annual school sports festival and track events."
    ],
    pedagogy: "Sports-integrated learning and physical education as an organic part of the school timetable.",
    nepAlignment: "Fit India Movement & NEP 2020 Sports-Integrated Learning mandate."
  },
  {
    id: "domain-c",
    code: "C",
    title: "Emotional & Mental Well-being",
    tagline: "Nurturing emotional resilience, self-esteem, and inner calm.",
    objectives: [
      "Providing a safe, supportive, non-threatening school atmosphere.",
      "Teaching age-appropriate emotional regulation and stress coping.",
      "Maintaining an open-door compassionate policy for every child."
    ],
    keyActivities: [
      "Zero-tolerance anti-bullying orientation and anonymous suggestion box.",
      "Mindful silence and breathing exercises at the start of learning periods.",
      "Regular teacher-mentor check-ins for emotional well-being."
    ],
    pedagogy: "Compassionate trauma-informed pedagogy prioritizing psychological safety.",
    nepAlignment: "Manodarpan Guidelines & Mental Health in Schools."
  },
  {
    id: "domain-d",
    code: "D",
    title: "Social & Moral Values",
    tagline: "Instilling empathy, integrity, mutual respect, and civic duty.",
    objectives: [
      "Embedding universal human values: honesty, kindness, and equity.",
      "Encouraging peaceful dialogue and respectful resolution of conflict.",
      "Fostering pride in communal harmony and social responsibility."
    ],
    keyActivities: [
      "Value-reflection stories shared during morning assembly.",
      "Peer-tutoring programs where seniors guide juniors.",
      "Community cleanliness and mutual aid volunteer days."
    ],
    pedagogy: "Value-integrated education where moral virtues are lived and modeled daily.",
    nepAlignment: "NEP 2020 Para 4.28: Constitutional values, seva, and ethical living."
  },
  {
    id: "domain-e",
    code: "E",
    title: "Cultural & Artistic Expression",
    tagline: "Celebrating local heritage, creative arts, drama, and poetry.",
    objectives: [
      "Preserving and honoring Kashmiri and regional artistic traditions.",
      "Providing creative outlets through drawing, painting, and craft.",
      "Enhancing public speaking, debate, and declamation skills."
    ],
    keyActivities: [
      "Calligraphy, sketch, and watercolor painting competitions.",
      "Recitation of Kashmiri, Urdu, and English poetry (Mushaira/Declamation).",
      "Celebration of national days with traditional folk songs and drama."
    ],
    pedagogy: "Art-integrated learning that connects academic themes to aesthetic expressions.",
    nepAlignment: "Kala Utsav & Art-Integrated Pedagogy (CBSE/JKBOSE)."
  },
  {
    id: "domain-f",
    code: "F",
    title: "Digital & Technological Literacy",
    tagline: "Mastering 21st-century digital tools with cyber ethics.",
    objectives: [
      "Bridging the rural-urban digital divide with hands-on computer access.",
      "Teaching internet research, document creation, and typing skills.",
      "Educating students on cyber safety, privacy, and digital well-being."
    ],
    keyActivities: [
      "Hands-on ICT lab sessions for every class weekly.",
      "Digital safety workshops on password security and safe online browsing.",
      "Exposure to educational portals: DIKSHA, SWAYAM, and digital encyclopedias."
    ],
    pedagogy: "Blended learning combining digital resources with teacher-guided instruction.",
    nepAlignment: "NEP 2020 Technology in Education & Digital India Mission."
  },
  {
    id: "domain-g",
    code: "G",
    title: "Environmental & Eco-Club Initiatives",
    tagline: "Guarding our mini-valley ecology, mountains, and pristine water.",
    objectives: [
      "Instilling environmental stewardship in the Himalayan ecosystem.",
      "Promoting waste segregation, water conservation, and zero plastic.",
      "Engaging students in hands-on tree plantation and green campus care."
    ],
    keyActivities: [
      "Active Eco-Club sapling plantation across the campus perimeter.",
      "'Clean Chowgam' anti-plastic student awareness walks.",
      "Rainwater harvesting awareness and botanical labeling."
    ],
    pedagogy: "Place-based environmental education using the surrounding hills as a living laboratory.",
    nepAlignment: "PM SHRI Green School framework & Mission LiFE (Lifestyle for Environment)."
  },
  {
    id: "domain-h",
    code: "H",
    title: "Vocational & Career Awareness",
    tagline: "Connecting school learning to practical livelihood skills.",
    objectives: [
      "Exposing students to local handicrafts, agriculture, and horticulture.",
      "Developing foundational financial literacy and budgeting awareness.",
      "Broadening awareness of modern career paths and higher education."
    ],
    keyActivities: [
      "Interaction sessions with local artisans, horticulturists, and professionals.",
      "Career guidance sessions for Class 9 and 10 students.",
      "Practical workshops on basic home electrical safety and carpentry basics."
    ],
    pedagogy: "Hands-on vocational exposure and 10-bagless-days concept.",
    nepAlignment: "NEP 2020 Vocational Education integration from secondary grades."
  },
  {
    id: "domain-i",
    code: "I",
    title: "Leadership & Democratic Citizenship",
    tagline: "Empowering student voice, constitutional understanding, and leadership.",
    objectives: [
      "Nurturing democratic values and respectful teamwork.",
      "Empowering students through class prefects and house captains.",
      "Instilling deep appreciation of India's Constitution and rights."
    ],
    keyActivities: [
      "Preamble reading and constitutional discussion sessions.",
      "Student representative council for assembly, cleanliness, and sports.",
      "Classroom duties roster rotating leadership roles among all students."
    ],
    pedagogy: "Participatory governance encouraging student agency and social responsibility.",
    nepAlignment: "Constitutional Literacy and Samvidhan Diwas observances."
  },
  {
    id: "domain-j",
    code: "J",
    title: "Life Skills & Personal Development",
    tagline: "Mastering time management, communication, and self-reliance.",
    objectives: [
      "Fostering effective verbal and written communication.",
      "Teaching time management, goal setting, and personal organization.",
      "Cultivating adaptability and lifelong curiosity."
    ],
    keyActivities: [
      "Daily study planner maintenance and goal-setting workshops.",
      "Public speaking and assembly anchoring rotations.",
      "Self-care, personal hygiene, and time-management seminars."
    ],
    pedagogy: "Experiential life-skills curriculum woven into everyday school interactions.",
    nepAlignment: "WHO Life Skills Framework & NEP 2020 21st Century Skills."
  }
];

export const INITIAL_QUALITY_INDICATORS: QualityIndicator[] = [
  {
    id: "pm-1",
    domainNumber: 1,
    domainName: "Curriculum, Pedagogy & Assessment",
    target: "Transition to 100% competency-based, experiential lesson plans aligned with NEP 2020.",
    status: "In Progress",
    evidence: "Activity-based lesson plans implemented in secondary science and mathematics.",
    actionPlan: "Conduct monthly internal peer review of lesson plans among the 13 staff members.",
    lastUpdated: "October 2026"
  },
  {
    id: "pm-2",
    domainNumber: 2,
    domainName: "Learning Outcomes & Academic Achievement",
    target: "Systematic learning outcome tracking mapped against JKBOSE standards.",
    status: "In Progress",
    evidence: "Periodic unit assessments and diagnostic tests administered.",
    actionPlan: "Identify learning gaps early and provide structured remedial support.",
    lastUpdated: "October 2026"
  },
  {
    id: "pm-3",
    domainNumber: 3,
    domainName: "Holistic & Competency-Based Education",
    target: "Adoption of holistic progress cards reflecting 360-degree student growth.",
    status: "In Progress",
    evidence: "Co-curricular achievements recorded alongside academic assessments.",
    actionPlan: "Implement self and peer-assessment components in terminal reviews.",
    lastUpdated: "October 2026"
  },
  {
    id: "pm-4",
    domainNumber: 4,
    domainName: "School Infrastructure & Learning Environment",
    target: "Maintain two school buildings in clean, well-insulated, aesthetic condition.",
    status: "Completed",
    evidence: "Two-story main building and second block fully operational on campus.",
    actionPlan: "Conduct regular seasonal maintenance before winter freeze.",
    lastUpdated: "October 2026"
  },
  {
    id: "pm-5",
    domainNumber: 5,
    domainName: "Digital Learning & ICT Integration",
    target: "Operational smart room and ICT lab providing hands-on time to every student.",
    status: "Completed",
    evidence: "Smart classroom and ICT computer laboratory operational with timetabled slots.",
    actionPlan: "Expand digital repository with localized multilingual learning modules.",
    lastUpdated: "October 2026"
  },
  {
    id: "pm-6",
    domainNumber: 6,
    domainName: "Inclusive Education & CWSN Accessibility",
    target: "100% barrier-free access and individualized pedagogical support for CWSN.",
    status: "In Progress",
    evidence: "Dedicated CWSN toilet facility operational; ground-floor ramp access provided.",
    actionPlan: "Procure specialized tactile and audio learning aids for diverse learners.",
    lastUpdated: "October 2026"
  },
  {
    id: "pm-7",
    domainNumber: 7,
    domainName: "Health, Wellness, Sanitation & Safety",
    target: "Clean drinking water, separate sanitized toilets for boys & girls, first aid.",
    status: "Completed",
    evidence: "Separate toilet blocks functional; filtered drinking water points in use.",
    actionPlan: "Quarterly water quality testing and regular first-aid replenishment.",
    lastUpdated: "October 2026"
  },
  {
    id: "pm-8",
    domainNumber: 8,
    domainName: "Green School & Environmental Sustainability",
    target: "Zero single-use plastic campus and continuous greening through tree plantation.",
    status: "In Progress",
    evidence: "Eco-club active; campus perimeter trees planted; plastic ban enforced.",
    actionPlan: "Establish dedicated botanical herb garden and organic composting bed.",
    lastUpdated: "October 2026"
  },
  {
    id: "pm-9",
    domainNumber: 9,
    domainName: "Sports, Arts, Culture & Co-Curriculars",
    target: "Diverse sports and cultural activities embedded in the weekly timetable.",
    status: "In Progress",
    evidence: "Morning yoga, volleyball, cricket, and cultural observances conducted.",
    actionPlan: "Organize inter-school cultural exchange and annual valley sports meet.",
    lastUpdated: "October 2026"
  },
  {
    id: "pm-10",
    domainNumber: 10,
    domainName: "Teacher Professional Development",
    target: "All 13 staff members actively participating in NISHTHA and continuous professional training.",
    status: "In Progress",
    evidence: "Faculty attending mandated online & offline department training modules.",
    actionPlan: "Host in-house collaborative pedagogy workshops during staff meetings.",
    lastUpdated: "October 2026"
  },
  {
    id: "pm-11",
    domainNumber: 11,
    domainName: "School Leadership & Institutional Governance",
    target: "Visionary, transparent, and participatory leadership under the HOI.",
    status: "Completed",
    evidence: "Regular staff meetings, transparent duty allocation, and HOI supervision.",
    actionPlan: "Maintain institutional development logbook and verified digital records.",
    lastUpdated: "October 2026"
  },
  {
    id: "pm-12",
    domainNumber: 12,
    domainName: "Community Participation & Parental Engagement",
    target: "Active School Management Committee (SMC) with high parental attendance.",
    status: "In Progress",
    evidence: "Regular Parent-Teacher Meetings (PTM) and community consultative sessions.",
    actionPlan: "Strengthen community awareness regarding girl-child education and attendance.",
    lastUpdated: "October 2026"
  },
  {
    id: "pm-13",
    domainNumber: 13,
    domainName: "Equity, Gender Sensitivity & Child Protection",
    target: "Safe, inclusive environment ensuring complete parity and safety for girl students.",
    status: "Completed",
    evidence: "Gender-sensitive staff, clean private girls' toilet, child safety orientation.",
    actionPlan: "Conduct biannual self-defense and personal safety awareness workshops.",
    lastUpdated: "October 2026"
  },
  {
    id: "pm-14",
    domainNumber: 14,
    domainName: "Library, Reading Culture & Resources",
    target: "Dedicated school library with active book lending and daily reading culture.",
    status: "In Progress",
    evidence: "Library room operational; reading periods incorporated in schedule.",
    actionPlan: "Add more bilingual science magazines and illustrated folk literature.",
    lastUpdated: "October 2026"
  },
  {
    id: "pm-15",
    domainNumber: 15,
    domainName: "Vocational Exposure & Career Awareness",
    target: "Foundational exposure to local crafts, horticulture, and technical skills.",
    status: "In Progress",
    evidence: "Introductory sessions on agriculture and career guidance in Class 10.",
    actionPlan: "Plan structured 10-bagless-days vocational immersion calendar.",
    lastUpdated: "October 2026"
  },
  {
    id: "pm-16",
    domainNumber: 16,
    domainName: "School Monitoring, Evaluation & Improvement",
    target: "Evidence-based continuous institutional self-assessment and feedback loop.",
    status: "In Progress",
    evidence: "Institutional progress indicators documented and reviewed under PM SHRI norms.",
    actionPlan: "Annual comprehensive school development plan update with stakeholder inputs.",
    lastUpdated: "October 2026"
  }
];

export const INITIAL_STAFF_MEMBERS: StaffMember[] = [
  {
    id: "staff-1",
    slotNumber: 1,
    role: "Head of Institution (HOI)",
    designation: "Headmaster / Institutional Head",
    department: "Administration & Academic Leadership",
    name: "Mr. Shareef Ahmad Khan",
    qualifications: "M.A., B.Ed.",
    responsibilities: "Overall institutional administration, academic supervision, PM SHRI implementation, staff coordination, and community relations.",
    isHOI: true,
    status: "Verified Role"
  },
  {
    id: "staff-2",
    slotNumber: 2,
    role: "Senior Master / Faculty",
    designation: "Teacher / Master",
    department: "Science & Mathematics",
    name: "[Staff Member 02 - Configurable]",
    qualifications: "B.Sc, B.Ed [Official Records]",
    responsibilities: "Secondary science practicals, mathematics instruction, science kit management.",
    status: "Profile Configurable"
  },
  {
    id: "staff-3",
    slotNumber: 3,
    role: "Faculty Member",
    designation: "Teacher / Master",
    department: "Social Sciences & Humanities",
    name: "[Staff Member 03 - Configurable]",
    qualifications: "M.A. (History/Pol. Science), B.Ed [Official Records]",
    responsibilities: "Social science curriculum, constitutional literacy, assembly coordination.",
    status: "Profile Configurable"
  },
  {
    id: "staff-4",
    slotNumber: 4,
    role: "Language Faculty",
    designation: "Teacher",
    department: "English Language & Literature",
    name: "[Staff Member 04 - Configurable]",
    qualifications: "M.A. English, B.Ed [Official Records]",
    responsibilities: "English communication skills, grammar foundation, literary club mentorship.",
    status: "Profile Configurable"
  },
  {
    id: "staff-5",
    slotNumber: 5,
    role: "Language Faculty",
    designation: "Teacher",
    department: "Urdu Language & Literature",
    name: "[Staff Member 05 - Configurable]",
    qualifications: "M.A. Urdu, B.Ed [Official Records]",
    responsibilities: "Urdu reading & writing excellence, calligraphy, cultural programmes.",
    status: "Profile Configurable"
  },
  {
    id: "staff-6",
    slotNumber: 6,
    role: "Language / Cultural Faculty",
    designation: "Teacher",
    department: "Kashmiri / Regional Languages",
    name: "[Staff Member 06 - Configurable]",
    qualifications: "M.A., B.Ed [Official Records]",
    responsibilities: "Mother tongue language instruction, folk traditions, cultural preservation.",
    status: "Profile Configurable"
  },
  {
    id: "staff-7",
    slotNumber: 7,
    role: "Mathematics Faculty",
    designation: "Teacher",
    department: "Mathematics",
    name: "[Staff Member 07 - Configurable]",
    qualifications: "B.Sc, B.Ed [Official Records]",
    responsibilities: "Foundational mathematics, remedial math sessions, numerical reasoning.",
    status: "Profile Configurable"
  },
  {
    id: "staff-8",
    slotNumber: 8,
    role: "ICT & Digital Coordinator",
    designation: "Teacher / ICT In-charge",
    department: "Information & Communication Technology",
    name: "[Staff Member 08 - Configurable]",
    qualifications: "BCA / B.Sc (IT) / Certified ICT [Official Records]",
    responsibilities: "ICT laboratory management, smart classroom operations, cyber awareness.",
    status: "Profile Configurable"
  },
  {
    id: "staff-9",
    slotNumber: 9,
    role: "Physical Education Faculty",
    designation: "Physical Education Teacher (PET)",
    department: "Sports & Physical Education",
    name: "[Staff Member 09 - Configurable]",
    qualifications: "B.P.Ed / C.P.Ed [Official Records]",
    responsibilities: "Morning PT, yoga instruction, athletic meet coordination, team coaching.",
    status: "Profile Configurable"
  },
  {
    id: "staff-10",
    slotNumber: 10,
    role: "Library & Reading In-charge",
    designation: "Teacher / Library In-charge",
    department: "Library & Co-Curricular Affairs",
    name: "[Staff Member 10 - Configurable]",
    qualifications: "B.A. / B.Lib / B.Ed [Official Records]",
    responsibilities: "School library accession, book borrowing records, reading activities.",
    status: "Profile Configurable"
  },
  {
    id: "staff-11",
    slotNumber: 11,
    role: "Eco-Club & Science Practical In-charge",
    designation: "Teacher",
    department: "Environmental Sciences & Biology",
    name: "[Staff Member 11 - Configurable]",
    qualifications: "B.Sc, B.Ed [Official Records]",
    responsibilities: "Eco-club guidance, campus plantation, cleanliness and waste segregation drives.",
    status: "Profile Configurable"
  },
  {
    id: "staff-12",
    slotNumber: 12,
    role: "General Faculty & Student Welfare",
    designation: "Teacher",
    department: "General Academics & CWSN Support",
    name: "[Staff Member 12 - Configurable]",
    qualifications: "B.A. / B.Ed [Official Records]",
    responsibilities: "Inclusive student accommodations, peer mentoring, foundational literacy.",
    status: "Profile Configurable"
  },
  {
    id: "staff-13",
    slotNumber: 13,
    role: "Administrative & Support Staff",
    designation: "Junior Assistant / Support Official",
    department: "Office & Institutional Records",
    name: "[Staff Member 13 - Configurable]",
    qualifications: "Higher Secondary / Diploma [Official Records]",
    responsibilities: "School admissions register, official correspondence, store maintenance.",
    status: "Profile Configurable"
  }
];

export const INITIAL_NOTICES: NoticeItem[] = [
  {
    id: "not-1",
    title: "Commencement of High School Admissions & Verification for the Academic Session",
    category: "Admissions",
    date: "October 20, 2026",
    content: "Admissions and document verification for Classes 6th through 10th are actively open at PM SHRI Govt High School Chowgam. Parents/guardians are invited to visit the school office during working hours (10:00 AM to 4:00 PM). Required documents: Previous grade marks card, Date of Birth certificate, Aadhaar card copy, and transfer certificate where applicable. Admission is free under government education norms.",
    attachmentName: "Admission_Guidelines_Chowgam.pdf",
    isImportant: true
  },
  {
    id: "not-2",
    title: "PM SHRI Environmental Stewardship & Autumn Plantation Week in Chowgam Mini-Valley",
    category: "PM SHRI",
    date: "October 16, 2026",
    content: "Under the Green School initiative of PM SHRI, our school Eco-Club in collaboration with the local community is conducting an Autumn Campus Greening Week. Students and teachers will plant indigenous mountain saplings and maintain campus flower beds to enhance biodiversity at the foot of our surrounding mountains.",
    attachmentName: "Green_Campus_Roster.pdf",
    isImportant: false
  },
  {
    id: "not-3",
    title: "Parent-Teacher Meeting (PTM) & Mid-Term Academic Progress Review",
    category: "Academic",
    date: "October 10, 2026",
    content: "All respected parents and guardians are cordially invited to attend the General Parent-Teacher Consultation Meeting on Saturday. Class teachers will discuss individual student learning outcomes, smart classroom engagement, and attendance continuity. Your valuable suggestions help us serve your children better.",
    attachmentName: "PTM_Schedule_Oct.pdf",
    isImportant: true
  },
  {
    id: "not-4",
    title: "Schedule for Secondary Classes Remedial & Science Enrichment Practicals",
    category: "Examination",
    date: "October 05, 2026",
    content: "Class 9 and 10 students will undergo specialized laboratory practicals and diagnostic problem-solving in the smart room and science corner every afternoon. All enrolled students are advised to maintain practical logbooks regularly.",
    attachmentName: "Science_Practical_TimeTable.pdf",
    isImportant: false
  },
  {
    id: "not-5",
    title: "Cyber Safety & Responsible Internet Use Orientation in the ICT Lab",
    category: "General",
    date: "September 28, 2026",
    content: "A dedicated session on safe digital citizenship, strong passwords, avoidance of digital distractions, and educational utilization of DIKSHA portal will be conducted for high school classes in the ICT Computer Lab.",
    attachmentName: "Cyber_Safety_Pledge.pdf",
    isImportant: false
  }
];

export const ACADEMIC_CLASSES_DATA: AcademicClass[] = [
  {
    grade: "Class 6",
    section: "Secondary Section",
    medium: "English & Bilingual (Urdu/Hindi/Kashmiri support)",
    subjects: ["English", "Mathematics", "General Science", "Social Science", "Urdu", "Kashmiri", "Computer Awareness", "Art & Physical Education"],
    syllabusOverview: "Foundational transition to secondary concepts, experiential science demonstrations, and numerical problem solving."
  },
  {
    grade: "Class 7",
    section: "Secondary Section",
    medium: "English & Bilingual",
    subjects: ["English", "Mathematics", "Science", "Social Science (History, Civics, Geography)", "Urdu", "Kashmiri", "ICT Skills", "Physical Health & Yoga"],
    syllabusOverview: "Deepening analytical inquiry, environmental science concepts of mountain ecosystems, and linguistic expression."
  },
  {
    grade: "Class 8",
    section: "Secondary Section",
    medium: "English & Bilingual",
    subjects: ["English", "Mathematics", "General Science", "Social Science", "Urdu", "Kashmiri", "Digital Literacy", "Work & Vocational Exposure"],
    syllabusOverview: "Preparatory board-level foundation, critical reading, algebra & geometry basics, and hands-on laboratory kits."
  },
  {
    grade: "Class 9",
    section: "High School (JKBOSE Curriculum)",
    medium: "English & Bilingual",
    subjects: ["General English", "Mathematics", "Science (Physics, Chemistry, Biology)", "Social Studies", "Urdu / Hindi", "Computer Education", "Health & Physical Education"],
    syllabusOverview: "Comprehensive secondary curriculum adhering to JKBOSE & NCERT standards, with focus on scientific reasoning and conceptual mastery."
  },
  {
    grade: "Class 10",
    section: "High School Matriculation (JKBOSE)",
    medium: "English & Bilingual",
    subjects: ["General English", "Mathematics", "Science with Practicals", "Social Science", "Urdu / Hindi", "Computer Applications", "Disaster Management & Road Safety"],
    syllabusOverview: "Matriculation board curriculum preparation, rigorous practical demonstrations in science, mock assessments, and personalized career guidance."
  }
];
