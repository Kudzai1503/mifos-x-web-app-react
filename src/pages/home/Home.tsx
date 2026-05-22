/**
 * Copyright since 2025 Mifos Initiative
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import mifosLogo from '@/assets/images/image-removebg-preview-transparent.png'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Gauge,
  Users,
  Building2,
  Banknote,
  Boxes,
  FileText,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const { t } = useTranslation('common')
  const navigate = useNavigate()

  const quickLinks = [
    { icon: Users, label: 'Clients', route: '/clients' },
    { icon: Banknote, label: 'Loans', route: '/loans' },
    { icon: Building2, label: 'Organization', route: '/organization' },
    { icon: Boxes, label: 'Products', route: '/products' },
    { icon: FileText, label: 'Reports', route: '/reports' },
  ]

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-zinc-900 px-4 flex flex-col items-center justify-start pt-16">
      <img
        src={mifosLogo}
        alt={t('ui.mifosLogo')}
        className="h-28 sm:h-36 md:h-40 mt-6 mb-4 drop-shadow-lg"
      />

      <h1 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-100 mb-6">
        {t('nav.welcomeHome')}
      </h1>

      <div className="w-full max-w-xl px-2 mb-6">
        <Input
          type="text"
          placeholder={t('ui.searchActivityPlaceholder')}
          className="w-full px-4 sm:px-6 py-3 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-100 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm sm:text-base placeholder:text-gray-500 dark:placeholder:text-gray-400"
        />
      </div>

      <Button
        className="flex items-center gap-2 mb-8 px-4 sm:px-6 py-2 bg-[#76C47A] hover:bg-[#22B24C] text-white rounded-lg shadow transition cursor-pointer text-sm sm:text-base"
        onClick={() => navigate('/dashboard')}
      >
        <Gauge className="w-4 h-4 sm:w-5 sm:h-5" />
        {t('nav.dashboard')}
      </Button>

      {/* Quick navigation shortcuts */}
      <div className="flex flex-wrap justify-center gap-3 w-full max-w-2xl">
        {quickLinks.map(({ icon: Icon, label, route }) => (
          <button
            key={route}
            type="button"
            onClick={() => navigate(route)}
            className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-sm text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:border-primary/40 hover:text-primary hover:bg-primary/5 dark:hover:bg-zinc-700 transition-all cursor-pointer"
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Home
