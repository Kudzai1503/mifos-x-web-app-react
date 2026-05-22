/**
 * Copyright since 2025 Mifos Initiative
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '@/pages/login/loginSlice'
import { type RootState, type AppDispatch } from '@/app/store'

import mainImg from '@/assets/images/cover_image_resized.webp'

import { Sun, Moon, Eye, EyeOff } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useNavigate } from 'react-router-dom'
import { useTranslation, Trans } from 'react-i18next'
import { LanguageSwitcher } from '@/components/custom/language-switcher/LanguageSwitcher'
import { envConfig } from '@/lib/env-config'
import { BrandMark } from '@/components/custom/brand/BrandMark'

const Login = () => {
  const navigate = useNavigate()
  const { t } = useTranslation(['auth', 'common'])
  const { user } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (user) {
      navigate('/home')
    }
  }, [user, navigate])

  const dispatch = useDispatch<AppDispatch>()
  const { loading, error } = useSelector((state: RootState) => state.auth)

  const [form, setForm] = useState({ username: '', password: '' })
  const isDockerProxy = !envConfig.apiUrl
  const [server, setServer] = useState(() => {
    if (isDockerProxy) return ''
    return localStorage.getItem('mifosServer') || 'https://localhost:8443'
  })
  const [tenant, setTenant] = useState(() => {
    return localStorage.getItem('mifosTenant') || 'default'
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isDockerProxy) {
      localStorage.setItem('mifosServer', server)
    }
    localStorage.setItem('mifosTenant', tenant)
    dispatch(loginUser(form))
  }

  const handleServerChange = (value: string) => {
    setServer(value)
  }

  const handleTenantChange = (value: string) => {
    setTenant(value)
  }

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('theme')
    return (savedTheme as 'light' | 'dark') || 'light'
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-zinc-950 lg:flex-row">
      <div className="relative hidden h-[400px] overflow-hidden lg:flex lg:h-auto lg:w-[64%]">
        <img
          src={mainImg}
          alt="mainImg"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,9,11,0.86),rgba(9,9,11,0.54)),radial-gradient(circle_at_20%_20%,rgba(16,116,185,0.34),transparent_28rem)]"></div>
        <div className="absolute inset-0 z-10 flex flex-col justify-between px-10 py-10 text-white xl:px-16">
          <div className="inline-flex w-fit items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] backdrop-blur">
            Financial inclusion platform
          </div>
          <div className="max-w-4xl space-y-5">
            <h1 className="text-5xl font-semibold tracking-normal xl:text-7xl">
              X-Plug
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-white/85 xl:text-2xl xl:leading-10">
              <Trans
                i18nKey="hero.description"
                ns="auth"
                components={{
                  mifosLink: (
                    <a href="https://mifos.org/" className="underline" />
                  ),
                  communityLink: (
                    <a
                      href="https://mifos.org/resources/community/"
                      className="underline"
                    />
                  ),
                }}
              />{' '}
              <a
                href="https://mifos.org/take-action/volunteer/"
                className="underline"
              >
                {t('auth:hero.getInvolved')}
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="flex min-h-screen w-full flex-col justify-between bg-zinc-50 px-4 py-6 dark:bg-zinc-950 sm:px-8 lg:w-[36%]">
        <div className="flex flex-wrap justify-center gap-2 text-center lg:justify-end">
          {!isDockerProxy && (
            <Select value={server} onValueChange={handleServerChange}>
              <SelectTrigger className="w-[170px] bg-white shadow-sm dark:bg-zinc-900">
                <Label className="text-zinc-900 dark:text-white">
                  {t('auth:login.server')}
                </Label>
                <SelectValue placeholder="https://localhost:8443" />
              </SelectTrigger>
              <SelectContent className="dark:bg-zinc-800 dark:text-white">
                <SelectGroup>
                  <SelectItem value="https://sandbox.mifos.community">
                    https://sandbox.mifos.community
                  </SelectItem>
                  <SelectItem value="https://demo.mifos.community">
                    https://demo.mifos.community
                  </SelectItem>
                  <SelectItem value="https://localhost:8443">
                    https://localhost:8443
                  </SelectItem>
                  <SelectItem value="http://localhost:4200">
                    http://localhost:4200
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}

          <LanguageSwitcher className="w-[140px] bg-white shadow-sm dark:bg-zinc-900 dark:text-white" />

          <Button
            onClick={toggleTheme}
            variant="outline"
            className="bg-white shadow-sm dark:bg-zinc-900"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </Button>
        </div>

        <div className="mx-auto flex w-full max-w-md flex-col items-center">
          <BrandMark
            stacked
            markClassName="size-20 text-xl"
            className="my-8 text-zinc-950 dark:text-zinc-50"
          />

          <Select value={tenant} onValueChange={handleTenantChange}>
            <SelectTrigger className="w-full max-w-xs bg-white shadow-sm dark:bg-zinc-900">
              <Label className="text-zinc-900 dark:text-white">
                {t('auth:login.tenant')}
              </Label>
              <SelectValue placeholder="Default" />
            </SelectTrigger>
            <SelectContent className="dark:bg-zinc-800 dark:text-white">
              <SelectGroup>
                <SelectItem value="default">Default</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <form
            onSubmit={handleSubmit}
            className="mt-6 flex w-full max-w-xs flex-col items-center rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            <Input
              name="username"
              value={form.username}
              onChange={handleChange}
              type="text"
              placeholder={t('auth:login.username')}
              className="mb-4 h-10 dark:bg-zinc-950 dark:text-white"
            />

            <div className="relative w-full mb-4">
              <Input
                name="password"
                value={form.password}
                onChange={handleChange}
                type={showPassword ? 'text' : 'password'}
                placeholder={t('auth:login.password')}
                className="h-10 pr-10 dark:bg-zinc-950 dark:text-white"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={e => e.preventDefault()}
                aria-label={
                  showPassword
                    ? t('auth:login.hidePassword')
                    : t('auth:login.showPassword')
                }
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-zinc-500" />
                ) : (
                  <Eye className="h-4 w-4 text-zinc-500" />
                )}
              </Button>
            </div>

            <div className="flex items-center space-x-2 mb-4">
              <Checkbox id="terms" />
              <label htmlFor="terms" className="text-base dark:text-white">
                {t('auth:login.rememberMe')}
              </label>
            </div>

            {error && (
              <p className="text-red-500 text-sm">{t('auth:login.error')}</p>
            )}

            <Button
              type="submit"
              className="w-full cursor-pointer bg-primary text-base text-white hover:bg-primary/90"
              disabled={loading}
            >
              {loading ? t('auth:login.submitting') : t('auth:login.submit')}
            </Button>
          </form>

          <Button variant="ghost" className="m-6 text-base cursor-pointer">
            {t('auth:login.forgotPassword')}
          </Button>

          <div className="flex flex-wrap justify-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="cursor-pointer">
                  {t('common:nav.resources')}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="dark:bg-zinc-800 dark:text-white ">
                <DropdownMenuGroup>
                  <DropdownMenuItem className="cursor-pointer">
                    {' '}
                    <a href="https://mifosforge.jira.com/wiki/spaces/docs/pages/52035622/User+Manual">
                      {t('common:nav.userManual')}
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <a href="https://cwiki.apache.org/confluence/display/FINERACT/Apache+Fineract+1.0+Functional+Specifications">
                      {t('common:nav.functionalSpecifications')}
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <a href="https://cwiki.apache.org/confluence/display/FINERACT/Contributor%27s+Zone">
                      {t('common:nav.developerZone')}
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="cursor-pointer">
                  {t('common:nav.community')}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="dark:bg-zinc-800 dark:text-white">
                <DropdownMenuGroup>
                  <DropdownMenuItem className="cursor-pointer">
                    <a href="https://groups.google.com/g/mifosusers">
                      {t('common:nav.userGroup')}
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <a href="https://groups.google.com/g/mifosdeveloper">
                      {t('common:nav.developerGroup')}
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <a href="https://mifos.org/resources/community/communications/#mifos-irc">
                      {t('common:nav.irc')}
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="cursor-pointer">
                  {t('common:nav.contribute')}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="dark:bg-zinc-800 dark:text-white">
                <DropdownMenuGroup>
                  <DropdownMenuItem className="cursor-pointer">
                    <a href="https://mifosforge.jira.com/wiki/spaces/MDZ/pages/92012624/Key+Design+Principles">
                      {t('common:nav.keyDesignPrinciples')}
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <a href="https://sourceforge.net/projects/mifos/">
                      {t('common:nav.workingWithCode')}
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <a href="https://mifos.org/take-action/donate-now/">
                      {t('common:nav.donate')}
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center text-sm text-zinc-600 dark:text-zinc-300">
          <p>
            <span className="font-semibold">{t('common:info.mifos')}</span>{' '}
            250518 - cf693b0f
          </p>
          <p>
            <span className="font-semibold">{t('common:info.fineract')}</span>{' '}
            {isDockerProxy ? 'same-origin proxy' : server}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
