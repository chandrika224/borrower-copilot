import { estimateLenderAmount } from './engine/lenderEstimate'

function App() {
  const priya = {
    age: 29,

    income: {
      monthlyNetIncome: 110000,
      type: 'SALARIED' as const,
    },

    expenses: {
      housing: 28000,
      otherHouseholdExpenses: 20000,
      existingEMIs: 14000,
    },

    credit: {
      score: 780,
    },

    loanRequest: {
      purpose: 'WEDDING' as const,
      type: 'PERSONAL' as const,
      requestedAmount: 800000,
    },
  }

  const result = estimateLenderAmount(priya)

  console.log('Lender Estimate:', result)

  return (
    <div>
      <h1>Lender Estimate Test</h1>

      <p>
        Maximum New EMI: ₹{result.maximumNewEMI}
      </p>

      <p>
        Estimated Loan Amount: ₹{result.estimatedLoanAmount}
      </p>
    </div>
  )
}

export default App