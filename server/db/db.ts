import mongoose from "mongoose";
import { config } from "../config.ts";





export async function mongoConntct() {
    try {
        await mongoose.connect(config.mongo_uri || "mongodb://127.0.0.1:27017/myapp");
        console.log("mongo conncet");
    } catch (error: any) {
        throw new Error(error)
    }

}


mongoConntct();