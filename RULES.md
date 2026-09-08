# Borrower Copilot — Rules & Assumptions

This document explains the rules and assumptions used by Borrower Copilot.

All calculations are estimates based only on information provided by the
borrower. They are not lender approvals, guaranteed rates, or financial advice.

---

## 1. Unknown values are not treated as zero

**What:** Unknown borrower information remains unknown.

**Value:**
- `0` = borrower explicitly reported zero.
- `undefined` = borrower does not know / information unavailable.

**Why:** Assuming unknown debt or expenses are zero can overstate affordability.

**Source:** My judgement / challenge requirement on honesty about limits.

---

## 2. Lender-style affordability

**What:** Estimate how much a lender might consider based on a simple FOIR rule.

**Value:**
- Maximum total EMI = `50% × monthly net income`
- Maximum new EMI = maximum total EMI − existing EMIs

**Why:** FOIR is commonly used in lending to assess repayment capacity.

**Source:** My judgement informed by commonly used Indian lender FOIR ranges.

---

## 3. Safe affordability

**What:** Estimate the EMI the borrower can more safely carry.

**Value:**
- Disposable income =
  `income − housing − household expenses − existing EMIs`
- Disposable-income EMI ceiling =
  `60% × disposable income`
- Safe new EMI =
  `minimum(FOIR-based EMI, disposable-income EMI)`

**Why:** The lower limit provides a more conservative affordability estimate
while leaving some monthly cash flow available for unexpected expenses.

**Source:** My judgement.

---

## 4. Lender estimate vs safe amount

**What:** The app shows both a lender-style estimate and a borrower-safe amount.

**Value:**
- Lender estimate uses the 50% FOIR rule.
- Safe amount uses the lower safe EMI ceiling.

**Why:** A lender may consider a higher loan amount than the borrower should
comfortably take.

**Source:** My judgement / challenge requirement.

---

## 5. Fair interest rate

**What:** Estimate a borrower-specific rate range rather than one universal rate.

**Value:**

| Profile | Target range |
|---|---:|
| Strong | 11%–14% |
| Moderate | 14%–18% |
| Higher risk | 18%–24% |

The range is adjusted using credit score, income type, income stability, and
payment history.

**Why:** Borrower risk affects loan pricing.

**Source:** My judgement informed by observed Indian personal-loan market ranges.
These are not guaranteed lender offers.

---

## 6. Risk factors

**Credit score:**
- 750+ → strong
- 700–749 → moderate
- 650–699 → weaker
- Below 650 → higher risk
- Unknown → wider uncertainty, not automatically bad

**Income type:**
- Salaried → stronger predictability
- Self-employed → additional underwriting uncertainty
- Informal → higher verification uncertainty

**Payment history:**
- Clean → positive
- Missed payments → negative
- Recent bounce → stronger negative
- Unknown → wider uncertainty

**Income stability:**
- Stable → lower uncertainty
- Somewhat variable → moderate uncertainty
- Highly variable → higher uncertainty

**Source:** My judgement.

---

## 7. Borrowing decision

The app produces four possible outcomes:

- **BORROW** — requested amount fits within safe affordability.
- **BORROW LESS** — requested amount exceeds safe affordability, but some
  borrowing capacity remains.
- **DON'T BORROW** — no meaningful safe EMI capacity remains.
- **NEED MORE INFO** — required information is unavailable.

**Why:** The app should not force a yes/no recommendation when important
information is missing.

**Source:** My judgement / challenge requirement.

---

## 8. EMI and tenure

**What:** Standard amortizing-loan mathematics is used to calculate EMI.

**Value:**
- Tenure options: 36, 48, and 60 months.
- Shorter tenure → higher EMI, lower total interest.
- Longer tenure → lower EMI, higher total interest.
- The shortest tenure that fits the safe EMI ceiling is preferred.

**Source:** Standard loan mathematics + my judgement.

---

## 9. Processing fee and APR

**What:** The app includes an upfront processing fee when calculating borrowing cost.

**Value:**
- Processing fee assumption = `1.01% of loan amount`.
- Effective APR accounts for the processing fee and net amount received.

**Why:** Nominal interest alone does not show the full cost of borrowing.

**Source:** Benchmark assumption informed by Indian lender examples;
prototype assumption, not a universal fee.

---

## 10. Stress test

**What:** Test whether the recommended EMI remains affordable if income falls.

**Value:**
- Income reduction = `20%`
- Stressed income = `80% × current income`

**Result:**
- `true` → EMI remains affordable.
- `false` → EMI exceeds stressed safe capacity.
- `undefined` → required information is unavailable.

**Why:** Shows whether the recommendation remains resilient to an income shock.

**Source:** My judgement.

---

## 11. Confidence and limitations

**Confidence:**
- **HIGH** → sufficient information for the calculation.
- **MEDIUM** → calculation is possible but important information is missing.
- **LOW** → required information is unavailable.

The app does not use bureau data, lender APIs, or verified financial documents.
Actual lender decisions may consider additional factors such as bank
statements, ITRs, credit history, lender-specific policies, collateral,
and verified income.

**Source:** Product limitation / challenge requirement.
