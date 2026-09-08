import { useState } from 'react'
import { coreQuestions } from '../data/coreQuestions'
import type { Answers } from '../types/answers'
import { QuestionRenderer } from './QuestionRenderer'
import { validateAnswer } from '../data/validateAnswer'
import { buildBorrowerProfile } from '../data/buildBorrowerProfile'
import { getAdaptiveQuestions } from '../data/getAdaptiveQuestions'
import { assessBorrower } from '../engine/assessBorrower'
import { ResultsDashboard } from './ResultsDashboard'
import type { LoanAssessment } from '../types/assessment'

type QuestionnairePhase = 'CORE' | 'ADAPTIVE'

export function Questionnaire() {
  const [phase, setPhase] =
    useState<QuestionnairePhase>('CORE')

  const [questions, setQuestions] =
    useState(coreQuestions)

  const [currentIndex, setCurrentIndex] =
    useState(0)

  const [answers, setAnswers] =
    useState<Answers>({})

  const [error, setError] =
    useState<string | null>(null)

  const [assessment, setAssessment] =
    useState<LoanAssessment | null>(null)

  const currentQuestion =
    questions[currentIndex]

 function handleAnswer(
    value: string | number | undefined
  ) {
    setAnswers((previous) => {
      const next = { ...previous }

      if (value === undefined) {
        delete next[currentQuestion.id]
      } else {
        next[currentQuestion.id] = value
      }

      return next
    })

    setError(null)
  }

  function handleNext() {
    const value =
      answers[currentQuestion.id]

    const validationError =
      validateAnswer(
        currentQuestion,
        value
      )

    if (validationError) {
      setError(validationError)
      return
    }

    const isLastQuestion =
      currentIndex === questions.length - 1

    if (!isLastQuestion) {
      setCurrentIndex(
        (previous) => previous + 1
      )
      return
    }

    /*
     * CORE QUESTIONS COMPLETE
     */
    if (phase === 'CORE') {
      const initialProfile =
        buildBorrowerProfile(answers)

      const adaptiveQuestions =
        getAdaptiveQuestions(
          initialProfile,
          answers
        )

          console.log('INITIAL PROFILE:', initialProfile)
          console.log('ANSWERS BEFORE ADAPTIVE:', answers)
          console.log('ADAPTIVE QUESTIONS:', adaptiveQuestions)

      if (adaptiveQuestions.length > 0) {
        setQuestions(adaptiveQuestions)
        setPhase('ADAPTIVE')
        setCurrentIndex(0)
        setError(null)

        return
      }

      const finalProfile =
        buildBorrowerProfile(answers)

      const finalAssessment =
        assessBorrower(finalProfile)

      setAssessment(finalAssessment)

      console.log(
        'FINAL PROFILE:',
        finalProfile
      )

      console.log(
        'FINAL ASSESSMENT:',
        finalAssessment
      )

      return
    }

    /*
     * ADAPTIVE QUESTIONS COMPLETE
     */
    const finalProfile =
      buildBorrowerProfile(answers)

    const finalAssessment =
      assessBorrower(finalProfile)

    setAssessment(finalAssessment)

    console.log(
      'FINAL PROFILE:',
      finalProfile
    )

    console.log(
      'FINAL ASSESSMENT:',
      finalAssessment
    )
  }

  function handleBack() {
    if (currentIndex > 0) {
      setCurrentIndex(
        (previous) => previous - 1
      )
    }
  }

  const questionCount =
    questions.length

  const progress =
    ((currentIndex + 1) / questionCount) * 100

  const isLastQuestion =
    currentIndex === questionCount - 1

 function startNewAssessment() {
  setAnswers({})
  setQuestions(coreQuestions)
  setCurrentIndex(0)
  setPhase('CORE')
  setAssessment(null)
  setError(null)
}

  /*
   * Show results after assessment
   */
 if (assessment) {
  return (
    <ResultsDashboard
      assessment={assessment}
      onNewAssessment={startNewAssessment}
    />
  )
}
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <header className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
            Borrower Copilot
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Your borrowing assessment
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Answer a few questions about your income,
            expenses and loan request. We will help you
            understand what borrowing may be affordable.
          </p>
        </header>

        {/* Questionnaire card */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">

          {/* Phase */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-slate-900">
              {phase === 'CORE'
                ? 'About you and your loan'
                : 'A few more questions'}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              {phase === 'CORE'
                ? 'These questions help us understand your borrowing situation.'
                : 'These questions help us improve the assessment.'}
            </p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="mb-2 flex items-center justify-between text-xs font-medium text-slate-500">
              <span>
                Question {currentIndex + 1} of {questionCount}
              </span>

              <span>
                {Math.round(progress)}%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-slate-900 transition-all duration-300"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold leading-tight text-slate-900">
              {currentQuestion.text}
            </h2>

            {currentQuestion.helperText && (
              <p className="mt-3 text-sm leading-6 text-slate-500">
                {currentQuestion.helperText}
              </p>
            )}
          </div>

          {/* Answer */}
          <QuestionRenderer
            question={currentQuestion}
            value={
              answers[currentQuestion.id]
            }
            onChange={handleAnswer}
          />

          {/* Error */}
          {error && (
            <div
              role="alert"
              className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">

            <button
              type="button"
              onClick={handleBack}
              disabled={currentIndex === 0}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← Back
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              {isLastQuestion
                ? phase === 'CORE'
                  ? 'Continue →'
                  : 'See my assessment →'
                : 'Next →'}
            </button>

          </div>
        </section>

        {/* Privacy note */}
        <p className="mt-5 text-center text-xs leading-5 text-slate-400">
          No login required. Your answers are used only
          to generate this assessment.
        </p>

      </div>
    </main>
  )
}