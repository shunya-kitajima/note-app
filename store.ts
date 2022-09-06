import create from 'zustand'
import { EditedComment, EditedNote } from './types/types'

type State = {
  editedComment: EditedComment
  editedNote: EditedNote
  updateEditedComment: (payload: EditedComment) => void
  updateEditedNote: (payload: EditedNote) => void
  resetEditedComment: () => void
  resetEditedNote: () => void
}

const useStore = create<State>((set) => ({
  editedComment: { id: '', content: '' },
  editedNote: { id: '', title: '', content: '' },
  updateEditedComment: (payload) =>
    set({
      editedComment: {
        id: payload.id,
        content: payload.content,
      },
    }),
  updateEditedNote: (payload) =>
    set({
      editedNote: {
        id: payload.id,
        title: payload.title,
        content: payload.content,
      },
    }),
  resetEditedComment: () => set({ editedComment: { id: '', content: '' } }),
  resetEditedNote: () =>
    set({ editedNote: { id: '', title: '', content: '' } }),
}))

export default useStore
