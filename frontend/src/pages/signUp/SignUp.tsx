import PasswordInput from "@/components/input/PasswordInput/PasswordInput"
import Navbar from "@/components/navbar/Navbar"
import axiosInstance from "@/utils/axiosInstance"
import { validateEmail } from "@/utils/helper"
import { AxiosError } from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const SignUp = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!name) {
            setError("Введите имя")
            return
        }
        if (!validateEmail(email)) {
            setError("Некорректный email")
            return
        }
        if (!password) {
            setError("Введите пароль")
            return
        }
        setError("")

        // Обращение к API
        try {
            const response = await axiosInstance.post("/create-account", {
                fullName: name,
                email: email,
                password: password,
            })

            if (response.data && response.data.error) {
                setError(response.data.error)
                return
            }
            if (response.data && response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken)
                navigate("/dashboard")
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response && error.response.data && error.response.data.message) {
                    setError(error.response.data.message)
                }
            } else {
                setError("Непредвиденная ошибка. Перезагрузите страницу")
            }
        }
    }
    return (
        <>
            <Navbar userInfo={null} />
            <div className="flex items-center justify-center mt-28">
                <div className="w-96 border rounded bg-white px-7 py-10">
                    <form onSubmit={handleSignUp}>
                        <h4 className="text-2xl mb-7">Регистрация</h4>

                        <input
                            type="text"
                            placeholder="Имя"
                            className="input-box"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Email"
                            className="input-box"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />

                        <PasswordInput value={password} onChange={e => setPassword(e.target.value)} />

                        {error && <p className="text-red-500 text-xs">{error}</p>}
                        <button type="submit" className="btn-primary">
                            Зарегистрироваться
                        </button>
                        <p className="text-sm text-center mt-4">
                            Уже есть аккаунт?{" "}
                            <Link to={"/login"} className="font-medium text-primary underline">
                                Войти
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}
export default SignUp
