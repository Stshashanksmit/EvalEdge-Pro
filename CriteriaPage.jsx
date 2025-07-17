import React from 'react';

const factorGroups = [
  {
    name: "Foundations",
    weight: "30%",
    factors: [
      {
        name: "Depth of Knowledge",
        definition: "The degree of specialized technical, professional, or functional mastery required to effectively perform the role, including problem framing and interpretation.",
        scale: [
          { score: 1, anchor: "Basic", description: "Basic operational or procedural know-how; works within defined methods.", examples: "Data entry clerk, General admin support." },
          { score: 2, anchor: "Working", description: "Solid practical knowledge; applies established principles to standard tasks.", examples: "Junior accountant, Support technician." },
          { score: 3, anchor: "Proficient", description: "Advanced functional expertise; handles non-routine issues within area.", examples: "Senior analyst, HR business partner." },
          { score: 4, anchor: "Expert", description: "Deep specialist knowledge; recognized internally as go-to expert.", examples: "Senior engineer, Internal legal counsel." },
          { score: 5, anchor: "Enterprise Expert", description: "Broad mastery across multiple functions; influences practices or standards.", examples: "Chief architect, Senior regulatory advisor." },
          { score: 6, anchor: "Industry Expert", description: "Recognized externally; shapes industry thinking or standards.", examples: "Distinguished scientist, Sector strategy leader." },
          { score: 7, anchor: "Thought Leader", description: "Pioneers new methods or paradigms; widely acknowledged as a leader in the field.", examples: "Chief scientist, National-level advisor." },
        ],
      },
      {
        name: "Breadth of Knowledge (Hierarchical)",
        definition: "The range of functional, cross-disciplinary, or enterprise-level knowledge required to effectively navigate and integrate within the organization.",
        scale: [
          { score: 1, anchor: "Focused", description: "Specialized in a single function; minimal cross-functional awareness.", examples: "Lab technician, Payroll clerk." },
          { score: 2, anchor: "Functional", description: "Awareness of adjacent functions; supports team collaboration.", examples: "HR generalist, Maintenance supervisor." },
          { score: 3, anchor: "Multi-functional", description: "Integrates across multiple functions or business areas.", examples: "Operations manager, BU finance head." },
          { score: 4, anchor: "Enterprise-wide", description: "Connects and applies knowledge across the entire organization.", examples: "CIO, Plant general manager." },
          { score: 5, anchor: "Market Integrator", description: "Understands and applies cross-industry or market-level insights.", examples: "Chief transformation officer, Strategy head." },
        ],
      },
      {
        name: "Skill Comparison (Modifier)",
        definition: "Measures the rarity, distinctiveness, and external market scarcity of the skill set, affecting replaceability and strategic talent value.",
        scale: [
            { score: 1, anchor: "Common", description: "Widely available; easy to source or develop.", examples: "General clerical staff, Entry-level admin." },
            { score: 2, anchor: "Broadly Available", description: "Common professional or technical skill sets.", examples: "General accountants, Electricians." },
            { score: 3, anchor: "Specialized", description: "Moderate scarcity; requires specific training or niche skills.", examples: "Data security analyst, Control systems engineer." },
            { score: 4, anchor: "Rare", description: "Difficult to source; critical expertise in limited talent pools.", examples: "Heritage restorer, High-level cybersecurity specialist." },
            { score: 5, anchor: "Exceptional", description: "Extremely scarce and strategically vital skills.", examples: "Master blacksmith, National-level conservation expert." },
        ],
      },
    ],
  },
  {
    name: "Execution",
    weight: "30%",
    factors: [
        {
            name: "Problem Solving & Innovation",
            definition: "Level of independent analysis, problem definition, and originality required to create new solutions or improve processes.",
            scale: [
                { score: 1, anchor: "Routine", description: "Solves standard problems using established approaches.", examples: "Invoice processor, Helpdesk agent." },
                { score: 2, anchor: "Adaptive", description: "Makes minor adjustments to known solutions.", examples: "Shift supervisor, Service team leader." },
                { score: 3, anchor: "Analytical", description: "Analyzes moderate complexity issues; develops tailored solutions.", examples: "HR partner, Maintenance engineer." },
                { score: 4, anchor: "Integrative", description: "Develops new approaches integrating multiple viewpoints.", examples: "Product manager, Senior analyst." },
                { score: 5, anchor: "Transformative", description: "Redefines frameworks or designs strategic new solutions.", examples: "Business architect, Innovation lead." },
                { score: 6, anchor: "Pioneering", description: "Drives creation of new methods with strategic organizational impact.", examples: "Head of R&D, Chief data scientist." },
                { score: 7, anchor: "Visionary", description: "Creates ground-breaking solutions shaping industry direction.", examples: "Global innovation head, Sector research leader." },
            ],
        },
        {
            name: "Change Leadership & Agility",
            definition: "Extent to which the role drives, leads, and adapts to change across teams, functions, or enterprise contexts.",
            scale: [
                { score: 1, anchor: "Self-Adaptive", description: "Adapts to change personally without leadership responsibility.", examples: "Entry-level operator, Junior admin." },
                { score: 2, anchor: "Team Support", description: "Supports small team changes; influences immediate peers.", examples: "Team lead, Support supervisor." },
                { score: 3, anchor: "Team Driver", description: "Leads change efforts within a single functional team.", examples: "Functional manager, Project leader." },
                { score: 4, anchor: "Multi-Team Driver", description: "Orchestrates changes across multiple teams or departments.", examples: "BU head, Large site manager." },
                { score: 5, anchor: "Enterprise Leader", description: "Leads enterprise-wide transformations.", examples: "Transformation director, CXO-level role." },
                { score: 6, anchor: "Ecosystem Leader", description: "Leads changes involving partners, regulators, or markets.", examples: "Group CEO, Public policy head." },
                { score: 7, anchor: "Societal Shaper", description: "Drives change at societal or industry level.", examples: "National transformation leader, Industry association chair." },
            ],
        },
        {
            name: "Influence & Alignment",
            definition: "Scope and intensity of influence over internal and external stakeholders to drive alignment and achieve objectives.",
            scale: [
                { score: 1, anchor: "Information Exchange", description: "Primarily provides information or updates to immediate team; minimal persuasion or alignment effort.", examples: "Junior analyst, Entry-level technician." },
                { score: 2, anchor: "Persuade", description: "Convinces or influences within a defined group or function; focus is mostly internal.", examples: "Team supervisor, Internal project coordinator." },
                { score: 3, anchor: "Influence", description: "Aligns and negotiates with multiple internal functions or business units; moderate strategic context and cross-functional alignment.", examples: "BU finance lead, Senior product manager." },
                { score: 4, anchor: "Negotiate", description: "Shapes strategic decisions through strong influence over senior leaders and/or key external partners; combines internal and external influence.", examples: "Government affairs head, Senior legal counsel." },
                { score: 5, anchor: "Strategize", description: "Defines or shifts external ecosystem strategies, policy positions, or broad industry alignment; heavy external influence and large-scale shaping.", examples: "CEO, Chief external relations officer." },
            ],
        },
    ],
  },
  {
    name: "Organizational Outcomes",
    weight: "40%",
    factors: [
        {
            name: "Business Value Impact (Hierarchical)",
            definition: "Extent to which the role contributes to achieving revenue, strategic growth, operational success, or organizational survival.",
            scale: [
                { score: 1, anchor: "Supportive", description: "Indirectly contributes; minimal measurable impact.", examples: "Office admin, Data processor." },
                { score: 2, anchor: "Operational", description: "Direct operational impact within a team or function.", examples: "Service manager, Sales supervisor." },
                { score: 3, anchor: "Functional", description: "Impacts performance of a department or functional unit.", examples: "Marketing manager, Plant operations head." },
                { score: 4, anchor: "Business Unit", description: "Significant impact on a business unit’s success.", examples: "BU head, Regional sales director." },
                { score: 5, anchor: "Enterprise", description: "Critical to enterprise-wide performance and strategy.", examples: "CFO, CIO." },
                { score: 6, anchor: "Multi-Entity", description: "Drives value across multiple businesses or markets.", examples: "Group CEO, Country president." },
                { score: 7, anchor: "Industry/Society", description: "Influences entire industries or societal-level outcomes.", examples: "Chief Mentor, Director, Industry association leader." },
            ],
        },
        {
            name: "Decision-Making Authority (Hierarchical)",
            definition: "Degree of independence, finality, and scope in making decisions affecting resources, strategy, and overall direction.",
            scale: [
                { score: 1, anchor: "Prescribed", description: "Decisions strictly follow guidelines with close oversight.", examples: "Admin assistant, Operator." },
                { score: 2, anchor: "Routine", description: "Makes limited operational decisions with clear boundaries.", examples: "Frontline supervisor, Line manager." },
                { score: 3, anchor: "People", description: "Makes decisions impacting functional area performance.", examples: "Functional head, Senior project manager." },
                { score: 4, anchor: "People and Financials", description: "Sets direction at business unit or large project level.", examples: "BU director, Program portfolio lead." },
                { score: 5, anchor: "People, Financials and Enterprise", description: "Defines enterprise or market-level strategic direction.", examples: "CEO, Group COO." },
            ],
        },
        {
            name: "Role in Value Chain (Modifier)",
            definition: "Placement of the role in driving or supporting direct value delivery, from core business activities to support functions.",
            scale: [
                { score: 1, anchor: "Support", description: "Provides indirect or administrative support to enable delivery.", examples: "Finance processing, HR clerk." },
                { score: 2, anchor: "Enabling", description: "Enables core processes but does not directly create business value.", examples: "IT infrastructure, Legal advisor." },
                { score: 3, anchor: "Shared", description: "Involves partial direct delivery and partial support functions.", examples: "Project management office head, Procurement lead." },
                { score: 4, anchor: "Line Critical", description: "Directly responsible for core product or service delivery.", examples: "Manufacturing manager, Sales head." },
                { score: 5, anchor: "Pivotal", description: "Central to strategic value creation and competitive advantage.", examples: "Chief product officer, Key business line director." },
            ],
        },
    ],
  },
];

const CriteriaPage = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Evaluation Criteria</h1>
      {factorGroups.map((group) => (
        <div key={group.name} className="mb-12">
          <div className="flex items-baseline mb-6">
            <h2 className="text-3xl font-semibold mr-4">{group.name}</h2>
            <span className="text-xl text-gray-500">Weight: {group.weight}</span>
          </div>
          {group.factors.map((factor) => (
            <div key={factor.name} className="mb-8 p-6 bg-white rounded-lg shadow">
              <h3 className="text-2xl font-bold mb-2">{factor.name}</h3>
              <p className="text-gray-600 italic mb-6">{factor.definition}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {factor.scale.map((item) => (
                  <div key={item.score} className="border p-4 rounded-md">
                    <p className="font-bold text-lg mb-1">{item.score}. {item.anchor}</p>
                    <p className="text-sm mb-2">{item.description}</p>
                    <p className="text-xs text-gray-500 italic">E.g., {item.examples}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CriteriaPage;
