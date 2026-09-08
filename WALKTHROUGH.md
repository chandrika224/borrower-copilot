# Borrower Copilot — Five-Minute Walkthrough

## 1. Product Overview

Borrower Copilot is a browser-based borrowing assistant designed for Indian
borrowers.

It helps a borrower answer four questions before approaching a lender:

1. Should I borrow?
2. How much can I safely afford?
3. What interest rate should I consider fair?
4. What EMI and tenure should I agree to?

The application then turns the assessment into a practical **Negotiation Card**.

---

## 2. User Flow

```text
Borrower Information
        ↓
Core Questions
        ↓
Adaptive Questions
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

The application does not require login, credit-bureau access, a backend, or
stored personal data.

---

## 3. Key Product Decision

The most important design decision is separating:

**Lender-style eligibility**

from

**Safe borrower affordability**

A lender may potentially sanction more than a borrower should comfortably
take.

The application therefore shows both numbers and recommends using the safer
borrower-focused amount as the borrowing target.

---

## 4. Adaptive Questioning

The questionnaire starts with a small set of core questions.

Additional questions are asked only when they can affect an assessment
output.

Examples:

- Income stability affects repayment-risk confidence.
- Payment history affects rate and risk assessment.
- Collateral information can change the recommended product route for business
  borrowing.

This avoids asking every borrower the same long questionnaire.

---

## 5. Unknown Is Not Zero

The application intentionally distinguishes between:

- **₹0** — the borrower explicitly reports zero.
- **Unknown** — the information is unavailable.

For example, if existing EMI information is unknown, the application does not
assume that existing loans have no monthly payment.

Instead, it can return:

**NEED MORE INFO**

and withhold the safe borrowing amount and EMI recommendation.

This prevents false precision.

---

## 6. Three Challenge Borrowers

### Priya — BORROW

Priya represents a strong salaried borrower with a known credit score and
stable income.

The application determines that her ₹8,00,000 request fits within her current
safe affordability.

The application also shows:

- Fair-rate range
- Recommended EMI
- Tenure trade-off
- APR including the assumed processing fee
- Stress-test result

The stress test shows that the recommendation would become less resilient if
income fell by 20%, while the headline decision remains based on current
affordability.

---

### Ravi — BORROW + SECURED BUSINESS ROUTE

Ravi represents a self-employed borrower with variable income, no established
formal credit history, and approximately ₹45 lakh of potential collateral.

The application:

- Evaluates his current affordability
- Separates lender-style capacity from safe affordability
- Shows a wider rate range because of uncertainty
- Runs a 20% income-reduction stress test
- Routes him toward a **Secured Business Loan** because collateral is available

The secured route is presented as a potentially better-fit product, not as a
guaranteed approval or valuation.

---

### Anita — NEED MORE INFO

Anita represents an informal-income borrower with existing app loans, a recent
payment bounce, and unknown current monthly EMI obligations.

The application does not assume her existing EMI is zero.

Instead, it returns:

**NEED MORE INFO**

and withholds:

- Safe borrowing amount
- Lender-style amount
- EMI recommendation
- Tenure recommendation
- APR

until the missing affordability information is available.

This is intentional safety behavior.

---

## 7. Explainability

The application makes the main calculations visible to the borrower.

Examples include:

- Why the safe EMI ceiling is lower than the lender-style capacity
- Why the fair-rate range is wider
- Why an EMI is or is not affordable
- Why a particular product route is suggested
- Why a result is unavailable when important information is missing

The detailed assumptions and thresholds are documented in
[`RULES.md`](./RULES.md).

---

## 8. Negotiation Card

The Negotiation Card converts the assessment into practical lender-facing
guidance.

It can include:

- Target loan amount
- Fair interest-rate range
- EMI ceiling
- Target tenure
- Effective APR
- Processing fee
- Total interest
- Questions to ask the lender
- Negotiation script
- Warnings when important information is missing

The card can be saved as a PDF using the browser's native print functionality.

---

## 9. What I Would Build Next

Given more development time, I would prioritize:

1. Lender-specific loan products and pricing
2. Real loan-offer comparison
3. Better business and secured-loan modelling
4. More detailed income and liability verification
5. Additional affordability scenarios

---

## 10. What I Intentionally Cut

To keep the prototype focused, I intentionally did not build:

- Login or authentication
- Backend or database
- Credit-bureau integration
- Bank statement integration
- Machine-learning models
- Large lender marketplace
- Extensive loan-product coverage

These were excluded because they were not necessary to answer the four core
borrower questions and would have taken time away from the borrowing logic,
explainability, and borrower experience.

---

## 11. Product Principle

> **A borrower should know both what they may be eligible for and what they can
> safely afford — because those are not necessarily the same amount.**
