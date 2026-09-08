import type { BorrowDecisionResult } from '../engine/borrowDecision'
import type { AffordabilityResult } from '../engine/affordability'
import type { LenderEstimateResult } from '../engine/lenderEstimate'
import type { RateEstimateResult } from '../engine/rateEstimator'
import type { RecommendedAmountResult } from '../engine/recommendedAmount'
import type { EMIRecommendationResult } from '../engine/emiRecommendation'
import type { StressTestResult } from '../engine/stressTest'
import type { APRResult } from '../engine/aprCalculator'
import type { ProductRouteResult } from '../engine/productRouting'

export interface LoanAssessment {
  decision: BorrowDecisionResult
  affordability: AffordabilityResult
  lenderEstimate: LenderEstimateResult
  fairRate: RateEstimateResult
  recommendedAmount: RecommendedAmountResult
  emiRecommendation: EMIRecommendationResult
  apr: APRResult
  stressTest: StressTestResult
  productRoute: ProductRouteResult
}