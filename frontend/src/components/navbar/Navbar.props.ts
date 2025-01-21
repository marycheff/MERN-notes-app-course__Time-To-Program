import { User } from "@/types/User"

export interface NavbarProps {
    userInfo: User | null
    onSearchNote: (query: string) => void
    handleClearSearch: () => void
}
