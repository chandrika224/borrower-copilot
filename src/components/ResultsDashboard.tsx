import type { LoanAssessment } from '../types/assessment'

interface ResultsDashboardProps {
  assessment: LoanAssessment
}

export function ResultsDashboard({
  assessment,
}: ResultsDashboardProps) {
  const {
    decision,
    fairRate,
    recommendedAmount,
    emiRecommendation,
    apr,
    stressTest,
  } = assessment

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Borrower Copilot
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Your borrowing assessment
              </p>
            </div>

            <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
              Assessment complete
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-6xl px-6 py-8">
        {/* Page introduction */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">
            Your loan assessment
          </h2>

          <p className="mt-2 max-w-2xl text-slate-600">
            Here is what your current income, expenses,
            existing commitments and loan request suggest.
          </p>
        </div>

        {/* Decision */}
        <section className="mb-8">
          <div
            className={`rounded-2xl border p-6 shadow-sm ${
              decision.decision === 'BORROW'
                ? 'border-emerald-200 bg-emerald-50'
                : decision.decision === 'BORROW_LESS'
                  ? 'border-amber-200 bg-amber-50'
                  : 'border-red-200 bg-red-50'
            }`}
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Should you borrow?
                </p>

                <h3 className="mt-2 text-3xl font-bold text-slate-900">
                  {decision.decision === 'BORROW'
                    ? 'You can borrow'
                    : decision.decision === 'BORROW_LESS'
                      ? 'Consider borrowing less'
                      : "Don't borrow right now"}
                </h3>

                <p className="mt-3 max-w-2xl text-slate-700">
                  {decision.reason}
                </p>
              </div>

              {/* Decision badge */}
              <div
                className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-full ${
                  decision.decision === 'BORROW'
                    ? 'bg-emerald-100'
                    : decision.decision === 'BORROW_LESS'
                      ? 'bg-amber-100'
                      : 'bg-red-100'
                }`}
              >
                <span
                  className={`text-xs font-bold ${
                    decision.decision === 'BORROW'
                      ? 'text-emerald-700'
                      : decision.decision === 'BORROW_LESS'
                        ? 'text-amber-700'
                        : 'text-red-700'
                  }`}
                >
                  {decision.decision === 'BORROW'
                    ? 'OK'
                    : decision.decision === 'BORROW_LESS'
                      ? 'CAUTION'
                      : 'STOP'}
                </span>
              </div>
            </div>

            {/* Recommended amount */}
            <div className="mt-6 border-t border-slate-200/70 pt-5">
              <p className="text-sm font-medium text-slate-600">
                Recommended borrowing amount
              </p>

              <div className="mt-2 flex flex-wrap items-baseline gap-2">
                <span className="text-3xl font-bold text-slate-900">
                  ₹{recommendedAmount.recommendedAmount.toLocaleString('en-IN')}
                </span>

                <span className="text-sm text-slate-500">
                  based on your current profile
                </span>
              </div>
            </div>
          </div>
        </section>


        {/* Amount section */}
        <section className="mb-8">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-slate-900">
              How much should you borrow?
            </h3>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
              A lender may approve more than you can comfortably
              afford. We show both so you can make a safer decision.
            </p>
          </div>

          {/* Amount comparison */}
          <div className="grid gap-4 md:grid-cols-3">

            {/* Requested */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                You requested
              </p>

              <p className="mt-3 text-2xl font-bold text-slate-900">
                ₹{recommendedAmount.requestedAmount.toLocaleString('en-IN')}
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

              <p className="mt-3 text-2xl font-bold text-slate-900">
                ₹{recommendedAmount.lenderEstimatedAmount.toLocaleString('en-IN')}
              </p>

              <p className="mt-2 text-sm leading-5 text-slate-500">
                A simple estimate of what a lender might consider
                based on an affordability rule.
              </p>
            </div>

            {/* Safe amount */}
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm">
              <p className="text-sm font-semibold text-emerald-700">
                Safe amount
              </p>

              <p className="mt-3 text-2xl font-bold text-slate-900">
                ₹{recommendedAmount.safeAmount.toLocaleString('en-IN')}
              </p>

              <p className="mt-2 text-sm leading-5 text-slate-600">
                Based on the EMI your current income and expenses
                appear able to support.
              </p>
            </div>
          </div>

          {/* Recommendation */}
          <div className="mt-4 rounded-2xl border-2 border-emerald-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                  Our recommendation
                </p>

                <p className="mt-2 text-4xl font-bold text-slate-900">
                  ₹{recommendedAmount.recommendedAmount.toLocaleString('en-IN')}
                </p>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
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

          {/* Important distinction */}
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-800">
              Why are these numbers different?
            </p>

            <div className="mt-3 grid gap-3 text-sm text-slate-600 md:grid-cols-2">
              <div>
                <span className="font-semibold text-slate-800">
                  Lender estimate:
                </span>{' '}
                what a lender might consider approving under the
                simplified rule used by this assessment.
              </div>

              <div>
                <span className="font-semibold text-slate-800">
                  Safe amount:
                </span>{' '}
                what appears more manageable given your income,
                household expenses and existing EMIs.
              </div>
            </div>
          </div>
        </section>

          {/* Recommended amount */}
          <div className="mt-4 rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">
              Recommended amount
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              ₹{recommendedAmount.recommendedAmount.toLocaleString('en-IN')}
            </p>

            <p className="mt-2 text-slate-600">
              {recommendedAmount.reason}
            </p>
          </div>
        

        {/* Rate section */}
<section className="mb-8">
  <div className="mb-4">
    <h3 className="text-xl font-bold text-slate-900">
      What is a fair interest rate?
    </h3>

    <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
      This is our estimate of a reasonable rate range for
      your profile. It is not a guaranteed lender quote.
    </p>
  </div>

  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

    {/* Rate + confidence */}
    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Fair rate range
        </p>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-4xl font-bold text-slate-900">
            {fairRate.lowRate}%
          </span>

          <span className="text-xl text-slate-400">
            –
          </span>

          <span className="text-4xl font-bold text-slate-900">
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

        <p className="mt-1 text-lg font-bold text-slate-900">
          {fairRate.confidence}
        </p>

        <p className="mt-1 max-w-xs text-xs leading-5 text-slate-500">
          Confidence reflects how much useful borrower
          information was available for this estimate.
        </p>
      </div>
    </div>

    {/* Rate range visual */}
    <div className="mt-8">
      <div className="flex items-center justify-between text-xs font-medium text-slate-500">
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

    {/* Why this rate? */}
    <div className="mt-8 border-t border-slate-100 pt-6">
      <h4 className="text-base font-bold text-slate-900">
        Why this rate?
      </h4>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        {fairRate.reason}
      </p>

      <div className="mt-4 rounded-xl bg-slate-50 p-4">
        <p className="text-sm font-semibold text-slate-800">
          What affects your rate?
        </p>

        <ul className="mt-3 space-y-2 text-sm leading-5 text-slate-600">
          <li>
            <span className="font-semibold text-slate-800">
              Credit profile:
            </span>{' '}
            A stronger credit history generally supports
            better pricing.
          </li>

          <li>
            <span className="font-semibold text-slate-800">
              Income type and stability:
            </span>{' '}
            More predictable income generally reduces
            repayment uncertainty.
          </li>

          <li>
            <span className="font-semibold text-slate-800">
              Payment history:
            </span>{' '}
            Recent missed or bounced payments can increase
            perceived repayment risk.
          </li>
        </ul>
      </div>
    </div>

    {/* APR */}
    <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Estimated all-in APR
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {apr.effectiveAPR}%
          </p>

          <p className="mt-2 max-w-xl text-sm leading-5 text-slate-500">
            APR accounts for the assumed processing fee as
            well as interest, giving you a better view of
            the overall borrowing cost.
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Processing fee assumption
          </p>

          <p className="mt-1 text-lg font-bold text-slate-900">
            1.01%
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
        {/* EMI section */}
<section className="mb-8">
  <div className="mb-4">
    <h3 className="text-xl font-bold text-slate-900">
      What EMI should you agree to?
    </h3>

    <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
      We compare different repayment periods and recommend
      an EMI that stays within your estimated safe monthly
      repayment capacity.
    </p>
  </div>

  {/* EMI summary */}
  <div className="grid gap-4 md:grid-cols-3">

    {/* Recommended EMI */}
    <div className="rounded-2xl border-2 border-slate-900 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold text-slate-500">
        Recommended EMI
      </p>

      <p className="mt-3 text-3xl font-bold text-slate-900">
        ₹{emiRecommendation.recommendedEMI.toLocaleString('en-IN')}
      </p>

      <p className="mt-2 text-sm text-slate-500">
        Monthly repayment
      </p>
    </div>

    {/* Safe EMI ceiling */}
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
      <p className="text-sm font-semibold text-emerald-700">
        Safe EMI ceiling
      </p>

      <p className="mt-3 text-3xl font-bold text-slate-900">
        ₹{emiRecommendation.safeEMICeiling.toLocaleString('en-IN')}
      </p>

      <p className="mt-2 text-sm leading-5 text-slate-600">
        Estimated maximum new EMI based on your current
        income, expenses and existing EMIs.
      </p>
    </div>

    {/* Recommended tenure */}
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold text-slate-500">
        Recommended tenure
      </p>

      <p className="mt-3 text-3xl font-bold text-slate-900">
        {emiRecommendation.recommendedTenureMonths}
      </p>

      <p className="mt-2 text-sm text-slate-500">
        months
      </p>
    </div>
  </div>

  {/* Tenure trade-off */}
  <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

    <h4 className="text-base font-bold text-slate-900">
      Tenure trade-off
    </h4>

    <p className="mt-2 text-sm leading-6 text-slate-500">
      A shorter tenure usually means a higher monthly EMI
      but less total interest. A longer tenure reduces the
      monthly EMI but usually increases the total interest.
    </p>

    <div className="mt-6 grid gap-3 sm:grid-cols-3">
      {emiRecommendation.tenureOptions.map(
        (option) => {
          const isRecommended =
            option.months ===
            emiRecommendation.recommendedTenureMonths

          const isAffordable =
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

              <p className="mt-4 text-2xl font-bold text-slate-900">
                ₹{option.emi.toLocaleString('en-IN')}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Monthly EMI
              </p>

              <div className="mt-4 border-t border-slate-100 pt-4">
                <p className="text-xs font-semibold text-slate-500">
                  Total interest
                </p>

                <p className="mt-1 text-sm font-bold text-slate-800">
                  ₹{option.totalInterest.toLocaleString('en-IN')}
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
        }
      )}
    </div>

    {/* Recommendation explanation */}
    <div className="mt-5 rounded-xl bg-slate-50 p-4">
      <p className="text-sm font-semibold text-slate-800">
        How should you choose?
      </p>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        Prefer the shortest tenure whose EMI stays within
        your estimated safe EMI ceiling. This can help limit
        the total interest cost while keeping the monthly
        repayment manageable.
      </p>
    </div>
  </div>

  {/* Stress test */}
  <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-6">

    <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
          Stress test
        </p>

        <h4 className="mt-2 text-lg font-bold text-slate-900">
          What if your income falls by{' '}
          {stressTest.incomeReductionPercent}%?
        </h4>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          We test the recommended EMI against a lower-income
          scenario to see whether repayment becomes harder to
          manage.
        </p>
      </div>

      <div
        className={
          stressTest.remainsAffordable
            ? 'rounded-xl bg-emerald-100 px-4 py-3 text-sm font-semibold text-emerald-800'
            : 'rounded-xl bg-amber-100 px-4 py-3 text-sm font-semibold text-amber-800'
        }
      >
        {stressTest.remainsAffordable
          ? 'Still affordable'
          : 'Affordability becomes tighter'}
      </div>
    </div>

    <div className="mt-6 grid gap-4 sm:grid-cols-3">

      <div className="rounded-xl bg-white/70 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Stressed income
        </p>

        <p className="mt-2 text-xl font-bold text-slate-900">
         ₹{stressTest.stressedIncome.toLocaleString('en-IN')}
        </p>
      </div>

      <div className="rounded-xl bg-white/70 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Stressed safe EMI
        </p>

        <p className="mt-2 text-xl font-bold text-slate-900">
          ₹{stressTest.stressedSafeEMI.toLocaleString('en-IN')}
        </p>
      </div>

      <div className="rounded-xl bg-white/70 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Recommended EMI
        </p>

        <p className="mt-2 text-xl font-bold text-slate-900">
          ₹{stressTest.currentEMI.toLocaleString('en-IN')}
        </p>
      </div>

    </div>

    <div className="mt-5 border-t border-amber-200 pt-4">
      <p className="text-sm leading-6 text-slate-700">
        {stressTest.remainsAffordable
          ? 'Even after the income reduction, the recommended EMI remains within the estimated safe EMI capacity.'
          : 'Under this stress scenario, the recommended EMI exceeds the estimated safe EMI capacity. Consider borrowing less or choosing a longer tenure to reduce monthly outflow.'}
      </p>
    </div>
  </div>
</section>

        {/* Stress test */}
        <section className="mb-8">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-slate-900">
              What if your income falls?
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              We test the recommendation against a 20% income
              reduction.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-sm text-slate-500">
                  Income reduction
                </p>

                <p className="mt-2 text-xl font-bold text-slate-900">
                  {stressTest.incomeReductionPercent}%
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Stressed safe EMI
                </p>

                <p className="mt-2 text-xl font-bold text-slate-900">
                  ₹{stressTest.stressedSafeEMI.toLocaleString('en-IN')}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Current recommended EMI
                </p>

                <p className="mt-2 text-xl font-bold text-slate-900">
                  ₹{stressTest.currentEMI.toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-700">
                Stress-test result
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                {stressTest.remainsAffordable
                  ? 'Your recommended EMI remains affordable under this stress scenario.'
                  : 'Your recommended EMI may become difficult to afford if your income falls by 20%.'}
              </p>
            </div>
          </div>
        </section>

        {/* Negotiation Card */}
<section className="mb-8">
  <div className="mb-4">
    <h3 className="text-xl font-bold text-slate-900">
      Your Negotiation Card
    </h3>

    <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
      A simple summary you can use when comparing or negotiating
      a loan offer with a lender.
    </p>
  </div>

  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

    {/* Header */}
    <div className="border-b border-slate-200 pb-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        Borrower Copilot
      </p>

      <h4 className="mt-2 text-2xl font-bold text-slate-900">
        Loan terms I should target
      </h4>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        These are affordability-based targets, not a lender approval
        or guaranteed rate.
      </p>
    </div>

    {/* Key targets */}
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

      {/* Amount */}
      <div className="rounded-2xl bg-slate-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Target loan amount
        </p>

        <p className="mt-2 text-xl font-bold text-slate-900">
          ₹{recommendedAmount.recommendedAmount.toLocaleString('en-IN')}
        </p>

        <p className="mt-1 text-xs text-slate-500">
          Based on estimated safe affordability
        </p>
      </div>

      {/* Rate */}
      <div className="rounded-2xl bg-slate-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Target rate
        </p>

        <p className="mt-2 text-xl font-bold text-slate-900">
          {fairRate.lowRate}% – {fairRate.highRate}%
        </p>

        <p className="mt-1 text-xs text-slate-500">
          Estimated fair annual rate
        </p>
      </div>

      {/* EMI */}
      <div className="rounded-2xl bg-slate-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          EMI ceiling
        </p>

        <p className="mt-2 text-xl font-bold text-slate-900">
          ₹{emiRecommendation.safeEMICeiling.toLocaleString('en-IN')}
        </p>

        <p className="mt-1 text-xs text-slate-500">
          Maximum estimated safe new EMI
        </p>
      </div>

      {/* Tenure */}
      <div className="rounded-2xl bg-slate-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Target tenure
        </p>

        <p className="mt-2 text-xl font-bold text-slate-900">
          {emiRecommendation.recommendedTenureMonths} months
        </p>

        <p className="mt-1 text-xs text-slate-500">
          Based on EMI affordability
        </p>
      </div>

    </div>

    {/* Cost summary */}
    <div className="mt-6 rounded-2xl border border-slate-200 p-5">

      <h5 className="text-sm font-bold text-slate-900">
        Ask for the full cost, not just the interest rate
      </h5>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">

        <div>
          <p className="text-xs font-semibold text-slate-500">
            Estimated APR
          </p>

          <p className="mt-1 text-lg font-bold text-slate-900">
            {apr.effectiveAPR.toFixed(2)}%
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold text-slate-500">
            Processing fee
          </p>

          <p className="mt-1 text-lg font-bold text-slate-900">
            ₹{apr.processingFee.toLocaleString('en-IN')}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Assumed {apr.processingFeePercent}%
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold text-slate-500">
            Total interest
          </p>

          <p className="mt-1 text-lg font-bold text-slate-900">
            ₹{apr.totalInterest.toLocaleString('en-IN')}
          </p>
        </div>

      </div>
    </div>

    {/* Questions to ask lender */}
    <div className="mt-6">

      <h5 className="text-sm font-bold text-slate-900">
        Questions to ask the lender
      </h5>

      <div className="mt-3 space-y-3">

        <div className="flex gap-3">
          <span className="font-bold text-slate-400">1.</span>

          <p className="text-sm leading-6 text-slate-700">
            What is the final interest rate and is it fixed or
            floating?
          </p>
        </div>

        <div className="flex gap-3">
          <span className="font-bold text-slate-400">2.</span>

          <p className="text-sm leading-6 text-slate-700">
            What is the APR or total borrowing cost after all
            processing fees and mandatory charges?
          </p>
        </div>

        <div className="flex gap-3">
          <span className="font-bold text-slate-400">3.</span>

          <p className="text-sm leading-6 text-slate-700">
            What will my exact EMI and total repayment be for
            this tenure?
          </p>
        </div>

        <div className="flex gap-3">
          <span className="font-bold text-slate-400">4.</span>

          <p className="text-sm leading-6 text-slate-700">
            Are there any additional insurance, documentation,
            foreclosure or other mandatory charges?
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
        “I am looking for a loan of ₹
        {recommendedAmount.recommendedAmount.toLocaleString('en-IN')}
        . I want the EMI to stay around ₹
        {emiRecommendation.recommendedEMI.toLocaleString('en-IN')}
        , and I am comparing the total borrowing cost rather
        than only the advertised interest rate. Please share your
        best rate, APR, processing fee and total repayment for
        this tenure.”
      </p>

    </div>

    {/* Important distinction */}
    <div className="mt-5 border-t border-slate-200 pt-5">
      <p className="text-xs leading-5 text-slate-500">
        <strong className="text-slate-700">
          Important:
        </strong>{' '}
        The lender's eligible amount may be higher or lower than
        the safe amount shown here. The safe amount is the amount
        this assessment estimates you can reasonably carry based
        on the information provided.
      </p>
    </div>

  </div>
</section>
      </main>
    </div>
  )
}
