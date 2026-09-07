import type { BorrowerProfile } from '../types/borrower'
import type { Answers } from '../types/answers'

export function buildBorrowerProfile(
  answers: Answers
): BorrowerProfile {
  return {
    age: Number(answers['age']),

    income: {
      monthlyNetIncome: Number(answers['monthly-income']),
      type: answers['income-type'] as BorrowerProfile['income']['type'],
      stability:
  answers['income-stability'] as BorrowerProfile['income']['stability'],
    },

    expenses: {
      housing: Number(answers['housing-expenses']),
      otherHouseholdExpenses: Number(
        answers['household-expenses']
      ),
      existingEMIs: Number(answers['existing-emis']),
    },

    credit: {
      score:
        answers['credit-score'] !== undefined
          ? Number(answers['credit-score'])
          : undefined,

      paymentHistory:
  answers['payment-history'] as BorrowerProfile['credit']['paymentHistory'],
    },

    loanRequest: {
      purpose:
        answers['loan-purpose'] as BorrowerProfile['loanRequest']['purpose'],

      type:
        answers['loan-type'] as BorrowerProfile['loanRequest']['type'],

      requestedAmount: Number(answers['loan-amount']),
    },
  }
}