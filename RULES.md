# Borrower Copilot — Rules & Assumptions

This document explains the rules, thresholds, bands, and assumptions used by
Borrower Copilot.

All calculations are estimates based only on information provided by the
borrower. They are not lender approvals, guaranteed rates, or financial advice.

---

## 1. Data handling and unknown values

| What | Value | Why | Source |
|---|---|---|---|
| Explicit zero | `0` | Represents a borrower-confirmed zero value. | My judgement |
| Unknown value | `undefined` | Prevents missing information from being interpreted as zero. | My judgement / challenge requirement |
| Missing affordability information | Safe amount may be unavailable | The app should not manufacture an affordability number when important obligations are unknown. | Challenge requirement / my judgement |

Unknown debt, expenses, or payment obligations are therefore not silently
treated as zero.

---

## 2. Lender-style affordability

| What | Value | Why | Source |
|---|---:|---|---|
| Maximum total EMI | `50% × monthly net income` | Provides a simplified lender-style repayment capacity estimate. | My judgement informed by commonly used Indian lender FOIR ranges |
| Maximum new EMI | `maximum total EMI − existing EMIs` | Existing debt obligations reduce additional borrowing capacity. | My judgement |
| Lender estimate | Loan amount corresponding to maximum new EMI using the assessment's assumed rate and tenure | Separates a lender-style capacity estimate from the borrower's safer target. | My judgement / challenge requirement |
| Default rate used for lender estimate | `15%` annual | Provides a consistent rate assumption when converting lender EMI capacity into an illustrative loan amount. | My judgement |
| Default lender-estimate tenure | `60 months` | Provides a consistent comparison period. | My judgement |

### Important limitation

The lender estimate is **not a prediction of actual sanction**. Real lenders
may use credit bureau data, income verification, bank statements, existing
obligations, lender-specific FOIR policies, collateral, and other underwriting
criteria.

---

## 3. Safe borrower affordability

| What | Value | Why | Source |
|---|---:|---|---|
| Disposable income | `income − housing − household expenses − existing EMIs` | Estimates monthly cash flow remaining after stated obligations. | My judgement |
| Disposable-income EMI ceiling | `60% × disposable income` | Leaves part of disposable income available for unexpected expenses and other needs. | My judgement |
| FOIR-based EMI ceiling | `50% × income − existing EMIs` | Limits total EMI burden using the lender-style affordability rule. | My judgement |
| Safe new EMI ceiling | `minimum(FOIR-based EMI, disposable-income EMI ceiling)` | Uses the more conservative of the two affordability views. | My judgement |

If a required value such as existing EMIs is unknown, the app does not assume
zero. The resulting safe affordability calculation may therefore be
unavailable.

---

## 4. Lender estimate vs borrower-safe amount

| What | Value | Why | Source |
|---|---|---|---|
| Lender-style amount | Based on the 50% FOIR rule | Shows what a simplified lender-side affordability calculation might support. | My judgement |
| Safe amount | Based on the lower safe EMI ceiling | Represents a more conservative borrower-focused affordability target. | My judgement |
| Borrower should use | **Safe / recommended amount**, not the maximum lender-style amount | The challenge requires separating lender eligibility from what the borrower should actually take. | Challenge requirement / my judgement |

The lender-style amount is deliberately presented as an estimate rather than
an approval.

---

## 5. Fair interest rate

| What | Value | Why | Source |
|---|---:|---|---|
| Strong base band | `11%–14%` | Represents the lower-risk reference range used by the prototype. | My judgement informed by observed Indian personal-loan market ranges |
| Moderate base band | `14%–18%` | Represents a middle-risk reference range. | My judgement informed by observed Indian personal-loan market ranges |
| Higher-risk base band | `18%–24%` | Represents a higher-risk reference range before individual risk adjustments. | My judgement informed by observed Indian personal-loan market ranges |
| Output format | Rate **band**, not a single point | A borrower's exact lender pricing cannot be known from the information collected. | Challenge requirement |
| Rate adjustments | Based on credit score, income type, income stability, and payment history | Different risk characteristics can affect pricing and uncertainty. | My judgement |

### Important limitation

The bands above are **reference bands used by the prototype**, not guaranteed
market offers.

Individual risk adjustments can move the final estimated range outside the
base bands. A higher displayed range therefore means the prototype sees
greater pricing uncertainty/risk; it does **not** mean a lender will necessarily
quote that rate.

---

## 6. Credit-score rules

| What | Value | Why | Source |
|---|---|---|---|
| Strong score | `750+` | Used as a positive pricing signal. | My judgement |
| Moderate score | `700–749` | Used as a middle pricing signal. | My judgement |
| Weaker score | `650–699` | Indicates greater pricing uncertainty. | My judgement |
| Higher-risk score | `<650` | Indicates substantially higher credit risk. | My judgement |
| Unknown score | No automatic negative classification; widen uncertainty | Missing information should reduce confidence rather than be treated as a poor score. | My judgement / challenge requirement |

---

## 7. Income-type rules

| What | Value | Why | Source |
|---|---|---|---|
| Salaried income | Lower uncertainty | Regular documented income is generally easier to assess. | My judgement |
| Self-employed income | Additional uncertainty | Income can be more variable and may require additional verification. | My judgement |
| Informal income | Higher verification uncertainty | Income may be harder for a lender to verify consistently. | My judgement |

These are risk-model assumptions, not statements about an individual's
creditworthiness.

---

## 8. Payment-history rules

| What | Value | Why | Source |
|---|---|---|---|
| Clean payment history | Positive signal | Indicates no reported recent repayment problems. | My judgement |
| Missed payments | Negative signal | Indicates repayment uncertainty. | My judgement |
| Recent bounced payment | Stronger negative signal | A recent bounce is a more immediate repayment-risk indicator. | My judgement |
| Unknown payment history | Wider uncertainty | Missing information should reduce confidence rather than automatically imply poor history. | My judgement / challenge requirement |

---

## 9. Income-stability rules

| What | Value | Why | Source |
|---|---|---|---|
| Stable | Lower uncertainty | Predictable income generally makes repayment planning easier. | My judgement |
| Somewhat variable | Moderate uncertainty | Some income variation increases uncertainty. | My judgement |
| Highly variable | Higher uncertainty | Larger income fluctuations increase repayment uncertainty. | My judgement |

---

## 10. Borrowing decision

| Decision | Rule | Why | Source |
|---|---|---|---|
| `BORROW` | Requested amount is within the calculated safe amount. | The request appears affordable under the prototype's assumptions. | My judgement |
| `BORROW LESS` | Requested amount exceeds safe amount, but some safe borrowing capacity remains. | Reduces the requested debt rather than forcing a binary yes/no answer. | Challenge requirement / my judgement |
| `DON'T BORROW` | No meaningful safe new EMI capacity remains. | Prevents recommending additional borrowing when repayment capacity is insufficient. | Challenge requirement / my judgement |
| `NEED MORE INFO` | Required affordability information is unavailable. | Prevents false precision when the assessment cannot safely calculate capacity. | Challenge requirement / my judgement |

The app must be able to reach `DON'T BORROW`; it is not designed to always
encourage borrowing.

---

## 11. Product routing

| What | Value | Why | Source |
|---|---|---|---|
| Secured business route | Business-purpose borrowing + usable collateral information | A borrower with collateral may have a better-fit secured product option than relying only on unsecured borrowing. | My judgement / challenge requirement |
| Business route | Business-purpose borrowing without usable collateral information | Keeps the product route aligned with the stated purpose. | My judgement |
| Vehicle route | Vehicle-purpose borrowing | A vehicle-specific product may be more appropriate than a generic personal loan. | My judgement |
| Personal route | Personal/unsecured borrowing | Used when the request is evaluated as personal borrowing. | My judgement |

### Important limitation

A secured-product route does **not** guarantee approval, a specific loan amount,
or a specific interest rate.

Actual collateral eligibility depends on lender valuation, legal verification,
ownership, documentation, lender policy, and underwriting.

---

## 12. EMI and tenure

| What | Value | Why | Source |
|---|---:|---|---|
| EMI calculation | Standard amortizing-loan formula | Provides consistent monthly repayment calculations. | Standard loan mathematics |
| Short tenure option | `36 months` | Allows comparison of faster repayment and lower total interest. | My judgement |
| Medium tenure option | `48 months` | Provides an intermediate repayment option. | My judgement |
| Long tenure option | `60 months` | Reduces monthly EMI at the cost of higher total interest. | My judgement |
| Tenure selection | Prefer the shortest tenure whose EMI fits within the safe EMI ceiling. | Helps limit total interest while respecting affordability. | My judgement |

### Tenure trade-off

Shorter tenure generally means:

- Higher monthly EMI
- Lower total interest

Longer tenure generally means:

- Lower monthly EMI
- Higher total interest

The borrower should not choose a shorter tenure if doing so pushes the EMI
above their safe repayment capacity.

---

## 13. Processing fee and effective APR

| What | Value | Why | Source |
|---|---:|---|---|
| Processing fee | `1.01% of loan amount` | Includes an upfront borrowing cost in the prototype's total-cost comparison. | Benchmark assumption informed by Indian lender examples |
| Effective APR | Calculated using the processing fee and net amount received | Shows that the nominal interest rate does not represent the entire borrowing cost. | My judgement / standard cash-flow concept |
| Other lender charges | Not included unless explicitly modeled | Prevents the prototype from pretending to know lender-specific charges. | Product limitation |

### Important limitation

The `1.01%` processing fee is an **illustrative prototype assumption**, not a
universal Indian lender fee.

Actual processing fees, taxes, insurance, documentation charges, foreclosure
charges, and other costs may differ.

Borrowers should compare the lender's disclosed total cost before accepting an
offer.

---

## 14. Stress test

| What | Value | Why | Source |
|---|---:|---|---|
| Income shock | `20% reduction` | Tests whether the recommendation has resilience to a moderate income decline. | My judgement |
| Stressed income | `80% × current income` | Represents the income after the assumed shock. | My judgement |
| Stressed safe EMI | Recalculate safe EMI using stressed income | Tests affordability under worse conditions rather than current conditions only. | My judgement |
| `true` | Recommended EMI remains within stressed safe EMI capacity. | Indicates the repayment remains affordable under the modeled shock. | My judgement |
| `false` | Recommended EMI exceeds stressed safe EMI capacity. | Indicates affordability becomes tighter under the modeled shock. | My judgement |
| `undefined` | Required affordability information unavailable. | Prevents false precision. | Challenge requirement / my judgement |

The stress test is an illustration, not a prediction of future income.

---

## 15. Confidence

| Confidence | Rule | Why | Source |
|---|---|---|---|
| `HIGH` | Sufficient relevant information is available for the calculation. | Indicates stronger support for the estimate. | My judgement |
| `MEDIUM` | Calculation is possible but important information is missing. | Signals meaningful uncertainty. | My judgement |
| `LOW` | Required information is unavailable or the calculation cannot be safely completed. | Prevents presenting incomplete analysis as precise. | My judgement |

Confidence describes **information quality**, not the probability that a lender
will approve the loan.

---

## 16. Data and product limitations

| Limitation | Value | Why | Source |
|---|---|---|---|
| Bureau data | Not used | The challenge requires no bureau pull. | Challenge requirement |
| Lender APIs | Not used | Keeps the prototype independent of external lender systems. | Challenge requirement |
| Personal data storage | Not used | The assessment operates only on borrower-provided information during the session. | Challenge requirement |
| Verified financial documents | Not used | The prototype cannot independently verify income, expenses, debts, or assets. | Product limitation |
| Actual lender policy | Not modeled | Different lenders use different underwriting rules and pricing. | Product limitation |
| Actual collateral valuation | Not modeled | The borrower-provided asset value may differ from lender valuation. | Product limitation |

Actual lender decisions may consider bank statements, ITRs, bureau history,
existing obligations, verified income, collateral valuation, employment
history, lender policy, and other underwriting information.
