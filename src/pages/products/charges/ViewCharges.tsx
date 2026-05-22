/**
 * Copyright since 2025 Mifos Initiative
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { CircleDollarSign, ArrowLeft, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { AppBreadCrumbs } from '@/components/custom/breadcrumbs/AppBreadCrumbs'
import fineract from '@/lib/axios'

const Row = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="grid grid-cols-2 gap-x-8 py-3 border-b border-zinc-50 dark:border-zinc-800/60 last:border-0">
    <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
      {label}
    </dt>
    <dd className="text-sm text-zinc-800 dark:text-zinc-200">{value ?? '—'}</dd>
  </div>
)

const codeLabel = (code?: string) =>
  code
    ? (code
        .split('.')
        .pop()
        ?.replace(/^\w/, (c: string) => c.toUpperCase()) ?? '—')
    : '—'

const ViewCharges = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [charge, setCharge] = useState<any>()

  useEffect(() => {
    const fetchCharge = async () => {
      try {
        const { data } = await fineract.get(`/v1/charges/${id}`)
        setCharge(data)
      } catch (err) {
        console.error('Failed to fetch charge', err)
      }
    }
    fetchCharge()
  }, [id])

  if (!charge)
    return (
      <div className="flex items-center justify-center min-h-[40vh] text-zinc-400">
        Loading…
      </div>
    )

  const handleDelete = async () => {
    try {
      await fineract.delete(`/v1/charges/${id}`)
      navigate('/products/charges')
    } catch (err) {
      console.error('Failed to delete charge', err)
    }
  }

  return (
    <div className="min-h-screen px-6 py-8 max-w-3xl mx-auto">
      <AppBreadCrumbs
        items={[
          { label: 'Home', href: '/home' },
          { label: 'Products', href: '/products' },
          { label: 'Charges', href: '/products/charges' },
          { label: charge.name ?? `${charge.id}`, current: true },
        ]}
      />

      <div className="mt-6 rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden shadow-sm">
        {/* Header */}
        <div className="bg-primary px-6 py-5 flex items-center gap-4">
          <div className="size-11 rounded-full bg-white/20 ring-2 ring-white/30 flex items-center justify-center shrink-0">
            <CircleDollarSign className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-semibold text-white truncate">
              {charge.name}
            </h1>
            <p className="mt-0.5 text-sm text-white/70">
              {codeLabel(charge.chargeAppliesTo?.code)} charge
            </p>
          </div>
          <Badge
            className={
              charge.active
                ? 'bg-green-400/20 text-green-100 border-green-400/40 hover:bg-green-400/20'
                : 'bg-zinc-400/20 text-zinc-200 border-zinc-400/40 hover:bg-zinc-400/20'
            }
            variant="outline"
          >
            <span
              className={`mr-1.5 inline-block size-1.5 rounded-full ${charge.active ? 'bg-green-300' : 'bg-zinc-400'}`}
            />
            {charge.active ? 'Active' : 'Inactive'}
          </Badge>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 flex gap-3 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90 text-white cursor-pointer"
            onClick={() => navigate(`/products/charges/${charge.id}/edit`)}
          >
            <Pencil className="h-3.5 w-3.5 mr-1.5" />
            Edit
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size="sm"
                variant="destructive"
                className="cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete charge</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete <strong>{charge.name}</strong>
                  ? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={handleDelete}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {/* Detail rows */}
        <dl className="px-6 py-2 bg-white dark:bg-zinc-900">
          <Row label="Charge Name" value={charge.name} />
          <Row
            label="Charge Applies To"
            value={codeLabel(charge.chargeAppliesTo?.code)}
          />
          <Row
            label="Penalty"
            value={
              charge.penalty ? (
                <Badge
                  variant="outline"
                  className="border-red-300 text-red-600"
                >
                  Yes
                </Badge>
              ) : (
                <Badge variant="outline" className="text-zinc-500">
                  No
                </Badge>
              )
            }
          />
          <Row label="Currency" value={charge.currency?.name} />
          <Row
            label="Amount"
            value={
              charge.amount != null
                ? `${charge.currency?.displaySymbol ?? ''} ${charge.amount}`.trim()
                : undefined
            }
          />
          <Row
            label="Charge Time Type"
            value={codeLabel(charge.chargeTimeType?.code)}
          />
          <Row
            label="Charge Calculation Type"
            value={codeLabel(charge.chargeCalculationType?.code)}
          />
          <Row
            label="Charge Payment Mode"
            value={codeLabel(charge.chargePaymentMode?.code)}
          />
          <Row
            label="Active"
            value={
              charge.active ? (
                <Badge
                  variant="outline"
                  className="border-green-300 text-green-700 dark:text-green-400"
                >
                  Active
                </Badge>
              ) : (
                <Badge variant="outline" className="text-zinc-500">
                  Inactive
                </Badge>
              )
            }
          />
        </dl>
      </div>

      <div className="mt-6">
        <Button
          variant="outline"
          onClick={() => navigate('/products/charges')}
          className="cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4 mr-1.5" />
          Back to Charges
        </Button>
      </div>
    </div>
  )
}

export default ViewCharges
