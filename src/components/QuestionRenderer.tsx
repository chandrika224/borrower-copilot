import type { Question } from '../types/questionnaire'

interface QuestionRendererProps {
  question: Question
  value: string | number | undefined
  onChange: (value: string | number) => void
}

export function QuestionRenderer({
  question,
  value,
  onChange,
}: QuestionRendererProps) {
  if (question.type === 'SELECT') {
    return (
      <div>
        {question.options?.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    )
  }

  if (question.type === 'CURRENCY') {
    return (
      <input
        type="number"
        min="0"
        value={value ?? ''}
        onChange={(event) =>
          onChange(Number(event.target.value))
        }
        placeholder="Enter amount"
      />
    )
  }

  if (question.type === 'NUMBER') {
    return (
      <input
        type="number"
        min="0"
        value={value ?? ''}
        onChange={(event) =>
          onChange(Number(event.target.value))
        }
        placeholder="Enter value"
      />
    )
  }

  return null
}