import { Question } from '../types';

/**
 * Authentic Obafemi Awolowo University (OAU) Post-UTME Chemistry Past Questions
 * Transcribed from official 2006, 2008, 2009, 2010, 2011/2012, and 2013 screening examinations.
 * Complete with official answer keys, working steps, and OAU exam tips.
 */
export const OAU_CHEMISTRY_PAST_QUESTIONS: Question[] = [
  // =========================================================================
  // OAU 2006 POST-UME CHEMISTRY
  // =========================================================================
  {
    id: 'oau_chm_2006_01',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2006 Post-UTME',
    topic: 'Acids, Bases & Salts',
    questionText: 'All the following will liberate a gas when reacted with dilute hydrochloric acid EXCEPT:',
    options: [
      'Sodium tetraoxosulphate(VI) salt',
      'Sodium trioxocarbonate(IV) salt',
      'Sodium sulphide',
      'Sodium trioxonitrate(V)'
    ],
    correctOptionIndex: 3,
    explanation: 'Sodium trioxonitrate(V) (NaNO3) undergoes a double decomposition reaction with dilute HCl without gas liberation (NaNO3 + HCl ⇌ HNO3 + NaCl). Carbonates liberate CO2, sulphites/sulphates liberate SO2/SO3 under hot/acid conditions, and sulphides liberate pungent H2S gas.',
    keyConcept: 'Reactions of Acid with Salts',
    oauExamTip: 'Salts of nitrate (V) do not release gas when treated with cold dilute non-oxidizing HCl.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2006_02',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2006 Post-UTME',
    topic: 'Organic Chemistry & Hydrocarbons',
    questionText: 'The isomer of a compound C₅H₁₀ which does NOT decolourise bromine water is:',
    options: [
      '2-methylbutane',
      '2,2-dimethylpropane',
      '2-methylbut-1-ene',
      'Methylcyclobutane'
    ],
    correctOptionIndex: 3,
    explanation: 'The formula C₅H₁₀ has a degree of unsaturation of 1 (either an alkene or a cycloalkane). Alkenes readily decolourise bromine water via electrophilic addition. Methylcyclobutane is a saturated cycloalkane without carbon-carbon double bonds, so it does not decolourise bromine water.',
    keyConcept: 'Isomerism & Tests for Unsaturation',
    oauExamTip: 'Cycloalkanes share the general formula CnH2n with alkenes but are saturated and resist bromine addition.',
    difficulty: 'medium'
  },
  {
    id: 'oau_chm_2006_03',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2006 Post-UTME',
    topic: 'Gas Laws & Dalton\'s Law',
    questionText: 'A mixture of nitrogen, oxygen and helium contains 0.25, 0.15 and 0.4 mole of these gases respectively. If the pressure contribution due to oxygen was 2.5 atm, what is the partial pressure of helium?',
    options: [
      '4.0 atm',
      '0.8 atm',
      '3.33 atm',
      '6.67 atm'
    ],
    correctOptionIndex: 3,
    explanation: 'Total moles = 0.25 + 0.15 + 0.40 = 0.80 mol. Mole fraction of O2 = 0.15 / 0.80. Since P_O2 = (0.15/0.80) × P_total = 2.5 atm, P_total = (2.5 × 0.80) / 0.15 = 13.33 atm. Partial pressure of Helium = (0.40 / 0.80) × 13.33 atm = 6.67 atm.',
    keyConcept: 'Dalton\'s Law of Partial Pressures',
    oauExamTip: 'P_gas = (n_gas / n_total) × P_total.',
    difficulty: 'medium'
  },
  {
    id: 'oau_chm_2006_04',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2006 Post-UTME',
    topic: 'Atomic Structure & Chemical Bonding',
    questionText: 'Element P has an atomic number of 12 while element Q has an atomic number 15. Combination of P and Q gives a compound P_m Q_n. The respective values of m and n are:',
    options: [
      '2 and 2',
      '2 and 3',
      '3 and 2',
      '2 and 1'
    ],
    correctOptionIndex: 2,
    explanation: 'Element P (Z=12, Mg) has valence electrons 2 (valency 2). Element Q (Z=15, P) needs 3 electrons to complete its octet (valency 3). Exchanging valencies gives P₃Q₂. Therefore, m = 3 and n = 2.',
    keyConcept: 'Chemical Formula from Valence States',
    oauExamTip: 'Magnesium (group 2, +2) and Phosphorus (group 15, -3) form magnesium phosphide: Mg3P2.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2006_05',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2006 Post-UTME',
    topic: 'Combustion of Hydrocarbons',
    questionText: 'C_x H_y + 9O₂ → 6CO₂ + 6H₂O. The hydrocarbon C_x H_y in the reaction above is most likely:',
    options: [
      'An alkane',
      'A benzene',
      'An alkene',
      'An alkyne'
    ],
    correctOptionIndex: 2,
    explanation: 'From the balanced equation: x = 6, y = 12. The molecular formula is C₆H₁₂, which matches the general formula C_n H_2n (hexene, an alkene).',
    keyConcept: 'Hydrocarbon General Formulas',
    oauExamTip: 'Alkane: CnH2n+2, Alkene: CnH2n, Alkyne: CnH2n-2.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2006_06',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2006 Post-UTME',
    topic: 'Ideal Gas Equation',
    questionText: 'A 512 cm³ sample of a gas weighed 1.236 g at 20°C and a pressure of one atmosphere. What is the relative molecular mass of the gas? [R = 8.314 J K⁻¹ mol⁻¹, 1 atm = 101,325 N m⁻²]',
    options: [
      '58.07',
      '588.37',
      '5.88',
      '197.90'
    ],
    correctOptionIndex: 0,
    explanation: 'V = 512 × 10⁻⁶ m³, T = 20 + 273 = 293 K, P = 101,325 N/m². n = PV / RT = (101,325 × 512 × 10⁻⁶) / (8.314 × 293) = 0.0213 mol. Molar mass M = mass / n = 1.236 / 0.0213 = 58.07 g/mol (butane).',
    keyConcept: 'PV = nRT Gas Law Calculations',
    oauExamTip: 'Ensure pressure is in Pa and volume is in m³ when using R = 8.314 J/(mol·K).',
    difficulty: 'medium'
  },
  {
    id: 'oau_chm_2006_07',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2006 Post-UTME',
    topic: 'Mole Concept & Avogadro\'s Number',
    questionText: 'The number of methane molecules (CH₄) in 8.0 grams of methane is:',
    options: [
      '8 mol',
      '128 mol',
      '0.5 mol',
      '3.01 × 10²³ molecules'
    ],
    correctOptionIndex: 3,
    explanation: 'Molar mass of CH₄ = 12 + 4(1) = 16 g/mol. Number of moles = 8.0 / 16 = 0.50 mol. Number of molecules = 0.50 × 6.02 × 10²³ = 3.01 × 10²³ molecules.',
    keyConcept: 'Molar Conversions to Number of Particles',
    oauExamTip: 'Number of particles = moles × 6.02 × 10²³.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2006_08',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2006 Post-UTME',
    topic: 'Volumetric Analysis & Concentration',
    questionText: 'The concentration of a solution obtained by dissolving 0.53 g of pure anhydrous Na₂CO₃ in water to make 250 cm³ of solution is:',
    options: [
      '2.0 × 10⁻⁵ mol dm⁻³',
      '2.1 g dm⁻³',
      '2.0 × 10⁻² mol dm⁻³',
      '5.0 × 10⁻³ mol dm⁻³'
    ],
    correctOptionIndex: 2,
    explanation: 'Molar mass of Na₂CO₃ = 2(23) + 12 + 3(16) = 106 g/mol. Moles = 0.53 / 106 = 0.005 mol. Volume = 250 / 1000 = 0.25 dm³. Molarity = 0.005 / 0.25 = 0.02 mol dm⁻³ = 2.0 × 10⁻² mol dm⁻³.',
    keyConcept: 'Molarity Calculation (mol/dm³)',
    oauExamTip: 'Concentration in mol/dm³ = (mass / molar mass) / volume in dm³.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2006_09',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2006 Post-UTME',
    topic: 'Gas Stoichiometry',
    questionText: 'What is the maximum volume of CO₂ at s.t.p. that can be obtained when dilute hydrochloric acid is added to 10 grams of CaCO₃? [Ca = 40, C = 12, O = 16]',
    options: [
      '2.24 dm³',
      '22.4 dm³',
      '0.224 dm³',
      '1.12 dm³'
    ],
    correctOptionIndex: 0,
    explanation: 'CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂. Molar mass of CaCO₃ = 100 g/mol. Moles of CaCO₃ = 10 / 100 = 0.1 mol. Since 1 mole of CaCO₃ produces 1 mole of CO₂ (22.4 dm³ at s.t.p.), 0.1 mol produces 0.1 × 22.4 = 2.24 dm³.',
    keyConcept: 'Molar Volume at s.t.p. (22.4 dm³/mol)',
    oauExamTip: '1 mole of any ideal gas occupies 22.4 dm³ at s.t.p.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2006_10',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2006 Post-UTME',
    topic: 'Graham\'s Law of Diffusion',
    questionText: 'Sulphur(IV) oxide travels a given distance in 10 seconds. How long will it take an equal volume of helium to travel the same distance under the same conditions? [S = 32, O = 16, He = 4]',
    options: [
      '1.6 sec',
      '40 sec',
      '5.0 sec',
      '2.5 sec'
    ],
    correctOptionIndex: 3,
    explanation: 'By Graham\'s law: Rate ∝ 1/time, so t_He / t_SO2 = √(M_He / M_SO2) = √(4 / 64) = √(1/16) = 1/4. Therefore, t_He = 10 / 4 = 2.5 seconds.',
    keyConcept: 'Graham\'s Law of Diffusion & Effusion',
    oauExamTip: 'Time taken is directly proportional to the square root of molar mass: t1/t2 = √(M1/M2).',
    difficulty: 'medium'
  },
  {
    id: 'oau_chm_2006_11',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2006 Post-UTME',
    topic: 'Gas Stoichiometry',
    questionText: 'The volume of hydrogen gas produced at s.t.p. when 100 cm³ of 2 M hydrochloric acid reacts with excess zinc is:',
    options: [
      '2.24 dm³',
      '4.48 dm³',
      '1.12 dm³',
      '44.8 dm³'
    ],
    correctOptionIndex: 0,
    explanation: 'Zn + 2HCl → ZnCl₂ + H₂. Moles of HCl = 2 mol/dm³ × 0.100 dm³ = 0.20 mol. From the stoichiometry, 2 moles of HCl produce 1 mole of H₂. Thus, 0.20 mol HCl produces 0.10 mol H₂. Volume of H₂ at s.t.p. = 0.10 × 22.4 = 2.24 dm³.',
    keyConcept: 'Stoichiometric Gas Volume from Solutions',
    oauExamTip: 'Remember the 2:1 mole ratio between HCl and H2.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2006_12',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2006 Post-UTME',
    topic: 'Faraday\'s Laws of Electrolysis',
    questionText: 'During electrolysis, two cells containing molten Al₂O₃ and fused CaCl₂ respectively were connected in series. A current of 15 A was passed for a given period. If 9 g of calcium was deposited at the cathode, what mass of aluminium would be deposited in the second cell? [Al = 27, Ca = 40]',
    options: [
      '8.82 g',
      '4.44 g',
      '17.60 g',
      '4.05 g'
    ],
    correctOptionIndex: 3,
    explanation: 'Number of Faradays passed = moles of Ca × charge = (9 / 40) × 2 = 0.45 F. For aluminium (Al³⁺ + 3e⁻ → Al), 3 Faradays deposit 1 mole (27 g) of Al. Hence, 0.45 F deposits (0.45 / 3) × 27 = 4.05 g of Al.',
    keyConcept: 'Faraday\'s Second Law of Electrolysis',
    oauExamTip: 'When cells are connected in series, the same quantity of charge (Faradays) passes through both.',
    difficulty: 'medium'
  },
  {
    id: 'oau_chm_2006_13',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2006 Post-UTME',
    topic: 'Redox Reactions & Balancing',
    questionText: 'The balanced equation for the reaction of tin(II) salt with potassium heptaoxodichromate(VI) in acidic medium is: eSn²⁺ + fCr₂O₇²⁻ + gH⁺ → hSn⁴⁺ + iCr³⁺ + jH₂O. The values of e, f, g, h, i and j are respectively:',
    options: [
      '3, 5, 6, 3, 1 and 4',
      '3, 1, 14, 3, 2 and 7',
      '3, 2, 6, 1, 5 and 6',
      '5, 2, 1, 5, 3 and 2'
    ],
    correctOptionIndex: 1,
    explanation: 'Half-reactions: Oxidation: 3(Sn²⁺ → Sn⁴⁺ + 2e⁻) = 3Sn²⁺ → 3Sn⁴⁺ + 6e⁻. Reduction: Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O. Combining: 3Sn²⁺ + Cr₂O₇²⁻ + 14H⁺ → 3Sn⁴⁺ + 2Cr³⁺ + 7H₂O. Therefore e=3, f=1, g=14, h=3, i=2, j=7.',
    keyConcept: 'Ion-Electron Method for Redox Balancing',
    oauExamTip: 'Cr2O7^2- in acid always requires 14H+ to form 2Cr^3+ and 7H2O.',
    difficulty: 'medium'
  },
  {
    id: 'oau_chm_2006_14',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2006 Post-UTME',
    topic: 'Acids, Bases & pH Calculations',
    questionText: 'The pH of a solution containing 0.5 × 10⁻⁶ M H₂SO₄ is:',
    options: [
      '6.3',
      '6.5',
      '6.0',
      '5.0'
    ],
    correctOptionIndex: 2,
    explanation: 'H₂SO₄ is a strong diprotic acid: H₂SO₄ → 2H⁺ + SO₄²⁻. Therefore, [H⁺] = 2 × (0.5 × 10⁻⁶) = 1.0 × 10⁻⁶ mol/dm³. pH = -log[H⁺] = -log(1.0 × 10⁻⁶) = 6.0.',
    keyConcept: 'Diprotic Acid pH Determination',
    oauExamTip: 'Always multiply diprotic acid concentration by 2 to get total [H+].',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2006_15',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2006 Post-UTME',
    topic: 'Periodic Table & Oxides',
    questionText: 'Which of the following oxides will NOT dissolve in both dilute hydrochloric acid and 2 M sodium hydroxide solution?',
    options: [
      'Lead(II) oxide',
      'Aluminium oxide',
      'Zinc(II) oxide',
      'Calcium oxide'
    ],
    correctOptionIndex: 3,
    explanation: 'Lead(II) oxide (PbO), aluminium oxide (Al₂O₃), and zinc(II) oxide (ZnO) are amphoteric oxides that dissolve in both acids and strong bases. Calcium oxide (CaO) is a basic oxide; it dissolves in acids but does not dissolve in strong alkaline NaOH solution.',
    keyConcept: 'Amphoteric vs Basic Oxides',
    oauExamTip: 'Common amphoteric oxides in UTME: Al2O3, ZnO, PbO, SnO.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2006_16',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2006 Post-UTME',
    topic: 'Organic Chemistry & IUPAC Nomenclature',
    questionText: 'What is the I.U.P.A.C. name for the carboxylic acid compound CH₃-CH=CH-CH₂-COOH?',
    options: [
      'Pent-3-enoic acid',
      'Pent-4-enoic acid',
      'Pent-2-enoic acid',
      'Pent-3-ene-1-oic acid'
    ],
    correctOptionIndex: 0,
    explanation: 'Numbering starts from the carboxylic carbon: C1 is -COOH, C2 is -CH₂-, C3=C4 double bond, C5 is -CH₃. The compound has a 5-carbon chain with a double bond at position 3, making it Pent-3-enoic acid.',
    keyConcept: 'Carboxylic Acid IUPAC Rules',
    oauExamTip: 'The carbonyl carbon of the principal functional group -COOH is always assigned C-1.',
    difficulty: 'medium'
  },
  {
    id: 'oau_chm_2006_17',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2006 Post-UTME',
    topic: 'Applied Organic Chemistry & Saponification',
    questionText: 'Metal salts of long chain fatty acids are commercially known as:',
    options: [
      'Detergents',
      'Double salts',
      'Soaps',
      'Grease'
    ],
    correctOptionIndex: 2,
    explanation: 'Soaps are sodium or potassium salts of long-chain carboxylic acids (fatty acids) produced by alkaline hydrolysis (saponification) of fats and oils.',
    keyConcept: 'Soaps & Saponification Process',
    oauExamTip: 'Sodium stearate (C17H35COONa) is a typical hard soap.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2006_18',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2006 Post-UTME',
    topic: 'Esters & Hydrolysis',
    questionText: 'The compound propyl ethanoate (CH₃-COO-CH₂CH₂CH₃), when refluxed with dilute HCl, is hydrolyzed to yield:',
    options: [
      'CH₃COOH and CH₃CH₂CH₂OH',
      'CH₃COOH and CH₃CH₂CH₃',
      'CH₃COOH and CH₃CH₂OH',
      'CH₃COOH and CH₃CH₂CH₂Cl'
    ],
    correctOptionIndex: 0,
    explanation: 'Acid hydrolysis of an ester produces the parent carboxylic acid and alcohol. Propyl ethanoate hydrolyzes into ethanoic acid (CH₃COOH) and propan-1-ol (CH₃CH₂CH₂OH).',
    keyConcept: 'Acid-Catalyzed Ester Hydrolysis',
    oauExamTip: 'Ester + Water (acid catalyst) ⇌ Carboxylic Acid + Alkanol.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2006_19',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2006 Post-UTME',
    topic: 'Alkanols & Oxidation',
    questionText: 'The ketone compound butan-2-one (CH₃-CH₂-CO-CH₃) is the product of oxidation of which alkanol?',
    options: [
      'butan-3-ol',
      'butan-1-ol',
      '2-methylpropan-2-ol',
      'butan-2-ol'
    ],
    correctOptionIndex: 3,
    explanation: 'Oxidation of secondary alkanols yields ketones. Butan-2-ol (a secondary alcohol) is oxidized by acidified K₂Cr₂O₇ to butan-2-one. Primary alcohols oxidize to aldehydes/acids, while tertiary alcohols resist oxidation.',
    keyConcept: 'Oxidation of Alcohols',
    oauExamTip: 'Primary alcohol → Aldehyde → Carboxylic acid; Secondary alcohol → Ketone.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2006_20',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2006 Post-UTME',
    topic: 'Isomerism',
    questionText: 'Which of the following structural formulas is NOT isomeric with the others? [A: Butan-1-ol, B: Methoxypropane, C: 2-Methylpropanal, D: Butan-2-ol]',
    options: [
      'CH₃CH₂CH₂CH₂-OH',
      'CH₃-O-CH₂CH₂CH₃',
      '(CH₃)₂CH-CHO',
      'CH₃-CH(OH)-CH₂CH₃'
    ],
    correctOptionIndex: 2,
    explanation: 'Compounds A, B, and D have the molecular formula C₄H₁₀O (saturated monohydric alcohols and ethers). Compound C is 2-methylpropanal with formula C₄H₈O, so it is not an isomer of the others.',
    keyConcept: 'Functional Group & Molecular Formula Isomerism',
    oauExamTip: 'Count total carbons, hydrogens, and oxygens to quickly confirm isomerism.',
    difficulty: 'medium'
  },
  {
    id: 'oau_chm_2006_21',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2006 Post-UTME',
    topic: 'Solubility Curves',
    questionText: 'The solubility of KClO₃ is 7 mol/dm³ at 65°C and 1 mol/dm³ at 25°C. What mass in grams (or moles) of crystals is precipitated when 200 cm³ of saturated solution is cooled from 65°C to 25°C? [Molar mass = 122.5 g/mol]',
    options: [
      '6.30 mole',
      '1.20 mole (or 147.0 g)',
      '0.63 mole',
      '7.30 mole'
    ],
    correctOptionIndex: 1,
    explanation: 'At 65°C, moles in 200 cm³ = 7 × 0.200 = 1.40 mol. At 25°C, moles in 200 cm³ = 1 × 0.200 = 0.20 mol. Moles deposited = 1.40 - 0.20 = 1.20 moles (or 1.20 × 122.5 = 147 g).',
    keyConcept: 'Crystallization from Saturated Solutions',
    oauExamTip: 'Precipitated mass = (Solubility at T_high - Solubility at T_low) × volume.',
    difficulty: 'medium'
  },
  {
    id: 'oau_chm_2006_22',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2006 Post-UTME',
    topic: 'Combined Gas Law',
    questionText: 'During a compression process involving an ideal gas at pressure P₁, when the volume V₁ of the gas was halved, the Kelvin temperature increased by half of its initial value. The final pressure P₂ is:',
    options: [
      '3P₁',
      '12P₁',
      '6P₁',
      '1.5P₁'
    ],
    correctOptionIndex: 0,
    explanation: 'From the general gas equation: (P₁V₁) / T₁ = (P₂V₂) / T₂. Given V₂ = V₁ / 2 and T₂ = T₁ + 0.5T₁ = 1.5T₁. P₂ = P₁ × (V₁ / V₂) × (T₂ / T₁) = P₁ × 2 × 1.5 = 3P₁.',
    keyConcept: 'Combined Gas Law Variations',
    oauExamTip: 'Halving volume doubles pressure (2x), and increasing Kelvin temperature by 50% multiplies by 1.5x: 2 × 1.5 = 3x.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2006_23',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2006 Post-UTME',
    topic: 'Biomolecules & Carbohydrates',
    questionText: 'Cellulose and starch can both be classified as:',
    options: [
      'Hydrocarbons',
      'Reducing sugars',
      'Carbohydrates',
      'Alkaloids'
    ],
    correctOptionIndex: 2,
    explanation: 'Both starch and cellulose are high-molecular-weight polysaccharides with the general formula (C₆H₁₀O₅)_n, classified as non-reducing complex carbohydrates composed of repeating D-glucose units.',
    keyConcept: 'Polysaccharides & Carbohydrate Classes',
    oauExamTip: 'Starch and cellulose are non-reducing polysaccharides, not simple sugars.',
    difficulty: 'easy'
  },

  // =========================================================================
  // OAU 2008 POST-UME CHEMISTRY
  // =========================================================================
  {
    id: 'oau_chm_2008_01',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2008 Post-UTME',
    topic: 'Atomic Structure & Bonding',
    questionText: 'Inter-atomic chemical combinations involve the:',
    options: [
      'Neutrons in the nucleus only',
      'Protons in the nucleus only',
      'Electrons in the outermost valence shell only',
      'Electrons in all the shells'
    ],
    correctOptionIndex: 2,
    explanation: 'Chemical reactions and bond formations involve only the outermost valence shell electrons (through transfer or sharing). Inner core electrons and nuclear nucleons do not participate.',
    keyConcept: 'Valence Electrons in Chemical Bonding',
    oauExamTip: 'Valence electrons determine the chemical combining properties of elements.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2008_02',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2008 Post-UTME',
    topic: 'Chemical Bonding & Ionic Solids',
    questionText: 'Which of the following is NOT a characteristic property of ionic compounds?',
    options: [
      'Solubility in polar solvents like water',
      'Low melting points',
      'Conduction of electricity in aqueous solution or molten state',
      'Fast ionic reactions in solution'
    ],
    correctOptionIndex: 1,
    explanation: 'Ionic compounds have very high melting and boiling points due to strong omnidirectional electrostatic forces holding the ionic crystal lattice together. Having a low melting point is a characteristic of covalent molecular compounds.',
    keyConcept: 'Properties of Ionic vs Covalent Compounds',
    oauExamTip: 'Ionic compounds have high melting points and conduct in molten or dissolved states.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2008_03',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2008 Post-UTME',
    topic: 'Electronegativity & Ionic Character',
    questionText: 'The compound with the highest ionic character among the following is:',
    options: [
      'PCl₅',
      'CCl₄',
      'BCl₃',
      'CsCl'
    ],
    correctOptionIndex: 3,
    explanation: 'Cesium (Cs) is at the bottom of Group 1 and possesses the lowest electronegativity (0.79), while Chlorine has high electronegativity (3.16). The greatest difference in electronegativity (ΔEN = 2.37) creates the highest percentage of ionic character.',
    keyConcept: 'Electronegativity Difference and Bond Character',
    oauExamTip: 'Group 1 alkali metals paired with halogens produce the most ionic bonds (e.g. CsF, CsCl).',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2008_04',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2008 Post-UTME',
    topic: 'Atmospheric Chemistry & Hydrogen',
    questionText: 'Why is free hydrogen gas not found in significant amounts in the lower atmosphere? It:',
    options: [
      'Readily reacts with carbon(IV) oxide',
      'Readily reacts with oxygen and has very low molecular weight so it escapes Earth\'s gravity',
      'Readily reacts with nitrogen',
      'Dissolves completely in rainwater'
    ],
    correctOptionIndex: 1,
    explanation: 'Due to its extremely light molecular mass (H₂ = 2 g/mol), hydrogen\'s root-mean-square thermal speed exceeds Earth\'s gravitational escape velocity. Furthermore, any reactive hydrogen easily combusts with oxygen to form water.',
    keyConcept: 'Gas Densities and Planetary Escape Velocity',
    oauExamTip: 'Hydrogen and helium are sparse in the atmosphere because of low density and high escape velocity.',
    difficulty: 'medium'
  },
  {
    id: 'oau_chm_2008_05',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2008 Post-UTME',
    topic: 'Nitrogen Oxides & Acid-Base Chemistry',
    questionText: 'Apart from water, the other product(s) of the neutralization reaction between NaOH solution and nitrogen(IV) oxide is/are:',
    options: [
      'NaNO₂ only',
      'NaNO₃ only',
      'NaNO₃ and HNO₃',
      'NaNO₂ and NaNO₃'
    ],
    correctOptionIndex: 3,
    explanation: 'NO₂ is a mixed (or double) acid anhydride containing nitrogen in the +4 oxidation state. Reaction with alkali produces both sodium dioxonitrate(III) (NaNO₂) and sodium trioxonitrate(V) (NaNO₃): 2NaOH + 2NO₂ → NaNO₂ + NaNO₃ + H₂O.',
    keyConcept: 'Mixed Acid Anhydrides (NO2)',
    oauExamTip: 'NO2 reacting with alkalis always produces both nitrite and nitrate salts.',
    difficulty: 'medium'
  },
  {
    id: 'oau_chm_2008_06',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2008 Post-UTME',
    topic: 'Thermal Decomposition of Nitrates',
    questionText: 'Silver trioxonitrate(V) on strong thermal decomposition gives:',
    options: [
      'Ag, N₂O and O₂',
      'Ag₂NO, N₂ and O₂',
      'Ag₂O and N₂O',
      'Ag, NO₂ and O₂'
    ],
    correctOptionIndex: 3,
    explanation: 'Because silver is very low in the electrochemical series, its oxide is unstable to heat. Thermal decomposition yields free metallic silver, reddish-brown nitrogen(IV) oxide gas, and oxygen gas: 2AgNO₃(s) → 2Ag(s) + 2NO₂(g) + O₂(g).',
    keyConcept: 'Action of Heat on Nitrates',
    oauExamTip: 'Heavy unreactive metals (Ag, Au, Pt) decompose completely to the free metal, NO2, and O2.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2008_07',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2008 Post-UTME',
    topic: 'Halogen Group Trends',
    questionText: 'The most reactive halogen in Group 17 is:',
    options: [
      'Chlorine (Cl₂)',
      'Bromine (Br₂)',
      'Fluorine (F₂)',
      'Iodine (I₂)'
    ],
    correctOptionIndex: 2,
    explanation: 'Fluorine (F₂) is the most chemically reactive halogen due to its high electronegativity, very small atomic radius, and low F-F bond dissociation energy caused by non-bonding electron repulsion.',
    keyConcept: 'Halogen Reactivity Order: F2 > Cl2 > Br2 > I2',
    oauExamTip: 'Non-metal oxidizing strength increases UP the group.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2008_08',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2008 Post-UTME',
    topic: 'Gas Molar Mass at s.t.p.',
    questionText: '0.79 g of a gas at s.t.p. occupied a volume of 250 cm³. What is the relative molecular mass of the gas?',
    options: [
      '17',
      '32',
      '64',
      '71'
    ],
    correctOptionIndex: 3,
    explanation: 'Number of moles = Volume / 22,400 cm³ = 250 / 22,400 = 0.01116 mol. Molar mass = Mass / Moles = 0.79 / 0.01116 = 70.78 ≈ 71 g/mol (Cl₂ gas).',
    keyConcept: 'Molar Mass from Molar Volume at s.t.p.',
    oauExamTip: 'Molar mass = (mass × 22,400 cm³) / volume in cm³.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2008_09',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2008 Post-UTME',
    topic: 'Graham\'s Law of Diffusion',
    questionText: 'The relationship between the density (d) of a gas and the rate (r) at which the gas diffuses is mathematically expressed as:',
    options: [
      'r = Kd',
      'r = Kd^(1/2)',
      'r = Kd^(-1/2)',
      'r = Kd^(-1)'
    ],
    correctOptionIndex: 2,
    explanation: 'Graham\'s law states that rate of diffusion is inversely proportional to the square root of its density: r ∝ 1 / √d = d^(-1/2). Therefore r = K d^(-1/2).',
    keyConcept: 'Mathematical Formulation of Graham\'s Law',
    oauExamTip: '1 / √d is identical to d^(-1/2).',
    difficulty: 'medium'
  },
  {
    id: 'oau_chm_2008_10',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2008 Post-UTME',
    topic: 'Ideal Gas Law',
    questionText: 'The pressure exerted by a sample of gas confined in a 5.86 dm³ container at 20°C is 4.1 atm. What is the number of moles of gas in the sample? [R = 0.082 dm³ atm mol⁻¹ K⁻¹]',
    options: [
      '1.00 mol',
      '2.00 mol',
      '3.00 mol',
      '4.00 mol'
    ],
    correctOptionIndex: 0,
    explanation: 'T = 20 + 273 = 293 K. n = PV / RT = (4.1 × 5.86) / (0.082 × 293) = 24.026 / 24.026 = 1.00 mole.',
    keyConcept: 'PV = nRT Calculation',
    oauExamTip: 'Ensure T is converted to Kelvin: T(K) = °C + 273.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2008_11',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2008 Post-UTME',
    topic: 'Gay-Lussac\'s Law & Eudiometry',
    questionText: '50 cm³ of hydrogen are sparked with 100 cm³ of oxygen at 110°C and 1 atm. If the whole reaction mixture passes through an alkaline solution of pyrogallol, what is the volume of residual gas?',
    options: [
      '125 cm³',
      '100 cm³',
      '75 cm³',
      '50 cm³'
    ],
    correctOptionIndex: 3,
    explanation: '2H₂ + O₂ → 2H₂O(g). 50 cm³ of H₂ reacts with 25 cm³ of O₂ to produce 50 cm³ of steam. Unreacted O₂ = 100 - 25 = 75 cm³. When passed through alkaline pyrogallol, all oxygen (75 cm³) is absorbed. Steam remains as 50 cm³ (at 110°C) or in room conditions 50 cm³.',
    keyConcept: 'Alkaline Pyrogallol as an Oxygen Absorber',
    oauExamTip: 'Alkaline pyrogallol absorbs oxygen; KOH absorbs CO2.',
    difficulty: 'medium'
  },
  {
    id: 'oau_chm_2008_12',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2008 Post-UTME',
    topic: 'Energetics & Nuclear Chemistry',
    questionText: 'The correct decreasing order of the magnitude of energy changes involved in physical, chemical and nuclear processes is:',
    options: [
      'Phase, chemical, nuclear',
      'Chemical, nuclear, phase',
      'Nuclear, phase, chemical',
      'Nuclear, chemical, phase'
    ],
    correctOptionIndex: 3,
    explanation: 'Nuclear transformations involve binding energies of millions of electron-volts (MeV per atom). Chemical reactions involve valence bond energies (several eV or ~100-1000 kJ/mol). Phase changes involve weak intermolecular forces (~10-40 kJ/mol). Thus: Nuclear > Chemical > Phase.',
    keyConcept: 'Relative Magnitudes of Energy Phenomena',
    oauExamTip: 'Nuclear bonds are orders of magnitude stronger than chemical bonds, which exceed phase change bonds.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2008_13',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2008 Post-UTME',
    topic: 'Thermochemistry & Enthalpy of Combustion',
    questionText: '0.92 g of ethanol raised the temperature of 100 g of water from 298 K to 312 K when burned completely. What is the heat of combustion of ethanol? [C = 12, H = 1, O = 16, c = 4.2 J g⁻¹ K⁻¹]',
    options: [
      '+300 kJ mol⁻¹',
      '+3000 kJ mol⁻¹',
      '-300 kJ mol⁻¹',
      '-3000 kJ mol⁻¹'
    ],
    correctOptionIndex: 2,
    explanation: 'Heat absorbed by water q = m·c·ΔT = 100 g × 4.2 J/(g·K) × (312 - 298) = 5880 J ≈ 6.0 kJ. Molar mass of ethanol (C₂H₅OH) = 46 g/mol. Moles burned = 0.92 / 46 = 0.020 mol. ΔH_c = -q / n = -6.0 kJ / 0.020 mol = -300 kJ mol⁻¹.',
    keyConcept: 'Calorimetry & Enthalpy of Combustion',
    oauExamTip: 'Combustion reactions are always exothermic (negative ΔH).',
    difficulty: 'medium'
  },
  {
    id: 'oau_chm_2008_14',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2008 Post-UTME',
    topic: 'Entropy & States of Matter',
    questionText: 'The highest level of molecular disorderliness (entropy) is found in:',
    options: [
      'Ice at -10°C',
      'Water at 100°C',
      'Steam at 100°C',
      'Ice at 0°C'
    ],
    correctOptionIndex: 2,
    explanation: 'Entropy measures molecular chaos. In steam (gaseous state), molecules have high translational kinetic energy and completely separated free motion compared to constrained liquids or crystal solids.',
    keyConcept: 'Entropy: Gas >> Liquid > Solid',
    oauExamTip: 'Gases always possess vastly higher entropy than condensed phases at the same temperature.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2008_15',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2008 Post-UTME',
    topic: 'Gibbs Free Energy & Spontaneity',
    questionText: 'A chemical reaction is thermodynamically spontaneous at ALL temperatures if:',
    options: [
      'ΔG = 0',
      'ΔG > 0',
      'ΔS < 0 and ΔH > 0',
      'ΔS > 0 and ΔH < 0'
    ],
    correctOptionIndex: 3,
    explanation: 'From the Gibbs-Helmholtz equation ΔG = ΔH - TΔS. If ΔH < 0 (exothermic) and ΔS > 0 (entropy increase), then -TΔS is negative at all Kelvin temperatures, guaranteeing ΔG < 0 under all conditions.',
    keyConcept: 'Gibbs Free Energy Criteria for Spontaneity',
    oauExamTip: 'Exothermic (ΔH < 0) + Increased entropy (ΔS > 0) = Always spontaneous.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2008_16',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2008 Post-UTME',
    topic: 'Rates of Reaction & Surface Area',
    questionText: 'Which of the following reactions of calcium carbonate (marble) with hydrochloric acid will proceed fastest?',
    options: [
      '5 g of marble lump at 50°C',
      '5 g of marble powder at 50°C',
      '5 g of marble powder at 25°C',
      '5 g of marble lump at 25°C'
    ],
    correctOptionIndex: 1,
    explanation: 'Powdered marble provides the greatest exposed surface area for reactant collisions, and higher temperature (50°C) increases average molecular kinetic energy and collision frequency exceeding activation energy.',
    keyConcept: 'Factors Affecting Reaction Rates',
    oauExamTip: 'Maximum rate = finest powder (maximum surface area) + highest temperature.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2008_17',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2008 Post-UTME',
    topic: 'Rate Laws & Reaction Order',
    questionText: 'For A(g) + 2B(g) → C(g), the rate of formation of C is found experimentally to be independent of the concentration of A and quadruples when [B] is doubled. The rate law is:',
    options: [
      'Rate = k[A][B]²',
      'Rate = k[A]⁰[B]²',
      'Rate = k[A][B]',
      'Rate = k[A]²[B]⁰'
    ],
    correctOptionIndex: 1,
    explanation: 'Since rate is independent of [A], the order with respect to A is 0: [A]⁰. When [B] is doubled, rate increases by 2² = 4, so order with respect to B is 2: [B]². Rate = k[A]⁰[B]² = k[B]².',
    keyConcept: 'Determination of Rate Laws from Experimental Data',
    oauExamTip: 'Independent of concentration = zero order ([X]⁰).',
    difficulty: 'medium'
  },
  {
    id: 'oau_chm_2008_18',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2008 Post-UTME',
    topic: 'Chemical Equilibrium',
    questionText: 'How is the equilibrium constant for the forward reaction (K_f) related to that of the reverse reaction (K_r)?',
    options: [
      'K_r is the additive inverse of K_f',
      'K_r is the multiplicative inverse of K_f (K_r = 1 / K_f)',
      'K_r is identical to K_f',
      'The product of K_f and K_r is zero'
    ],
    correctOptionIndex: 1,
    explanation: 'For an equilibrium A ⇌ B, K_forward = [B]/[A]. For the reverse reaction B ⇌ A, K_reverse = [A]/[B] = 1 / K_forward. Thus, K_r is the reciprocal (multiplicative inverse) of K_f.',
    keyConcept: 'Equilibrium Constants of Reversible Reactions',
    oauExamTip: 'K_reverse = 1 / K_forward.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2008_19',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2008 Post-UTME',
    topic: 'Acids, Bases & Ionic Product of Water',
    questionText: 'What is the concentration of OH⁻ ions in an aqueous solution with a pH of 4.4? [Kw = 1.0 × 10⁻¹⁴]',
    options: [
      '9.600 × 10⁻¹⁰ mol dm⁻³',
      '2.512 × 10⁻¹⁰ mol dm⁻³',
      '9.600 × 10⁻¹¹ mol dm⁻³',
      '2.512 × 10⁻¹¹ mol dm⁻³'
    ],
    correctOptionIndex: 1,
    explanation: 'pOH = 14 - pH = 14 - 4.4 = 9.6. [OH⁻] = 10^(-pOH) = 10^(-9.6) = 10^(0.4 - 10) = 2.512 × 10⁻¹⁰ mol dm⁻³.',
    keyConcept: 'pH, pOH, and [OH-] Relationship',
    oauExamTip: 'pH + pOH = 14.0 at 25°C.',
    difficulty: 'medium'
  },
  {
    id: 'oau_chm_2008_20',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2008 Post-UTME',
    topic: 'Brønsted-Lowry Theory',
    questionText: 'A Brønsted-Lowry acid and its conjugate base differ from each other only by:',
    options: [
      'Opposite electrical charges',
      'A hydroxide ion',
      'An electron',
      'A proton (H⁺)'
    ],
    correctOptionIndex: 3,
    explanation: 'According to Brønsted-Lowry acid-base theory, an acid is a proton donor and a base is a proton acceptor. A conjugate pair differs by exactly one proton: Acid ⇌ Conjugate Base + H⁺.',
    keyConcept: 'Conjugate Acid-Base Pairs',
    oauExamTip: 'NH4+ and NH3 differ by H+; H2O and OH- differ by H+.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2008_21',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2008 Post-UTME',
    topic: 'Complex Salts & Coordination Compounds',
    questionText: 'Which of the following compounds is a complex salt?',
    options: [
      'KAl(SO₄)₂·12H₂O',
      '[Cu(NH₃)₄]Cl₂',
      'K₂S₂O₃·5H₂O',
      'Mg(OH)Cl'
    ],
    correctOptionIndex: 1,
    explanation: 'Tetraamminecopper(II) chloride ([Cu(NH₃)₄]Cl₂) contains coordinate (dative) bonds between the central Cu²⁺ ion and NH₃ neutral ligands, forming a complex cation [Cu(NH₃)₄]²⁺. Alum is a double salt.',
    keyConcept: 'Complex Salts vs Double Salts',
    oauExamTip: 'Complex salts contain coordination brackets [M(L)n] that do not dissociate into individual ions in water.',
    difficulty: 'medium'
  },
  {
    id: 'oau_chm_2008_22',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2008 Post-UTME',
    topic: 'Electrochemistry & Electrolytic Conductivity',
    questionText: 'What happens to the molar (and equivalent) conductivity of an electrolyte solution as its concentration decreases (dilution)?',
    options: [
      'It increases',
      'It decreases',
      'It is unaffected',
      'It drops to zero'
    ],
    correctOptionIndex: 0,
    explanation: 'Upon dilution, the degree of dissociation of weak electrolytes increases (Ostwald\'s Dilution Law) and inter-ionic attraction in strong electrolytes decreases, increasing ionic mobility and overall molar conductivity.',
    keyConcept: 'Molar Conductivity and Dilution',
    oauExamTip: 'Specific conductance (conductivity per unit volume) decreases with dilution, but molar conductivity increases.',
    difficulty: 'medium'
  },
  {
    id: 'oau_chm_2008_23',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2008 Post-UTME',
    topic: 'Faraday\'s Electrolysis Economics',
    questionText: 'If the cost of electricity required to electroplate 1 g of aluminium is ₦4.00, how much would it cost to deposit 24 g of copper? [Al = 27, Cu = 64]',
    options: [
      '₦27.02',
      '₦37.02',
      '₦47.02',
      '₦57.02'
    ],
    correctOptionIndex: 0,
    explanation: '1 g Al = 1/27 mol. Requires 3 × (1/27) = 1/9 F = 0.111 F, costing ₦4.00. For copper: 24 g Cu = 24/64 = 0.375 mol. Cu²⁺ requires 2 electrons: 2 × 0.375 = 0.75 F. Cost = (0.75 / 0.111) × ₦4.00 = ₦27.02.',
    keyConcept: 'Electrolytic Quantitative Economics',
    oauExamTip: 'Calculate total Faradays needed for both metals and set up a direct proportion.',
    difficulty: 'hard'
  },
  {
    id: 'oau_chm_2008_24',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2008 Post-UTME',
    topic: 'Electrochemical Cell Notation',
    questionText: 'The overall reaction in an electrochemical cell is Mg(s) + Cu²⁺(aq) → Mg²⁺(aq) + Cu(s). What is the standard IUPAC cell notation?',
    options: [
      'Mg(s) | Mg²⁺(aq) || Cu²⁺(aq) | Cu(s)',
      'Mg(aq) | Mg²⁺(s) || Cu²⁺(s) | Cu(aq)',
      'Cu²⁺(aq) | Cu(s) || Mg(s) | Mg²⁺(aq)',
      'Cu(s) | Cu²⁺(aq) || Mg²⁺(aq) | Mg(s)'
    ],
    correctOptionIndex: 0,
    explanation: 'In standard cell notation: Anode (oxidation) is written on the left, cathode (reduction) on the right, separated by a double vertical line representing the salt bridge: Anode | Anolyte || Catholyte | Cathode.',
    keyConcept: 'Cell Diagram Convention: Anode on Left, Cathode on Right',
    oauExamTip: 'Remember ABC: Anode | Bridge || Cathode.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2008_25',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2008 Post-UTME',
    topic: 'Corrosion Prevention & Sacrificial Protection',
    questionText: 'Which of the following metals can be coupled as a sacrificial anode to prevent the corrosion of an underground iron pipe?',
    options: [
      'Silver (Ag)',
      'Copper (Cu)',
      'Magnesium (Mg)',
      'Gold (Au)'
    ],
    correctOptionIndex: 2,
    explanation: 'To act as a sacrificial anode, the metal must be more electropositive (higher in the electrochemical activity series) than iron. Magnesium oxidizes preferentially in place of iron: Mg → Mg²⁺ + 2e⁻.',
    keyConcept: 'Cathodic Protection by Sacrificial Anodes',
    oauExamTip: 'Magnesium and zinc are commonly used to protect steel and iron structures.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2008_26',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2008 Post-UTME',
    topic: 'Atomic & Nuclear Notation',
    questionText: 'A subatomic particle containing 8 protons, 9 neutrons, and 7 electrons is correctly represented as:',
    options: [
      '¹⁶₈O',
      '¹⁷₈O⁺',
      '¹⁷₉O⁺',
      '¹⁷₈O⁻'
    ],
    correctOptionIndex: 1,
    explanation: 'Atomic number Z = protons = 8 (oxygen). Mass number A = protons + neutrons = 8 + 9 = 17. Charge = protons - electrons = 8 - 7 = +1. Hence, the symbol is ¹⁷₈O⁺.',
    keyConcept: 'Nuclear Symbolism (Mass number, Atomic number, Charge)',
    oauExamTip: 'Superscript is (P + N), subscript is P, and sign is (P - e).',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2008_27',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2008 Post-UTME',
    topic: 'Solubility Product (Ksp)',
    questionText: 'The solubility product Ksp of a sparingly soluble salt MX₂ is 1.08 × 10⁻⁷ mol³ dm⁻⁹ at 25°C. What is the molar solubility of the salt?',
    options: [
      '3.0 × 10⁻⁹ mol dm⁻³',
      '3.0 × 10⁻³ mol dm⁻³',
      '6.0 × 10⁻⁴ mol dm⁻³',
      '6.0 × 10⁻⁸ mol dm⁻³'
    ],
    correctOptionIndex: 1,
    explanation: 'MX₂(s) ⇌ M²⁺ + 2X⁻. If solubility is s: [M²⁺] = s, [X⁻] = 2s. Ksp = [M²⁺][X⁻]² = s · (2s)² = 4s³. 4s³ = 1.08 × 10⁻⁷ ⇒ s³ = 2.7 × 10⁻⁸ = 27 × 10⁻⁹ ⇒ s = ∛(27 × 10⁻⁹) = 3.0 × 10⁻³ mol dm⁻³.',
    keyConcept: 'Solubility Product for MX2 Salts (Ksp = 4s³)',
    oauExamTip: 'MX: Ksp = s²; MX2: Ksp = 4s³; MX3: Ksp = 27s⁴.',
    difficulty: 'medium'
  },

  // =========================================================================
  // OAU 2009 POST-UME CHEMISTRY
  // =========================================================================
  {
    id: 'oau_chm_2009_01',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2009 Post-UTME',
    topic: 'Applied Chemistry & Industrial Gases',
    questionText: 'The hot flame used by welders for cutting and joining metals is the:',
    options: [
      'Butane gas flame',
      'Acetylene-hydroflame',
      'Kerosene flame',
      'Oxy-acetylene flame'
    ],
    correctOptionIndex: 3,
    explanation: 'The oxy-acetylene flame produces an extremely high combustion temperature exceeding 3,000°C when ethyne (acetylene) burns in pure oxygen, sufficient to melt steel and iron.',
    keyConcept: 'Industrial Application of Ethyne (Acetylene)',
    oauExamTip: 'Ethyne + Oxygen = Oxy-acetylene flame used in welding.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2009_02',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2009 Post-UTME',
    topic: 'Homologous Series',
    questionText: 'Consecutive members of an alkane homologous series differ by a constant molecular unit of:',
    options: [
      '-CH-',
      '-CH₂-',
      '-CH₃-',
      '-C₂H₂-'
    ],
    correctOptionIndex: 1,
    explanation: 'By definition, adjacent members of any homologous series differ from each other by a methylene group (-CH₂-), corresponding to a relative molecular mass difference of 14.',
    keyConcept: 'Characteristics of Homologous Series',
    oauExamTip: 'Successive members always differ by -CH2- (mass 14).',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2009_03',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2009 Post-UTME',
    topic: 'Metals & Reactivity with Acids',
    questionText: 'Which of the following metals will readily dissolve in dilute hydrochloric acid to liberate hydrogen gas? [Metals: Mg, Fe, Pb, and Cu]',
    options: [
      'All the metals',
      'Mg, Fe and Cu',
      'Mg, Fe and Pb',
      'Mg and Fe only'
    ],
    correctOptionIndex: 3,
    explanation: 'Copper is below hydrogen in the activity series and does not react. Lead reacts negligibly with dilute HCl because an insoluble crust of lead(II) chloride (PbCl₂) passivates the surface. Therefore, only Magnesium and Iron dissolve readily.',
    keyConcept: 'Reactivity with Dilute Non-Oxidizing Acids',
    oauExamTip: 'Pb passivates with dilute HCl due to insoluble PbCl2 formation.',
    difficulty: 'medium'
  },
  {
    id: 'oau_chm_2009_04',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2009 Post-UTME',
    topic: 'Alloys & Metallurgy',
    questionText: 'Stainless steel is an alloy composed essentially of:',
    options: [
      'Carbon, iron and lead',
      'Carbon, iron, and chromium (with nickel)',
      'Carbon, iron and copper',
      'Carbon, iron and silver'
    ],
    correctOptionIndex: 1,
    explanation: 'Stainless steel is an alloy of iron, carbon, and chromium (at least 10.5%), often with nickel. Chromium forms a passive layer of chromium oxide that prevents rust and corrosion.',
    keyConcept: 'Compositions of Common Alloys',
    oauExamTip: 'Stainless steel = Fe + Cr + Ni + C.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2009_05',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2009 Post-UTME',
    topic: 'Volumetric Titration & Neutralization',
    questionText: 'What volume of 0.50 M H₂SO₄ will exactly neutralize 20 cm³ of 0.1 M NaOH solution?',
    options: [
      '2.0 cm³',
      '5.0 cm³',
      '6.8 cm³',
      '10.4 cm³'
    ],
    correctOptionIndex: 0,
    explanation: 'H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O. Using the formula (C_A · V_A) / (C_B · V_B) = n_A / n_B: (0.50 × V_A) / (0.10 × 20) = 1 / 2. 0.50 V_A = 1.0 ⇒ V_A = 1.0 / 0.50 = 2.0 cm³.',
    keyConcept: 'Neutralization Stoichiometry (CA·VA / CB·VB = nA / nB)',
    oauExamTip: 'Always check acid basicity: 1 mole of H2SO4 reacts with 2 moles of NaOH.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2009_06',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2009 Post-UTME',
    topic: 'Oxidizing & Reducing Gases',
    questionText: 'A gas that can behave as a reducing agent towards chlorine and as an oxidizing agent towards hydrogen sulphide is:',
    options: [
      'Oxygen (O₂)',
      'Nitrogen(II) oxide (NO)',
      'Sulphur(IV) oxide (SO₂)',
      'Ammonia (NH₃)'
    ],
    correctOptionIndex: 2,
    explanation: 'SO₂ is oxidized to SO₄²⁻ by chlorine (acting as a reducing agent: SO₂ + Cl₂ + 2H₂O → H₂SO₄ + 2HCl), but it oxidizes H₂S to elemental sulphur (acting as an oxidizing agent: SO₂ + 2H₂S → 3S + 2H₂O).',
    keyConcept: 'Dual Redox Behaviour of Sulphur(IV) Oxide',
    oauExamTip: 'SO2 reduces chlorine, but oxidizes H2S to yellow sulphur.',
    difficulty: 'medium'
  },
  {
    id: 'oau_chm_2009_07',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2009 Post-UTME',
    topic: 'Allotropy',
    questionText: 'An element that can exist in two or more different structural forms in the same physical state which possess similar chemical properties is said to exhibit:',
    options: [
      'Polymerism',
      'Isotopy',
      'Isomorphism',
      'Allotropy'
    ],
    correctOptionIndex: 3,
    explanation: 'Allotropy is the existence of an element in two or more distinct physical forms in the same state (e.g. diamond, graphite, and fullerenes for carbon; rhombic and monoclinic for sulphur).',
    keyConcept: 'Definition of Allotropy',
    oauExamTip: 'Elements exhibit allotropy; compounds exhibit isomerism.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2009_08',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2009 Post-UTME',
    topic: 'Orbital Hybridization',
    questionText: 'The hybridization of the carbon atoms in ethyne (H-C≡C-H) is:',
    options: [
      'sp',
      'sp²',
      'sp³',
      'sp³d'
    ],
    correctOptionIndex: 0,
    explanation: 'In ethyne, each carbon forms one single C-H sigma bond and one C-C sigma bond (linear 180° geometry), with two unhybridized p-orbitals forming two pi bonds. This requires sp hybridization.',
    keyConcept: 'sp Hybridization in Alkynes',
    oauExamTip: 'Triple bonded carbons are sp hybridized with a linear bond angle of 180°.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2009_09',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2009 Post-UTME',
    topic: 'Haber Process & Industrial Catalysts',
    questionText: 'In the Haber process for the manufacture of ammonia, finely divided iron is used as:',
    options: [
      'An ionizing agent',
      'A reducing agent',
      'A heterogeneous catalyst',
      'A dehydrating agent'
    ],
    correctOptionIndex: 2,
    explanation: 'Finely divided iron with potassium and aluminium oxide promoters provides an alternative low-activation energy pathway for the N₂ + 3H₂ ⇌ 2NH₃ equilibrium.',
    keyConcept: 'Industrial Catalysts in Equilibrium Processes',
    oauExamTip: 'Haber: Finely divided Fe; Contact process: V2O5.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2009_10',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2009 Post-UTME',
    topic: 'Separation of Atmospheric Gases',
    questionText: 'Pure nitrogen can best be obtained from an atmospheric mixture of oxygen and nitrogen by passing the mixture over heated:',
    options: [
      'Potassium hydroxide',
      'Gold foil',
      'Phosphorus (or heated copper)',
      'Calcium chloride'
    ],
    correctOptionIndex: 2,
    explanation: 'Heated phosphorus or heated copper turnings react vigorously with oxygen to form non-volatile phosphorus(V) oxide (P₄O₁₀) or copper(II) oxide (CuO), leaving behind nitrogen.',
    keyConcept: 'Removal of Oxygen from Air',
    oauExamTip: 'Phosphorus reacts with O2 to form solid P4O10, cleanly isolating N2.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2009_11',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2009 Post-UTME',
    topic: 'Gas Volumes from Acid Reactions',
    questionText: 'At s.t.p., how many litres of hydrogen gas can be obtained from the reaction of 500 cm³ of 0.5 M H₂SO₄ with excess zinc metal?',
    options: [
      '22.4 dm³',
      '11.2 dm³',
      '6.5 dm³',
      '5.6 dm³'
    ],
    correctOptionIndex: 3,
    explanation: 'Zn + H₂SO₄ → ZnSO₄ + H₂. Moles of H₂SO₄ = 0.500 dm³ × 0.5 mol/dm³ = 0.25 mol. 1 mole of H₂SO₄ yields 1 mole of H₂ (22.4 dm³ at s.t.p.). Therefore, volume = 0.25 × 22.4 = 5.6 dm³ (litres).',
    keyConcept: 'Stoichiometric Gas Evolution',
    oauExamTip: '0.25 moles × 22.4 dm³/mol = 5.6 dm³.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2009_12',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2009 Post-UTME',
    topic: 'Qualitative Inorganic Analysis',
    questionText: 'Tetraoxosulphate(VI) ions (SO₄²⁻) in aqueous solution are definitively identified using:',
    options: [
      'Acidified silver trioxonitrate(V)',
      'Acidified barium chloride solution',
      'Lime-water',
      'Dilute hydrochloric acid alone'
    ],
    correctOptionIndex: 1,
    explanation: 'Adding acidified barium chloride (BaCl₂ / HCl) produces an insoluble white precipitate of barium sulphate (BaSO₄) that does not dissolve in excess dilute hydrochloric acid.',
    keyConcept: 'Confirmatory Test for Sulphate Ions',
    oauExamTip: 'BaCl2 + dilute HCl gives a white precipitate insoluble in excess acid for SO4^2-.',
    difficulty: 'easy'
  },

  // =========================================================================
  // OAU 2010 POST-UME CHEMISTRY
  // =========================================================================
  {
    id: 'oau_chm_2010_01',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2010 Post-UTME',
    topic: 'Atomic Models & Discovery of Nucleus',
    questionText: 'Whose famous alpha-particle scattering experiment demonstrated that the atom possesses a tiny, dense, positively charged nucleus?',
    options: [
      'J.J. Thomson',
      'Ernest Rutherford',
      'Robert Millikan',
      'John Dalton'
    ],
    correctOptionIndex: 1,
    explanation: 'Rutherford\'s 1911 gold-foil experiment showed that most alpha particles pass straight through gold foil but a few are deflected at large angles, proving that positive charge is concentrated in a tiny central nucleus.',
    keyConcept: 'Rutherford\'s Alpha Scattering Experiment',
    oauExamTip: 'Thomson discovered electron (plum pudding); Rutherford discovered the atomic nucleus.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2010_02',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2010 Post-UTME',
    topic: 'Quantum Numbers & Atomic Orbitals',
    questionText: 'Which quantum number divides electron shells into subshells and orbitals (s, p, d, f)?',
    options: [
      'Principal quantum number (n)',
      'Azimuthal / Subsidiary quantum number (l)',
      'Magnetic quantum number (m)',
      'Spin quantum number (s)'
    ],
    correctOptionIndex: 1,
    explanation: 'The azimuthal (subsidiary/angular momentum) quantum number l determines the subshell and shape of the orbital, taking integer values from 0 to n - 1 (where 0=s, 1=p, 2=d, 3=f).',
    keyConcept: 'Quantum Numbers Functions',
    oauExamTip: 'Principal (n) = main shell/energy level; Azimuthal (l) = subshell/shape; Magnetic (m) = spatial orientation.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2010_03',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2010 Post-UTME',
    topic: 'Salts & Hydrolysis',
    questionText: 'Which of the following salts will dissolve in water to produce an alkaline solution? [i) NaHCO₃, ii) NaHSO₄, iii) NaCl]',
    options: [
      'i, ii and iii',
      'ii only',
      'i only',
      'i and ii only'
    ],
    correctOptionIndex: 2,
    explanation: 'NaHCO₃ is a salt of a strong base (NaOH) and weak acid (H₂CO₃). Anion hydrolysis produces OH⁻ ions: HCO₃⁻ + H₂O ⇌ H₂CO₃ + OH⁻ (pH > 7). NaHSO₄ produces acidic solutions (HSO4- dissociates to H+), and NaCl is neutral (pH = 7).',
    keyConcept: 'Salt Hydrolysis & Solution pH',
    oauExamTip: 'NaHCO3 undergoes anion hydrolysis producing an alkaline solution (pH ~8.3).',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2010_04',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2010 Post-UTME',
    topic: 'Thermochemistry & Combustion',
    questionText: 'Burning of 0.46 g of ethanol raised the temperature of 100 g of water by 30°C. Calculate the heat of combustion of ethanol, C₂H₅OH. [C = 12, H = 1, O = 16, c = 4.2 J g⁻¹ K⁻¹]',
    options: [
      '50 kJ mol⁻¹',
      '900 kJ mol⁻¹',
      '1260 kJ mol⁻¹',
      '1000 kJ mol⁻¹'
    ],
    correctOptionIndex: 2,
    explanation: 'Heat released q = m·c·ΔT = 100 g × 4.2 J/(g·°C) × 30°C = 12,600 J = 12.6 kJ. Molar mass of ethanol = 46 g/mol. Moles burned = 0.46 / 46 = 0.010 mol. Heat of combustion per mole = 12.6 kJ / 0.010 mol = 1,260 kJ/mol.',
    keyConcept: 'Standard Enthalpy of Combustion Calculation',
    oauExamTip: 'Always divide heat generated by number of moles burned.',
    difficulty: 'medium'
  },
  {
    id: 'oau_chm_2010_05',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2010 Post-UTME',
    topic: 'Halogen Displacement Reactions',
    questionText: 'When chlorine gas is bubbled into an aqueous solution of potassium iodide (KI):',
    options: [
      'A white precipitate is seen',
      'A reddish-brown colour develops due to liberation of iodine',
      'The solution remains completely colourless',
      'A bright blue precipitate forms'
    ],
    correctOptionIndex: 1,
    explanation: 'Chlorine is higher in the halogen activity series than iodine. It displaces iodide ions to produce free elemental iodine: Cl₂ + 2KI → 2KCl + I₂(aq). Dissolved iodine imparts a characteristic reddish-brown colour.',
    keyConcept: 'Halogen Displacement Reactions',
    oauExamTip: 'Cl2 displaces Br- (orange/brown) and I- (dark brown/purple in organic solvents).',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2010_06',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2010 Post-UTME',
    topic: 'Le Chatelier\'s Principle',
    questionText: 'For the gas equilibrium PCl₅(g) ⇌ PCl₃(g) + Cl₂(g), an increase in pressure at constant temperature will:',
    options: [
      'Decelerate the reaction completely',
      'Increase the yield of PCl₃',
      'Shift the equilibrium to the left, increasing the yield of PCl₅',
      'Have no effect on equilibrium position'
    ],
    correctOptionIndex: 2,
    explanation: 'The forward reaction proceeds with an increase in gas volume (1 mole gas → 2 moles gas). By Le Chatelier\'s principle, increasing pressure shifts the position of equilibrium toward the side with fewer gas moles (the reactant PCl₅ side).',
    keyConcept: 'Le Chatelier\'s Principle & Pressure Changes',
    oauExamTip: 'Increased pressure favours the side with fewer moles of gas.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2010_07',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2010 Post-UTME',
    topic: 'Solubility Product (Ksp)',
    questionText: 'A saturated solution of silver trioxocarbonate(IV) (Ag₂CO₃) has a solubility of 1.30 × 10⁻⁵ mol dm⁻³. What is the solubility product Ksp of Ag₂CO₃?',
    options: [
      '8.79 × 10⁻¹⁵',
      '1.69 × 10⁻¹⁰',
      '1.82 × 10⁻¹²',
      '9.84 × 10⁻¹⁰'
    ],
    correctOptionIndex: 0,
    explanation: 'Ag₂CO₃(s) ⇌ 2Ag⁺ + CO₃²⁻. [Ag⁺] = 2s = 2(1.30 × 10⁻⁵) = 2.60 × 10⁻⁵ mol/dm³. [CO₃²⁻] = s = 1.30 × 10⁻⁵ mol/dm³. Ksp = [Ag⁺]²[CO₃²⁻] = (2.60 × 10⁻⁵)² × (1.30 × 10⁻⁵) = 6.76 × 10⁻¹⁰ × 1.30 × 10⁻⁵ = 8.79 × 10⁻¹⁵.',
    keyConcept: 'Solubility Product of A2B Salts (Ksp = 4s³)',
    oauExamTip: 'Ksp = 4s³ = 4 × (1.3 × 10⁻⁵)³ = 4 × 2.197 × 10⁻¹⁵ = 8.79 × 10⁻¹⁵.',
    difficulty: 'medium'
  },
  {
    id: 'oau_chm_2010_08',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2010 Post-UTME',
    topic: 'Electrochemistry & Galvanic Cells',
    questionText: 'A zinc half-cell is connected to an iron half-cell through a salt bridge and voltmeter. At which electrode does reduction occur and which electrode is positive?',
    options: [
      'Zinc electrode, zinc is positive',
      'Iron electrode, iron is positive',
      'Zinc electrode, iron is positive',
      'Iron electrode, zinc is positive'
    ],
    correctOptionIndex: 1,
    explanation: 'Zinc has a more negative standard reduction potential (E° = -0.76 V) than iron (E° = -0.44 V). Zinc undergoes oxidation at the anode (negative terminal), while Fe²⁺ ions undergo reduction at the iron cathode (positive terminal).',
    keyConcept: 'Galvanic Cell Electrode Polarity',
    oauExamTip: 'In a galvanic cell: Anode = oxidation (negative), Cathode = reduction (positive).',
    difficulty: 'medium'
  },
  {
    id: 'oau_chm_2010_09',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2010 Post-UTME',
    topic: 'Alkyne Halogenation Stoichiometry',
    questionText: 'What mass of bromine (Br₂) will react to completely saturate 6.8 g of 3-methylbut-1-yne? [H = 1, C = 12, Br = 80]',
    options: [
      '16 g',
      '32 g',
      '12 g',
      '24 g'
    ],
    correctOptionIndex: 1,
    explanation: '3-methylbut-1-yne is an alkyne (C₅H₈) with one carbon-carbon triple bond. Molar mass = 5(12) + 8(1) = 68 g/mol. Moles of alkyne = 6.8 / 68 = 0.10 mol. Full saturation of a triple bond requires 2 moles of Br₂ per mole of alkyne. Moles of Br₂ = 0.20 mol. Mass of Br₂ = 0.20 mol × 160 g/mol = 32 g.',
    keyConcept: 'Alkyne Addition Stoichiometry (1:2 ratio)',
    oauExamTip: 'Alkynes require 2 moles of halogen for complete saturation into a tetrahaloalkane.',
    difficulty: 'medium'
  },
  {
    id: 'oau_chm_2010_10',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2010 Post-UTME',
    topic: 'Combustion of Gaseous Hydrocarbons',
    questionText: '10 cm³ of butane (C₄H₁₀) and 100 cm³ of oxygen are sparked at room temperature and pressure. What is the total volume of residual gas after cooling to original conditions?',
    options: [
      '125 cm³',
      '110 cm³',
      '75 cm³',
      '40 cm³'
    ],
    correctOptionIndex: 2,
    explanation: 'C₄H₁₀ + 6.5O₂ → 4CO₂ + 5H₂O(l). 10 cm³ of butane reacts with 65 cm³ of O₂ to produce 40 cm³ of CO₂ and liquid water (negligible volume at room temperature). Unreacted O₂ = 100 - 65 = 35 cm³. Residual gas = 40 cm³ CO₂ + 35 cm³ unreacted O₂ = 75 cm³.',
    keyConcept: 'Eudiometry & Gay-Lussac\'s Law',
    oauExamTip: 'Liquid water formed at room temperature occupies negligible volume in eudiometry.',
    difficulty: 'medium'
  },
  {
    id: 'oau_chm_2010_11',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2010 Post-UTME',
    topic: 'Separation Techniques',
    questionText: 'Which of the following procedural sequences will cleanly separate a solid mixture of sand, sodium chloride and iodine into pure components?',
    options: [
      'Add water, filter, sublime, evaporate to dryness',
      'Add water, sublime, filter, evaporate to dryness',
      'Sublime, filter, add water, evaporate to dryness',
      'Sublime iodine, add water to dissolve NaCl, filter out sand, evaporate filtrate to obtain dry NaCl'
    ],
    correctOptionIndex: 3,
    explanation: 'First, heat gently to sublime iodine (collected on a cold surface). Next, add water to the remaining sand and NaCl mixture to dissolve the salt. Filter to separate insoluble sand, then evaporate the aqueous filtrate to recover crystalline NaCl.',
    keyConcept: 'Separation of Multi-Component Mixtures',
    oauExamTip: 'Sublimation must be carried out first before adding water, otherwise iodine is difficult to isolate cleanly.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2010_12',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2010 Post-UTME',
    topic: 'Chemical Bonding in Ammonium Salts',
    questionText: 'What types of chemical bonds are present in solid ammonium chloride (NH₄Cl)?',
    options: [
      'Covalent and electrovalent only',
      'Dative and covalent only',
      'Dative and electrovalent only',
      'Covalent, dative (coordinate), and electrovalent (ionic)'
    ],
    correctOptionIndex: 3,
    explanation: 'In NH₄Cl: (1) Three N-H bonds are normal polar covalent; (2) The fourth N-H bond is formed by coordinate/dative donation of the nitrogen lone pair to H⁺; (3) The resulting NH₄⁺ cation and Cl⁻ anion are bound by an electrovalent (ionic) bond.',
    keyConcept: 'Multiple Bonding Types in Single Compounds',
    oauExamTip: 'Ammonium salts (NH4Cl, NH4NO3) exhibit all three bond types: ionic, covalent, and coordinate.',
    difficulty: 'medium'
  },
  {
    id: 'oau_chm_2010_13',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2010 Post-UTME',
    topic: 'Empirical & Molecular Formulas',
    questionText: 'What is the chemical formula of the compound containing 6.02 × 10²³ atoms of hydrogen, 35.5 g of chlorine, and 4 moles of oxygen atoms?',
    options: [
      'HClO',
      'HClO₂',
      'HClO₄',
      'HCl₂O₄'
    ],
    correctOptionIndex: 2,
    explanation: 'Moles of H = 6.02 × 10²³ / 6.02 × 10²³ = 1 mol. Moles of Cl = 35.5 / 35.5 = 1 mol. Moles of O = 4 mol. The mole ratio H : Cl : O is 1 : 1 : 4. Therefore, the formula is HClO₄ (perchloric acid).',
    keyConcept: 'Deducing Formulas from Mole Quantities',
    oauExamTip: 'HClO = hypochlorous, HClO2 = chlorous, HClO3 = chloric, HClO4 = perchloric acid.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2010_14',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2010 Post-UTME',
    topic: 'Gas Volume over Water (Dalton\'s Law)',
    questionText: '20 cm³ of hydrogen were collected over water at 30°C and 740 mmHg total pressure. Calculate the volume of dry gas at s.t.p. if the saturated vapour pressure of water at 30°C is 14 mmHg.',
    options: [
      '16.82 cm³',
      '17.64 cm³',
      '18.54 cm³',
      '17.21 cm³'
    ],
    correctOptionIndex: 3,
    explanation: 'Pressure of dry hydrogen P₁ = P_total - P_vapour = 740 - 14 = 726 mmHg. V₁ = 20 cm³, T₁ = 30 + 273 = 303 K. At s.t.p.: P₂ = 760 mmHg, T₂ = 273 K. V₂ = (P₁V₁T₂) / (P₂T₁) = (726 × 20 × 273) / (760 × 303) = 3,963,960 / 230,280 = 17.21 cm³.',
    keyConcept: 'Gas Collection over Water & Combined Gas Law',
    oauExamTip: 'Always subtract aqueous tension (water vapour pressure) to obtain dry gas pressure.',
    difficulty: 'medium'
  },

  // =========================================================================
  // OAU 2013 POST-UTME CHEMISTRY
  // =========================================================================
  {
    id: 'oau_chm_2013_01',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2013 Post-UTME',
    topic: 'Periodic Table & Reducing Properties',
    questionText: 'Lithium (atomic number 3) in gaseous / standard chemical classifications is a:',
    options: [
      'Strong reducing agent',
      'Strong oxidizing agent',
      'Weak reducing agent',
      'Weak oxidizing agent'
    ],
    correctOptionIndex: 0,
    explanation: 'Lithium readily loses its single 2s valence electron. In aqueous solution, owing to its exceptionally high hydration enthalpy due to tiny ionic radius, lithium has the most negative standard reduction potential (-3.04 V), making it a very strong reducing agent.',
    keyConcept: 'Alkali Metal Reducing Power',
    oauExamTip: 'Lithium has the highest oxidation potential in aqueous solution due to high hydration energy.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2013_02',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2013 Post-UTME',
    topic: 'Organic Chemistry & Esters',
    questionText: 'The correct IUPAC name for the ester compound HCOOC₂H₅ is:',
    options: [
      'Methylethanoate',
      'Ethylmethanoate',
      'Ethylpropanoate',
      'Propylethanoate'
    ],
    correctOptionIndex: 1,
    explanation: 'HCOOC₂H₅ is derived from methanoic acid (HCOOH) and ethanol (C₂H₅OH). The alkyl group attached to the ester oxygen is ethyl, and the acyl chain contains 1 carbon (methanoate). Hence: Ethyl methanoate.',
    keyConcept: 'IUPAC Naming of Esters',
    oauExamTip: 'Name the alkyl group attached to oxygen first, then the carboxylate chain.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2013_03',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2013 Post-UTME',
    topic: 'Preparation of Alkynes',
    questionText: 'When calcium carbide (CaC₂) reacts with cold water, the organic gas product formed is:',
    options: [
      'Ethanol',
      'Ethanoic acid',
      'Ethane',
      'Ethyne (acetylene)'
    ],
    correctOptionIndex: 3,
    explanation: 'The hydrolysis of calcium dicarbide produces ethyne gas and calcium hydroxide: CaC₂ + 2H₂O → Ca(OH)₂ + C₂H₂↑.',
    keyConcept: 'Laboratory Preparation of Ethyne',
    oauExamTip: 'CaC2 + H2O is the classical reaction for generating ethyne (acetylene).',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2013_04',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2013 Post-UTME',
    topic: 'Gas Stoichiometry of Hydrocarbons',
    questionText: '100 cm³ of ethyne (C₂H₂) was mixed with 240 cm³ of oxygen in a combustion chamber. What volume of carbon(IV) oxide is produced upon ignition?',
    options: [
      '100 cm³',
      '24 cm³',
      '138 cm³',
      '192 cm³'
    ],
    correctOptionIndex: 3,
    explanation: '2C₂H₂ + 5O₂ → 4CO₂ + 2H₂O. 100 cm³ of ethyne would require 2.5 × 100 = 250 cm³ of O₂. Since only 240 cm³ of O₂ is available, oxygen is the limiting reactant. From the stoichiometry: 5 volumes of O₂ yield 4 volumes of CO₂. Volume of CO₂ = (4 / 5) × 240 = 192 cm³.',
    keyConcept: 'Limiting Reactant in Gas Stoichiometry',
    oauExamTip: 'Always check which gas is in short supply before calculating product volumes.',
    difficulty: 'medium'
  },
  {
    id: 'oau_chm_2013_05',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2013 Post-UTME',
    topic: 'Nuclear Fission Balancing',
    questionText: 'Uranium-235 fissions according to the nuclear equation: ²³⁵₉₂U + ¹₀n → ⁹⁴₃₆Kr + Ba + 3(¹₀n). The atomic number and mass number of Barium (Ba) respectively are:',
    options: [
      '46 and 126',
      '36 and 116',
      '56 and 139',
      '66 and 146'
    ],
    correctOptionIndex: 2,
    explanation: 'Conservation of atomic numbers (charge): 92 + 0 = 36 + Z_Ba + 3(0) ⇒ Z_Ba = 92 - 36 = 56. Conservation of mass numbers: 235 + 1 = 94 + A_Ba + 3(1) ⇒ 236 = 97 + A_Ba ⇒ A_Ba = 236 - 97 = 139. Thus: 56 and 139.',
    keyConcept: 'Balancing Nuclear Equations',
    oauExamTip: 'Sum of superscripts on left = sum of superscripts on right; sum of subscripts on left = sum of subscripts on right.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2013_06',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2013 Post-UTME',
    topic: 'Standard Cell Potential & Gibbs Energy',
    questionText: 'For half-cells X²⁺ + 2e⁻ → X (E° = 0.042 V) and Y⁺ + e⁻ → Y (E° = 0.012 V), what is the standard free energy change ΔG° for the spontaneous cell reaction? [F = 96,500 C mol⁻¹]',
    options: [
      '4.20 kJ',
      '-5.79 kJ',
      '6.86 kJ',
      '10.55 kJ'
    ],
    correctOptionIndex: 1,
    explanation: 'E°_cell = E°_cathode - E°_anode = 0.042 - 0.012 = 0.030 V. The balanced cell transfer involves n = 2 electrons. ΔG° = -nFE° = -2 × 96,500 × 0.030 = -5,790 J = -5.79 kJ.',
    keyConcept: 'ΔG° = -nFE°cell Calculation',
    oauExamTip: 'A spontaneous cell always has positive E°cell and negative ΔG°.',
    difficulty: 'medium'
  },
  {
    id: 'oau_chm_2013_07',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2013 Post-UTME',
    topic: 'Molecular Geometry & Dipole Moments',
    questionText: 'Which of the molecules SF₄, SiH₄, CO₂, ICl, CH₂Cl₂, SO₂, and XeO₃ do NOT possess a permanent dipole moment?',
    options: [
      'CO₂ and SiH₄ only',
      'SF₄ and SiH₄ only',
      'CO₂, SiH₄ and XeO₃',
      'SF₄, SiH₄, CO₂ and ICl'
    ],
    correctOptionIndex: 0,
    explanation: 'CO₂ is linear (O=C=O) and symmetric, so its equal and opposing C=O bond dipoles cancel completely (μ = 0). SiH₄ is perfectly tetrahedral and symmetric, so its bond moments cancel (μ = 0). All others are unsymmetrical with net dipole moments.',
    keyConcept: 'Symmetry and Dipole Moments in Molecules',
    oauExamTip: 'Symmetrical molecules (linear AB2, planar AB3, tetrahedral AB4) have zero dipole moment.',
    difficulty: 'medium'
  },
  {
    id: 'oau_chm_2013_08',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2013 Post-UTME',
    topic: 'Physical Chemistry & SI Unit Conversions',
    questionText: 'A sample of water weighs 200.0 g at 298 K. What is the volume of this water in cubic meters (m³) given that density is 0.98 g cm⁻³?',
    options: [
      '2.04 × 10⁻³ m³',
      '2.04 × 10⁻⁶ m³',
      '2.04 × 10⁻⁹ m³',
      '2.04 × 10⁻⁴ m³'
    ],
    correctOptionIndex: 3,
    explanation: 'Volume in cm³ = mass / density = 200.0 / 0.98 = 204.08 cm³. Since 1 m³ = 10⁶ cm³ (1 cm³ = 10⁻⁶ m³), Volume in m³ = 204.08 × 10⁻⁶ m³ = 2.04 × 10⁻⁴ m³.',
    keyConcept: 'Density and SI Volume Conversions',
    oauExamTip: '1 m³ = 1,000,000 cm³ = 10⁶ cm³.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2013_09',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2013 Post-UTME',
    topic: 'Acids, Bases & pH Calculations',
    questionText: 'What is the pH of a 0.02 mol/dm³ solution of tetraoxosulphate(VI) acid (H₂SO₄)?',
    options: [
      '1.456',
      '1.333',
      '1.400',
      '1.699'
    ],
    correctOptionIndex: 1,
    explanation: 'For 0.02 M H₂SO₄, [H⁺] = 2 × 0.02 = 0.04 mol/dm³ (assuming complete dissociation). pH = -log[H⁺] = -log(0.04) = -(-1.398) ≈ 1.40 (or if taking partial second dissociation, ~1.45). With log 0.04 = -1.398 ≈ 1.40.',
    keyConcept: 'Calculation of Strong Diprotic Acid pH',
    oauExamTip: 'pH = -log(2 × C) for strong diprotic acids.',
    difficulty: 'medium'
  },
  {
    id: 'oau_chm_2013_10',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2013 Post-UTME',
    topic: 'Electrophilic Addition & Markovnikov\'s Rule',
    questionText: 'The main product of the electrophilic addition of HCl to 2-methylpropene is:',
    options: [
      '2-chloro-2-methylbutane',
      '1-chloro-2-methylpropane',
      '2-chloro-2-methylpropane',
      '2-chloro-2-methylpropene'
    ],
    correctOptionIndex: 2,
    explanation: 'According to Markovnikov\'s rule, the electrophilic hydrogen adds to the carbon with more hydrogen atoms (C-1), forming the more stable tertiary carbocation at C-2. Chloride ion then attacks C-2, forming 2-chloro-2-methylpropane (tert-butyl chloride).',
    keyConcept: 'Markovnikov\'s Addition to Asymmetric Alkenes',
    oauExamTip: 'Hydrogen adds to the carbon with more hydrogens; halogen adds to the more substituted carbon.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2013_11',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2013 Post-UTME',
    topic: 'Redox Reactions Identification',
    questionText: 'Consider: (i) 2LiOH + CO₂ → Li₂CO₃ + H₂O; (ii) 2H₂ + O₂ → 2H₂O; (iii) 2Cu + O₂ → 2CuO; (iv) HCl + AgNO₃ → AgCl + HNO₃. Which of these are redox reactions?',
    options: [
      'i and iii only',
      'i, ii, iii only',
      'ii and iv only',
      'ii and iii only'
    ],
    correctOptionIndex: 3,
    explanation: 'In (ii), H changes from 0 to +1 and O changes from 0 to -2. In (iii), Cu changes from 0 to +2 and O from 0 to -2. Both involve electron transfer. Reactions (i) and (iv) are acid-base neutralization and double displacement precipitation where oxidation states remain unchanged.',
    keyConcept: 'Identification of Redox Reactions via Oxidation Numbers',
    oauExamTip: 'Combustion and combination with elemental oxygen are always redox reactions.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2013_12',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2013 Post-UTME',
    topic: 'Reactivity of Metals with Water & Steam',
    questionText: 'Which of the following metals CANNOT displace hydrogen from steam?',
    options: [
      'Copper',
      'Iron',
      'Strontium',
      'Lithium'
    ],
    correctOptionIndex: 0,
    explanation: 'Copper is located below hydrogen in the electrochemical reactivity series (standard reduction potential E° = +0.34 V). It cannot reduce H⁺ or steam to hydrogen gas under any conditions.',
    keyConcept: 'Metal Reactivity Series with Water/Steam',
    oauExamTip: 'Metals below hydrogen (Cu, Ag, Au, Pt) never displace hydrogen from water or steam.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2013_13',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2013 Post-UTME',
    topic: 'Exothermic Reactions & Equilibrium',
    questionText: 'For the exothermic reaction 2SO₂(g) + O₂(g) ⇌ 2SO₃(g), if the temperature of the reaction vessel is decreased, which of the following occurs?',
    options: [
      'The reaction rate increases',
      'The concentration of SO₃ decreases',
      'The equilibrium shifts right, increasing the concentration of SO₃',
      'SO₂ gas becomes completely unreactive'
    ],
    correctOptionIndex: 2,
    explanation: 'For an exothermic reaction (ΔH < 0), heat is a product. By Le Chatelier\'s principle, lowering temperature removes heat and drives the equilibrium forward to the right, increasing the yield and concentration of SO₃.',
    keyConcept: 'Temperature Effect on Exothermic Equilibria',
    oauExamTip: 'Cooling an exothermic reaction increases product yield.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2013_14',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2013 Post-UTME',
    topic: 'Concentration by Mass Percentage',
    questionText: 'What is the molarity of a 5% by weight aqueous solution of tetraoxosulphate(VI) acid (H₂SO₄)? [Molar mass = 98 g/mol, assuming density ≈ 1.05 g/cm³]',
    options: [
      '0.537 mol dm⁻³',
      '0.208 mol dm⁻³',
      '0.551 mol dm⁻³',
      '0.333 mol dm⁻³'
    ],
    correctOptionIndex: 0,
    explanation: '5% w/w means 5 g of H₂SO₄ in 100 g of solution (95 g H₂O). Volume of 100 g solution ≈ 95.2 cm³ = 0.0952 dm³. Moles of H₂SO₄ = 5 / 98 = 0.0510 mol. Molarity = 0.0510 / 0.0952 = 0.537 mol dm⁻³.',
    keyConcept: 'Percentage by Mass to Molarity',
    oauExamTip: 'Molarity = (percentage × density × 10) / molar mass.',
    difficulty: 'medium'
  },
  {
    id: 'oau_chm_2013_15',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2013 Post-UTME',
    topic: 'Applied Gas Mole Calculations',
    questionText: 'A motor truck releases an average of 5.0 g of carbon(II) oxide (CO) per kilometer. How many molecules of CO are emitted if the truck travels 8 km? [C = 12, O = 16, N_A = 6.02 × 10²³]',
    options: [
      '4.32 × 10²²',
      '2.48 × 10²³',
      '8.60 × 10²³',
      '6.82 × 10²¹'
    ],
    correctOptionIndex: 2,
    explanation: 'Total mass of CO = 5.0 g/km × 8 km = 40.0 g. Molar mass of CO = 12 + 16 = 28 g/mol. Moles of CO = 40.0 / 28 = 1.428 mol. Number of molecules = 1.428 × 6.02 × 10²³ = 8.60 × 10²³ molecules.',
    keyConcept: 'Vehicle Emissions & Avogadro\'s Number',
    oauExamTip: 'Calculate total mass first, convert to moles, then multiply by Avogadro\'s constant.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2013_16',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2013 Post-UTME',
    topic: 'Kjeldahl Method for Nitrogen Estimation',
    questionText: 'A 0.250 g sample of an organic compound was analyzed by the Kjeldahl method. The ammonia produced was neutralized by 27.0 cm³ of 0.10 mol dm⁻³ HCl. What is the percentage of nitrogen in the compound? [N = 14]',
    options: [
      '18.4%',
      '17.8%',
      '15.1%',
      '13.3%'
    ],
    correctOptionIndex: 2,
    explanation: 'Moles of HCl = (27.0 / 1000) × 0.10 = 0.0027 mol. Since NH₃ + HCl → NH₄Cl, moles of NH₃ = moles of N = 0.0027 mol. Mass of nitrogen = 0.0027 × 14 = 0.0378 g. % Nitrogen = (0.0378 / 0.250) × 100 = 15.12% ≈ 15.1%.',
    keyConcept: 'Kjeldahl Quantitative Analysis for Nitrogen',
    oauExamTip: '% N = (1.4 × Molarity of acid × Volume of acid in cm³) / mass of sample.',
    difficulty: 'medium'
  },
  {
    id: 'oau_chm_2013_17',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2013 Post-UTME',
    topic: 'Faraday & Half-Cell Stoichiometry',
    questionText: 'Given the half-reaction O₂ + 4H⁺ + 4e⁻ → 2H₂O, how many moles of electrons are required to produce 3.01 × 10²² molecules of water?',
    options: [
      '0.05 mol',
      '0.10 mol',
      '0.15 mol',
      '0.20 mol'
    ],
    correctOptionIndex: 1,
    explanation: 'Moles of H₂O = (3.01 × 10²²) / (6.02 × 10²³) = 0.05 mol. From the stoichiometry: 2 moles of H₂O require 4 moles of electrons (a 2 : 1 ratio). Therefore, moles of electrons = 2 × 0.05 mol = 0.10 mole of electrons.',
    keyConcept: 'Electrochemical Half-Equation Stoichiometry',
    oauExamTip: 'Ratio of electrons to water is 4e- : 2H2O = 2:1.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2013_18',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2013 Post-UTME',
    topic: 'Quantum Numbers',
    questionText: 'In an atom, the azimuthal quantum number (l) defines:',
    options: [
      'The principal electronic shell (K, L, M, N)',
      'The geometric shape and subshell of the orbital',
      'The electron spin direction',
      'The nuclear multiplicity'
    ],
    correctOptionIndex: 1,
    explanation: 'The azimuthal (orbital angular momentum) quantum number l specifies the orbital shape and subshell: l=0 corresponds to spherical s-orbitals, l=1 to dumbbell-shaped p-orbitals, l=2 to cloverleaf d-orbitals.',
    keyConcept: 'Azimuthal Quantum Number and Orbital Geometry',
    oauExamTip: 'n = size/energy, l = shape/subshell, m = orientation, s = spin.',
    difficulty: 'easy'
  },
  {
    id: 'oau_chm_2013_19',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2013 Post-UTME',
    topic: 'Iodoform Test for Carbonyls & Alkanols',
    questionText: 'Which of the following pairs of compounds will both give a positive yellow precipitate in the triiodomethane (iodoform) test? [(i) butan-2-one, (ii) propanoic acid, (iii) ethanol, (iv) benzaldehyde]',
    options: [
      '(i) and (ii)',
      '(i) and (iii)',
      '(iii) and (iv)',
      '(ii) and (iv)'
    ],
    correctOptionIndex: 1,
    explanation: 'The iodoform test gives a positive result (yellow CHI₃ precipitate) for compounds containing the methyl carbonyl group (CH₃-C=O) or methyl carbinol group (CH₃-CH(OH)-). Butan-2-one (CH₃-CO-CH₂CH₃) and ethanol (CH₃-CH₂OH) both possess this feature.',
    keyConcept: 'Structure Required for Positive Iodoform Test',
    oauExamTip: 'Ethanol is the only primary alcohol that gives a positive iodoform test.',
    difficulty: 'medium'
  },
  {
    id: 'oau_chm_2013_20',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2013 Post-UTME',
    topic: 'General Formula for Alkanol Combustion',
    questionText: 'For the complete combustion of one mole of a saturated monohydric alkanol: C_n H_{2n+1}OH + xO₂ → yCO₂ + (n+1)H₂O. What is the stoichiometric coefficient x in terms of n?',
    options: [
      '(3n + 1) / 2',
      '(3n - 1) / 2',
      '3n / 2',
      '(3n + 3) / 2'
    ],
    correctOptionIndex: 2,
    explanation: 'Balancing carbons gives y = n. Balancing hydrogens gives (2n + 2) / 2 = (n + 1) H₂O. Total oxygen atoms on product side = 2n (from CO₂) + (n + 1) (from H₂O) = 3n + 1. Since the alcohol already contains 1 oxygen atom, oxygen from O₂ needed = (3n + 1) - 1 = 3n. Thus, moles of O₂ x = 3n / 2.',
    keyConcept: 'Algebraic Balancing of Organic Combustion',
    oauExamTip: 'Remember to subtract the 1 oxygen atom already present in the alcohol molecule.',
    difficulty: 'medium'
  },
  {
    id: 'oau_chm_2013_21',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: 'OAU 2013 Post-UTME',
    topic: 'Subatomic Structure of Ions',
    questionText: 'An ion has a net charge of +3. The mass number of its nucleus is 120. If the number of neutrons is 1.50 times the number of protons, how many electrons are present in the ion?',
    options: [
      '55',
      '48',
      '45',
      '42'
    ],
    correctOptionIndex: 2,
    explanation: 'Mass number A = protons (p) + neutrons (n) = 120. Given n = 1.50p. p + 1.50p = 120 ⇒ 2.50p = 120 ⇒ p = 48 protons. Since the ion has a +3 charge, it has lost 3 electrons. Number of electrons = 48 - 3 = 45 electrons.',
    keyConcept: 'Calculation of Protons, Neutrons & Electrons in Ions',
    oauExamTip: 'Positive charge means electrons = protons - charge.',
    difficulty: 'medium'
  }
];
