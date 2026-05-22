/**
 * Copyright since 2025 Mifos Initiative
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Banknote, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { AppBreadCrumbs } from '@/components/custom/breadcrumbs/AppBreadCrumbs'
import { PageHeader } from '@/components/custom/page/PageHeader'
import fineract from '@/lib/axios'

interface LoanProduct {
  id: number
  name?: string
  shortName?: string
  endDate?: number[]
  status?: string
}

const LoanProducts = () => {
  const [loanProducts, setLoanProducts] = useState<LoanProduct[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const navigate = useNavigate()

  useEffect(() => {
    fineract
      .get('/v1/loanproducts')
      .then(r => setLoanProducts(r.data || []))
      .catch(err => console.error('Failed to fetch loan products', err))
  }, [])

  const filtered = loanProducts.filter(
    acc =>
      acc.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.shortName?.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage))
  const paginated = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      <AppBreadCrumbs
        items={[
          { label: 'Home', href: '/home' },
          { label: 'Products', href: '/products' },
          { label: 'Loan Products', current: true },
        ]}
      />

      <div className="mt-6">
        <PageHeader
          icon={Banknote}
          title="Loan Products"
          subtitle={`${filtered.length} product${filtered.length !== 1 ? 's' : ''}`}
          actions={
            <Button
              className="cursor-pointer"
              onClick={() => navigate('/products/loan-products/create')}
            >
              <Plus className="h-4 w-4 mr-1.5" /> Create Loan Product
            </Button>
          }
        />

        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
            <Input
              placeholder="Search loan products…"
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value)
                setPage(1)
              }}
              className="pl-9 h-9"
            />
          </div>
          <div className="flex items-center gap-2">
            <Select
              value={itemsPerPage.toString()}
              onValueChange={v => {
                setItemsPerPage(parseInt(v))
                setPage(1)
              }}
            >
              <SelectTrigger className="w-32 h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[5, 10, 25, 50].map(n => (
                  <SelectItem key={n} value={n.toString()}>
                    {n} / page
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
            >
              Prev
            </Button>
            <span className="text-xs text-zinc-500 px-1">
              {page} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage(p => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-zinc-50 dark:bg-zinc-800/60 hover:bg-zinc-50 dark:hover:bg-zinc-800/60">
                <TableHead className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Name
                </TableHead>
                <TableHead className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Short Name
                </TableHead>
                <TableHead className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Expiry Date
                </TableHead>
                <TableHead className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="px-5 py-10 text-center text-sm text-zinc-400"
                  >
                    No loan products found.
                  </TableCell>
                </TableRow>
              ) : (
                paginated.map(loan => (
                  <TableRow
                    key={loan.id}
                    onClick={() =>
                      navigate(`/products/loan-products/${loan.id}/general`)
                    }
                    className="cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors"
                  >
                    <TableCell className="px-5 py-3.5 font-medium text-sm text-zinc-900 dark:text-zinc-100">
                      {loan.name}
                    </TableCell>
                    <TableCell className="px-5 py-3.5 text-sm text-zinc-600 dark:text-zinc-400">
                      {loan.shortName}
                    </TableCell>
                    <TableCell className="px-5 py-3.5 text-sm text-zinc-600 dark:text-zinc-400">
                      {Array.isArray(loan.endDate) && loan.endDate.length === 3
                        ? new Date(
                            Number(loan.endDate[0]),
                            Number(loan.endDate[1]) - 1,
                            Number(loan.endDate[2])
                          ).toLocaleDateString()
                        : '—'}
                    </TableCell>
                    <TableCell className="px-5 py-3.5">
                      <Badge
                        variant="outline"
                        className={
                          loan.status === 'loanProduct.active'
                            ? 'border-green-300 bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400'
                            : 'border-zinc-200 text-zinc-500'
                        }
                      >
                        <span
                          className={`mr-1.5 inline-block size-1.5 rounded-full ${loan.status === 'loanProduct.active' ? 'bg-green-500' : 'bg-zinc-400'}`}
                        />
                        {loan.status === 'loanProduct.active'
                          ? 'Active'
                          : 'Inactive'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default LoanProducts
