/**
 * Copyright since 2025 Mifos Initiative
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import fineract from '@/lib/axios'
import { faBuilding } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface OfficeNavigationProps {
  officeId: number
}

interface OfficeData {
  id?: number
  name?: string
  externalId?: string
  openingDate?: string
}

const OfficeNavigation = ({ officeId }: OfficeNavigationProps) => {
  const [office, setOffice] = useState<OfficeData | null>(null)
  const [staffCount, setStaffCount] = useState<number>(0)
  const { t, i18n } = useTranslation('common')

  useEffect(() => {
    const fetchOfficeDetails = async () => {
      try {
        const { data: officeData } = await fineract.get<OfficeData>(
          `/v1/offices/${officeId}`
        )
        setOffice(officeData)

        const { data: staffData } = await fineract.get<unknown[]>('/v1/staff', {
          params: { officeId: Number(officeId) },
        })
        setStaffCount(Array.isArray(staffData) ? staffData.length : 0)
      } catch (err) {
        console.error('Failed to get Office details', err)
      }
    }

    if (officeId) fetchOfficeDetails()
  }, [officeId])

  if (!office)
    return (
      <p className="text-gray-500">{t('navigation.loadingOfficeDetails')}</p>
    )

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <FontAwesomeIcon icon={faBuilding} className="text-3xl " />
        <div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {office.name}
          </h1>
          <p className="text-sm text-gray-500">
            {t('fields.externalId')}: {office.externalId}
          </p>
        </div>
      </div>

      <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
        <div className="flex justify-between items-center">
          <span className="font-medium">{t('navigation.openedOn')}:</span>
          <span className="font-medium">
            {new Intl.DateTimeFormat(i18n.language, {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            }).format(new Date(office.openingDate ?? ''))}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-medium">{t('navigation.numberOfStaff')}:</span>
          <span>{staffCount}</span>
        </div>
      </div>
    </div>
  )
}

export default OfficeNavigation
