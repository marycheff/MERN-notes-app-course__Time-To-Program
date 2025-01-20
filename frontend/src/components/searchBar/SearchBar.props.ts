export interface SearchBarProps {
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    handleSearch: (event: React.MouseEvent<SVGElement>) => void
    onClearSearch: (event: React.MouseEvent<SVGElement>) => void
}
