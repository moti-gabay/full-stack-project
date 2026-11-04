import jwt from "jsonwebtoken";
import type { User } from "../types/types.ts";
import { readFile, writeFile } from "node:fs/promises";

const JSON_PATH = "./db/users.json"

export async function signToken(user: User) {
    const token = jwt.sign({ userId: user.id }, "secret123", { "expiresIn": "1d" })
    return token;
}


export async function verifyToken(token: string) {
    return jwt.verify(token, "secret123")
}

export async function readJson() {
    try {
        const users = await readFile(JSON_PATH);
        return JSON.parse(users)
    } catch (err: any) {
        throw new Error(err);
    }
}


export async function writeToJson(users: User[]) {
    try {
        const data = JSON.stringify(users);
        await writeFile(JSON_PATH, data);
    } catch (err: any) {
        throw new Error(err)
    }

}