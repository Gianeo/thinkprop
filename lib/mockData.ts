import type {
  AtRiskPerson,
  TeamMember,
  OrgStats,
  ComplianceItem,
  Course,
  AtRiskEntry,
} from './types'

export const adminProfile = {
  name: 'Tariq Hamdan',
  role: 'Training & Compliance Manager',
  initials: 'TH',
  company: 'Prestige Properties Dubai',
}

export const orgStats: OrgStats = {
  complianceScore: 74,
  complianceScoreDelta: '+2%',
  complianceScoreDeltaUp: true,
  atRisk: 7,
  atRiskDelta: '+2 this week',
  atRiskDeltaUp: false,
  expiringThisWeek: 3,
  fullyCompliant: 31,
  totalTeam: 40,
}

export const atRiskList: AtRiskPerson[] = [
  {
    id: '1',
    name: 'Reem Al Mansoori',
    initials: 'RA',
    department: 'Sales',
    credential: 'RERA CPD Credits',
    daysLeft: 18,
    status: 'Not Enrolled',
    lastReminder: null,
  },
  {
    id: '2',
    name: 'James Whitfield',
    initials: 'JW',
    department: 'Sales',
    credential: 'AML Certificate',
    daysLeft: 12,
    status: 'Not Enrolled',
    lastReminder: null,
  },
  {
    id: '3',
    name: 'Priya Nair',
    initials: 'PN',
    department: 'Leasing',
    credential: 'Property Mgmt License',
    daysLeft: 6,
    status: 'Not Enrolled',
    lastReminder: null,
  },
  {
    id: '4',
    name: 'Omar Khalil',
    initials: 'OK',
    department: 'Sales',
    credential: 'RERA CPD Credits',
    daysLeft: 24,
    status: 'Enrolled',
    lastReminder: '3 days ago',
  },
  {
    id: '5',
    name: 'Sara Mitchell',
    initials: 'SM',
    department: 'Management',
    credential: 'Ethics CPD',
    daysLeft: 29,
    status: 'Not Enrolled',
    lastReminder: null,
  },
]

export const adminTeam: TeamMember[] = [
  { id: 't1', name: 'Reem Al Mansoori', initials: 'RA', role: 'Senior Agent', department: 'Sales', score: 58, atRisk: 2, lastActivity: '2 days ago', status: 'At Risk' },
  { id: 't2', name: 'James Whitfield', initials: 'JW', role: 'Agent', department: 'Sales', score: 51, atRisk: 2, lastActivity: '5 days ago', status: 'At Risk' },
  { id: 't3', name: 'Priya Nair', initials: 'PN', role: 'Leasing Agent', department: 'Leasing', score: 44, atRisk: 3, lastActivity: '8 days ago', status: 'At Risk' },
  { id: 't4', name: 'Omar Khalil', initials: 'OK', role: 'Senior Agent', department: 'Sales', score: 72, atRisk: 1, lastActivity: 'Today', status: 'At Risk' },
  { id: 't5', name: 'Sara Mitchell', initials: 'SM', role: 'Branch Manager', department: 'Management', score: 67, atRisk: 1, lastActivity: '1 day ago', status: 'At Risk' },
  { id: 't6', name: 'Khalid Al Rashid', initials: 'KR', role: 'Senior Agent', department: 'Sales', score: 91, atRisk: 0, lastActivity: 'Today', status: 'Compliant' },
  { id: 't7', name: 'Fatima Hassan', initials: 'FH', role: 'Agent', department: 'Leasing', score: 88, atRisk: 0, lastActivity: 'Yesterday', status: 'Compliant' },
  { id: 't8', name: 'Daniel Okonkwo', initials: 'DO', role: 'Agent', department: 'Sales', score: 95, atRisk: 0, lastActivity: 'Today', status: 'Compliant' },
  { id: 't9', name: 'Aisha Al Blooshi', initials: 'AB', role: 'Leasing Specialist', department: 'Leasing', score: 83, atRisk: 0, lastActivity: '3 days ago', status: 'Compliant' },
  { id: 't10', name: 'Marcus Webb', initials: 'MW', role: 'Agent', department: 'Sales', score: 79, atRisk: 1, lastActivity: '2 days ago', status: 'At Risk' },
  { id: 't11', name: 'Nour Al Fahim', initials: 'NF', role: 'Senior Agent', department: 'Management', score: 100, atRisk: 0, lastActivity: 'Today', status: 'Compliant' },
  { id: 't12', name: 'Sophie Laurent', initials: 'SL', role: 'Agent', department: 'Leasing', score: 86, atRisk: 0, lastActivity: 'Yesterday', status: 'Compliant' },
]

// Preserved learner mock exports.
export const learnerProfile = {
  name: 'Reem Al Mansoori',
  firstName: 'Reem',
  role: 'Real Estate Agent',
  department: 'Sales',
  initials: 'RA',
}

export const complianceItems: ComplianceItem[] = [
  {
    id: 'rera-cpd',
    title: 'RERA CPD Credits',
    state: 'CRITICAL',
    daysRemaining: 18,
    expiryDate: '15 Mar 2026',
    creditsRequired: 15,
    creditsEarned: 6,
    requirementBody: 'RERA — Real Estate Regulatory Agency',
    consequence: 'Failure to complete may result in suspension of your RERA broker license.',
  },
  {
    id: 'aml-cert',
    title: 'Anti-Money Laundering Certificate',
    state: 'AT_RISK',
    daysRemaining: 27,
    expiryDate: '26 Mar 2026',
    requirementBody: 'UAE Central Bank / RERA',
    consequence: 'Expired AML certification may result in regulatory penalties for you and your employer.',
  },
  {
    id: 'prop-mgmt',
    title: 'Property Management License',
    state: 'COMPLIANT',
    daysRemaining: null,
    expiryDate: '1 Dec 2026',
    requirementBody: 'DLD — Dubai Land Department',
    consequence: '',
  },
]

export const courses: Course[] = [
  {
    id: 'market-trends-2026',
    title: 'Real Estate Market Trends 2026',
    provider: 'ThinkProp Academy',
    credits: 6,
    price: 450,
    format: ['Virtual'],
    nextAvailable: '18 Mar 2026',
    description:
      'A comprehensive overview of UAE real estate market dynamics, pricing trends, and regulatory shifts in 2026. Designed for active agents and brokers.',
    learningOutcomes: [
      'Analyse current market conditions across key UAE submarkets',
      'Interpret DLD transaction data and apply insights to client advisory',
      'Identify emerging opportunities in residential and commercial sectors',
    ],
    instructor: 'Dr. Khalid Al Hammadi',
    satisfiesRequirement: ['rera-cpd'],
    sessions: [
      { id: 's1', date: '18 Mar 2026', time: '9:00 AM', format: 'Virtual', location: 'Zoom — link sent on enrollment', seatsLeft: 22 },
      { id: 's2', date: '1 Apr 2026', time: '10:00 AM', format: 'Virtual', location: 'Zoom — link sent on enrollment', seatsLeft: 18 },
    ],
  },
  {
    id: 'property-valuation',
    title: 'Property Valuation Fundamentals',
    provider: 'ThinkProp Academy',
    credits: 8,
    price: 600,
    format: ['Virtual', 'Classroom'],
    nextAvailable: '15 Mar 2026',
    description:
      'Master the core methodologies of property valuation used in the UAE market. Covers comparative market analysis, income approach, and cost approach techniques.',
    learningOutcomes: [
      'Apply the three core valuation methodologies to real UAE properties',
      'Produce a compliant property valuation report to RICS standards',
      'Use DLD data tools to support valuation decisions',
    ],
    instructor: 'Sarah Al Mansoori, MRICS',
    satisfiesRequirement: ['rera-cpd'],
    sessions: [
      { id: 's1', date: '15 Mar 2026', time: '9:00 AM', format: 'Virtual', location: 'Zoom — link sent on enrollment', seatsLeft: 12 },
      { id: 's2', date: '22 Mar 2026', time: '10:00 AM', format: 'Classroom', location: 'ThinkProp Centre, Dubai Marina', seatsLeft: 4 },
      { id: 's3', date: '5 Apr 2026', time: '9:00 AM', format: 'Virtual', location: 'Zoom — link sent on enrollment', seatsLeft: 18 },
    ],
  },
  {
    id: 'rera-regulations',
    title: 'RERA Regulations Update 2026',
    provider: 'ThinkProp Academy',
    credits: 4,
    price: 350,
    format: ['Virtual'],
    nextAvailable: '20 Mar 2026',
    description:
      'Stay current with the latest regulatory changes from RERA and DLD. Mandatory for all licensed brokers operating in Dubai.',
    learningOutcomes: [
      'Understand the 2026 amendments to RERA brokerage regulations',
      'Apply updated disclosure requirements in client transactions',
      'Avoid common compliance pitfalls flagged in recent RERA audits',
    ],
    instructor: 'Fatima Al Zaabi',
    satisfiesRequirement: ['rera-cpd'],
    sessions: [
      { id: 's1', date: '20 Mar 2026', time: '2:00 PM', format: 'Virtual', location: 'Zoom — link sent on enrollment', seatsLeft: 30 },
      { id: 's2', date: '8 Apr 2026', time: '9:00 AM', format: 'Virtual', location: 'Zoom — link sent on enrollment', seatsLeft: 30 },
    ],
  },
]

export const atRiskLegacyList: AtRiskEntry[] = atRiskList.map((item) => ({
  id: item.id,
  name: item.name,
  department: item.department,
  credential: item.credential,
  daysLeft: item.daysLeft,
  status: item.status,
}))
