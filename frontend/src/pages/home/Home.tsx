import { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { MdAdd } from "react-icons/md"
import Modal from "react-modal"
import { useNavigate } from "react-router-dom"
import NoteCard from "../../components/cards/NoteCard"
import Navbar from "../../components/navbar/Navbar"
import axiosInstance from "../../utils/axiosInstance"
import AddEditNotes from "./AddEditNotes"
import { NavbarProps } from "../../components/navbar/Navbar.props"

interface OpenAddEditModal {
    isShown: boolean
    type: "add" | "edit"
    data: object
}

const Home = () => {
    const [openAddEditModal, setOpenAddEditModal] = useState<OpenAddEditModal>({
        isShown: false,
        type: "add",
        data: {},
    })
    const [error, setError] = useState("")
    const [userInfo, setUserInfo] = useState<NavbarProps | null>(null)

    const navigate = useNavigate()

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

    useEffect(() => {
        getUserInfo()
        return () => {}
    }, [])

    if (error) {
        return <p className="text-red-500 text-xs">{error}</p>
    }

    return (
        <>
            <Navbar userInfo={userInfo} />
            {/* Пример заметки */}
            <div className="container mx-auto">
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
            </div>

            {/* Кнопка добавления заметки */}
            <button
                className="w-16 h-16 flex items-center justify-center rounded-full bg-primary hover:bg-blue-600 absolute bottom-10 right-10"
                onClick={() => setOpenAddEditModal({ ...openAddEditModal, isShown: true })}>
                <MdAdd className="text-[32px] text-white" />
            </button>

            {/* Модальное окно для добавления/редактирования заметки */}
            <Modal
                isOpen={openAddEditModal.isShown}
                onRequestClose={() => setOpenAddEditModal({ ...openAddEditModal, isShown: false })}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                    },
                }}
                contentLabel=""
                className="w-2/5 max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-auto">
                <AddEditNotes
                    type={openAddEditModal.type}
                    data={openAddEditModal.data}
                    onClose={() => setOpenAddEditModal({ ...openAddEditModal, isShown: false })}
                />
            </Modal>
        </>
    )
}

export default Home
