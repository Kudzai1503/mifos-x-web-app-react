/**
 * Copyright since 2025 Mifos Initiative
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Banknote, ArrowLeft } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { AppBreadCrumbs } from '@/components/custom/breadcrumbs/AppBreadCrumbs'
import fineract from '@/lib/axios'

const bool = (v: unknown) => (
  <Badge
    variant="outline"
    className={
      v
        ? 'border-green-300 text-green-700 dark:text-green-400'
        : 'border-zinc-200 text-zinc-500'
    }
  >
    {v ? 'Yes' : 'No'}
  </Badge>
)

const Row = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <>
    <dt className="py-2.5 text-sm font-medium text-zinc-500 dark:text-zinc-400">
      {label}
    </dt>
    <dd className="py-2.5 text-sm text-zinc-800 dark:text-zinc-200">
      {value ?? '—'}
    </dd>
  </>
)

const Section = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => (
  <div>
    <div className="px-6 py-3 border-b border-zinc-100 dark:border-zinc-700/60">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-primary">
        {title}
      </h2>
    </div>
    <dl className="px-6 py-2 grid grid-cols-[1fr_1fr] gap-x-8 [&>dt]:border-b [&>dt]:border-zinc-50 dark:[&>dt]:border-zinc-800/50 [&>dd]:border-b [&>dd]:border-zinc-50 dark:[&>dd]:border-zinc-800/50 last:[&>dt]:border-0 last:[&>dd]:border-0">
      {children}
    </dl>
  </div>
)

const ViewLoanProducts = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [loanProduct, setLoanProduct] = useState<any | null>(null)

  useEffect(() => {
    const fetchLoanProduct = async () => {
      try {
        const { data } = await fineract.get(`/v1/loanproducts/${id}`)
        setLoanProduct(data)
      } catch (err) {
        console.error('Failed to fetch loan product', err)
      }
    }
    fetchLoanProduct()
  }, [id])

  if (!loanProduct)
    return (
      <div className="flex items-center justify-center min-h-[40vh] text-zinc-400">
        Loading…
      </div>
    )

  const codeLabel = (code?: string) =>
    code
      ? (code
          .split('.')
          .pop()
          ?.replace(/^./, (c: string) => c.toUpperCase()) ?? '—')
      : '—'

  const codePair = (code?: string) =>
    code
      ? code
          .split('.')
          .slice(-2)
          .map((w: string) => w.replace(/^./, (c: string) => c.toUpperCase()))
          .join(' ')
      : '—'

  return (
    <div className="min-h-screen px-6 py-8 max-w-5xl mx-auto">
      <AppBreadCrumbs
        items={[
          { label: 'Home', href: '/home' },
          { label: 'Products', href: '/products' },
          { label: 'Loan Products', href: '/products/loan-products' },
          { label: loanProduct.name ?? 'Loan', current: true },
        ]}
      />

      {/* Hero header */}
      <div className="mt-6 rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden shadow-sm">
        <div className="bg-primary px-6 py-5 flex items-center gap-4">
          <div className="size-12 rounded-full bg-white/20 ring-2 ring-white/30 flex items-center justify-center shrink-0">
            <Banknote className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">
              {loanProduct.name}
            </h1>
            <p className="mt-0.5 text-sm text-white/70">
              Short name:{' '}
              <span className="font-medium text-white/90">
                {loanProduct.shortName ?? '—'}
              </span>
            </p>
          </div>
          <div className="ml-auto">
            <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/20">
              {loanProduct.accountingRule?.value ?? 'Loan Product'}
            </Badge>
          </div>
        </div>

        {/* Sections */}
        <div className="bg-white dark:bg-zinc-900 divide-y divide-zinc-100 dark:divide-zinc-800">
          <Section title="Details">
            <Row label="Name" value={loanProduct.name} />
            <Row label="Short Name" value={loanProduct.shortName} />
            <Row label="External ID" value={loanProduct.externalId} />
            <Row
              label="Include in Customer Loan Counter"
              value={bool(loanProduct.includeInBorrowerCycle)}
            />
            <Row label="Start Date" value={loanProduct.startDate} />
            <Row label="Close Date" value={loanProduct.closeDate} />
            <Row label="Description" value={loanProduct.description} />
          </Section>

          <Separator className="h-px bg-zinc-100 dark:bg-zinc-800" />

          <Section title="Currency">
            <Row label="Currency Code" value={loanProduct.currency?.code} />
            <Row
              label="Currency"
              value={
                loanProduct.currency?.displaySymbol
                  ? `${loanProduct.currency.name} (${loanProduct.currency.displaySymbol})`
                  : loanProduct.currency?.name
              }
            />
            <Row
              label="Decimal Places"
              value={loanProduct.currency?.decimalPlaces}
            />
            <Row
              label="Currency in multiples of"
              value={loanProduct.currency?.inMultiplesOf ?? 0}
            />
            <Row
              label="Installment in multiples of"
              value={loanProduct.installmentAmountInMultiplesOf}
            />
          </Section>

          <Separator className="h-px bg-zinc-100 dark:bg-zinc-800" />

          <Section title="Terms">
            <Row
              label="Principal"
              value={`${loanProduct.principal} (Min: ${loanProduct.minPrincipal ?? loanProduct.principal} – Max: ${loanProduct.maxPrincipal ?? loanProduct.principal})`}
            />
            <Row
              label="Allow Approved / Disbursed Amounts Over Applied"
              value={bool(loanProduct.allowApprovedDisbursedAmountsOverApplied)}
            />
            <Row
              label="Installment day calculation from"
              value={loanProduct.repaymentStartDateType?.value}
            />
            <Row
              label="Number of Repayments"
              value={`${loanProduct.numberOfRepayments} (Min: ${loanProduct.minNumberOfRepayments ?? loanProduct.numberOfRepayments}, Max: ${loanProduct.maxNumberOfRepayments ?? loanProduct.numberOfRepayments})`}
            />
            <Row
              label="Linked to floating interest rates"
              value={bool(loanProduct.isLinkedToFloatingInterestRates)}
            />
            <Row
              label="Nominal interest rate"
              value={`${loanProduct.interestRatePerPeriod} (Min: ${loanProduct.minInterestRatePerPeriod ?? loanProduct.interestRatePerPeriod}, Max: ${loanProduct.maxInterestRatePerPeriod ?? loanProduct.interestRatePerPeriod}) ${loanProduct.interestRateFrequencyType?.description ?? ''}`}
            />
            <Row
              label="Terms vary based on loan cycle"
              value={bool(loanProduct.useBorrowerCycle)}
            />
            <Row
              label="Repay Every"
              value={`${loanProduct.repaymentEvery} ${codeLabel(loanProduct.repaymentFrequencyType?.code)}`}
            />
          </Section>

          <Separator className="h-px bg-zinc-100 dark:bg-zinc-800" />

          <Section title="Settings">
            <Row
              label="Amortization"
              value={codePair(loanProduct.amortizationType?.code)}
            />
            <Row
              label="Is Equal Amortization?"
              value={bool(loanProduct.isEqualAmortization)}
            />
            <Row
              label="Interest Method"
              value={codePair(loanProduct.interestType?.code)}
            />
            <Row
              label="Interest Calculation Period"
              value={loanProduct.interestCalculationPeriodType?.code
                ?.replace('interestCalculationPeriodType.', '')
                .split('.')
                .map((w: string) =>
                  w.replace(/^./, (c: string) => c.toUpperCase())
                )
                .join(' ')}
            />
            <Row
              label="Allow Partial Interest Calculation with same as repayment"
              value={bool(loanProduct.allowPartialPeriodInterestCalculation)}
            />
            <Row
              label="Is interest recognition on disbursement date?"
              value={bool(loanProduct.interestRecognitionOnDisbursementDate)}
            />
          </Section>

          <Separator className="h-px bg-zinc-100 dark:bg-zinc-800" />

          <Section title="Loan Schedule">
            <Row
              label="Loan Schedule Type"
              value={loanProduct.loanScheduleType?.value}
            />
            <Row
              label="Repayment Strategy"
              value={loanProduct.transactionProcessingStrategyName}
            />
          </Section>

          <Separator className="h-px bg-zinc-100 dark:bg-zinc-800" />

          <Section title="Down Payments">
            <Row
              label="Enable Down Payments"
              value={bool(loanProduct.enableDownPayment)}
            />
          </Section>

          <Separator className="h-px bg-zinc-100 dark:bg-zinc-800" />

          <Section title="Moratorium &amp; Delinquency">
            <Row
              label="Delinquency Bucket"
              value={loanProduct.delinquencyBucket?.name ?? 'Unassigned'}
            />
            <Row
              label="Enable installment level Delinquency"
              value={bool(loanProduct.enableInstallmentLevelDelinquency)}
            />
            <Row
              label="Days in year"
              value={codeLabel(loanProduct.daysInYearType?.code)}
            />
            <Row
              label="Days in month"
              value={codeLabel(loanProduct.daysInMonthType?.code)}
            />
            <Row
              label="Allow fixing of the installment amount"
              value={bool(loanProduct.canDefineInstallmentAmount)}
            />
            <Row
              label="Account moves out of NPA only after all arrears cleared"
              value={bool(
                loanProduct.accountMovesOutOfNPAOnlyOnArrearsCompletion
              )}
            />
            <Row
              label="Variable Installments allowed"
              value={bool(loanProduct.allowVariableInstallments)}
            />
            <Row
              label="Allowed to be used for providing Top Up Loans"
              value={bool(loanProduct.canUseForTopup)}
            />
          </Section>

          <Separator className="h-px bg-zinc-100 dark:bg-zinc-800" />

          <Section title="Interest Recalculation">
            <Row
              label="Recalculate Interest"
              value={bool(loanProduct.isInterestRecalculationEnabled)}
            />
          </Section>

          <Separator className="h-px bg-zinc-100 dark:bg-zinc-800" />

          <Section title="Loan Tranche Details">
            <Row
              label="Enable Multiple Disbursals"
              value={bool(loanProduct.multiDisburseLoan)}
            />
          </Section>

          <Separator className="h-px bg-zinc-100 dark:bg-zinc-800" />

          <Section title="Event Settings">
            <Row
              label="Due days for repayment event"
              value={loanProduct.dueDaysForRepaymentEvent}
            />
            <Row
              label="OverDue days for repayment event"
              value={loanProduct.overDueDaysForRepaymentEvent}
            />
          </Section>

          <Separator className="h-px bg-zinc-100 dark:bg-zinc-800" />

          <Section title="Accounting">
            <Row label="Type" value={loanProduct.accountingRule?.value} />
          </Section>
        </div>
      </div>

      <div className="mt-6">
        <Button
          variant="outline"
          onClick={() => navigate('/products/loan-products')}
          className="cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4 mr-1.5" />
          Back to Loan Products
        </Button>
      </div>
    </div>
  )
}

export default ViewLoanProducts
