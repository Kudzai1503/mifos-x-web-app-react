/**
 * Copyright since 2025 Mifos Initiative
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import type { ReactNode } from 'react'
import { AlertCircle } from 'lucide-react'

import { AppBreadCrumbs } from '@/components/custom/breadcrumbs/AppBreadCrumbs'
import { XPlugLogoLoader } from '@/components/custom/loading/XPlugLogoLoader'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Crumb {
  label: string
  href?: string
  current?: boolean
}

interface PageShellProps {
  title?: string
  description?: string
  eyebrow?: string
  breadcrumbs?: Crumb[]
  actions?: ReactNode
  children: ReactNode
  className?: string
  contentClassName?: string
}

interface PageHeaderProps {
  title: string
  description?: string
  eyebrow?: string
  actions?: ReactNode
  className?: string
}

interface SectionPanelProps {
  children: ReactNode
  className?: string
  header?: ReactNode
}

interface StateBlockProps {
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

interface StatusBadgeProps {
  children: ReactNode
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info'
  className?: string
}

const toneClasses = {
  neutral:
    'border-zinc-200 bg-zinc-100 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200',
  success:
    'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300',
  warning:
    'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300',
  danger:
    'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-300',
  info: 'border-primary/25 bg-primary/10 text-primary dark:border-primary/30 dark:bg-primary/10 dark:text-primary',
}

export const PageHeader = ({
  title,
  description,
  eyebrow,
  actions,
  className,
}: PageHeaderProps) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 border-b border-zinc-200/80 pb-6 dark:border-zinc-800 md:flex-row md:items-end md:justify-between',
        className
      )}
    >
      <div className="min-w-0 space-y-2">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary dark:text-primary">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-2xl font-semibold tracking-normal text-zinc-950 dark:text-zinc-50 md:text-3xl">
          {title}
        </h1>
        {description ? (
          <p className="max-w-3xl text-sm leading-6 text-zinc-600 dark:text-zinc-300">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex flex-wrap items-center gap-2 md:justify-end">
          {actions}
        </div>
      ) : null}
    </div>
  )
}

export const PageShell = ({
  title,
  description,
  eyebrow,
  breadcrumbs,
  actions,
  children,
  className,
  contentClassName,
}: PageShellProps) => {
  return (
    <section className={cn('mx-auto w-full max-w-7xl', className)}>
      {breadcrumbs?.length ? <AppBreadCrumbs items={breadcrumbs} /> : null}
      {title ? (
        <PageHeader
          title={title}
          description={description}
          eyebrow={eyebrow}
          actions={actions}
        />
      ) : null}
      <div className={cn('mt-6 space-y-6', contentClassName)}>{children}</div>
    </section>
  )
}

export const SectionPanel = ({
  children,
  className,
  header,
}: SectionPanelProps) => {
  return (
    <section
      className={cn(
        'rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950',
        className
      )}
    >
      {header ? (
        <div className="border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
          {header}
        </div>
      ) : null}
      <div className="p-5">{children}</div>
    </section>
  )
}

export const LoadingState = ({
  title,
  description,
  className,
}: StateBlockProps) => {
  return (
    <div
      className={cn(
        'flex min-h-40 flex-col items-center justify-center rounded-lg border border-dashed border-zinc-300 bg-white/70 p-8 text-center dark:border-zinc-700 dark:bg-zinc-950/70',
        className
      )}
    >
      <XPlugLogoLoader label={title} compact />
      {description ? (
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          {description}
        </p>
      ) : null}
    </div>
  )
}

export const EmptyState = ({
  title,
  description,
  action,
  className,
}: StateBlockProps) => {
  return (
    <div
      className={cn(
        'flex min-h-40 flex-col items-center justify-center rounded-lg border border-dashed border-zinc-300 bg-white/70 p-8 text-center dark:border-zinc-700 dark:bg-zinc-950/70',
        className
      )}
    >
      <p className="font-medium text-zinc-900 dark:text-zinc-100">{title}</p>
      {description ? (
        <p className="mt-1 max-w-md text-sm leading-6 text-zinc-500 dark:text-zinc-400">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  )
}

export const ErrorState = ({
  title,
  description,
  action,
  className,
}: StateBlockProps) => {
  return (
    <div
      className={cn(
        'flex min-h-40 flex-col items-center justify-center rounded-lg border border-rose-200 bg-rose-50 p-8 text-center dark:border-rose-900 dark:bg-rose-950',
        className
      )}
    >
      <AlertCircle className="mb-3 h-5 w-5 text-rose-600 dark:text-rose-300" />
      <p className="font-medium text-rose-950 dark:text-rose-50">{title}</p>
      {description ? (
        <p className="mt-1 max-w-md text-sm leading-6 text-rose-700 dark:text-rose-200">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  )
}

export const StatusBadge = ({
  children,
  tone = 'neutral',
  className,
}: StatusBadgeProps) => {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium',
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  )
}

export const RetryButton = ({
  onClick,
  children = 'Retry',
}: {
  onClick: () => void
  children?: ReactNode
}) => {
  return (
    <Button type="button" variant="outline" onClick={onClick}>
      {children}
    </Button>
  )
}
