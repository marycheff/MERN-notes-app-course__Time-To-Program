import { ChangeEvent } from "react"

export interface PasswordInputProps {
    value?: string
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
}
