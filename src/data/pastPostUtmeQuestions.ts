import { Question } from '../types';

/**
 * Authentic OAU & Top Nigerian University Post-UTME Past Questions
 * Extracted and verified from official screening past question archives.
 */
export const EXTRACTED_POST_UTME_QUESTIONS: Question[] = [
  // =========================================================================
  // 1. GENERAL APTITUDE, ENGLISH & CURRENT AFFAIRS
  // =========================================================================
  {
    id: 'oau_apt_pu_01',
    subjectId: 'aptitude',
    subjectName: 'General Aptitude & Reasoning',
    year: 'Official Archive',
    topic: 'Reading Comprehension',
    passage: `'You all know how friendly we are with Okperi. Do you think that any Umuaro man who goes to prison there will come back alive? But that apart, do you forget that this is the moon of planting? Do you want to grow this year's crops in the prison house in a land where your fathers owe a cow? I speak as your elder brother. I have travelled in Olu and I have travelled in Igbo, and I can tell you that there is no escape from the white man. He has come. When suffering knocks at your door and you say there is no seat left for him, he tells you not to worry because he has brought his own stool. The white man is like that... (Chinua Achebe, Arrow of God)'`,
    questionText: `In the passage, the phrase 'There is no escape from the white man' signifies that:`,
    options: [
      'The white man will send all citizens to prison',
      'The white man can kill everyone with his weapons',
      'The people are merely trying to flee from the white man',
      'The people must inevitably accept and adapt to the white man\'s presence'
    ],
    correctOptionIndex: 3,
    explanation: `In Arrow of God, Unachukwu counsels his fellow villagers that colonial rule has established an inescapable, overpowering presence which the community must acknowledge and contend with rather than futilely resist.`,
    keyConcept: 'Literary Comprehension & Contextual Inference',
    oauExamTip: 'In OAU comprehension passages, look beyond literal surface meaning for the speaker\'s philosophical stance.',
    difficulty: 'medium'
  },
  {
    id: 'oau_apt_pu_02',
    subjectId: 'aptitude',
    subjectName: 'General Aptitude & Reasoning',
    year: 'Official Archive',
    topic: 'Reading Comprehension',
    passage: `Insects can be classified into fourteen separate groupings, or orders. Butterflies and moths belong to the Lepidoptera order. Lepidoptera means 'scale wings', from the Greek words 'lepido' (scale) and 'ptera' (wings). Worldwide, there are about 28,000 butterfly species, while the remaining majority of Lepidoptera are moths.`,
    questionText: 'According to the passage, how many insect orders exist in classification?',
    options: ['2', '14', '3', '150'],
    correctOptionIndex: 1,
    explanation: 'The passage explicitly begins: "Insects can be classified into fourteen separate groupings, or orders."',
    keyConcept: 'Direct Fact Retrieval',
    oauExamTip: 'Always verify numerical facts directly in the introductory sentence of the excerpt.',
    difficulty: 'easy'
  },
  {
    id: 'oau_apt_pu_03',
    subjectId: 'aptitude',
    subjectName: 'General Aptitude & Reasoning',
    year: 'Official Archive',
    topic: 'Lexis and Structure',
    questionText: 'Jubril found that thieves had entered his residence during his absence. He went to the police station to report the...',
    options: ['break out', 'break up', 'break in', 'break into'],
    correctOptionIndex: 2,
    explanation: 'As a noun denoting illegal forced entry into a building, the compound noun is "break-in" (or "break in"). "Break into" is a verb phrase requiring an object.',
    keyConcept: 'Compound Nouns vs Phrasal Verbs',
    oauExamTip: 'Distinguish between noun phrases ("a break-in") and transitive phrasal verbs ("to break into a house").',
    difficulty: 'medium'
  },
  {
    id: 'oau_apt_pu_04',
    subjectId: 'aptitude',
    subjectName: 'General Aptitude & Reasoning',
    year: 'Official Archive',
    topic: 'Vocabulary (Nearest in Meaning)',
    questionText: 'Choose the option nearest in meaning to the underlined word: "Rich citizens are often niggardly in their ways."',
    options: ['beggarly', 'sordid', 'miserly', 'pompous'],
    correctOptionIndex: 2,
    explanation: '"Niggardly" means stingy, ungenerous, or reluctant to spend money, making "miserly" the exact synonym.',
    keyConcept: 'Synonyms and Contextual Lexis',
    oauExamTip: 'Do not confuse "niggardly" with racial slurs; etymologically it stems from Old Norse "nig" (miser).',
    difficulty: 'medium'
  },
  {
    id: 'oau_apt_pu_05',
    subjectId: 'aptitude',
    subjectName: 'General Aptitude & Reasoning',
    year: 'Official Archive',
    topic: 'Vocabulary (Antonyms)',
    questionText: 'Choose the option opposite in meaning to the underlined word: "The project is designed to alleviate poverty in rural areas."',
    options: ['exacerbate', 'assuage', 'eradicate', 'tackle'],
    correctOptionIndex: 0,
    explanation: '"Alleviate" means to relieve, ease, or lessen hardship. Its direct opposite is "exacerbate" (to aggravate or worsen).',
    keyConcept: 'Antonyms',
    oauExamTip: '"Assuage" is a synonym; "exacerbate" is the true antonym.',
    difficulty: 'easy'
  },
  {
    id: 'oau_apt_pu_06',
    subjectId: 'aptitude',
    subjectName: 'General Aptitude & Reasoning',
    year: 'Official Archive',
    topic: 'Current Affairs & History',
    questionText: 'Mr. Dele Giwa, the fearless founding editor-in-chief of Newswatch magazine, was assassinated via a letter bomb on:',
    options: [
      'October 19, 1986',
      'September 17, 1987',
      'October 19, 1988',
      'September 17, 1986'
    ],
    correctOptionIndex: 0,
    explanation: 'Dele Giwa was assassinated in his Ikeja home in Lagos on 19 October 1986 through a parcel bomb delivered to his study.',
    keyConcept: 'Nigerian Media History & General Knowledge',
    oauExamTip: 'Dele Giwa\'s parcel bomb date (Oct 19, 1986) is a staple question in Nigerian university screening tests.',
    difficulty: 'medium'
  },
  {
    id: 'oau_apt_pu_07',
    subjectId: 'aptitude',
    subjectName: 'General Aptitude & Reasoning',
    year: 'Official Archive',
    topic: 'World Geography & Current Affairs',
    questionText: 'Victoria is the capital city of which African island nation?',
    options: ['Somalia', 'Morocco', 'Seychelles', 'Burundi'],
    correctOptionIndex: 2,
    explanation: 'Victoria is the capital city of the Republic of Seychelles, located on the northeastern side of Mahé island.',
    keyConcept: 'African Capitals',
    oauExamTip: 'Seychelles (Victoria), Mauritius (Port Louis), and Madagascar (Antananarivo) frequently appear in current affairs.',
    difficulty: 'easy'
  },
  {
    id: 'oau_apt_pu_08',
    subjectId: 'aptitude',
    subjectName: 'General Aptitude & Reasoning',
    year: 'Official Archive',
    topic: 'Nigerian State Slogans',
    questionText: '"Centre of Unity" is the official slogan of Abuja (FCT), while "State of Hospitality" (or Home of Hospitality) is:',
    options: ['Rivers State', 'Cross River State', 'Katsina State', 'Nasarawa State'],
    correctOptionIndex: 2,
    explanation: 'Katsina State is officially branded as the "Home of Hospitality" (or State of Hospitality), while Nasarawa is "Home of Solid Minerals".',
    keyConcept: 'Nigerian Geography & State Identity',
    oauExamTip: 'Memorize all 36 Nigerian state mottos and capitals before sitting the OAU post-UTME screening.',
    difficulty: 'medium'
  },
  {
    id: 'oau_apt_pu_09',
    subjectId: 'aptitude',
    subjectName: 'General Aptitude & Reasoning',
    year: 'Official Archive',
    topic: 'Nigerian Tourism & Geography',
    questionText: 'The famous Obudu Mountain Resort and Cattle Ranch is located in which Nigerian state?',
    options: ['Rivers State', 'Cross River State', 'Bayelsa State', 'Akwa Ibom State'],
    correctOptionIndex: 1,
    explanation: 'Obudu Cattle Ranch (now Obudu Mountain Resort) is located on the Obanliku Plateau in Cross River State, Nigeria.',
    keyConcept: 'Nigerian Tourism Landmarks',
    oauExamTip: 'Gurara Falls is in Niger State, Wikki Warm Springs is in Bauchi, and Obudu is in Cross River.',
    difficulty: 'easy'
  },
  {
    id: 'oau_apt_pu_10',
    subjectId: 'aptitude',
    subjectName: 'General Aptitude & Reasoning',
    year: 'Official Archive',
    topic: 'World Organizations & Nobel Prizes',
    questionText: 'Nelson Rolihlahla Mandela was awarded the Nobel Peace Prize jointly with F.W. de Klerk in:',
    options: ['1992', '1993', '1994', '1995'],
    correctOptionIndex: 1,
    explanation: 'Mandela and South African President F.W. de Klerk were jointly awarded the Nobel Peace Prize in 1993 for their peaceful transition out of apartheid.',
    keyConcept: 'Nobel Peace Laureates',
    oauExamTip: 'Albert Luthuli won in 1960, Desmond Tutu in 1984, Mandela in 1993, and Wangari Maathai in 2004.',
    difficulty: 'medium'
  },

  // =========================================================================
  // 2. MATHEMATICS
  // =========================================================================
  {
    id: 'oau_mth_pu_01',
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    year: 'Official Archive',
    topic: 'Indices & Surds',
    questionText: 'Without using mathematical tables or a calculator, evaluate: (243)^(1/5) × (0.09)^(-1) × (125)^(-2/3)',
    options: ['4', '3/4', '3', '4/3'],
    correctOptionIndex: 3,
    explanation: '1. (243)^(1/5) = (3^5)^(1/5) = 3.\n2. (0.09)^(-1) = 1 / (9/100) = 100/9.\n3. (125)^(-2/3) = (5^3)^(-2/3) = 5^(-2) = 1/25.\nCombining: 3 × (100/9) × (1/25) = (3 × 100) / (9 × 25) = 300 / 225 = 4/3.',
    keyConcept: 'Laws of Fractional and Negative Indices',
    oauExamTip: 'Factorize each base into its prime components before simplifying powers.',
    difficulty: 'medium'
  },
  {
    id: 'oau_mth_pu_02',
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    year: 'Official Archive',
    topic: 'Algebra & Number Theory',
    questionText: 'Three consecutive positive integers a, b, and c are such that b² = 4(a + c). Determine the numerical value of c.',
    options: ['6', '3', '9', '5'],
    correctOptionIndex: 2,
    explanation: 'Let consecutive integers be a = b - 1, b, and c = b + 1.\nThen a + c = (b - 1) + (b + 1) = 2b.\nThe equation becomes b² = 4(2b) = 8b.\nDividing both sides by b (since b > 0): b = 8.\nTherefore, c = b + 1 = 9.',
    keyConcept: 'Consecutive Integer Expressions',
    oauExamTip: 'Express symmetric consecutive terms as (b - 1), b, (b + 1) to simplify algebraic sums.',
    difficulty: 'easy'
  },
  {
    id: 'oau_mth_pu_03',
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    year: 'Official Archive',
    topic: 'Geometric Progressions',
    questionText: 'Find the sum to infinity (S∞) of the sequence: 3 + 2 + 4/3 + 8/9 + 16/27 + ...',
    options: ['270', '9', '27', '90'],
    correctOptionIndex: 1,
    explanation: 'First term a = 3.\nCommon ratio r = 2 / 3 < 1.\nSum to infinity S∞ = a / (1 - r) = 3 / (1 - 2/3) = 3 / (1/3) = 3 × 3 = 9.',
    keyConcept: 'Sum to Infinity of a Convergent GP',
    oauExamTip: 'S∞ is only valid when |r| < 1. Formula is always a / (1 - r).',
    difficulty: 'easy'
  },
  {
    id: 'oau_mth_pu_04',
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    year: 'Official Archive',
    topic: 'Geometry & Polygons',
    questionText: 'Find the number of sides of a regular polygon whose interior angle is exactly twice its exterior angle.',
    options: ['5', '6', '8', '9'],
    correctOptionIndex: 1,
    explanation: 'For any polygon, Interior angle (I) + Exterior angle (E) = 180°.\nGiven I = 2E, 2E + E = 180° ⇒ 3E = 180° ⇒ E = 60°.\nNumber of sides n = 360° / E = 360° / 60° = 6 sides (Hexagon).',
    keyConcept: 'Regular Polygon Angles',
    oauExamTip: 'The sum of all exterior angles for ANY convex polygon is always 360°.',
    difficulty: 'easy'
  },
  {
    id: 'oau_mth_pu_05',
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    year: 'Official Archive',
    topic: 'Polynomial Factor Theorem',
    questionText: 'If (x + 1) is a factor of the polynomial P(x) = x³ + 3x² + Kx + 4, calculate the value of K.',
    options: ['6', '4', '-4', '3'],
    correctOptionIndex: 0,
    explanation: 'By the Factor Theorem, if (x + 1) is a factor, then P(-1) = 0.\n(-1)³ + 3(-1)² + K(-1) + 4 = 0\n-1 + 3(1) - K + 4 = 0\n6 - K = 0 ⇒ K = 6.',
    keyConcept: 'Remainder and Factor Theorems',
    oauExamTip: 'Substitute x = -a when testing (x + a) = 0.',
    difficulty: 'medium'
  },
  {
    id: 'oau_mth_pu_06',
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    year: 'Official Archive',
    topic: 'Algebraic Factorization',
    questionText: 'What common binomial factor is shared among all three expressions: (x² - x), (2x² - x - 1), and (x² - 1)?',
    options: ['(2x - 1)', '(x + 1)', '(x - 1)', '(2x + 3)'],
    correctOptionIndex: 2,
    explanation: '1. x² - x = x(x - 1)\n2. 2x² - x - 1 = (2x + 1)(x - 1)\n3. x² - 1 = (x + 1)(x - 1)\nAll three contain the common factor (x - 1).',
    keyConcept: 'Highest Common Factor of Polynomials',
    oauExamTip: 'Factor each quadratic independently before identifying common terms.',
    difficulty: 'easy'
  },

  // =========================================================================
  // 3. PHYSICS
  // =========================================================================
  {
    id: 'oau_phy_pu_01',
    subjectId: 'physics',
    subjectName: 'Physics',
    year: 'Official Archive',
    topic: 'Units & Dimensions',
    questionText: 'Which of the following represents the dimensional formula for velocity?',
    options: ['[M L]', '[L T⁻¹]', '[M T]', '[L⁻²]'],
    correctOptionIndex: 1,
    explanation: 'Velocity = Displacement / Time = [L] / [T] = [L T⁻¹].',
    keyConcept: 'Dimensional Analysis',
    oauExamTip: 'Acceleration is [LT⁻²], Force is [MLT⁻²], and Work/Energy is [ML²T⁻²].',
    difficulty: 'easy'
  },
  {
    id: 'oau_phy_pu_02',
    subjectId: 'physics',
    subjectName: 'Physics',
    year: 'Official Archive',
    topic: 'Vector Resolution',
    questionText: 'A vehicle moves with a velocity of 20 m/s at an angle of 30° to the horizontal. Calculate the horizontal velocity component.',
    options: ['17.3 m/s', '10.0 m/s', '20.0 m/s', '21.0 m/s'],
    correctOptionIndex: 0,
    explanation: 'Vx = V · cos(θ) = 20 · cos(30°) = 20 × (√3 / 2) = 10√3 ≈ 17.32 m/s.',
    keyConcept: 'Resolution of Vectors into Orthogonal Components',
    oauExamTip: 'Horizontal component uses cosine (adjacent to horizontal ground), vertical uses sine.',
    difficulty: 'easy'
  },
  {
    id: 'oau_phy_pu_03',
    subjectId: 'physics',
    subjectName: 'Physics',
    year: 'Official Archive',
    topic: 'Fluid Mechanics & Buoyancy',
    questionText: 'A ship floating in freshwater (density 1000 kg/m³) sails into seawater (density 1050 kg/m³) where it also floats. The upthrust acting on the ship:',
    options: [
      'Stays constant and unchanged',
      'Decreases',
      'Increases by 5%',
      'Becomes zero'
    ],
    correctOptionIndex: 0,
    explanation: 'By the Principle of Floatation, a floating object displaces its own weight of fluid. Since the weight of the ship remains constant, the required buoyant upthrust remains identical (the ship merely floats slightly higher).',
    keyConcept: 'Principle of Floatation',
    oauExamTip: 'Upthrust on ANY freely floating object always equals the object\'s weight.',
    difficulty: 'medium'
  },
  {
    id: 'oau_phy_pu_04',
    subjectId: 'physics',
    subjectName: 'Physics',
    year: 'Official Archive',
    topic: 'Alternating Current (AC) Circuits',
    questionText: 'In a series RLC alternating current circuit at electrical resonance, which condition holds true?',
    options: [
      'XL = XC (Inductive reactance equals capacitive reactance)',
      'XL = R (Inductive reactance equals resistance)',
      'XC = 0 (Capacitive reactance vanishes)',
      'Impedance Z reaches its maximum value'
    ],
    correctOptionIndex: 0,
    explanation: 'Resonance in an RLC circuit occurs when inductive reactance XL equals capacitive reactance XC (ωL = 1/ωC). Impedance is minimal (Z = R) and current amplitude is maximized.',
    keyConcept: 'Series AC Resonance',
    oauExamTip: 'At resonance, impedance is purely resistive (Z = R) and phase angle φ = 0.',
    difficulty: 'medium'
  },
  {
    id: 'oau_phy_pu_05',
    subjectId: 'physics',
    subjectName: 'Physics',
    year: 'Official Archive',
    topic: 'Wave Optics & Sound',
    questionText: 'Sound waves and light waves cannot both undergo which of the following wave phenomena?',
    options: ['Refraction', 'Reflection', 'Interference', 'Polarization'],
    correctOptionIndex: 3,
    explanation: 'Polarization can only occur in transverse waves (where vibrations are perpendicular to wave propagation, such as light). Sound in fluids/air is a longitudinal wave and therefore cannot be polarized.',
    keyConcept: 'Transverse vs Longitudinal Wave Properties',
    oauExamTip: 'Polarization is the unique wave test that proves light is a transverse wave.',
    difficulty: 'easy'
  },
  {
    id: 'oau_phy_pu_06',
    subjectId: 'physics',
    subjectName: 'Physics',
    year: 'Official Archive',
    topic: 'Capacitors & Dielectrics',
    questionText: 'A parallel plate capacitor has a capacitance of 8 µF in vacuum. Calculate its new capacitance when a dielectric slab with dielectric constant κ = 5.0 fills the space between plates.',
    options: ['2 µF', '4 µF', '40 µF', '50 µF'],
    correctOptionIndex: 2,
    explanation: 'C = κ · C₀ = 5.0 × 8 µF = 40 µF.',
    keyConcept: 'Dielectric Effect on Capacitance',
    oauExamTip: 'Inserting a dielectric material always multiplies capacitance by the dielectric constant κ (relative permittivity εr).',
    difficulty: 'easy'
  },

  // =========================================================================
  // 4. CHEMISTRY
  // =========================================================================
  {
    id: 'oau_chm_pu_01',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'Official Archive',
    topic: 'Chemical Stoichiometry',
    questionText: 'Given that the relative atomic mass of iron is 56 and oxygen is 16, how many moles of iron(III) oxide (Fe₂O₃) are contained in 1.0 kg of the pure compound?',
    options: ['12.50 moles', '0.625 moles', '25.00 moles', '6.25 moles'],
    correctOptionIndex: 3,
    explanation: 'Molar mass of Fe₂O₃ = (2 × 56) + (3 × 16) = 112 + 48 = 160 g/mol.\nMass = 1.0 kg = 1000 g.\nNumber of moles = Mass / Molar mass = 1000 / 160 = 6.25 moles.',
    keyConcept: 'Mole Calculations & Molar Mass',
    oauExamTip: 'Always convert kilograms to grams before dividing by molar mass in g/mol.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_pu_02',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'Official Archive',
    topic: 'Salts & Acid-Base Chemistry',
    questionText: 'Which of the following chemical compounds is an acidic salt?',
    options: ['NaHSO₄', 'Na₂SO₄', 'CH₃COONa', 'Na₂S'],
    correctOptionIndex: 0,
    explanation: 'An acidic salt contains replaceable hydrogen ions from partial neutralization of a polybasic acid (H₂SO₄ + NaOH → NaHSO₄ + H₂O).',
    keyConcept: 'Acidic, Normal, and Basic Salts',
    oauExamTip: 'NaHSO₄ and NaHCO₃ are classic examples of acidic salts in Post-UTME papers.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_pu_03',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'Official Archive',
    topic: 'Organic Chemistry & Hybridization',
    questionText: 'What is the hybridization state of both carbon atoms in the saturated hydrocarbon ethane (C₂H₆)?',
    options: ['sp² hybridized', 'sp hybridized', 'sp³ hybridized', 'sp²d hybridized'],
    correctOptionIndex: 2,
    explanation: 'In ethane (CH₃-CH₃), each carbon atom forms 4 single sigma (σ) bonds with tetrahedral geometry, requiring sp³ orbital hybridization.',
    keyConcept: 'Carbon Hybridization States in Hydrocarbons',
    oauExamTip: 'Alkanes = sp³, Alkenes (double bond C) = sp², Alkynes (triple bond C) = sp.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_pu_04',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'Official Archive',
    topic: 'Metallurgy & Industrial Chemistry',
    questionText: 'Cassiterite (tinstone) is the principal geological ore mined for the industrial extraction of:',
    options: ['Calcium', 'Copper', 'Tin', 'Sodium'],
    correctOptionIndex: 2,
    explanation: 'Cassiterite is mineral tin(IV) oxide (SnO₂), the chief tin ore historically mined in Jos, Plateau State, Nigeria.',
    keyConcept: 'Mineral Ores of Commercial Metals',
    oauExamTip: 'Bauxite = Aluminium, Haematite = Iron, Galena = Lead, Cassiterite = Tin.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_pu_05',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'Official Archive',
    topic: 'Periodic Trends & Reactivity',
    questionText: 'Which of the following halogen elements is the most chemically reactive and electronegative?',
    options: ['Fluorine (F₂)', 'Bromine (Br₂)', 'Chlorine (Cl₂)', 'Iodine (I₂)'],
    correctOptionIndex: 0,
    explanation: 'Fluorine (F₂) has the smallest atomic radius and highest standard reduction potential among halogens, making it the most reactive oxidizing agent in Group 7.',
    keyConcept: 'Halogen Reactivity & Electronegativity Series',
    oauExamTip: 'Reactivity of non-metals decreases down the group (F > Cl > Br > I).',
    difficulty: 'easy'
  },

  // =========================================================================
  // 5. BIOLOGY
  // =========================================================================
  {
    id: 'oau_bio_pu_01',
    subjectId: 'biology',
    subjectName: 'Biology',
    year: 'Official Archive',
    topic: 'Respiration & Physiology',
    questionText: 'The muscle fluid of a sprinter tested immediately following a 100m dash contained a high accumulation of lactic acid. This was caused because the athlete:',
    options: [
      'Consumed food rich in lactic acid prior to the sprint',
      'Injected lactic acid into the bloodstream',
      'Underwent anaerobic respiration due to oxygen debt in active muscles',
      'Inhaled airborne lactic acid from the environment'
    ],
    correctOptionIndex: 2,
    explanation: 'During vigorous anaerobic exercise, energetic demands outpace oxygen delivery. Muscle cells metabolize glucose through anaerobic glycolysis, converting pyruvate into lactic acid.',
    keyConcept: 'Anaerobic Respiration and Oxygen Debt',
    oauExamTip: 'Lactic acid buildup in animal muscle = oxygen debt during strenuous exertion.',
    difficulty: 'easy'
  },
  {
    id: 'oau_bio_pu_02',
    subjectId: 'biology',
    subjectName: 'Biology',
    year: 'Official Archive',
    topic: 'Endocrine & Human Physiology',
    questionText: 'If a patient\'s pancreas is surgically removed (pancreatectomy), what immediate metabolic outcome will occur?',
    options: [
      'Blood glucose concentration will sharply rise',
      'Liver glycogen storage will rapidly increase',
      'Systemic blood pressure will decrease',
      'Body weight will rapidly increase'
    ],
    correctOptionIndex: 0,
    explanation: 'The beta cells in the Islets of Langerhans in the pancreas secrete insulin, which facilitates cellular uptake of glucose. Without insulin, blood glucose levels rise uncontrollably (hyperglycemia).',
    keyConcept: 'Endocrine Regulation of Blood Sugar',
    oauExamTip: 'Insulin lowers blood glucose; Glucagon raises blood glucose.',
    difficulty: 'medium'
  },
  {
    id: 'oau_bio_pu_03',
    subjectId: 'biology',
    subjectName: 'Biology',
    year: 'Official Archive',
    topic: 'Comparative Excretion',
    questionText: 'In insects such as grasshoppers and cockroaches, the primary excretory organ functioning analogously to mammalian kidneys is the:',
    options: ['Nephridium', 'Flame cell', 'Malpighian tubule', 'Tracheal system'],
    correctOptionIndex: 2,
    explanation: 'Malpighian tubules remove nitrogenous wastes (primarily uric acid) from the hemolymph and empty into the digestive tract of insects.',
    keyConcept: 'Invertebrate Excretory Structures',
    oauExamTip: 'Earthworm = Nephridia, Flatworm = Flame cells, Insects = Malpighian tubules.',
    difficulty: 'easy'
  },
  {
    id: 'oau_bio_pu_04',
    subjectId: 'biology',
    subjectName: 'Biology',
    year: 'Official Archive',
    topic: 'Plant Adaptations & Ecology',
    questionText: 'Plants specialized and anatomically adapted for survival in arid habitats with severe water scarcity are termed:',
    options: ['Halophytes', 'Hydrophytes', 'Xerophytes', 'Mesophytes'],
    correctOptionIndex: 2,
    explanation: 'Xerophytes (e.g., cactus, Acacia, Aloe) possess sunken stomata, thick waxy cuticles, and water-storing parenchyma for arid environments.',
    keyConcept: 'Ecological Plant Groupings',
    oauExamTip: 'Hydrophytes = aquatic; Halophytes = salty soil; Xerophytes = dry/desert; Mesophytes = moderate.',
    difficulty: 'easy'
  },

  // =========================================================================
  // 6. ECONOMICS
  // =========================================================================
  {
    id: 'oau_eco_pu_01',
    subjectId: 'economics',
    subjectName: 'Economics',
    year: 'Official Archive',
    topic: 'Basic Concepts (Opportunity Cost)',
    questionText: 'Mr. Tola has sufficient funds to purchase either a textbook or a calculator, each costing ₦700. If he decides to buy the textbook, the opportunity cost of his choice is:',
    options: ['₦700', '₦1,400', 'The calculator foregone', 'The textbook acquired'],
    correctOptionIndex: 2,
    explanation: 'Opportunity cost (real cost) is defined as the alternative forgone or sacrificed when a choice is made.',
    keyConcept: 'Opportunity Cost and Scarcity',
    oauExamTip: 'Opportunity cost is ALWAYS the real sacrificed item or next best alternative, not the monetary price.',
    difficulty: 'easy'
  },
  {
    id: 'oau_eco_pu_02',
    subjectId: 'economics',
    subjectName: 'Economics',
    year: 'Official Archive',
    topic: 'Economic Systems & Price Mechanism',
    questionText: 'In a purely competitive free-market capitalist economy, the core questions of "what to produce, how to produce, and for whom to produce" are resolved via:',
    options: [
      'Central government planning ministries',
      'The price mechanism (forces of demand and supply)',
      'Trade union resolutions',
      'Judicial decrees'
    ],
    correctOptionIndex: 1,
    explanation: 'In a free enterprise market system, Adam Smith\'s "invisible hand" operating through the price mechanism coordinates consumer preferences and producer allocations.',
    keyConcept: 'Functions of the Price Mechanism',
    oauExamTip: 'Command/Planned = Government; Market = Price Mechanism; Mixed = Both.',
    difficulty: 'easy'
  },
  {
    id: 'oau_eco_pu_03',
    subjectId: 'economics',
    subjectName: 'Economics',
    year: 'Official Archive',
    topic: 'Theory of Demand',
    questionText: 'An increase in consumer demand for motor vehicles directly causes a simultaneous increase in demand for petrol. This relationship illustrates:',
    options: [
      'Competitive demand',
      'Composite demand',
      'Complementary (joint) demand',
      'Derived demand'
    ],
    correctOptionIndex: 2,
    explanation: 'Complementary or joint demand occurs when two goods are consumed jointly to satisfy a single want (e.g., cars and fuel, pens and ink).',
    keyConcept: 'Interrelated Demand Types',
    oauExamTip: 'Cars + Fuel = Joint/Complementary; Wood for furniture = Derived; Beef vs Chicken = Competitive.',
    difficulty: 'easy'
  },

  // =========================================================================
  // 7. GOVERNMENT
  // =========================================================================
  {
    id: 'oau_gov_pu_01',
    subjectId: 'government',
    subjectName: 'Government',
    year: 'Official Archive',
    topic: 'Nigerian Constitutional History',
    questionText: 'Nigeria became a federation structured into 19 states under the military administration of General Murtala Mohammed in the year:',
    options: ['1967', '1976', '1987', '1991'],
    correctOptionIndex: 1,
    explanation: 'In February 1976, Gen. Murtala Ramat Mohammed expanded Nigeria from 12 states (created by Gowon in 1967) to 19 states before his assassination.',
    keyConcept: 'State Creation in Nigerian Political History',
    oauExamTip: '1967 = 12 states (Gowon); 1976 = 19 states (Murtala); 1987 = 21 states (Babangida); 1991 = 30 states; 1996 = 36 states (Abacha).',
    difficulty: 'medium'
  },
  {
    id: 'oau_gov_pu_02',
    subjectId: 'government',
    subjectName: 'Government',
    year: 'Official Archive',
    topic: 'Political Concepts & Theory',
    questionText: 'The modern doctrine of the Separation of Powers between Executive, Legislative, and Judicial branches is credited to the French philosopher:',
    options: ['John Locke', 'Karl Marx', 'Baron de Montesquieu', 'Thomas Hobbes'],
    correctOptionIndex: 2,
    explanation: 'Baron de Montesquieu articulated the theory of Separation of Powers in his 1748 masterpiece "De l\'Esprit des Lois" (The Spirit of the Laws).',
    keyConcept: 'Separation of Powers & Constitutionalism',
    oauExamTip: 'Montesquieu = Separation of Powers; A.V. Dicey = Rule of Law; Jean Bodin = Sovereignty.',
    difficulty: 'easy'
  },
  {
    id: 'oau_gov_pu_03',
    subjectId: 'government',
    subjectName: 'Government',
    year: 'Official Archive',
    topic: 'Pre-Colonial Administrative Systems',
    questionText: 'Pre-colonial traditional Igbo society is widely characterized in political science as being:',
    options: ['Centrally absolute', 'Acephalous and segmentary', 'Feudalistic', 'Theocratic'],
    correctOptionIndex: 1,
    explanation: 'Pre-colonial Igbo communities operated a decentralized, stateless, and acephalous (headless) political structure guided by council of elders (Ndichie), age grades, and village assemblies (Oha-na-eze).',
    keyConcept: 'Acephalous Political Systems',
    oauExamTip: 'Hausa-Fulani was centralized-emirate; Oyo was constitutional monarchy; Igbo was acephalous.',
    difficulty: 'easy'
  },

  // =========================================================================
  // 8. LITERATURE IN ENGLISH
  // =========================================================================
  {
    id: 'oau_lit_pu_01',
    subjectId: 'literature',
    subjectName: 'Literature in English',
    year: 'Official Archive',
    topic: 'Literary Devices & Figures of Speech',
    questionText: 'The unintended humorous misuse of a word in place of a similar-sounding word is known as:',
    options: ['Parallelism', 'Malapropism', 'Oxymoron', 'Synecdoche'],
    correctOptionIndex: 1,
    explanation: 'Malapropism (derived from Mrs. Malaprop in Sheridan\'s "The Rivals") refers to the inadvertent substitution of an incorrect word that sounds similar to the intended one.',
    keyConcept: 'Figures of Speech and Literary Devices',
    oauExamTip: 'Example: "He is the very pineapple of politeness" (instead of pinnacle).',
    difficulty: 'easy'
  },
  {
    id: 'oau_lit_pu_02',
    subjectId: 'literature',
    subjectName: 'Literature in English',
    year: 'Official Archive',
    topic: 'Poetic Forms & Structures',
    questionText: 'A standard Italian (Petrarchan) sonnet comprises an octave (first eight lines) followed by a final six-line unit termed a/an:',
    options: ['Septet', 'Quatrain', 'Sestet', 'Heroic Couplet'],
    correctOptionIndex: 2,
    explanation: 'A Petrarchan sonnet has 14 lines structured into an Octave (8 lines presenting a problem) and a Sestet (6 lines presenting the resolution).',
    keyConcept: 'Sonnet Forms (Petrarchan vs Shakespearean)',
    oauExamTip: 'Shakespearean sonnet = 3 quatrains + 1 rhyming couplet (4+4+4+2); Petrarchan = Octave + Sestet (8+6).',
    difficulty: 'easy'
  },
  {
    id: 'oau_lit_pu_03',
    subjectId: 'literature',
    subjectName: 'Literature in English',
    year: 'Official Archive',
    topic: 'African Drama',
    questionText: 'Who is the celebrated Nigerian dramatist and scholar that authored the tragic anti-war drama "Women of Owu"?',
    options: ['Femi Osofisan', 'Wole Soyinka', 'Ola Rotimi', 'J.P. Clark'],
    correctOptionIndex: 0,
    explanation: '"Women of Owu" is a 2004 postcolonial adaptation of Euripides\' "The Trojan Women" written by Professor Femi Osofisan.',
    keyConcept: 'African Drama and Classical Adaptations',
    oauExamTip: 'Femi Osofisan is a renowned OAU emeritus professor of theatre arts.',
    difficulty: 'easy'
  },

  // =========================================================================
  // 9. CHRISTIAN RELIGIOUS KNOWLEDGE (CRK)
  // =========================================================================
  {
    id: 'oau_crk_pu_01',
    subjectId: 'crk',
    subjectName: 'Christian Religious Knowledge',
    year: 'Official Archive',
    topic: 'Gospels & Teachings of Jesus',
    questionText: 'In the Gospel narratives, when Jesus proclaimed "Render therefore unto Caesar the things which are Caesar\'s, and unto God the things that are God\'s", what civic obligation was under debate?',
    options: ['Voluntary temple charity', 'Payment of imperial poll tax / tribute', 'Priestly tithes', 'Military conscription'],
    correctOptionIndex: 1,
    explanation: 'The Pharisees and Herodians attempted to entrap Jesus regarding the payment of imperial tribute taxes to Roman Emperor Caesar (Matthew 22:21).',
    keyConcept: 'Civil Responsibility vs Religious Devotion',
    oauExamTip: 'Jesus used a Roman denarius bearing Caesar\'s inscription to illustrate rightful civic duty.',
    difficulty: 'easy'
  },
  {
    id: 'oau_crk_pu_02',
    subjectId: 'crk',
    subjectName: 'Christian Religious Knowledge',
    year: 'Official Archive',
    topic: 'Biblical History & Canon',
    questionText: 'How many canonical books constitute the Protestant Old Testament scripture?',
    options: ['39 books', '27 books', '66 books', '46 books'],
    correctOptionIndex: 0,
    explanation: 'The Protestant Old Testament consists of 39 books, while the New Testament contains 27 books (totalling 66 books).',
    keyConcept: 'Biblical Structure & Canonicity',
    oauExamTip: '39 Old Testament + 27 New Testament = 66 Biblical Books.',
    difficulty: 'easy'
  },
  {
    id: 'oau_crk_pu_03',
    subjectId: 'crk',
    subjectName: 'Christian Religious Knowledge',
    year: 'Official Archive',
    topic: 'Acts of the Apostles',
    questionText: 'Which apostle and leader of the early Jerusalem church presided over the pivotal Jerusalem Council recorded in Acts 15?',
    options: ['Apostle Peter', 'Apostle Paul', 'James the Just (the Lord\'s brother)', 'Apostle Barnabas'],
    correctOptionIndex: 2,
    explanation: 'James (the brother of the Lord and bishop of Jerusalem) delivered the final apostolic ruling regarding Gentile believers and Mosaic law in Acts 15:13-21.',
    keyConcept: 'The Early Church & Council of Jerusalem',
    oauExamTip: 'Peter spoke first, but James presided and pronounced the binding judgment.',
    difficulty: 'medium'
  },

  // =========================================================================
  // 10. FINANCIAL ACCOUNTING & COMMERCE
  // =========================================================================
  {
    id: 'oau_acc_pu_01',
    subjectId: 'accounting',
    subjectName: 'Financial Accounting & Commerce',
    year: 'Official Archive',
    topic: 'Warehousing & Foreign Trade',
    questionText: 'Imported cargo discharged at seaports on which customs and excise import duties have not yet been settled are legally stored in a:',
    options: ['Ordinary warehouse', 'Public warehouse', 'Private storage silo', 'Bonded warehouse'],
    correctOptionIndex: 3,
    explanation: 'A bonded warehouse is a secured building licensed by customs authorities where dutiable imported goods are stored until customs tariffs are paid or the goods are re-exported.',
    keyConcept: 'Types of Warehouses in International Trade',
    oauExamTip: 'Goods in a bonded warehouse are said to be "in bond".',
    difficulty: 'easy'
  },
  {
    id: 'oau_acc_pu_02',
    subjectId: 'accounting',
    subjectName: 'Financial Accounting & Commerce',
    year: 'Official Archive',
    topic: 'Business Combinations',
    questionText: 'The commercial amalgamation or merger of two or more independent business firms engaged at the exact same stage of production is termed:',
    options: ['Vertical integration', 'Horizontal integration', 'Conglomerate merger', 'Forward integration'],
    correctOptionIndex: 1,
    explanation: 'Horizontal integration occurs when firms in the same industry at the same stage of production combine (e.g., two commercial banks merging).',
    keyConcept: 'Business Integration Types',
    oauExamTip: 'Same stage = Horizontal; Consecutive stages = Vertical; Unrelated industries = Conglomerate.',
    difficulty: 'easy'
  },
  {
    id: 'oau_acc_pu_03',
    subjectId: 'accounting',
    subjectName: 'Financial Accounting & Commerce',
    year: 'Official Archive',
    topic: 'Profitability Ratios & Accounting',
    questionText: 'If a trading firm records sales turnover of ₦15,000 and cost of goods sold of ₦10,000, calculate its gross profit margin percentage on sales:',
    options: ['23.3%', '33.3%', '50.0%', '66.7%'],
    correctOptionIndex: 1,
    explanation: 'Gross Profit = Turnover - Cost of Goods Sold = ₦15,000 - ₦10,000 = ₦5,000.\nGross Profit Margin % = (Gross Profit / Sales Turnover) × 100 = (5,000 / 15,000) × 100 = 33.33%.',
    keyConcept: 'Gross Profit Margin Computation',
    oauExamTip: 'Margin is Gross Profit over Turnover (Sales); Mark-up is Gross Profit over Cost of Goods Sold (which would be 50%).',
    difficulty: 'medium'
  }
];
