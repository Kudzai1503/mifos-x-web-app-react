/**
 * Copyright since 2025 Mifos Initiative
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { BrandMark } from '@/components/custom/brand/BrandMark'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/app/hook'
import { logout } from '@/pages/login/loginSlice'
import { useTranslation } from 'react-i18next'
import {
  Gauge,
  Send,
  Check,
  Layers2,
  Bell,
  RefreshCcw,
  Plus,
  Network,
  Keyboard,
  CircleHelp,
  LogOut,
  Cog,
  User,
  Users,
  Building2,
  Boxes,
  FileText,
  type LucideIcon,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupLabel,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

interface SidebarItem {
  icon: LucideIcon
  label: string
  route: string
}

export const AppSidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const { t } = useTranslation([
    'common',
    'clients',
    'organization',
    'products',
    'accounting',
  ])

  const handleClick = (page: string) => navigate(`/${page}`)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login', { replace: true })
  }

  const primaryItems: SidebarItem[] = [
    { icon: Gauge, label: t('common:nav.dashboard'), route: 'dashboard' },
    { icon: Send, label: t('common:nav.navigation'), route: 'navigation' },
    {
      icon: Check,
      label: t('common:nav.checkerInboxAndTasks'),
      route: 'checker-inbox-and-tasks/checker-inbox',
    },
    {
      icon: Layers2,
      label: t('common:nav.individualCollectionSheet'),
      route: 'individual-collection-sheet',
    },
  ]

  const operationsItems: SidebarItem[] = [
    { icon: Users, label: t('clients:title'), route: 'clients' },
    { icon: Building2, label: t('organization:title'), route: 'organization' },
    { icon: Boxes, label: t('products:title'), route: 'products' },
    {
      icon: Network,
      label: t('common:nav.chartOfAccounts'),
      route: 'accounting/chart-of-accounts',
    },
    {
      icon: RefreshCcw,
      label: t('common:nav.frequentPostings'),
      route: 'accounting/journal-entries/frequent-postings',
    },
    {
      icon: Plus,
      label: t('common:nav.createJournalEntry'),
      route: 'accounting/journal-entries/create',
    },
    { icon: FileText, label: t('common:nav.reports'), route: 'reports' },
    {
      icon: Bell,
      label: t('common:nav.notifications'),
      route: 'notifications',
    },
  ]

  const renderItem = ({ icon: Icon, label, route }: SidebarItem) => {
    const path = `/${route}`
    const isActive =
      location.pathname === path || location.pathname.startsWith(`${path}/`)

    return (
      <SidebarMenuItem key={route}>
        <SidebarMenuButton
          tooltip={label}
          isActive={isActive}
          onClick={() => handleClick(route)}
          className={cn(
            'text-zinc-600 dark:text-zinc-300 hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/10 dark:hover:text-primary',
            isActive &&
              'bg-primary/10 text-primary ring-1 ring-primary/20 dark:bg-primary/10 dark:text-primary dark:ring-primary/30'
          )}
        >
          <Icon className="h-4 w-4 shrink-0" />
          <span>{label}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }

  return (
    <Sidebar
      collapsible="icon"
      className="h-screen border-r border-zinc-200 bg-white/95 dark:border-zinc-800 dark:bg-zinc-950/95"
    >
      <SidebarContent className="flex-1 overflow-y-auto px-3 py-4">
        {/* Brand/user block — hidden when sidebar collapses to icon strip */}
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900 group-data-[collapsible=icon]:hidden">
          <button
            type="button"
            onClick={() => handleClick('home')}
            className="flex w-full items-center gap-3 text-left"
          >
            <BrandMark showName={false} markClassName="size-12" />
            <span className="min-w-0">
              <span className="block text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                X-Plug
              </span>
              <span className="block text-xs font-medium uppercase tracking-[0.14em] text-primary dark:text-primary">
                React Workspace
              </span>
            </span>
          </button>

          <div className="mt-4 flex items-center gap-3 rounded-md bg-white p-3 shadow-sm dark:bg-zinc-950">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/10 dark:text-primary">
              <User className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                x-plug
              </p>
              <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                tenant: default
              </p>
            </div>
          </div>
        </div>

        <SidebarGroup className="px-0">
          <SidebarGroupLabel className="px-2 pt-5 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
            {t('common:nav.frequentlyAccessed')}
          </SidebarGroupLabel>
          <SidebarMenu className="mt-2 space-y-1">
            {primaryItems.map(renderItem)}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup className="px-0">
          <SidebarGroupLabel className="px-2 pt-5 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
            {t('common:nav.mainItems')}
          </SidebarGroupLabel>
          <SidebarMenu className="mt-2 space-y-1">
            {operationsItems.map(renderItem)}

            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip={t('common:nav.keyboardShortcuts')}
                className="text-zinc-600 dark:text-zinc-300 hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/10 dark:hover:text-primary"
              >
                <Keyboard className="h-4 w-4" />
                <span>{t('common:nav.keyboardShortcuts')}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip={t('common:nav.help')}
                asChild
                className="text-zinc-600 dark:text-zinc-300 hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/10 dark:hover:text-primary"
              >
                <a
                  href="https://mifosforge.jira.com/wiki/spaces/docs/pages/52035622/User+Manual"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <CircleHelp className="h-4 w-4" />
                  <span>{t('common:nav.help')}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-3 pb-4">
        <SidebarMenu className="space-y-1">
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip={t('common:tooltips.settings')}
              onClick={() => handleClick('settings')}
              className="text-zinc-600 dark:text-zinc-300 hover:bg-white hover:text-primary dark:hover:bg-zinc-800 dark:hover:text-primary"
            >
              <Cog className="h-4 w-4" />
              <span>{t('common:tooltips.settings')}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip={t('common:tooltips.signOut')}
              onClick={handleLogout}
              className="text-zinc-600 dark:text-zinc-300 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950 dark:hover:text-rose-300"
            >
              <LogOut className="h-4 w-4" />
              <span>{t('common:tooltips.signOut')}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
