import ProfileInfo from "@/components/cards/ProfileInfo"
import { NavbarProps } from "@/components/navbar/Navbar.props"
import SearchBar from "@/components/searchBar/SearchBar"
import { FC, useState } from "react"
import { useNavigate } from "react-router-dom"

const Navbar: FC<NavbarProps> = ({ userInfo, onSearchNote, handleClearSearch }) => {
    const navigate = useNavigate()
    const onLogout = () => {
        localStorage.clear()
        navigate("/login")
    }
    const [searchQuery, setSearchQuery] = useState("")
    const handleSearch = () => {
        if (searchQuery) {
            if (onSearchNote) onSearchNote(searchQuery)
        }
    }
    const onClearSearch = () => {
        setSearchQuery("")
        if (handleClearSearch) handleClearSearch()
    }
    return (
        <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
            <h2 className="text-xl font-semibold text-black py-2">Заметки</h2>
            <SearchBar
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                handleSearch={handleSearch}
                onClearSearch={onClearSearch}
            />

            <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
        </div>
    )
}

export default Navbar
