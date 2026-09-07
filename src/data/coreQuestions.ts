import type { Question } from '../types/questionnaire'

export const coreQuestions: Question[] = [
  {
    id: 'loan-purpose',
    section: 'LOAN',
    text: 'What do you need the loan for?',
    type: 'SELECT',
    required: true,
    helperText:
      'The purpose helps us understand whether borrowing is necessary, discretionary, or potentially productive.',
    options: [
      { label: 'Wedding', value: 'WEDDING' },
      { label: 'Education', value: 'EDUCATION' },
      { label: 'Medical expenses', value: 'MEDICAL' },
      { label: 'Home improvement', value: 'HOME_IMPROVEMENT' },
      { label: 'Vehicle', value: 'VEHICLE' },
      { label: 'Business', value: 'BUSINESS' },
      { label: 'Repaying existing debt', value: 'DEBT_REPAYMENT' },
      { label: 'Other', value: 'OTHER' },
    ],
  },

  {
    id: 'loan-amount',
    section: 'LOAN',
    text: 'How much do you want to borrow?',
    type: 'CURRENCY',
    required: true,
    helperText:
      'We will compare the amount you want with what you may be able to safely repay.',
  },

  {
    id: 'loan-type',
    section: 'LOAN',
    text: 'What type of loan are you considering?',
    type: 'SELECT',
    required: true,
    helperText:
      'Loan type affects likely lender eligibility, pricing, and repayment structure.',
    options: [
      { label: 'Personal loan', value: 'PERSONAL' },
      { label: 'Vehicle loan', value: 'VEHICLE' },
      { label: 'Home loan', value: 'HOME' },
      { label: 'Business loan', value: 'BUSINESS' },
      { label: 'Secured loan', value: 'SECURED' },
      { label: "I'm not sure", value: 'UNKNOWN' },
    ],
  },

  {
    id: 'monthly-income',
    section: 'INCOME',
    text: 'What is your monthly take-home income?',
    type: 'CURRENCY',
    required: true,
    helperText:
      'Enter what you actually receive each month after deductions.',
  },

  {
    id: 'income-type',
    section: 'INCOME',
    text: 'How do you earn this income?',
    type: 'SELECT',
    required: true,
    helperText:
      'Income type affects lender eligibility and how confidently we can estimate repayment capacity.',
    options: [
      { label: 'Salaried', value: 'SALARIED' },
      { label: 'Self-employed', value: 'SELF_EMPLOYED' },
      { label: 'Informal / gig / mixed income', value: 'INFORMAL' },
    ],
  },

    {
    id: 'existing-emis',
    section: 'EXPENSES',
    text: 'How much do you currently pay toward loans or EMIs each month?',
    type: 'CURRENCY',
    required: true,
    allowUnknown: true,
    helperText:
      "Include personal, vehicle, home, app loans, or other regular loan repayments. If you're not sure of the total, you can tell us.",
  },
  {
    id: 'housing-expenses',
    section: 'EXPENSES',
    text: 'How much do you spend on housing each month?',
    type: 'CURRENCY',
    required: true,
    helperText:
      'Include rent or a housing-loan payment.',
  },

  {
    id: 'household-expenses',
    section: 'EXPENSES',
    text: 'About how much do you spend on other household expenses each month?',
    type: 'CURRENCY',
    required: true,
    helperText:
      'Include food, utilities, education, transport, and other regular household spending.',
  },

  {
    id: 'age',
    section: 'PERSONAL',
    text: 'What is your age?',
    type: 'NUMBER',
    required: true,
  },

  {
    id: 'credit-score',
    section: 'PERSONAL',
    text: 'Do you know your credit score?',
    type: 'NUMBER',
    required: false,
    helperText:
      "If you don't know your score, you can leave this blank. We won't treat unknown as zero.",
  },
]