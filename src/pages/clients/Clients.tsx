/**
 * Copyright since 2025 Mifos Initiative
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search, Users } from 'lucide-react'
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
import { Checkbox } from '@/components/ui/checkbox'
import { AppBreadCrumbs } from '@/components/custom/breadcrumbs/AppBreadCrumbs'
import fineract from '@/lib/axios'
import { useTranslation } from 'react-i18next'

interface ClientRow {
  id?: number
  displayName?: string
  accountNumber?: string
  externalId?: string
  officeName?: string
  status?: { id?: number; value?: string }
}

const StatusBadge = ({
  status,
}: {
  status?: { id?: number; value?: string }
}) => {
  if (!status) return <span className="text-zinc-400">—</span>
  const isActive = status.id === 300
  const isPending = status.id === 100 || status.id === 200
  return (
    <Badge
      variant="outline"
      className={
        isActive
          ? 'border-green-300 bg-green-50 text-green-700 dark:bg-green-950/30 dark:border-green-800 dark:text-green-400'
          : isPending
            ? 'border-yellow-300 bg-yellow-50 text-yellow-700 dark:bg-yellow-950/30 dark:border-yellow-800 dark:text-yellow-400'
            : 'border-zinc-200 text-zinc-500 dark:border-zinc-700'
      }
    >
      <span
        className={`mr-1.5 inline-block size-1.5 rounded-full ${isActive ? 'bg-green-500' : isPending ? 'bg-yellow-500' : 'bg-zinc-400'}`}
      />
      {status.value ?? (isActive ? 'Active' : 'Inactive')}
    </Badge>
  )
}

const Clients = () => {
  const navigate = useNavigate()
  const { t } = useTranslation('clients')
  const { t: tc } = useTranslation('common')

  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [includePending, setIncludePending] = useState(false)
  const [rows, setRows] = useState<ClientRow[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    ;(async () => {
      try {
        const res = await fineract.post<{
          content?: ClientRow[]
          totalElements?: number
        }>(
          '/v2/clients/search',
          { text: searchTerm || undefined },
          { params: { page: Math.max(0, page - 1), size: itemsPerPage } }
        )
        const data = res.data || {}
        const content = (data.content ?? []) as ClientRow[]
        if (!cancelled) {
          setRows(content)
          setTotal(data.totalElements ?? content.length)
        }
      } catch {
        if (!cancelled) {
          setRows([])
          setTotal(0)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [searchTerm, page, itemsPerPage])

  const filtered = rows.filter(c => {
    const sid = c?.status?.id ?? 0
    return includePending
      ? sid === 300 || sid === 100 || sid === 200
      : sid === 300
  })

  const totalPages = Math.max(1, Math.ceil(total / itemsPerPage))

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      <AppBreadCrumbs
        items={[
          { label: tc('nav.home'), href: '/home' },
          { label: t('title'), current: true },
        ]}
      />

      {/* Page header */}
      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              {t('title')}
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {tc('pagination.showing', {
                current: filtered.length,
                total,
                page,
                pages: totalPages,
              })}
            </p>
          </div>
        </div>
        <Button
          className="cursor-pointer"
          onClick={() => navigate('/clients/create')}
        >
          <Plus className="h-4 w-4 mr-1.5" /> {t('addClient')}
        </Button>
      </div>

      {/* Toolbar */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
          <Input
            placeholder={t('searchByName')}
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value)
              setPage(1)
            }}
            className="pl-9 h-9"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <Checkbox
              id="pending-clients"
              checked={includePending}
              onCheckedChange={v => setIncludePending(!!v)}
            />
            <label
              htmlFor="pending-clients"
              className="text-sm text-zinc-600 dark:text-zinc-400 cursor-pointer select-none"
            >
              {t('pending.showPendingClients')}
            </label>
          </div>

          <Select
            value={itemsPerPage.toString()}
            onValueChange={v => {
              setItemsPerPage(parseInt(v, 10))
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

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
            >
              {tc('actions.prev')}
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
              {tc('actions.next')}
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="mt-4 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-zinc-50 dark:bg-zinc-800/60 hover:bg-zinc-50 dark:hover:bg-zinc-800/60">
              <TableHead className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                {t('table.name')}
              </TableHead>
              <TableHead className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                {t('table.accountNo')}
              </TableHead>
              <TableHead className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                {t('table.externalId')}
              </TableHead>
              <TableHead className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                {t('table.status')}
              </TableHead>
              <TableHead className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                {t('table.officeName')}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="px-5 py-10 text-center text-sm text-zinc-400"
                >
                  Loading…
                </TableCell>
              </TableRow>
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="px-5 py-10 text-center text-sm text-zinc-400"
                >
                  No clients found.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map(c => (
                <TableRow
                  key={c.id}
                  onClick={() => c.id && navigate(`/clients/${c.id}/general`)}
                  className="cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors"
                >
                  <TableCell className="px-5 py-3.5 font-medium text-sm text-zinc-900 dark:text-zinc-100">
                    {c.displayName ?? '—'}
                  </TableCell>
                  <TableCell className="px-5 py-3.5 text-sm font-mono text-zinc-600 dark:text-zinc-400">
                    {c.accountNumber ?? '—'}
                  </TableCell>
                  <TableCell className="px-5 py-3.5 text-sm text-zinc-500 dark:text-zinc-400">
                    {c.externalId ?? '—'}
                  </TableCell>
                  <TableCell className="px-5 py-3.5">
                    <StatusBadge status={c.status} />
                  </TableCell>
                  <TableCell className="px-5 py-3.5 text-sm text-zinc-600 dark:text-zinc-400">
                    {c.officeName ?? '—'}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Clients
