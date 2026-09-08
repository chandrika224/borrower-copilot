import type { BorrowerProfile } from '../types/borrower'
import { determineProductRoute } from './productRouting'
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
  // --------------------------------------------------
  // 1. Estimate fair interest rate
  // --------------------------------------------------

  const fairRate =
    estimateFairRate(borrower)

  const annualRate =
    fairRate.lowRate

  const tenureMonths = 60

  // --------------------------------------------------
  // 2. Calculate affordability
  // --------------------------------------------------

  const affordability =
    calculateAffordability(borrower)

  // --------------------------------------------------
  // 3. Estimate lender-side eligibility
  // --------------------------------------------------

  const lenderEstimate =
    estimateLenderAmount(borrower)

  // --------------------------------------------------
  // 4. Calculate recommended borrowing amount
  // --------------------------------------------------

  const recommendedAmount =
    calculateRecommendedAmount(
      borrower,
      annualRate,
      tenureMonths
    )

  // --------------------------------------------------
  // 5. Calculate EMI recommendation
  //
  // IMPORTANT:
  // Do not convert undefined into 0.
  // If the recommended loan amount is unknown,
  // EMI should also remain unavailable.
  // --------------------------------------------------

  const emiRecommendation =
  recommendedAmount.recommendedAmount !== undefined
    ? calculateEMIRecommendation(
        borrower,
        recommendedAmount.recommendedAmount,
        annualRate
      )
    : {
        safeEMICeiling:
          affordability.safeNewEMICeiling,
        recommendedEMI: undefined,
        recommendedTenureMonths: undefined,
        tenureOptions: [],
        confidence: 'LOW' as const,
        warning:
          'A safe EMI cannot be recommended because the recommended loan amount is unavailable.',
      }

  // --------------------------------------------------
  // 6. Calculate APR
  //
  // APR requires:
  // - valid loan amount
  // - valid tenure
  //
  // If either is unavailable, keep APR unavailable.
  // --------------------------------------------------

  const recommendedTenure =
    emiRecommendation.recommendedTenureMonths

  const recommendedLoanAmount =
    recommendedAmount.recommendedAmount

  const apr =
    recommendedLoanAmount !== undefined &&
    recommendedTenure !== undefined
      ? calculateAPR(
          recommendedLoanAmount,
          annualRate,
          recommendedTenure,
          1.01
        )
      : {
          loanAmount: undefined,
          annualRate,
          tenureMonths: undefined,
          processingFeePercent: 1.01,
          processingFee: undefined,
          emi: undefined,
          totalRepayment: undefined,
          totalInterest: undefined,
          totalBorrowingCost: undefined,
          effectiveAPR: undefined,
        }

  // --------------------------------------------------
  // 7. Stress test
  //
  // Only run a meaningful comparison when we have
  // a recommended EMI.
  // --------------------------------------------------

  const stressTest =
    emiRecommendation.recommendedEMI !== undefined
      ? calculateStressTest(
          borrower,
          emiRecommendation.recommendedEMI
        )
      : {
          currentEMI: undefined,
          incomeReductionPercent: 20,
          remainsAffordable: undefined,
          stressedDisposableIncome: undefined,
          stressedIncome:
            borrower.income.monthlyNetIncome * 0.8,
          stressedSafeEMI: undefined,
        }

  // --------------------------------------------------
  // 8. Final borrowing decision
  // --------------------------------------------------

  const decision =
  decideBorrowing(
    borrower,
    annualRate,
    tenureMonths,
  )

  // --------------------------------------------------
  // 9. Determine best-fit loan product
  // --------------------------------------------------

  const productRoute =
    determineProductRoute(borrower)

  // --------------------------------------------------
  // 9. Return complete assessment
  // --------------------------------------------------

  return {
  decision,
  affordability,
  lenderEstimate,
  fairRate,
  recommendedAmount,
  emiRecommendation,
  apr,
  stressTest,
  productRoute,
}
}