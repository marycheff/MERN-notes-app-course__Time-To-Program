export interface NoteCardProps {
    title?: string
    date?: string
    content?: string
    tags?: string[]
    isPinned?: boolean
    onEdit: () => void
    onDelete: () => void
    onPinNote: () => void
}
