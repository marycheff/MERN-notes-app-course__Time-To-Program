import { Note } from "@/types/Note"

export interface AddEditNotesProps {
    onClose: () => void
    type: "add" | "edit"
    data: Note
    getAllNotes: () => void
    showToastMessage: (message: string, type?: "add" | "delete") => void
}
