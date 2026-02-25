export type ComplianceState =
  | 'CRITICAL'
  | 'AT_RISK'
  | 'ENROLLED'
  | 'COMPLIANT'
  | 'EXPIRED'

export type Department =
  | 'All'
  | 'Sales'
  | 'Leasing'
  | 'Management'
  | 'Support'

export interface AtRiskPerson {
  id: string
  name: string
  initials: string
  department: string
  credential: string
  daysLeft: number
  status: 'Not Enrolled' | 'Enrolled'
  lastReminder: string | null
}

export interface TeamMember {
  id: string
  name: string
  initials: string
  role: string
  department: string
  score: number
  atRisk: number
  lastActivity: string
  status: 'At Risk' | 'Compliant'
}

export interface OrgStats {
  complianceScore: number
  complianceScoreDelta: string
  complianceScoreDeltaUp: boolean
  atRisk: number
  atRiskDelta: string
  atRiskDeltaUp: boolean
  expiringThisWeek: number
  fullyCompliant: number
  totalTeam: number
}

// Preserved legacy types for existing learner routes.
export interface ComplianceItem {
  id: string
  title: string
  state: ComplianceState
  daysRemaining: number | null
  expiryDate: string
  creditsRequired?: number
  creditsEarned?: number
  requirementBody: string
  consequence: string
}

export interface Session {
  id: string
  date: string
  time: string
  format: 'Virtual' | 'Classroom'
  location: string
  seatsLeft: number
}

export interface Course {
  id: string
  title: string
  provider: string
  credits: number
  price: number
  format: string[]
  nextAvailable: string
  description: string
  learningOutcomes: string[]
  instructor: string
  sessions: Session[]
  satisfiesRequirement: string[]
}

export interface AtRiskEntry {
  id: string
  name: string
  department: string
  credential: string
  daysLeft: number
  status: 'Not Enrolled' | 'Enrolled'
}
