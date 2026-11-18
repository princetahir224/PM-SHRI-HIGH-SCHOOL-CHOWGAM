import libraryBannerImg from '../assets/images/library_welcome_banner_1795014030507.jpg';
import astronomyCoverImg from '../assets/images/book_agaaz_astronomy_1795014032919.jpg';
import heritageCoverImg from '../assets/images/book_kashmir_heritage_1795014031957.jpg';
import scienceMathCoverImg from '../assets/images/book_science_math_1795014031639.jpg';

export const DIGITAL_LIBRARY_MEDIA = {
  welcomeBanner: libraryBannerImg,
  astronomyCover: astronomyCoverImg,
  heritageCover: heritageCoverImg,
  scienceMathCover: scienceMathImgOrFallback(),
};

function scienceMathImgOrFallback() {
  return scienceMathCoverImg;
}

export type BookShelfCategory =
  | 'Science & Agaaz Astronomy'
  | 'Mathematics & Logic'
  | 'English Literature & Grammar'
  | 'Urdu & Kashmiri Heritage'
  | 'Social Studies & History of J&K'
  | 'Computer & ICT Skills'
  | 'General Knowledge & Values';

export type ClassFilterLevel =
  | 'All Classes'
  | 'Class 6'
  | 'Class 7'
  | 'Class 8'
  | 'Class 9'
  | 'Class 10'
  | 'General Reading';

export interface ChapterQuickCheck {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface BookChapter {
  id: string;
  chapterNumber: number;
  title: string;
  subtitle: string;
  paragraphs: string[];
  keyTakeaway: string;
  formulaOrHighlight?: {
    label: string;
    content: string;
  };
  quickCheck: ChapterQuickCheck;
}

export interface LibraryBook {
  id: string;
  catalogCode: string;
  title: string;
  subtitle: string;
  author: string;
  category: BookShelfCategory;
  classTag: Exclude<ClassFilterLevel, 'All Classes'> | 'Classes 6–10';
  applicableClasses: Exclude<ClassFilterLevel, 'All Classes'>[];
  language: 'English' | 'Urdu / Kashmiri' | 'Bilingual (Eng / Urdu)';
  readingMinutes: number;
  edition: string;
  coverTheme: {
    bgClass: string;
    spineClass: string;
    accentTextClass: string;
    borderClass: string;
    coverImage?: string;
  };
  synopsis: string;
  keyTopics: string[];
  chapters: BookChapter[];
}

export interface BookProgress {
  bookId: string;
  currentChapterIndex: number;
  completedChapterIds: string[];
  lastReadAt: string;
}

export interface ReaderNote {
  id: string;
  bookId: string;
  bookTitle: string;
  chapterIndex: number;
  chapterTitle: string;
  noteText: string;
  createdAt: string;
}

export interface CuratedReadingPath {
  id: string;
  title: string;
  subtitle: string;
  targetAudience: string;
  description: string;
  bookIds: string[];
}

export const BOOK_SHELF_CATEGORIES: BookShelfCategory[] = [
  'Science & Agaaz Astronomy',
  'Mathematics & Logic',
  'English Literature & Grammar',
  'Urdu & Kashmiri Heritage',
  'Social Studies & History of J&K',
  'Computer & ICT Skills',
  'General Knowledge & Values',
];

export const CURATED_READING_PATHS: CuratedReadingPath[] = [
  {
    id: 'path-jkbose',
    title: 'JKBOSE Board & High School Mastery',
    subtitle: 'Essential Science, Math & English References',
    targetAudience: 'Classes 8, 9 & 10',
    description:
      'Focused conceptual textbooks and revision chapters aligned with JKBOSE and NCERT learning outcomes for confident annual examinations.',
    bookIds: ['book-physics-light', 'book-algebra-quad', 'book-geometry-trig', 'book-eng-grammar', 'book-jk-history'],
  },
  {
    id: 'path-agaaz',
    title: 'Agaaz Night Sky & STEM Explorer',
    subtitle: 'Practical Astronomy, Ecology & Computing',
    targetAudience: 'Classes 6 to 10 · Agaaz Lab Readers',
    description:
      'Connect classroom concepts directly with the reflector telescope, orbital apparatus, prisms, and computing terminals at PM SHRI GHS Chowgam.',
    bookIds: ['book-agaaz-sky', 'book-chemistry-life', 'book-himalayan-eco', 'book-ict-essentials'],
  },
  {
    id: 'path-heritage',
    title: 'Valley Heritage, Languages & Values',
    subtitle: 'Kashmiri, Urdu, Literature & Character Building',
    targetAudience: 'All Enrolled Learners',
    description:
      'Celebrate the literary wisdom of Lal Ded and Sheikh-ul-Alam (RA), strengthen Urdu and English expression, and explore future study pathways.',
    bookIds: ['book-kashmir-heritage', 'book-urdu-qawaid', 'book-inspiring-stories', 'book-values-career'],
  },
];

export const DIGITAL_LIBRARY_BOOKS: LibraryBook[] = [
  {
    id: 'book-agaaz-sky',
    catalogCode: 'CHW-AGA-01',
    title: 'The Agaaz Night Sky & Telescopic Atlas',
    subtitle: 'Observing Planets, Orbits & Indian Space Missions from Chowgam',
    author: 'Mr. Muzaffer Rasool Malik (Agaaz Lab In-charge)',
    category: 'Science & Agaaz Astronomy',
    classTag: 'Classes 6–10',
    applicableClasses: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'],
    language: 'English',
    readingMinutes: 25,
    edition: 'Agaaz Lab Companion · 2026',
    coverTheme: {
      bgClass: 'bg-slate-900',
      spineClass: 'bg-indigo-950',
      accentTextClass: 'text-amber-300',
      borderClass: 'border-slate-700',
      coverImage: astronomyCoverImg,
    },
    synopsis:
      'A practical guide written for students exploring the Agaaz Space & Science Lab. Covers solar system mechanics, how our reflector telescope gathers starlight, lunar phases, and landmark ISRO missions.',
    keyTopics: ['Reflector Telescope', 'Solar System Orbits', 'Lunar Phases', 'ISRO Chandrayaan'],
    chapters: [
      {
        id: 'aga-c1',
        chapterNumber: 1,
        title: 'Our Solar System & Planetary Orbits',
        subtitle: 'Gravity, elliptical paths, and the inner vs. outer planets',
        paragraphs: [
          'High above the pine-lined horizon of Chowgam, clear autumn evenings offer an extraordinary view of our cosmic neighborhood. At the center of our solar system sits the Sun, a medium-sized G-type star whose gravitational pull holds eight planets, dwarf planets, moons, and millions of asteroids in steady orbits.',
          'The four inner rocky planets—Mercury, Venus, Earth, and Mars—have solid silicate crusts and relatively compact orbits. Beyond the Asteroid Belt lie the outer giants: Jupiter and Saturn, composed largely of hydrogen and helium, followed by the ice giants Uranus and Neptune.',
          'In the Agaaz Lab, the illuminated Sun-Earth-Moon apparatus demonstrates two fundamental motions simultaneously: Earth’s daily rotation on its tilted 23.5-degree axis (producing day and night) and its yearly revolution around the Sun (producing Kashmir’s distinct four seasons—Sonth, Retkol, Harud, and Wandah).',
        ],
        keyTakeaway:
          'Earth’s 23.5° axial tilt—not its distance from the Sun—is the primary cause of seasonal temperature shifts across the year.',
        formulaOrHighlight: {
          label: 'Kepler’s Third Law Insight',
          content: 'Orbital Period² ∝ (Semi-Major Axis)³ — Distant planets take vastly longer to complete one orbit.',
        },
        quickCheck: {
          question: 'Why does the Chowgam valley experience winter (Wandah) and summer (Retkol) every year?',
          options: [
            'Because the Moon blocks sunlight during winter months',
            'Because Earth revolves around the Sun with a 23.5° tilted axis',
            'Because the Sun changes its nuclear brightness each quarter',
          ],
          correctIndex: 1,
          explanation:
            'As Earth orbits the Sun, its 23.5° axial tilt changes the angle at which sunlight strikes the Northern Hemisphere, creating seasons.',
        },
      },
      {
        id: 'aga-c2',
        chapterNumber: 2,
        title: 'Inside Our Astronomical Reflector Telescope',
        subtitle: 'Concave primary mirrors, focal length, and safe sky viewing',
        paragraphs: [
          'Unlike a simple magnifying glass that bends light through curved glass lenses (a refractor), the reflector telescope housed in our Agaaz Lab uses a precision-ground concave parabolic mirror at the base of the optical tube.',
          'When starlight or reflected moonlight enters the open front of the tube, it travels down to the primary mirror and bounces back toward a small flat secondary mirror angled at 45 degrees. This secondary mirror directs the focused cone of light into the side-mounted eyepiece.',
          'Two numbers define every observation session: aperture (the diameter of the main mirror, determining light-gathering power) and magnification (calculated by dividing the telescope’s focal length by the eyepiece focal length). Always remember Rule One of observational astronomy: never point any optical instrument directly at the Sun without a certified solar filter.',
        ],
        keyTakeaway:
          'A reflector telescope uses curved mirrors rather than thick glass lenses to gather faint light from lunar craters, Jupiter’s moons, and star clusters.',
        formulaOrHighlight: {
          label: 'Telescope Magnification Formula',
          content: 'Magnification (M) = Focal Length of Objective Mirror (F) ÷ Focal Length of Eyepiece (f)',
        },
        quickCheck: {
          question: 'If a telescope has a focal length of 900 mm and you insert a 10 mm eyepiece, what is the magnification?',
          options: ['9x', '90x', '900x'],
          correctIndex: 1,
          explanation: 'Magnification = 900 mm ÷ 10 mm = 90x magnification.',
        },
      },
      {
        id: 'aga-c3',
        chapterNumber: 3,
        title: 'Lunar Phases, Tides & Solar Eclipses',
        subtitle: 'Geometry of alignment in the Sun-Earth-Moon system',
        paragraphs: [
          'The Moon produces no visible light of its own; it shines solely by reflecting sunlight. As the Moon orbits Earth roughly once every 29.5 days (a synodic month), the fraction of its sunlit hemisphere visible from our school courtyard smoothly cycles from New Moon through Crescent, First Quarter, Gibbous, and Full Moon.',
          'When the Moon passes directly between the Sun and Earth during a New Moon phase, its shadow can fall onto Earth’s surface, creating a Solar Eclipse. Conversely, when Earth lies directly between the Sun and a Full Moon, Earth’s umbra sweeps across the lunar surface during a Lunar Eclipse.',
          'Because the Moon’s orbital plane is tilted by about 5 degrees relative to Earth’s orbit around the Sun, eclipses do not occur every month—they happen only when alignment coincides with orbital nodes.',
        ],
        keyTakeaway:
          'A Lunar Eclipse occurs only at Full Moon when Earth casts its shadow on the Moon; a Solar Eclipse occurs only at New Moon.',
        quickCheck: {
          question: 'During which lunar phase can a Solar Eclipse take place?',
          options: ['Full Moon', 'First Quarter', 'New Moon'],
          correctIndex: 2,
          explanation: 'The Moon must stand between the Sun and Earth, which corresponds to the New Moon phase.',
        },
      },
      {
        id: 'aga-c4',
        chapterNumber: 4,
        title: 'India’s Space Journey: ISRO & Chandrayaan',
        subtitle: 'From Prof. Satish Dhawan’s vision to the Lunar South Pole',
        paragraphs: [
          'On the wall of our Agaaz Lab hangs the portrait of Prof. Satish Dhawan, a pioneer of Indian space engineering born in Srinagar, Jammu & Kashmir. Under his stewardship, ISRO transformed aerospace research into practical national missions serving weather forecasting, rural communication, and planetary science.',
          'Students can inspect scaled rocket models in our lab representing India’s Polar Satellite Launch Vehicle (PSLV) and LVM3 heavy-lift launcher. These multi-stage rockets shed empty fuel stages mid-flight to achieve the escape velocity needed to enter Earth orbit.',
          'In August 2023, Chandrayaan-3 achieved a historic soft landing near the Moon’s south pole, deploying the Pragyan rover to analyze lunar regolith. Shortly thereafter, Aditya-L1 embarked to Lagrange Point 1 to study solar storms continuously.',
        ],
        keyTakeaway:
          'Multistage rockets minimize dead mass during ascent, enabling payloads like Chandrayaan-3 and Aditya-L1 to reach deep space efficiently.',
        quickCheck: {
          question: 'Which ISRO mission made India the first nation to achieve a soft landing near the Moon’s south pole?',
          options: ['Mangalyaan-1', 'Chandrayaan-3', 'Aditya-L1'],
          correctIndex: 1,
          explanation: 'Chandrayaan-3’s Vikram lander touched down safely near the lunar south pole in August 2023.',
        },
      },
    ],
  },
  {
    id: 'book-physics-light',
    catalogCode: 'CHW-SCI-02',
    title: 'Foundations of Physics: Light, Mirrors & Motion',
    subtitle: 'JKBOSE Secondary Physics Companion with Practical Insights',
    author: 'Science Faculty, PM SHRI GHS Chowgam',
    category: 'Science & Agaaz Astronomy',
    classTag: 'Class 10',
    applicableClasses: ['Class 9', 'Class 10'],
    language: 'English',
    readingMinutes: 28,
    edition: 'JKBOSE & NCERT Aligned · 2026',
    coverTheme: {
      bgClass: 'bg-emerald-950',
      spineClass: 'bg-emerald-900',
      accentTextClass: 'text-amber-300',
      borderClass: 'border-emerald-800',
      coverImage: scienceMathCoverImg,
    },
    synopsis:
      'Clear explanations of Newton’s Laws of Motion, spherical mirrors and refraction through prisms, electric circuits, and electromagnetism tailored for Classes 9 and 10.',
    keyTopics: ['Laws of Motion', 'Reflection & Refraction', 'Ohm’s Law', 'Electromagnetism'],
    chapters: [
      {
        id: 'phy-c1',
        chapterNumber: 1,
        title: 'Newton’s Laws of Motion & Inertia',
        subtitle: 'Force, mass, acceleration, and conservation of momentum',
        paragraphs: [
          'Sir Isaac Newton summarized the mechanics of moving bodies in three concise laws. His First Law states that an object remains at rest or continues in uniform straight-line motion unless acted upon by an unbalanced external force. This natural tendency to resist changes in motion is called inertia, and greater mass implies greater inertia.',
          'The Second Law quantifies force: the net force acting on an object equals the rate of change of its linear momentum, expressed commonly as F = m × a. When a cricket fielder pulls their hands backward while catching a fast ball on the Chowgam school ground, they increase the stopping time to reduce the impact force.',
          'The Third Law affirms that forces always arise in equal and opposite pairs acting on two distinct bodies: when you push backward on solid ground while walking, the ground pushes you forward.',
        ],
        keyTakeaway:
          'Action and reaction forces are always equal in magnitude, opposite in direction, and act on two different objects.',
        formulaOrHighlight: {
          label: 'Newton’s Second Law',
          content: 'F = m × a   (1 Newton = 1 kg·m/s²)',
        },
        quickCheck: {
          question: 'Why does a cricket player pull their hands backward when catching a fast-moving ball?',
          options: [
            'To decrease the mass of the cricket ball',
            'To increase the time taken to bring momentum to zero, reducing impact force',
            'To eliminate gravitational pull during the catch',
          ],
          correctIndex: 1,
          explanation: 'By increasing stopping time Δt, the rate of change of momentum (Δp/Δt = Force) drops significantly.',
        },
      },
      {
        id: 'phy-c2',
        chapterNumber: 2,
        title: 'Reflection, Refraction & Optical Prisms',
        subtitle: 'Concave/convex mirrors, Snell’s Law, and dispersion of white light',
        paragraphs: [
          'Light travels in straight lines through a uniform transparent medium at nearly 3 × 10⁸ m/s in vacuum. When light strikes a polished curved surface such as a concave mirror, parallel rays converge at the principal focus F—making concave mirrors ideal for torches, vehicle headlights, and solar cookers.',
          'When light passes obliquely from air into glass or water, its speed decreases and the ray bends toward the normal. This bending at an interface is refraction, governed by Snell’s Law and refractive index n = c / v.',
          'Passing white sunlight through a triangular glass prism splits it into seven constituent colors (VIBGYOR) because violet light slows down slightly more in glass than red light, bending at a steeper angle.',
        ],
        keyTakeaway:
          'Dispersion occurs in a prism because glass has a slightly different refractive index for each wavelength of visible light.',
        formulaOrHighlight: {
          label: 'Mirror & Lens Relations',
          content: 'Mirror Formula: 1/f = 1/v + 1/u   |   Refractive Index: n = c / v',
        },
        quickCheck: {
          question: 'Which color bends the LEAST when white light passes through a glass prism?',
          options: ['Violet', 'Green', 'Red'],
          correctIndex: 2,
          explanation: 'Red light has the longest visible wavelength and travels fastest in glass, so it undergoes the smallest angle of deviation.',
        },
      },
      {
        id: 'phy-c3',
        chapterNumber: 3,
        title: 'Electric Current, Resistance & Ohm’s Law',
        subtitle: 'Potential difference, series vs. parallel circuits, and Joule heating',
        paragraphs: [
          'An electric current is the ordered flow of electric charges through a conductor, measured in amperes (A) where 1 A represents 1 coulomb of charge passing a cross-section each second. A cell or battery creates the potential difference (voltage, measured in volts) that drives this flow.',
          'Georg Simon Ohm discovered that at constant temperature, the current I flowing through a metallic conductor is directly proportional to the potential difference V across its ends: V = I × R, where R is electrical resistance measured in ohms (Ω).',
          'In household and classroom wiring, lamps and sockets are wired in parallel so that every appliance receives full voltage independently and switching off one bulb does not cut current to the others.',
        ],
        keyTakeaway:
          'In a parallel circuit, total resistance decreases below the smallest individual branch resistance, and each branch maintains equal voltage.',
        formulaOrHighlight: {
          label: 'Ohm’s Law & Electrical Power',
          content: 'V = I × R   |   Power P = V × I = I²R',
        },
        quickCheck: {
          question: 'A bulb draws 0.5 A of current when connected across a 220 V supply. What is its resistance?',
          options: ['110 Ω', '440 Ω', '220.5 Ω'],
          correctIndex: 1,
          explanation: 'Using R = V / I = 220 V / 0.5 A = 440 Ω.',
        },
      },
      {
        id: 'phy-c4',
        chapterNumber: 4,
        title: 'Magnetic Fields & Electromagnetism',
        subtitle: 'Right-hand thumb rule, solenoids, and electric motors',
        paragraphs: [
          'Every current-carrying wire generates a concentric magnetic field around itself—a discovery first demonstrated by Hans Christian Oersted. Using the Right-Hand Thumb Rule, if your thumb points in the direction of conventional current, your curled fingers indicate the direction of the magnetic field lines.',
          'Winding insulated copper wire into a tight coil produces a solenoid, whose internal magnetic field is uniform and strong, closely resembling a bar magnet. Inserting a soft iron core creates an electromagnet whose strength can be switched on or off at will.',
          'Electric motors harness Fleming’s Left-Hand Rule to convert electrical energy into continuous rotational motion whenever current flows across an external magnetic field.',
        ],
        keyTakeaway:
          'Unlike permanent bar magnets, an electromagnet’s polarity and magnetic strength can be controlled by reversing or adjusting electric current.',
        quickCheck: {
          question: 'Where is the magnetic field strongest inside a current-carrying solenoid?',
          options: [
            'Uniform and strongest along the central interior axis',
            'Only at the outer plastic insulation',
            'Zero inside the coil core',
          ],
          correctIndex: 0,
          explanation: 'Field lines crowd tightly and run parallel inside the core of a solenoid, forming a strong uniform field.',
        },
      },
    ],
  },
  {
    id: 'book-himalayan-eco',
    catalogCode: 'CHW-SCI-03',
    title: 'Living World & Himalayan Ecology',
    subtitle: 'Cells, Plant Biology & Biodiversity of South Kashmir’s Valleys',
    author: 'Eco-Club & Biology Desk, GHS Chowgam',
    category: 'Science & Agaaz Astronomy',
    classTag: 'Class 8',
    applicableClasses: ['Class 6', 'Class 7', 'Class 8', 'Class 9'],
    language: 'English',
    readingMinutes: 22,
    edition: 'Green School Series · 2026',
    coverTheme: {
      bgClass: 'bg-teal-900',
      spineClass: 'bg-teal-950',
      accentTextClass: 'text-emerald-200',
      borderClass: 'border-teal-800',
    },
    synopsis:
      'Connects core middle- and secondary-school biology (cells, photosynthesis, plant transport) directly to the pine forests, walnut orchards, and streams surrounding Chowgam.',
    keyTopics: ['Cell Biology', 'Photosynthesis', 'Xylem & Phloem', 'Pir Panjal Ecology'],
    chapters: [
      {
        id: 'eco-c1',
        chapterNumber: 1,
        title: 'The Cell: Fundamental Unit of Life',
        subtitle: 'Plant vs. animal cells under the laboratory microscope',
        paragraphs: [
          'Every living organism—from a towering Deodar cedar on the slopes above Shangus to a microscopic paramecium in pond water—is composed of cells. Robert Hooke first observed cell walls in cork slices in 1665, giving birth to modern cell biology.',
          'Plant cells differ from animal cells in three key structures visible in our Science Lab microscopes: a rigid cellulose cell wall providing structural strength, a large central vacuole storing water and solutes, and green chloroplasts that capture sunlight.',
          'Inside every eukaryotic cell, the nucleus directs genetic instructions, mitochondria generate ATP cellular energy through respiration, and the selectively permeable plasma membrane regulates what enters and exits.',
        ],
        keyTakeaway:
          'Chloroplasts and rigid cellulose cell walls distinguish plant cells from animal cells.',
        quickCheck: {
          question: 'Which organelle is called the powerhouse of the cell because it produces ATP energy?',
          options: ['Golgi apparatus', 'Mitochondrion', 'Ribosome'],
          correctIndex: 1,
          explanation: 'Mitochondria perform cellular respiration to release usable chemical energy stored in ATP.',
        },
      },
      {
        id: 'eco-c2',
        chapterNumber: 2,
        title: 'Photosynthesis & Vascular Transport',
        subtitle: 'How green leaves manufacture food and transport water',
        paragraphs: [
          'Green plants are autotrophs: using chlorophyll inside leaves, they convert atmospheric carbon dioxide and soil water into glucose sugar and oxygen gas using solar energy. Microscopic pores called stomata on the leaf underside open to take in CO₂ and release oxygen.',
          'To keep upper branches hydrated, tall orchard trees rely on two distinct vascular tissues: Xylem vessels carry water and dissolved minerals upward from roots driven by transpiration pull, while Phloem sieve tubes transport manufactured sugars both upward and downward to growing buds, fruits, and roots.',
        ],
        keyTakeaway:
          'Xylem transports water one-way upward; phloem distributes sugars bi-directionally wherever growth or storage occurs.',
        formulaOrHighlight: {
          label: 'Balanced Photosynthesis Equation',
          content: '6 CO₂ + 6 H₂O  —(Sunlight / Chlorophyll)→  C₆H₁₂O₆ + 6 O₂',
        },
        quickCheck: {
          question: 'Which plant tissue is responsible for transporting sugars made in leaves down to the roots?',
          options: ['Xylem', 'Phloem', 'Epidermis'],
          correctIndex: 1,
          explanation: 'Phloem carries dissolved carbohydrates (sucrose) from photosynthetic leaves to roots, stems, and fruits.',
        },
      },
      {
        id: 'eco-c3',
        chapterNumber: 3,
        title: 'Biodiversity of Anantnag & Himalayan Foothills',
        subtitle: 'Native flora, cold-water streams, and soil stewardship',
        paragraphs: [
          'The Shangus and Chowgam valley microclimate supports rich temperate biodiversity. Along the slopes grow Himalayan blue pine (Kail), silver fir, and Deodar, while fertile valley floors nourish apple and walnut (Doon) orchards alongside saffron and paddy fields.',
          'Glacial snowmelt feeding the Lidder and Jhelum tributaries sustains cold-water aquatic ecosystems. Preserving riparian vegetation prevents topsoil erosion during spring snowmelt and keeps mountain water naturally filtered.',
        ],
        keyTakeaway:
          'Healthy mountain forest cover stabilizes soil, regulates spring water recharge, and protects agricultural valleys downstream.',
        quickCheck: {
          question: 'Why are riparian (stream-side) trees vital in mountain valleys like Shangus?',
          options: [
            'They anchor soil against erosion and filter runoff during snowmelt',
            'They increase plastic accumulation in riverbeds',
            'They stop snowfall in winter',
          ],
          correctIndex: 0,
          explanation: 'Tree roots stabilize riverbanks and slow water runoff, preventing landslides and siltation.',
        },
      },
      {
        id: 'eco-c4',
        chapterNumber: 4,
        title: 'Mission LiFE & Zero-Plastic Campus Action',
        subtitle: 'Practical steps for student Eco-Club leaders',
        paragraphs: [
          'Under PM SHRI Green School guidelines and Mission LiFE (Lifestyle for Environment), students actively replace single-use plastics with reusable steel bottles and cloth bags. Organic leaf litter collected on campus is converted into nutrient-rich compost for botanical beds.',
          'Small daily actions—switching off idle classroom lights, repairing dripping water taps, and planting native saplings every autumn—add up to measurable conservation impact across our village community.',
        ],
        keyTakeaway:
          'Composting organic waste and eliminating single-use plastics keep mountain streams free of microplastics.',
        quickCheck: {
          question: 'What happens when organic leaf litter is composted rather than burned?',
          options: [
            'It turns into nutrient-rich humus fertilizer while avoiding smoke pollution',
            'It transforms into synthetic plastic',
            'It permanently sterilizes garden soil',
          ],
          correctIndex: 0,
          explanation: 'Composting recycles plant nutrients safely back into fertile topsoil without air pollution.',
        },
      },
    ],
  },
  {
    id: 'book-chemistry-life',
    catalogCode: 'CHW-SCI-04',
    title: 'Chemistry in Everyday Life: Acids, Metals & Carbon',
    subtitle: 'Atomic Patterns, pH Balance & Organic Foundations',
    author: 'Science Lab Desk, PM SHRI GHS Chowgam',
    category: 'Science & Agaaz Astronomy',
    classTag: 'Class 9',
    applicableClasses: ['Class 8', 'Class 9', 'Class 10'],
    language: 'English',
    readingMinutes: 24,
    edition: 'Lab Companion Edition · 2026',
    coverTheme: {
      bgClass: 'bg-cyan-950',
      spineClass: 'bg-cyan-900',
      accentTextClass: 'text-cyan-200',
      borderClass: 'border-cyan-800',
    },
    synopsis:
      'Demystifies chemical equations, acids and bases, metallic reactivity, and carbon bonding with safe everyday kitchen and laboratory examples.',
    keyTopics: ['Atomic Structure', 'pH Scale', 'Metals & Corrosion', 'Carbon Compounds'],
    chapters: [
      {
        id: 'che-c1',
        chapterNumber: 1,
        title: 'Atoms, Molecules & Chemical Equations',
        subtitle: 'Protons, neutrons, electrons, and conservation of mass',
        paragraphs: [
          'All ordinary matter is assembled from atoms—tiny systems containing a dense positively charged nucleus (protons and neutrons) surrounded by clouds of negatively charged electrons arranged in energy shells.',
          'The number of protons defines an element’s atomic number (Z). When atoms share or transfer valence electrons to achieve stable outer shells, they form molecules and compounds. Every balanced chemical equation honors Antoine Lavoisier’s Law of Conservation of Mass: atoms are rearranged, never created or destroyed.',
        ],
        keyTakeaway:
          'Balancing a chemical equation ensures equal numbers of each atom appear on both reactant and product sides.',
        quickCheck: {
          question: 'Which subatomic particle determines the chemical identity (atomic number) of an element?',
          options: ['Neutron', 'Proton', 'Positron'],
          correctIndex: 1,
          explanation: 'The atomic number Z equals the number of protons in the nucleus of an atom.',
        },
      },
      {
        id: 'che-c2',
        chapterNumber: 2,
        title: 'Acids, Bases & The pH Scale',
        subtitle: 'Litmus indicators, neutralization, and soil pH in horticulture',
        paragraphs: [
          'Acids release hydrogen ions (H⁺) in water, taste sour, and turn blue litmus paper red—examples include citric acid in lemons and acetic acid in vinegar. Bases release hydroxide ions (OH⁻), feel soapy, and turn red litmus blue.',
          'The pH scale runs from 0 to 14: pure neutral water sits at pH 7, values below 7 are acidic, and values above 7 are basic (alkaline). Apple and walnut growers in Anantnag test orchard soil pH because overly acidic soil locks away essential minerals until treated with mild agricultural lime.',
        ],
        keyTakeaway:
          'Mixing an acid and a base in exact proportions yields a neutral salt plus water in a neutralization reaction.',
        formulaOrHighlight: {
          label: 'Neutralization Pattern',
          content: 'Acid + Base → Salt + Water   (e.g., HCl + NaOH → NaCl + H₂O)',
        },
        quickCheck: {
          question: 'If a water sample measures pH 4, how is it classified?',
          options: ['Strongly alkaline', 'Neutral', 'Acidic'],
          correctIndex: 2,
          explanation: 'Any aqueous solution with pH below 7 at 25°C is acidic.',
        },
      },
      {
        id: 'che-c3',
        chapterNumber: 3,
        title: 'Metals, Non-Metals & Preventing Rust',
        subtitle: 'Conductivity, reactivity series, and galvanization',
        paragraphs: [
          'Metals such as copper, aluminum, and iron are lustrous, malleable (can be hammered into sheets), ductile (drawn into wires), and excellent conductors of heat and electricity. Non-metals like sulfur, oxygen, and phosphorus lack metallic luster and generally form acidic oxides.',
          'Iron roofs and gates exposed to snow and rain undergo oxidation—rusting—requiring both oxygen and moisture. Applying oil, paint, or zinc galvanization shields iron from corrosion.',
        ],
        keyTakeaway:
          'Galvanization coats iron or steel with a thin protective layer of zinc that prevents rust even if scratched.',
        quickCheck: {
          question: 'Which two environmental conditions are both required for iron to rust?',
          options: ['Dry nitrogen and sunlight', 'Oxygen and moisture (water)', 'Carbon dioxide and darkness'],
          correctIndex: 1,
          explanation: 'Iron forms hydrated iron(III) oxide (rust) only when both oxygen and water are present.',
        },
      },
      {
        id: 'che-c4',
        chapterNumber: 4,
        title: 'Carbon & Its Versatile Compounds',
        subtitle: 'Covalent bonding, catenation, and hydrocarbons',
        paragraphs: [
          'Carbon sits at the heart of organic chemistry and all living tissue thanks to two traits: tetravalency (four valence electrons ready to share) and catenation (carbon’s unique ability to link with other carbon atoms into long chains, branched rings, and sheets).',
          'Because carbon forms strong covalent bonds rather than giving away four electrons, carbon compounds span from simple methane fuel (CH₄) and ethanol to complex proteins and DNA.',
        ],
        keyTakeaway:
          'Tetravalency and self-linking catenation allow carbon to build millions of stable molecular structures.',
        quickCheck: {
          question: 'What type of chemical bond does carbon primarily form in organic molecules?',
          options: ['Covalent bond (sharing electron pairs)', 'Pure metallic bond', 'Gravitational bond'],
          correctIndex: 0,
          explanation: 'Carbon shares its four valence electrons to complete an octet via covalent bonds.',
        },
      },
    ],
  },
  {
    id: 'book-algebra-quad',
    catalogCode: 'CHW-MAT-01',
    title: 'Mastering Algebra & Quadratic Equations',
    subtitle: 'From Linear Equations & Identities to Quadratic Roots',
    author: 'Mr. Tahir Ahmad Kumar (M.Sc. Math, Exam In-charge)',
    category: 'Mathematics & Logic',
    classTag: 'Class 10',
    applicableClasses: ['Class 8', 'Class 9', 'Class 10'],
    language: 'English',
    readingMinutes: 26,
    edition: 'Board Exam Workbook · 2026',
    coverTheme: {
      bgClass: 'bg-amber-950',
      spineClass: 'bg-amber-900',
      accentTextClass: 'text-amber-300',
      borderClass: 'border-amber-800',
    },
    synopsis:
      'Step-by-step algebraic problem solving designed by Mathematics Faculty at PM SHRI GHS Chowgam—covering algebraic identities, linear systems, quadratic discriminant, and arithmetic progressions.',
    keyTopics: ['Linear Systems', 'Algebraic Identities', 'Quadratic Formula', 'Arithmetic Progressions'],
    chapters: [
      {
        id: 'alg-c1',
        chapterNumber: 1,
        title: 'Linear Equations in Two Variables',
        subtitle: 'Graphical lines, substitution, and elimination methods',
        paragraphs: [
          'An equation of the form ax + by + c = 0 (where a and b are not both zero) represents a straight line on the Cartesian plane. Every ordered pair (x, y) lying on that line is a solution.',
          'When solving two simultaneous equations, three geometric outcomes arise: intersecting lines (one unique solution when a₁/a₂ ≠ b₁/b₂), parallel lines (no solution when a₁/a₂ = b₁/b₂ ≠ c₁/c₂), or coincident lines (infinitely many solutions). Elimination is fastest when coefficients align cleanly.',
        ],
        keyTakeaway:
          'Compare ratios a₁/a₂, b₁/b₂, and c₁/c₂ before solving to know immediately whether a unique solution exists.',
        quickCheck: {
          question: 'When do two linear equations have NO common solution?',
          options: [
            'When their lines intersect at 90 degrees',
            'When their graphs are parallel lines (a₁/a₂ = b₁/b₂ ≠ c₁/c₂)',
            'When both pass through the origin (0, 0)',
          ],
          correctIndex: 1,
          explanation: 'Parallel lines share the same slope but different intercepts, so they never intersect.',
        },
      },
      {
        id: 'alg-c2',
        chapterNumber: 2,
        title: 'Polynomials & Core Algebraic Identities',
        subtitle: 'Factorization, zeroes of a polynomial, and standard expansions',
        paragraphs: [
          'A polynomial in variable x has only non-negative integer exponents. Its degree is the highest power of x present. A linear polynomial has degree 1, quadratic degree 2, and cubic degree 3.',
          'Fluency in core algebraic identities—such as (a + b)² = a² + 2ab + b², (a − b)² = a² − 2ab + b², and difference of squares a² − b² = (a + b)(a − b)—turns intimidating arithmetic and factorization questions into 10-second mental calculations.',
        ],
        keyTakeaway:
          'For any quadratic polynomial ax² + bx + c, the sum of zeroes equals −b/a and the product of zeroes equals c/a.',
        formulaOrHighlight: {
          label: 'Difference of Squares Identity',
          content: 'a² − b² = (a + b)(a − b)   |   Example: 103 × 97 = 100² − 3² = 9,991',
        },
        quickCheck: {
          question: 'Using the difference of squares identity, what is 52² − 48²?',
          options: ['4', '400', '200'],
          correctIndex: 1,
          explanation: '52² − 48² = (52 + 48)(52 − 48) = 100 × 4 = 400.',
        },
      },
      {
        id: 'alg-c3',
        chapterNumber: 3,
        title: 'Quadratic Equations & The Discriminant',
        subtitle: 'Splitting the middle term and Sridharacharya’s Quadratic Formula',
        paragraphs: [
          'Quadratic equations ax² + bx + c = 0 (a ≠ 0) appear naturally in area puzzles, projectile heights, and speed-time problems. While splitting the middle term handles integer factors cleanly, the universal Quadratic Formula solves every quadratic equation reliably.',
          'The expression under the square root, D = b² − 4ac, is called the Discriminant. If D > 0, the equation has two distinct real roots; if D = 0, two equal real roots; and if D < 0, no real roots exist.',
        ],
        keyTakeaway:
          'Always compute D = b² − 4ac first to check the nature of roots before plugging into the formula.',
        formulaOrHighlight: {
          label: 'Sridharacharya Quadratic Formula',
          content: 'x = [ −b ± √(b² − 4ac) ] ÷ (2a)',
        },
        quickCheck: {
          question: 'For x² − 6x + 9 = 0, what is the discriminant D and nature of roots?',
          options: [
            'D = 0, two equal real roots (x = 3, 3)',
            'D = 72, two distinct real roots',
            'D = −9, no real roots',
          ],
          correctIndex: 0,
          explanation: 'D = (−6)² − 4(1)(9) = 36 − 36 = 0, giving two equal real roots at x = 3.',
        },
      },
      {
        id: 'alg-c4',
        chapterNumber: 4,
        title: 'Arithmetic Progressions (AP)',
        subtitle: 'Finding the nth term and summing evenly spaced series',
        paragraphs: [
          'An Arithmetic Progression is a list of numbers where each term is obtained by adding a fixed common difference d to the preceding term—such as rows of saplings planted 2 meters apart or saving ₹50 more each month.',
          'Instead of listing 50 terms manually, we jump straight to any position using aₙ = a + (n − 1)d, and find the total sum of n terms with Sₙ = (n/2) × [2a + (n − 1)d].',
        ],
        keyTakeaway:
          'An AP is completely determined once you know its first term (a) and common difference (d).',
        quickCheck: {
          question: 'In the AP 5, 9, 13, 17, ..., what is the 10th term?',
          options: ['37', '41', '45'],
          correctIndex: 1,
          explanation: 'Here a = 5 and d = 4. Using a₁₀ = 5 + (10 − 1)×4 = 5 + 36 = 41.',
        },
      },
    ],
  },
  {
    id: 'book-geometry-trig',
    catalogCode: 'CHW-MAT-02',
    title: 'Geometry, Mensuration & Trigonometry',
    subtitle: 'Visual Theorems, Circles, Volumes & Trigonometric Ratios',
    author: 'Mathematics Desk, PM SHRI GHS Chowgam',
    category: 'Mathematics & Logic',
    classTag: 'Class 9',
    applicableClasses: ['Class 7', 'Class 8', 'Class 9', 'Class 10'],
    language: 'English',
    readingMinutes: 25,
    edition: 'Visual Math Series · 2026',
    coverTheme: {
      bgClass: 'bg-stone-900',
      spineClass: 'bg-stone-800',
      accentTextClass: 'text-amber-300',
      borderClass: 'border-stone-700',
      coverImage: scienceMathCoverImg,
    },
    synopsis:
      'Turns abstract theorems into memorable visual tools—triangle similarity, circle tangents, 3D surface areas, and heights & distances using trigonometry.',
    keyTopics: ['Pythagoras Theorem', 'Circle Tangents', '3D Volumes', 'Trigonometry'],
    chapters: [
      {
        id: 'geo-c1',
        chapterNumber: 1,
        title: 'Triangles, Similarity & Pythagoras Theorem',
        subtitle: 'Congruence vs. similarity and right-angled triangles',
        paragraphs: [
          'Two figures are congruent if they have identical shape and size, whereas they are similar if they share identical shape (equal corresponding angles) with proportional sides. Thales’ Basic Proportionality Theorem establishes that a line parallel to one side of a triangle divides the other two sides in the same ratio.',
          'In any right-angled triangle, the square of the hypotenuse equals the sum of squares of the remaining two perpendicular legs: c² = a² + b². Classic Pythagorean triples such as (3, 4, 5) and (5, 12, 13) let builders verify exact 90-degree corners in the field.',
        ],
        keyTakeaway:
          'Similarity preserves angle measures and scales all side lengths by a uniform scale factor k.',
        quickCheck: {
          question: 'A right triangle has legs of 6 cm and 8 cm. What is the length of its hypotenuse?',
          options: ['10 cm', '14 cm', '12 cm'],
          correctIndex: 0,
          explanation: '√(6² + 8²) = √(36 + 64) = √100 = 10 cm.',
        },
      },
      {
        id: 'geo-c2',
        chapterNumber: 2,
        title: 'Circles, Chords & Tangents',
        subtitle: 'Perpendicular radii and equal tangents from an external point',
        paragraphs: [
          'A secant cuts a circle at two distinct points, whereas a tangent touches the circle at exactly one point of contact. Crucially, the tangent at any point of a circle is always perpendicular (90°) to the radius drawn through that point of contact.',
          'Furthermore, from any external point outside a circle, exactly two tangents can be drawn—and both tangent segments are strictly equal in length.',
        ],
        keyTakeaway:
          'Radius ⊥ Tangent at the point of contact forms a right triangle useful for solving distance questions.',
        quickCheck: {
          question: 'How many tangents can be drawn to a circle from a single point lying strictly outside it?',
          options: ['One', 'Two (of equal length)', 'Infinitely many'],
          correctIndex: 1,
          explanation: 'Exactly two tangents of equal segment length can be drawn from an exterior point.',
        },
      },
      {
        id: 'geo-c3',
        chapterNumber: 3,
        title: 'Surface Areas & Volumes of Solids',
        subtitle: 'Cylinders, cones, spheres, and composite solids',
        paragraphs: [
          'Mensuration measures real-world containers—from cylindrical water tanks on campus to conical pine roofs designed to shed winter snow. Surface area tells how much paint covers the outside; volume tells how much water or grain fits inside.',
          'Notice how closely cones and cylinders relate: a cone with the exact same base radius r and height h holds precisely one-third the volume of the matching cylinder (V = ⅓ πr²h).',
        ],
        keyTakeaway:
          'When melting and recasting a solid metal object into a new shape, total volume stays conserved.',
        formulaOrHighlight: {
          label: 'Key 3D Volume Formulas',
          content: 'Cylinder: πr²h  |  Cone: ⅓πr²h  |  Sphere: (4/3)πr³',
        },
        quickCheck: {
          question: 'If a cone and cylinder share the same radius and height, what is the ratio of Cone Volume to Cylinder Volume?',
          options: ['1 : 2', '1 : 3', '3 : 1'],
          correctIndex: 1,
          explanation: 'A cone holds exactly 1/3 the volume of a cylinder with identical radius and height.',
        },
      },
      {
        id: 'geo-c4',
        chapterNumber: 4,
        title: 'Introduction to Trigonometric Ratios',
        subtitle: 'Measuring mountain heights using angles of elevation',
        paragraphs: [
          'Suppose you stand in the Chowgam courtyard and want to estimate the height of a nearby pine ridge without climbing it. Trigonometry links the acute angle θ of a right triangle directly to ratios of its sides: sin θ = Opposite/Hypotenuse, cos θ = Adjacent/Hypotenuse, and tan θ = Opposite/Adjacent.',
          'Remember the fundamental Pythagorean identity sin²θ + cos²θ = 1, and memorize standard values at 0°, 30°, 45°, 60°, and 90° for rapid problem solving.',
        ],
        keyTakeaway:
          'At 45°, Opposite equals Adjacent, so tan 45° = 1—meaning an object’s height equals its horizontal shadow length.',
        quickCheck: {
          question: 'If the angle of elevation of the Sun is 45°, how tall is a flagpole casting a 12-meter shadow?',
          options: ['6 meters', '12 meters', '24 meters'],
          correctIndex: 1,
          explanation: 'tan 45° = Height / Shadow = 1, so Height = 12 m.',
        },
      },
    ],
  },
  {
    id: 'book-number-magic',
    catalogCode: 'CHW-MAT-03',
    title: 'Number Magic & Mental Arithmetic',
    subtitle: 'Building Rock-Solid Foundations in Fractions, Ratios & Percentages',
    author: 'Middle Wing Mathematics Faculty',
    category: 'Mathematics & Logic',
    classTag: 'Class 6',
    applicableClasses: ['Class 6', 'Class 7'],
    language: 'English',
    readingMinutes: 18,
    edition: 'Foundational Numeracy · 2026',
    coverTheme: {
      bgClass: 'bg-emerald-900',
      spineClass: 'bg-emerald-950',
      accentTextClass: 'text-amber-300',
      borderClass: 'border-emerald-700',
    },
    synopsis:
      'Designed specifically for Classes 6 and 7 to turn fractions, integers, percentages, and data graphs into effortless, joyful everyday arithmetic.',
    keyTopics: ['Integers & Primes', 'Fractions & Ratios', 'Percentages', 'Bar & Pie Graphs'],
    chapters: [
      {
        id: 'num-c1',
        chapterNumber: 1,
        title: 'Integers, Factors & Prime Numbers',
        subtitle: 'Temperatures below zero, HCF, LCM, and divisibility shortcuts',
        paragraphs: [
          'In winter across Kashmir, night temperatures drop below 0°C—for example −4°C in January. Negative numbers extend our whole-number line to represent drops below zero, elevation below sea level, or bank debits.',
          'Every composite number can be broken down uniquely into prime building blocks (prime factorization). Using HCF (Highest Common Factor) helps divide quantities evenly, while LCM (Least Common Multiple) helps synchronize repeating events like school bells.',
        ],
        keyTakeaway:
          'Zero is neither positive nor negative, and 2 is the only even prime number.',
        quickCheck: {
          question: 'On a chilly morning, Chowgam is −3°C and afternoon warms up by 9°C. What is the afternoon temperature?',
          options: ['+6°C', '−12°C', '+12°C'],
          correctIndex: 0,
          explanation: '−3 + 9 = +6°C.',
        },
      },
      {
        id: 'num-c2',
        chapterNumber: 2,
        title: 'Fractions, Decimals & Ratios',
        subtitle: 'Comparing parts of a whole and proportional thinking',
        paragraphs: [
          'A fraction a/b shows equal parts out of a whole b. To add or subtract unlike fractions such as 1/3 + 1/4, convert them to equivalent fractions sharing a common denominator (12): 4/12 + 3/12 = 7/12.',
          'Ratios compare two quantities of the same unit—for instance, mixing 2 cups of water for 1 cup of rice gives a 2:1 ratio regardless of pot size.',
        ],
        keyTakeaway:
          'Multiply or divide both numerator and denominator by the same non-zero number to obtain an equivalent fraction.',
        quickCheck: {
          question: 'What is 1/2 + 1/4 simplified?',
          options: ['2/6', '3/4', '1/8'],
          correctIndex: 1,
          explanation: '1/2 = 2/4, and 2/4 + 1/4 = 3/4.',
        },
      },
      {
        id: 'num-c3',
        chapterNumber: 3,
        title: 'Understanding Percentages & Simple Interest',
        subtitle: 'Out of 100 calculations for exams and savings',
        paragraphs: [
          'Percent literally means "per hundred." Converting a score like 45 out of 50 to percentage simply scales it to 100: (45/50) × 100 = 90%.',
          'Smart mental shortcuts speed up daily math: 10% is dividing by 10, 5% is half of 10%, and 25% is dividing by 4. Simple Interest uses SI = (P × R × T) ÷ 100.',
        ],
        keyTakeaway:
          'To find X% of Y quickly, remember X% of Y is identical to Y% of X!',
        quickCheck: {
          question: 'What is 25% of 200?',
          options: ['25', '50', '75'],
          correctIndex: 1,
          explanation: '25% equals one-quarter (1/4), and 200 ÷ 4 = 50.',
        },
      },
      {
        id: 'num-c4',
        chapterNumber: 4,
        title: 'Data Handling: Mean, Median & Charts',
        subtitle: 'Making sense of survey numbers and attendance trends',
        paragraphs: [
          'Raw numbers become meaningful when organized in frequency tables and bar graphs. Three measures summarize a dataset: the Mean (sum of values divided by count), the Median (middle value when sorted), and the Mode (most frequent value).',
        ],
        keyTakeaway:
          'Always sort numbers from smallest to largest before identifying the Median.',
        quickCheck: {
          question: 'What is the median of the scores 12, 18, 15, 20, 10?',
          options: ['15', '18', '20'],
          correctIndex: 0,
          explanation: 'Sorted: 10, 12, 15, 18, 20. The exact middle number is 15.',
        },
      },
    ],
  },
  {
    id: 'book-eng-grammar',
    catalogCode: 'CHW-ENG-01',
    title: 'English Grammar & Effective Writing',
    subtitle: 'Sentence Architecture, Tenses, Voice, Narration & Letters',
    author: 'Mr. Nazir Ahmad Khan (Master, English Dept.)',
    category: 'English Literature & Grammar',
    classTag: 'Classes 6–10',
    applicableClasses: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'],
    language: 'English',
    readingMinutes: 23,
    edition: 'School Language Companion · 2026',
    coverTheme: {
      bgClass: 'bg-sky-950',
      spineClass: 'bg-sky-900',
      accentTextClass: 'text-sky-200',
      borderClass: 'border-sky-800',
    },
    synopsis:
      'A practical manual building confident written and spoken English—from mastering tenses and active-passive transformation to writing formal notices and applications.',
    keyTopics: ['Tenses Mastery', 'Active & Passive Voice', 'Narration Rules', 'Formal Letters & Notices'],
    chapters: [
      {
        id: 'eng-c1',
        chapterNumber: 1,
        title: 'Parts of Speech & Clear Sentence Craft',
        subtitle: 'Subject-verb agreement and active vocabulary',
        paragraphs: [
          'Every clear English sentence rests on a Subject (who acts or is described) and a Predicate (what is said about the subject). Mastering eight parts of speech—Nouns, Pronouns, Verbs, Adjectives, Adverbs, Prepositions, Conjunctions, and Interjections—gives full control over sentence precision.',
          'Always match singular subjects with singular verbs ("Each of the students has a notebook", not "have") and avoid tangled run-on sentences by using clear punctuation.',
        ],
        keyTakeaway:
          'Collective terms like "each," "every," and "neither" take singular verbs in formal grammar.',
        quickCheck: {
          question: 'Choose the grammatically correct sentence:',
          options: [
            'Neither of the two books are missing.',
            'Neither of the two books is missing.',
            'Neither of the two books were missing yesterday.',
          ],
          correctIndex: 1,
          explanation: '"Neither" is singular, so it takes the singular verb "is".',
        },
      },
      {
        id: 'eng-c2',
        chapterNumber: 2,
        title: 'Tenses & Active–Passive Transformation',
        subtitle: 'Expressing time accurately and shifting sentence focus',
        paragraphs: [
          'English uses three time frames (Past, Present, Future) across four aspects (Simple, Continuous, Perfect, Perfect Continuous). Use Present Simple for universal facts and habits ("Water boils at 100°C"), and Present Perfect for past actions linked to the present ("She has completed her project").',
          'In Active Voice, the subject performs the action ("Saima solved the sum"). In Passive Voice, the object steps forward as focus ("The sum was solved by Saima"), using a form of "be" plus the past participle (V3).',
        ],
        keyTakeaway:
          'Every passive sentence retains the original tense and always contains a past participle (V3) verb.',
        quickCheck: {
          question: 'Convert to Passive Voice: "The librarian organized the new shelves."',
          options: [
            'The new shelves are organized by the librarian.',
            'The new shelves were organized by the librarian.',
            'The new shelves had been organizing by the librarian.',
          ],
          correctIndex: 1,
          explanation: 'Simple Past active ("organized") shifts to Simple Past passive ("were organized").',
        },
      },
      {
        id: 'eng-c3',
        chapterNumber: 3,
        title: 'Direct & Indirect (Reported) Speech',
        subtitle: 'Reporting questions, statements, and commands smoothly',
        paragraphs: [
          'Direct speech quotes exact words inside quotation marks: The teacher said, "Read one chapter every evening." Indirect speech conveys the meaning without quotation marks, adjusting pronouns, time markers ("today" → "that day"), and shifting present verbs backward when the reporting verb is in past tense.',
        ],
        keyTakeaway:
          'Universal truths inside quotation marks keep their present tense even when the reporting verb is past ("He said that Earth orbits the Sun").',
        quickCheck: {
          question: 'Convert to Indirect Speech: Ali said, "I am reading a science book."',
          options: [
            'Ali said that he was reading a science book.',
            'Ali said that I am reading a science book.',
            'Ali told that he is reading a science book.',
          ],
          correctIndex: 0,
          explanation: '"I" becomes "he" and present continuous "am reading" shifts back to past continuous "was reading".',
        },
      },
      {
        id: 'eng-c4',
        chapterNumber: 4,
        title: 'Formal Letters, Applications & School Notices',
        subtitle: 'Formats expected in JKBOSE examinations and real office correspondence',
        paragraphs: [
          'A formal school notice fits neatly inside a clean box with the institution header at top, the word NOTICE, date on the left, a sharp heading, and essential details (What, When, Where, Who to contact) in under 50 crisp words.',
          'Formal applications to the Headmaster open respectfully with Receiver’s designation, clear Subject line, "Respected Sir," concise body stating your request politely, and close with "Yours obediently," your name, class, and roll number.',
        ],
        keyTakeaway:
          'Keep formal notices concise and factual; always include date, venue, time, and issuing authority.',
        quickCheck: {
          question: 'Which detail is essential in every formal school notice?',
          options: [
            'Personal hobbies of the writer',
            'Date, event venue/time, clear purpose, and signatory name/designation',
            'Rhyming poetry stanzas',
          ],
          correctIndex: 1,
          explanation: 'Readers rely on notices for exact event dates, venues, timings, and official contact.',
        },
      },
    ],
  },
  {
    id: 'book-inspiring-stories',
    catalogCode: 'CHW-ENG-02',
    title: 'Anthology of Inspiring Stories & Poems',
    subtitle: 'Mountain Tales, Scientists’ Childhoods & Classic Verse',
    author: 'Literary & Debate Club, GHS Chowgam',
    category: 'English Literature & Grammar',
    classTag: 'Class 7',
    applicableClasses: ['Class 6', 'Class 7', 'Class 8', 'Class 9'],
    language: 'English',
    readingMinutes: 20,
    edition: 'Reader’s Circle Edition · 2026',
    coverTheme: {
      bgClass: 'bg-indigo-950',
      spineClass: 'bg-indigo-900',
      accentTextClass: 'text-amber-200',
      borderClass: 'border-indigo-800',
    },
    synopsis:
      'A curated storybook featuring moral fables, a biographical vignette of Dr. A.P.J. Abdul Kalam, nature poetry, and original stories set in Himalayan valleys.',
    keyTopics: ['Short Stories', 'Nature Poetry', 'Character Sketches', 'Reading Comprehension'],
    chapters: [
      {
        id: 'lit-c1',
        chapterNumber: 1,
        title: 'The Lantern in the Pine Valley',
        subtitle: 'An original short story of curiosity and perseverance',
        paragraphs: [
          'When autumn mist settled early over the meadows near Shangus, young Tariq walked down the gravel path carrying a brass lantern and a dog-eared notebook. The villagers wondered why he spent his evenings sketching shadows across the courtyard stones.',
          'Weeks later, when the school hosted its science fair, Tariq stood beside a homemade sundial calibrated to the valley’s latitude. "Every shadow," he explained to the cheering assembly, "is a clock written by the Sun itself." What began as quiet daily observation became an inspiration to every younger child in the school.',
        ],
        keyTakeaway:
          'Patient everyday curiosity turns ordinary surroundings into extraordinary learning laboratories.',
        quickCheck: {
          question: 'What scientific instrument did Tariq construct using his evening shadow sketches?',
          options: ['A magnetic compass', 'A calibrated sundial', 'A mercury barometer'],
          correctIndex: 1,
          explanation: 'He tracked daily shadows to build an accurate sundial for the school science fair.',
        },
      },
      {
        id: 'lit-c2',
        chapterNumber: 2,
        title: 'Wings of Curiosity: Lessons from Dr. Kalam',
        subtitle: 'From selling newspapers in Rameswaram to India’s Missile Man',
        paragraphs: [
          'Born into a modest family in Rameswaram, young Avul Pakir Jainulabdeen Abdul Kalam rose before dawn to help distribute newspapers before hurrying to school. One afternoon, his teacher Sivasubramania Iyer sketched a bird on the blackboard and later took students to the seashore to watch seagulls soar.',
          'Seeing real flight sparked Kalam’s lifelong passion for aeronautical engineering. He later reminded students across India: "Dream is not that which you see while sleeping; it is something that does not let you sleep."',
        ],
        keyTakeaway:
          'Great teachers bridge blackboard theory with real-world observation—igniting lifelong vocations.',
        quickCheck: {
          question: 'Who inspired young Abdul Kalam to pursue aerospace and flight by demonstrating real birds on the seashore?',
          options: ['His teacher Sivasubramania Iyer', 'A railway stationmaster', 'A merchant sailor'],
          correctIndex: 0,
          explanation: 'His science teacher Sivasubramania Iyer took the class to the coast to observe bird flight mechanics firsthand.',
        },
      },
      {
        id: 'lit-c3',
        chapterNumber: 3,
        title: 'Nature Verse & Poetic Devices',
        subtitle: 'Simile, metaphor, personification, and rhyme schemes',
        paragraphs: [
          'Poetry compresses deep emotion and vivid imagery into rhythmic lines. When a poet writes "The stream sang over smooth river stones," attributing human singing to water is Personification. Comparing two unlike things using "like" or "as" is a Simile ("white as fresh winter snow"), while direct equation is a Metaphor ("The Chinar is a golden crown").',
        ],
        keyTakeaway:
          'Read poetry aloud slowly to hear meter, alliteration, and emotional cadence.',
        quickCheck: {
          question: 'Identify the poetic device in: "The autumn Chinar leaves danced across the courtyard."',
          options: ['Personification', 'Oxymoron', 'Onomatopoeia'],
          correctIndex: 0,
          explanation: 'Giving human action ("danced") to non-human leaves is Personification.',
        },
      },
      {
        id: 'lit-c4',
        chapterNumber: 4,
        title: 'The Wise Shepherd’s Measure',
        subtitle: 'A folktale on integrity and thoughtful judgment',
        paragraphs: [
          'Long ago, two merchants quarreled over a bag of walnuts they claimed weighed differently on each scale. A village shepherd stepped forward, placed both loads upon a balanced wooden beam across a stone, and showed that truth requires fair measurement, not louder voices. Integrity always outlasts clever excuses.',
        ],
        keyTakeaway:
          'True wisdom relies on calm evidence and fairness rather than loud argument.',
        quickCheck: {
          question: 'How did the shepherd settle the dispute fairly?',
          options: [
            'By guessing randomly',
            'By testing both weights directly on a balanced beam scale',
            'By keeping the walnuts for himself',
          ],
          correctIndex: 1,
          explanation: 'He relied on an objective, transparent balance test rather than opinion.',
        },
      },
    ],
  },
  {
    id: 'book-kashmir-heritage',
    catalogCode: 'CHW-HER-01',
    title: 'Kashmiri Heritage, Lal Ded & Valley Folklore',
    subtitle: 'Mother Tongue Wisdom, Chinar Ecology & Cultural Craftsmanship',
    author: 'Mr. Ab Rashid Wani (Master, Kashmiri Heritage)',
    category: 'Urdu & Kashmiri Heritage',
    classTag: 'Classes 6–10',
    applicableClasses: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'],
    language: 'Bilingual (Eng / Urdu)',
    readingMinutes: 22,
    edition: 'Regional Heritage Series · 2026',
    coverTheme: {
      bgClass: 'bg-emerald-950',
      spineClass: 'bg-stone-900',
      accentTextClass: 'text-amber-300',
      borderClass: 'border-emerald-800',
      coverImage: heritageCoverImg,
    },
    synopsis:
      'Explores Kashmir’s rich linguistic and cultural heritage—introductory Kashmiri grammar, the timeless Vakhs of Lal Ded and Shrukhs of Sheikh-ul-Alam (RA), and traditional valley arts.',
    keyTopics: ['Kashmiri Script', 'Lal Ded Vakhs', 'Nund Reshi Shrukhs', 'Crafts & Chinar'],
    chapters: [
      {
        id: 'her-c1',
        chapterNumber: 1,
        title: 'Kashmiri Language: Sounds & Cultural Roots',
        subtitle: 'Preserving mother-tongue fluency under NEP 2020',
        paragraphs: [
          'Kashmiri (Koshur) belongs to the Dardic branch and carries centuries of lyrical poetry, proverbs, and folk wisdom. One of its unique riches is its subtle vowel harmony and rich vocabulary for mountain weather, rivers, orchards, and hospitality.',
          'Under NEP 2020, studying our mother tongue alongside English and Urdu strengthens cognitive expression and keeps intergenerational stories alive in Chowgam.',
        ],
        keyTakeaway:
          'Multilingual students who read in their mother tongue develop stronger comprehension across all academic subjects.',
        quickCheck: {
          question: 'Why does NEP 2020 encourage learning regional mother tongues like Kashmiri alongside English?',
          options: [
            'It strengthens conceptual clarity, cultural pride, and multilingual communication',
            'It replaces mathematics textbooks',
            'It prevents learning science',
          ],
          correctIndex: 0,
          explanation: 'Mother-tongue fluency supports deeper understanding and cultural continuity.',
        },
      },
      {
        id: 'her-c2',
        chapterNumber: 2,
        title: 'Vakhs of Lal Ded & Shrukhs of Sheikh-ul-Alam (RA)',
        subtitle: 'Four-line verses of humility, kindness, and inner awakening',
        paragraphs: [
          'In the 14th century, the poet-saint Lal Ded (Lalleshwari) composed concise four-line Kashmiri verses called Vakhs—teaching that genuine goodness lies in compassion, self-discipline, and seeing unity in all creation rather than outward show.',
          'Sheikh Noor-ud-Din Wali (RA), fondly revered as Nund Reshi and Alamdar-e-Kashmir, expressed similar universal ethics in memorable Shrukhs, including his famous ecological reminder: "Ann poshi teli yeli wan poshi" — Food will last only as long as the forests survive.',
        ],
        keyTakeaway:
          '"Ann poshi teli yeli wan poshi" remains one of the earliest poetic calls for forest conservation anywhere in the world.',
        formulaOrHighlight: {
          label: 'Timeless Kashmiri Maxim',
          content: 'اَن پوشہِ تیلہِ ییلہِ وَن پوشہِ — "Food endures only so long as forests endure." (Sheikh-ul-Alam RA)',
        },
        quickCheck: {
          question: 'What vital message does Sheikh-ul-Alam’s (RA) famous line "Ann poshi teli yeli wan poshi" convey?',
          options: [
            'Agricultural abundance depends directly on protecting forests and ecology',
            'Rivers should be paved over with concrete',
            'Autumn arrives before spring',
          ],
          correctIndex: 0,
          explanation: 'It teaches the direct link between healthy forests, water cycles, and food security.',
        },
      },
      {
        id: 'her-c3',
        chapterNumber: 3,
        title: 'Walnut Woodcraft, Papier-Mâché & The Chinar',
        subtitle: 'Artistry shaped by Kashmir’s natural resources',
        paragraphs: [
          'Kashmir’s traditional artisans draw inspiration directly from local botany: Chinar (Bouin) leaves, almond blossoms, and flowing stream curves adorn carved walnut wood lattices (Khatamband and Pinjrakari), crewel embroidery, and hand-painted papier-mâché.',
          'The majestic Chinar tree offers cool shade in summer, burns crimson-gold in Harud (autumn), and stands as a living emblem across school courtyards and heritage shrines.',
        ],
        keyTakeaway:
          'Traditional Kashmiri crafts unite mathematics (geometric symmetry in Khatamband) with botanical art.',
        quickCheck: {
          question: 'Which traditional Kashmiri ceiling craft relies on interlocking geometric wooden tiles without nails?',
          options: ['Khatamband', 'Terracotta glazing', 'Bronze casting'],
          correctIndex: 0,
          explanation: 'Khatamband fits hand-cut walnut or deodar wood pieces into precise geometric polygons.',
        },
      },
      {
        id: 'her-c4',
        chapterNumber: 4,
        title: 'Proverbs, Hospitality & Ethical Living',
        subtitle: 'Everyday Kashmiri sayings that guide community life',
        paragraphs: [
          'Proverbs preserve centuries of practical experience in a single breath—reminding neighbors to share harvests, speak gently, welcome guests warmly with Kehwa, and value steady effort over haste. Collecting elders’ proverbs makes a wonderful student literary project.',
        ],
        keyTakeaway:
          'Listening to elders and recording oral folk proverbs preserves local heritage for future generations.',
        quickCheck: {
          question: 'How can students best preserve local oral folklore in their village?',
          options: [
            'By interviewing elders and writing down proverbs and stories accurately',
            'By ignoring local languages',
            'By memorizing only foreign idioms',
          ],
          correctIndex: 0,
          explanation: 'Documenting elders’ proverbs and folk tales preserves living community heritage.',
        },
      },
    ],
  },
  {
    id: 'book-urdu-qawaid',
    catalogCode: 'CHW-URD-01',
    title: 'Urdu Qawaid Aur Insha Pardazi',
    subtitle: 'Foundational Urdu Grammar, Idioms, Letters & Essay Composition',
    author: 'Mr. Gulzar Ahmad Khan (Master, Urdu Dept.)',
    category: 'Urdu & Kashmiri Heritage',
    classTag: 'Classes 6–10',
    applicableClasses: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'],
    language: 'Urdu / Kashmiri',
    readingMinutes: 21,
    edition: 'Nisabi Urdu Guide · 2026',
    coverTheme: {
      bgClass: 'bg-teal-950',
      spineClass: 'bg-teal-900',
      accentTextClass: 'text-amber-300',
      borderClass: 'border-teal-800',
    },
    synopsis:
      'Clear guide to Urdu grammar (Ism, Fail, Harf), Wahid-Jama, Mutazad Alfaz, Muhaware, formal Darkhwast writing, and structured Mazmoon (essays).',
    keyTopics: ['Ism, Fail, Harf', 'Muhaware', 'Darkhwast Nawisi', 'Mazmoon Nigari'],
    chapters: [
      {
        id: 'urd-c1',
        chapterNumber: 1,
        title: 'Kalima ki Aqsam: Ism, Fail aur Harf',
        subtitle: 'Building blocks of meaningful Urdu sentences',
        paragraphs: [
          'Urdu grammar begins with Kalima (meaningful word), divided into three primary classes: Ism (Noun—naming a person, place, or thing like Chowgam, Kitab, Qalam), Fail (Verb—indicating action and time such as Parhna, Likhna), and Harf (particles/prepositions like Mein, Par, Se that link words into clear meaning).',
          'Mastering Wahid-Jama (singular/plural) and Muzakkar-Muannas (masculine/feminine gender agreement) eliminates the most frequent spelling and agreement errors in school exams.',
        ],
        keyTakeaway:
          'In Urdu sentences, the verb (Fail) normally comes at the end, and its ending agrees with the gender and number of the subject.',
        quickCheck: {
          question: 'In the sentence "Talib-e-ilm kitab parhta hai," which word is the Fail (Verb)?',
          options: ['Talib-e-ilm', 'Kitab', 'Parhta hai'],
          correctIndex: 2,
          explanation: '"Parhta hai" expresses the action of reading and its present tense.',
        },
      },
      {
        id: 'urd-c2',
        chapterNumber: 2,
        title: 'Muhaware aur Zarb-ul-Amsal (Idioms & Proverbs)',
        subtitle: 'Adding beauty and depth to Urdu expression',
        paragraphs: [
          'A Muhawara (idiom) carries a figurative meaning deeper than its literal words—for example, "Aankhon ka tara hona" means to be deeply cherished, and "Din raat ek karna" means working with wholehearted dedication toward exams.',
          'Zarb-ul-Amsal (proverbs) state complete traditional wisdom, such as "Qatra qatra darya banta hai" (drop by drop makes an ocean).',
        ],
        keyTakeaway:
          'Use idioms naturally inside essays and stories to earn higher expression marks in Urdu composition.',
        quickCheck: {
          question: 'What does the Urdu idiom "Din raat ek karna" mean?',
          options: ['Sleeping through noon', 'Working extremely hard with dedication', 'Forgetting homework'],
          correctIndex: 1,
          explanation: 'It signifies tireless, continuous effort toward a noble goal.',
        },
      },
      {
        id: 'urd-c3',
        chapterNumber: 3,
        title: 'Darkhwast aur Khat Nawisi (Applications & Letters)',
        subtitle: 'Polite formal address to Headmaster and family correspondence',
        paragraphs: [
          'Formal school applications open with "Ba-khidmat Janab Headmaster Sahib, PM SHRI Govt. High School Chowgam," followed by "Janab-e-Aali," respectful explanation of the leave or request, and sign off cleanly on the left with "Aap ka farmanbardar shagird," name, class, and date.',
        ],
        keyTakeaway:
          'Clean Nastaliq-inspired margins, clear subject line, and polite salutation define high-scoring Darkhwast.',
        quickCheck: {
          question: 'How should a student close a formal application to the Headmaster in Urdu?',
          options: [
            'Al-arz / Aap ka farmanbardar shagird with Name, Class & Date',
            'Only a nickname without class',
            'A riddle at the bottom',
          ],
          correctIndex: 0,
          explanation: 'Formal school applications always close respectfully with full student details and date.',
        },
      },
      {
        id: 'urd-c4',
        chapterNumber: 4,
        title: 'Mazmoon Nigari (Structured Essay Writing)',
        subtitle: 'Tamheed (Introduction), Nafs-e-Mazmoon (Body), and Khatima (Conclusion)',
        paragraphs: [
          'Every well-crafted Urdu Mazmoon—whether on "Ilm ke Faide," "Subah ki Sair," or "Maholiyati Aloodgi"—follows three clear stages: Tamheed (engaging introduction), Nafs-e-Mazmoon (well-organized points with relevant couplets/ashaar), and Khatima (thoughtful summary).',
        ],
        keyTakeaway:
          'Opening or closing an Urdu essay with one apt poetic couplet (sher) leaves a lasting impression.',
        quickCheck: {
          question: 'What is the opening section of a formal Urdu essay called?',
          options: ['Khatima', 'Tamheed', 'Muhawara'],
          correctIndex: 1,
          explanation: 'Tamheed introduces the main theme clearly before the detailed body paragraphs.',
        },
      },
    ],
  },
  {
    id: 'book-jk-history',
    catalogCode: 'CHW-SOC-01',
    title: 'History of Jammu, Kashmir & Modern India',
    subtitle: 'Chronicles, Freedom Movement & Constitutional Democracy',
    author: 'Mr. Gh Mohd Rafique (Master, Social Sciences)',
    category: 'Social Studies & History of J&K',
    classTag: 'Class 10',
    applicableClasses: ['Class 8', 'Class 9', 'Class 10'],
    language: 'English',
    readingMinutes: 26,
    edition: 'Social Science Reader · 2026',
    coverTheme: {
      bgClass: 'bg-rose-950',
      spineClass: 'bg-rose-900',
      accentTextClass: 'text-amber-200',
      borderClass: 'border-rose-800',
    },
    synopsis:
      'Traces historical developments from Kalhana’s Rajatarangini and Kashmir’s cultural synthesis through India’s freedom movement, the Constitution, and grassroots Panchayati Raj.',
    keyTopics: ['Rajatarangini', 'Freedom Struggle', 'Indian Constitution', 'Panchayati Raj'],
    chapters: [
      {
        id: 'his-c1',
        chapterNumber: 1,
        title: 'Ancient & Medieval Chronicles of Kashmir',
        subtitle: 'Kalhana’s Rajatarangini, water engineering, and cultural synthesis',
        paragraphs: [
          'Completed around 1148 CE by historian Kalhana, Rajatarangini ("River of Kings") stands as one of South Asia’s earliest systematic historical chronicles—recounting irrigation marvels like Suyya’s dredging of the Jhelum (Vitasta) river to prevent valley floods.',
          'Centuries later, artisan guilds flourished across Kashmir, building timber mosques, stone temples, terraced gardens, and trade links across mountain passes.',
        ],
        keyTakeaway:
          'Historical sources like Rajatarangini show how water management and craftsmanship shaped Kashmiri civilization.',
        quickCheck: {
          question: 'Who authored the 12th-century historical chronicle Rajatarangini?',
          options: ['Kalhana', 'Megasthenes', 'Al-Biruni'],
          correctIndex: 0,
          explanation: 'Kalhana composed Rajatarangini in Sanskrit verse detailing Kashmir’s dynasties and society.',
        },
      },
      {
        id: 'his-c2',
        chapterNumber: 2,
        title: 'India’s Struggle for Independence (1857–1947)',
        subtitle: 'From early uprisings to Non-Cooperation, Dandi March & 1947',
        paragraphs: [
          'The Revolt of 1857 awakened widespread resistance against colonial rule. By the early 20th century, mass movements led by Mahatma Gandhi, alongside revolutionary patriots such as Bhagat Singh, Subhas Chandra Bose, and Ashfaqulla Khan, united citizens across regions, languages, and faiths.',
          'The 1930 Dandi Salt Satyagraha and the 1942 Quit India Movement demonstrated the power of disciplined civic unity, culminating in India’s independence on August 15, 1947.',
        ],
        keyTakeaway:
          'India’s freedom struggle combined peaceful mass civic participation, economic self-reliance (Swadeshi), and deep sacrifice.',
        quickCheck: {
          question: 'Which 1930 peaceful march challenged colonial taxation by making salt at the sea coast?',
          options: ['Dandi Salt March', 'Partition of Bengal', 'Rowlatt Satyagraha'],
          correctIndex: 0,
          explanation: 'Gandhiji led the 240-mile Dandi March in 1930 to break the unjust salt monopoly.',
        },
      },
      {
        id: 'his-c3',
        chapterNumber: 3,
        title: 'Making of the Constitution & Fundamental Rights',
        subtitle: 'Dr. B.R. Ambedkar, the Preamble, Rights and Fundamental Duties',
        paragraphs: [
          'Adopted on November 26, 1949 and enforced on January 26, 1950, the Constitution of India—drafted by the Drafting Committee chaired by Dr. B.R. Ambedkar—establishes a Sovereign, Socialist, Secular, Democratic Republic committed to Justice, Liberty, Equality, and Fraternity.',
          'Article 21A guarantees the Fundamental Right to Free and Compulsory Education for children aged 6 to 14, empowering public schools like PM SHRI GHS Chowgam across every village.',
        ],
        keyTakeaway:
          'Rights and Duties walk together: Article 51A reminds every citizen to protect public property, preserve the environment, and develop scientific temper.',
        quickCheck: {
          question: 'Which constitutional principle ensures that no citizen faces discrimination based on religion, caste, gender, or birthplace?',
          options: ['Right to Equality (Articles 14–18)', 'Colonial Monopoly', 'Hereditary Rule'],
          correctIndex: 0,
          explanation: 'Articles 14–18 guarantee equality before law and prohibit discrimination.',
        },
      },
      {
        id: 'his-c4',
        chapterNumber: 4,
        title: 'Local Self-Governance: Gram Sabha & Panchayats',
        subtitle: 'Democracy in action at the village and school level',
        paragraphs: [
          'Democracy thrives closest to citizens through Gram Sabhas and Panchayats—where villagers plan drinking water, rural roads, sanitation, and support local school management committees (SMCs). Participating thoughtfully in civic life begins right in student councils and Eco-Clubs.',
        ],
        keyTakeaway:
          'Panchayati Raj strengthens grassroots accountability and ensures local community voices shape village priorities.',
        quickCheck: {
          question: 'Who forms the Gram Sabha in a village?',
          options: [
            'All registered adult voters residing in the Panchayat area',
            'Only out-of-state officials',
            'Only industrial factory owners',
          ],
          correctIndex: 0,
          explanation: 'Every registered voter within a Panchayat belongs to the Gram Sabha.',
        },
      },
    ],
  },
  {
    id: 'book-himalayan-geo',
    catalogCode: 'CHW-SOC-02',
    title: 'Geography of India & The Himalayan Belt',
    subtitle: 'Mountain Formation, River Basins, Climate & Horticulture',
    author: 'Social Science Faculty, GHS Chowgam',
    category: 'Social Studies & History of J&K',
    classTag: 'Class 7',
    applicableClasses: ['Class 6', 'Class 7', 'Class 8', 'Class 9'],
    language: 'English',
    readingMinutes: 20,
    edition: 'Regional Geography · 2026',
    coverTheme: {
      bgClass: 'bg-slate-800',
      spineClass: 'bg-slate-900',
      accentTextClass: 'text-emerald-300',
      borderClass: 'border-slate-700',
    },
    synopsis:
      'Explores tectonic uplift of the Himalayas, glacier-fed rivers including Jhelum and Lidder, seasonal weather systems, and Kashmir’s orchard economy.',
    keyTopics: ['Himalayan Ranges', 'Jhelum & Lidder', 'Western Disturbances', 'Horticulture Soils'],
    chapters: [
      {
        id: 'geo2-c1',
        chapterNumber: 1,
        title: 'Physical Divisions & The Young Fold Himalayas',
        subtitle: 'Himadri, Himachal, Pir Panjal, and the Kashmir Valley bowl',
        paragraphs: [
          'Millions of years ago, the northward collision of the Indian tectonic plate with Eurasia folded ancient seabed sediments skyward into the mighty Himalayas—arranged in parallel tiers: the Greater Himalayas (Himadri), Lesser Himalayas (including our Pir Panjal range), and outer Siwaliks.',
          'Nestled between the Pir Panjal and Greater Himalayas lies the alluvial Valley of Kashmir, whose karewa plateaus and lush mini-valleys such as Shangus and Chowgam boast deeply fertile soils.',
        ],
        keyTakeaway:
          'Because tectonic uplift continues slowly today, the Himalayas are classified as geologically "young fold mountains."',
        quickCheck: {
          question: 'Which mountain range forms the southern rim separating the Kashmir Valley from the Jammu plains?',
          options: ['Pir Panjal Range', 'Vindhya Range', 'Eastern Ghats'],
          correctIndex: 0,
          explanation: 'The Pir Panjal range encloses the southern and western rim of the Kashmir Valley.',
        },
      },
      {
        id: 'geo2-c2',
        chapterNumber: 2,
        title: 'River Systems: Jhelum, Lidder & Indus Basin',
        subtitle: 'Springs, glaciers, and freshwater lifelines',
        paragraphs: [
          'Rising from the crystal Verinag spring in District Anantnag, the River Jhelum (Vyeth) meanders northwestward across the Kashmir Valley, fed along the way by glacial tributaries such as the Lidder, Bringi, and Vishav.',
          'These perennial Himalayan rivers supply drinking water, orchard irrigation, and clean hydroelectric power across Jammu & Kashmir.',
        ],
        keyTakeaway:
          'Verinag spring in Anantnag marks the traditional headwater source of the River Jhelum.',
        quickCheck: {
          question: 'From which famous spring in District Anantnag does the River Jhelum originate?',
          options: ['Verinag Spring', 'Sambhar Lake', 'Chilika Lagoon'],
          correctIndex: 0,
          explanation: 'Verinag spring at the foothills of Pir Panjal is the source of the Jhelum (Vitasta).',
        },
      },
      {
        id: 'geo2-c3',
        chapterNumber: 3,
        title: 'Climate, Western Disturbances & Snowfall',
        subtitle: 'Why winter snow in January feeds summer apple harvests',
        paragraphs: [
          'Unlike peninsular India which relies almost solely on the summer monsoon, Jammu & Kashmir receives crucial winter snowfall from Western Disturbances—moisture-laden weather systems traveling eastward from the Mediterranean Sea.',
          'Heavy winter snow compacts into glacial reserves and deep ground moisture that slowly replenish streams throughout dry summer months.',
        ],
        keyTakeaway:
          'Winter Western Disturbances provide vital snowpack reserves for Kashmir’s springs, paddy fields, and orchards.',
        quickCheck: {
          question: 'Which weather phenomenon brings essential winter snow and rain to Jammu & Kashmir?',
          options: ['Western Disturbances', 'Tropical Cyclones from Bay of Bengal', 'Trade Winds from Australia'],
          correctIndex: 0,
          explanation: 'Extratropical Western Disturbances deliver winter precipitation across northwest India and the Himalayas.',
        },
      },
      {
        id: 'geo2-c4',
        chapterNumber: 4,
        title: 'Soils, Horticulture & Sustainable Valley Livelihoods',
        subtitle: 'Loamy valley soil, walnut, apple, and saffron cultivation',
        paragraphs: [
          'Alluvial silt along riverbanks and lacustrine Karewa clay soils create ideal drainage and mineral nutrition for temperate fruit crops—apples, walnuts, pears, plums—as well as saffron on Pampore’s upland karewas. Practicing drip irrigation and organic mulching protects topsoil for generations ahead.',
        ],
        keyTakeaway:
          'Alluvial and Karewa soils combined with temperate chill hours make Anantnag one of India’s premier horticulture belts.',
        quickCheck: {
          question: 'Why are organic mulching and drip irrigation encouraged in modern valley orchards?',
          options: [
            'They conserve soil moisture and prevent nutrient wash-off',
            'They increase soil erosion',
            'They freeze tree roots in summer',
          ],
          correctIndex: 0,
          explanation: 'Drip irrigation delivers water directly to roots while mulching cuts evaporation.',
        },
      },
    ],
  },
  {
    id: 'book-ict-essentials',
    catalogCode: 'CHW-ICT-01',
    title: 'ICT Essentials: Computing, Typing & Cyber Safety',
    subtitle: 'Hardware, Office Suites, DIKSHA Learning & Digital Hygiene',
    author: 'ICT Computer Lab, PM SHRI GHS Chowgam',
    category: 'Computer & ICT Skills',
    classTag: 'Classes 6–10',
    applicableClasses: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'],
    language: 'English',
    readingMinutes: 20,
    edition: 'ICT Lab Manual · 2026',
    coverTheme: {
      bgClass: 'bg-zinc-900',
      spineClass: 'bg-emerald-950',
      accentTextClass: 'text-emerald-300',
      borderClass: 'border-zinc-700',
    },
    synopsis:
      'Hands-on student manual for our ICT Computer Lab—covering computer architecture, spreadsheets, using DIKSHA/NCERT e-books, and essential cyber safety rules.',
    keyTopics: ['Hardware & CPU', 'Documents & Spreadsheets', 'DIKSHA Portal', 'Cyber Safety'],
    chapters: [
      {
        id: 'ict-c1',
        chapterNumber: 1,
        title: 'Inside a Computer: Input, CPU & Storage',
        subtitle: 'Hardware, operating systems, and binary logic',
        paragraphs: [
          'Every computing system follows four universal steps: Input (keyboard, mouse, scanner), Processing (Central Processing Unit / CPU performing arithmetic and logic operations), Storage (fast volatile RAM for active work, permanent SSD/HDD drives for saved files), and Output (monitor, printer, speakers).',
          'Underneath every photograph, letter, and audio clip lies binary code—patterns of 1s and 0s (bits) grouped into 8-bit bytes.',
        ],
        keyTakeaway:
          'RAM holds active programs temporarily and clears when power turns off; SSD/hard drives store files permanently.',
        quickCheck: {
          question: 'Which component acts as the brain executing instructions and arithmetic calculations?',
          options: ['Monitor', 'CPU (Central Processing Unit)', 'Printer'],
          correctIndex: 1,
          explanation: 'The CPU fetches, decodes, and executes program instructions.',
        },
      },
      {
        id: 'ict-c2',
        chapterNumber: 2,
        title: 'Word Processing & Spreadsheets for Students',
        subtitle: 'Formatting projects and using spreadsheet formulas cleanly',
        paragraphs: [
          'Using word processors cleanly means organizing documents with structured headings, clear margins, spell-checking, and saving regularly with Ctrl+S. Spreadsheets arrange tabular data into rows and columns where formulas always begin with an equals sign (=): for example =SUM(B2:B6) or =AVERAGE(B2:B6) to calculate unit test marks automatically.',
        ],
        keyTakeaway:
          'Every spreadsheet calculation formula begins with the "=" symbol.',
        formulaOrHighlight: {
          label: 'Essential Spreadsheet Formulas',
          content: '=SUM(B2:B6)  |  =AVERAGE(B2:B6)  |  =MAX(B2:B6)',
        },
        quickCheck: {
          question: 'Which symbol must begin every formula inside a spreadsheet cell?',
          options: ['@', '#', '='],
          correctIndex: 2,
          explanation: 'Typing "=" signals the spreadsheet software to evaluate the expression rather than treat it as plain text.',
        },
      },
      {
        id: 'ict-c3',
        chapterNumber: 3,
        title: 'Using DIKSHA & Digital Textbooks Responsibly',
        subtitle: 'QR-coded NCERT / JKBOSE modules and credible sources',
        paragraphs: [
          'Scanning QR codes printed inside modern JKBOSE and NCERT textbooks opens video explainers and interactive practice on DIKSHA. Always verify educational facts across reliable school textbooks and official education portals rather than unverified viral social posts.',
        ],
        keyTakeaway:
          'Cross-check facts using official curriculum textbooks and teacher-verified resources.',
        quickCheck: {
          question: 'What is the best practice when researching a school science assignment online?',
          options: [
            'Verify information from official textbooks or credible educational sources',
            'Copy the first unverified rumor without checking',
            'Share your school password on public forums',
          ],
          correctIndex: 0,
          explanation: 'Reliable educational platforms and curriculum texts ensure scientific accuracy.',
        },
      },
      {
        id: 'ict-c4',
        chapterNumber: 4,
        title: 'Cyber Hygiene, Passwords & Digital Ethics',
        subtitle: 'Staying safe from phishing, OTP scams, and online harassment',
        paragraphs: [
          'Treat your digital identity with the same care as your physical safety: use strong unique passwords combining letters, numbers, and symbols; NEVER share an OTP (One-Time Password), Aadhaar details, or family bank numbers with strangers on phone calls or links.',
          'Practice digital empathy—never post hurtful comments or forward unverified messages, and immediately inform parents or teachers if anyone behaves suspiciously online.',
        ],
        keyTakeaway:
          'Never share OTPs or click unknown prize links—legitimate school or bank desks never ask for passwords over SMS.',
        quickCheck: {
          question: 'What should you do if a strange message asks for an OTP or promises a free prize if you click a link?',
          options: [
            'Reply quickly with your Aadhaar number',
            'Never share any OTP, close the message, and inform a parent or teacher',
            'Forward the link to ten classmates',
          ],
          correctIndex: 1,
          explanation: 'OTP phishing links attempt to steal accounts or money; never click or forward them.',
        },
      },
    ],
  },
  {
    id: 'book-values-career',
    catalogCode: 'CHW-GEN-01',
    title: 'Values for Life, Career Compass & Study Habits',
    subtitle: 'Smart Study Methods, Integrity & Post-Matric Pathways',
    author: 'Career Guidance & Life Skills Cell, GHS Chowgam',
    category: 'General Knowledge & Values',
    classTag: 'General Reading',
    applicableClasses: ['General Reading', 'Class 8', 'Class 9', 'Class 10'],
    language: 'English',
    readingMinutes: 19,
    edition: 'Student Mentorship Handbook · 2026',
    coverTheme: {
      bgClass: 'bg-emerald-900',
      spineClass: 'bg-amber-800',
      accentTextClass: 'text-amber-300',
      borderClass: 'border-emerald-700',
    },
    synopsis:
      'Helps students replace last-minute exam stress with effective active recall study habits, understand career & ITI/technical options after Class 10, and practice everyday civic values.',
    keyTopics: ['Active Recall Study', 'Values & Empathy', 'Post-10th Careers', 'India GK'],
    chapters: [
      {
        id: 'val-c1',
        chapterNumber: 1,
        title: 'How to Build Calm, Focused Study Routines',
        subtitle: 'Active recall, Pomodoro focus blocks, and healthy sleep',
        paragraphs: [
          'Simply re-reading a textbook ten times creates an illusion of mastery. Far more effective is Active Recall: read a short section, close the book, and explain the core idea aloud in your own words or sketch it from memory.',
          'Study in focused 25–30 minute sessions with a 5-minute stretch break away from screens, and protect 8 hours of sleep—because your brain consolidates newly learned memories while you sleep deeply.',
        ],
        keyTakeaway:
          'Closing the book to test yourself (Active Recall) doubles long-term memory compared to passive re-reading.',
        quickCheck: {
          question: 'Which study technique builds the strongest long-term recall before examinations?',
          options: [
            'Active recall—testing yourself without looking at notes',
            'Highlighting every single word on the page',
            'Staying awake all night without sleep',
          ],
          correctIndex: 0,
          explanation: 'Retrieving answers actively from memory strengthens neural pathways far better than passive re-reading.',
        },
      },
      {
        id: 'val-c2',
        chapterNumber: 2,
        title: 'Empathy, Honesty & Responsible Citizenship',
        subtitle: 'Small daily habits that shape great communities',
        paragraphs: [
          'True education measures not only marks on a certificate, but kindness toward classmates, honesty when nobody is watching, respect for parents and elders, and care for shared classrooms, trees, and water taps. As our school motto declares: Excellence in Education, Innovation in Learning, Values for Life.',
        ],
        keyTakeaway:
          'Character is built in quiet everyday choices—speaking truthfully, helping peers, and caring for shared property.',
        quickCheck: {
          question: 'Which daily action reflects strong civic responsibility at school?',
          options: [
            'Keeping campus grounds clean and helping younger students safely',
            'Damaging library books',
            'Wasting clean drinking water',
          ],
          correctIndex: 0,
          explanation: 'Caring for shared spaces and supporting fellow students exemplifies responsible citizenship.',
        },
      },
      {
        id: 'val-c3',
        chapterNumber: 3,
        title: 'Career Pathways After Class 10 Matriculation',
        subtitle: 'Higher Secondary streams, Polytechnic, ITI trades & Scholarships',
        paragraphs: [
          'Passing Class 10 opens diverse meaningful futures: Higher Secondary academic streams (Science/Medical/Non-Medical, Commerce, Humanities & Arts), 3-year Diploma Engineering Polytechnics, and skill-certified trades at Government ITI Anantnag (such as Electrician, Computer Operator, Plumbing, and Carpentry—recently visited by our students on their exposure trip!).',
          'Speak regularly with teachers and parents to match your natural strengths and interests with future studies and scholarship portals.',
        ],
        keyTakeaway:
          'Both academic Higher Secondary degrees and hands-on technical ITI/Polytechnic skills offer respected, rewarding careers.',
        quickCheck: {
          question: 'What kind of career preparation do Government ITIs (Industrial Training Institutes) provide after school?',
          options: [
            'Practical, job-ready vocational and technical trades',
            'Only kindergarten rhymes',
            'No certification of any kind',
          ],
          correctIndex: 0,
          explanation: 'ITIs offer NCVT-recognized practical trades for skilled technical careers and self-employment.',
        },
      },
      {
        id: 'val-c4',
        chapterNumber: 4,
        title: 'Quick India & J&K General Knowledge Compendium',
        subtitle: 'Essential national symbols, science pioneers & civic facts',
        paragraphs: [
          'Strengthen your quiz readiness: National Science Day is celebrated every February 28 honoring Sir C.V. Raman’s discovery of the Raman Effect; Dr. S. Radhakrishnan’s birthday (September 5) marks Teachers’ Day; National Education Policy 2020 introduces the 5+3+3+4 curricular structure; and Wular Lake in Kashmir ranks among Asia’s largest freshwater lakes.',
        ],
        keyTakeaway:
          'National Science Day on February 28 commemorates Sir C.V. Raman’s Nobel Prize-winning light scattering discovery.',
        quickCheck: {
          question: 'Why is National Science Day celebrated in India on February 28?',
          options: [
            'To honor Sir C.V. Raman’s discovery of the Raman Effect',
            'To mark the invention of the steam train',
            'Because winter ends on February 28 globally',
          ],
          correctIndex: 0,
          explanation: 'Sir C.V. Raman announced the Raman Effect on February 28, 1928, earning the 1930 Nobel Prize in Physics.',
        },
      },
    ],
  },
];
