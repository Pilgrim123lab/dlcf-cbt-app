import { Question, SubjectId } from '../types';
import { SUBJECT_METADATA } from '../data/oauQuestions';

interface KeywordRule {
  term: string;
  weight: number;
}

// Comprehensive dictionary of domain keywords for accurate post-UTME subject classification
const SUBJECT_DICTIONARIES: Record<SubjectId, KeywordRule[]> = {
  physics: [
    { term: 'velocity', weight: 4 },
    { term: 'acceleration', weight: 4 },
    { term: 'm/s', weight: 4 },
    { term: 'm/s2', weight: 4 },
    { term: 'ms-1', weight: 4 },
    { term: 'ms-2', weight: 4 },
    { term: 'projectile', weight: 5 },
    { term: 'momentum', weight: 5 },
    { term: 'impulse', weight: 4 },
    { term: 'friction', weight: 4 },
    { term: 'gravitational', weight: 4 },
    { term: 'gravity', weight: 3 },
    { term: 'kinetic energy', weight: 5 },
    { term: 'potential energy', weight: 5 },
    { term: 'newton', weight: 4 },
    { term: 'joule', weight: 3 },
    { term: 'watt', weight: 3 },
    { term: 'torque', weight: 5 },
    { term: 'pulley', weight: 4 },
    { term: 'simple harmonic', weight: 6 },
    { term: 'pendulum', weight: 5 },
    { term: 'wavelength', weight: 5 },
    { term: 'frequency', weight: 4 },
    { term: 'hertz', weight: 4 },
    { term: 'refraction', weight: 5 },
    { term: 'refractive index', weight: 6 },
    { term: 'snell', weight: 6 },
    { term: 'concave lens', weight: 6 },
    { term: 'convex lens', weight: 6 },
    { term: 'concave mirror', weight: 6 },
    { term: 'focal length', weight: 5 },
    { term: 'magnification', weight: 4 },
    { term: 'prism', weight: 4 },
    { term: 'electric field', weight: 5 },
    { term: 'electric potential', weight: 5 },
    { term: 'capacitance', weight: 5 },
    { term: 'capacitor', weight: 5 },
    { term: 'farad', weight: 5 },
    { term: 'coulomb', weight: 5 },
    { term: 'ampere', weight: 4 },
    { term: 'resistor', weight: 4 },
    { term: 'internal resistance', weight: 5 },
    { term: 'electromotive force', weight: 6 },
    { term: 'e.m.f', weight: 6 },
    { term: 'magnetic field', weight: 5 },
    { term: 'magnetic flux', weight: 6 },
    { term: 'tesla', weight: 5 },
    { term: 'transformer', weight: 5 },
    { term: 'alternating current', weight: 5 },
    { term: 'photoelectric', weight: 6 },
    { term: 'work function', weight: 6 },
    { term: 'planck', weight: 5 },
    { term: 'half-life', weight: 4 },
    { term: 'radioactive', weight: 4 },
    { term: 'alpha particle', weight: 5 },
    { term: 'beta particle', weight: 5 },
    { term: 'gamma ray', weight: 5 },
    { term: 'specific heat capacity', weight: 6 },
    { term: 'latent heat', weight: 6 },
    { term: 'linear expansivity', weight: 6 },
    { term: 'boyle\'s law', weight: 5 },
    { term: 'charles\' law', weight: 5 },
    { term: 'surface tension', weight: 5 },
    { term: 'upthrust', weight: 5 },
    { term: 'archimedes', weight: 5 },
    { term: 'optics', weight: 4 },
    { term: 'doppler', weight: 5 },
    { term: 'sonometer', weight: 5 },
  ],

  chemistry: [
    { term: 'mole', weight: 4 },
    { term: 'molar mass', weight: 5 },
    { term: 'molarity', weight: 5 },
    { term: 'stoichiometry', weight: 6 },
    { term: 'avogadro', weight: 5 },
    { term: 'atomic number', weight: 4 },
    { term: 'mass number', weight: 4 },
    { term: 'electron configuration', weight: 6 },
    { term: 'orbital', weight: 5 },
    { term: 'periodic table', weight: 5 },
    { term: 'electronegativity', weight: 5 },
    { term: 'ionization energy', weight: 5 },
    { term: 'covalent bond', weight: 5 },
    { term: 'ionic bond', weight: 5 },
    { term: 'electrovalent', weight: 5 },
    { term: 'enthalpy', weight: 5 },
    { term: 'exothermic', weight: 5 },
    { term: 'endothermic', weight: 5 },
    { term: 'activation energy', weight: 5 },
    { term: 'catalyst', weight: 4 },
    { term: 'le chatelier', weight: 6 },
    { term: 'chemical equilibrium', weight: 5 },
    { term: 'equilibrium constant', weight: 5 },
    { term: 'titration', weight: 5 },
    { term: 'neutralisation', weight: 4 },
    { term: 'phenolphthalein', weight: 6 },
    { term: 'methyl orange', weight: 6 },
    { term: 'ph value', weight: 5 },
    { term: 'solubility product', weight: 6 },
    { term: 'ksp', weight: 6 },
    { term: 'electrolysis', weight: 5 },
    { term: 'electrolyte', weight: 4 },
    { term: 'anode', weight: 4 },
    { term: 'cathode', weight: 4 },
    { term: 'faraday\'s law of electrolysis', weight: 6 },
    { term: 'oxidation number', weight: 5 },
    { term: 'reducing agent', weight: 5 },
    { term: 'oxidizing agent', weight: 5 },
    { term: 'redox', weight: 5 },
    { term: 'alkane', weight: 5 },
    { term: 'alkene', weight: 5 },
    { term: 'alkyne', weight: 5 },
    { term: 'hydrocarbon', weight: 5 },
    { term: 'benzene', weight: 4 },
    { term: 'alkanol', weight: 5 },
    { term: 'esterification', weight: 6 },
    { term: 'ester', weight: 4 },
    { term: 'saponification', weight: 6 },
    { term: 'carboxylic acid', weight: 5 },
    { term: 'alkanoic', weight: 5 },
    { term: 'isomerism', weight: 5 },
    { term: 'functional group', weight: 5 },
    { term: 'haber process', weight: 5 },
    { term: 'contact process', weight: 5 },
    { term: 'fractional distillation', weight: 4 },
    { term: 'cracking', weight: 4 },
    { term: 'halogens', weight: 4 },
    { term: 'allotrope', weight: 5 },
    { term: 's.t.p', weight: 3 },
  ],

  biology: [
    { term: 'photosynthesis', weight: 6 },
    { term: 'chlorophyll', weight: 5 },
    { term: 'chloroplast', weight: 5 },
    { term: 'mitochondrion', weight: 5 },
    { term: 'mitochondria', weight: 5 },
    { term: 'ribosome', weight: 4 },
    { term: 'endoplasmic reticulum', weight: 5 },
    { term: 'osmosis', weight: 4 },
    { term: 'plasmolysis', weight: 5 },
    { term: 'turgid', weight: 4 },
    { term: 'mitosis', weight: 5 },
    { term: 'meiosis', weight: 5 },
    { term: 'chromosome', weight: 5 },
    { term: 'gene', weight: 4 },
    { term: 'allele', weight: 5 },
    { term: 'genotype', weight: 5 },
    { term: 'phenotype', weight: 5 },
    { term: 'heterozygous', weight: 6 },
    { term: 'homozygous', weight: 6 },
    { term: 'mendel', weight: 5 },
    { term: 'dna', weight: 4 },
    { term: 'rna', weight: 4 },
    { term: 'xylem', weight: 5 },
    { term: 'phloem', weight: 5 },
    { term: 'transpiration', weight: 5 },
    { term: 'stomata', weight: 5 },
    { term: 'pollination', weight: 5 },
    { term: 'stamen', weight: 5 },
    { term: 'pistil', weight: 5 },
    { term: 'peristalsis', weight: 5 },
    { term: 'enzyme', weight: 4 },
    { term: 'amylase', weight: 5 },
    { term: 'pepsin', weight: 5 },
    { term: 'trypsin', weight: 5 },
    { term: 'lipase', weight: 5 },
    { term: 'bile', weight: 4 },
    { term: 'hemoglobin', weight: 5 },
    { term: 'rhesus factor', weight: 5 },
    { term: 'alveoli', weight: 5 },
    { term: 'nephron', weight: 5 },
    { term: 'kidney', weight: 4 },
    { term: 'glomerulus', weight: 6 },
    { term: 'neuron', weight: 5 },
    { term: 'synapse', weight: 5 },
    { term: 'reflex arc', weight: 5 },
    { term: 'hormone', weight: 4 },
    { term: 'insulin', weight: 4 },
    { term: 'ecosystem', weight: 4 },
    { term: 'food chain', weight: 5 },
    { term: 'trophic level', weight: 5 },
    { term: 'symbiosis', weight: 5 },
    { term: 'parasitism', weight: 5 },
    { term: 'protozoa', weight: 4 },
    { term: 'amoeba', weight: 4 },
    { term: 'paramecium', weight: 4 },
    { term: 'euglena', weight: 4 },
  ],

  mathematics: [
    { term: 'quadratic equation', weight: 6 },
    { term: 'solve for x', weight: 5 },
    { term: 'roots of the equation', weight: 6 },
    { term: 'polynomial', weight: 5 },
    { term: 'differentiation', weight: 6 },
    { term: 'differentiate', weight: 6 },
    { term: 'dy/dx', weight: 6 },
    { term: 'integration', weight: 6 },
    { term: 'integral', weight: 5 },
    { term: 'logarithm', weight: 5 },
    { term: 'log10', weight: 5 },
    { term: 'log2', weight: 5 },
    { term: 'surd', weight: 5 },
    { term: 'arithmetic progression', weight: 6 },
    { term: 'geometric progression', weight: 6 },
    { term: 'a.p.', weight: 5 },
    { term: 'g.p.', weight: 5 },
    { term: 'common difference', weight: 5 },
    { term: 'common ratio', weight: 5 },
    { term: 'matrix', weight: 5 },
    { term: 'matrices', weight: 5 },
    { term: 'determinant of', weight: 6 },
    { term: 'singular matrix', weight: 6 },
    { term: 'sin θ', weight: 6 },
    { term: 'cos θ', weight: 6 },
    { term: 'tan θ', weight: 6 },
    { term: 'trigonometry', weight: 5 },
    { term: 'hypotenuse', weight: 4 },
    { term: 'angle of elevation', weight: 5 },
    { term: 'angle of depression', weight: 5 },
    { term: 'bearings', weight: 4 },
    { term: 'permutation', weight: 5 },
    { term: 'combination', weight: 5 },
    { term: 'binomial expansion', weight: 6 },
    { term: 'venn diagram', weight: 5 },
    { term: 'universal set', weight: 5 },
    { term: 'cyclic quadrilateral', weight: 6 },
    { term: 'chord of a circle', weight: 5 },
    { term: 'standard deviation', weight: 5 },
    { term: 'variance', weight: 4 },
    { term: 'probability of getting', weight: 5 },
    { term: 'fair die', weight: 5 },
    { term: 'two dice', weight: 5 },
    { term: 'simultaneous equations', weight: 5 },
  ],

  economics: [
    { term: 'elasticity of demand', weight: 6 },
    { term: 'price elasticity', weight: 6 },
    { term: 'supply and demand', weight: 5 },
    { term: 'equilibrium price', weight: 6 },
    { term: 'marginal utility', weight: 6 },
    { term: 'diminishing returns', weight: 5 },
    { term: 'indifference curve', weight: 6 },
    { term: 'consumer surplus', weight: 5 },
    { term: 'gross domestic product', weight: 6 },
    { term: 'gdp', weight: 5 },
    { term: 'gnp', weight: 5 },
    { term: 'national income', weight: 5 },
    { term: 'inflation', weight: 4 },
    { term: 'deflation', weight: 4 },
    { term: 'monopoly', weight: 5 },
    { term: 'oligopoly', weight: 5 },
    { term: 'perfect competition', weight: 5 },
    { term: 'monetary policy', weight: 5 },
    { term: 'fiscal policy', weight: 5 },
    { term: 'central bank', weight: 4 },
    { term: 'balance of payments', weight: 6 },
    { term: 'opportunity cost', weight: 5 },
    { term: 'taxation', weight: 4 },
    { term: 'marginal cost', weight: 5 },
    { term: 'average cost', weight: 4 },
  ],

  government: [
    { term: 'constitution', weight: 5 },
    { term: 'federalism', weight: 5 },
    { term: 'presidential system', weight: 6 },
    { term: 'parliamentary system', weight: 6 },
    { term: 'separation of powers', weight: 6 },
    { term: 'checks and balances', weight: 6 },
    { term: 'rule of law', weight: 5 },
    { term: 'sovereignty', weight: 5 },
    { term: 'electoral commission', weight: 5 },
    { term: 'inec', weight: 5 },
    { term: 'suffrage', weight: 5 },
    { term: 'franchise', weight: 4 },
    { term: 'indirect rule', weight: 6 },
    { term: 'clifford constitution', weight: 6 },
    { term: 'richards constitution', weight: 6 },
    { term: 'macpherson constitution', weight: 6 },
    { term: 'lyttelton constitution', weight: 6 },
    { term: 'judiciary', weight: 4 },
    { term: 'legislature', weight: 4 },
    { term: 'national assembly', weight: 4 },
    { term: 'local government', weight: 4 },
    { term: 'ecowas', weight: 5 },
    { term: 'african union', weight: 5 },
    { term: 'united nations', weight: 4 },
  ],

  literature: [
    { term: 'metaphor', weight: 5 },
    { term: 'simile', weight: 5 },
    { term: 'personification', weight: 5 },
    { term: 'hyperbole', weight: 5 },
    { term: 'alliteration', weight: 5 },
    { term: 'irony', weight: 4 },
    { term: 'dramatic irony', weight: 6 },
    { term: 'oxymoron', weight: 5 },
    { term: 'soliloquy', weight: 6 },
    { term: 'aside', weight: 4 },
    { term: 'stanza', weight: 5 },
    { term: 'sonnet', weight: 5 },
    { term: 'rhyme scheme', weight: 5 },
    { term: 'catharsis', weight: 6 },
    { term: 'tragic flaw', weight: 6 },
    { term: 'hamartia', weight: 6 },
    { term: 'protagonist', weight: 5 },
    { term: 'antagonist', weight: 5 },
    { term: 'playwright', weight: 5 },
    { term: 'anthology', weight: 4 },
  ],

  crk: [
    { term: 'bible', weight: 5 },
    { term: 'covenant', weight: 5 },
    { term: 'abraham', weight: 5 },
    { term: 'moses', weight: 5 },
    { term: 'exodus', weight: 5 },
    { term: 'ten commandments', weight: 6 },
    { term: 'mount sinai', weight: 6 },
    { term: 'passover', weight: 5 },
    { term: 'samson', weight: 5 },
    { term: 'david and goliath', weight: 6 },
    { term: 'king solomon', weight: 5 },
    { term: 'prophet elijah', weight: 5 },
    { term: 'sermon on the mount', weight: 6 },
    { term: 'parable of', weight: 5 },
    { term: 'disciples', weight: 4 },
    { term: 'apostle paul', weight: 5 },
    { term: 'crucifixion', weight: 5 },
    { term: 'resurrection of jesus', weight: 6 },
    { term: 'pentecost', weight: 5 },
  ],

  accounting: [
    { term: 'debit', weight: 4 },
    { term: 'credit', weight: 4 },
    { term: 'double entry', weight: 6 },
    { term: 'ledger', weight: 5 },
    { term: 'trial balance', weight: 6 },
    { term: 'cash book', weight: 5 },
    { term: 'petty cash', weight: 5 },
    { term: 'bank reconciliation', weight: 6 },
    { term: 'uncredited cheque', weight: 6 },
    { term: 'unpresented cheque', weight: 6 },
    { term: 'balance sheet', weight: 5 },
    { term: 'trading account', weight: 5 },
    { term: 'profit and loss', weight: 5 },
    { term: 'gross profit', weight: 5 },
    { term: 'net profit', weight: 5 },
    { term: 'depreciation', weight: 5 },
    { term: 'bad debts', weight: 5 },
    { term: 'suspense account', weight: 6 },
    { term: 'capital account', weight: 4 },
  ],

  aptitude: [
    { term: 'nearest in meaning', weight: 5 },
    { term: 'opposite in meaning', weight: 5 },
    { term: 'synonym', weight: 5 },
    { term: 'antonym', weight: 5 },
    { term: 'best completes the sentence', weight: 5 },
    { term: 'choose the word', weight: 4 },
    { term: 'correct spelling', weight: 5 },
    { term: 'analogy', weight: 4 },
    { term: 'idiom', weight: 4 },
    { term: 'comprehension', weight: 4 },
    { term: 'oau was founded in', weight: 6 },
    { term: 'great ife', weight: 6 },
    { term: 'obafemi awolowo university', weight: 5 },
    { term: 'vice chancellor', weight: 5 },
  ],
};

/**
 * Classify a question into its most accurate subject based on its text, options, and topic.
 */
export function classifyQuestionSubject(
  questionText: string,
  options: string[] = [],
  currentSubject?: SubjectId
): { subjectId: SubjectId; confidence: number; detectedTopic?: string } {
  const combinedText = `${questionText} ${options.join(' ')}`.toLowerCase();

  const scores: Record<SubjectId, number> = {
    aptitude: 0,
    mathematics: 0,
    physics: 0,
    chemistry: 0,
    biology: 0,
    economics: 0,
    government: 0,
    literature: 0,
    crk: 0,
    accounting: 0,
  };

  for (const [subj, rules] of Object.entries(SUBJECT_DICTIONARIES)) {
    const sId = subj as SubjectId;
    for (const rule of rules) {
      if (combinedText.includes(rule.term)) {
        scores[sId] += rule.weight;
      }
    }
  }

  // Find top scoring subject
  let bestSubject: SubjectId = currentSubject || 'aptitude';
  let highestScore = 0;

  for (const [subj, score] of Object.entries(scores)) {
    const sId = subj as SubjectId;
    if (score > highestScore) {
      highestScore = score;
      bestSubject = sId;
    }
  }

  // If score is too weak (< 4 points), preserve current subject unless current was generic 'aptitude'
  if (highestScore < 4) {
    if (currentSubject && currentSubject !== 'aptitude') {
      return { subjectId: currentSubject, confidence: 0.3 };
    }
    return { subjectId: 'aptitude', confidence: 0.2 };
  }

  // Calculate confidence normalized between 0.5 and 0.99
  const confidence = Math.min(0.99, 0.5 + (highestScore / 25));

  return {
    subjectId: bestSubject,
    confidence,
  };
}

/**
 * Sort and reclassify an entire question bank
 */
export function autoClassifyAndSortBank(questions: Question[]): {
  sortedQuestions: Question[];
  changedQuestions: Question[];
  stats: Record<SubjectId, number>;
  reclassifiedCount: number;
} {
  const changedQuestions: Question[] = [];
  const stats: Record<SubjectId, number> = {
    aptitude: 0,
    mathematics: 0,
    physics: 0,
    chemistry: 0,
    biology: 0,
    economics: 0,
    government: 0,
    literature: 0,
    crk: 0,
    accounting: 0,
  };

  const sortedQuestions = questions.map((q) => {
    const classification = classifyQuestionSubject(q.questionText, q.options, q.subjectId);
    const newSubjectId = classification.subjectId;

    stats[newSubjectId] = (stats[newSubjectId] || 0) + 1;

    if (newSubjectId !== q.subjectId) {
      const updatedQuestion: Question = {
        ...q,
        subjectId: newSubjectId,
        subjectName: SUBJECT_METADATA[newSubjectId]?.name || q.subjectName,
      };
      changedQuestions.push(updatedQuestion);
      return updatedQuestion;
    }

    return q;
  });

  return {
    sortedQuestions,
    changedQuestions,
    stats,
    reclassifiedCount: changedQuestions.length,
  };
}
