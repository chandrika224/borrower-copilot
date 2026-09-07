import type { LoanAssessment } from '../types/assessment'

interface ResultsDashboardProps {
  assessment: LoanAssessment
  onNewAssessment: () => void
}

export function ResultsDashboard({
  assessment,
  onNewAssessment,
}: ResultsDashboardProps) {
  const {
    decision,
    fairRate,
    recommendedAmount,
    emiRecommendation,
    apr,
    stressTest,
  } = assessment

  // =====================================================
  // FORMATTING HELPERS
  // =====================================================

  const formatCurrency = (
    value: number | undefined,
  ) =>
    value === undefined
      ? 'Not available'
      : `₹${value.toLocaleString('en-IN')}`

  const formatPercent = (
    value: number | undefined,
  ) =>
    value === undefined
      ? 'Not available'
      : `${value.toFixed(2)}%`

  const formatTenure = (
    value: number | undefined,
  ) =>
    value === undefined
      ? 'Not available'
      : `${value} months`

  // =====================================================
  // DECISION STYLE
  // =====================================================

    // =====================================================
  // DECISION STYLE
  // =====================================================

  const decisionStyle =
    decision.decision === 'BORROW'
      ? {
          container:
            'border-emerald-200 bg-emerald-50',
          label:
            'text-emerald-700',
          badge:
            'bg-emerald-600 text-white',
          title:
            'You appear able to borrow',
        }
      : decision.decision === 'BORROW_LESS'
        ? {
            container:
              'border-amber-200 bg-amber-50',
            label:
              'text-amber-700',
            badge:
              'bg-amber-500 text-white',
            title:
              'Consider borrowing less',
          }
        : decision.decision === 'DONT_BORROW'
          ? {
              container:
                'border-red-200 bg-red-50',
              label:
                'text-red-700',
              badge:
                'bg-red-600 text-white',
              title:
                'It is safer not to borrow right now',
            }
          : {
              container:
                'border-blue-200 bg-blue-50',
              label:
                'text-blue-700',
              badge:
                'bg-blue-600 text-white',
              title:
                'We need a little more information',
            }

  const decisionLabel =
    decision.decision === 'BORROW'
      ? 'BORROW'
      : decision.decision === 'BORROW_LESS'
        ? 'BORROW LESS'
        : decision.decision === 'DONT_BORROW'
          ? "DON'T BORROW"
          : 'NEED MORE INFO'
  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="min-h-screen bg-slate-50">

      {/* =====================================================
          HEADER
      ====================================================== */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-950">
              BorrowWise
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Your borrowing copilot
            </p>
          </div>

          <button
            type="button"
            onClick={onNewAssessment}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300"
          >
            ← New assessment
          </button>

        </div>
      </header>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">

        {/* =====================================================
            PAGE INTRODUCTION
        ====================================================== */}
        <div className="mb-10">

          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
            Your borrowing plan
          </p>

          <h2 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Know what you can afford before you borrow.
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            We turn your income, expenses and loan request into
            a practical borrowing plan — including how much to
            borrow, what rate to target and what EMI to negotiate.
          </p>

        </div>

        {/* =====================================================
            DECISION SUMMARY
        ====================================================== */}
        <section className="mb-10">

          <div
            className={`rounded-3xl border p-6 shadow-sm sm:p-8 ${decisionStyle.container}`}
          >

            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

              <div className="max-w-2xl">

                <p
                  className={`text-xs font-bold uppercase tracking-[0.12em] ${decisionStyle.label}`}
                >
                  Borrowing decision
                </p>

                <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                  {decisionStyle.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-700">
                  {decision.reason}
                </p>

              </div>

              <span
                className={`self-start rounded-full px-4 py-2 text-sm font-bold ${decisionStyle.badge}`}
              >
                {decisionLabel}
              </span>

            </div>

            {/* =================================================
                KEY NUMBERS
            ================================================== */}
            <div className="mt-7 grid gap-4 sm:grid-cols-3">

              {/* Recommended amount */}
              <div className="rounded-2xl bg-white/80 p-5">

                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Recommended amount
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-950">
                  {formatCurrency(
                    recommendedAmount.recommendedAmount,
                  )}
                </p>

              </div>

              {/* Recommended EMI */}
              <div className="rounded-2xl bg-white/80 p-5">

                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Recommended EMI
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-950">
                  {formatCurrency(
                    emiRecommendation.recommendedEMI,
                  )}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  per month
                </p>

              </div>

              {/* Fair rate */}
              <div className="rounded-2xl bg-white/80 p-5">

                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Fair rate
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-950">
                  {fairRate.lowRate}% – {fairRate.highRate}%
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  estimated annual rate
                </p>

              </div>

            </div>

            {/* Explanation */}
            <div className="mt-6 border-t border-black/10 pt-5">

              <p className="text-sm leading-6 text-slate-700">

                <strong className="text-slate-950">
                  Why this decision?
                </strong>{' '}

                We compare the requested loan with your estimated
                safe repayment capacity. The recommendation
                prioritizes what you can reasonably carry rather
                than the maximum amount a lender might potentially
                approve.

              </p>

            </div>

          </div>

        </section>

        {/* =====================================================
            01 — AMOUNT
        ====================================================== */}
        <section className="mb-10">

          <div className="mb-5">

            <div className="flex items-center gap-3">

              <span className="text-xs font-bold tracking-[0.2em] text-slate-400">
                01
              </span>

              <h3 className="text-xl font-bold text-slate-950">
                How much should you borrow?
              </h3>

            </div>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              A lender may approve more than you can comfortably
              afford. We separate potential lender eligibility
              from safer borrower affordability.
            </p>

          </div>

          {/* Amount comparison */}
          <div className="grid gap-4 md:grid-cols-3">

            {/* Requested */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <p className="text-sm font-medium text-slate-500">
                You requested
              </p>

              <p className="mt-3 text-2xl font-bold text-slate-950">
                {formatCurrency(
                  recommendedAmount.requestedAmount,
                )}
              </p>

              <p className="mt-2 text-sm leading-5 text-slate-500">
                The amount you told us you want to borrow.
              </p>

            </div>

            {/* Lender estimate */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <p className="text-sm font-medium text-slate-500">
                Estimated lender amount
              </p>

              <p className="mt-3 text-2xl font-bold text-slate-950">
                {formatCurrency(
                  recommendedAmount.lenderEstimatedAmount,
                )}
              </p>

              <p className="mt-2 text-sm leading-5 text-slate-500">
                A simplified estimate of what a lender might
                consider based on the assessment's lender-side
                affordability rule.
              </p>

            </div>

            {/* Safe amount */}
            <div
            className={
              recommendedAmount.safeAmount !== undefined
                ? 'rounded-2xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm'
                : 'rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm'
            }
          >
            <p
              className={
                recommendedAmount.safeAmount !== undefined
                  ? 'text-sm font-semibold text-emerald-700'
                  : 'text-sm font-semibold text-slate-600'
              }
            >
              Safe amount
            </p>

              <p className="mt-3 text-2xl font-bold text-slate-950">
                {formatCurrency(
                  recommendedAmount.safeAmount,
                )}
              </p>

              <p className="mt-2 text-sm leading-5 text-slate-600">
                Based on the repayment capacity estimated from
                your income, expenses and existing EMIs.
              </p>

            </div>

          </div>

          {/* Recommendation */}
          <div className="mt-4 rounded-2xl border-2 border-emerald-200 bg-white p-6 shadow-sm sm:p-7">

            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

              <div>

                <p className="text-xs font-bold uppercase tracking-[0.12em] text-emerald-700">
                  Our recommendation
                </p>

                <p className="mt-2 text-4xl font-bold tracking-tight text-slate-950">
                  {formatCurrency(
                    recommendedAmount.recommendedAmount,
                  )}
                </p>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                  {recommendedAmount.reason}
                </p>

              </div>

              <div className="rounded-xl bg-emerald-50 px-5 py-4 md:max-w-xs">

                <p className="text-sm font-semibold text-emerald-800">
                  What should you use?
                </p>

                <p className="mt-1 text-sm leading-5 text-emerald-700">
                  Use the recommended amount as your borrowing
                  target rather than simply accepting the maximum
                  amount a lender may offer.
                </p>

              </div>

            </div>

          </div>

          {/* Why different */}
          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">

            <p className="text-sm font-semibold text-slate-900">
              Why are these numbers different?
            </p>

            <div className="mt-3 grid gap-4 text-sm leading-6 text-slate-600 md:grid-cols-2">

              <p>
                <span className="font-semibold text-slate-900">
                  Lender estimate:
                </span>{' '}
                what a lender might consider approving under the
                simplified rule used by this assessment.
              </p>

              <p>
                <span className="font-semibold text-slate-900">
                  Safe amount:
                </span>{' '}
                what appears more manageable given your income,
                household expenses and existing EMIs.
              </p>

            </div>

          </div>

        </section>

        {/* =====================================================
            02 — FAIR RATE
        ====================================================== */}
        <section className="mb-10">

          <div className="mb-5">

            <div className="flex items-center gap-3">

              <span className="text-xs font-bold tracking-[0.2em] text-slate-400">
                02
              </span>

              <h3 className="text-xl font-bold text-slate-950">
                What is a fair interest rate?
              </h3>

            </div>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              This is our estimate of a reasonable rate range for
              your profile. It is not a guaranteed lender quote.
            </p>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">

            {/* Rate summary */}
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

              <div>

                <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                  Fair rate range
                </p>

                <div className="mt-3 flex items-baseline gap-3">

                  <span className="text-4xl font-bold text-slate-950">
                    {fairRate.lowRate}%
                  </span>

                  <span className="text-xl text-slate-400">
                    –
                  </span>

                  <span className="text-4xl font-bold text-slate-950">
                    {fairRate.highRate}%
                  </span>

                </div>

                <p className="mt-2 text-sm text-slate-500">
                  Estimated annual interest rate
                </p>

              </div>

              {/* Confidence */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">

                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Confidence
                </p>

                <p className="mt-1 text-lg font-bold text-slate-950">
                  {fairRate.confidence}
                </p>

                <p className="mt-1 max-w-xs text-xs leading-5 text-slate-500">
                  Confidence reflects how much useful borrower
                  information was available for this estimate.
                </p>

              </div>

            </div>

            {/* Range visual */}
            <div className="mt-8">

              <div className="flex justify-between text-xs font-medium text-slate-500">

                <span>
                  Lower rate
                </span>

                <span>
                  Higher rate
                </span>

              </div>

              <div className="relative mt-3 h-3 rounded-full bg-slate-100">

                <div
                  className="absolute h-3 rounded-full bg-slate-800"
                  style={{
                    left: '15%',
                    right: '15%',
                  }}
                />

                <div
                  className="absolute -top-1 h-5 w-5 rounded-full border-2 border-white bg-slate-900 shadow"
                  style={{
                    left: '15%',
                  }}
                />

                <div
                  className="absolute -top-1 h-5 w-5 rounded-full border-2 border-white bg-slate-900 shadow"
                  style={{
                    right: '15%',
                  }}
                />

              </div>

              <div className="mt-3 flex justify-between text-xs text-slate-400">

                <span>
                  {fairRate.lowRate}%
                </span>

                <span>
                  {fairRate.highRate}%
                </span>

              </div>

            </div>

            {/* Why rate */}
            <div className="mt-8 border-t border-slate-100 pt-6">

              <h4 className="text-base font-bold text-slate-950">
                Why this rate?
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {fairRate.reason}
              </p>

              <div className="mt-4 rounded-xl bg-slate-50 p-4">

                <p className="text-sm font-semibold text-slate-900">
                  What affects your rate?
                </p>

                <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">

                  <li>
                    <span className="font-semibold text-slate-900">
                      Credit profile:
                    </span>{' '}
                    A stronger credit history generally supports
                    better pricing.
                  </li>

                  <li>
                    <span className="font-semibold text-slate-900">
                      Income type and stability:
                    </span>{' '}
                    More predictable income generally reduces
                    repayment uncertainty.
                  </li>

                  <li>
                    <span className="font-semibold text-slate-900">
                      Payment history:
                    </span>{' '}
                    Recent missed or bounced payments can increase
                    perceived repayment risk.
                  </li>

                </ul>

              </div>

            </div>

            {/* APR */}
            <div className="mt-6 rounded-2xl border border-slate-200 p-5">

              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                <div>

                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                    Estimated all-in APR
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-950">
                    {formatPercent(
                      apr.effectiveAPR,
                    )}
                  </p>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                    APR accounts for the assumed processing fee
                    as well as interest, giving you a better view
                    of the overall borrowing cost.
                  </p>

                </div>

                <div className="rounded-xl bg-slate-50 px-5 py-4">

                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Processing fee assumption
                  </p>

                  <p className="mt-1 text-lg font-bold text-slate-950">
                    {apr.processingFeePercent}%
                  </p>

                </div>

              </div>

              <div className="mt-5 border-t border-slate-100 pt-4">

                <p className="text-xs leading-5 text-slate-500">
                  The processing fee is an illustrative assumption
                  used by this assessment. Actual lender fees,
                  taxes and other charges may differ. Always compare
                  the lender's disclosed total cost before accepting
                  an offer.
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            03 — EMI
        ====================================================== */}
        <section className="mb-10">

          <div className="mb-5">

            <div className="flex items-center gap-3">

              <span className="text-xs font-bold tracking-[0.2em] text-slate-400">
                03
              </span>

              <h3 className="text-xl font-bold text-slate-950">
                What EMI should you agree to?
              </h3>

            </div>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              We compare different repayment periods and recommend
              an EMI that stays within your estimated safe monthly
              repayment capacity.
            </p>

          </div>

          {/* EMI summary */}
          <div className="grid gap-4 md:grid-cols-3">

            <div className="rounded-2xl border-2 border-slate-900 bg-white p-6 shadow-sm">

              <p className="text-sm font-semibold text-slate-500">
                Recommended EMI
              </p>

              <p className="mt-3 text-3xl font-bold text-slate-950">
                {formatCurrency(
                  emiRecommendation.recommendedEMI,
                )}
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Monthly repayment
              </p>

            </div>

            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">

              <p className="text-sm font-semibold text-emerald-700">
                Safe EMI ceiling
              </p>

              <p className="mt-3 text-3xl font-bold text-slate-950">
                {formatCurrency(
                  emiRecommendation.safeEMICeiling,
                )}
              </p>

              <p className="mt-2 text-sm leading-5 text-slate-600">
                Estimated maximum new EMI based on your current
                income, expenses and existing EMIs.
              </p>

            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <p className="text-sm font-semibold text-slate-500">
                Recommended tenure
              </p>

              <p className="mt-3 text-3xl font-bold text-slate-950">
                {formatTenure(
                  emiRecommendation.recommendedTenureMonths,
                )}
              </p>

            </div>

          </div>

          {/* Tenure trade-off */}
          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <h4 className="text-base font-bold text-slate-950">
              Tenure trade-off
            </h4>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              A shorter tenure usually means a higher monthly EMI
              but less total interest. A longer tenure reduces the
              monthly EMI but usually increases total interest.
            </p>

            {emiRecommendation.tenureOptions.length > 0 ? (

              <div className="mt-6 grid gap-3 sm:grid-cols-3">

                {emiRecommendation.tenureOptions.map(
                  (option) => {

                    const isRecommended =
                      option.months ===
                      emiRecommendation.recommendedTenureMonths

                    const isAffordable =
                      emiRecommendation.safeEMICeiling !== undefined &&
                      option.emi <=
                        emiRecommendation.safeEMICeiling

                    return (
                      <div
                        key={option.months}
                        className={
                          isRecommended
                            ? 'rounded-xl border-2 border-slate-900 bg-slate-50 p-5'
                            : 'rounded-xl border border-slate-200 bg-white p-5'
                        }
                      >

                        <div className="flex items-center justify-between gap-2">

                          <p className="text-sm font-semibold text-slate-700">
                            {option.months} months
                          </p>

                          {isRecommended && (
                            <span className="rounded-full bg-slate-900 px-2.5 py-1 text-xs font-semibold text-white">
                              Recommended
                            </span>
                          )}

                        </div>

                        <p className="mt-4 text-2xl font-bold text-slate-950">
                          {formatCurrency(option.emi)}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Monthly EMI
                        </p>

                        <div className="mt-4 border-t border-slate-100 pt-4">

                          <p className="text-xs font-semibold text-slate-500">
                            Total interest
                          </p>

                          <p className="mt-1 text-sm font-bold text-slate-800">
                            {formatCurrency(
                              option.totalInterest,
                            )}
                          </p>

                        </div>

                        <div className="mt-3">

                          {isAffordable ? (
                            <span className="text-xs font-semibold text-emerald-600">
                              ✓ Within safe EMI ceiling
                            </span>
                          ) : (
                            <span className="text-xs font-semibold text-amber-600">
                              Above safe EMI ceiling
                            </span>
                          )}

                        </div>

                      </div>
                    )
                  },
                )}

              </div>

            ) : (

              <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">

                <p className="text-sm font-semibold text-amber-800">
                  Tenure comparison unavailable
                </p>

                <p className="mt-1 text-sm leading-6 text-amber-700">
                  We cannot safely compare repayment periods until
                  the missing affordability information is available.
                </p>

              </div>

            )}

            <div className="mt-5 rounded-xl bg-slate-50 p-4">

              <p className="text-sm font-semibold text-slate-900">
                How should you choose?
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Prefer the shortest tenure whose EMI stays within
                your estimated safe EMI ceiling. This can help
                limit total interest while keeping the monthly
                repayment manageable.
              </p>

            </div>

          </div>

          {/* Stress test */}
          <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-6">

            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

              <div>

                <p className="text-xs font-bold uppercase tracking-[0.12em] text-amber-700">
                  Stress test
                </p>

                <h4 className="mt-2 text-lg font-bold text-slate-950">
                  What if your income falls by{' '}
                  {stressTest.incomeReductionPercent}%?
                </h4>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                  We test the recommended EMI against a lower-income
                  scenario to see whether repayment becomes harder
                  to manage.
                </p>

              </div>

              <div
                className={
                  stressTest.remainsAffordable
                    ? 'rounded-xl bg-emerald-100 px-4 py-3 text-sm font-semibold text-emerald-800'
                    : 'rounded-xl bg-amber-100 px-4 py-3 text-sm font-semibold text-amber-800'
                }
              >
              <div
                  className={
                    stressTest.remainsAffordable === true
                      ? 'rounded-xl bg-emerald-100 px-4 py-3 text-sm font-semibold text-emerald-800'
                      : stressTest.remainsAffordable === false
                        ? 'rounded-xl bg-amber-100 px-4 py-3 text-sm font-semibold text-amber-800'
                        : 'rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700'
                  }
                >
                  {stressTest.remainsAffordable === true
                    ? 'Still affordable'
                    : stressTest.remainsAffordable === false
                      ? 'Affordability becomes tighter'
                      : 'Stress test unavailable'}
                </div>
              </div>

            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">

              <div className="rounded-xl bg-white/70 p-4">

                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Stressed income
                </p>

                <p className="mt-2 text-xl font-bold text-slate-950">
                  {formatCurrency(
                    stressTest.stressedIncome,
                  )}
                </p>

              </div>

              <div className="rounded-xl bg-white/70 p-4">

                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Stressed safe EMI
                </p>

                <p className="mt-2 text-xl font-bold text-slate-950">
                  {formatCurrency(
                    stressTest.stressedSafeEMI,
                  )}
                </p>

              </div>

              <div className="rounded-xl bg-white/70 p-4">

                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Recommended EMI
                </p>

                <p className="mt-2 text-xl font-bold text-slate-950">
                  {formatCurrency(
                    stressTest.currentEMI,
                  )}
                </p>

              </div>

            </div>

            <div className="mt-5 border-t border-amber-200 pt-4">

              <p className="text-sm leading-6 text-slate-700">
                {stressTest.remainsAffordable === true
                  ? 'Even after the income reduction, the recommended EMI remains within the estimated safe EMI capacity.'
                  : stressTest.remainsAffordable === false
                    ? 'Under this stress scenario, the recommended EMI exceeds the estimated safe EMI capacity. Consider borrowing less or choosing a longer tenure to reduce monthly outflow.'
                    : 'We cannot complete the stress comparison because the information needed to calculate a safe EMI is unavailable.'}
              </p>

            </div>

          </div>

        </section>

        {/* =====================================================
            04 — NEGOTIATION CARD
        ====================================================== */}
        <section className="mb-10">

          <div className="mb-5">

            <div className="flex items-center gap-3">

              <span className="text-xs font-bold tracking-[0.2em] text-slate-400">
                04
              </span>

              <h3 className="text-xl font-bold text-slate-950">
                Your Negotiation Card
              </h3>

            </div>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              A compact summary you can use when comparing or
              negotiating a loan offer with a lender.
            </p>

          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

            {/* Card header */}
            <div className="border-b border-slate-200 pb-5">

              <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                BorrowWise
              </p>

              <h4 className="mt-2 text-2xl font-bold text-slate-950">
                {decision.decision === 'NEED_MORE_INFO'
                  ? 'Information I need before negotiating'
                  : 'Loan terms I should target'}
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {decision.decision === 'NEED_MORE_INFO'
                  ? 'We need to confirm your existing loan obligations before giving you a safe borrowing target.'
                  : 'These are affordability-based targets, not a lender approval or guaranteed rate.'}
              </p>

            </div>

            {/* Key targets */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              <div className="rounded-2xl bg-slate-50 p-4">

                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Target loan amount
                </p>

                <p className="mt-2 text-xl font-bold text-slate-950">
                  {formatCurrency(
                    recommendedAmount.recommendedAmount,
                  )}
                </p>

              </div>

              <div className="rounded-2xl bg-slate-50 p-4">

                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Target rate
                </p>

                <p className="mt-2 text-xl font-bold text-slate-950">
                  {fairRate.lowRate}% – {fairRate.highRate}%
                </p>

              </div>

              <div className="rounded-2xl bg-slate-50 p-4">

                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  EMI ceiling
                </p>

                <p className="mt-2 text-xl font-bold text-slate-950">
                  {formatCurrency(
                    emiRecommendation.safeEMICeiling,
                  )}
                </p>

              </div>

              <div className="rounded-2xl bg-slate-50 p-4">

                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Target tenure
                </p>

                <p className="mt-2 text-xl font-bold text-slate-950">
                  {formatTenure(
                    emiRecommendation.recommendedTenureMonths,
                  )}
                </p>

              </div>

            </div>

            {/* Cost */}
            <div className="mt-6 rounded-2xl border border-slate-200 p-5">

              <h5 className="text-sm font-bold text-slate-950">
                Ask for the full cost, not just the interest rate
              </h5>

              <div className="mt-4 grid gap-4 sm:grid-cols-3">

                <div>

                  <p className="text-xs font-semibold text-slate-500">
                    Estimated APR
                  </p>

                  <p className="mt-1 text-lg font-bold text-slate-950">
                    {formatPercent(
                      apr.effectiveAPR,
                    )}
                  </p>

                </div>

                <div>

                  <p className="text-xs font-semibold text-slate-500">
                    Processing fee
                  </p>

                  <p className="mt-1 text-lg font-bold text-slate-950">
                    {formatCurrency(
                      apr.processingFee,
                    )}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Assumed {apr.processingFeePercent}%
                  </p>

                </div>

                <div>

                  <p className="text-xs font-semibold text-slate-500">
                    Total interest
                  </p>

                  <p className="mt-1 text-lg font-bold text-slate-950">
                    {formatCurrency(
                      apr.totalInterest,
                    )}
                  </p>

                </div>

              </div>

            </div>

            {/* Questions */}
            <div className="mt-6">

              <h5 className="text-sm font-bold text-slate-950">
                Questions to ask the lender
              </h5>

              <div className="mt-4 space-y-3">

                <div className="flex gap-3">
                  <span className="font-bold text-slate-400">
                    1.
                  </span>

                  <p className="text-sm leading-6 text-slate-700">
                    What is the final interest rate, and is it
                    fixed or floating?
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="font-bold text-slate-400">
                    2.
                  </span>

                  <p className="text-sm leading-6 text-slate-700">
                    What is the APR or total borrowing cost after
                    all processing fees and mandatory charges?
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="font-bold text-slate-400">
                    3.
                  </span>

                  <p className="text-sm leading-6 text-slate-700">
                    What will my exact EMI and total repayment be
                    for this tenure?
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="font-bold text-slate-400">
                    4.
                  </span>

                  <p className="text-sm leading-6 text-slate-700">
                    Are there any additional insurance,
                    documentation, foreclosure or other mandatory
                    charges?
                  </p>
                </div>

              </div>

            </div>

            {/* Negotiation script */}
            <div className="mt-6 rounded-2xl bg-slate-900 p-5 text-white">

              <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                What I would say
              </p>

              <p className="mt-3 text-sm leading-7">

                {recommendedAmount.recommendedAmount !==
                  undefined &&
                emiRecommendation.recommendedEMI !==
                  undefined ? (
                  <>
                    “I am looking for a loan of{' '}
                    {formatCurrency(
                      recommendedAmount.recommendedAmount,
                    )}
                    . I want the EMI to stay around{' '}
                    {formatCurrency(
                      emiRecommendation.recommendedEMI,
                    )}
                    , and I am comparing the total borrowing cost
                    rather than only the advertised interest rate.
                    Please share your best rate, APR, processing fee
                    and total repayment for this tenure.”
                  </>
                ) : (
                  <>
                    “Before discussing a new loan, I want to
                    understand my existing loan obligations and
                    the total cost of the proposed loan. Please
                    help me confirm my current outstanding EMIs,
                    the interest rate, all fees and the exact
                    repayment amount.”
                  </>
                )}

              </p>

            </div>

            {/* Disclaimer */}
            <div className="mt-5 border-t border-slate-200 pt-5">

              <p className="text-xs leading-5 text-slate-500">

                <strong className="text-slate-700">
                  Important:
                </strong>{' '}

                The lender's eligible amount may be higher or lower
                than the safe amount shown here. The safe amount is
                the amount this assessment estimates you can
                reasonably carry based on the information provided.

              </p>

            </div>

          </div>

        </section>

        {/* =====================================================
            FINAL DISCLAIMER
        ====================================================== */}
        <div className="border-t border-slate-200 pt-6">

          <p className="text-xs leading-5 text-slate-500">
            BorrowWise provides an educational affordability
            assessment based only on the information you provide.
            It is not a loan approval, credit decision or financial
            guarantee. Actual lender eligibility, rates, fees and
            terms may differ.
          </p>

        </div>

      </main>

    </div>
  )
}