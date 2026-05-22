/**
 * Copyright since 2025 Mifos Initiative
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { AppBreadCrumbs } from '@/components/custom/breadcrumbs/AppBreadCrumbs'
import AppSelect from '@/components/custom/select/AppSelect'
import { Checkbox } from '@/components/ui/checkbox'
import fineract from '@/lib/axios'

const ALL_DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]

const WorkingDays = () => {
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [repaymentPolicy, setRepaymentPolicy] = useState('')
  const [extendTerm, setExtendTerm] = useState(false)

  useEffect(() => {
    const fetchWorkingDays = async () => {
      try {
        const { data } = await fineract.get('/v1/workingdays')
        setSelectedDays(data.recurrence ? parseRecurrence(data.recurrence) : [])
        setRepaymentPolicy(data.repaymentReschedulingType ?? '')
        setExtendTerm(data.extendTermForDailyRepayments ?? false)
      } catch (err) {
        console.error('Failed to fetch working days', err)
      }
    }
    fetchWorkingDays()
  }, [])

  // Parse RRULE BYDAY string into day names (simplified)
  const parseRecurrence = (recurrence: string): string[] => {
    const map: Record<string, string> = {
      MO: 'Monday',
      TU: 'Tuesday',
      WE: 'Wednesday',
      TH: 'Thursday',
      FR: 'Friday',
      SA: 'Saturday',
      SU: 'Sunday',
    }
    const match = recurrence.match(/BYDAY=([^;]+)/)
    if (!match) return []
    return match[1]
      .split(',')
      .map(code => map[code])
      .filter(Boolean)
  }

  const handleDayToggle = (day: string, checked: boolean) => {
    setSelectedDays(prev =>
      checked ? [...prev, day] : prev.filter(d => d !== day)
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await fineract.put('/v1/workingdays', {
        recurrence: selectedDays
          .map(d => {
            const map: Record<string, string> = {
              Monday: 'MO',
              Tuesday: 'TU',
              Wednesday: 'WE',
              Thursday: 'TH',
              Friday: 'FR',
              Saturday: 'SA',
              Sunday: 'SU',
            }
            return map[d]
          })
          .filter(Boolean)
          .join(','),
        repaymentReschedulingType: repaymentPolicy,
        extendTermForDailyRepayments: extendTerm,
        locale: 'en',
      })
      alert('Working days updated successfully!')
    } catch (err) {
      console.error('Failed to update working days', err)
      alert('Failed to update working days')
    }
  }

  return (
    <div className="min-h-screen px-6 py-10 max-w-7xl mx-auto text-[15px]">
      <AppBreadCrumbs
        items={[
          { label: 'Home', href: '/home' },
          { label: 'Organization', href: '/organization' },
          { label: 'Working Days', current: true },
        ]}
      />

      <h1 className="text-2xl font-semibold mb-4">Working Days</h1>

      <div className="bg-white dark:bg-zinc-900 rounded-md border p-8 shadow max-w-3xl mx-auto">
        <form onSubmit={handleSubmit}>
          {/* Working Days list */}
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <div className="text-zinc-700 dark:text-zinc-200 font-medium mb-4">
              Working Days
            </div>

            <div className="space-y-4">
              {ALL_DAYS.map(d => (
                <label key={d} className="flex items-center gap-3">
                  <Checkbox
                    checked={selectedDays.includes(d)}
                    onCheckedChange={checked =>
                      handleDayToggle(d, Boolean(checked))
                    }
                  />
                  <span>{d}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Non-working day policy */}
          <div className="mt-8">
            <AppSelect
              selectLabel="Payments due on non working days"
              selectPlaceholder="Select policy"
              selectValue={repaymentPolicy}
              selectOnChange={val => setRepaymentPolicy(val)}
              selectClassname="w-full"
              selectOptions={[
                { id: 'NEXT_WORKING_DAY', name: 'move to next working day' },
                {
                  id: 'PREVIOUS_WORKING_DAY',
                  name: 'move to previous working day',
                },
                { id: 'SAME_DAY', name: 'same day' },
              ]}
            />
          </div>

          {/* Extend term toggle */}
          <div className="mt-6 flex items-center justify-between">
            <span>
              Extend the term for loans following a daily repayment schedule
            </span>
            <Checkbox
              checked={extendTerm}
              onCheckedChange={checked => setExtendTerm(Boolean(checked))}
            />
          </div>

          {/* Actions */}
          <div className="mt-8 flex justify-center gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => window.history.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#1074b9] hover:bg-[#1074c9] text-white"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default WorkingDays
