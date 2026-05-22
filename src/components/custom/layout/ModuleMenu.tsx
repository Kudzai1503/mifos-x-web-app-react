/**
 * Copyright since 2025 Mifos Initiative
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { cn } from '@/lib/utils'

export interface ModuleMenuItem {
  title: string
  description?: string
  path: string
  icon: LucideIcon
  meta?: ReactNode
}

interface ModuleMenuProps {
  items: ModuleMenuItem[]
  className?: string
}

export const ModuleMenu = ({ items, className }: ModuleMenuProps) => {
  const navigate = useNavigate()

  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3',
        className
      )}
    >
      {items.map(item => {
        const Icon = item.icon

        return (
          <button
            key={item.path}
            type="button"
            onClick={() => navigate(item.path)}
            className="group flex min-h-32 w-full items-start justify-between rounded-lg border border-zinc-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-primary/40"
          >
            <span className="flex min-w-0 gap-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/20 dark:bg-primary/10 dark:text-primary dark:ring-primary/30">
                <Icon className="h-5 w-5" />
              </span>
              <span className="min-w-0 space-y-1">
                <span className="block font-semibold text-zinc-950 dark:text-zinc-50">
                  {item.title}
                </span>
                {item.description ? (
                  <span className="block text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                    {item.description}
                  </span>
                ) : null}
                {item.meta ? (
                  <span className="block pt-1 text-xs font-medium uppercase tracking-[0.12em] text-zinc-400">
                    {item.meta}
                  </span>
                ) : null}
              </span>
            </span>
            <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-zinc-400 transition group-hover:translate-x-0.5 group-hover:text-primary dark:group-hover:text-primary" />
          </button>
        )
      })}
    </div>
  )
}
