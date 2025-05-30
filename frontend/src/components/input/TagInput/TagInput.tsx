import { TagInputProps } from "@/components/input/TagInput/TagInput.props"
import { FC, useState } from "react"
import { MdAdd, MdClose } from "react-icons/md"

const TagInput: FC<TagInputProps> = ({ tags, setTags }) => {
    const [inputValue, setInputValue] = useState("")
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }
    const addNewTag = () => {
        if (inputValue.trim() !== "") {
            setTags?.([...(tags || []), inputValue])
            setInputValue("")
        }
    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addNewTag()
        }
    }
    const handleRemoveTag = (tagToRemove: string) => {
        setTags?.(tags?.filter(tag => tag !== tagToRemove) ?? [])
    }
    return (
        <div>
            {tags && (
                <div className="flex items-center gap-2 flex-wrap mt-2">
                    {tags?.map((tag, index) => (
                        <span
                            key={index}
                            className="flex items-center gap-2 text-sm text-slate-900 bg-slate-100 py-1 px-2 rounded">
                            # {tag}
                            <button onClick={() => handleRemoveTag(tag)}>
                                <MdClose />
                            </button>
                        </span>
                    ))}
                </div>
            )}
            <div className="flex items-center gap-4 mt-3">
                <input
                    type="text"
                    className="text-sm bg-transparent border px-3 py-2 rounded outline-none"
                    placeholder="Добавить тег"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
                <button
                    className="w-8 h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700"
                    onClick={addNewTag}>
                    <MdAdd className="text-2xl text-blue-700 hover:text-white" />
                </button>
            </div>
        </div>
    )
}

export default TagInput
