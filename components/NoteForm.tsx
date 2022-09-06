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

  return <div>NoteForm</div>
}
