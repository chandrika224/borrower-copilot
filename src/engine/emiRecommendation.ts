import type { BorrowerProfile } from '../types/borrower'
import { calculateAffordability } from './affordability'
import { calculateEMI } from './emiCalculator'

export interface TenureOption {
  months: number
  emi: number
  totalInterest: number
}

export interface EMIRecommendationResult {
  safeEMICeiling?: number
  recommendedEMI?: number
  recommendedTenureMonths?: number
  tenureOptions: TenureOption[]
  confidence: 'HIGH' | 'LOW'
  warning?: string
}

export function calculateEMIRecommendation(
  borrower: BorrowerProfile,
  loanAmount: number,
  annualRate: number
): EMIRecommendationResult {
  const affordability =
    calculateAffordability(borrower)

  const safeEMICeiling =
    affordability.safeNewEMICeiling

  // We cannot recommend an EMI when
  // affordability cannot be calculated safely.
  if (safeEMICeiling === undefined) {
    return {
      safeEMICeiling: undefined,
      recommendedEMI: undefined,
      recommendedTenureMonths: undefined,
      tenureOptions: [],
      confidence: 'LOW',
      warning:
        'A safe EMI cannot be recommended because your existing EMI amount is unknown.',
    }
  }

  const tenureOptions = [36, 48, 60].map(
    (months) => {
      const emi = calculateEMI(
        loanAmount,
        annualRate,
        months
      )

      const totalPayment =
        emi * months

      const totalInterest =
        totalPayment - loanAmount

      return {
        months,
        emi,
        totalInterest: Math.round(
          totalInterest
        ),
      }
    }
  )

  const affordableOptions =
    tenureOptions.filter(
      (option) =>
        option.emi <= safeEMICeiling
    )

  const recommendedOption =
    affordableOptions.length > 0
      ? affordableOptions[0]
      : tenureOptions[
          tenureOptions.length - 1
        ]

  return {
    safeEMICeiling,
    recommendedEMI:
      recommendedOption.emi,
    recommendedTenureMonths:
      recommendedOption.months,
    tenureOptions,
    confidence: 'HIGH',
  }
}