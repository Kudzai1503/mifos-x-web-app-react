/**
 * Copyright since 2025 Mifos Initiative
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { SidebarTrigger } from '@/components/ui/sidebar'

import DropDown from '@/components/custom/navbar/Dropdown'

import {
  Landmark,
  Banknote,
  ChartBar,
  Shield,
  Search,
  Bell,
  Moon,
  User,
  Sun,
  Menu,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/app/hook'
import { logout } from '@/pages/login/loginSlice'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '@/components/custom/language-switcher/LanguageSwitcher'
import { cn } from '@/lib/utils'

const MfNavbar = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { t } = useTranslation([
    'common',
    'accounting',
    'clients',
    'organization',
    'products',
    'loans',
  ])

  const handleNavigate = (path?: string) => {
    if (!path || path.trim() === '') return
    else if (path === 'signout') {
      dispatch(logout())
      navigate('/login', { replace: true })
    } else if (path.startsWith('http')) {
      window.open(path, '_blank')
    } else {
      navigate(`/${path.trim()}`)
    }
  }

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('theme')
    return savedTheme === 'dark' ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const navButtonClass =
    'h-9 rounded-md bg-transparent px-3 text-sm font-medium text-white shadow-none hover:bg-white/10 hover:text-white dark:text-white'

  const iconButtonClass =
    'size-9 text-white hover:bg-white/10 hover:text-white dark:hover:bg-white/10'

  return (
    <header className="sticky top-0 z-30 flex min-h-14 items-center justify-between border-b border-primary/30 bg-primary px-3 text-primary-foreground shadow-sm dark:border-primary/30 sm:px-4">
      <div className="flex min-w-0 items-center gap-2 lg:gap-3">
        <SidebarTrigger className="text-white hover:bg-white/10 hover:text-white" />

        <div className="lg:hidden">
          <DropDown
            triggerClassName="px-2"
            name={
              <span className="flex items-center gap-2">
                <Menu className="w-5 h-5" aria-hidden="true" />
                <span className="sr-only">
                  {t('common:accessibility.openNavigationMenu')}
                </span>
              </span>
            }
            options={[
              {
                label: t('common:nav.institution'),
                children: [
                  { label: t('clients:title'), path: 'clients' },
                  { label: t('clients:groups'), path: 'groups' },
                  { label: t('clients:centers'), path: 'centers' },
                  { label: t('accounting:title'), path: 'accounting' },
                ],
              },
              { label: t('accounting:title'), path: 'accounting' },
              {
                label: t('common:nav.reports'),
                children: [
                  { label: t('common:actions.all'), path: 'reports' },
                  { label: t('clients:title'), path: 'reports/client' },
                  { label: t('loans:title'), path: 'reports/loan' },
                  { label: t('loans:savings'), path: 'reports/savings' },
                  { label: t('organization:nav.funds'), path: 'reports/fund' },
                  { label: t('accounting:title'), path: 'reports/accounting' },
                ],
              },
              {
                label: t('common:nav.admin'),
                children: [
                  { label: t('common:nav.users'), path: 'appusers' },
                  { label: t('organization:title'), path: 'organization' },
                  { label: t('common:nav.system'), path: 'system' },
                  { label: t('products:title'), path: 'products' },
                  { label: t('common:nav.templates'), path: 'templates' },
                ],
              },
            ]}
            onSelect={handleNavigate}
          />
        </div>

        <div className="hidden lg:flex lg:items-center lg:gap-1">
          <DropDown
            triggerClassName={navButtonClass}
            name={
              <span className="flex items-center gap-2">
                <Landmark className="h-4 w-4" /> {t('common:nav.institution')}
              </span>
            }
            options={[
              { label: t('clients:title'), path: 'clients' },
              { label: t('clients:groups'), path: 'groups' },
              { label: t('clients:centers'), path: 'centers' },
              { label: t('accounting:title'), path: 'accounting' },
            ]}
            onSelect={handleNavigate}
          />
          <Button
            className={cn(navButtonClass, 'gap-2')}
            onClick={() => navigate('/accounting')}
          >
            <Banknote className="h-4 w-4" /> {t('accounting:title')}
          </Button>
          <DropDown
            triggerClassName={navButtonClass}
            name={
              <span className="flex items-center gap-2">
                <ChartBar className="h-4 w-4" /> {t('common:nav.reports')}
              </span>
            }
            options={[
              { label: t('common:actions.all'), path: 'reports' },
              { label: t('clients:title'), path: 'reports/client' },
              { label: t('loans:title'), path: 'reports/loan' },
              { label: t('loans:savings'), path: 'reports/savings' },
              { label: t('organization:nav.funds'), path: 'reports/fund' },
              { label: t('accounting:title'), path: 'reports/accounting' },
            ]}
            onSelect={handleNavigate}
          />
          <DropDown
            triggerClassName={navButtonClass}
            name={
              <span className="flex items-center gap-2">
                <Shield className="h-4 w-4" /> {t('common:nav.admin')}
              </span>
            }
            options={[
              { label: t('common:nav.users'), path: 'appusers' },
              { label: t('organization:title'), path: 'organization' },
              { label: t('common:nav.system'), path: 'system' },
              { label: t('products:title'), path: 'products' },
              { label: t('common:nav.templates'), path: 'templates' },
            ]}
            onSelect={handleNavigate}
          />
        </div>
      </div>

      <div className="flex flex-shrink-0 items-center gap-1 sm:gap-2">
        <Button
          variant="ghost"
          className={cn(iconButtonClass, 'hidden md:inline-flex')}
          onClick={() => navigate('/navigation')}
          aria-label={t('common:actions.search')}
        >
          <Search className="h-4 w-4" />
        </Button>
        <LanguageSwitcher className="w-[132px] border-white/30 bg-white/10 text-white hover:bg-white/15" />
        <Button
          variant="ghost"
          className={iconButtonClass}
          aria-label={t('common:accessibility.notifications')}
          onClick={() => navigate('/notifications')}
        >
          <Bell className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          className={iconButtonClass}
          onClick={toggleTheme}
          aria-label={
            theme === 'light'
              ? t('common:accessibility.switchToDarkTheme')
              : t('common:accessibility.switchToLightTheme')
          }
          aria-pressed={theme !== 'light'}
        >
          {theme === 'light' ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </Button>
        <DropDown
          triggerClassName="size-9 px-0"
          name={
            <span className="flex items-center gap-2">
              <User className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">
                {t('common:accessibility.userMenu')}
              </span>
            </span>
          }
          options={[
            {
              label: t('common:nav.help'),
              path: 'https://mifosforge.jira.com/wiki/spaces/docs/pages/52035622/User+Manual',
            },
            { label: t('common:nav.profile'), path: 'profile' },
            { label: t('common:nav.settings'), path: 'settings' },
            { label: t('common:actions.signOut'), path: 'signout' },
          ]}
          onSelect={handleNavigate}
        />
      </div>
    </header>
  )
}

export default MfNavbar
