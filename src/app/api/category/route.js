import Category from "@/app/models/category";
import { NextResponse } from "next/server";
import connectDB from "@/app/utils/db";

export async function GET(){
    try {
        await connectDB();
        const categories = await Category.find({}).sort({ createdAt : -1 });
        return NextResponse.json(categories)
    } catch (error) {
        return NextResponse.json(
            {
                err : error.message,
            },
            { status : 500 },
        );
    }
}