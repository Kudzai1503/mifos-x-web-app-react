/**
 * Copyright since 2025 Mifos Initiative
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PageHeaderProps {
  icon?: LucideIcon
  title: string
  subtitle?: string
  actions?: React.ReactNode
  className?: string
}

export const PageHeader = ({
  icon: Icon,
  title,
  subtitle,
  actions,
  className,
}: PageHeaderProps) => (
  <div
    className={cn('flex items-center justify-between gap-4 mb-6', className)}
  >
    <div className="flex items-center gap-3">
      {Icon && (
        <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <Icon className="h-4.5 w-4.5 text-primary" />
        </div>
      )}
      <div>
        <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
            {subtitle}
          </p>
        )}
      </div>
    </div>
    {actions && (
      <div className="flex items-center gap-2 shrink-0">{actions}</div>
    )}
  </div>
)
