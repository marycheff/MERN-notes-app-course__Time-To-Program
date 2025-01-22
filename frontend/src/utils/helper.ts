export const validateEmail = (email: string) => {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
}

export const getInitials = (name: string) => {
    if (!name) return ""
    const names = name.split(" ")
    return `${names[0][0].toUpperCase()}${names[1].toUpperCase() ? names[1][0].toUpperCase() : ""}`
}
