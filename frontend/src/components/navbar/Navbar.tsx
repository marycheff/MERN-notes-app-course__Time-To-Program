import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ProfileInfo from "../cards/ProfileInfo"
import SearchBar from "../searchBar/SearchBar"

const Navbar = () => {
    const navigate = useNavigate()
    const onLogout = () => {
        navigate("/login")
    }
    const [searchQuery, setSearchQuery] = useState("")
    const handleSearch = () => {}
    const handleClearSearch = () => {
        setSearchQuery("")
    }
    return (
        <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
            <h2 className="text-xl font-semibold text-black py-2">Заметки</h2>
            <SearchBar
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                handleSearch={handleSearch}
                onClearSearch={handleClearSearch}
            />
            <ProfileInfo onLogout={onLogout} />
        </div>
    )
}

export default Navbar
