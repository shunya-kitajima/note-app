import React, { FormEvent } from 'react'
import { supabase } from '../utils/supabase'
import useStore from '../store'
import { useMutateNote } from '../hooks/useMutateNote'
import { Spinner } from './Spinner'

export const NoteForm: React.FC = () => {
  const { editedNote } = useStore()
  const update = useStore((state) => state.updateEditedNote)
  const { createNoteMutation, updateNoteMutation } = useMutateNote()

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedNote.id === '') {
      createNoteMutation.mutate({
        title: editedNote.title,
        content: editedNote.content,
        user_id: supabase.auth.user()?.id,
      })
    } else {
      updateNoteMutation.mutate({
        id: editedNote.id,
        title: editedNote.title,
        content: editedNote.content,
      })
    }
  }

  if (createNoteMutation.isLoading || updateNoteMutation.isLoading)
    return <Spinner />

  return (
    <form onSubmit={submitHandler}>
      <div>
        <input
          type="text"
          className="my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
          placeholder="title"
          value={editedNote.title}
          onChange={(e) => update({ ...editedNote, title: e.target.value })}
        />
      </div>
      <div>
        <textarea
          cols={50}
          rows={10}
          className="my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
          placeholder="content"
          value={editedNote.content}
          onChange={(e) => update({ ...editedNote, content: e.target.value })}
        />
      </div>
    </form>
  )
}
