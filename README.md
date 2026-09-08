# Borrower Copilot

Borrower Copilot is a browser-based borrowing assistant designed for Indian borrowers.

It helps users understand:

- Whether they should borrow
- How much they can safely afford
- What interest rate may be reasonable
- What EMI and tenure they should target
- What to negotiate with a lender

The application also generates a one-screen **Negotiation Card** that can be saved as a PDF.

---

## Features

- Borrow / Borrow Less / Don't Borrow / Need More Info decision
- Safe affordability calculation
- Lender-style eligibility estimate
- Recommended borrowing amount
- Borrower-specific interest-rate range
- EMI and tenure comparison
- APR and all-in borrowing cost
- 20% income-reduction stress test
- Adaptive questions based on borrower information
- Explainable results with confidence levels
- Negotiation Card with Save as PDF

---

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS

The application runs entirely in the browser with no backend or database.

---

## How to Run

### Prerequisites

- Node.js 18+
- npm

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
cd borrower-copilot
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open the local URL shown by Vite, usually:

```text
http://localhost:5173
```

### 4. Build for production

```bash
npm run build
```

---

## How It Works

```text
Borrower Information
        ↓
Borrower Profile
        ↓
Decision Engine
        ↓
Affordability + Rate + EMI + APR + Stress Test
        ↓
Results Dashboard
        ↓
Negotiation Card
        ↓
Save as PDF
```

The application intentionally separates:

**Lender-style eligibility**

from

**Safe borrower affordability**

This prevents the system from simply recommending the maximum amount a lender might consider.

---

## Key Design Decisions

### 1. Unknown Is Not Zero

Unknown existing EMIs or expenses are never silently treated as zero.

For example:

- `₹0` means the borrower explicitly reported zero.
- `Unknown` means the information is unavailable.

When important information is missing, the application can return **NEED MORE INFO** instead of making an unsafe recommendation.

---

### 2. Explainable Calculations

The results are based on explicit financial rules and assumptions rather than a black-box model.

The rules, thresholds, assumptions and rationale are documented in:

[`RULES.md`](./RULES.md)

---

### 3. Adaptive Questioning

The application starts with a small set of core questions.

Additional questions are asked only when they can materially improve the assessment.

For example:

- Self-employed or informal income → income stability
- Unknown credit score → recent payment history

This keeps the questionnaire focused while still accounting for important risk factors.

---

### 4. Safe Affordability vs Lender Eligibility

The application shows both:

- A simplified lender-style eligibility estimate
- A more conservative safe affordability estimate

The purpose is to help borrowers understand that:

> **What a lender may be willing to lend is not necessarily what a borrower should comfortably borrow.**

---

## Test Scenarios

The application was tested using the three challenge borrower scenarios:

| Borrower | Expected Decision |
|----------|------------------|
| Priya | BORROW |
| Ravi | BORROW LESS |
| Anita | NEED MORE INFO |

These scenarios demonstrate:

- Comfortable borrowing within safe affordability
- Borrowing beyond safe affordability
- Handling incomplete financial information without making unsafe assumptions

---

## Negotiation Card

After completing the assessment, Borrower Copilot generates a compact negotiation card containing key information a borrower can use when discussing a loan with a lender.

It can include:

- Target loan amount
- Target interest-rate range
- EMI ceiling
- Target tenure
- Effective APR
- Processing fee
- Total interest
- Questions to ask the lender
- Negotiation script
- Important limitations

The card can be saved as a PDF using the browser's native print functionality.

---

## Confidence & Transparency

The application communicates confidence based on the completeness of the available information.

### HIGH

Sufficient information is available for the calculation within the prototype's assumptions.

### MEDIUM

The calculation is possible, but some important information is missing or uncertain.

### LOW

Required information is unavailable, so the application avoids producing a potentially misleading recommendation.

---

## Limitations

Borrower Copilot is a prototype decision-support tool.

The results are estimates based only on user-provided information. They are **not**:

- Loan approvals
- Guaranteed interest rates
- Guaranteed lender offers
- Financial advice

The application does not currently use:

- Credit-bureau APIs
- Bank statements
- Verified income documents
- Lender APIs
- Machine-learning models
- Backend storage

Actual lender decisions may consider additional information such as verified income, bank statements, ITRs, credit history, existing liabilities, collateral and lender-specific underwriting policies.

---

## Future Improvements

Potential next steps include:

1. Lender-specific loan products and pricing
2. Real loan-offer comparison
3. More detailed income and liability verification
4. Improved business and secured-loan models
5. Additional financial scenarios
6. Personalized negotiation guidance based on actual lender offers

---

## Project Structure

```text
src/
├── components/
│   ├── Questionnaire.tsx
│   ├── QuestionRenderer.tsx
│   └── ResultsDashboard.tsx
│
├── engine/
│   ├── affordability.ts
│   ├── aprCalculator.ts
│   ├── assessBorrower.ts
│   ├── borrowDecision.ts
│   ├── emiCalculator.ts
│   ├── emiRecommendation.ts
│   ├── getAdaptiveQuestions.ts
│   ├── lenderEstimate.ts
│   ├── loanAmount.ts
│   ├── rateEstimator.ts
│   ├── recommendedAmount.ts
│   └── stressTest.ts
│
├── types/
│   ├── assessment.ts
│   ├── answers.ts
│   ├── borrower.ts
│   └── questionnaire.ts
│
├── App.tsx
├── main.tsx
└── index.css
```

The financial calculations are kept in the `engine` layer rather than being scattered across the UI. This makes the rules easier to understand, test and modify independently from the interface.

---

## Project Principle

> **A borrower should know both what they may be eligible for and what they can safely afford — because those are not necessarily the same amount.**
