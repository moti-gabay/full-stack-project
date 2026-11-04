import { Router, type Request, type Response } from "express";
import type { User } from "../types/types.ts";
import { readJson, writeToJson } from "../utils/utils.ts";





export const userRouter = Router();

userRouter.get("/", async (req: Request, res: Response) => {
    try {
        const users = await readJson();
        return res.json(users)
    } catch (err: any) {
        throw new Error(err)
    }
});

// userRouter.post("/", (req: Request, res: Response) => {
//     const { name, email } = req.body;
//     if (!name || !email) {
//         return res.send("name and email is required")
//     }
//     const newUser: User = {
//         id: uuid(),
//         name,
//         email
//     }
//     users.push(newUser);

//     return res.json(newUser)
// });


userRouter.put("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const users = await readJson();

    const userIndex = users.findIndex((u: User) => u.id === id);

    if (userIndex === -1) {
        return res.status(404).json({ "msg": "user is not found" })
    }
    if (email) {
        users[userIndex].email = email;
    }
    if (name) {
        users[userIndex].name = name

    }
    await writeToJson(users)
    return res.status(200).json({ "msg": "user is updated !", user: users[userIndex] })
})


userRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    let users = await readJson();

    const userIndex = users.findIndex((u: User) => u.id === id);

    if (userIndex === -1) {
        return res.status(404).json({ "msg": "user is not found" })
    }
    users = users.filter((u: User) => u.id !== id);
    
    await writeToJson(users);

    return res.status(200).json({ "msg": "user deleted !" })

})









