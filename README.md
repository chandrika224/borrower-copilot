# Borrower Copilot

Borrower Copilot is a browser-based borrowing assistant designed for Indian borrowers.

It helps users understand:

- Whether they should borrow
- How much they can safely afford
- What interest rate may be reasonable
- What EMI and tenure they should target
- What to negotiate with a lender

The application generates a one-screen **Negotiation Card** that can also be saved as a PDF.

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

### Install

```bash
git clone <your-github-repository-url>
cd borrower-copilot
npm install

### Start
npm run dev
Open the local URL shown by Vite, usually:
http://localhost:5173

Production Build
npm run build

### How It Works

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

The application intentionally separates:

Lender-style eligibility
from
Safe borrower affordability

This prevents the system from simply recommending the maximum amount a lender might consider.

### Key Design Decisions

Unknown is not Zero

Unknown existing EMIs or expenses are never silently treated as zero.

When important information is missing, the application can return NEED MORE INFO instead of making an unsafe recommendation.

### Explainable Calculations

The results are based on explicit rules and assumptions rather than a black-box model.

Detailed rules and assumptions are documented in:

RULES.md

### Adaptive Questioning

The application starts with a small set of core questions and asks additional questions only when they can materially improve the assessment.

### Test Scenarios

The application was tested with three borrower profiles:

Borrower	Expected Decision
Priya	BORROW
Ravi	BORROW LESS
Anita	NEED MORE INFO

These scenarios demonstrate the application's ability to handle:

Comfortable borrowing
Borrowing beyond safe affordability
Incomplete financial information
Limitations

This is a prototype decision-support tool.

The results are estimates based only on user-provided information and are not loan approvals, guaranteed rates, or financial advice.

### The application does not currently use:

Credit-bureau APIs
Bank statements
Verified income documents
Lender APIs
Machine-learning models
Backend storage

### Actual lender decisions may consider additional information and lender-specific policies.

Future Improvements
Lender-specific loan products and pricing
Real loan-offer comparison
More detailed income and liability verification
Improved business and secured-loan models
Additional financial scenarios
Personalized negotiation guidance
Project Principle

A borrower should know both what they may be eligible for and what they can safely afford — because those are not necessarily the same amount.
