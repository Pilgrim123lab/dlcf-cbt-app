import { Question, SubjectId, SubjectInfo } from '../types';
import { getStoredCustomQuestions } from '../utils/storage';
import { EXTRACTED_POST_UTME_QUESTIONS } from './pastPostUtmeQuestions';
import { OAU_CHEMISTRY_PAST_QUESTIONS } from './oauChemistryPastQuestions';

export const SUBJECT_METADATA: Record<SubjectId, SubjectInfo> = {
  aptitude: {
    id: 'aptitude',
    name: 'General Aptitude & Reasoning',
    shortName: 'APT',
    iconName: 'BrainCircuit',
    category: 'compulsory',
    description: 'Logical reasoning, numerical sequences, spatial reasoning, verbal analogies, current affairs & OAU institutional knowledge.',
    questionCountAvailable: 35,
  },
  mathematics: {
    id: 'mathematics',
    name: 'Mathematics',
    shortName: 'MTH',
    iconName: 'Calculator',
    category: 'science',
    description: 'Calculus, algebra, trigonometry, matrices, logarithms, geometry, statistics & probability.',
    questionCountAvailable: 35,
  },
  physics: {
    id: 'physics',
    name: 'Physics',
    shortName: 'PHY',
    iconName: 'Zap',
    category: 'science',
    description: 'Mechanics, wave motion, optics, electromagnetism, modern physics & thermodynamics.',
    questionCountAvailable: 35,
  },
  chemistry: {
    id: 'chemistry',
    name: 'Chemistry',
    shortName: 'CHM',
    iconName: 'FlaskConical',
    category: 'science',
    description: 'Stoichiometry, organic chemistry, periodic trends, equilibrium, electrochemistry & gas laws.',
    questionCountAvailable: 85,
  },
  biology: {
    id: 'biology',
    name: 'Biology',
    shortName: 'BIO',
    iconName: 'Dna',
    category: 'science',
    description: 'Genetics, cell biology, ecology, human physiology, plant transport & reproduction.',
    questionCountAvailable: 35,
  },
  economics: {
    id: 'economics',
    name: 'Economics',
    shortName: 'ECO',
    iconName: 'TrendingUp',
    category: 'commercial',
    description: 'Elasticity, market structures, national income, public finance, inflation & international trade.',
    questionCountAvailable: 30,
  },
  government: {
    id: 'government',
    name: 'Government',
    shortName: 'GOV',
    iconName: 'Landmark',
    category: 'arts',
    description: 'Constitutional development in Nigeria, political systems, federalism, public administration & foreign policy.',
    questionCountAvailable: 30,
  },
  literature: {
    id: 'literature',
    name: 'Literature in English',
    shortName: 'LIT',
    iconName: 'Feather',
    category: 'arts',
    description: 'Literary appreciation, poetic devices, African prose, drama & classical world literature.',
    questionCountAvailable: 30,
  },
  crk: {
    id: 'crk',
    name: 'Christian Religious Knowledge',
    shortName: 'CRK',
    iconName: 'Cross',
    category: 'arts',
    description: 'Old Testament faith, teachings & parables of Christ, Acts of Apostles & Pauline epistles.',
    questionCountAvailable: 30,
  },
  accounting: {
    id: 'accounting',
    name: 'Financial Accounting & Commerce',
    shortName: 'ACC',
    iconName: 'Receipt',
    category: 'commercial',
    description: 'Double entry system, trial balance, depreciation, trade documents, banking & business management.',
    questionCountAvailable: 30,
  },
};

export const OAU_PAST_QUESTIONS: Question[] = [
  // =========================================================================
  // 1. GENERAL APTITUDE & CURRENT AFFAIRS (OAU POST-UTME COMPULSORY PAPER)
  // =========================================================================
  {
    id: 'apt_oau_01',
    subjectId: 'aptitude',
    subjectName: 'General Aptitude & Reasoning',
    year: 'OAU Post-UTME Past Question',
    topic: 'Current Affairs & Demographics',
    questionText: 'The official motto of Obafemi Awolowo University (OAU), Ile-Ife, is:',
    options: [
      'For Learning and Culture',
      'Excellence and Integrity',
      'Knowledge for Service',
      'Truth and Light',
      'Wisdom, Diligence and Character'
    ],
    correctOptionIndex: 0,
    explanation: 'The official Latin-English motto of Obafemi Awolowo University is "For Learning and Culture" (incorporating high academic erudition and cultural dignity).',
    keyConcept: 'OAU Institutional Identity',
    oauExamTip: 'OAU was established in 1961 as University of Ife, renamed in 1987 in honour of Chief Obafemi Awolowo.',
    difficulty: 'easy'
  },
  {
    id: 'apt_oau_02',
    subjectId: 'aptitude',
    subjectName: 'General Aptitude & Reasoning',
    year: 'OAU Post-UTME Past Question',
    topic: 'Current Affairs & Nigerian History',
    questionText: 'Mr. Dele Giwa was assassinated through a letter bomb on:',
    options: [
      'October 19, 1986',
      'September 17, 1987',
      'October 19, 1988',
      'September 17, 1986',
      'October 19, 1987'
    ],
    correctOptionIndex: 0,
    explanation: 'Dele Giwa, the founding editor-in-chief of Newswatch magazine, was killed by a parcel bomb in his Lagos home on October 19, 1986.',
    keyConcept: 'Nigerian Journalism History',
    oauExamTip: 'Dele Giwa parcel bomb assassination occurred on 19th October 1986.',
    difficulty: 'medium'
  },
  {
    id: 'apt_oau_03',
    subjectId: 'aptitude',
    subjectName: 'General Aptitude & Reasoning',
    year: 'OAU Post-UTME Past Question',
    topic: 'World Geography & Capitals',
    questionText: 'Victoria is the capital city of:',
    options: [
      'Somalia',
      'Morocco',
      'Seychelles',
      'Burundi',
      'Lesotho'
    ],
    correctOptionIndex: 2,
    explanation: 'Victoria is the capital city of the Republic of Seychelles, an archipelago island country in the Indian Ocean.',
    keyConcept: 'African Capitals',
    oauExamTip: 'Seychelles capital = Victoria; Lesotho capital = Maseru; Burundi capital = Gitega/Bujumbura.',
    difficulty: 'easy'
  },
  {
    id: 'apt_oau_04',
    subjectId: 'aptitude',
    subjectName: 'General Aptitude & Reasoning',
    year: 'OAU Post-UTME Past Question',
    topic: 'Verbal Reasoning & General Knowledge',
    questionText: 'Centre of Unity is to Abuja as State of Hospitality is to:',
    options: [
      'Rivers',
      'Cross River',
      'Katsina',
      'Nassarawa',
      'Sokoto'
    ],
    correctOptionIndex: 1,
    explanation: 'Abuja is officially nicknamed "Centre of Unity", while Cross River State is known as "The People\'s Paradise" / "State of Hospitality".',
    keyConcept: 'State Slogans in Nigeria',
    oauExamTip: 'Cross River = The People\'s Paradise / State of Hospitality; Katsina = Home of Hospitality.',
    difficulty: 'easy'
  },
  {
    id: 'apt_oau_05',
    subjectId: 'aptitude',
    subjectName: 'General Aptitude & Reasoning',
    year: 'OAU Post-UTME Past Question',
    topic: 'World Geography',
    questionText: 'The capital of Uruguay is:',
    options: [
      'Bangkok',
      'Montevideo',
      'Bern',
      'Manila',
      'Uru'
    ],
    correctOptionIndex: 1,
    explanation: 'Montevideo is the capital and largest city of Uruguay. Bangkok is in Thailand, Bern in Switzerland, and Manila in the Philippines.',
    keyConcept: 'Global Capitals',
    oauExamTip: 'Montevideo is located on the north-eastern bank of the Río de la Plata.',
    difficulty: 'medium'
  },
  {
    id: 'apt_oau_06',
    subjectId: 'aptitude',
    subjectName: 'General Aptitude & Reasoning',
    year: 'OAU Post-UTME Past Question',
    topic: 'International Organisations',
    questionText: 'The full meaning of UEFA is:',
    options: [
      'Union of European Federation Associations',
      'United European Football Associations',
      'Union of European Football Associations',
      'United English Football Associations',
      'Union of English Football Associations'
    ],
    correctOptionIndex: 2,
    explanation: 'UEFA stands for Union of European Football Associations.',
    keyConcept: 'Sports & International Acronyms',
    oauExamTip: 'UEFA: Union of European Football Associations, founded in 1954 in Basel, Switzerland.',
    difficulty: 'easy'
  },
  {
    id: 'apt_oau_07',
    subjectId: 'aptitude',
    subjectName: 'General Aptitude & Reasoning',
    year: 'OAU Post-UTME Past Question',
    topic: 'World Nobel Laureates',
    questionText: 'Nelson Mandela was awarded the Nobel Peace Prize in which year?',
    options: [
      '1992',
      '1993',
      '1994',
      '1995',
      '1996'
    ],
    correctOptionIndex: 1,
    explanation: 'Nelson Mandela and F.W. de Klerk jointly received the Nobel Peace Prize in 1993 for their peaceful termination of the apartheid regime in South Africa.',
    keyConcept: 'Historical Nobel Laureates',
    oauExamTip: 'Mandela won Nobel Peace Prize in 1993; became South African President in 1994.',
    difficulty: 'easy'
  },
  {
    id: 'apt_oau_08',
    subjectId: 'aptitude',
    subjectName: 'General Aptitude & Reasoning',
    year: 'OAU Post-UTME Past Question',
    topic: 'Nigerian Geography & Tourism',
    questionText: 'Ibeno Beach and the mouth of the Qua Iboe River are located in:',
    options: [
      'Lagos State',
      'Cross River State',
      'Akwa Ibom State',
      'Taraba State',
      'Niger State'
    ],
    correctOptionIndex: 2,
    explanation: 'Ibeno Beach is located in Ibeno, Akwa Ibom State. It is one of the longest sand beaches in West Africa.',
    keyConcept: 'Nigerian Coastal Geography',
    oauExamTip: 'Ibeno Beach is in Akwa Ibom; Obudu Cattle Ranch is in Cross River; Gurara Falls is in Niger State.',
    difficulty: 'easy'
  },
  {
    id: 'apt_oau_09',
    subjectId: 'aptitude',
    subjectName: 'General Aptitude & Reasoning',
    year: 'OAU Post-UTME Past Question',
    topic: 'Nigerian Political History',
    questionText: 'The June 12, 1993 Presidential election won by M.K.O. Abiola was officially annulled by General Ibrahim Babangida on:',
    options: [
      'June 12, 1993',
      'June 14, 1993',
      'June 18, 1993',
      'June 23, 1993',
      'June 27, 1993'
    ],
    correctOptionIndex: 3,
    explanation: 'General Ibrahim Badamasi Babangida issued the military decree annulling the June 12 election on June 23, 1993.',
    keyConcept: 'Third Republic Political History',
    oauExamTip: 'Election date: June 12, 1993. Military annulment announcement: June 23, 1993.',
    difficulty: 'medium'
  },
  {
    id: 'apt_oau_10',
    subjectId: 'aptitude',
    subjectName: 'General Aptitude & Reasoning',
    year: 'OAU Post-UTME Past Question',
    topic: 'African Tourism & Wildlife',
    questionText: 'The Kruger National Park, one of Africa\'s largest game reserves, is located in:',
    options: [
      'South Africa',
      'Tunisia',
      'Cameroon',
      'Poland',
      'United States'
    ],
    correctOptionIndex: 0,
    explanation: 'Kruger National Park is located in northeastern South Africa (Limpopo and Mpumalanga provinces).',
    keyConcept: 'African Geography & Reserves',
    oauExamTip: 'Kruger National Park covers an area of 19,485 square kilometres in South Africa.',
    difficulty: 'easy'
  },
  {
    id: 'apt_oau_11',
    subjectId: 'aptitude',
    subjectName: 'General Aptitude & Reasoning',
    year: 'OAU Post-UTME Past Question',
    topic: 'Nigerian Historical Monuments',
    questionText: 'Obanta\'s historic statue is located in which Nigerian town?',
    options: [
      'Abeokuta',
      'Ibadan',
      'Ogbomoso',
      'Ilorin',
      'Ijebu Ode'
    ],
    correctOptionIndex: 4,
    explanation: 'The statue of King Obanta (the legendary ancestral founder of the Ijebu Kingdom) stands prominently at the central roundabout in Ijebu Ode, Ogun State.',
    keyConcept: 'Yoruba Heritage & Royal Monuments',
    oauExamTip: 'Obanta is venerated in Ijebu Ode as the first Awujale.',
    difficulty: 'medium'
  },
  {
    id: 'apt_oau_12',
    subjectId: 'aptitude',
    subjectName: 'General Aptitude & Reasoning',
    year: 'OAU Post-UTME Past Question',
    topic: 'International Organisations',
    questionText: 'The United Nations Charter was officially signed on 26 June 1945 and entered into force on:',
    options: [
      '1 February 1946',
      '26 June 1945',
      '24 October 1945',
      '15 March 1943',
      '10 January 1939'
    ],
    correctOptionIndex: 2,
    explanation: 'The UN Charter entered into force on 24 October 1945, celebrated worldwide as United Nations Day.',
    keyConcept: 'United Nations Organization Founding',
    oauExamTip: '24 October is celebrated every year as United Nations Day.',
    difficulty: 'easy'
  },
  {
    id: 'apt_oau_13',
    subjectId: 'aptitude',
    subjectName: 'General Aptitude & Reasoning',
    year: 'OAU Post-UTME Past Question',
    topic: 'Quantitative Reasoning & Number Series',
    questionText: 'What is the next number in the series: 3, 7, 15, 31, 63, ____?',
    options: [
      '127',
      '126',
      '128',
      '95',
      '131'
    ],
    correctOptionIndex: 0,
    explanation: 'Pattern: Each term is 2 × previous + 1. 63 × 2 + 1 = 127. Alternatively, differences are 4, 8, 16, 32, 64 => 63 + 64 = 127.',
    keyConcept: 'Geometric Series & Differences',
    oauExamTip: 'Always check the successive difference between consecutive terms.',
    difficulty: 'easy'
  },
  {
    id: 'apt_oau_14',
    subjectId: 'aptitude',
    subjectName: 'General Aptitude & Reasoning',
    year: 'OAU Post-UTME Past Question',
    topic: 'Waterfalls & Landmarks in Nigeria',
    questionText: 'Gurara Falls and the Zuma Rock are located in which Nigerian State?',
    options: [
      'Niger State',
      'Anambra State',
      'Imo State',
      'Edo State',
      'Adamawa State'
    ],
    correctOptionIndex: 0,
    explanation: 'Gurara Waterfalls is situated in Gurara Local Government Area of Niger State along the Suleja-Minna road.',
    keyConcept: 'Nigerian Geography',
    oauExamTip: 'Gurara Falls, Kainji Dam, and Shiroro Dam are all in Niger State.',
    difficulty: 'easy'
  },

  // =========================================================================
  // 2. BIOLOGY (OAU POST-UTME BIOLOGY PAPER)
  // =========================================================================
  {
    id: 'bio_oau_01',
    subjectId: 'biology',
    subjectName: 'Biology',
    year: 'OAU Post-UTME Past Question',
    topic: 'Cellular Respiration & Muscle Physiology',
    questionText: 'The muscle cell fluid of an athlete was tested immediately after a 100m race and was found to contain a high concentration of lactic acid. What caused this?',
    options: [
      'The athlete must have eaten food containing lactic acid',
      'The athlete must have injected lactic acid into his blood just before the race',
      'The athlete must have carried out anaerobic respiration during the race',
      'The athlete must have inhaled lactic acid from the environment during the race'
    ],
    correctOptionIndex: 2,
    explanation: 'During vigorous sprint activities, oxygen supply to muscle tissues becomes insufficient (oxygen debt). Muscle cells break down glucose anaerobically to yield ATP and lactic acid: C6H12O6 -> 2 C3H6O3 + Energy.',
    keyConcept: 'Anaerobic respiration and oxygen debt in skeletal muscle',
    oauExamTip: 'Anaerobic respiration in animals yields lactic acid; in yeast/plants it yields ethanol and CO2.',
    difficulty: 'easy'
  },
  {
    id: 'bio_oau_02',
    subjectId: 'biology',
    subjectName: 'Biology',
    year: 'OAU Post-UTME Past Question',
    topic: 'Genetics & Variation',
    questionText: 'Which one of the following is NOT an example of continuous variation?',
    options: [
      'Height',
      'Weight',
      'Tongue rolling',
      'Skin colour'
    ],
    correctOptionIndex: 2,
    explanation: 'Tongue rolling is a discontinuous variation (either you can roll your tongue or you cannot—distinct discrete categories). Height, weight, and skin colour show a continuous range of phenotypes governed by polygenic inheritance.',
    keyConcept: 'Discontinuous vs Continuous variation',
    oauExamTip: 'ABO blood group, tongue rolling, and fingerprints are discontinuous; height and weight are continuous.',
    difficulty: 'easy'
  },
  {
    id: 'bio_oau_03',
    subjectId: 'biology',
    subjectName: 'Biology',
    year: 'OAU Post-UTME Past Question',
    topic: 'Plant Physiology & Transport',
    questionText: 'The primary function of root hairs in flowering plants is:',
    options: [
      'Strength and mechanical support',
      'Conducting photosynthetic liquid',
      'Absorption of water and mineral salts from the soil',
      'Penetration deep into the hard soil'
    ],
    correctOptionIndex: 2,
    explanation: 'Root hairs are elongated epidermal cell outgrowths that greatly increase the surface area for the absorption of water (by osmosis) and mineral salts (by active transport).',
    keyConcept: 'Root absorption mechanisms',
    oauExamTip: 'Root hairs are extensions of the piliferous layer (epiblema).',
    difficulty: 'easy'
  },
  {
    id: 'bio_oau_04',
    subjectId: 'biology',
    subjectName: 'Biology',
    year: 'OAU Post-UTME Past Question',
    topic: 'Cell Biology & Cytology',
    questionText: 'In a living eukaryotic cell, the genes are located on and carried by:',
    options: [
      'Nuclear membrane',
      'Chromatin threads',
      'Lysosomes',
      'Mitochondria'
    ],
    correctOptionIndex: 1,
    explanation: 'Genes are specific nucleotide sequences on DNA molecules packaged inside the nucleus as chromatin threads/chromosomes.',
    keyConcept: 'Chromosomes and gene locus',
    oauExamTip: 'Chromatin condenses into distinct chromosomes during cell division (mitosis/meiosis).',
    difficulty: 'easy'
  },
  {
    id: 'bio_oau_05',
    subjectId: 'biology',
    subjectName: 'Biology',
    year: 'OAU Post-UTME Past Question',
    topic: 'Circulatory System',
    questionText: 'The primary chamber responsible for pumping oxygenated blood into the aorta for systemic circulation in mammals is the:',
    options: [
      'Veins',
      'Right auricle',
      'Arteries',
      'Left ventricle'
    ],
    correctOptionIndex: 3,
    explanation: 'The left ventricle has the thickest muscular wall because it must generate enough systolic pressure to pump oxygenated blood through the aorta to the entire systemic circulation.',
    keyConcept: 'Mammalian heart anatomy and blood flow',
    oauExamTip: 'Left ventricle -> systemic circulation (high pressure); Right ventricle -> pulmonary artery (lungs).',
    difficulty: 'easy'
  },
  {
    id: 'bio_oau_06',
    subjectId: 'biology',
    subjectName: 'Biology',
    year: 'OAU Post-UTME Past Question',
    topic: 'Cell Organelles',
    questionText: 'Ribosomes are found in all living cells. What is their primary biochemical function?',
    options: [
      'Cellular aerobic respiration',
      'Synthesis of proteins',
      'Excretion of nitrogenous waste products',
      'Intracellular lipid transport'
    ],
    correctOptionIndex: 1,
    explanation: 'Ribosomes are the sites of protein synthesis (translation) where messenger RNA codons are translated into polypeptide chains.',
    keyConcept: 'Ribosomes and translation',
    oauExamTip: 'Ribosomes = Protein synthesis; Mitochondria = ATP synthesis/cellular respiration; Golgi = packaging.',
    difficulty: 'easy'
  },
  {
    id: 'bio_oau_07',
    subjectId: 'biology',
    subjectName: 'Biology',
    year: 'OAU Post-UTME Past Question',
    topic: 'Plant Ecology & Adaptations',
    questionText: 'Plants that are specifically adapted to grow in arid environments where water availability is very low are termed:',
    options: [
      'Halophytes',
      'Hydrophytes',
      'Xerophytes',
      'Mesophytes'
    ],
    correctOptionIndex: 2,
    explanation: 'Xerophytes (such as cacti, Aloe, acacia) possess adaptations like thick waxy cuticles, sunken stomata, succulent stems, and reduced leaves to conserve water in arid zones.',
    keyConcept: 'Ecological plant adaptations',
    oauExamTip: 'Hydrophytes = aquatic; Halophytes = saline/mangrove; Xerophytes = dry/desert; Mesophytes = moderate moisture.',
    difficulty: 'easy'
  },
  {
    id: 'bio_oau_08',
    subjectId: 'biology',
    subjectName: 'Biology',
    year: 'OAU Post-UTME Past Question',
    topic: 'Endocrine System & Hormonal Control',
    questionText: 'What immediate physiological effect occurs in a patient whose pancreas has been surgically removed?',
    options: [
      'The level of blood sugar would increase significantly',
      'The glycogen content of the liver would increase',
      'His blood pressure would drop to zero',
      'His body weight would increase rapidly'
    ],
    correctOptionIndex: 0,
    explanation: 'The beta cells of the Islets of Langerhans in the pancreas secrete insulin, which lowers blood glucose by converting it to glycogen. Removal of the pancreas prevents insulin production, causing severe hyperglycemia (elevated blood sugar).',
    keyConcept: 'Insulin and blood glucose regulation',
    oauExamTip: 'Insulin lowers blood sugar (glucose -> glycogen); Glucagon raises blood sugar (glycogen -> glucose).',
    difficulty: 'medium'
  },
  {
    id: 'bio_oau_09',
    subjectId: 'biology',
    subjectName: 'Biology',
    year: 'OAU Post-UTME Past Question',
    topic: 'Excretory Systems in Invertebrates',
    questionText: 'In insects, the primary excretory organ that performs a function analogous to the human kidney is the:',
    options: [
      'Nephridium',
      'Flame cell',
      'Malpighian tubule',
      'Trachea'
    ],
    correctOptionIndex: 2,
    explanation: 'Malpighian tubules in insects absorb nitrogenous wastes from hemolymph and convert them into uric acid crystals for excretion with feces.',
    keyConcept: 'Invertebrate excretory structures',
    oauExamTip: 'Insects = Malpighian tubules; Earthworm = Nephridia; Flatworm/Planaria = Flame cells; Vertebrates = Kidneys.',
    difficulty: 'easy'
  },
  {
    id: 'bio_oau_10',
    subjectId: 'biology',
    subjectName: 'Biology',
    year: 'OAU Post-UTME Past Question',
    topic: 'Biochemistry & Carbohydrate Storage',
    questionText: 'Excess carbohydrates are primarily stored in animal liver and muscle cells in the form of:',
    options: [
      'Glycogen',
      'Glucose',
      'Maltose',
      'Starch'
    ],
    correctOptionIndex: 0,
    explanation: 'Animals store glucose as glycogen (animal starch), mainly in the liver and skeletal muscles. Plants store excess glucose as starch.',
    keyConcept: 'Polysaccharides in living organisms',
    oauExamTip: 'Animal storage = Glycogen; Plant storage = Starch; Plant cell wall = Cellulose.',
    difficulty: 'easy'
  },
  {
    id: 'bio_oau_11',
    subjectId: 'biology',
    subjectName: 'Biology',
    year: 'OAU Post-UTME Past Question',
    topic: 'Nervous System',
    questionText: 'In mammals, the autonomic nervous system is subdivided into the:',
    options: [
      'Sympathetic and parasympathetic systems',
      'Brain and spinal nerves',
      'Brain and cranial nerves',
      'Spinal cord and sensory receptors'
    ],
    correctOptionIndex: 0,
    explanation: 'The autonomic nervous system controls involuntary visceral activities and consists of the sympathetic (fight-or-flight) and parasympathetic (rest-and-digest) divisions.',
    keyConcept: 'Autonomic nervous system divisions',
    oauExamTip: 'Sympathetic prepares for emergency (accelerates heart rate); Parasympathetic restores normalcy.',
    difficulty: 'easy'
  },
  {
    id: 'bio_oau_12',
    subjectId: 'biology',
    subjectName: 'Biology',
    year: 'OAU Post-UTME Past Question',
    topic: 'Digestive System',
    questionText: 'What is the correct sequential order of food passage through the mammalian lower gastrointestinal tract?',
    options: [
      'Ileum -> Cecum -> Colon -> Rectum',
      'Ileum -> Colon -> Cecum -> Rectum',
      'Colon -> Ileum -> Cecum -> Rectum',
      'Colon -> Cecum -> Ileum -> Rectum'
    ],
    correctOptionIndex: 0,
    explanation: 'Digested chyme moves from the small intestine (ileum) through the ileocecal valve into the cecum, ascends/traverses the colon (large intestine), and enters the rectum for storage before egestion.',
    keyConcept: 'Gastrointestinal anatomical sequence',
    oauExamTip: 'Small intestine: Duodenum -> Jejunum -> Ileum. Large intestine: Cecum -> Colon -> Rectum -> Anus.',
    difficulty: 'medium'
  },

  // =========================================================================
  // 3. CHEMISTRY (OAU POST-UTME CHEMISTRY PAPER)
  // =========================================================================
  {
    id: 'chm_oau_01',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU Post-UTME Past Question',
    topic: 'Organic Chemistry Fundamentals',
    questionText: 'Organic Chemistry is broadly defined as the chemistry of compounds containing which key elements?',
    options: [
      'Hydrogen and oxygen only',
      'Carbon and Carbon only',
      'Carbon and Sulphur',
      'Carbon and Hydrogen'
    ],
    correctOptionIndex: 3,
    explanation: 'Organic chemistry deals essentially with hydrocarbons and their derivatives—compounds containing carbon and hydrogen covalently bonded.',
    keyConcept: 'Definition of Organic Chemistry and Hydrocarbons',
    oauExamTip: 'Carbon\'s unique ability to catenate (form long chains and rings) is the foundation of organic chemistry.',
    difficulty: 'easy'
  },
  {
    id: 'chm_oau_02',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU Post-UTME Past Question',
    topic: 'Salts & Acid-Base Chemistry',
    questionText: 'Which of the following chemical compounds is an acidic salt?',
    options: [
      'NaHSO4',
      'Na2SO4',
      'CH3COONa',
      'Na2S'
    ],
    correctOptionIndex: 0,
    explanation: 'NaHSO4 (Sodium hydrogen tetraoxosulphate(VI)) is an acid salt because it still contains replaceable hydrogen ions from the parent diprotic acid H2SO4.',
    keyConcept: 'Types of salts (Normal, Acidic, Basic, Double)',
    oauExamTip: 'Acid salts contain replaceable hydrogen (e.g. NaHSO4, NaHCO3, KH2PO4).',
    difficulty: 'easy'
  },
  {
    id: 'chm_oau_03',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU Post-UTME Past Question',
    topic: 'Stoichiometry & Mole Concept',
    questionText: 'Given the molar mass of Fe = 56 g/mol and O = 16 g/mol, how many moles of iron(III) oxide (Fe2O3) are contained in 1.0 kg of the pure compound?',
    options: [
      '12.50 moles',
      '0.625 moles',
      '25.00 moles',
      '6.25 moles'
    ],
    correctOptionIndex: 3,
    explanation: 'Molar mass of Fe2O3 = (2 × 56) + (3 × 16) = 112 + 48 = 160 g/mol. \nMass = 1.0 kg = 1000 g. \nMoles = 1000 / 160 = 6.25 moles.',
    keyConcept: 'Mole concept calculation',
    oauExamTip: 'Always convert kilograms to grams (1 kg = 1000 g) before dividing by molar mass in g/mol.',
    difficulty: 'medium'
  },
  {
    id: 'chm_oau_04',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU Post-UTME Past Question',
    topic: 'Gases & Fossil Fuels',
    questionText: 'The principal chemical constituent of natural gas is:',
    options: [
      'Methane (CH4)',
      'Ethane (C2H6)',
      'Propane (C3H8)',
      'Butane (C4H10)'
    ],
    correctOptionIndex: 0,
    explanation: 'Methane (CH4) makes up between 70% and 90% of raw natural gas.',
    keyConcept: 'Composition of natural gas and petroleum fractions',
    oauExamTip: 'Natural gas = Methane; Bottled cooking gas (LPG) = Propane and Butane.',
    difficulty: 'easy'
  },
  {
    id: 'chm_oau_05',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU Post-UTME Past Question',
    topic: 'Separation of Mixtures',
    questionText: 'A mixture of table sugar (sucrose) and elemental sulphur powder can be cleanly separated by:',
    options: [
      'Dissolution in water, evaporation and filtration',
      'Filtration, evaporation and dissolution in water',
      'Dissolution in water, filtration, and evaporation to dryness',
      'Evaporation, dissolution in water and filtration'
    ],
    correctOptionIndex: 2,
    explanation: 'Sugar dissolves readily in water while sulphur is insoluble. Adding water dissolves the sugar; filtering leaves sulphur residue on filter paper; evaporating the filtrate crystallizes the pure sugar.',
    keyConcept: 'Separation techniques based on solubility differences',
    oauExamTip: 'Solvent extraction: Use water to dissolve sugar, or carbon disulfide (CS2) to dissolve sulphur.',
    difficulty: 'easy'
  },
  {
    id: 'chm_oau_06',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU Post-UTME Past Question',
    topic: 'Chemical Bonding & Intermolecular Forces',
    questionText: 'The weakest intermolecular attractive force observed between non-polar molecules is:',
    options: [
      'Ionic bond',
      'Covalent bond',
      'Coordinate dative bond',
      'Van der Waals forces'
    ],
    correctOptionIndex: 3,
    explanation: 'Van der Waals (London dispersion) forces arise from temporary dipole moments and are much weaker than covalent, ionic, or hydrogen bonds.',
    keyConcept: 'Intermolecular vs Intramolecular forces',
    oauExamTip: 'Order of strength: Covalent/Ionic > Hydrogen bonding > Dipole-dipole > Van der Waals forces.',
    difficulty: 'easy'
  },
  {
    id: 'chm_oau_07',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU Post-UTME Past Question',
    topic: 'Organic Reagents & Functional Groups',
    questionText: 'Lucas reagent (a solution of anhydrous ZnCl2 in concentrated HCl) is used in the organic laboratory to classify:',
    options: [
      'Alkanes',
      'Alkanoic acids',
      'Alkanols (Primary, Secondary, Tertiary)',
      'Amines'
    ],
    correctOptionIndex: 2,
    explanation: 'Lucas reagent differentiates primary, secondary, and tertiary alcohols based on the speed of alkyl chloride cloudiness formation (tertiary reacts immediately, secondary in 5 minutes, primary not at room temperature).',
    keyConcept: 'Lucas test for alcohols',
    oauExamTip: 'Lucas reagent = ZnCl2 + conc. HCl -> differentiates 1°, 2°, and 3° alkanols.',
    difficulty: 'medium'
  },
  {
    id: 'chm_oau_08',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU Post-UTME Past Question',
    topic: 'Gas Laws',
    questionText: 'At 25°C (298 K) and 1.0 atm, a gas occupies a volume of 1.50 dm³. What volume will it occupy at 100°C (373 K) under the same constant pressure of 1.0 atm?',
    options: [
      '1.88 dm³',
      '6.00 dm³',
      '18.80 dm³',
      '60.0 dm³'
    ],
    correctOptionIndex: 0,
    explanation: 'Using Charles\'s Law: V1 / T1 = V2 / T2 \n1.50 / 298 = V2 / 373 \nV2 = (1.50 × 373) / 298 = 559.5 / 298 = 1.877 dm³ ≈ 1.88 dm³.',
    keyConcept: 'Charles\'s Law and absolute Kelvin temperature',
    oauExamTip: 'Always convert Celsius to Kelvin: T(K) = θ(°C) + 273.',
    difficulty: 'medium'
  },
  {
    id: 'chm_oau_09',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU Post-UTME Past Question',
    topic: 'Redox & Oxidation Numbers',
    questionText: 'In which of the following chemical species is the oxidation number of chlorine equal to +1?',
    options: [
      'KClO3',
      'Cl2O7',
      'ZnCl2',
      'NaClO'
    ],
    correctOptionIndex: 3,
    explanation: 'In NaClO: Na = +1, O = -2. \n(+1) + Cl + (-2) = 0 => Cl - 1 = 0 => Cl = +1. \nIn KClO3, Cl = +5; in Cl2O7, Cl = +7; in ZnCl2, Cl = -1.',
    keyConcept: 'Oxidation state determination rules',
    oauExamTip: 'Hypochlorite ion (ClO⁻) has chlorine in the +1 oxidation state.',
    difficulty: 'easy'
  },
  {
    id: 'chm_oau_10',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU Post-UTME Past Question',
    topic: 'Metallurgy & Minerals',
    questionText: 'Cassiterite (tinstone, SnO2) is the principal ore from which which metal is extracted in Nigeria (notably in Jos, Plateau State)?',
    options: [
      'Calcium',
      'Copper',
      'Tin',
      'Sodium'
    ],
    correctOptionIndex: 2,
    explanation: 'Cassiterite is tin dioxide (SnO2), the primary ore of tin metal (Sn). Mining in Nigeria is historically concentrated on the Jos Plateau.',
    keyConcept: 'Ores and extraction of metals',
    oauExamTip: 'Bauxite = Aluminium ore; Haematite/Magnetite = Iron ore; Cassiterite = Tin ore; Galena = Lead ore.',
    difficulty: 'easy'
  },
  {
    id: 'chm_oau_11',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU Post-UTME Past Question',
    topic: 'Periodic Trends',
    questionText: 'Which of the following elemental periodic properties increases steadily down a group in the Periodic Table?',
    options: [
      'Atomic radius',
      'Electronegativity',
      'Electron affinity',
      'First ionization energy'
    ],
    correctOptionIndex: 0,
    explanation: 'Down a group, extra electron shells are added, increasing the distance between the nucleus and valence electrons, thus atomic radius increases. Ionization energy and electronegativity decrease.',
    keyConcept: 'Periodic trends down a group',
    oauExamTip: 'Down a group: Atomic radius increases; Ionization energy, Electronegativity, and Electron Affinity decrease.',
    difficulty: 'easy'
  },
  {
    id: 'chm_oau_12',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU Post-UTME Past Question',
    topic: 'Volumetric Analysis & Molarity',
    questionText: 'What mass of pure sodium hydroxide (NaOH, molar mass = 40 g/mol) is required to prepare 500 cm³ of a 0.20 M standard solution?',
    options: [
      '40 g',
      '20 g',
      '10 g',
      '4.0 g'
    ],
    correctOptionIndex: 3,
    explanation: 'Moles of NaOH = Molarity × Volume (dm³) = 0.20 mol/dm³ × (500 / 1000 dm³) = 0.20 × 0.50 = 0.10 mol. \nMass = Moles × Molar Mass = 0.10 mol × 40 g/mol = 4.0 g.',
    keyConcept: 'Molarity and mass concentration',
    oauExamTip: 'Formula: Mass = Molarity (M) × Volume (dm³) × Molar mass (g/mol).',
    difficulty: 'medium'
  },

  // =========================================================================
  // 4. MATHEMATICS (OAU POST-UTME MATHEMATICS PAPER)
  // =========================================================================
  {
    id: 'mth_oau_01',
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    year: 'OAU Post-UTME Past Question',
    topic: 'Indices and Fractional Powers',
    questionText: 'Without using mathematical tables or a calculator, evaluate: (243)^(1/5) × (0.09)^(-1) × (125)^(-2/3)',
    options: [
      '4',
      '3/4',
      '3',
      '4/3'
    ],
    correctOptionIndex: 3,
    explanation: '(243)^(1/5) = (3^5)^(1/5) = 3 \n(0.09)^(-1) = (9/100)^(-1) = 100/9 \n(125)^(-2/3) = ((5^3)^(1/3))^(-2) = 5^(-2) = 1/25 \nExpression = 3 × (100/9) × (1/25) = (3 × 100) / (9 × 25) = 300 / 225 = 4/3.',
    keyConcept: 'Laws of indices and negative fractional exponents',
    oauExamTip: 'Express decimals as fractions first: 0.09 = 9/100. (9/100)^-1 = 100/9.',
    difficulty: 'medium'
  },
  {
    id: 'mth_oau_02',
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    year: 'OAU Post-UTME Past Question',
    topic: 'Consecutive Integers & Quadratic Equations',
    questionText: 'Three consecutive positive integers a, b, and c (where a < b < c) are such that b² = 4(a + c). Find the value of c.',
    options: [
      '6',
      '3',
      '9',
      '5'
    ],
    correctOptionIndex: 2,
    explanation: 'Let consecutive integers be: a = b - 1, and c = b + 1. \nThen a + c = (b - 1) + (b + 1) = 2b. \nGiven: b² = 4(2b) = 8b => b² - 8b = 0. \nSince b is positive, b = 8. \nTherefore, c = b + 1 = 8 + 1 = 9.',
    keyConcept: 'Algebraic modeling with consecutive integers',
    oauExamTip: 'Express terms symmetrically around b: a = b-1 and c = b+1 so a+c = 2b.',
    difficulty: 'medium'
  },
  {
    id: 'mth_oau_03',
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    year: 'OAU Post-UTME Past Question',
    topic: 'Simple Interest & Commercial Math',
    questionText: 'Find the principal sum which amounts to ₦4,400 at simple interest in 5 years at an interest rate of 2% per annum.',
    options: [
      '₦3,800',
      '₦5,200',
      '₦5,000',
      '₦4,000'
    ],
    correctOptionIndex: 3,
    explanation: 'Amount A = P(1 + RT/100). \n4400 = P(1 + (2 × 5)/100) = P(1 + 10/100) = P(1.10). \nP = 4400 / 1.10 = ₦4,000.',
    keyConcept: 'Simple interest amount formula',
    oauExamTip: 'Amount = Principal + Interest = P(1 + RT/100).',
    difficulty: 'easy'
  },
  {
    id: 'mth_oau_04',
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    year: 'OAU Post-UTME Past Question',
    topic: 'Geometric Progression (GP)',
    questionText: 'The sum of the first 20 terms of the geometric progression 3, 6, 12, 24, ... is:',
    options: [
      '3(2²¹ - 1)',
      '3(2²⁰ - 1)',
      '3(2²⁰ + 1)',
      '3(2²¹ + 1)'
    ],
    correctOptionIndex: 1,
    explanation: 'First term a = 3, common ratio r = 6/3 = 2. \nSum formula Sn = a(rⁿ - 1) / (r - 1). \nS20 = 3(2²⁰ - 1) / (2 - 1) = 3(2²⁰ - 1).',
    keyConcept: 'Sum of n terms of a Geometric Progression',
    oauExamTip: 'For r > 1, Sn = a(rⁿ - 1) / (r - 1). Here denominator is 2 - 1 = 1.',
    difficulty: 'easy'
  },
  {
    id: 'mth_oau_05',
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    year: 'OAU Post-UTME Past Question',
    topic: 'Geometric Progression - Terms',
    questionText: 'The second and fifth terms of a geometric progression are 21 and 567 respectively. Find the first term (a) and common ratio (r).',
    options: [
      'a = 3, r = 7',
      'a = 7, r = 3',
      'a = -7, r = 3',
      'a = -3, r = 7'
    ],
    correctOptionIndex: 1,
    explanation: 'T2 = ar = 21 \nT5 = ar⁴ = 567 \nDivide T5 by T2: (ar⁴)/(ar) = r³ = 567 / 21 = 27 => r = 3. \nThen a = 21 / 3 = 7.',
    keyConcept: 'Finding terms and ratio in GP',
    oauExamTip: 'T5 / T2 = r^(5-2) = r³. Solve for r, then substitute to get a.',
    difficulty: 'easy'
  },
  {
    id: 'mth_oau_06',
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    year: 'OAU Post-UTME Past Question',
    topic: 'Linear Inequalities',
    questionText: 'List all the integer values of x which satisfy the compound inequality: -2 < 7 - 3x ≤ 10',
    options: [
      '-1, 0, 1, 2',
      '-2, 0, 1',
      '1, 2, 3',
      '0, 1, 2'
    ],
    correctOptionIndex: 0,
    explanation: 'Subtract 7 throughout: -2 - 7 < -3x ≤ 10 - 7 => -9 < -3x ≤ 3. \nDivide by -3 (reverses inequality signs): 3 > x ≥ -1, or -1 ≤ x < 3. \nIntegral values = {-1, 0, 1, 2}.',
    keyConcept: 'Compound inequalities and division by negative numbers',
    oauExamTip: 'Remember that multiplying or dividing an inequality by a negative number flips the inequality signs.',
    difficulty: 'medium'
  },
  {
    id: 'mth_oau_07',
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    year: 'OAU Post-UTME Past Question',
    topic: 'Set Theory & Venn Diagrams',
    questionText: 'In a class of 120 students, each speaks English or French or both. If 70 speak English and 55 speak French, how many speak English only (not French)?',
    options: [
      '45',
      '50',
      '65',
      '60'
    ],
    correctOptionIndex: 2,
    explanation: 'n(E ∪ F) = n(E) + n(F) - n(E ∩ F) \n120 = 70 + 55 - n(E ∩ F) => n(E ∩ F) = 125 - 120 = 5. \nStudents speaking English only = Total English - Both = 70 - 5 = 65.',
    keyConcept: 'Two-set Venn diagram calculations',
    oauExamTip: 'English only = Total English - Intersection.',
    difficulty: 'easy'
  },
  {
    id: 'mth_oau_08',
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    year: 'OAU Post-UTME Past Question',
    topic: 'Pythagoras Theorem & Geometry',
    questionText: 'The lengths of the sides of a right-angled triangle are y m, (3y - 1) m, and hypotenuse (3y + 1) m. Find the value of y.',
    options: [
      '12',
      '9',
      '8',
      '4'
    ],
    correctOptionIndex: 0,
    explanation: 'By Pythagoras theorem: (3y + 1)² = (3y - 1)² + y² \n9y² + 6y + 1 = 9y² - 6y + 1 + y² \n6y = -6y + y² => y² - 12y = 0. \nSince y > 0, y = 12.',
    keyConcept: 'Pythagoras theorem in right-angled triangles',
    oauExamTip: 'Difference of squares: (3y+1)² - (3y-1)² = 4(3y)(1) = 12y. So y² = 12y => y = 12.',
    difficulty: 'medium'
  },
  {
    id: 'mth_oau_09',
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    year: 'OAU Post-UTME Past Question',
    topic: 'Polynomial Factor Theorem',
    questionText: 'If (x + 1) is a factor of the polynomial P(x) = x³ + 3x² + Kx + 4, find the numerical value of constant K.',
    options: [
      '6',
      '4',
      '-4',
      '3'
    ],
    correctOptionIndex: 0,
    explanation: 'By Factor Theorem, if (x + 1) is a factor, then P(-1) = 0. \n(-1)³ + 3(-1)² + K(-1) + 4 = 0 \n-1 + 3(1) - K + 4 = 0 \n6 - K = 0 => K = 6.',
    keyConcept: 'Factor theorem for algebraic polynomials',
    oauExamTip: 'Set x + 1 = 0 => x = -1. Substitute x = -1 into polynomial and equate to zero.',
    difficulty: 'easy'
  },
  {
    id: 'mth_oau_10',
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    year: 'OAU Post-UTME Past Question',
    topic: 'Sum to Infinity of Geometric Series',
    questionText: 'Find the sum to infinity (S∞) of the geometric series: 3 + 2 + 4/3 + 8/9 + 16/27 + ...',
    options: [
      '270',
      '9',
      '27',
      '90'
    ],
    correctOptionIndex: 1,
    explanation: 'First term a = 3. Common ratio r = 2/3. \nSince |r| < 1, sum to infinity S∞ = a / (1 - r) = 3 / (1 - 2/3) = 3 / (1/3) = 9.',
    keyConcept: 'Sum to infinity of convergent GP',
    oauExamTip: 'S∞ = a / (1 - r). Valid only when -1 < r < 1.',
    difficulty: 'easy'
  },
  {
    id: 'mth_oau_11',
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    year: 'OAU Post-UTME Past Question',
    topic: 'Coordinate Geometry & Parallel Lines',
    questionText: 'Find the value of p if the line passing through (-1, -p) and (-2p, 2) is parallel to the line 2y + 8x - 17 = 0.',
    options: [
      '6/7',
      '4/7',
      '2/5',
      '-6/7'
    ],
    correctOptionIndex: 0,
    explanation: 'Slope of 2y = -8x + 17 is m = -8/2 = -4. \nSlope of line joining points: (2 - (-p)) / (-2p - (-1)) = (2 + p) / (1 - 2p). \nSet (2 + p) / (1 - 2p) = -4 => 2 + p = -4(1 - 2p) = -4 + 8p. \n2 + 4 = 8p - p => 7p = 6 => p = 6/7.',
    keyConcept: 'Slopes of parallel lines',
    oauExamTip: 'Parallel lines have equal slopes: m1 = m2.',
    difficulty: 'medium'
  },
  {
    id: 'mth_oau_12',
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    year: 'OAU Post-UTME Past Question',
    topic: 'Differential Calculus - Extrema',
    questionText: 'Find the maximum value of the polynomial function f(x) = x³ - 12x + 11 on the real line.',
    options: [
      '-15',
      '27',
      '15',
      '20'
    ],
    correctOptionIndex: 1,
    explanation: 'f\'(x) = 3x² - 12 = 0 => x² = 4 => x = ±2. \nf\'\'(x) = 6x. \nAt x = -2, f\'\'(-2) = -12 < 0 (Maximum). \nMaximum value f(-2) = (-2)³ - 12(-2) + 11 = -8 + 24 + 11 = 27.',
    keyConcept: 'First and second derivative tests for turning points',
    oauExamTip: 'Substitute the critical point x = -2 into the original function f(x) to obtain the maximum value.',
    difficulty: 'medium'
  },

  // =========================================================================
  // 5. PHYSICS (OAU POST-UTME PHYSICS PAPER)
  // =========================================================================
  {
    id: 'phy_oau_01',
    subjectId: 'physics',
    subjectName: 'Physics',
    year: 'OAU Post-UTME Past Question',
    topic: 'Dimensions of Physical Quantities',
    questionText: 'What is the correct dimensional formula for linear velocity?',
    options: [
      'ML',
      'LT⁻¹',
      'MT',
      'L⁻²',
      'M³L⁻¹'
    ],
    correctOptionIndex: 1,
    explanation: 'Velocity = displacement / time = [L] / [T] = LT⁻¹.',
    keyConcept: 'Dimensional analysis fundamentals',
    oauExamTip: 'Velocity = LT⁻¹; Acceleration = LT⁻²; Force = MLT⁻²; Energy/Work = ML²T⁻².',
    difficulty: 'easy'
  },
  {
    id: 'phy_oau_02',
    subjectId: 'physics',
    subjectName: 'Physics',
    year: 'OAU Post-UTME Past Question',
    topic: 'Vectors & Resolution of Velocity',
    questionText: 'A vehicle moves with a velocity of 20 m/s at an angle of 30° to the horizontal. What is the magnitude of its horizontal velocity component?',
    options: [
      '17.3 m/s',
      '10 m/s',
      '20 m/s',
      '21 m/s',
      '34 m/s'
    ],
    correctOptionIndex: 0,
    explanation: 'Vx = V × cos(θ) = 20 × cos(30°) = 20 × (√3 / 2) = 10√3 ≈ 17.32 m/s.',
    keyConcept: 'Resolution of vectors into orthogonal components',
    oauExamTip: 'Horizontal component = V cos θ; Vertical component = V sin θ.',
    difficulty: 'easy'
  },
  {
    id: 'phy_oau_03',
    subjectId: 'physics',
    subjectName: 'Physics',
    year: 'OAU Post-UTME Past Question',
    topic: 'Linear Momentum & Inelastic Collisions',
    questionText: 'A bullet of mass 20 g (0.02 kg) travelling horizontally at 100 m/s embeds itself in the centre of a stationary block of wood of mass 1.0 kg suspended by a light string. Calculate the common velocity immediately after impact.',
    options: [
      '51/100 m/s',
      '100/51 m/s',
      '101/50 m/s',
      '21/50 m/s',
      '23/51 m/s'
    ],
    correctOptionIndex: 1,
    explanation: 'By conservation of linear momentum: m1 × u1 + m2 × u2 = (m1 + m2) × v \n(0.02 × 100) + 0 = (1.0 + 0.02) × v \n2 = 1.02 v => v = 2 / 1.02 = 200 / 102 = 100 / 51 m/s.',
    keyConcept: 'Completely inelastic collision',
    oauExamTip: 'In an inelastic collision, momentum is conserved but kinetic energy is not.',
    difficulty: 'medium'
  },
  {
    id: 'phy_oau_04',
    subjectId: 'physics',
    subjectName: 'Physics',
    year: 'OAU Post-UTME Past Question',
    topic: 'Work, Energy and Power',
    questionText: 'Starting from rest, a car of mass 1,000 kg accelerates uniformly to a velocity of 20 m/s in 10 seconds. What is the average power developed by the engine?',
    options: [
      '0.2 kW',
      '4.0 kW',
      '10 kW',
      '15 kW',
      '20 kW'
    ],
    correctOptionIndex: 4,
    explanation: 'Kinetic energy gained = 1/2 × m × v² = 0.5 × 1000 × 20² = 0.5 × 1000 × 400 = 200,000 J. \nPower = Work / time = 200,000 J / 10 s = 20,000 W = 20 kW.',
    keyConcept: 'Work-energy theorem and average power',
    oauExamTip: 'Power = Work done / Time taken = ΔKE / t.',
    difficulty: 'medium'
  },
  {
    id: 'phy_oau_05',
    subjectId: 'physics',
    subjectName: 'Physics',
    year: 'OAU Post-UTME Past Question',
    topic: 'Hydrostatics & Upthrust',
    questionText: 'A ship floating in fresh water of density 1,000 kg/m³ sails into sea-water of higher density 1,050 kg/m³ where it continues to float. What happens to the upthrust acting on the ship?',
    options: [
      'Stays constant',
      'Decreases',
      'Increases',
      'Increases by 0.05 times',
      'Decreases by 0.05 times'
    ],
    correctOptionIndex: 0,
    explanation: 'By the law of floatation, a floating body displaces its own weight of fluid. Since the ship\'s total mass/weight is unchanged, the upthrust (which equals the weight of the ship) remains exactly the same.',
    keyConcept: 'Law of Floatation and Archimedes principle',
    oauExamTip: 'For any floating object, Upthrust = Total Weight of the object (stays constant regardless of fluid density).',
    difficulty: 'medium'
  },
  {
    id: 'phy_oau_06',
    subjectId: 'physics',
    subjectName: 'Physics',
    year: 'OAU Post-UTME Past Question',
    topic: 'Electrostatics & Coulomb\'s Law',
    questionText: 'If two identical point charges of +1.0 C each are separated in air by a distance of 1.0 km (1,000 m), what is the electrostatic repulsive force between them? (Take 1 / 4πε₀ = 9 × 10⁹ N m² C⁻²)',
    options: [
      '2 kN',
      '3 kN',
      '9 kN',
      '10 kN',
      '4 kN'
    ],
    correctOptionIndex: 2,
    explanation: 'By Coulomb\'s Law: F = k × (q1 × q2) / r² \nF = (9 × 10⁹ × 1 × 1) / (1000)² = (9 × 10⁹) / 10⁶ = 9 × 10³ N = 9 kN.',
    keyConcept: 'Coulomb\'s Law of electrostatics',
    oauExamTip: '1 km = 1000 m. r² = (10³)² = 10⁶.',
    difficulty: 'easy'
  },
  {
    id: 'phy_oau_07',
    subjectId: 'physics',
    subjectName: 'Physics',
    year: 'OAU Post-UTME Past Question',
    topic: 'Current Electricity',
    questionText: 'A steady current of 0.50 A flows through a conductor wire. How much electric charge passes through a cross-section of the wire in one minute?',
    options: [
      '32 C',
      '23 C',
      '45 C',
      '12 C',
      '30 C'
    ],
    correctOptionIndex: 4,
    explanation: 'Charge Q = I × t. \nt = 1 minute = 60 seconds. \nQ = 0.50 A × 60 s = 30 C.',
    keyConcept: 'Electric current and quantity of charge',
    oauExamTip: 'Always convert time in minutes to seconds: t = 60 s.',
    difficulty: 'easy'
  },
  {
    id: 'phy_oau_08',
    subjectId: 'physics',
    subjectName: 'Physics',
    year: 'OAU Post-UTME Past Question',
    topic: 'AC Circuits & Resonance',
    questionText: 'In a series R-L-C alternating current circuit, the condition for electrical resonance is satisfied when:',
    options: [
      'XL = XC (Inductive reactance equals capacitive reactance)',
      'X = L',
      'R = C',
      'Z = R - C',
      'R / C = 0'
    ],
    correctOptionIndex: 0,
    explanation: 'At resonance, XL = XC (ωL = 1/ωC). The reactive components cancel each other out, impedance Z becomes purely resistive (Z = R) and reaches its minimum value.',
    keyConcept: 'Resonance in AC series circuits',
    oauExamTip: 'At resonance: XL = XC, Impedance Z = R (minimum), Current I is maximum.',
    difficulty: 'easy'
  },
  {
    id: 'phy_oau_09',
    subjectId: 'physics',
    subjectName: 'Physics',
    year: 'OAU Post-UTME Past Question',
    topic: 'Optics - Lens Formula',
    questionText: 'An upright, virtual image three times the size of an object is produced by a converging lens of focal length 20 cm. Calculate the object distance (u).',
    options: [
      '13.3 cm',
      '40 cm',
      '33.1 cm',
      '40.3 cm',
      '34.9 cm'
    ],
    correctOptionIndex: 0,
    explanation: 'Linear magnification m = -v/u = 3 => v = -3u (virtual image has negative image distance). \n1/f = 1/u + 1/v => 1/20 = 1/u - 1/(3u) = 2/(3u). \n3u = 40 => u = 40 / 3 = 13.33 cm.',
    keyConcept: 'Lens formula for virtual images in convex lenses',
    oauExamTip: 'Virtual image formed by convex lens occurs when object is placed between F and optical centre (u < f).',
    difficulty: 'medium'
  },
  {
    id: 'phy_oau_10',
    subjectId: 'physics',
    subjectName: 'Physics',
    year: 'OAU Post-UTME Past Question',
    topic: 'Projectile Motion',
    questionText: 'A ball is projected from ground level at an angle of 30° to the horizontal with an initial velocity of 40 m/s. Neglecting air resistance, calculate the total time of flight. (Take g = 10 m/s²)',
    options: [
      '2.0 s',
      '3.0 s',
      '4.0 s',
      '5.0 s'
    ],
    correctOptionIndex: 2,
    explanation: 'Time of flight T = (2 u sin θ) / g \nT = (2 × 40 × sin 30°) / 10 = (80 × 0.5) / 10 = 40 / 10 = 4.0 seconds.',
    keyConcept: 'Time of flight in projectile mechanics',
    oauExamTip: 'T = (2u sin θ) / g. For maximum height H = (u² sin² θ) / 2g. Range R = (u² sin 2θ) / g.',
    difficulty: 'easy'
  },
  {
    id: 'phy_oau_11',
    subjectId: 'physics',
    subjectName: 'Physics',
    year: 'OAU Post-UTME Past Question',
    topic: 'Quantum Physics - Photoelectric Effect',
    questionText: 'Monochromatic light of wavelength 450 nm is incident on a metal surface whose work function is 3.2 × 10⁻¹⁹ J. What is the maximum kinetic energy of emitted photoelectrons? (h = 6.6 × 10⁻³⁴ J·s, c = 3.0 × 10⁸ m/s)',
    options: [
      '0.8 × 10⁻¹⁹ J',
      '1.2 × 10⁻¹⁹ J',
      '2.4 × 10⁻¹⁹ J',
      '2.8 × 10⁻¹⁹ J',
      '3.2 × 10⁻¹⁹ J'
    ],
    correctOptionIndex: 1,
    explanation: 'Energy of photon E = hc / λ = (6.6 × 10⁻³⁴ × 3.0 × 10⁸) / (450 × 10⁻⁹) = 1.98 × 10⁻²⁵ / 4.5 × 10⁻⁷ = 4.4 × 10⁻¹⁹ J. \nK.E. max = E - W0 = 4.4 × 10⁻¹⁹ - 3.2 × 10⁻¹⁹ = 1.2 × 10⁻¹⁹ J.',
    keyConcept: 'Einstein\'s photoelectric equation',
    oauExamTip: 'E = hf = hc/λ. K.E. max = hc/λ - W0.',
    difficulty: 'medium'
  },
  {
    id: 'phy_oau_12',
    subjectId: 'physics',
    subjectName: 'Physics',
    year: 'OAU Post-UTME Past Question',
    topic: 'Capacitors and Dielectrics',
    questionText: 'A parallel plate capacitor has a capacitance of 8.0 µF with vacuum between its plates. Calculate its new capacitance when a dielectric with dielectric constant k = 5.0 completely fills the space between the plates.',
    options: [
      '2.0 µF',
      '4.0 µF',
      '40 µF',
      '50 µF',
      '1.6 µF'
    ],
    correctOptionIndex: 2,
    explanation: 'Capacitance with dielectric C = k × C0 = 5.0 × 8.0 µF = 40 µF.',
    keyConcept: 'Dielectrics and capacitance increase',
    oauExamTip: 'Dielectric increases capacitance by factor k: C = k·C₀.',
    difficulty: 'easy'
  },

  // =========================================================================
  // 6. ECONOMICS (OAU POST-UTME ECONOMICS PAPER)
  // =========================================================================
  {
    id: 'eco_oau_01',
    subjectId: 'economics',
    subjectName: 'Economics',
    year: 'OAU Post-UTME Past Question',
    topic: 'Basic Concepts - Production & Utility',
    questionText: 'Basic extractive economic activities such as agriculture, fishing, and mining are classified under:',
    options: [
      'Primary production',
      'Manufacturing production',
      'Technical production',
      'Secondary production'
    ],
    correctOptionIndex: 0,
    explanation: 'Primary production involves extracting raw materials directly from nature (farming, lumbering, mining, fishing). Secondary turns raw materials into finished goods; tertiary provides services.',
    keyConcept: 'Stages of production in economics',
    oauExamTip: 'Primary = Extraction; Secondary = Manufacturing/Construction; Tertiary = Distribution and Services.',
    difficulty: 'easy'
  },
  {
    id: 'eco_oau_02',
    subjectId: 'economics',
    subjectName: 'Economics',
    year: 'OAU Post-UTME Past Question',
    topic: 'Scarcity & Opportunity Cost',
    questionText: 'Mr. Tola needs a textbook and a scientific calculator that cost ₦70 each. If he buys the book instead of the calculator, the opportunity cost of his choice is:',
    options: [
      '₦70',
      '₦140',
      'The scientific calculator forgone',
      'The textbook bought'
    ],
    correctOptionIndex: 2,
    explanation: 'Opportunity cost is the real alternative forgone or sacrifice made when a choice is executed. By choosing the book, he sacrificed the calculator.',
    keyConcept: 'Definition of Opportunity Cost',
    oauExamTip: 'Opportunity cost is expressed in terms of goods/benefits forgone, NOT monetary cost.',
    difficulty: 'easy'
  },
  {
    id: 'eco_oau_03',
    subjectId: 'economics',
    subjectName: 'Economics',
    year: 'OAU Post-UTME Past Question',
    topic: 'Scale of Preference',
    questionText: 'In economic theory, the scale of preference is defined as:',
    options: [
      'A list of a consumer\'s wants arranged in order of priority and importance',
      'The preparation of a list of goods and services that satisfy wants',
      'The total money budget of the consumer',
      'The consumer preference for cheap lower-quality commodities'
    ],
    correctOptionIndex: 0,
    explanation: 'A scale of preference is a list of unsatisfied human wants arranged in descending order of relative importance or urgency.',
    keyConcept: 'Scale of preference and rational choice',
    oauExamTip: 'A scale of preference helps a rational consumer allocate scarce financial resources efficiently.',
    difficulty: 'easy'
  },
  {
    id: 'eco_oau_04',
    subjectId: 'economics',
    subjectName: 'Economics',
    year: 'OAU Post-UTME Past Question',
    topic: 'Definitions of Economics',
    questionText: '"Economics is a science which studies human behaviour as a relationship between ends and scarce means which have alternative uses." In this Robbins definition, "ends" refers to:',
    options: [
      'Total output',
      'Human wants',
      'Economic resources',
      'Consumer demand'
    ],
    correctOptionIndex: 1,
    explanation: 'In Lord Lionel Robbins\'s 1932 definition, "ends" refers to unlimited human wants, while "scarce means" refers to limited economic resources.',
    keyConcept: 'Lionel Robbins\'s definition of economics',
    oauExamTip: 'Ends = Wants; Scarce Means = Productive Resources.',
    difficulty: 'easy'
  },
  {
    id: 'eco_oau_05',
    subjectId: 'economics',
    subjectName: 'Economics',
    year: 'OAU Post-UTME Past Question',
    topic: 'Economic Systems',
    questionText: 'In a capitalist market economy, the fundamental economic questions of what to produce, how to produce, and for whom to produce are resolved by:',
    options: [
      'Government planning agencies',
      'The price mechanism (forces of demand and supply)',
      'Chief economic advisers',
      'National price control committees'
    ],
    correctOptionIndex: 1,
    explanation: 'In a free enterprise market economy, the invisible hand of price mechanism (interaction of demand and supply) directs resource allocation.',
    keyConcept: 'Price mechanism in market economies',
    oauExamTip: 'Market economy = Price mechanism; Planned economy = Central Planning Authority.',
    difficulty: 'easy'
  },
  {
    id: 'eco_oau_06',
    subjectId: 'economics',
    subjectName: 'Economics',
    year: 'OAU Post-UTME Past Question',
    topic: 'Utility Theory',
    questionText: 'For a free commodity (with zero monetary price), a rational consumer will continuously increase his consumption until:',
    options: [
      'His marginal utility becomes zero',
      'He attains the highest marginal utility level',
      'His marginal utility equals the price he would have paid',
      'He decides to stop arbitrarily'
    ],
    correctOptionIndex: 0,
    explanation: 'Consumer equilibrium occurs where MU = Price. Since price is zero (free good), maximum total satisfaction is reached when Marginal Utility (MU) = 0.',
    keyConcept: 'Marginal utility and consumer saturation point',
    oauExamTip: 'When Marginal Utility = 0, Total Utility reaches its maximum point.',
    difficulty: 'medium'
  },

  // =========================================================================
  // 7. GOVERNMENT (OAU POST-UTME GOVERNMENT PAPER)
  // =========================================================================
  {
    id: 'gov_oau_01',
    subjectId: 'government',
    subjectName: 'Government',
    year: 'OAU Post-UTME Past Question',
    topic: 'Constitutional History of Nigeria',
    questionText: 'The first executive president of the Federal Republic of Nigeria was:',
    options: [
      'Alhaji Shehu Shagari',
      'Alhaji Umaru Yar\'Adua',
      'Dr. Nnamdi Azikiwe',
      'General Olusegun Obasanjo'
    ],
    correctOptionIndex: 0,
    explanation: 'Alhaji Shehu Shagari became Nigeria\'s first elected Executive President under the 1979 Presidential Constitution. (Dr. Nnamdi Azikiwe was ceremonial president from 1963 to 1966).',
    keyConcept: 'Executive Presidential System in Nigeria',
    oauExamTip: '1963 First Republic = Ceremonial President (Azikiwe); 1979 Second Republic = Executive President (Shagari).',
    difficulty: 'easy'
  },
  {
    id: 'gov_oau_02',
    subjectId: 'government',
    subjectName: 'Government',
    year: 'OAU Post-UTME Past Question',
    topic: 'Creation of States in Nigeria',
    questionText: 'Nigeria became a federation of 19 states under the military regime of General Murtala Mohammed in:',
    options: [
      '1996',
      '1861',
      '1976',
      '1979'
    ],
    correctOptionIndex: 2,
    explanation: 'On February 3, 1976, General Murtala Ramat Mohammed created 7 new states, bringing the total number of Nigerian states to 19.',
    keyConcept: 'History of state creation in Nigeria',
    oauExamTip: '1967 (Gowon) = 12 states; 1976 (Murtala) = 19 states; 1987 (Babangida) = 21 states; 1991 = 30 states; 1996 (Abacha) = 36 states.',
    difficulty: 'medium'
  },
  {
    id: 'gov_oau_03',
    subjectId: 'government',
    subjectName: 'Government',
    year: 'OAU Post-UTME Past Question',
    topic: 'Political Concepts & Separation of Powers',
    questionText: 'The doctrine of the separation of powers into legislative, executive, and judicial arms was formulated and popularized by:',
    options: [
      'John Locke',
      'Karl Marx',
      'Baron de Montesquieu',
      'Thomas Hobbes'
    ],
    correctOptionIndex: 2,
    explanation: 'French political philosopher Baron de Montesquieu articulated the theory of Separation of Powers in his 1748 masterpiece "The Spirit of the Laws" to prevent tyranny.',
    keyConcept: 'Separation of Powers and Checks & Balances',
    oauExamTip: 'Separation of powers = Montesquieu; Rule of Law = A.V. Dicey; Sovereignty = Jean Bodin.',
    difficulty: 'easy'
  },
  {
    id: 'gov_oau_04',
    subjectId: 'government',
    subjectName: 'Government',
    year: 'OAU Post-UTME Past Question',
    topic: 'Forms of Government',
    questionText: 'A system of government where power is held by a few elite individuals for their own narrow interests is known as:',
    options: [
      'Monarchy',
      'Dictatorship',
      'Autocracy',
      'Oligarchy'
    ],
    correctOptionIndex: 3,
    explanation: 'Oligarchy is rule by a privileged few (wealthy or military elite). Aristocracy is rule by the best/nobility; Plutocracy is rule by the wealthy.',
    keyConcept: 'Classifications of political systems',
    oauExamTip: 'Oligarchy = Rule by few; Plutocracy = Rule by rich; Autocracy = Rule by single absolute ruler.',
    difficulty: 'easy'
  },
  {
    id: 'gov_oau_05',
    subjectId: 'government',
    subjectName: 'Government',
    year: 'OAU Post-UTME Past Question',
    topic: 'Electoral Systems & Franchise',
    questionText: 'How many Nigerian unofficial members were elected into the Legislative Council when the Elective Principle was first introduced under the Clifford Constitution of 1922?',
    options: [
      'Two',
      'Three',
      'Four (3 for Lagos, 1 for Calabar)',
      'Six'
    ],
    correctOptionIndex: 2,
    explanation: 'The 1922 Clifford Constitution introduced the elective principle for the first time in British West Africa, providing 4 elected African seats (3 for Lagos and 1 for Calabar).',
    keyConcept: '1922 Clifford Constitution elective principle',
    oauExamTip: 'Clifford Constitution (1922) gave 4 elected seats: 3 for Lagos, 1 for Calabar.',
    difficulty: 'easy'
  },

  // =========================================================================
  // 8. LITERATURE IN ENGLISH (OAU POST-UTME LITERATURE PAPER)
  // =========================================================================
  {
    id: 'lit_oau_01',
    subjectId: 'literature',
    subjectName: 'Literature in English',
    year: 'OAU Post-UTME Past Question',
    topic: 'Literary Appreciation & Terms',
    questionText: 'When literature is designed specifically to teach moral virtues and instruct its audience, it is described as:',
    options: [
      'Instructive',
      'Informative',
      'Didactic',
      'Dynamic'
    ],
    correctOptionIndex: 2,
    explanation: 'Didactic literature is writing explicitly intended to preach, instruct, or convey moral and philosophical lessons.',
    keyConcept: 'Literary purposes and styles',
    oauExamTip: 'Didactic = teaching moral lessons; Satirical = ridiculing vice to correct society.',
    difficulty: 'easy'
  },
  {
    id: 'lit_oau_02',
    subjectId: 'literature',
    subjectName: 'Literature in English',
    year: 'OAU Post-UTME Past Question',
    topic: 'Figures of Speech',
    questionText: '"Wisdom cries out in the open places and raises her voice in the public square." This expression exemplifies:',
    options: [
      'Personification',
      'Metaphor',
      'Oxymoron',
      'Ellipsis'
    ],
    correctOptionIndex: 0,
    explanation: 'Personification attributes human qualities (crying out, raising a voice) to an abstract concept (wisdom).',
    keyConcept: 'Figures of speech - Personification',
    oauExamTip: 'Personification gives living/human attributes to non-living or abstract concepts.',
    difficulty: 'easy'
  },
  {
    id: 'lit_oau_03',
    subjectId: 'literature',
    subjectName: 'Literature in English',
    year: 'OAU Post-UTME Past Question',
    topic: 'Drama & Playwrights',
    questionText: 'Who is the author/playwright of the classical satirical drama "The Importance of Being Earnest"?',
    options: [
      'Oscar Wide',
      'Oscar Wild',
      'Oscar Wilde',
      'Oscar Wade'
    ],
    correctOptionIndex: 2,
    explanation: 'The Importance of Being Earnest, A Trivial Comedy for Serious People, is a classic play by Oscar Wilde, first performed in 1895.',
    keyConcept: 'Victorian drama and British playwrights',
    oauExamTip: 'Oscar Wilde is the acclaimed Irish playwright and author of The Importance of Being Earnest.',
    difficulty: 'easy'
  },
  {
    id: 'lit_oau_04',
    subjectId: 'literature',
    subjectName: 'Literature in English',
    year: 'OAU Post-UTME Past Question',
    topic: 'Poetry Terms & Sonnets',
    questionText: 'The concluding six-line section of a traditional Petrarchan (Italian) sonnet is called a:',
    options: [
      'Septet',
      'Quatrain',
      'Sestet',
      'Octave'
    ],
    correctOptionIndex: 2,
    explanation: 'A Petrarchan sonnet consists of 14 lines divided into an opening octave (8 lines) followed by a closing sestet (6 lines).',
    keyConcept: 'Sonnet structure (Petrarchan vs Shakespearean)',
    oauExamTip: 'Petrarchan: Octave (8) + Sestet (6). Shakespearean: 3 Quatrains (4+4+4) + 1 Rhyming Couplet (2).',
    difficulty: 'easy'
  },

  // =========================================================================
  // 9. CHRISTIAN RELIGIOUS KNOWLEDGE (OAU POST-UTME CRK PAPER)
  // =========================================================================
  {
    id: 'crk_oau_01',
    subjectId: 'crk',
    subjectName: 'Christian Religious Knowledge',
    year: 'OAU Post-UTME Past Question',
    topic: 'Gospels & Parables of Christ',
    questionText: '"Render therefore to Caesar the things that are Caesar\'s, and to God the things that are God\'s." What was Caesar\'s thing in question?',
    options: [
      'Taxation / Tax tribute coin',
      'Money bag',
      'Donation',
      'Voluntary contribution',
      'Sacrificial offering'
    ],
    correctOptionIndex: 0,
    explanation: 'Jesus replied to the Pharisees concerning whether it was lawful to pay poll tax to Caesar by examining a denarius bearing Caesar\'s portrait and inscription (Matthew 22:21).',
    keyConcept: 'Christian civic duty and spiritual commitment',
    oauExamTip: 'Jesus taught that civic duties (taxes) and spiritual duties to God are both mandatory.',
    difficulty: 'easy'
  },
  {
    id: 'crk_oau_02',
    subjectId: 'crk',
    subjectName: 'Christian Religious Knowledge',
    year: 'OAU Post-UTME Past Question',
    topic: 'Pauline Epistles & Grace',
    questionText: 'According to Apostle Paul\'s Epistle to the Ephesians, salvation is a gift of God\'s grace and not of human works so that:',
    options: [
      'Christians should pray for it continuously',
      'Christians should yearn for it',
      'No one can boast about it',
      'Christians should rejoice in public',
      'Christians should seek justification by law'
    ],
    correctOptionIndex: 2,
    explanation: 'Ephesians 2:8-9 states: "For by grace you have been saved through faith, and this is not your own doing; it is the gift of God, not a result of works, so that no one may boast."',
    keyConcept: 'Salvation by grace through faith',
    oauExamTip: 'Ephesians 2:8-9: "Not of works, lest any man should boast."',
    difficulty: 'easy'
  },
  {
    id: 'crk_oau_03',
    subjectId: 'crk',
    subjectName: 'Christian Religious Knowledge',
    year: 'OAU Post-UTME Past Question',
    topic: 'Old Testament Prophets',
    questionText: 'The famous vision of the "Valley of Dry Bones" restored to life by God\'s breath through prophecy is recorded in which biblical book?',
    options: [
      'Book of Isaiah',
      'Book of Jeremiah',
      'Book of Daniel',
      'Book of Ezekiel',
      'Book of Hosea'
    ],
    correctOptionIndex: 3,
    explanation: 'Ezekiel chapter 37 records the vision of the valley of dry bones representing the whole house of Israel being restored to national and spiritual life.',
    keyConcept: 'Ezekiel\'s vision of dry bones and restoration of Israel',
    oauExamTip: 'Ezekiel 37: Valley of Dry Bones symbolizes the resurrection and spiritual restoration of Israel.',
    difficulty: 'easy'
  },

  // =========================================================================
  // 10. COMMERCE & FINANCIAL ACCOUNTING (OAU POST-UTME COMMERCIAL PAPER)
  // =========================================================================
  {
    id: 'acc_oau_01',
    subjectId: 'accounting',
    subjectName: 'Financial Accounting & Commerce',
    year: 'OAU Post-UTME Past Question',
    topic: 'Production & Industrial Sectors',
    questionText: 'The type of commercial activity which transforms processed raw materials into finished consumer and industrial goods is described as:',
    options: [
      'Extractive',
      'Manufacturing',
      'Constructive',
      'Direct service processing'
    ],
    correctOptionIndex: 1,
    explanation: 'Manufacturing industries process raw materials and intermediate goods into finished consumer and industrial products (e.g. textile mills, automotive factories).',
    keyConcept: 'Divisions of production in Commerce',
    oauExamTip: 'Extractive = taking from nature; Manufacturing = transforming raw goods to finished products.',
    difficulty: 'easy'
  },
  {
    id: 'acc_oau_02',
    subjectId: 'accounting',
    subjectName: 'Financial Accounting & Commerce',
    year: 'OAU Post-UTME Past Question',
    topic: 'Warehousing & Customs',
    questionText: 'Imported goods discharged from cargo ships on which customs import duties have not yet been paid are legally kept in a:',
    options: [
      'Ordinary warehouse',
      'Public warehouse',
      'Private warehouse',
      'Bonded warehouse'
    ],
    correctOptionIndex: 3,
    explanation: 'A bonded warehouse is a customs-controlled building where dutiable goods may be stored, manipulated, or undergo operations without payment of duty until release.',
    keyConcept: 'Bonded warehousing in international trade',
    oauExamTip: 'Bonded warehouse = where goods awaiting payment of customs duty are kept under customs bond.',
    difficulty: 'easy'
  },
  {
    id: 'acc_oau_03',
    subjectId: 'accounting',
    subjectName: 'Financial Accounting & Commerce',
    year: 'OAU Post-UTME Past Question',
    topic: 'Trade Associations in Nigeria',
    questionText: 'The acronym NACCIMA stands for:',
    options: [
      'Nigerian-American Centre for Culture, Industries, Mines and Arts',
      'Nigerian Association for Culture, Civics, Industries, Minerals and Arts',
      'National Agency for Culture, Civilization, Investments, Manufacturing and Agriculture',
      'Nigerian Association of Chambers of Commerce, Industry, Mines and Agriculture'
    ],
    correctOptionIndex: 3,
    explanation: 'NACCIMA stands for Nigerian Association of Chambers of Commerce, Industry, Mines and Agriculture.',
    keyConcept: 'Commercial bodies and trade associations in Nigeria',
    oauExamTip: 'NACCIMA: Nigerian Association of Chambers of Commerce, Industry, Mines and Agriculture.',
    difficulty: 'easy'
  },
  {
    id: 'acc_oau_04',
    subjectId: 'accounting',
    subjectName: 'Financial Accounting & Commerce',
    year: 'OAU Post-UTME Past Question',
    topic: 'Depreciation Accounting',
    questionText: 'A machine costing ₦1,000,000 has an estimated useful life of 5 years and a residual scrap value of ₦100,000. Using the Straight Line Method, what is the annual depreciation charge?',
    options: [
      '₦180,000',
      '₦200,000',
      '₦150,000',
      '₦225,000',
      '₦90,000'
    ],
    correctOptionIndex: 0,
    explanation: 'Annual Depreciation = (Cost - Scrap Value) / Useful Life = (1,000,000 - 100,000) / 5 = 900,000 / 5 = ₦180,000 per year.',
    keyConcept: 'Straight-line depreciation formula',
    oauExamTip: 'Formula: (Cost - Salvage Value) / Useful life in years.',
    difficulty: 'easy'
  }
];

export const OAU_QUESTION_BANK: Question[] = [
  ...OAU_PAST_QUESTIONS,
  ...EXTRACTED_POST_UTME_QUESTIONS,
  ...OAU_CHEMISTRY_PAST_QUESTIONS,
];

/**
 * Get all available questions combining built-in authentic past questions
 * and administrator-uploaded custom past questions.
 */
export function getAllAvailableQuestions(): Question[] {
  const custom = getStoredCustomQuestions();
  return [
    ...custom,
    ...OAU_PAST_QUESTIONS,
    ...EXTRACTED_POST_UTME_QUESTIONS,
    ...OAU_CHEMISTRY_PAST_QUESTIONS,
  ];
}

/**
 * Get question count per subject (built-in + uploaded custom)
 */
export function getSubjectQuestionCount(subjectId: SubjectId): number {
  return getAllAvailableQuestions().filter((q) => q.subjectId === subjectId).length;
}

export function getQuestionsForSubject(subjectId: SubjectId, count = 10): Question[] {
  const allForSubject = getAllAvailableQuestions().filter((q) => q.subjectId === subjectId);
  const shuffled = [...allForSubject].sort(() => 0.5 - Math.random());
  if (shuffled.length < count && allForSubject.length > 0) {
    // Fill up to the exact requested count using available authentic past questions
    const pool = [...shuffled];
    while (pool.length < count) {
      pool.push(...allForSubject.map((item, idx) => ({ ...item, id: `${item.id}_${pool.length}_${idx}` })));
    }
    return pool.slice(0, count);
  }
  return shuffled.slice(0, count);
}

export function generateMockExam(selectedSubjects: SubjectId[], questionsPerSubject = 10): Question[] {
  const examQuestions: Question[] = [];
  selectedSubjects.forEach((subId) => {
    const subQuestions = getQuestionsForSubject(subId, questionsPerSubject);
    examQuestions.push(...subQuestions);
  });
  return examQuestions;
}

