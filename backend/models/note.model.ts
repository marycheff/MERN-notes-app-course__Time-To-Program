import mongoose, { Schema } from "mongoose"

const noteSchema = new Schema({
    title: { type: String, required: true, unique: true },
    content: { type: String, required: true, trim: true },
    tags: { type: [String], default: [] },
    isPinned: { type: Boolean, default: false },
    userId: { type: String },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now },
})

const Note = mongoose.model("Note", noteSchema)
export default Note
