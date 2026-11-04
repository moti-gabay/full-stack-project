import { Router, type Request, type Response } from "express";
import { v4 as uuid } from 'uuid';
import type { User } from "../types/types.ts";
import { readJson, signToken, verifyToken, writeToJson } from "../utils/utils.ts";
import cookieParser from "cookie-parser";
import "dotenv/config.js"



export const authRouter = Router();


authRouter.post("/register", async (req: Request, res: Response) => {
    try {

        const { name, email } = req.body;
        if (!name || !email) {
            return res.send("name and email is required")
        }
        const users = await readJson();
        const user = users.find((u: User) => u.email === email)
        if (user) {
            return res.json({ "msg": "this email is alredy in system" })
        }

        const newUser: User = {
            id: uuid(),
            name,
            email
        }
        users.push(newUser);

        await writeToJson(users)

        return res.json(newUser)
    } catch (err: any) {
        throw new Error(err)
    }
});


authRouter.post("/login", (req: Request, res: Response) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.send("name and email is required")
    }
    const user = users.find((u) => u.email === email);
    if (!user) {
        return res.status(404).json({ "msg": "user is not found !" })
    }
    const token = signToken(user);
    res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 15 * 60 * 1000
    })
    return res.json({ "ok": true })

});

authRouter.get("/me", async (req: Request, res: Response) => {
    const token = req.cookies.token;
    if (!token) {
        return res.sendStatus(401)
    }
    try {
        const jwtPayload = await verifyToken(token)
        return res.json({ userId: jwtPayload });

    } catch {
        return res.sendStatus(401)
    }

})

authRouter.post("/logout", (req, res) => {
    res.clearCookie('token');
    return res.sendStatus(204);
});













