/**
 * Copyright since 2025 Mifos Initiative
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './lib/i18n'
import App from './App.tsx'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { XPlugLogoLoader } from './components/custom/loading/XPlugLogoLoader'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <StrictMode>
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
            <XPlugLogoLoader label="Loading X-Plug" />
          </div>
        }
      >
        <App />
      </Suspense>
    </StrictMode>
  </Provider>
)
