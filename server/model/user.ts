import mongoose, { Schema, model } from "mongoose";



const userSchema = new Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    role: { type: String }
}, { timestamps: true });


export const UserModel = model('User', userSchema); 