import { useState } from "react"
import { Link } from "react-router-dom"
import PasswordInput from "../../components/input/PasswordInput"
import Navbar from "../../components/navbar/Navbar"
import { validateEmail } from "../../utils/helper"

const SignUp = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

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
    }
    return (
        <>
            <Navbar />
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
