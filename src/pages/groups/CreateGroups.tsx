/**
 * Copyright since 2025 Mifos Initiative
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AppBreadCrumbs } from '@/components/custom/breadcrumbs/AppBreadCrumbs'
import AppSelect from '@/components/custom/select/AppSelect'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@radix-ui/react-checkbox'

import fineract from '@/lib/axios'
import { useTranslation } from 'react-i18next'

interface OfficeOption {
  id?: number
  name?: string
}

interface StaffOption {
  id?: number
  displayName?: string
}

const CreateGroups = () => {
  const navigate = useNavigate()
  const { t } = useTranslation('groups')
  const { t: tc } = useTranslation('common')

  const [offices, setOffices] = useState<OfficeOption[]>([])
  const [staff, setStaff] = useState<StaffOption[]>([])

  const [formData, setFormData] = useState({
    name: '',
    officeId: '',
    staffId: '',
    active: false,
    externalId: '',
    submittedOnDate: '',
    activationDate: '',
  })

  // get offices once
  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await fineract.get<OfficeOption[]>('/v1/offices')
        setOffices(data ?? [])
      } catch (e) {
        console.error(e)
      }
    })()
  }, [])

  // get staff whenever office changes
  useEffect(() => {
    ;(async () => {
      try {
        setStaff([])
        if (!formData.officeId) return
        const { data } = await fineract.get<StaffOption[]>('/v1/staff', {
          params: { officeId: Number(formData.officeId) },
        })
        setStaff(data ?? [])
      } catch (e) {
        console.error(e)
      }
    })()
  }, [formData.officeId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await fineract.post('/v1/groups', {
        name: formData.name,
        officeId: Number(formData.officeId),
        active: formData.active,
      })
      navigate('/groups')
    } catch (e) {
      console.error('Failed to create group', e)
      alert(t('create.errorCreate'))
    }
  }

  return (
    <div className="min-h-screen px-6 py-10 max-w-7xl mx-auto text-[15px]">
      <AppBreadCrumbs
        items={[
          { label: tc('nav.home'), href: '/home' },
          { label: t('title'), href: '/groups' },
          { label: t('create.heading'), current: true },
        ]}
      />
      <div className="bg-white dark:bg-zinc-900 rounded-md border p-8 shadow max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">{t('create.heading')}</h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label>{t('create.labelName')}</Label>
            <Input
              value={formData.name}
              onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
              required
            />
          </div>

          <AppSelect
            selectLabel={t('create.labelOffice')}
            selectValue={formData.officeId}
            selectPlaceholder={t('create.selectOffice')}
            selectClassname="w-full space-y-2"
            selectOnChange={value =>
              setFormData(p => ({ ...p, officeId: value, staffId: '' }))
            }
            selectOptions={offices.map(o => ({
              id: o.id?.toString() ?? '',
              name: o.name ?? '',
            }))}
          />

          <AppSelect
            selectLabel={t('create.labelStaff')}
            selectValue={formData.staffId}
            selectPlaceholder={t('create.selectStaff')}
            selectClassname="w-full space-y-2"
            selectOnChange={value =>
              setFormData(p => ({ ...p, staffId: value }))
            }
            selectOptions={staff.map(s => ({
              id: s.id?.toString() ?? '',
              name: s.displayName ?? '',
            }))}
          />

          <div className="flex items-center space-x-3">
            <Checkbox
              checked={formData.active}
              onCheckedChange={v =>
                setFormData(p => ({ ...p, active: Boolean(v) }))
              }
            />
            <Label className="text-md">{t('create.labelActive')}</Label>
          </div>

          {formData.active && (
            <div className="space-y-2">
              <Label>{t('create.labelActivationDate')}</Label>
              <Input
                type="date"
                value={formData.activationDate}
                onChange={e =>
                  setFormData(p => ({ ...p, activationDate: e.target.value }))
                }
              />
            </div>
          )}

          <div className="space-y-2">
            <Label>{t('create.labelExternalId')}</Label>
            <Input
              value={formData.externalId}
              onChange={e =>
                setFormData(p => ({ ...p, externalId: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label>{t('create.labelSubmittedOn')}</Label>
            <Input
              type="date"
              value={formData.submittedOnDate}
              onChange={e =>
                setFormData(p => ({ ...p, submittedOnDate: e.target.value }))
              }
              required
            />
          </div>

          <div className="flex justify-end gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/groups')}
            >
              {tc('actions.cancel')}
            </Button>
            <Button
              type="submit"
              className="bg-[#1074b9] hover:bg-[#1074c9] text-white"
            >
              {tc('actions.submit')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateGroups
