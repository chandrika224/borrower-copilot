import type { BorrowerProfile } from '../types/borrower'
import type { Answers } from '../types/answers'
import { adaptiveQuestions } from './adaptiveQuestions'

export function getAdaptiveQuestions(
  borrower: BorrowerProfile,
  answers: Answers
) {
  const questions = []

  const incomeType = borrower.income.type
  const creditScore = borrower.credit.score

  if (
    (incomeType === 'SELF_EMPLOYED' ||
      incomeType === 'INFORMAL') &&
    answers['income-stability'] === undefined
  ) {
    const question = adaptiveQuestions.find(
      (item) => item.id === 'income-stability'
    )

    if (question) {
      questions.push(question)
    }
  }

  if (
    creditScore === undefined &&
    answers['payment-history'] === undefined
  ) {
    const question = adaptiveQuestions.find(
      (item) => item.id === 'payment-history'
    )

    if (question) {
      questions.push(question)
    }
  }

  return questions
}