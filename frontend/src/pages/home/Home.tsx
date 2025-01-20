import NoteCard from "@/components/cards/NoteCard/NoteCard"
import Navbar from "@/components/navbar/Navbar"
import { NavbarProps } from "@/components/navbar/Navbar.props"
import Toast from "@/components/toastMessage/Toast"
import AddEditNotes from "@/pages/home/AddEditNotes/AddEditNotes"
import { Note } from "@/types/Note"
import axiosInstance from "@/utils/axiosInstance"
import { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { MdAdd } from "react-icons/md"
import Modal from "react-modal"
import { useNavigate } from "react-router-dom"

interface OpenAddEditModal {
    isShown: boolean
    type: "add" | "edit"
    data: Note
}
interface ToastMsg {
    isShown: boolean
    message: string
    type?: "add" | "delete"
}

const Home = () => {
    const [openAddEditModal, setOpenAddEditModal] = useState<OpenAddEditModal>({
        isShown: false,
        type: "add",
        data: {},
    })
    const [showToastMsg, setShowToastMsg] = useState<ToastMsg>({
        isShown: false,
        message: "",
        type: "delete",
    })

    const [error, setError] = useState("")
    const [userInfo, setUserInfo] = useState<NavbarProps | null>(null)
    const [allNotes, setAllNotes] = useState<Note[]>([])

    const navigate = useNavigate()

    const handleEdit = (noteDetails: object) => {
        setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" })
    }
    const showToastMessage = (message: string, type?: ToastMsg["type"]) => {
        const newToastMsg: ToastMsg = {
            isShown: true,
            message: message,
            type: type,
        }
        setShowToastMsg(newToastMsg)
    }

    const handleCloseToast = () => {
        setShowToastMsg({
            isShown: false,
            message: "",
        })
    }

    // Получить userInfo
    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get("/get-user")
            if (response.data && response.data.user) {
                setUserInfo(response.data.user)
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 401) {
                    localStorage.clear()
                    navigate("/login")
                }
            } else {
                setError("Непредвиденная ошибка. Перезагрузите страницу")
            }
        }
    }

    // Получить все заметки
    const getAllNotes = async () => {
        try {
            const response = await axiosInstance.get("/get-all-notes")
            if (response.data.notes) {
                setAllNotes(response.data.notes)
            }
        } catch {
            setError("Непредвиденная ошибка. Перезагрузите страницу")
        }
    }

    const deleteNote = async (data: Note) => {
        const noteId = data._id
        try {
            const response = await axiosInstance.delete(`/delete-note/${noteId}`)

            if (response.data && !response.data.error) {
                showToastMessage("Заметка удалена успешно", "delete")
                getAllNotes()
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

    useEffect(() => {
        getUserInfo()
        getAllNotes()
        return () => {}
    }, [])

    if (error) {
        return <p className="text-red-500 text-xs">{error}</p>
    }

    return (
        <>
            <Navbar userInfo={userInfo} />
            {/* Пример заметки */}
            {/* <div className="container mx-auto">
                <div className="grid grid-cols-3 gap-4 mt-8">
                    <NoteCard
                        title="Встреча 7го апреля"
                        date="Сегодня, 11:00"
                        content="Встреча в 7:00"
                        tags={["#Встреча"]}
                        isPinned={true}
                        onEdit={() => {}}
                        onDelete={() => {}}
                        onPinNote={() => {}}
                    />
                </div>
            </div> */}
            <div className="container mx-auto">
                <div className="grid grid-cols-3 gap-4 mt-8">
                    {allNotes.map(item => (
                        <NoteCard
                            key={item._id}
                            title={item.title}
                            date={item.createdOn}
                            content={item.content}
                            tags={item.tags}
                            isPinned={item.isPinned}
                            onEdit={() => handleEdit(item)}
                            onDelete={() => deleteNote(item)}
                            onPinNote={() => {}}
                        />
                    ))}
                </div>
            </div>

            {/* Кнопка добавления заметки */}
            <button
                className="w-16 h-16 flex items-center justify-center rounded-full bg-primary hover:bg-blue-600 absolute bottom-10 right-10"
                onClick={() => setOpenAddEditModal({ type: "add", isShown: true, data: {} })}>
                <MdAdd className="text-[32px] text-white" />
            </button>

            {/* Модальное окно для добавления/редактирования заметки */}
            <Modal
                isOpen={openAddEditModal.isShown}
                onRequestClose={() => setOpenAddEditModal({ ...openAddEditModal, isShown: false, type: "edit" })}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                    },
                }}
                contentLabel=""
                className="w-2/5 max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-auto">
                <AddEditNotes
                    getAllNotes={getAllNotes}
                    type={openAddEditModal.type}
                    data={openAddEditModal.data}
                    onClose={() => setOpenAddEditModal({ ...openAddEditModal, isShown: false })}
                    showToastMessage={showToastMessage}
                />
            </Modal>
            <Toast
                isShown={showToastMsg.isShown}
                message={showToastMsg.message}
                onClose={handleCloseToast}
                type={showToastMsg.type}
            />
        </>
    )
}

export default Home
