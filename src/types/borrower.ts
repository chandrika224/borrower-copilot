export type IncomeType =
  | 'SALARIED'
  | 'SELF_EMPLOYED'
  | 'INFORMAL'

export type LoanPurpose =
  | 'WEDDING'
  | 'EDUCATION'
  | 'MEDICAL'
  | 'HOME_IMPROVEMENT'
  | 'VEHICLE'
  | 'BUSINESS'
  | 'DEBT_REPAYMENT'
  | 'OTHER'

export type LoanType =
  | 'PERSONAL'
  | 'VEHICLE'
  | 'HOME'
  | 'BUSINESS'
  | 'SECURED'
  | 'UNKNOWN'

export type IncomeStability =
  | 'STABLE'
  | 'SOMEWHAT_STABLE'
  | 'VARIABLE'

export type PaymentHistory =
  | 'CLEAN'
  | 'SOME_MISSED_PAYMENTS'
  | 'RECENT_BOUNCE'
  | 'UNKNOWN'

export interface CreditProfile {
  score?: number
  paymentHistory?: PaymentHistory
}

export interface IncomeProfile {
  monthlyNetIncome: number
  monthlyIncomeMin?: number
  monthlyIncomeMax?: number
  type: IncomeType
  stability?: IncomeStability
}

export interface ExpenseProfile {
  housing: number
  otherHouseholdExpenses: number
  existingEMIs?: number
}

export interface LoanRequest {
  purpose: LoanPurpose
  type: LoanType
  requestedAmount: number
}

export interface BorrowerProfile {
  age: number

  income: IncomeProfile

  expenses: ExpenseProfile

  credit: CreditProfile

  loanRequest: LoanRequest
}