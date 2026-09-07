# Borrower Copilot — Rules & Assumptions

This document explains the financial rules, thresholds, assumptions, and
decision logic used by Borrower Copilot.

The application is an educational decision-support tool. It does not
represent lender approval, underwriting, or financial advice.

---

# 1. Core principle: Unknown is not zero

### What
Information that the borrower does not know is kept as unknown rather than
being converted to zero.

### Value
- `0` means the borrower explicitly reported zero.
- `undefined` means the information is unknown or unavailable.

### Why
Treating unknown debt or expenses as zero could materially overstate the
amount a borrower can safely afford.

### Source
My judgement based on the challenge requirement to be honest about limits.

---

# 2. Maximum FOIR

### What
Maximum total EMI burden used for the lender-style affordability estimate.

### Value
50% of monthly net income.

```text
Maximum total EMI = monthly net income × 50%
