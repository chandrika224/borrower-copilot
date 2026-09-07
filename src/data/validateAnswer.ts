import type { Question } from '../types/questionnaire'

export function validateAnswer(
  question: Question,
  value: string | number | undefined
): string | null {

  if (
    question.required &&
    (value === undefined || value === '')
  ) {
    return 'Please provide an answer.'
  }

  if (
    value === undefined ||
    value === ''
  ) {
    return null
  }

  if (
    question.type === 'CURRENCY' &&
    typeof value === 'number'
  ) {
    const zeroAllowed =
      question.id === 'existing-emis' ||
      question.id === 'housing-expenses' ||
      question.id === 'household-expenses'

    if (!zeroAllowed && value <= 0) {
      return 'Please enter an amount greater than ₹0.'
    }

    if (zeroAllowed && value < 0) {
      return 'Please enter an amount of ₹0 or more.'
    }
  }

  if (
    question.id === 'age' &&
    typeof value === 'number'
  ) {
    if (value < 18 || value > 100) {
      return 'Please enter an age between 18 and 100.'
    }
  }

  if (
    question.id === 'credit-score' &&
    typeof value === 'number'
  ) {
    if (value < 300 || value > 900) {
      return 'Credit score should be between 300 and 900.'
    }
  }

  return null
}