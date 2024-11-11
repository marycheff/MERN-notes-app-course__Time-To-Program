import { FC } from "react"
import { FaSearch } from "react-icons/fa"
import { IoMdClose } from "react-icons/io"
interface SearchBarProps {
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    handleSearch: (event: React.MouseEvent<SVGElement>) => void
    onClearSearch: (event: React.MouseEvent<SVGElement>) => void
}

const SearchBar: FC<SearchBarProps> = ({ value, onChange, handleSearch, onClearSearch }) => {
    return (
        <div className="w-80 flex items-center px-4 bg-slate-100 rounded-md">
            <input
                type="text"
                placeholder="Поиск"
                className="w-full text-xs bg-transparent py-[11px] outline-none"
                value={value}
                onChange={onChange}
            />
            {value && (
                <IoMdClose
                    className="text-xl text-slate-500 cursor-pointer hover:text-black mr-3"
                    onClick={onClearSearch}
                />
            )}
            <FaSearch className="text-slate-400 cursor-pointer hover:text-black" onClick={handleSearch} />
        </div>
    )
}

export default SearchBar
