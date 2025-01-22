import { AxiosError } from "axios"
import { FC, useState } from "react"
import { MdClose } from "react-icons/md"
import TagInput from "../../../components/input/TagInput/TagInput"
import axiosInstance from "../../../utils/axiosInstance"
import { AddEditNotesProps } from "./AddEditNotes.props"

const AddEditNotes: FC<AddEditNotesProps> = ({ type, data, getAllNotes, onClose, showToastMessage }) => {
    const [title, setTitle] = useState(data?.title || "")
    const [content, setContent] = useState(data?.content || "")
    const [tags, setTags] = useState(data?.tags || [])
    const [error, setError] = useState("")

    // Добавление заметки
    const addNewNote = async () => {
        try {
            const response = await axiosInstance.post("/add-note", {
                title,
                content,
                tags,
            })

            if (response.data && response.data.note) {
                showToastMessage("Заметка добавлена успешно")
                getAllNotes()
                onClose()
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response && error.response.data && error.response.data.message) {
                    setError(error.response.data.message)
                }
            } else {
                setError("Непредвиденная ошибка")
            }
        }
    }
    // Изменение заметки
    const editNote = async () => {
        const noteId = data._id
        try {
            const response = await axiosInstance.put(`/edit-note/${noteId}`, {
                title,
                content,
                tags,
            })

            if (response.data && response.data.note) {
                showToastMessage("Заметка обновлена успешно")
                getAllNotes()
                onClose()
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response && error.response.data && error.response.data.message) {
                    setError(error.response.data.message)
                }
            } else {
                setError("Непредвиденная ошибка")
            }
        }
    }

    const handleAddNote = () => {
        if (!title) {
            setError("Введите название")
            return
        }
        if (!content) {
            setError("Введите содержимое")
            return
        }
        setError("")

        if (type === "edit") {
            editNote()
        } else {
            addNewNote()
        }
    }
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
            {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

            <div className="mt-3">
                <label className="input-label">ТЕГИ</label>
                <TagInput tags={tags} setTags={setTags} />

                <button className="btn-primary font-medium mt-5 p-3" onClick={handleAddNote}>
                    {type == "edit" ? "ИЗМЕНИТЬ" : "ДОБАВИТЬ"}
                </button>
            </div>
        </div>
    )
}

export default AddEditNotes
