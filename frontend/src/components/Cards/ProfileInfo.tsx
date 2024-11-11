import React, { FC } from "react"
import { getInitials } from "../../utils/helper"

interface ProfileInfoProps {
    onLogout: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const ProfileInfo: FC<ProfileInfoProps> = ({ onLogout }) => {
    return (
        <div className="flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
                {getInitials("Иван Иванов")}
            </div>
            <div>
                <p className="text-sm font-medium">Иван</p>
                <button className="text-sm text-slate-700 underline" onClick={onLogout}>
                    Выйти
                </button>
            </div>
        </div>
    )
}

export default ProfileInfo
