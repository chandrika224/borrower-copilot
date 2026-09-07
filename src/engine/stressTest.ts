import type { BorrowerProfile } from '../types/borrower'
import { calculateAffordability } from './affordability'

export interface StressTestResult {
  incomeReductionPercent: number
  stressedIncome: number
  stressedDisposableIncome: number
  stressedSafeEMI: number
  currentEMI: number
  remainsAffordable: boolean
}

export function calculateStressTest(
  borrower: BorrowerProfile,
  currentEMI: number
): StressTestResult {
  const incomeReductionPercent = 20

  const currentIncome =
    borrower.income.monthlyNetIncome

  const stressedIncome =
    currentIncome * 0.8

  const existingEMIs =
    borrower.expenses.existingEMIs

  const stressedDisposableIncome =
    stressedIncome
    - borrower.expenses.housing
    - borrower.expenses.otherHouseholdExpenses
    - existingEMIs

  const affordability =
    calculateAffordability({
      ...borrower,
      income: {
        ...borrower.income,
        monthlyNetIncome: stressedIncome,
      },
    })

  const stressedSafeEMI =
    affordability.safeNewEMICeiling

  return {
    incomeReductionPercent,
    stressedIncome: Math.round(
      stressedIncome
    ),
    stressedDisposableIncome: Math.round(
      stressedDisposableIncome
    ),
    stressedSafeEMI,
    currentEMI,
    remainsAffordable:
      currentEMI <= stressedSafeEMI,
  }
}