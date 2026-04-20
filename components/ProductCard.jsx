/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";

import { useCart } from "@/app/contexts/Cart";
import Image from "next/image";

export default function ProductCard({ product }){
    
    const { addToCart } = useCart()
    
    return(
     <>
     <div className="ingredient bg-blue-200 p-8 rounded w-[300px]  m-3">
        <div>
            <figure>
                <Image 
                 src={product.image} 
                 alt={product.title}
                 width={1600}
                 height={900}
                className="w-[200px] h-[300px]"
                />
            </figure>
        </div>
        <hr className="w-[200px] my-5"/>
        <div className="ingredient_content">
            <p>
                <span className="font-serif text-gray-800 text-2xl">{product.title}</span>
            </p>
        </div>
         
         <div>
            <p>
                <span className="font-serif text-gray-800 text-lg">
                {product.price}                
                </span>    
            </p>
         </div>
        <div className="ingredient_btn">
         <button 
         className="m-2 bg-pink-500 text-white font-serif  w-full h-[50px]  rounded  hover:bg-pink-600"
         onClick={(e)=>addToCart(product)}
         >
        ADD TO CART
         </button>
        </div>
     </div>
     </>
    )
}