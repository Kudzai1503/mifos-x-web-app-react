/**
 * Copyright since 2025 Mifos Initiative
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTranslation } from 'react-i18next'
import fineract from '@/lib/axios'

interface Note {
  id?: number
  note?: string
  createdByUsername?: string
  createdOn?: string
}

const CentersNotesTab = () => {
  const { id } = useParams()
  const [notes, setNotes] = useState<Note[]>([])
  const [newNote, setNewNote] = useState('')
  const { t } = useTranslation('centers')

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await fineract.get(`/v1/centers/${id}/notes`)
        setNotes(data ?? [])
      } catch (err) {
        console.error('Failed to fetch center notes', err)
      }
    })()
  }, [id])

  const handleAddNote = async () => {
    if (!newNote.trim()) return
    try {
      await fineract.post(`/v1/centers/${id}/notes`, { note: newNote })
      setNewNote('')
      const { data } = await fineract.get(`/v1/centers/${id}/notes`)
      setNotes(data ?? [])
    } catch (err) {
      console.error('Failed to add note', err)
    }
  }

  return (
    <div className="text-black dark:text-white px-6 py-4 space-y-4">
      <h2 className="text-lg font-semibold">{t('notes.heading')}</h2>

      {/* Input section */}
      <div className="flex items-start gap-4">
        <Input
          placeholder={t('notes.placeholder')}
          value={newNote}
          onChange={e => setNewNote(e.target.value)}
        />
        <Button
          variant="outline"
          className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white"
          onClick={handleAddNote}
        >
          {t('notes.addButton')}
        </Button>
      </div>

      <hr className="border-gray-400 dark:border-white" />

      {/* Notes list */}
      <div className="space-y-4">
        {notes.map(note => (
          <div
            key={note.id}
            className="border rounded p-3 bg-zinc-50 dark:bg-zinc-800"
          >
            <p className="text-sm">{note.note}</p>
            {note.createdByUsername && (
              <p className="text-xs text-zinc-500 mt-1">
                {note.createdByUsername}
                {note.createdOn ? ` — ${note.createdOn}` : ''}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CentersNotesTab
