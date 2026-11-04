import { Router, type Request, type Response } from "express";
import type { User } from "../types/types.ts";
import { UserModel } from "../model/user.ts";
import { signToken, verifyToken } from "../utils/utils.ts";
import { hash, compare } from "bcrypt"


export const authRouter = Router();


authRouter.post("/register", async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email) {
            return res.send("name and email is required")
        }
        const hashPassword = await hash(password, 10);
        const user = await UserModel.create({ name, email,password:hashPassword, role: "user" });
        return res.status(201).json({ id: user._id, email: user.email })
    } catch (err: any) {
        throw new Error(err)
    }
});


authRouter.post("/login", async (req: Request, res: Response) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.send("name and email is required")
    }
    const user = await UserModel.findOne({ email }) || {};
    if (!user.name) {
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

