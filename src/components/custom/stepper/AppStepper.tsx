/**
 * Copyright since 2025 Mifos Initiative
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { Button } from '@/components/ui/button'
import { useState, type ReactNode } from 'react'
import { Check, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Steps {
  icon: ReactNode
  label: string
  component: ReactNode
}

interface StepsProp {
  steps: Steps[]
}

const AppStepper = ({ steps }: StepsProp) => {
  const [currentStep, setCurrentStep] = useState(0)
  const activeStep = steps[currentStep]

  const nextPage = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevPage = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="border-b border-zinc-200 bg-zinc-50 px-4 py-4 dark:border-zinc-800 dark:bg-zinc-900/70">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                Step {currentStep + 1} of {steps.length}
              </p>
              <h2 className="mt-1 text-lg font-semibold tracking-normal text-zinc-950 dark:text-zinc-50">
                {activeStep.label}
              </h2>
            </div>
            <div className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-600 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300">
              {Math.round(((currentStep + 1) / steps.length) * 100)}% complete
            </div>
          </div>

          <div
            className="mt-5 flex gap-2 overflow-x-auto pb-1"
            role="list"
            aria-label="Create workflow steps"
          >
            {steps.map((step, index) => {
              const isActive = index === currentStep
              const isComplete = index < currentStep

              return (
                <div
                  key={step.label}
                  role="listitem"
                  aria-current={isActive ? 'step' : undefined}
                  className={cn(
                    'flex min-w-40 shrink-0 items-center gap-3 rounded-md border px-3 py-2 text-left transition',
                    isActive &&
                      'border-primary bg-primary text-white shadow-sm',
                    isComplete &&
                      !isActive &&
                      'border-primary/25 bg-primary/10 text-primary',
                    !isActive &&
                      !isComplete &&
                      'border-zinc-200 bg-white text-zinc-500 hover:border-primary/30 hover:text-primary dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:border-primary/40 dark:hover:text-primary'
                  )}
                >
                  <span
                    className={cn(
                      'flex size-8 shrink-0 items-center justify-center rounded-full border text-sm',
                      isActive && 'border-white/30 bg-white/15 text-white',
                      isComplete &&
                        !isActive &&
                        'border-primary bg-primary text-white',
                      !isActive &&
                        !isComplete &&
                        'border-zinc-300 bg-zinc-50 text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900'
                    )}
                  >
                    {isComplete ? <Check className="h-4 w-4" /> : step.icon}
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-[0.12em] opacity-75">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="block whitespace-nowrap text-sm font-semibold">
                      {step.label}
                    </span>
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="p-5 sm:p-6">{activeStep.component}</div>
      </div>

      <div className="flex flex-col-reverse gap-3 pt-5 sm:flex-row sm:justify-between">
        <Button
          variant="outline"
          disabled={currentStep === 0}
          onClick={prevPage}
          className="gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        <Button
          className="gap-2 bg-primary text-white hover:bg-primary/90"
          disabled={currentStep === steps.length - 1}
          onClick={nextPage}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default AppStepper
