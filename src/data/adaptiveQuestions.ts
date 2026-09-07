import type { Question } from '../types/questionnaire'

export const adaptiveQuestions: Question[] = [

  {
    id: 'income-stability',

    section: 'INCOME',

    text: 'How stable has your income been over the last 12 months?',

    type: 'SELECT',

    required: true,

    helperText:
      'This helps us avoid assuming that your current monthly income will always be available.',

    options: [
      {
        label: 'Very stable',
        value: 'STABLE',
      },

      {
        label: 'Somewhat variable',
        value: 'SOMEWHAT_STABLE',
      },

      {
        label: 'Highly variable',
        value: 'VARIABLE',
      },
    ],
  },

  {
    id: 'payment-history',

    section: 'EXPENSES',

    text: 'Have you missed or bounced any loan/credit payments recently?',

    type: 'SELECT',

    required: true,

    helperText:
      'A recent payment problem can materially affect borrowing risk.',

    options: [
      {
        label: 'No, payments have been clean',

        value: 'CLEAN',
      },

      {
        label: 'I have missed some payments',

        value: 'SOME_MISSED_PAYMENTS',
      },

      {
        label: 'Yes, I had a recent bounce',

        value: 'RECENT_BOUNCE',
      },

      {
        label: "I don't know",

        value: 'UNKNOWN',
      },
    ],
  },

  {
    id: 'existing-loan-payments',

    section: 'EXPENSES',

    text: 'How much do you currently pay toward all your existing loans each month?',

    type: 'CURRENCY',

    required: true,

    helperText:
      'Include EMIs or required monthly payments for personal loans, app loans, vehicle loans, or other borrowing.',
  },

]