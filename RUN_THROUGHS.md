# Borrower Copilot — Run-throughs

## Purpose

These run-throughs validate the Borrower Copilot against the three
borrowers specified in the Lokta challenge.

The application was run locally using the questionnaire and adaptive
question flow. Results below reflect the actual outputs produced by
the decision engine.

---

# 1. Priya

## Borrower profile

- Age: 29
- Location: Bengaluru
- Income: ₹1,10,000/month
- Income type: Salaried
- Income stability: Stable
- Existing EMI: ₹14,000/month
- Housing: ₹28,000/month
- Household expenses: ₹20,000/month
- Credit score: 780
- Payment history: Clean
- Purpose: Wedding
- Loan type: Personal
- Requested amount: ₹8,00,000

## Questions asked

### Core questions
1. Loan purpose
2. Loan amount
3. Loan type
4. Monthly net income
5. Income type
6. Existing EMIs
7. Housing expenses
8. Household expenses
9. Age
10. Credit score

### Adaptive questions
11. Income stability
12. Payment history

Collateral was not asked because the borrowing purpose was not business.

## Outputs

### O1 — Borrow decision

**BORROW**

The requested ₹8,00,000 fits within the current safe EMI capacity.

### O2 — Amount

- Lender-style estimate: ₹17,23,418
- Safe borrower amount: ₹13,24,599
- Recommended amount: ₹8,00,000

The borrower should use the safe/recommended amount rather than treating the lender-style maximum as a target.

### O3 — Fair rate

- Fair rate: 11%–14%
- Expected rate used for calculations: 11%
- Processing fee: ₹8,080
- Effective APR: 11.70%

### O4 — EMI

- Safe EMI ceiling: ₹28,800/month
- Recommended EMI: ₹26,191/month
- Recommended tenure: 36 months
- 48-month EMI: ₹20,676
- 60-month EMI: ₹17,394

The shorter 36-month tenure is recommended because it remains within the safe EMI ceiling and reduces total interest.

### Stress test

A 20% income reduction produces:

- Stressed income: ₹88,000
- Stressed safe EMI: ₹15,600
- Recommended EMI: ₹26,191
- Result: Not affordable under the stress scenario

The stress result is presented as a warning rather than changing the current affordability decision.

## Negotiation Card

The card should communicate:

- Recommended borrowing amount: ₹8,00,000
- Target fair rate: 11%–14%
- Recommended EMI: ₹26,191
- Tenure: 36 months
- APR including processing fee: 11.70%
- Current affordability is acceptable
- 20% income-drop stress case creates repayment risk

---

# 2. Ravi

## Borrower profile

- Age: 42
- Location: Mysuru
- Monthly income used by prototype: ₹80,000
- Income type: Self-employed
- Income stability: Variable
- Existing EMI: ₹0
- Housing: ₹0
- Household expenses: ₹0
- Credit score: Unknown
- Payment history: Unknown
- Purpose: Business
- Loan type: Business
- Requested amount: ₹15,00,000
- Potential collateral: ₹45,00,000

### Prototype assumption

The challenge describes Ravi's cash income as ₹40,000–₹80,000/month.
The current questionnaire accepts a single monthly-income value, so
₹80,000/month was used for this run.

This is a prototype limitation and should not be interpreted as a
guaranteed monthly income.

## Questions asked

### Core questions
1. Loan purpose
2. Loan amount
3. Loan type
4. Monthly net income
5. Income type
6. Existing EMIs
7. Housing expenses
8. Household expenses
9. Age
10. Credit score

### Adaptive questions
11. Income stability
12. Payment history
13. Collateral value

## Outputs

### O1 — Borrow decision

**BORROW**

The requested ₹15,00,000 fits within the current safe affordability estimate.

### O2 — Amount

- Lender-style estimate: ₹16,81,384
- Safe borrower amount: ₹16,09,491
- Recommended amount: ₹15,00,000

### O3 — Fair rate

- Fair rate: 17%–21%
- Expected rate used for calculations: 17%
- Processing fee: ₹15,150
- Effective APR: 17.47%

The range is wider because Ravi's credit score and payment history are unknown, while his income is self-employed and variable.

### O4 — EMI

- Safe EMI ceiling: ₹40,000/month
- Recommended EMI: ₹37,279/month
- Recommended tenure: 60 months

Tenure options:

- 36 months: ₹53,479 EMI
- 48 months: ₹43,283 EMI
- 60 months: ₹37,279 EMI

The 60-month option is selected because the shorter tenures exceed the safe EMI ceiling.

### Stress test

A 20% income reduction produces:

- Stressed income: ₹64,000
- Stressed safe EMI: ₹32,000
- Recommended EMI: ₹37,279
- Result: Not affordable under the stress scenario

### Product routing

**Secured business loan**

The ₹45,00,000 asset makes a secured business-loan route a better fit to explore.

The collateral does not guarantee approval, loan amount, valuation, or rate.

## Negotiation Card

The card should emphasize:

- ₹15,00,000 requested
- 17%–21% fair-rate range
- ₹37,279 recommended EMI
- 60-month tenure
- 17.47% effective APR
- Ask about a secured business-loan product
- Compare secured versus unsecured pricing
- Stress-test warning because variable income may make the repayment less resilient

---

# 3. Anita

## Borrower profile

- Age: 35
- Monthly income used by prototype: ₹30,000
- Income type: Informal
- Income stability: Variable
- Housing: ₹0
- Household expenses: ₹15,000
- Existing EMI: Unknown
- Credit score: Unknown
- Payment history: Recent bounce
- Purpose: Vehicle
- Loan type: Vehicle
- Requested amount: ₹1,50,000

## Questions asked

### Core questions
1. Loan purpose
2. Loan amount
3. Loan type
4. Monthly net income
5. Income type
6. Existing EMIs
7. Housing expenses
8. Household expenses
9. Age
10. Credit score

### Adaptive questions
11. Income stability
12. Payment history

## Outputs

### O1 — Borrow decision

**NEED_MORE_INFO**

The application refuses to assume that Anita's existing EMI is zero.

Her current loan payments must be known before safely calculating how much additional debt she can carry.

### O2 — Amount

- Lender-style estimate: Not calculated
- Safe borrower amount: Not calculated
- Recommended amount: Not calculated

### O3 — Fair rate

- Fair rate: 23%–27%
- Expected rate used: 23%
- Rate confidence: Medium

Reasons for the wider range:

- Credit score unknown
- Informal income
- Variable income
- Recent payment bounce

### O4 — EMI

No EMI is recommended because existing monthly loan commitments are unknown.

## Safety behavior

This run demonstrates an important guardrail:

> Unknown existing EMI is not treated as ₹0.

The application therefore avoids producing a misleading approval or EMI recommendation.

## Negotiation Card

The borrower should not receive a confident borrowing recommendation yet.

The next useful information is the actual monthly EMI burden across existing loans. Once that is known, affordability can be reassessed.

---

# Summary

| Borrower | Decision | Safe amount | Fair rate | Product route |
|---|---|---:|---:|---|
| Priya | BORROW | ₹13,24,599 | 11%–14% | Personal |
| Ravi | BORROW | ₹16,09,491 | 17%–21% | Secured business |
| Anita | NEED_MORE_INFO | Not calculated | 23%–27% | Vehicle |

## Key behaviors demonstrated

1. Lender-style maximum and borrower-safe amount are shown separately.
2. The borrower-safe amount is prioritized for recommendations.
3. Unknown affordability inputs are not silently treated as zero.
4. Fair rates are presented as ranges rather than false precision.
5. APR includes the processing fee.
6. EMI recommendations consider multiple tenures.
7. A 20% income-drop stress scenario is shown.
8. Ravi is routed toward a secured business-loan product because collateral is available.
9. Anita is stopped from taking on additional debt until her existing EMI burden is known.
