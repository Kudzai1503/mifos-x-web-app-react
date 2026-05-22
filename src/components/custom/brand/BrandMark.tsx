/**
 * Copyright since 2025 Mifos Initiative
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { cn } from '@/lib/utils'

interface BrandMarkProps {
  className?: string
  markClassName?: string
  showName?: boolean
  stacked?: boolean
}

export const BRAND_NAME = 'X-Plug'

export const BrandMark = ({
  className,
  markClassName,
  showName = true,
  stacked = false,
}: BrandMarkProps) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-3',
        stacked && 'flex-col gap-2 text-center',
        className
      )}
    >
      <span
        className={cn(
          'relative grid size-11 place-items-center overflow-hidden rounded-lg bg-primary text-primary-foreground shadow-sm ring-1 ring-primary/30',
          markClassName
        )}
        aria-hidden="true"
      >
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_28%_20%,rgba(255,255,255,0.38),transparent_45%)]" />
        <span className="relative text-sm font-black tracking-normal">XP</span>
      </span>
      {showName ? (
        <span
          className={cn('font-semibold tracking-normal', stacked && 'text-lg')}
        >
          {BRAND_NAME}
        </span>
      ) : null}
    </span>
  )
}
