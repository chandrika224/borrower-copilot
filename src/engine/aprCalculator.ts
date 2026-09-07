export interface APRResult {
  loanAmount: number
  annualRate: number
  tenureMonths: number
  processingFeePercent: number
  processingFee: number
  emi: number
  totalRepayment: number
  totalInterest: number
  totalBorrowingCost: number
  effectiveAPR: number
}

import { calculateEMI } from './emiCalculator'

export function calculateAPR(
  loanAmount: number,
  annualRate: number,
  tenureMonths: number,
  processingFeePercent: number
): APRResult {
  const processingFee =
    loanAmount * processingFeePercent / 100

  const emi =
    calculateEMI(
      loanAmount,
      annualRate,
      tenureMonths
    )

  const totalRepayment =
    emi * tenureMonths

  const totalInterest =
    totalRepayment - loanAmount

  const totalBorrowingCost =
    totalInterest + processingFee

  const netDisbursedAmount =
    loanAmount - processingFee

  const effectiveAPR =
    calculateEffectiveAPR(
      netDisbursedAmount,
      emi,
      tenureMonths
    )

  return {
    loanAmount,
    annualRate,
    tenureMonths,
    processingFeePercent,
    processingFee: Math.round(processingFee),
    emi,
    totalRepayment: Math.round(
      totalRepayment
    ),
    totalInterest: Math.round(
      totalInterest
    ),
    totalBorrowingCost: Math.round(
      totalBorrowingCost
    ),
    effectiveAPR,
  }
}

function calculateEffectiveAPR(
  netDisbursedAmount: number,
  emi: number,
  tenureMonths: number
): number {
  let low = 0
  let high = 100

  for (let i = 0; i < 100; i++) {
    const mid = (low + high) / 2

    const monthlyRate =
      mid / 12 / 100

    const factor =
      Math.pow(
        1 + monthlyRate,
        tenureMonths
      )

    const presentValue =
      (
        emi *
        (factor - 1)
      ) /
      (monthlyRate * factor)

    if (
      presentValue > netDisbursedAmount
    ) {
      low = mid
    } else {
      high = mid
    }
  }

  return Math.round(
    ((low + high) / 2) * 100
  ) / 100
}
