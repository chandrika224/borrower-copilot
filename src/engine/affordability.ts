import type { BorrowerProfile } from '../types/borrower'

const MAX_FOIR = 0.5
const MAX_DISPOSABLE_SHARE = 0.6

export interface AffordabilityResult {
  monthlyIncome: number
  existingEMIs?: number
  disposableIncome?: number
  foirBasedEMICeiling?: number
  disposableBasedEMICeiling?: number
  safeNewEMICeiling?: number
  confidence: 'HIGH' | 'MEDIUM' | 'LOW'
  warnings: string[]
}

export function calculateAffordability(
  borrower: BorrowerProfile
): AffordabilityResult {
  const monthlyIncome =
    borrower.income.monthlyNetIncome

  const existingEMIs =
    borrower.expenses.existingEMIs

  // We cannot safely calculate affordability
  // when existing EMI is unknown.
  if (existingEMIs === undefined) {
    return {
      monthlyIncome,
      existingEMIs: undefined,
      disposableIncome: undefined,
      foirBasedEMICeiling: undefined,
      disposableBasedEMICeiling: undefined,
      safeNewEMICeiling: undefined,
      confidence: 'LOW',
      warnings: [
        'Existing EMI amount is unknown, so we cannot safely calculate how much room is available for a new EMI.',
      ],
    }
  }

  const disposableIncome =
    monthlyIncome
    - borrower.expenses.housing
    - borrower.expenses.otherHouseholdExpenses
    - existingEMIs

  const maximumTotalEMI =
    monthlyIncome * MAX_FOIR

  const foirBasedEMICeiling =
    Math.max(
      0,
      maximumTotalEMI - existingEMIs
    )

  const disposableBasedEMICeiling =
    Math.max(
      0,
      disposableIncome * MAX_DISPOSABLE_SHARE
    )

  const safeNewEMICeiling =
    Math.min(
      foirBasedEMICeiling,
      disposableBasedEMICeiling
    )

  return {
    monthlyIncome,
    existingEMIs,
    disposableIncome,
    foirBasedEMICeiling: Math.round(
      foirBasedEMICeiling
    ),
    disposableBasedEMICeiling: Math.round(
      disposableBasedEMICeiling
    ),
    safeNewEMICeiling: Math.round(
      safeNewEMICeiling
    ),
    confidence: 'HIGH',
    warnings: [],
  }
}