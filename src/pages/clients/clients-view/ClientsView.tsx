/**
 * Copyright since 2025 Mifos Initiative
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import {
  User,
  Menu,
  Building2,
  Phone,
  Mail,
  Calendar,
  Hash,
  Users,
  UserCircle,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import fineract from '@/lib/axios'
import { AppBreadCrumbs } from '@/components/custom/breadcrumbs/AppBreadCrumbs'
import AppTabs from '@/components/custom/tabs/AppTabs'
import Dropdown from '@/components/custom/navbar/Dropdown'
import { useTranslation } from 'react-i18next'
import { formatDate } from '@/lib/date-utils'

interface ClientData {
  id?: number
  displayName?: string
  accountNo?: string
  officeName?: string
  externalId?: string
  emailAddress?: string
  activationDate?: number[]
  status?: { id?: number; code?: string; description?: string }
  mobileNo?: string
  staffName?: string
  groups?: { id: number; name: string }[]
  dateOfBirth?: number[]
}

const ClientsView = () => {
  const { id } = useParams()
  const [client, setClient] = useState<ClientData>()
  const { t } = useTranslation('clients')
  const { t: tc } = useTranslation('common')

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const { data } = await fineract.get<ClientData>(`/v1/clients/${id}`, {
          params: { associations: 'groupMembers' },
        })
        setClient(data)
      } catch (err) {
        console.error('Failed to fetch client', err)
      }
    }
    fetchClient()
  }, [id])

  const isActive = client?.status?.id === 300

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      <AppBreadCrumbs
        items={[
          { label: tc('nav.home'), href: '/home' },
          { label: t('title'), href: '/clients' },
          { label: String(client?.displayName ?? '…'), href: `/clients/${id}` },
          { label: t('view.tabs.general'), current: true },
        ]}
      />

      {/* ── Client banner ── */}
      <div className="mt-6 rounded-t-xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-700">
        {/* Coloured top bar */}
        <div className="bg-primary px-6 pt-5 pb-6">
          <div className="flex items-start justify-between gap-4">
            {/* Avatar + name */}
            <div className="flex items-center gap-4">
              <div className="size-14 rounded-full bg-white/20 ring-2 ring-white/30 flex items-center justify-center shrink-0">
                <User className="h-7 w-7 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl font-semibold text-white leading-tight">
                    {client?.displayName ?? '—'}
                  </h1>
                  <Badge
                    className={
                      isActive
                        ? 'bg-green-400/20 text-green-100 border-green-400/40 hover:bg-green-400/20'
                        : 'bg-yellow-400/20 text-yellow-100 border-yellow-400/40 hover:bg-yellow-400/20'
                    }
                    variant="outline"
                  >
                    <span
                      className={`mr-1.5 inline-block size-1.5 rounded-full ${isActive ? 'bg-green-300' : 'bg-yellow-300'}`}
                    />
                    {client?.status?.description ?? client?.status?.code ?? '—'}
                  </Badge>
                </div>
                <p className="mt-0.5 text-sm text-white/70">
                  #{client?.accountNo ?? '—'}
                </p>
              </div>
            </div>

            {/* Actions menu */}
            <div className="shrink-0">
              <Dropdown
                name={
                  <span className="flex items-center gap-1.5 rounded-lg bg-white/15 hover:bg-white/25 px-3 py-1.5 text-white text-sm font-medium transition-colors">
                    <Menu className="h-4 w-4" />
                    {t('view.menu.actions')}
                  </span>
                }
                options={[
                  {
                    label: t('view.menu.edit'),
                    path: `clients/${client?.id}/edit`,
                  },
                  {
                    label: t('view.menu.applications'),
                    children: [
                      {
                        label: t('view.menu.newLoanAccount'),
                        path: 'signature',
                        disabled: true,
                      },
                      {
                        label: t('view.menu.newSavingsAccount'),
                        path: 'signature',
                        disabled: true,
                      },
                      {
                        label: t('view.menu.newShareAccount'),
                        path: 'signature',
                        disabled: true,
                      },
                      {
                        label: t('view.menu.newRecurringDepositAccount'),
                        path: 'signature',
                        disabled: true,
                      },
                      {
                        label: t('view.menu.newFixedDepositAccount'),
                        path: 'signature',
                        disabled: true,
                      },
                    ],
                  },
                  {
                    label: t('view.menu.actions'),
                    children: [
                      {
                        label: t('view.menu.close'),
                        path: 'signature',
                        disabled: true,
                      },
                      {
                        label: t('view.menu.transferClients'),
                        path: 'signature',
                        disabled: true,
                      },
                    ],
                  },
                  {
                    label: t('view.menu.unassignStaff'),
                    path: `clients/${client?.id}/edit`,
                  },
                  {
                    label: t('view.menu.more'),
                    children: [
                      {
                        label: t('view.menu.addCharge'),
                        path: 'signature',
                        disabled: true,
                      },
                      {
                        label: t('view.menu.createCollateral'),
                        path: 'signature',
                        disabled: true,
                      },
                      {
                        label: t('view.menu.survey'),
                        path: 'signature',
                        disabled: true,
                      },
                      {
                        label: t('view.menu.uploadSignature'),
                        path: 'signature',
                        disabled: true,
                      },
                      {
                        label: t('view.menu.deleteSignature'),
                        path: 'signature',
                        disabled: true,
                      },
                      {
                        label: t('view.menu.clientScreenReports'),
                        path: 'signature',
                        disabled: true,
                      },
                      {
                        label: t('view.menu.createStandingInstructions'),
                        path: 'signature',
                        disabled: true,
                      },
                      {
                        label: t('view.menu.viewStandingInstructions'),
                        path: 'signature',
                        disabled: true,
                      },
                    ],
                  },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Info grid */}
        <div className="bg-white dark:bg-zinc-900 grid grid-cols-2 sm:grid-cols-4 divide-x divide-y divide-zinc-100 dark:divide-zinc-800">
          {[
            {
              icon: Building2,
              label: t('view.office'),
              value: client?.officeName,
            },
            {
              icon: Users,
              label: t('view.memberOf'),
              value: client?.groups?.map(g => g.name).join(', ') || null,
            },
            {
              icon: Phone,
              label: t('view.mobileNumber'),
              value: client?.mobileNo,
            },
            { icon: Mail, label: t('view.email'), value: client?.emailAddress },
            {
              icon: Hash,
              label: t('view.externalId'),
              value: client?.externalId,
            },
            {
              icon: UserCircle,
              label: t('view.staff'),
              value: client?.staffName,
            },
            {
              icon: Calendar,
              label: t('view.activationDate'),
              value:
                formatDate(client?.activationDate as number[] | undefined) ||
                null,
            },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-3 px-5 py-4">
              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary/60" />
              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
                  {label}
                </p>
                <p className="mt-0.5 truncate text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  {value || '—'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <AppTabs
        tabs={[
          {
            label: t('view.tabs.general'),
            href: `clients/${client?.id}/general`,
          },
          {
            label: t('view.tabs.address'),
            href: `clients/${client?.id}/address`,
          },
          {
            label: t('view.tabs.familyMembers'),
            href: `clients/${client?.id}/family-members`,
          },
          {
            label: t('view.tabs.identities'),
            href: `clients/${client?.id}/identities`,
          },
          {
            label: t('view.tabs.documents'),
            href: `clients/${client?.id}/documents`,
          },
          { label: t('view.tabs.notes'), href: `clients/${client?.id}/notes` },
        ]}
      />

      <div className="bg-white dark:bg-zinc-800 rounded-b-xl border border-t-0 border-zinc-200 dark:border-zinc-700 p-6 shadow-sm">
        <Outlet />
      </div>
    </div>
  )
}

export default ClientsView
