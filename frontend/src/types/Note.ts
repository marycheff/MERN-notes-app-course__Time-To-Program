export interface Note {
    _id?: string
    title?: string
    content?: string
    tags?: string[]
    isPinned?: boolean
    createdOn?: string // или Date, если вы хотите работать с объектами Date
    updatedOn?: string // или Date
}