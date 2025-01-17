import cors from "cors"
import dotenv from "dotenv"
import express, { Request, Response } from "express"
import jwt from "jsonwebtoken"

import mongoose from "mongoose"

import Note from "./models/note.model"
import User from "./models/user.model"
import { authToken } from "./utilities"

interface CustomRequest extends Request {
    user: any
}
dotenv.config()

const PORT = process.env.PORT || 3000

mongoose
    .connect(process.env.DATABASE_URL || "")
    .then(() => console.log("✓ Подключено к MongoDB"))
    .catch(err => console.error("Ошибка подключения к MongoDB:", err))

const app = express()

app.use(express.json())
app.use(
    cors({
        origin: "*",
    })
)

app.get("/", (req: Request, res: Response): void => {
    res.send("Hello World!!!!")
})

// Создание аккаунта
app.post("/create-account", async (req: Request, res: Response): Promise<void> => {
    const { fullName, email, password } = req.body

    if (!fullName) {
        res.status(400).json({ error: true, message: "Поле fullName не заполнено" })
        return
    }
    if (!email) {
        res.status(400).json({ error: true, message: "Поле email не заполнено" })
        return
    }
    if (!password) {
        res.status(400).json({ error: true, message: "Поле password не заполнено" })
        return
    }

    try {
        const isUser = await User.findOne({ email })
        if (isUser) {
            res.status(400).json({ error: true, message: "Пользователь с таким email уже существует" })
            return
        }

        const user = new User({ fullName, email, password })
        await user.save()

        const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET || "", {
            expiresIn: "10000d",
        })

        res.status(200).json({ error: false, user, accessToken, message: "Пользователь успешно создан" })
    } catch (error) {
        res.status(500).json({ error: true, message: "Ошибка сервера", details: error })
    }
})

// Авторизация
app.post("/login", async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body
    if (!email) {
        res.status(400).json({ error: true, message: "Поле email не заполнено" })
        return
    }
    if (!password) {
        res.status(400).json({ error: true, message: "Поле password не заполнено" })
        return
    }
    try {
        const user = await User.findOne({ email, password })
        if (!user) {
            res.status(400).json({ error: true, message: "Неверный email или пароль" })
            return
        }
        const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET || "", {
            expiresIn: "10000d",
        })
        res.status(200).json({ error: false, email, accessToken, message: "Пользователь успешно авторизован" })
    } catch (error) {
        res.status(500).json({ error: true, message: "Ошибка сервера", details: error })
    }
})

// Добавление заметки
app.post("/add-note", authToken, async (req: Request, res: Response): Promise<void> => {
    const { title, content, tags } = req.body
    const { user } = req as CustomRequest
    if (!title) {
        res.status(400).json({ error: true, message: "Поле title не заполнено" })
        return
    }
    if (!content) {
        res.status(400).json({ error: true, message: "Поле content не заполнено" })
        return
    }

    try {
        const note = new Note({ title, content, tags: tags || [], userId: (req as any).user._id })
        await note.save()
        res.status(200).json({
            error: false,
            note,
            message: "Заметка успешно создана",
        })
    } catch (error) {
        res.status(500).json({
            error: true,
            message: "Ошибка сервера",
            details: error,
        })
    }
})

// Редактирование заметки
app.put("/edit-note/:noteId", authToken, async (req: Request, res: Response): Promise<void> => {
    const noteId = req.params.noteId
    const { title, content, tags, isPinned } = req.body
    const { user } = req as CustomRequest

    if (!title && !content && !tags) {
        res.status(400).json({ error: true, message: "Не предоставлены данные для изменения" })
        return
    }

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id })

        if (!note) {
            res.status(400).json({ error: true, message: "Нет такой заметки" })
            return
        }

        if (title) {
            note.title = title
        }
        if (content) {
            note.content = content
        }
        if (tags) {
            note.tags = tags
        }
        if (isPinned) {
            note.isPinned = isPinned
        }
        note.updatedOn = new Date()

        await note.save()

        res.json({
            error: false,
            note,
            message: "Заметка успешно обновлена",
        })
    } catch (error) {
        res.status(500).json({
            error: true,
            message: "Ошибка сервера",
            details: error,
        })
    }
})

app.listen(PORT, () => {
    console.log(`✓ Сервер запущен. Порт ${PORT}`)
})

export default app
