import type { BorrowerProfile } from '../types/borrower'
import type { Answers } from '../types/answers'
import { adaptiveQuestions } from './adaptiveQuestions'

export function getAdaptiveQuestions(
  borrower: BorrowerProfile,
  answers: Answers
) {
  const questions = []

  const loanPurpose = borrower.loanRequest.purpose

  /*
   * Income stability
   *
   * Income stability affects repayment confidence and
   * fair-rate assessment, so ask when it is not known.
   */
  if (answers['income-stability'] === undefined) {
    const question = adaptiveQuestions.find(
      (item) => item.id === 'income-stability'
    )

    if (question) {
      questions.push(question)
    }
  }

  /*
   * Payment history
   *
   * Credit score and repayment history are different signals.
   * A borrower may know their score but still need to provide
   * repayment-history information.
   */
  if (answers['payment-history'] === undefined) {
    const question = adaptiveQuestions.find(
      (item) => item.id === 'payment-history'
    )

    if (question) {
      questions.push(question)
    }
  }

  /*
   * Collateral
   *
   * Only ask about collateral when the borrowing purpose is
   * business-related because it can change the product route.
   */
  if (
    loanPurpose === 'BUSINESS' &&
    answers['collateral-value'] === undefined
  ) {
    const question = adaptiveQuestions.find(
      (item) => item.id === 'collateral-value'
    )

    if (question) {
      questions.push(question)
    }
  }

  return questions
}