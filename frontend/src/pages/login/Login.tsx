import PasswordInput from "@/components/input/PasswordInput/PasswordInput"
import Navbar from "@/components/navbar/Navbar"
import axiosInstance from "@/utils/axiosInstance"
import { validateEmail } from "@/utils/helper"
import { AxiosError } from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
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
            const response = await axiosInstance.post("/login", {
                email: email,
                password: password,
            })

            if (response.data && response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken)
                navigate("/")
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
                    <form onSubmit={handleLogin}>
                        <h4 className="text-2xl mb-7">Вход</h4>

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
                            Войти
                        </button>
                        <p className="text-sm text-center mt-4">
                            Еще не зарегистрированы?{" "}
                            <Link to={"/signUp"} className="font-medium text-primary underline">
                                Создать аккаунт
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
