import { FC, useEffect, useState } from "react"
import { LuCheck } from "react-icons/lu"
import { MdDeleteOutline } from "react-icons/md"

interface ToastProps {
    isShown: boolean
    message: string
    type?: "add" | "delete"
    onClose: () => void
}

const Toast: FC<ToastProps> = ({ isShown, message, type = "add", onClose }) => {
    const [fixedType, setFixedType] = useState(type)

    // Чтобы не применялся зеленый цвет в конце вне зависимости от типа (баг)
    useEffect(() => {
        if (isShown) {
            setFixedType(type)
        }
        const timeoutId = setTimeout(() => {
            onClose()
        }, 2000)

        return () => clearTimeout(timeoutId)
    }, [isShown, type, onClose])

    return (
        <div
            className={`absolute top-20 right-6 transition-opacity duration-75 ease-in-out
                ${isShown ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            <div
                className={`min-w-52 bg-white border shadow-2xl rounded-md relative overflow-hidden 
                    after:w-[5px] after:h-full after:absolute after:left-0 after:top-0 after:rounded-l-lg
                    ${fixedType === "delete" ? "after:bg-red-500" : "after:bg-green-500"}`}>
                <div className="flex items-center gap-3 py-2 px-4">
                    <div
                        className={`w-10 h-10 flex items-center justify-center rounded-full 
                            ${fixedType === "delete" ? "bg-red-50" : "bg-green-50"}`}>
                        {fixedType === "delete" ? (
                            <MdDeleteOutline className="text-xl text-red-500" />
                        ) : (
                            <LuCheck className="text-xl text-green-500" />
                        )}
                    </div>
                    <p className="text-sm text-slate-800">{message}</p>
                </div>
            </div>
        </div>
    )
}

export default Toast
