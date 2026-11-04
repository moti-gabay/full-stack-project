import express, { type Request, type Response } from "express";
import { userRouter } from "./routes/users.ts";
import { authRouter } from "./routes/auth.ts";


const app = express();

const PORT = 3000;

app.use(express.json());

app.use("/users", userRouter);
app.use("/auth", authRouter);




app.get('/', (req: Request, res: Response) => {
    res.json({ "msg": "holleo from ts server" })
});

app.listen(PORT, () => {
    console.log("setver is running on port", PORT);

})