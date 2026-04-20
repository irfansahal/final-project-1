//import User from "@/app/(main)/models/users"
import User from "@/app/models/users";
//import connectDB from "../../utils/db"
import connectDB from "@/app/utils/db";
import bcrypt from "bcrypt" 
import { NextResponse } from "next/server";

export async function POST(rec){
    await connectDB();

    const body = await rec.json();
    const { name , email , password } = body;

    try {
        await new User({
            name,
            email,
            password : await bcrypt.hash(password, 10),
        }).save();
        return NextResponse.json({ message : "User Created Successfully"});
    } catch (error) {
        console.log(error);
        return NextResponse.json({err : error.message}, { status : 500 });
    };
}

export async function GET(){
    return NextResponse.json({ message : "Bismillah From Register Route"});
}