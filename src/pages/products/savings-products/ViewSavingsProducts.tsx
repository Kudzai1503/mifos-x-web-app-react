/**
 * Copyright since 2025 Mifos Initiative
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PiggyBank, ArrowLeft } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import fineract from '@/lib/axios'
import { AppBreadCrumbs } from '@/components/custom/breadcrumbs/AppBreadCrumbs'

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
    <dl className="px-6 py-2 grid grid-cols-[1fr_1fr] gap-x-8 [&>dt]:border-b [&>dt]:border-zinc-50 dark:[&>dt]:border-zinc-800/50 [&>dd]:border-b [&>dd]:border-zinc-50 dark:[&>dd]:border-zinc-800/50">
      {children}
    </dl>
  </div>
)

const ViewSavingsProducts = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [product, setProduct] = useState<any>()

  useEffect(() => {
    const fetchSaving = async () => {
      try {
        const { data } = await fineract.get(`/v1/savingsproducts/${id}`)
        setProduct(data)
      } catch (err) {
        console.error('Failed to fetch savings product', err)
      }
    }
    fetchSaving()
  }, [id])

  if (!product)
    return (
      <div className="flex items-center justify-center min-h-[40vh] text-zinc-400">
        Loading…
      </div>
    )

  return (
    <div className="min-h-screen px-6 py-8 max-w-5xl mx-auto">
      <AppBreadCrumbs
        items={[
          { label: 'Home', href: '/home' },
          { label: 'Products', href: '/products' },
          { label: 'Savings Products', href: '/products/savings-products' },
          { label: product.name ?? 'Savings', current: true },
        ]}
      />

      {/* Hero header */}
      <div className="mt-6 rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden shadow-sm">
        <div className="bg-primary px-6 py-5 flex items-center gap-4">
          <div className="size-12 rounded-full bg-white/20 ring-2 ring-white/30 flex items-center justify-center shrink-0">
            <PiggyBank className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">{product.name}</h1>
            <p className="mt-0.5 text-sm text-white/70">
              Short name:{' '}
              <span className="font-medium text-white/90">
                {product.shortName ?? '—'}
              </span>
            </p>
          </div>
          <div className="ml-auto">
            <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/20">
              {product.accountingRule?.value ?? 'Savings Product'}
            </Badge>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 divide-y divide-zinc-100 dark:divide-zinc-800">
          <Section title="Details">
            <Row label="Name" value={product.name} />
            <Row label="Short Name" value={product.shortName} />
            <Row label="Description" value={product.description} />
          </Section>

          <Separator className="h-px bg-zinc-100 dark:bg-zinc-800" />

          <Section title="Currency">
            <Row label="Currency" value={product.currency?.name} />
            <Row
              label="Decimal Places"
              value={product.currency?.decimalPlaces}
            />
            <Row
              label="Currency in multiples of"
              value={product.currency?.inMultiplesOf ?? '—'}
            />
          </Section>

          <Separator className="h-px bg-zinc-100 dark:bg-zinc-800" />

          <Section title="Terms">
            <Row
              label="Nominal Annual Interest"
              value={
                product.nominalAnnualInterestRate != null
                  ? `${product.nominalAnnualInterestRate}%`
                  : undefined
              }
            />
            <Row
              label="Interest Compounding Period"
              value={product.interestCompoundingPeriodType?.value}
            />
            <Row
              label="Interest Posting Period"
              value={product.interestPostingPeriodType?.value}
            />
            <Row
              label="Interest Calculated using"
              value={product.interestCalculationType?.value}
            />
            <Row
              label="Days in Year"
              value={product.interestCalculationDaysInYearType?.value}
            />
          </Section>

          <Separator className="h-px bg-zinc-100 dark:bg-zinc-800" />

          <Section title="Settings">
            <Row
              label="Apply Withdrawal Fee for Transfers"
              value={bool(product.withdrawalFeeForTransfers)}
            />
            <Row
              label="Enforce Minimum Balance"
              value={bool(product.enforceMinRequiredBalance)}
            />
            <Row
              label="Withhold Tax is Applicable"
              value={bool(product.withHoldTax)}
            />
            <Row
              label="Is Overdraft Allowed"
              value={bool(product.allowOverdraft)}
            />
            <Row
              label="Enable Dormancy Tracking"
              value={bool(product.isDormancyTrackingActive)}
            />
          </Section>

          <Separator className="h-px bg-zinc-100 dark:bg-zinc-800" />

          <Section title="Accounting">
            <Row label="Type" value={product.accountingRule?.value} />
          </Section>
        </div>
      </div>

      <div className="mt-6">
        <Button
          variant="outline"
          onClick={() => navigate('/products/savings-products')}
          className="cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4 mr-1.5" />
          Back to Savings Products
        </Button>
      </div>
    </div>
  )
}

export default ViewSavingsProducts
