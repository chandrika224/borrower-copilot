import { useState } from 'react'
import { coreQuestions } from '../data/coreQuestions'
import type { Answers } from '../types/answers'
import { QuestionRenderer } from './QuestionRenderer'
import { validateAnswer } from '../data/validateAnswer'
import { buildBorrowerProfile } from '../data/buildBorrowerProfile'

export function Questionnaire() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [error, setError] = useState<string | null>(null)

  const currentQuestion = coreQuestions[currentIndex]

  function handleAnswer(value: string | number) {
    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: value,
    }))

    setError(null)
  }

  function handleNext() {
    const value = answers[currentQuestion.id]

    const validationError = validateAnswer(
      currentQuestion,
      value
    )

    if (validationError) {
      setError(validationError)
      return
    }

    const isLastQuestion =
      currentIndex === coreQuestions.length - 1

    if (isLastQuestion) {
      const profile = buildBorrowerProfile(answers)

      console.log('Borrower Profile:', profile)

      return
    }

    setCurrentIndex((previous) => previous + 1)
  }

  function handleBack() {
    if (currentIndex > 0) {
      setCurrentIndex((previous) => previous - 1)
    }
  }

  return (
    <div>
      <h1>Borrower Copilot</h1>

      <div>
        <div>
          <span>
            Question {currentIndex + 1} of {coreQuestions.length}
          </span>

          <span>
            {Math.round(
              ((currentIndex + 1) / coreQuestions.length) * 100
            )}%
          </span>
        </div>

        <div>
          <div
            style={{
              width: `${
                ((currentIndex + 1) / coreQuestions.length) * 100
              }%`,
            }}
          />
        </div>
      </div>

      <p>
        Question {currentIndex + 1} of {coreQuestions.length}
      </p>

      <h2>{currentQuestion.text}</h2>

      {currentQuestion.helperText && (
        <p>{currentQuestion.helperText}</p>
      )}

      <QuestionRenderer
        question={currentQuestion}
        value={answers[currentQuestion.id]}
        onChange={handleAnswer}
      />

      {error && (
        <p role="alert">
          {error}
        </p>
      )}

      <div>
        <button
          onClick={handleBack}
          disabled={currentIndex === 0}
        >
          Back
        </button>

        <button onClick={handleNext}>
          {currentIndex === coreQuestions.length - 1
            ? 'Finish'
            : 'Next'}
        </button>
      </div>
    </div>
  )
}
