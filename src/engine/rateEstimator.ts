import type { BorrowerProfile } from '../types/borrower'

export interface RateEstimateResult {
  lowRate: number
  highRate: number
  reason: string[]
  confidence: 'HIGH' | 'MEDIUM' | 'LOW'
}

export function estimateFairRate(
  borrower: BorrowerProfile
): RateEstimateResult {
  const reasons: string[] = []

  let lowRate = 14
  let highRate = 18

  const creditScore = borrower.credit.score
  const paymentHistory =
    borrower.credit.paymentHistory

  const incomeStability =
    borrower.income.stability

  // --------------------------------
  // Credit score
  // --------------------------------

  if (creditScore !== undefined) {
    if (creditScore >= 750) {
      lowRate = 11
      highRate = 14

      reasons.push(
        'Credit score is in a strong range.'
      )
    } else if (creditScore >= 700) {
      reasons.push(
        'Credit score is in a reasonable range.'
      )
    } else if (creditScore >= 650) {
      lowRate = 16
      highRate = 21

      reasons.push(
        'Credit score indicates higher pricing risk.'
      )
    } else {
      lowRate = 18
      highRate = 24

      reasons.push(
        'Low credit score may materially increase borrowing cost.'
      )
    }
  } else {
    reasons.push(
      'Credit score is unknown, so the rate range is wider.'
    )
  }

  // --------------------------------
  // Income type
  // --------------------------------

  if (borrower.income.type === 'SALARIED') {
    reasons.push(
      'Salaried income provides stronger income predictability.'
    )
  }

  if (borrower.income.type === 'SELF_EMPLOYED') {
    lowRate += 1
    highRate += 1

    reasons.push(
      'Self-employed income may require additional underwriting.'
    )
  }

  if (borrower.income.type === 'INFORMAL') {
    lowRate += 3
    highRate += 3

    reasons.push(
      'Informal income increases income-verification uncertainty.'
    )
  }

  // --------------------------------
  // Income stability
  // --------------------------------

  if (incomeStability === 'STABLE') {
    reasons.push(
      'Income has been stable, reducing repayment uncertainty.'
    )
  }

  if (incomeStability === 'SOMEWHAT_STABLE') {
    lowRate += 1
    highRate += 1

    reasons.push(
      'Some income variability increases repayment uncertainty.'
    )
  }

  if (incomeStability === 'VARIABLE') {
    lowRate += 2
    highRate += 2

    reasons.push(
      'Highly variable income increases repayment uncertainty.'
    )
  }

  // --------------------------------
  // Payment history
  // --------------------------------

  if (paymentHistory === 'CLEAN') {
    reasons.push(
      'Recent payment history is clean.'
    )
  }

  if (paymentHistory === 'SOME_MISSED_PAYMENTS') {
    lowRate += 2
    highRate += 2

    reasons.push(
      'Missed payments indicate elevated repayment risk.'
    )
  }

  if (paymentHistory === 'RECENT_BOUNCE') {
    lowRate += 4
    highRate += 4

    reasons.push(
      'A recent payment bounce materially increases repayment risk.'
    )
  }

  if (
    paymentHistory === 'UNKNOWN' ||
    paymentHistory === undefined
  ) {
    reasons.push(
      'Payment history is unknown, so confidence is lower.'
    )
  }

  // --------------------------------
  // Confidence
  // --------------------------------

  let confidence: RateEstimateResult['confidence'] =
    'MEDIUM'

  if (
    creditScore !== undefined &&
    paymentHistory !== undefined &&
    incomeStability !== undefined
  ) {
    confidence = 'HIGH'
  }

  if (
    creditScore === undefined &&
    paymentHistory === undefined
  ) {
    confidence = 'LOW'
  }

  return {
    lowRate,
    highRate,
    reason: reasons,
    confidence,
  }
}