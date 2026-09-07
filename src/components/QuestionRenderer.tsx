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
      <div className="grid gap-3">
        {question.options?.map((option) => {
          const selected =
            value === option.value

          return (
            <button
              key={option.value}
              type="button"
              onClick={() =>
                onChange(option.value)
              }
              className={`
                w-full rounded-xl border px-5 py-4
                text-left text-sm font-medium
                transition
                ${
                  selected
                    ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50'
                }
              `}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    )
  }

  if (
    question.type === 'CURRENCY' ||
    question.type === 'NUMBER'
  ) {
    return (
      <div>
        <div className="relative">
          {question.type === 'CURRENCY' && (
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
              ₹
            </span>
          )}

          <input
            type="number"
            min="0"
            value={value ?? ''}
            onChange={(event) =>
              onChange(
                Number(event.target.value)
              )
            }
            placeholder={
              question.type === 'CURRENCY'
                ? 'Enter amount'
                : 'Enter value'
            }
            className={`
              w-full rounded-xl border
              border-slate-200 bg-white
              px-4 py-3.5 text-base
              text-slate-900
              outline-none transition
              placeholder:text-slate-400
              focus:border-slate-900
              focus:ring-2
              focus:ring-slate-900/10
              ${
                question.type === 'CURRENCY'
                  ? 'pl-9'
                  : ''
              }
            `}
          />
        </div>
      </div>
    )
  }

  return null
}