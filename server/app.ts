import express, { type Request, type Response } from "express";
import { userRouter } from "./routes/users.ts";
import { authRouter } from "./routes/auth.ts";
import cors from "cors"
import { config } from "./config.ts";
import "./db/db.ts";

process.loadEnvFile();

const app = express();

const PORT = config.port || 3000;

app.use(express.json());
app.use(cors({
    origin: '*',
    methods: 'GET,PUT,POST,DELETE',
    credentials: true
}))

app.use("/users", userRouter);
app.use("/auth", authRouter);

app.get('/', (req: Request, res: Response) => {
    res.json({ "msg": "holleo from ts server" })
});

app.listen(PORT, () => {
    console.log("setver is running on port", PORT);

})