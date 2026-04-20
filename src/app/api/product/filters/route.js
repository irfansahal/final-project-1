
import Product from "@/app/models/product";
import connectDB from "@/app/utils/db";
import { NextResponse } from "next/server";


export async function GET(rec){
   await connectDB();
  
    const {searchParams} = new URL(rec.url)
    
    const  page = searchParams.get("page") || {};
    const  minPrice = searchParams.get("minPrice") || "";
    const  maxPrice = searchParams.get("maxPrice") || "";
    const  category = searchParams.get("category") || "";
    console.log("page", page);

    const pageSize = 2;

    const filter = {}

    if( category && category.trim()){
        filter.category = category.trim();
    }
    if( minPrice && maxPrice){
        filter.price = { $gte: Number(minPrice), $lte: Number(maxPrice)}
    }
    
    try {
        const currentpage = Number(page) || 1;
        const skip = ( currentpage - 1) * pageSize;

        const filteredProduct = await Product
                                      .find(filter)
                                      .skip(skip)
                                      .limit(pageSize)
                                      .sort({ createdAt : -1 })

                const totalProducts = await Product.countDocuments(filter);
                
          return NextResponse.json({
              success :  true,
              products :filteredProduct,
              currentpage,
              totalPages : Math.ceil(totalProducts / pageSize), 
          });      
    } catch (err) {
        return NextResponse.json(
            {
            success : false,
            err : err.message,
        },
        { status : 500 }
    );
    }
}