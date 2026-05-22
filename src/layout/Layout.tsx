/**
 * Copyright since 2025 Mifos Initiative
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import MfNavbar from '@/components/custom/navbar/MfNavbar'
import { AppSidebar } from '@/components/custom/sidebar/AppSidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import type { CSSProperties } from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': '18rem',
        } as CSSProperties
      }
    >
      <div className="flex min-h-screen w-full bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
        <AppSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <MfNavbar />
          <main className="flex-1 bg-[radial-gradient(circle_at_top_left,rgba(16,116,185,0.11),transparent_32rem),linear-gradient(180deg,#fafafa,#f4f4f5)] px-4 py-5 dark:bg-[radial-gradient(circle_at_top_left,rgba(16,116,185,0.18),transparent_30rem),linear-gradient(180deg,#09090b,#18181b)] sm:px-6 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Layout
