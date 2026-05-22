/**
 * Copyright since 2025 Mifos Initiative
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { BrandMark } from '@/components/custom/brand/BrandMark'
import { cn } from '@/lib/utils'

interface XPlugLogoLoaderProps {
  label?: string
  className?: string
  compact?: boolean
}

export const XPlugLogoLoader = ({
  label = 'Loading',
  className,
  compact = false,
}: XPlugLogoLoaderProps) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        compact ? 'gap-2' : 'gap-4',
        className
      )}
      role="status"
      aria-live="polite"
    >
      <div
        className={cn(
          'relative flex items-center justify-center',
          compact ? 'size-14' : 'size-24'
        )}
      >
        <span className="absolute inset-0 rounded-full bg-primary/20 blur-md" />
        <span className="absolute inset-1 animate-ping rounded-full border border-primary/30" />
        <span className="absolute inset-2 rounded-full border border-primary/25" />
        <BrandMark
          showName={false}
          markClassName={cn(compact ? 'size-10 text-xs' : 'size-16 text-base')}
        />
      </div>
      <span
        className={cn(
          'font-medium text-zinc-600 dark:text-zinc-300',
          compact ? 'text-xs' : 'text-sm'
        )}
      >
        {label}
      </span>
    </div>
  )
}
