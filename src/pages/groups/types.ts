/**
 * Copyright since 2025 Mifos Initiative
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/**
 * Minimal inline interface for a group response.
 * The Fineract API returns additional runtime fields when
 * `associations=all` is requested.
 */
export interface ExtendedGroupResponse {
  id?: number
  name?: string
  externalId?: string
  officeName?: string
  officeId?: number
  active?: boolean
  staffId?: number
  staffName?: string
  staffOptions?: StaffOption[]
  clientMembers?: ClientMember[]
  collectionMeetingCalendar?: Record<string, unknown>
  centerId?: number
  status?: GroupStatus
  staff?: { displayName?: string }
  timeline?: ExtendedGroupTimeline
}

export interface ExtendedGroupTimeline {
  activatedOnDate?: string | number[]
  submittedOnDate?: string | number[]
}

export interface GroupStatus {
  id?: number
  code?: string
  value?: string
}

export interface StaffOption {
  id?: number
  displayName?: string
  name?: string
}

export interface ClientMember {
  id?: number
  displayName?: string
  officeName?: string
}
