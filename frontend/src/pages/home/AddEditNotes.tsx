import { FC, useState } from "react"
import { MdClose } from "react-icons/md"
import TagInput from "../../components/input/TagInput"

interface AddEditNotesProps {
    onClose: () => void
}

const AddEditNotes: FC<AddEditNotesProps> = ({ onClose }) => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [tags, setTags] = useState<string[]>([])
    const [error, setError] = useState("")
    return (
        <div className="relative">
            <button
                className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
                onClick={onClose}>
                <MdClose className="text-xl text-slate-400" />
            </button>
            <div className="flex flex-col gap-2">
                <label className="input-label">НАЗВАНИЕ</label>
                <input
                    type="text"
                    className="text-2xl font-bold text-slate-950 outline-none"
                    placeholder="Пойти в зал в 6"
                    value={title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)}
                />
            </div>

            <div className="flex flex-col gap-2 mt-4">
                <label className="input-label">СОДЕРЖИМОЕ</label>
                <textarea
                    className="text-sm text-slate-950  outline-none bg-slate-50 p-2 rounded"
                    placeholder="Содержимое заметки"
                    rows={10}
                    value={content}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.currentTarget.value)}
                />
            </div>

            <div className="mt-3">
                <label className="input-label">ТЕГИ</label>
                <TagInput tags={tags} setTags={setTags} />

                <button className="btn-primary font-medium mt-5 p-3" onClick={() => {}}>
                    ДОБАВИТЬ
                </button>
            </div>
        </div>
    )
}

export default AddEditNotes
