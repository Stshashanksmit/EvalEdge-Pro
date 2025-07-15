export const evaluationGroups = [
  {
    id: 'foundations',
    name: 'Foundations',
    weight: 30,
    factors: ['depthOfKnowledge', 'breadthOfKnowledge', 'skillComparison']
  },
  {
    id: 'execution',
    name: 'Execution', 
    weight: 30,
    factors: ['problemSolving', 'changeLeadership', 'influence']
  },
  {
    id: 'outcomes',
    name: 'Organizational Outcomes',
    weight: 40,
    factors: ['businessValue', 'decisionMaking', 'valueChain']
  }
];

export const evaluationFactors = {
  depthOfKnowledge: {
    id: 'depthOfKnowledge',
    name: 'Depth of Knowledge',
    group: 'foundations',
    weight: 10,
    definition: 'The degree of specialized technical, professional, or functional mastery required to effectively perform the role, including problem framing and interpretation.',
    scale: [
      {
        score: 1,
        anchor: 'Basic',
        description: 'Basic operational or procedural know-how; works within defined methods.',
        examples: ['Data entry clerk', 'General admin support']
      },
      {
        score: 2,
        anchor: 'Working',
        description: 'Solid practical knowledge; applies established principles to standard tasks.',
        examples: ['Junior accountant', 'Support technician']
      },
      {
        score: 3,
        anchor: 'Proficient',
        description: 'Advanced functional expertise; handles non-routine issues within area.',
        examples: ['Senior analyst', 'HR business partner']
      },
      {
        score: 4,
        anchor: 'Expert',
        description: 'Deep specialist knowledge; recognized internally as go-to expert.',
        examples: ['Senior engineer', 'Internal legal counsel']
      },
      {
        score: 5,
        anchor: 'Enterprise Expert',
        description: 'Broad mastery across multiple functions; influences practices or standards.',
        examples: ['Chief architect', 'Senior regulatory advisor']
      },
      {
        score: 6,
        anchor: 'Industry Expert',
        description: 'Recognized externally; shapes industry thinking or standards.',
        examples: ['Distinguished scientist', 'Sector strategy leader']
      },
      {
        score: 7,
        anchor: 'Thought Leader',
        description: 'Pioneers new methods or paradigms; widely acknowledged as a leader in the field.',
        examples: ['Chief scientist', 'National-level advisor']
      }
    ]
  },
  breadthOfKnowledge: {
    id: 'breadthOfKnowledge',
    name: 'Breadth of Knowledge (Hierarchical)',
    group: 'foundations',
    weight: 10,
    definition: 'The range of functional, cross-disciplinary, or enterprise-level knowledge required to effectively navigate and integrate within the organization.',
    scale: [
      {
        score: 1,
        anchor: 'Focused',
        description: 'Specialized in a single function; minimal cross-functional awareness.',
        examples: ['Lab technician', 'Payroll clerk']
      },
      {
        score: 2,
        anchor: 'Functional',
        description: 'Awareness of adjacent functions; supports team collaboration.',
        examples: ['HR generalist', 'Maintenance supervisor']
      },
      {
        score: 3,
        anchor: 'Multi-functional',
        description: 'Integrates across multiple functions or business areas.',
        examples: ['Operations manager', 'BU finance head']
      },
      {
        score: 4,
        anchor: 'Enterprise-wide',
        description: 'Connects and applies knowledge across the entire organization.',
        examples: ['CIO', 'Plant general manager']
      },
      {
        score: 5,
        anchor: 'Market Integrator',
        description: 'Understands and applies cross-industry or market-level insights.',
        examples: ['Chief transformation officer', 'Strategy head']
      }
    ]
  },
  skillComparison: {
    id: 'skillComparison',
    name: 'Skill Comparison (Modifier)',
    group: 'foundations',
    weight: 10,
    definition: 'Measures the rarity, distinctiveness, and external market scarcity of the skill set, affecting replaceability and strategic talent value.',
    scale: [
      {
        score: 1,
        anchor: 'Common',
        description: 'Widely available; easy to source or develop.',
        examples: ['General clerical staff', 'Entry-level admin']
      },
      {
        score: 2,
        anchor: 'Broadly Available',
        description: 'Common professional or technical skill sets.',
        examples: ['General accountants', 'Electricians']
      },
      {
        score: 3,
        anchor: 'Specialized',
        description: 'Moderate scarcity; requires specific training or niche skills.',
        examples: ['Data security analyst', 'Control systems engineer']
      },
      {
        score: 4,
        anchor: 'Rare',
        description: 'Difficult to source; critical expertise in limited talent pools.',
        examples: ['Heritage restorer', 'High-level cybersecurity specialist']
      },
      {
        score: 5,
        anchor: 'Exceptional',
        description: 'Extremely scarce and strategically vital skills.',
        examples: ['Master blacksmith', 'National-level conservation expert']
      }
    ]
  },
  problemSolving: {
    id: 'problemSolving',
    name: 'Problem Solving & Innovation',
    group: 'execution',
    weight: 10,
    definition: 'Level of independent analysis, problem definition, and originality required to create new solutions or improve processes.',
    scale: [
      {
        score: 1,
        anchor: 'Routine',
        description: 'Solves standard problems using established approaches.',
        examples: ['Invoice processor', 'Helpdesk agent']
      },
      {
        score: 2,
        anchor: 'Adaptive',
        description: 'Makes minor adjustments to known solutions.',
        examples: ['Shift supervisor', 'Service team leader']
      },
      {
        score: 3,
        anchor: 'Analytical',
        description: 'Analyzes moderate complexity issues; develops tailored solutions.',
        examples: ['HR partner', 'Maintenance engineer']
      },
      {
        score: 4,
        anchor: 'Integrative',
        description: 'Develops new approaches integrating multiple viewpoints.',
        examples: ['Product manager', 'Senior analyst']
      },
      {
        score: 5,
        anchor: 'Transformative',
        description: 'Redefines frameworks or designs strategic new solutions.',
        examples: ['Business architect', 'Innovation lead']
      },
      {
        score: 6,
        anchor: 'Pioneering',
        description: 'Drives creation of new methods with strategic organizational impact.',
        examples: ['Head of R&D', 'Chief data scientist']
      },
      {
        score: 7,
        anchor: 'Visionary',
        description: 'Creates ground-breaking solutions shaping industry direction.',
        examples: ['Global innovation head', 'Sector research leader']
      }
    ]
  },
  changeLeadership: {
    id: 'changeLeadership',
    name: 'Change Leadership & Agility',
    group: 'execution',
    weight: 10,
    definition: 'Extent to which the role drives, leads, and adapts to change across teams, functions, or enterprise contexts.',
    scale: [
      {
        score: 1,
        anchor: 'Self-Adaptive',
        description: 'Adapts to change personally without leadership responsibility.',
        examples: ['Entry-level operator', 'Junior admin']
      },
      {
        score: 2,
        anchor: 'Team Support',
        description: 'Supports small team changes; influences immediate peers.',
        examples: ['Team lead', 'Support supervisor']
      },
      {
        score: 3,
        anchor: 'Team Driver',
        description: 'Leads change efforts within a single functional team.',
        examples: ['Functional manager', 'Project leader']
      },
      {
        score: 4,
        anchor: 'Multi-Team Driver',
        description: 'Orchestrates changes across multiple teams or departments.',
        examples: ['BU head', 'Large site manager']
      },
      {
        score: 5,
        anchor: 'Enterprise Leader',
        description: 'Leads enterprise-wide transformations.',
        examples: ['Transformation director', 'CXO-level role']
      },
      {
        score: 6,
        anchor: 'Ecosystem Leader',
        description: 'Leads changes involving partners, regulators, or markets.',
        examples: ['Group CEO', 'Public policy head']
      },
      {
        score: 7,
        anchor: 'Societal Shaper',
        description: 'Drives change at societal or industry level.',
        examples: ['National transformation leader', 'Industry association chair']
      }
    ]
  },
  influence: {
    id: 'influence',
    name: 'Influence & Alignment',
    group: 'execution',
    weight: 10,
    definition: 'Scope and intensity of influence over internal and external stakeholders to drive alignment and achieve objectives.',
    scale: [
      {
        score: 1,
        anchor: 'Information Exchange',
        description: 'Primarily provides information or updates to immediate team; minimal persuasion or alignment effort.',
        examples: ['Junior analyst', 'Entry-level technician']
      },
      {
        score: 2,
        anchor: 'Persuade',
        description: 'Convinces or influences within a defined group or function; focus is mostly internal.',
        examples: ['Team supervisor', 'Internal project coordinator']
      },
      {
        score: 3,
        anchor: 'Influence',
        description: 'Aligns and negotiates with multiple internal functions or business units; moderate strategic context.',
        examples: ['BU finance lead', 'Senior product manager']
      },
      {
        score: 4,
        anchor: 'Negotiate',
        description: 'Shapes strategic decisions through strong influence over senior leaders and/or key external partners.',
        examples: ['Government affairs head', 'Senior legal counsel']
      },
      {
        score: 5,
        anchor: 'Strategize',
        description: 'Defines or shifts external ecosystem strategies, policy positions, or broad industry alignment.',
        examples: ['CEO', 'Chief external relations officer']
      }
    ]
  },
  businessValue: {
    id: 'businessValue',
    name: 'Business Value Impact (Hierarchical)',
    group: 'outcomes',
    weight: 20,
    definition: 'Extent to which the role contributes to achieving revenue, strategic growth, operational success, or organizational survival.',
    scale: [
      {
        score: 1,
        anchor: 'Supportive',
        description: 'Indirectly contributes; minimal measurable impact.',
        examples: ['Office admin', 'Data processor']
      },
      {
        score: 2,
        anchor: 'Operational',
        description: 'Direct operational impact within a team or function.',
        examples: ['Service manager', 'Sales supervisor']
      },
      {
        score: 3,
        anchor: 'Functional',
        description: 'Impacts performance of a department or functional unit.',
        examples: ['Marketing manager', 'Plant operations head']
      },
      {
        score: 4,
        anchor: 'Business Unit',
        description: 'Significant impact on a business unit\'s success.',
        examples: ['BU head', 'Regional sales director']
      },
      {
        score: 5,
        anchor: 'Enterprise',
        description: 'Critical to enterprise-wide performance and strategy.',
        examples: ['CFO', 'CIO']
      },
      {
        score: 6,
        anchor: 'Multi-Entity',
        description: 'Drives value across multiple businesses or markets.',
        examples: ['Group CEO', 'Country president']
      },
      {
        score: 7,
        anchor: 'Industry/Society',
        description: 'Influences entire industries or societal-level outcomes.',
        examples: ['Chief Mentor', 'Industry association leader']
      }
    ]
  },
  decisionMaking: {
    id: 'decisionMaking',
    name: 'Decision-Making Authority (Hierarchical)',
    group: 'outcomes',
    weight: 10,
    definition: 'Degree of independence, finality, and scope in making decisions affecting resources, strategy, and overall direction.',
    scale: [
      {
        score: 1,
        anchor: 'Prescribed',
        description: 'Decisions strictly follow guidelines with close oversight.',
        examples: ['Admin assistant', 'Operator']
      },
      {
        score: 2,
        anchor: 'Routine',
        description: 'Makes limited operational decisions with clear boundaries.',
        examples: ['Frontline supervisor', 'Line manager']
      },
      {
        score: 3,
        anchor: 'People',
        description: 'Makes decisions impacting functional area performance.',
        examples: ['Functional head', 'Senior project manager']
      },
      {
        score: 4,
        anchor: 'People and Financials',
        description: 'Sets direction at business unit or large project level.',
        examples: ['BU director', 'Program portfolio lead']
      },
      {
        score: 5,
        anchor: 'People, Financials and Enterprise',
        description: 'Defines enterprise or market-level strategic direction.',
        examples: ['CEO', 'Group COO']
      }
    ]
  },
  valueChain: {
    id: 'valueChain',
    name: 'Role in Value Chain (Modifier)',
    group: 'outcomes',
    weight: 10,
    definition: 'Placement of the role in driving or supporting direct value delivery, from core business activities to support functions.',
    scale: [
      {
        score: 1,
        anchor: 'Support',
        description: 'Provides indirect or administrative support to enable delivery.',
        examples: ['Finance processing', 'HR clerk']
      },
      {
        score: 2,
        anchor: 'Enabling',
        description: 'Enables core processes but does not directly create business value.',
        examples: ['IT infrastructure', 'Legal advisor']
      },
      {
        score: 3,
        anchor: 'Shared',
        description: 'Involves partial direct delivery and partial support functions.',
        examples: ['Project management office head', 'Procurement lead']
      },
      {
        score: 4,
        anchor: 'Line Critical',
        description: 'Directly responsible for core product or service delivery.',
        examples: ['Manufacturing manager', 'Sales head']
      },
      {
        score: 5,
        anchor: 'Pivotal',
        description: 'Central to strategic value creation and competitive advantage.',
        examples: ['Chief product officer', 'Key business line director']
      }
    ]
  }
};

export const organizationalScoring = {
  revenue: [
    { min: 0, max: 5, points: 1, label: '< $5M' },
    { min: 5, max: 25, points: 2, label: '$5M–25M' },
    { min: 25, max: 250, points: 3, label: '$25M–250M' },
    { min: 250, max: 1000, points: 4, label: '$250M–1B' },
    { min: 1000, max: 5000, points: 5, label: '$1B–5B' },
    { min: 5000, max: Infinity, points: 6, label: '> $5B' }
  ],
  headcount: [
    { min: 0, max: 50, points: 1, label: '< 50' },
    { min: 50, max: 249, points: 2, label: '50–249' },
    { min: 250, max: 999, points: 3, label: '250–999' },
    { min: 1000, max: 4999, points: 4, label: '1,000–4,999' },
    { min: 5000, max: 19999, points: 5, label: '5,000–19,999' },
    { min: 20000, max: Infinity, points: 6, label: '>20,000' }
  ],
  countries: [
    { min: 1, max: 1, points: 1, label: '1' },
    { min: 2, max: 3, points: 2, label: '2–3' },
    { min: 4, max: 5, points: 3, label: '4–5' },
    { min: 6, max: 10, points: 4, label: '6–10' },
    { min: 11, max: 15, points: 5, label: '11–15' },
    { min: 16, max: Infinity, points: 6, label: '>15' }
  ]
};

export const organizationalTags = [
  { minScore: 3, maxScore: 4, tag: 'Lean Local', description: 'Start-up, regional NGO, micro-enterprise.' },
  { minScore: 5, maxScore: 6, tag: 'Stable National', description: 'SME, growing firm, small agency.' },
  { minScore: 7, maxScore: 9, tag: 'Expanding Enterprise', description: 'Large national, early-stage MNC.' },
  { minScore: 10, maxScore: 12, tag: 'Global Player', description: 'Mature multinational, scaled operations.' },
  { minScore: 13, maxScore: 18, tag: 'Complex Conglomerate', description: 'Diversified, global, high-governance group.' }
];

export const industries = [
  'Professional Services e.g. Consulting, HR, Legal, Marketing Agencies',
  'Tech / Digital Products e.g. SaaS, IT Services, Platforms, Product Start-ups',
  'Manufacturing & Engineering e.g. Factories, Heavy Industry, Electronics',
  'Logistics & Supply Chain e.g. Transport, Warehousing, Distribution',
  'Banking & Financial Services e.g. Banks, Insurance, Fintech, Microfinance',
  'Healthcare & Life Sciences e.g. Hospitals, Pharma, MedTech, Clinics',
  'Public Sector & Government Organizations e.g. Government, PSUs, Municipal Bodies',
  'Education & Non-profit e.g. Schools, EdTech, NGOs, Development Orgs',
  'Retail & Consumer Services e.g. Retail, FMCG, Hospitality, E-commerce',
  'Energy & Utilities e.g. Oil & Gas, Electricity, Water, Renewables',
  'Others (Please specify)'
];

// Utility functions
export const calculateOrganizationalScore = (revenue, headcount, countries) => {
  const getPoints = (value, scale) => {
    const range = scale.find(r => value >= r.min && value < r.max);
    return range ? range.points : 0;
  };

  const revenuePoints = getPoints(revenue, organizationalScoring.revenue);
  const headcountPoints = getPoints(headcount, organizationalScoring.headcount);
  const countryPoints = getPoints(countries, organizationalScoring.countries);

  return revenuePoints + headcountPoints + countryPoints;
};

export const getOrganizationalTag = (totalScore) => {
  const tag = organizationalTags.find(t => totalScore >= t.minScore && totalScore <= t.maxScore);
  return tag || { tag: 'Unknown', description: 'Score out of range' };
};

export const calculateEvalEdgeScore = (factorScores, organizationalScore) => {
  let totalWeightedScore = 0;

  Object.keys(factorScores).forEach(factorId => {
    const factor = evaluationFactors[factorId];
    if (factor && factorScores[factorId]) {
      const weightedScore = factorScores[factorId] * (factor.weight / 100);
      totalWeightedScore += weightedScore;
    }
  });

  return totalWeightedScore * organizationalScore;
};