import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

export const authToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    if (!token) {
        res.sendStatus(401)
        return
    }

    const secret = process.env.ACCESS_TOKEN_SECRET

    if (!secret) {
        res.status(500).send("Secret key is not set.")
        return
    }

    jwt.verify(token, secret, (err: any, user: any) => {
        
        if (err) {
            res.sendStatus(401)
            console.error("JWT verification error:", err.message)
            return
        }
        ;(req as any).user = user
        next()
    })
}
