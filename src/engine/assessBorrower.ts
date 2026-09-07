import type { BorrowerProfile } from '../types/borrower'
import type { LoanAssessment } from '../types/assessment'

import { calculateAffordability } from './affordability'
import { estimateLenderAmount } from './lenderEstimate'
import { estimateFairRate } from './rateEstimator'
import { calculateRecommendedAmount } from './recommendedAmount'
import { calculateEMIRecommendation } from './emiRecommendation'
import { calculateAPR } from './aprCalculator'
import { calculateStressTest } from './stressTest'
import { decideBorrowing } from './borrowDecision'

export function assessBorrower(
  borrower: BorrowerProfile
): LoanAssessment {
  const fairRate =
  estimateFairRate(borrower)

const annualRate =
  fairRate.lowRate

const tenureMonths = 60

const affordability =
  calculateAffordability(borrower)

const lenderEstimate =
  estimateLenderAmount(borrower)

const recommendedAmount =
  calculateRecommendedAmount(
    borrower,
    annualRate,
    tenureMonths
  )

const emiRecommendation =
  calculateEMIRecommendation(
    borrower,
    recommendedAmount.recommendedAmount,
    annualRate
  )

const recommendedTenure =
  emiRecommendation.recommendedTenureMonths

const apr =
  calculateAPR(
    recommendedAmount.recommendedAmount,
    annualRate,
    recommendedTenure,
    1.01
  )

const stressTest =
  calculateStressTest(
    borrower,
    emiRecommendation.recommendedEMI
  )

const decision =
  decideBorrowing(
    borrower,
    annualRate,
    tenureMonths
  )
  
  return {
    decision,
    affordability,
    lenderEstimate,
    fairRate,
    recommendedAmount,
    emiRecommendation,
    apr,
    stressTest,
  }
}