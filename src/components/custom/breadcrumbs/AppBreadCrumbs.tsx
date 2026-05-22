/**
 * Copyright since 2025 Mifos Initiative
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import { ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface Crumb {
  label: string
  href?: string
  current?: boolean
}

interface AppBreadCrumbsProps {
  items: Crumb[]
}

export const AppBreadCrumbs = ({ items }: AppBreadCrumbsProps) => {
  const navigate = useNavigate()

  return (
    <Breadcrumb className="mb-5">
      <BreadcrumbList className="rounded-lg border border-zinc-200 bg-white/80 px-3 py-2 text-sm shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          const isCurrent = item.current ?? isLast

          return [
            <BreadcrumbItem key={`item-${item.label}`}>
              {item.href && !isCurrent ? (
                <BreadcrumbLink
                  onClick={() => navigate(item.href!)}
                  className="cursor-pointer font-medium text-zinc-500 transition hover:text-primary dark:text-zinc-400 dark:hover:text-primary"
                >
                  {item.label}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {item.label}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>,

            !isLast && (
              <BreadcrumbSeparator
                key={`sep-${item.label}`}
                className="text-zinc-300 dark:text-zinc-600"
              >
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
            ),
          ]
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
