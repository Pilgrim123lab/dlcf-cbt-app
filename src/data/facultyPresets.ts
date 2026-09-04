import { FacultyPreset, SubjectId } from '../types';

/**
 * Verified Obafemi Awolowo University (OAU), Ile-Ife Faculty Structure & Accurate Degree Departments.
 * Note: OAU Post-UTME includes subject combination + Aptitude/General Paper (Aptitude Test).
 */
export const FACULTY_PRESETS: FacultyPreset[] = [
  {
    id: 'clinical_sciences',
    facultyName: 'Faculty of Clinical Sciences',
    courseExamples: [
      'Medicine and Surgery (MBBS)',
      'Nursing Science',
      'Medical Rehabilitation (Physiotherapy)'
    ],
    defaultSubjects: ['biology', 'chemistry', 'physics', 'aptitude'],
    averageCutOff: 75,
    tip: 'Extremely competitive. Requires high speed in Physics and Chemistry calculation problems alongside Biology and General Aptitude.',
  },
  {
    id: 'dentistry',
    facultyName: 'Faculty of Dentistry',
    courseExamples: [
      'Dentistry and Dental Surgery (BChD)'
    ],
    defaultSubjects: ['biology', 'chemistry', 'physics', 'aptitude'],
    averageCutOff: 72,
    tip: 'College of Health Sciences standard. High mastery in organic chemistry and human physiological systems required.',
  },
  {
    id: 'pharmacy',
    facultyName: 'Faculty of Pharmacy',
    courseExamples: [
      'Pharmacy (B.Pharm / Pharm.D)'
    ],
    defaultSubjects: ['biology', 'chemistry', 'physics', 'aptitude'],
    averageCutOff: 73,
    tip: 'Stiff competition. Excellence in chemical stoichiometry and biological genetics guarantees high percentile.',
  },
  {
    id: 'technology',
    facultyName: 'Faculty of Technology',
    courseExamples: [
      'Computer Science and Engineering',
      'Electrical and Electronics Engineering',
      'Mechanical Engineering',
      'Civil Engineering',
      'Chemical Engineering',
      'Agricultural and Environmental Engineering',
      'Food Science and Technology',
      'Materials Science and Engineering'
    ],
    defaultSubjects: ['mathematics', 'physics', 'chemistry', 'aptitude'],
    averageCutOff: 68,
    tip: 'Speed in calculus, mechanics, trigonometry, and dimensional analysis is critical. Fast numerical reasoning gives an advantage.',
  },
  {
    id: 'science',
    facultyName: 'Faculty of Science',
    courseExamples: [
      'Computer Science with Mathematics',
      'Computer Science with Economics',
      'Biochemistry and Molecular Biology',
      'Microbiology',
      'Industrial Chemistry',
      'Geology and Applied Geophysics',
      'Physics / Engineering Physics',
      'Mathematics',
      'Statistics',
      'Zoology',
      'Botany'
    ],
    defaultSubjects: ['mathematics', 'physics', 'chemistry', 'aptitude'],
    averageCutOff: 62,
    tip: 'Computer Science and Biochemistry are high-demand majors. Focus on rapid problem-solving in calculus and molecular biology.',
  },
  {
    id: 'law',
    facultyName: 'Faculty of Law',
    courseExamples: [
      'Bachelor of Laws (LL.B - Common Law)'
    ],
    defaultSubjects: ['literature', 'government', 'crk', 'aptitude'],
    averageCutOff: 74,
    tip: 'Demands superior logical reasoning, comprehension analysis, constitutional dates in Nigerian Government, and literary appreciation.',
  },
  {
    id: 'administration',
    facultyName: 'Faculty of Administration',
    courseExamples: [
      'Accounting',
      'Business Administration',
      'Public Administration',
      'International Relations',
      'Local Government Studies'
    ],
    defaultSubjects: ['mathematics', 'economics', 'government', 'aptitude'],
    averageCutOff: 65,
    tip: 'Accounting and International Relations are prominent at Great Ife. High focus on economics principles, micro/macro equations and aptitude.',
  },
  {
    id: 'social_sciences',
    facultyName: 'Faculty of Social Sciences',
    courseExamples: [
      'Economics',
      'Political Science',
      'Sociology and Anthropology',
      'Psychology',
      'Demography and Social Statistics',
      'Geography'
    ],
    defaultSubjects: ['mathematics', 'economics', 'government', 'aptitude'],
    averageCutOff: 63,
    tip: 'Economics and Political Science cutoffs are competitive. Focus on graph analysis, price elasticity calculations, and analytical logic.',
  },
  {
    id: 'arts',
    facultyName: 'Faculty of Arts',
    courseExamples: [
      'English Studies',
      'Literature-in-English',
      'Dramatic Arts',
      'Philosophy',
      'History and International Studies',
      'Religious Studies (CRS / IRS)',
      'Linguistics and African Languages (Yoruba)',
      'Foreign Languages (French / German)',
      'Music'
    ],
    defaultSubjects: ['literature', 'government', 'crk', 'aptitude'],
    averageCutOff: 60,
    tip: 'Focus on literary devices, critical prose interpretation, African and Western drama analysis, and general logic questions.',
  },
  {
    id: 'environmental_design',
    facultyName: 'Faculty of Environmental Design and Management',
    courseExamples: [
      'Architecture',
      'Building',
      'Estate Management',
      'Quantity Surveying',
      'Urban and Regional Planning',
      'Fine and Applied Arts'
    ],
    defaultSubjects: ['mathematics', 'physics', 'chemistry', 'aptitude'],
    averageCutOff: 61,
    tip: 'Architecture cut-off is competitive. Balance solid math geometry with spatial and aptitude reasoning questions.',
  },
  {
    id: 'agriculture',
    facultyName: 'Faculty of Agriculture',
    courseExamples: [
      'Agricultural Economics',
      'Animal Sciences',
      'Crop Production and Protection',
      'Soil Science and Land Resources Management',
      'Family, Nutrition and Consumer Sciences'
    ],
    defaultSubjects: ['biology', 'chemistry', 'mathematics', 'aptitude'],
    averageCutOff: 56,
    tip: 'Agricultural science fundamentals, crop physiology, genetic crosses, and agricultural economics math.',
  },
  {
    id: 'education',
    facultyName: 'Faculty of Education',
    courseExamples: [
      'Educational Management',
      'Guidance and Counseling',
      'Education and Biology / Chemistry / Physics / Mathematics',
      'Education and Economics / English / History',
      'Physical and Health Education',
      'Adult Education and Lifelong Learning'
    ],
    defaultSubjects: ['government', 'economics', 'literature', 'aptitude'],
    averageCutOff: 55,
    tip: 'Ensure balanced performance across your teaching subject combinations and core aptitude speed.',
  }
];

/**
 * Calculates official OAU Composite Admission Aggregate:
 * OAU Formula: (JAMB Score / 8) + (Post-UTME Score / 8) [or 50% JAMB + 50% Post-UTME]
 * Max JAMB point = 400 / 8 = 50%
 * Max Post-UTME point = 400 / 8 = 50%
 * Total Composite = 100%
 */
export function calculateOauAggregate(jambScore: number, postUtmeScoreOutOf400: number): {
  jambPoints: number;
  postUtmePoints: number;
  totalAggregate: number;
} {
  const safeJamb = Number(jambScore) || 0;
  const safePostUtme = Number(postUtmeScoreOutOf400) || 0;
  const jambPoints = Number(((safeJamb / 400) * 50).toFixed(2));
  const postUtmePoints = Number(((safePostUtme / 400) * 50).toFixed(2));
  const totalAggregate = Number((jambPoints + postUtmePoints).toFixed(2));
  return { jambPoints, postUtmePoints, totalAggregate };
}

export function getAdmissionRating(totalAggregate: number, targetCourse: string): {
  verdict: string;
  badgeColor: string;
  recommendation: string;
} {
  if (totalAggregate >= 72) {
    return {
      verdict: 'Merit Admission Zone (Top Tier)',
      badgeColor: 'emerald',
      recommendation: `Outstanding aggregate of ${totalAggregate}%. Highly competitive for high-demand programs such as ${targetCourse || 'Medicine, Law, Pharmacy, and Technology'}.`,
    };
  } else if (totalAggregate >= 62) {
    return {
      verdict: 'Strong Competitive Standing',
      badgeColor: 'blue',
      recommendation: `Solid standing for ${targetCourse || 'Engineering, Administration, and Social Sciences'}. Maintain consistent speed in CBT practice.`,
    };
  } else if (totalAggregate >= 52) {
    return {
      verdict: 'Moderate (Competitive for Many Courses)',
      badgeColor: 'amber',
      recommendation: 'Viable for Sciences, Arts, Environmental Design, and Agriculture. Push your Post-UTME mock score to cross 280+ to bolster aggregate.',
    };
  } else {
    return {
      verdict: 'Needs Reinforcement',
      badgeColor: 'rose',
      recommendation: 'Dedicate more daily practice hours on weak subjects and Aptitude Test logic to reach 60%+ aggregate.',
    };
  }
}
