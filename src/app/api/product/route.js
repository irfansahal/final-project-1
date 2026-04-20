import Product from "@/app/models/product";
import connectDB from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET(req){
   //return NextResponse.json({ message : "Bismillah How Are You?"})
   await connectDB();

   const { searchParams } = new URL(req.url);

   const page = searchParams.get("page") || 1;
   
   const pageSize = 2 ;

   try {
    
    const currentPage = Number(page) || 1;
    
    const skip = ( currentPage - 1) * pageSize; 

    const totaleProduct = await Product.countDocuments(); 
    
    const products = await Product
                            .find({})
                            .skip(skip)
                            .limit(pageSize)
                            .sort({ createdAt : -1});

                            return NextResponse.json({
                                success : true,
                                products,
                                currentPage,
                                totalePages : Math.ceil(totaleProduct / pageSize),
                            })
   } catch (error) {
     return NextResponse.json({
        success : true,
        err: error.message
     });
   }
}

export async function POST(req){
    await connectDB();

    const body = await req.json();

    try {
        const newPorduct = await Product.create(body);
        return NextResponse.json( newPorduct , { status : 201 });
    } catch (error) {
        return NextResponse.json({ Error : " Failed To Create Product "});
    }
}