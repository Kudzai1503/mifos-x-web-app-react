/**
 * Copyright since 2025 Mifos Initiative
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useLocation, useNavigate } from 'react-router-dom'

interface Tabs {
  label: string
  href: string
}

interface TabsProps {
  tabs: Tabs[]
}

const AppTabs = ({ tabs }: TabsProps) => {
  const navigate = useNavigate()
  const location = useLocation()

  const normalizePath = (path: string) => {
    const withSlash = path.startsWith('/') ? path : `/${path}`
    return withSlash.replace(/\/+$/, '') || '/'
  }

  return (
    <div
      className="flex w-full gap-2 overflow-x-auto rounded-lg border border-zinc-200 bg-white p-2 text-sm font-medium shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
      role="navigation"
      aria-label="Section navigation"
    >
      {tabs.map(tab => {
        const targetPath = normalizePath(tab.href)
        const currentPath = normalizePath(location.pathname)
        const isActive =
          currentPath === targetPath ||
          (targetPath !== '/' && currentPath.startsWith(`${targetPath}/`))

        return (
          <Button
            key={tab.href}
            type="button"
            variant="ghost"
            onClick={() => navigate(targetPath)}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'h-10 shrink-0 whitespace-nowrap rounded-md border px-4 text-sm font-semibold transition focus-visible:ring-2 focus-visible:ring-primary/30',
              isActive
                ? 'border-primary bg-primary text-white shadow-sm hover:bg-primary/90 hover:text-white dark:border-primary dark:bg-primary dark:text-white'
                : 'border-transparent bg-zinc-100 text-zinc-600 hover:bg-primary/10 hover:text-primary dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-primary/10 dark:hover:text-primary'
            )}
          >
            {tab.label}
          </Button>
        )
      })}
    </div>
  )
}

export default AppTabs
