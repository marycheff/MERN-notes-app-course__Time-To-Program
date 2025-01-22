import { PasswordInputProps } from "@/components/input/PasswordInput/PasswordInput.props"
import { FC, useState } from "react"
// import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"

const PasswordInput: FC<PasswordInputProps> = ({ value, onChange, placeholder }) => {
    const [isShowPassword, setIsShowPassword] = useState(false)

    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword)
    }

    return (
        <div className="flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3">
            <input
                value={value}
                onChange={onChange}
                type={isShowPassword ? "text" : "password"}
                placeholder={placeholder || "Пароль"}
                className="w-full text-sm bg-transparent py-3 mr-3 outline-none"
            />

            {/* {isShowPassword ? (
                <FaRegEye size={22} className="text-primary cursor-pointer" onClick={toggleShowPassword} />
            ) : (
                <FaRegEyeSlash size={22} className="text-slate-400 cursor-pointer" onClick={toggleShowPassword} />
            )} */}
            <button type="button" onClick={toggleShowPassword} className="ml-2 text-gray-500 hover:text-gray-700">
                {isShowPassword ? "Скрыть" : "Показать"}
            </button>
        </div>
    )
}

export default PasswordInput
