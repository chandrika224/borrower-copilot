import type { BorrowerProfile } from '../types/borrower'
import { calculateAffordability } from './affordability'

export interface StressTestResult {
  currentEMI?: number
  incomeReductionPercent: number
  remainsAffordable?: boolean
  stressedDisposableIncome?: number
  stressedIncome: number
  stressedSafeEMI?: number
}

export function calculateStressTest(
  borrower: BorrowerProfile,
  currentEMI?: number,
): StressTestResult {
  const incomeReductionPercent = 20

  const stressedIncome =
    borrower.income.monthlyNetIncome *
    (1 - incomeReductionPercent / 100)

  const stressedBorrower: BorrowerProfile = {
    ...borrower,
    income: {
      ...borrower.income,
      monthlyNetIncome: stressedIncome,
    },
  }

  const stressedAffordability =
    calculateAffordability(
      stressedBorrower,
    )

  const stressedSafeEMI =
    stressedAffordability.safeNewEMICeiling

  // Cannot determine stress result.
  if (
    currentEMI === undefined ||
    stressedSafeEMI === undefined
  ) {
    return {
      currentEMI,
      incomeReductionPercent,
      remainsAffordable: undefined,
      stressedDisposableIncome:
        stressedAffordability.disposableIncome,
      stressedIncome,
      stressedSafeEMI,
    }
  }

  return {
    currentEMI,
    incomeReductionPercent,
    remainsAffordable:
      currentEMI <= stressedSafeEMI,
    stressedDisposableIncome:
      stressedAffordability.disposableIncome,
    stressedIncome,
    stressedSafeEMI,
  }
}