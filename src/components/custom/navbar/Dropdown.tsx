/**
 * Copyright since 2025 Mifos Initiative
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'

interface DropdownOption {
  label: string
  path?: string
  disabled?: boolean
  onClick?: () => void
  children?: DropdownOption[]
}

interface DropdownProps {
  name: React.ReactNode
  options: DropdownOption[]
  onSelect?: (path?: string) => void
  triggerClassName?: string
  contentClassName?: string
}

const Dropdown = ({
  name,
  options,
  onSelect,
  triggerClassName,
  contentClassName,
}: DropdownProps) => {
  const navigate = useNavigate()

  const handleSelect = (path?: string) => {
    if (onSelect) {
      onSelect(path)
    } else if (path) {
      navigate(`/${path}`)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn(
            'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-white transition hover:bg-white/10 hover:text-white',
            triggerClassName
          )}
          variant="ghost"
        >
          {name}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className={cn(
          'mt-2 w-52 rounded-lg border border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-950',
          contentClassName
        )}
        align="start"
      >
        {options.map((option, index) =>
          option.children ? (
            <DropdownMenuSub key={index}>
              <DropdownMenuSubTrigger className="rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900">
                {option.label}
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="border-zinc-200 bg-white p-1 dark:border-zinc-800 dark:bg-zinc-950">
                {option.children.map((child, i) => (
                  <DropdownMenuItem
                    key={i}
                    onClick={() => handleSelect(child.path)}
                    disabled={child.disabled}
                    className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
                  >
                    {child.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          ) : (
            <DropdownMenuItem
              key={index}
              onClick={() => handleSelect(option.path)}
              disabled={option.disabled}
              className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
            >
              {option.label}
            </DropdownMenuItem>
          )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Dropdown
