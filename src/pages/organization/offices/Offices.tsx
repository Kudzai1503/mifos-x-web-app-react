/**
 * Copyright since 2025 Mifos Initiative
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Upload, Building2, Search } from 'lucide-react'
import { format } from 'date-fns'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
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

interface Office {
  id?: number
  name?: string
  externalId?: string
  parentName?: string
  openingDate?: number[]
}

const Offices = () => {
  const [offices, setOffices] = useState<Office[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const navigate = useNavigate()

  useEffect(() => {
    fineract
      .get('/v1/offices')
      .then(r => setOffices(r.data || []))
      .catch(err => console.error('Failed to fetch offices', err))
  }, [])

  const filtered = offices.filter(o =>
    o.name?.toLowerCase().includes(searchTerm.toLowerCase())
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
          { label: 'Organization', href: '/organization' },
          { label: 'Offices', current: true },
        ]}
      />

      <div className="mt-6">
        <PageHeader
          icon={Building2}
          title="Offices"
          subtitle={`${filtered.length} office${filtered.length !== 1 ? 's' : ''}`}
          actions={
            <>
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={() => navigate('/organization/offices/import')}
              >
                <Upload className="h-4 w-4 mr-1.5" /> Import
              </Button>
              <Button
                className="cursor-pointer"
                onClick={() => navigate('/organization/offices/create')}
              >
                <Plus className="h-4 w-4 mr-1.5" /> Create Office
              </Button>
            </>
          }
        />

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
            <Input
              placeholder="Search offices…"
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
                  Office Name
                </TableHead>
                <TableHead className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Parent Office
                </TableHead>
                <TableHead className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  External ID
                </TableHead>
                <TableHead className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Opened On
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
                    No offices found.
                  </TableCell>
                </TableRow>
              ) : (
                paginated.map(office => (
                  <TableRow
                    key={office.id}
                    className="cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors"
                    onClick={() =>
                      navigate(`/organization/offices/${office.id}`)
                    }
                  >
                    <TableCell className="px-5 py-3.5 font-medium text-sm text-zinc-900 dark:text-zinc-100">
                      {office.name}
                    </TableCell>
                    <TableCell className="px-5 py-3.5 text-sm text-zinc-600 dark:text-zinc-400">
                      {office.parentName || '—'}
                    </TableCell>
                    <TableCell className="px-5 py-3.5 text-sm text-zinc-500 dark:text-zinc-400">
                      {office.externalId || '—'}
                    </TableCell>
                    <TableCell className="px-5 py-3.5 text-sm text-zinc-600 dark:text-zinc-400">
                      {Array.isArray(office.openingDate)
                        ? format(
                            new Date(
                              office.openingDate[0],
                              office.openingDate[1] - 1,
                              office.openingDate[2]
                            ),
                            'dd MMM yyyy'
                          )
                        : '—'}
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

export default Offices
