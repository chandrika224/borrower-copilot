import type { BorrowerProfile } from '../types/borrower'
import { calculateAffordability } from './affordability'
import { calculateLoanAmountFromEMI } from './loanAmount'

export type BorrowDecision =
  | 'BORROW'
  | 'BORROW_LESS'
  | 'DONT_BORROW'
  | 'NEED_MORE_INFO'

export interface BorrowDecisionResult {
  decision: BorrowDecision
  requestedAmount: number
  safeAmount?: number
  safeEMI?: number
  reason: string
}

export function decideBorrowing(
  borrower: BorrowerProfile,
  annualRate: number,
  tenureMonths: number,
): BorrowDecisionResult {
  const affordability =
    calculateAffordability(borrower)

  const safeEMI =
    affordability.safeNewEMICeiling

  const requestedAmount =
    borrower.loanRequest.requestedAmount

  // We cannot safely assess borrowing when
  // an important affordability input is unknown.
  if (safeEMI === undefined) {
    return {
      decision: 'NEED_MORE_INFO',
      requestedAmount,
      safeAmount: undefined,
      safeEMI: undefined,
      reason:
        'We cannot safely assess a new loan yet because your existing EMI amount is unknown. Please provide your current monthly loan payments before deciding how much new debt you can carry.',
    }
  }

  const safeAmount =
    calculateLoanAmountFromEMI(
      safeEMI,
      annualRate,
      tenureMonths,
    )

  // No room for a new EMI.
  if (safeEMI <= 0) {
    return {
      decision: 'DONT_BORROW',
      requestedAmount,
      safeAmount,
      safeEMI,
      reason:
        'Your current income and existing commitments do not leave enough room for a new EMI without putting your monthly budget under strain.',
    }
  }

  // Requested amount is higher than safe amount.
  if (requestedAmount > safeAmount) {
    return {
      decision: 'BORROW_LESS',
      requestedAmount,
      safeAmount,
      safeEMI,
      reason:
        'The requested amount would require a higher EMI than your current safe affordability allows.',
    }
  }

  // Requested amount appears affordable.
  return {
    decision: 'BORROW',
    requestedAmount,
    safeAmount,
    safeEMI,
    reason:
      'The requested loan amount appears to fit within your current safe EMI capacity based on the information provided.',
  }
}