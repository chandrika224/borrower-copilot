export type QuestionType =
  | 'SELECT'
  | 'CURRENCY'
  | 'NUMBER'

export type QuestionSection =
  | 'LOAN'
  | 'INCOME'
  | 'EXPENSES'
  | 'PERSONAL'

export interface QuestionOption {
  label: string
  value: string
}

export interface Question {
  id: string
  section: QuestionSection
  text: string
  type: QuestionType
  required: boolean
  helperText?: string
  options?: QuestionOption[]
  allowUnknown?: boolean
}