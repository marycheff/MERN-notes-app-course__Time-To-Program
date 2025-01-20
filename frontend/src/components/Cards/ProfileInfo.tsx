import { NavbarProps } from "@/components/navbar/Navbar.props"
import { getInitials } from "@/utils/helper"
import React, { FC } from "react"

interface ProfileInfoProps {
    userInfo: NavbarProps | null
    onLogout: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const ProfileInfo: FC<ProfileInfoProps> = ({ userInfo, onLogout }) => {
    if (!userInfo) {
        return
    }

    return (
        <div className="flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
                {getInitials(userInfo.fullName)}
            </div>
            <div>
                <p className="text-sm font-medium">{userInfo.fullName}</p>
                <button className="text-sm text-slate-700 underline" onClick={onLogout}>
                    Выйти
                </button>
            </div>
        </div>
    )
}

export default ProfileInfo
