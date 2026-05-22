/**
 * Copyright since 2025 Mifos Initiative
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import type { ReactNode } from 'react'
import { ArrowLeft, ClipboardCheck, type LucideIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { AppBreadCrumbs } from '@/components/custom/breadcrumbs/AppBreadCrumbs'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Crumb {
  label: string
  href?: string
  current?: boolean
}

interface WorkflowStat {
  label: string
  value: ReactNode
  icon?: LucideIcon
}

interface CreateWorkflowShellProps {
  title: string
  description: string
  breadcrumbs: Crumb[]
  children: ReactNode
  backHref?: string
  backLabel?: string
  badge?: string
  stats?: WorkflowStat[]
  className?: string
  contentClassName?: string
}

export const CreateWorkflowShell = ({
  title,
  description,
  breadcrumbs,
  children,
  backHref,
  backLabel = 'Back',
  badge = 'Create workflow',
  stats,
  className,
  contentClassName,
}: CreateWorkflowShellProps) => {
  const navigate = useNavigate()

  return (
    <section
      className={cn('mx-auto w-full max-w-7xl px-4 py-8 sm:px-6', className)}
    >
      <AppBreadCrumbs items={breadcrumbs} />

      <div className="mt-6 overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="bg-[linear-gradient(135deg,rgba(16,116,185,0.12),rgba(255,255,255,0)),linear-gradient(180deg,#ffffff,#f8fafc)] p-5 dark:bg-[linear-gradient(135deg,rgba(16,116,185,0.2),rgba(24,24,27,0)),linear-gradient(180deg,#18181b,#09090b)] sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary shadow-sm dark:border-primary/30 dark:bg-zinc-950/80">
                <ClipboardCheck className="h-3.5 w-3.5" />
                {badge}
              </div>
              <h1 className="mt-4 text-2xl font-semibold tracking-normal text-zinc-950 dark:text-zinc-50 md:text-3xl">
                {title}
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                {description}
              </p>
            </div>

            {backHref ? (
              <Button
                type="button"
                variant="outline"
                className="w-fit gap-2 bg-white/80 dark:bg-zinc-950/80"
                onClick={() => navigate(backHref)}
              >
                <ArrowLeft className="h-4 w-4" />
                {backLabel}
              </Button>
            ) : null}
          </div>
        </div>

        {stats?.length ? (
          <div className="grid border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(item => {
              const Icon = item.icon ?? ClipboardCheck

              return (
                <div
                  key={item.label}
                  className="flex min-w-0 gap-3 border-b border-zinc-100 px-5 py-4 dark:border-zinc-800"
                >
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary dark:bg-primary/10 dark:text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400">
                      {item.label}
                    </p>
                    <div className="mt-1 break-words text-sm font-medium text-zinc-950 dark:text-zinc-50">
                      {item.value}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : null}
      </div>

      <div className={cn('mt-5', contentClassName)}>{children}</div>
    </section>
  )
}

interface OperationalFormCardProps {
  title: string
  description?: string
  children: ReactNode
  className?: string
  actions?: ReactNode
}

export const OperationalFormCard = ({
  title,
  description,
  children,
  className,
  actions,
}: OperationalFormCardProps) => {
  return (
    <section
      className={cn(
        'overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950',
        className
      )}
    >
      <div className="flex flex-col gap-3 border-b border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900/70 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold tracking-normal text-zinc-950 dark:text-zinc-50">
            {title}
          </h2>
          {description ? (
            <p className="mt-1 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
              {description}
            </p>
          ) : null}
        </div>
        {actions ? <div className="flex shrink-0 gap-2">{actions}</div> : null}
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </section>
  )
}
